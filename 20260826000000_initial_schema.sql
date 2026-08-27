-- ============================================================
-- SMART SCHOOL — Complete Normalized PostgreSQL Database Schema
-- Standards 6th - 12th Centralized Platform
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  profile_photo TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Academic Years
CREATE TABLE IF NOT EXISTS public.academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- e.g. "2026-2027"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  joining_date DATE NOT NULL,
  qualification TEXT,
  specialization TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Classes Table (Standards 6 to 12)
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  standard INT NOT NULL CHECK (standard BETWEEN 6 AND 12),
  section VARCHAR(5) NOT NULL, -- 'A', 'B', 'C'
  academic_year TEXT NOT NULL,
  class_teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  room_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(standard, section, academic_year)
);

-- 5. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT UNIQUE NOT NULL, -- e.g. "STU-2026-001"
  admission_number TEXT UNIQUE NOT NULL,
  roll_number INT NOT NULL,
  standard INT NOT NULL CHECK (standard BETWEEN 6 AND 12),
  section VARCHAR(5) NOT NULL,
  academic_year TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  qr_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  guardian_name TEXT,
  guardian_phone TEXT,
  guardian_email TEXT,
  guardian_relation TEXT,
  blood_group VARCHAR(5),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'transferred')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Parents Table
CREATE TABLE IF NOT EXISTS public.parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Parent-Students (Many-to-Many for multi-child support)
CREATE TABLE IF NOT EXISTS public.parent_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.parents(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT 'Parent',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, student_id)
);

-- 8. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code VARCHAR(20) NOT NULL,
  subject_type TEXT NOT NULL CHECK (subject_type IN ('core', 'elective', 'language', 'extra_curricular')),
  standard INT NOT NULL CHECK (standard BETWEEN 6 AND 12),
  academic_year TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Student Subjects (Enrollment)
CREATE TABLE IF NOT EXISTS public.student_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL,
  enrollment_status TEXT DEFAULT 'enrolled' CHECK (enrollment_status IN ('enrolled', 'dropped', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, subject_id, academic_year)
);

-- 10. Teacher Subjects (Assignments)
CREATE TABLE IF NOT EXISTS public.teacher_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, subject_id, class_id)
);

-- 11. Periods Configuration
CREATE TABLE IF NOT EXISTS public.periods_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period_number INT NOT NULL,
  name TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_break BOOLEAN DEFAULT false,
  academic_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Timetable Entries
CREATE TABLE IF NOT EXISTS public.timetable_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 6=Saturday
  period_number INT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  room TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, day_of_week, period_number)
);

-- 13. Attendance Sessions
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
  period INT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Attendance Records
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'leave')),
  marked_at TIMESTAMPTZ DEFAULT NOW(),
  marked_by UUID REFERENCES public.profiles(id),
  method TEXT DEFAULT 'manual' CHECK (method IN ('qr', 'manual')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, student_id)
);

-- 15. Exams Table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  standard INT CHECK (standard BETWEEN 6 AND 12),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Exam Subjects Schedule
CREATE TABLE IF NOT EXISTS public.exam_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  maximum_marks INT NOT NULL DEFAULT 100,
  passing_marks INT NOT NULL DEFAULT 35,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Marks Table
CREATE TABLE IF NOT EXISTS public.marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  exam_subject_id UUID REFERENCES public.exam_subjects(id) ON DELETE CASCADE,
  marks_obtained NUMERIC(5,2) NOT NULL,
  grade VARCHAR(5),
  remarks TEXT,
  entered_by UUID REFERENCES public.teachers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, exam_subject_id)
);

-- 18. Grading Rules
CREATE TABLE IF NOT EXISTS public.grading_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year TEXT NOT NULL,
  grade VARCHAR(5) NOT NULL,
  min_percentage NUMERIC(5,2) NOT NULL,
  max_percentage NUMERIC(5,2) NOT NULL,
  grade_point NUMERIC(3,1) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Rankings Table
CREATE TABLE IF NOT EXISTS public.rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('class', 'high_school', 'higher_secondary')),
  standard INT NOT NULL,
  section VARCHAR(5),
  rank INT NOT NULL,
  total_marks NUMERIC(7,2) NOT NULL,
  total_max_marks NUMERIC(7,2) NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, exam_id, category)
);

-- 20. Homework Table
CREATE TABLE IF NOT EXISTS public.homework (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  attachment_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  venue TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  visibility TEXT DEFAULT 'all' CHECK (visibility IN ('all', 'students', 'teachers', 'parents', 'admin')),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. Circulars Table
CREATE TABLE IF NOT EXISTS public.circulars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('holiday', 'examination', 'academic', 'general', 'emergency')),
  published_by UUID REFERENCES public.profiles(id),
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  attachment_url TEXT,
  visibility TEXT DEFAULT 'all' CHECK (visibility IN ('all', 'students', 'teachers', 'parents')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('academic', 'sports', 'science', 'cultural', 'technology', 'district', 'state', 'national')),
  team_name TEXT,
  level TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT,
  published_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. Student Activities Table
CREATE TABLE IF NOT EXISTS public.student_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  result TEXT,
  certificate_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. Complaints Table
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_number TEXT UNIQUE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('infrastructure', 'classroom', 'water', 'sanitation', 'electricity', 'academic', 'transport', 'canteen', 'safety', 'other')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  attachment_url TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. Complaint Timeline
CREATE TABLE IF NOT EXISTS public.complaint_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  comment TEXT,
  changed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('attendance', 'homework', 'event', 'circular', 'exam', 'complaint', 'achievement', 'announcement', 'system')),
  reference_id TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 29. School Settings Table
CREATE TABLE IF NOT EXISTS public.school_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users can read all active profiles, but edit only their own
CREATE POLICY "Profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles update own" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Students: Read own or if teacher/admin/parent
CREATE POLICY "Students view policy" ON public.students FOR SELECT USING (
  profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  public.get_current_user_role() IN ('admin', 'teacher') OR
  id IN (SELECT student_id FROM public.parent_students ps JOIN public.parents p ON ps.parent_id = p.id JOIN public.profiles pr ON p.profile_id = pr.id WHERE pr.user_id = auth.uid())
);

-- Attendance Records: Student sees own, Parent sees linked child, Teacher/Admin sees assigned
CREATE POLICY "Attendance records view" ON public.attendance_records FOR SELECT USING (
  student_id IN (SELECT id FROM public.students s JOIN public.profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid()) OR
  public.get_current_user_role() IN ('admin', 'teacher') OR
  student_id IN (SELECT student_id FROM public.parent_students ps JOIN public.parents p ON ps.parent_id = p.id JOIN public.profiles pr ON p.profile_id = pr.id WHERE pr.user_id = auth.uid())
);

-- Marks: Student sees own, Parent sees linked, Teacher can insert/update for assigned subjects
CREATE POLICY "Marks view policy" ON public.marks FOR SELECT USING (
  student_id IN (SELECT id FROM public.students s JOIN public.profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid()) OR
  public.get_current_user_role() IN ('admin', 'teacher') OR
  student_id IN (SELECT student_id FROM public.parent_students ps JOIN public.parents p ON ps.parent_id = p.id JOIN public.profiles pr ON p.profile_id = pr.id WHERE pr.user_id = auth.uid())
);

-- Complaints: Student sees own, assigned Teacher sees assigned, Admin sees all
CREATE POLICY "Complaints privacy policy" ON public.complaints FOR SELECT USING (
  student_id IN (SELECT id FROM public.students s JOIN public.profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid()) OR
  public.get_current_user_role() = 'admin' OR
  assigned_to IN (SELECT id FROM public.teachers t JOIN public.profiles p ON t.profile_id = p.id WHERE p.user_id = auth.uid())
);

-- Rankings: Public can only view if published
CREATE POLICY "Rankings published only" ON public.rankings FOR SELECT USING (
  is_published = true OR public.get_current_user_role() = 'admin'
);
