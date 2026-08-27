-- ============================================================
-- SMART SCHOOL — Demo Seed Data
-- 6th to 12th Standards, Teachers, Attendance, Marks, Exams
-- ============================================================

-- 1. Academic Year
INSERT INTO public.academic_years (id, name, start_date, end_date, is_current)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '2026-2027', '2026-06-01', '2027-04-30', true)
ON CONFLICT (name) DO NOTHING;

-- 2. Grading Rules
INSERT INTO public.grading_rules (academic_year, grade, min_percentage, max_percentage, grade_point, description)
VALUES
  ('2026-2027', 'A+', 90.0, 100.0, 10.0, 'Outstanding performance'),
  ('2026-2027', 'A',  80.0, 89.9,  9.0, 'Excellent performance'),
  ('2026-2027', 'B+', 70.0, 79.9,  8.0, 'Very Good'),
  ('2026-2027', 'B',  60.0, 69.9,  7.0, 'Good'),
  ('2026-2027', 'C+', 50.0, 59.9,  6.0, 'Above Average'),
  ('2026-2027', 'C',  40.0, 49.9,  5.0, 'Average'),
  ('2026-2027', 'D',  35.0, 39.9,  4.0, 'Pass'),
  ('2026-2027', 'F',  0.0,  34.9,  0.0, 'Needs Improvement / Fail')
ON CONFLICT DO NOTHING;

-- 3. School Settings
INSERT INTO public.school_settings (key, value, category)
VALUES
  ('school_name', 'SMART SCHOOL Central Campus', 'general'),
  ('school_code', 'SCH-KA-2026', 'general'),
  ('academic_year', '2026-2027', 'academic'),
  ('minimum_attendance_pct', '75', 'attendance'),
  ('high_school_standards', '9,10', 'ranking'),
  ('higher_secondary_standards', '11,12', 'ranking'),
  ('support_email', 'helpdesk@smartschool.edu', 'contact')
ON CONFLICT (key) DO NOTHING;

-- 4. Period Configuration (8 periods + 2 breaks)
INSERT INTO public.periods_config (period_number, name, start_time, end_time, is_break, academic_year)
VALUES
  (1, 'Period 1', '08:00:00', '08:45:00', false, '2026-2027'),
  (2, 'Period 2', '08:45:00', '09:30:00', false, '2026-2027'),
  (3, 'Period 3', '09:30:00', '10:15:00', false, '2026-2027'),
  (0, 'Short Break', '10:15:00', '10:30:00', true, '2026-2027'),
  (4, 'Period 4', '10:30:00', '11:15:00', false, '2026-2027'),
  (5, 'Period 5', '11:15:00', '12:00:00', false, '2026-2027'),
  (0, 'Lunch Break', '12:00:00', '12:45:00', true, '2026-2027'),
  (6, 'Period 6', '12:45:00', '13:30:00', false, '2026-2027'),
  (7, 'Period 7', '13:30:00', '14:15:00', false, '2026-2027'),
  (8, 'Period 8', '14:15:00', '15:00:00', false, '2026-2027')
ON CONFLICT DO NOTHING;

-- 5. Subjects (for Standards 6 to 12)
INSERT INTO public.subjects (name, code, subject_type, standard, academic_year)
VALUES
  ('Mathematics', 'MATH-10', 'core', 10, '2026-2027'),
  ('Physics', 'PHY-10', 'core', 10, '2026-2027'),
  ('Chemistry', 'CHEM-10', 'core', 10, '2026-2027'),
  ('Biology', 'BIO-10', 'core', 10, '2026-2027'),
  ('English Language & Lit', 'ENG-10', 'core', 10, '2026-2027'),
  ('Hindi', 'HIN-10', 'language', 10, '2026-2027'),
  ('Social Science', 'SST-10', 'core', 10, '2026-2027'),
  ('Computer Science', 'CS-10', 'elective', 10, '2026-2027'),
  ('Kannada', 'KAN-10', 'language', 10, '2026-2027'),
  ('Physical Education', 'PE-10', 'extra_curricular', 10, '2026-2027')
ON CONFLICT DO NOTHING;
