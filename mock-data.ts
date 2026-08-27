// ============================================================
// SMART SCHOOL — Mock Data for Development
// ============================================================

import type {
  Student, Teacher, Profile, Subject, Class, Homework, SchoolEvent,
  Circular, Achievement, Complaint, Notification, AttendanceRecord,
  TimetableEntry, Exam, ExamSubject, Mark, PeriodConfig, Ranking,
  StudentActivity, AttendanceSession
} from '@/lib/types';

// --- Demo User Profiles ---

export const demoUsers = {
  student: {
    id: 'user-student-001',
    name: 'Aarav Sharma',
    email: 'student@smartschool.com',
    role: 'student' as const,
    profile_photo: null,
    student_id: 'STU-2026-001',
    standard: 10,
    section: 'A',
    roll_number: 1,
  },
  teacher: {
    id: 'user-teacher-001',
    name: 'Dr. Priya Nair',
    email: 'teacher@smartschool.com',
    role: 'teacher' as const,
    profile_photo: null,
    employee_id: 'TCH-001',
    department: 'Mathematics',
  },
  parent: {
    id: 'user-parent-001',
    name: 'Rajesh Sharma',
    email: 'parent@smartschool.com',
    role: 'parent' as const,
    profile_photo: null,
    children: ['Aarav Sharma', 'Ananya Sharma'],
  },
  admin: {
    id: 'user-admin-001',
    name: 'Mr. Vikram Mehta',
    email: 'admin@smartschool.com',
    role: 'admin' as const,
    profile_photo: null,
  },
};

// --- Students ---

export const mockStudents: (Student & { profile: Profile })[] = [
  {
    id: 'stu-001', profile_id: 'prof-stu-001', student_id: 'STU-2026-001',
    admission_number: 'ADM-2020-001', roll_number: 1, standard: 10, section: 'A',
    academic_year: '2026-2027', date_of_birth: '2011-03-15', qr_token: 'qr_tok_001',
    guardian_name: 'Rajesh Sharma', guardian_phone: '+91 98765 43210',
    guardian_email: 'rajesh.sharma@email.com', guardian_relation: 'Father',
    blood_group: 'B+', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-001', user_id: 'user-student-001', full_name: 'Aarav Sharma',
      email: 'aarav.sharma@smartschool.com', phone: '+91 98765 43211',
      profile_photo: null, role: 'student', date_of_birth: '2011-03-15',
      gender: 'male', address: '12, MG Road, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'stu-002', profile_id: 'prof-stu-002', student_id: 'STU-2026-002',
    admission_number: 'ADM-2020-002', roll_number: 2, standard: 10, section: 'A',
    academic_year: '2026-2027', date_of_birth: '2011-05-22', qr_token: 'qr_tok_002',
    guardian_name: 'Meena Patel', guardian_phone: '+91 98765 43220',
    guardian_email: 'meena.patel@email.com', guardian_relation: 'Mother',
    blood_group: 'A+', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-002', user_id: 'user-stu-002', full_name: 'Diya Patel',
      email: 'diya.patel@smartschool.com', phone: null,
      profile_photo: null, role: 'student', date_of_birth: '2011-05-22',
      gender: 'female', address: '45, Indiranagar, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'stu-003', profile_id: 'prof-stu-003', student_id: 'STU-2026-003',
    admission_number: 'ADM-2020-003', roll_number: 3, standard: 10, section: 'A',
    academic_year: '2026-2027', date_of_birth: '2011-07-10', qr_token: 'qr_tok_003',
    guardian_name: 'Suresh Kumar', guardian_phone: '+91 98765 43230',
    guardian_email: 'suresh.kumar@email.com', guardian_relation: 'Father',
    blood_group: 'O+', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-003', user_id: 'user-stu-003', full_name: 'Arjun Kumar',
      email: 'arjun.kumar@smartschool.com', phone: null,
      profile_photo: null, role: 'student', date_of_birth: '2011-07-10',
      gender: 'male', address: '78, Koramangala, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'stu-004', profile_id: 'prof-stu-004', student_id: 'STU-2026-004',
    admission_number: 'ADM-2020-004', roll_number: 4, standard: 10, section: 'A',
    academic_year: '2026-2027', date_of_birth: '2011-01-25', qr_token: 'qr_tok_004',
    guardian_name: 'Lakshmi Iyer', guardian_phone: '+91 98765 43240',
    guardian_email: 'lakshmi.iyer@email.com', guardian_relation: 'Mother',
    blood_group: 'AB+', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-004', user_id: 'user-stu-004', full_name: 'Kavya Iyer',
      email: 'kavya.iyer@smartschool.com', phone: null,
      profile_photo: null, role: 'student', date_of_birth: '2011-01-25',
      gender: 'female', address: '23, Jayanagar, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'stu-005', profile_id: 'prof-stu-005', student_id: 'STU-2026-005',
    admission_number: 'ADM-2020-005', roll_number: 5, standard: 10, section: 'A',
    academic_year: '2026-2027', date_of_birth: '2011-09-08', qr_token: 'qr_tok_005',
    guardian_name: 'Venkat Reddy', guardian_phone: '+91 98765 43250',
    guardian_email: 'venkat.reddy@email.com', guardian_relation: 'Father',
    blood_group: 'B-', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-005', user_id: 'user-stu-005', full_name: 'Rohan Reddy',
      email: 'rohan.reddy@smartschool.com', phone: null,
      profile_photo: null, role: 'student', date_of_birth: '2011-09-08',
      gender: 'male', address: '56, Whitefield, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'stu-006', profile_id: 'prof-stu-006', student_id: 'STU-2026-006',
    admission_number: 'ADM-2021-006', roll_number: 1, standard: 8, section: 'B',
    academic_year: '2026-2027', date_of_birth: '2013-04-12', qr_token: 'qr_tok_006',
    guardian_name: 'Rajesh Sharma', guardian_phone: '+91 98765 43210',
    guardian_email: 'rajesh.sharma@email.com', guardian_relation: 'Father',
    blood_group: 'A+', status: 'active', created_at: '2024-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-stu-006', user_id: 'user-stu-006', full_name: 'Ananya Sharma',
      email: 'ananya.sharma@smartschool.com', phone: null,
      profile_photo: null, role: 'student', date_of_birth: '2013-04-12',
      gender: 'female', address: '12, MG Road, Bangalore', status: 'active',
      created_at: '2024-06-01', updated_at: '2026-08-01',
    },
  },
];

// --- Teachers ---

export const mockTeachers: (Teacher & { profile: Profile })[] = [
  {
    id: 'tch-001', profile_id: 'prof-tch-001', employee_id: 'TCH-001',
    department: 'Mathematics', designation: 'Senior Teacher',
    joining_date: '2015-06-15', qualification: 'Ph.D. Mathematics',
    specialization: 'Algebra & Calculus', status: 'active',
    created_at: '2015-06-15', updated_at: '2026-08-01',
    profile: {
      id: 'prof-tch-001', user_id: 'user-teacher-001', full_name: 'Dr. Priya Nair',
      email: 'priya.nair@smartschool.com', phone: '+91 98765 11111',
      profile_photo: null, role: 'teacher', date_of_birth: '1985-02-20',
      gender: 'female', address: '34, HSR Layout, Bangalore', status: 'active',
      created_at: '2015-06-15', updated_at: '2026-08-01',
    },
  },
  {
    id: 'tch-002', profile_id: 'prof-tch-002', employee_id: 'TCH-002',
    department: 'Science', designation: 'Head of Department',
    joining_date: '2012-04-10', qualification: 'M.Sc. Physics',
    specialization: 'Physics & Electronics', status: 'active',
    created_at: '2012-04-10', updated_at: '2026-08-01',
    profile: {
      id: 'prof-tch-002', user_id: 'user-tch-002', full_name: 'Mr. Arun Krishnan',
      email: 'arun.krishnan@smartschool.com', phone: '+91 98765 22222',
      profile_photo: null, role: 'teacher', date_of_birth: '1980-11-05',
      gender: 'male', address: '67, BTM Layout, Bangalore', status: 'active',
      created_at: '2012-04-10', updated_at: '2026-08-01',
    },
  },
  {
    id: 'tch-003', profile_id: 'prof-tch-003', employee_id: 'TCH-003',
    department: 'English', designation: 'Teacher',
    joining_date: '2018-07-01', qualification: 'M.A. English Literature',
    specialization: 'English Language & Literature', status: 'active',
    created_at: '2018-07-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-tch-003', user_id: 'user-tch-003', full_name: 'Ms. Sneha Gupta',
      email: 'sneha.gupta@smartschool.com', phone: '+91 98765 33333',
      profile_photo: null, role: 'teacher', date_of_birth: '1990-06-18',
      gender: 'female', address: '89, Electronic City, Bangalore', status: 'active',
      created_at: '2018-07-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'tch-004', profile_id: 'prof-tch-004', employee_id: 'TCH-004',
    department: 'Social Science', designation: 'Teacher',
    joining_date: '2019-06-01', qualification: 'M.A. History',
    specialization: 'History & Civics', status: 'active',
    created_at: '2019-06-01', updated_at: '2026-08-01',
    profile: {
      id: 'prof-tch-004', user_id: 'user-tch-004', full_name: 'Mr. Ravi Shankar',
      email: 'ravi.shankar@smartschool.com', phone: '+91 98765 44444',
      profile_photo: null, role: 'teacher', date_of_birth: '1988-09-12',
      gender: 'male', address: '12, Marathahalli, Bangalore', status: 'active',
      created_at: '2019-06-01', updated_at: '2026-08-01',
    },
  },
  {
    id: 'tch-005', profile_id: 'prof-tch-005', employee_id: 'TCH-005',
    department: 'Science', designation: 'Teacher',
    joining_date: '2020-06-15', qualification: 'M.Sc. Chemistry',
    specialization: 'Chemistry & Biology', status: 'active',
    created_at: '2020-06-15', updated_at: '2026-08-01',
    profile: {
      id: 'prof-tch-005', user_id: 'user-tch-005', full_name: 'Dr. Meera Joshi',
      email: 'meera.joshi@smartschool.com', phone: '+91 98765 55555',
      profile_photo: null, role: 'teacher', date_of_birth: '1987-12-03',
      gender: 'female', address: '45, Bannerghatta Road, Bangalore', status: 'active',
      created_at: '2020-06-15', updated_at: '2026-08-01',
    },
  },
];

// --- Subjects ---

export const mockSubjects: Subject[] = [
  { id: 'sub-001', name: 'Mathematics', code: 'MATH', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-002', name: 'Physics', code: 'PHY', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-003', name: 'Chemistry', code: 'CHEM', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-004', name: 'Biology', code: 'BIO', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-005', name: 'English', code: 'ENG', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-006', name: 'Hindi', code: 'HIN', subject_type: 'language', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-007', name: 'Social Science', code: 'SST', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-008', name: 'Computer Science', code: 'CS', subject_type: 'elective', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-009', name: 'Kannada', code: 'KAN', subject_type: 'language', standard: 10, academic_year: '2026-2027', description: null },
  { id: 'sub-010', name: 'Physical Education', code: 'PE', subject_type: 'extra_curricular', standard: 10, academic_year: '2026-2027', description: null },
];

// --- Classes ---

export const mockClasses: Class[] = [
  { id: 'cls-6a', standard: 6, section: 'A', academic_year: '2026-2027', class_teacher_id: 'tch-004', room_number: 'Room 101' },
  { id: 'cls-6b', standard: 6, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 102' },
  { id: 'cls-7a', standard: 7, section: 'A', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 201' },
  { id: 'cls-7b', standard: 7, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 202' },
  { id: 'cls-8a', standard: 8, section: 'A', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 301' },
  { id: 'cls-8b', standard: 8, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 302' },
  { id: 'cls-9a', standard: 9, section: 'A', academic_year: '2026-2027', class_teacher_id: 'tch-003', room_number: 'Room 401' },
  { id: 'cls-9b', standard: 9, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 402' },
  { id: 'cls-10a', standard: 10, section: 'A', academic_year: '2026-2027', class_teacher_id: 'tch-001', room_number: 'Room 501' },
  { id: 'cls-10b', standard: 10, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 502' },
  { id: 'cls-11a', standard: 11, section: 'A', academic_year: '2026-2027', class_teacher_id: 'tch-002', room_number: 'Room 601' },
  { id: 'cls-11b', standard: 11, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 602' },
  { id: 'cls-12a', standard: 12, section: 'A', academic_year: '2026-2027', class_teacher_id: 'tch-005', room_number: 'Room 701' },
  { id: 'cls-12b', standard: 12, section: 'B', academic_year: '2026-2027', class_teacher_id: null, room_number: 'Room 702' },
];

// --- Period Config ---

export const mockPeriods: PeriodConfig[] = [
  { id: 'per-1', period_number: 1, name: 'Period 1', start_time: '08:00', end_time: '08:45', is_break: false, academic_year: '2026-2027' },
  { id: 'per-2', period_number: 2, name: 'Period 2', start_time: '08:45', end_time: '09:30', is_break: false, academic_year: '2026-2027' },
  { id: 'per-3', period_number: 3, name: 'Period 3', start_time: '09:30', end_time: '10:15', is_break: false, academic_year: '2026-2027' },
  { id: 'per-br1', period_number: 0, name: 'Short Break', start_time: '10:15', end_time: '10:30', is_break: true, academic_year: '2026-2027' },
  { id: 'per-4', period_number: 4, name: 'Period 4', start_time: '10:30', end_time: '11:15', is_break: false, academic_year: '2026-2027' },
  { id: 'per-5', period_number: 5, name: 'Period 5', start_time: '11:15', end_time: '12:00', is_break: false, academic_year: '2026-2027' },
  { id: 'per-br2', period_number: 0, name: 'Lunch Break', start_time: '12:00', end_time: '12:45', is_break: true, academic_year: '2026-2027' },
  { id: 'per-6', period_number: 6, name: 'Period 6', start_time: '12:45', end_time: '13:30', is_break: false, academic_year: '2026-2027' },
  { id: 'per-7', period_number: 7, name: 'Period 7', start_time: '13:30', end_time: '14:15', is_break: false, academic_year: '2026-2027' },
  { id: 'per-8', period_number: 8, name: 'Period 8', start_time: '14:15', end_time: '15:00', is_break: false, academic_year: '2026-2027' },
];

// --- Timetable (for class 10-A, Monday) ---

export const mockTimetable: TimetableEntry[] = [
  { id: 'tt-1', class_id: 'cls-10a', day_of_week: 1, period_number: 1, subject_id: 'sub-001', teacher_id: 'tch-001', room: 'Room 501' },
  { id: 'tt-2', class_id: 'cls-10a', day_of_week: 1, period_number: 2, subject_id: 'sub-002', teacher_id: 'tch-002', room: 'Lab 1' },
  { id: 'tt-3', class_id: 'cls-10a', day_of_week: 1, period_number: 3, subject_id: 'sub-005', teacher_id: 'tch-003', room: 'Room 501' },
  { id: 'tt-4', class_id: 'cls-10a', day_of_week: 1, period_number: 4, subject_id: 'sub-003', teacher_id: 'tch-005', room: 'Lab 2' },
  { id: 'tt-5', class_id: 'cls-10a', day_of_week: 1, period_number: 5, subject_id: 'sub-007', teacher_id: 'tch-004', room: 'Room 501' },
  { id: 'tt-6', class_id: 'cls-10a', day_of_week: 1, period_number: 6, subject_id: 'sub-006', teacher_id: 'tch-003', room: 'Room 501' },
  { id: 'tt-7', class_id: 'cls-10a', day_of_week: 1, period_number: 7, subject_id: 'sub-008', teacher_id: 'tch-002', room: 'Computer Lab' },
  { id: 'tt-8', class_id: 'cls-10a', day_of_week: 1, period_number: 8, subject_id: 'sub-010', teacher_id: 'tch-004', room: 'Ground' },
  // Tuesday
  { id: 'tt-9', class_id: 'cls-10a', day_of_week: 2, period_number: 1, subject_id: 'sub-005', teacher_id: 'tch-003', room: 'Room 501' },
  { id: 'tt-10', class_id: 'cls-10a', day_of_week: 2, period_number: 2, subject_id: 'sub-001', teacher_id: 'tch-001', room: 'Room 501' },
  { id: 'tt-11', class_id: 'cls-10a', day_of_week: 2, period_number: 3, subject_id: 'sub-004', teacher_id: 'tch-005', room: 'Lab 3' },
  { id: 'tt-12', class_id: 'cls-10a', day_of_week: 2, period_number: 4, subject_id: 'sub-002', teacher_id: 'tch-002', room: 'Lab 1' },
  { id: 'tt-13', class_id: 'cls-10a', day_of_week: 2, period_number: 5, subject_id: 'sub-009', teacher_id: 'tch-004', room: 'Room 501' },
  { id: 'tt-14', class_id: 'cls-10a', day_of_week: 2, period_number: 6, subject_id: 'sub-003', teacher_id: 'tch-005', room: 'Room 501' },
  { id: 'tt-15', class_id: 'cls-10a', day_of_week: 2, period_number: 7, subject_id: 'sub-007', teacher_id: 'tch-004', room: 'Room 501' },
  { id: 'tt-16', class_id: 'cls-10a', day_of_week: 2, period_number: 8, subject_id: 'sub-001', teacher_id: 'tch-001', room: 'Room 501' },
];

// --- Homework ---

export const mockHomework: Homework[] = [
  {
    id: 'hw-001', class_id: 'cls-10a', subject_id: 'sub-001', teacher_id: 'tch-001',
    title: 'Quadratic Equations - Exercise 4.3', description: 'Complete problems 1 to 15 from Exercise 4.3. Show all steps clearly. Solve using both factorization and formula methods.',
    due_date: '2026-08-28', attachment_url: null, status: 'active',
    created_at: '2026-08-25T10:00:00', updated_at: '2026-08-25T10:00:00',
    subject: { id: 'sub-001', name: 'Mathematics', code: 'MATH', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
    teacher: mockTeachers[0],
  },
  {
    id: 'hw-002', class_id: 'cls-10a', subject_id: 'sub-002', teacher_id: 'tch-002',
    title: 'Light - Reflection and Refraction', description: 'Read Chapter 10 and answer questions 1-10 from the textbook. Draw ray diagrams for concave and convex mirrors.',
    due_date: '2026-08-29', attachment_url: null, status: 'active',
    created_at: '2026-08-25T11:00:00', updated_at: '2026-08-25T11:00:00',
    subject: { id: 'sub-002', name: 'Physics', code: 'PHY', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  },
  {
    id: 'hw-003', class_id: 'cls-10a', subject_id: 'sub-005', teacher_id: 'tch-003',
    title: 'Essay Writing - My Dream India', description: 'Write an essay of 500 words on "My Dream India". Focus on development, education, and unity. Use at least 5 vocabulary words from this week\'s lesson.',
    due_date: '2026-08-30', attachment_url: null, status: 'active',
    created_at: '2026-08-24T09:00:00', updated_at: '2026-08-24T09:00:00',
    subject: { id: 'sub-005', name: 'English', code: 'ENG', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  },
  {
    id: 'hw-004', class_id: 'cls-10a', subject_id: 'sub-003', teacher_id: 'tch-005',
    title: 'Chemical Reactions Lab Report', description: 'Submit the lab report for the acid-base neutralization experiment conducted on Monday. Include observations, chemical equations, and conclusions.',
    due_date: '2026-08-27', attachment_url: null, status: 'active',
    created_at: '2026-08-23T14:00:00', updated_at: '2026-08-23T14:00:00',
    subject: { id: 'sub-003', name: 'Chemistry', code: 'CHEM', subject_type: 'core', standard: 10, academic_year: '2026-2027', description: null },
  },
];

// --- Events ---

export const mockEvents: SchoolEvent[] = [
  {
    id: 'evt-001', title: 'Annual Science Exhibition', description: 'Showcase your science projects and innovations. Open to all students from 8th to 12th standard. Prizes for top 3 projects in each category.',
    date: '2026-09-15', start_time: '09:00', end_time: '16:00', venue: 'School Auditorium & Labs',
    image_url: null, category: 'Academic', created_by: 'user-admin-001',
    visibility: 'all', status: 'upcoming', created_at: '2026-08-20',
  },
  {
    id: 'evt-002', title: 'Inter-School Cricket Tournament', description: 'Our school cricket team will be participating in the district-level inter-school cricket tournament. Come support our team!',
    date: '2026-09-05', start_time: '08:00', end_time: '17:00', venue: 'District Sports Complex',
    image_url: null, category: 'Sports', created_by: 'user-admin-001',
    visibility: 'all', status: 'upcoming', created_at: '2026-08-18',
  },
  {
    id: 'evt-003', title: 'Independence Day Celebration', description: 'Flag hoisting ceremony followed by cultural programs. All students must attend in full school uniform.',
    date: '2026-08-15', start_time: '07:30', end_time: '12:00', venue: 'School Ground',
    image_url: null, category: 'Cultural', created_by: 'user-admin-001',
    visibility: 'all', status: 'completed', created_at: '2026-08-10',
  },
  {
    id: 'evt-004', title: 'Parent-Teacher Meeting', description: 'PTM for all classes. Parents can discuss their child\'s academic progress with respective class teachers and subject teachers.',
    date: '2026-09-10', start_time: '10:00', end_time: '14:00', venue: 'Respective Classrooms',
    image_url: null, category: 'Academic', created_by: 'user-admin-001',
    visibility: 'all', status: 'upcoming', created_at: '2026-08-22',
  },
];

// --- Circulars ---

export const mockCirculars: Circular[] = [
  {
    id: 'cir-001', title: 'Ganesh Chaturthi Holiday', description: 'School will remain closed on September 7th (Saturday) on account of Ganesh Chaturthi. Classes will resume on Monday, September 9th.',
    category: 'holiday', published_by: 'user-admin-001', published_at: '2026-08-25',
    attachment_url: null, visibility: 'all', created_at: '2026-08-25',
  },
  {
    id: 'cir-002', title: 'Mid-Term Examination Schedule', description: 'Mid-term examinations for all classes (6th to 12th) will be held from September 20th to October 5th. Detailed timetable attached.',
    category: 'examination', published_by: 'user-admin-001', published_at: '2026-08-24',
    attachment_url: '/docs/midterm-schedule.pdf', visibility: 'all', created_at: '2026-08-24',
  },
  {
    id: 'cir-003', title: 'School Uniform Update', description: 'Starting from the next academic year, the school uniform color for winter will change. Parents please note the updated uniform specifications.',
    category: 'general', published_by: 'user-admin-001', published_at: '2026-08-20',
    attachment_url: null, visibility: 'all', created_at: '2026-08-20',
  },
];

// --- Achievements ---

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-001', title: 'State Level Science Olympiad - Gold Medal',
    description: 'Our student Kavya Iyer from Class 10-A won the Gold Medal in the Karnataka State Science Olympiad 2026.',
    category: 'academic', student_ids: ['stu-004'], team_name: null,
    level: 'State', date: '2026-07-15', image_url: null,
    published_by: 'user-admin-001', created_at: '2026-07-20',
  },
  {
    id: 'ach-002', title: 'District Cricket Championship - Winners',
    description: 'Smart School cricket team won the District Level Cricket Championship 2026, defeating St. Mary\'s School in the finals.',
    category: 'sports', student_ids: null, team_name: 'Smart School Cricket Team',
    level: 'District', date: '2026-06-28', image_url: null,
    published_by: 'user-admin-001', created_at: '2026-07-01',
  },
  {
    id: 'ach-003', title: 'National Coding Competition - 3rd Place',
    description: 'Arjun Kumar from Class 10-A secured 3rd place in the National Young Coders Championship 2026.',
    category: 'technology', student_ids: ['stu-003'], team_name: null,
    level: 'National', date: '2026-08-10', image_url: null,
    published_by: 'user-admin-001', created_at: '2026-08-12',
  },
];

// --- Complaints ---

export const mockComplaints: Complaint[] = [
  {
    id: 'cmp-001', complaint_number: 'CMP-2026-001', student_id: 'stu-001',
    category: 'infrastructure', title: 'Broken fan in classroom',
    description: 'The ceiling fan near the window in Room 501 is not working since last week. The classroom gets very hot during afternoon periods.',
    location: 'Room 501', attachment_url: null, priority: 'medium',
    status: 'in_progress', assigned_to: 'tch-004',
    created_at: '2026-08-20', updated_at: '2026-08-22',
  },
  {
    id: 'cmp-002', complaint_number: 'CMP-2026-002', student_id: 'stu-001',
    category: 'water', title: 'Water cooler not working',
    description: 'The water cooler on the second floor near Room 201 is not dispensing cold water.',
    location: '2nd Floor Corridor', attachment_url: null, priority: 'high',
    status: 'resolved', assigned_to: 'tch-004',
    created_at: '2026-08-15', updated_at: '2026-08-18',
  },
  {
    id: 'cmp-003', complaint_number: 'CMP-2026-003', student_id: 'stu-002',
    category: 'academic', title: 'Missing library books',
    description: 'Two books that I returned to the library on August 10th are still showing as issued in my library record.',
    location: 'Library', attachment_url: null, priority: 'low',
    status: 'submitted', assigned_to: null,
    created_at: '2026-08-24', updated_at: '2026-08-24',
  },
];

// --- Notifications ---

export const mockNotifications: Notification[] = [
  {
    id: 'not-001', recipient_id: 'user-student-001', title: 'New Homework Assigned',
    message: 'Mathematics homework "Quadratic Equations - Exercise 4.3" has been assigned. Due: Aug 28.',
    type: 'homework', reference_id: 'hw-001', is_read: false, created_at: '2026-08-25T10:05:00',
  },
  {
    id: 'not-002', recipient_id: 'user-student-001', title: 'Upcoming Event',
    message: 'Annual Science Exhibition is scheduled for September 15th at the School Auditorium.',
    type: 'event', reference_id: 'evt-001', is_read: false, created_at: '2026-08-20T09:00:00',
  },
  {
    id: 'not-003', recipient_id: 'user-student-001', title: 'Attendance Marked',
    message: 'Your attendance has been marked as Present for Period 1 - Mathematics.',
    type: 'attendance', reference_id: null, is_read: true, created_at: '2026-08-26T08:10:00',
  },
  {
    id: 'not-004', recipient_id: 'user-student-001', title: 'Complaint Update',
    message: 'Your complaint "Broken fan in classroom" status has been updated to "In Progress".',
    type: 'complaint', reference_id: 'cmp-001', is_read: true, created_at: '2026-08-22T14:30:00',
  },
  {
    id: 'not-005', recipient_id: 'user-student-001', title: 'New Circular',
    message: 'Mid-Term Examination Schedule has been published. Check the circulars section for details.',
    type: 'circular', reference_id: 'cir-002', is_read: false, created_at: '2026-08-24T11:00:00',
  },
  {
    id: 'not-006', recipient_id: 'user-student-001', title: 'Holiday Notice',
    message: 'School will remain closed on September 7th on account of Ganesh Chaturthi.',
    type: 'circular', reference_id: 'cir-001', is_read: true, created_at: '2026-08-25T08:00:00',
  },
];

// --- Exams ---

export const mockExams: Exam[] = [
  {
    id: 'exam-001', name: 'Unit Test 1', academic_year: '2026-2027', standard: 10,
    start_date: '2026-07-15', end_date: '2026-07-22', status: 'completed', created_at: '2026-06-15',
  },
  {
    id: 'exam-002', name: 'Mid-Term Examination', academic_year: '2026-2027', standard: 10,
    start_date: '2026-09-20', end_date: '2026-10-05', status: 'upcoming', created_at: '2026-08-20',
  },
  {
    id: 'exam-003', name: 'Unit Test 2', academic_year: '2026-2027', standard: 10,
    start_date: '2026-11-10', end_date: '2026-11-17', status: 'upcoming', created_at: '2026-08-20',
  },
];

export const mockExamSubjects: ExamSubject[] = [
  { id: 'es-001', exam_id: 'exam-002', subject_id: 'sub-001', exam_date: '2026-09-20', start_time: '09:00', end_time: '12:00', maximum_marks: 100, passing_marks: 33 },
  { id: 'es-002', exam_id: 'exam-002', subject_id: 'sub-002', exam_date: '2026-09-22', start_time: '09:00', end_time: '12:00', maximum_marks: 100, passing_marks: 33 },
  { id: 'es-003', exam_id: 'exam-002', subject_id: 'sub-003', exam_date: '2026-09-24', start_time: '09:00', end_time: '12:00', maximum_marks: 100, passing_marks: 33 },
  { id: 'es-004', exam_id: 'exam-002', subject_id: 'sub-005', exam_date: '2026-09-26', start_time: '09:00', end_time: '12:00', maximum_marks: 100, passing_marks: 33 },
  { id: 'es-005', exam_id: 'exam-002', subject_id: 'sub-007', exam_date: '2026-09-28', start_time: '09:00', end_time: '12:00', maximum_marks: 100, passing_marks: 33 },
];

// --- Marks (Unit Test 1 results) ---

export const mockMarks: (Mark & { subject_name: string; max_marks: number })[] = [
  { id: 'mk-001', student_id: 'stu-001', exam_subject_id: 'es-ut1-math', marks_obtained: 87, grade: 'A', remarks: null, entered_by: 'tch-001', updated_at: '2026-07-25', subject_name: 'Mathematics', max_marks: 100 },
  { id: 'mk-002', student_id: 'stu-001', exam_subject_id: 'es-ut1-phy', marks_obtained: 78, grade: 'B+', remarks: null, entered_by: 'tch-002', updated_at: '2026-07-25', subject_name: 'Physics', max_marks: 100 },
  { id: 'mk-003', student_id: 'stu-001', exam_subject_id: 'es-ut1-chem', marks_obtained: 92, grade: 'A+', remarks: 'Excellent', entered_by: 'tch-005', updated_at: '2026-07-25', subject_name: 'Chemistry', max_marks: 100 },
  { id: 'mk-004', student_id: 'stu-001', exam_subject_id: 'es-ut1-eng', marks_obtained: 85, grade: 'A', remarks: null, entered_by: 'tch-003', updated_at: '2026-07-25', subject_name: 'English', max_marks: 100 },
  { id: 'mk-005', student_id: 'stu-001', exam_subject_id: 'es-ut1-sst', marks_obtained: 90, grade: 'A+', remarks: null, entered_by: 'tch-004', updated_at: '2026-07-25', subject_name: 'Social Science', max_marks: 100 },
  { id: 'mk-006', student_id: 'stu-001', exam_subject_id: 'es-ut1-bio', marks_obtained: 82, grade: 'A', remarks: null, entered_by: 'tch-005', updated_at: '2026-07-25', subject_name: 'Biology', max_marks: 100 },
  { id: 'mk-007', student_id: 'stu-001', exam_subject_id: 'es-ut1-hin', marks_obtained: 75, grade: 'B+', remarks: null, entered_by: 'tch-003', updated_at: '2026-07-25', subject_name: 'Hindi', max_marks: 100 },
  { id: 'mk-008', student_id: 'stu-001', exam_subject_id: 'es-ut1-cs', marks_obtained: 95, grade: 'A+', remarks: 'Outstanding', entered_by: 'tch-002', updated_at: '2026-07-25', subject_name: 'Computer Science', max_marks: 100 },
];

// --- Rankings ---

export const mockRankings: (Ranking & { student_name: string; class_label: string })[] = [
  { id: 'rk-001', student_id: 'stu-004', exam_id: 'exam-001', category: 'class', standard: 10, section: 'A', rank: 1, total_marks: 745, total_max_marks: 800, percentage: 93.1, is_published: true, published_at: '2026-08-01', student_name: 'Kavya Iyer', class_label: '10-A' },
  { id: 'rk-002', student_id: 'stu-003', exam_id: 'exam-001', category: 'class', standard: 10, section: 'A', rank: 2, total_marks: 720, total_max_marks: 800, percentage: 90.0, is_published: true, published_at: '2026-08-01', student_name: 'Arjun Kumar', class_label: '10-A' },
  { id: 'rk-003', student_id: 'stu-001', exam_id: 'exam-001', category: 'class', standard: 10, section: 'A', rank: 3, total_marks: 684, total_max_marks: 800, percentage: 85.5, is_published: true, published_at: '2026-08-01', student_name: 'Aarav Sharma', class_label: '10-A' },
  { id: 'rk-004', student_id: 'stu-002', exam_id: 'exam-001', category: 'class', standard: 10, section: 'A', rank: 4, total_marks: 660, total_max_marks: 800, percentage: 82.5, is_published: true, published_at: '2026-08-01', student_name: 'Diya Patel', class_label: '10-A' },
  { id: 'rk-005', student_id: 'stu-005', exam_id: 'exam-001', category: 'class', standard: 10, section: 'A', rank: 5, total_marks: 640, total_max_marks: 800, percentage: 80.0, is_published: true, published_at: '2026-08-01', student_name: 'Rohan Reddy', class_label: '10-A' },
];

// --- Attendance Summary ---

export const mockAttendanceSummary = {
  totalDays: 120,
  present: 108,
  absent: 6,
  late: 4,
  leave: 2,
  percentage: 90,
};

// --- Student Activities ---

export const mockActivities: StudentActivity[] = [
  { id: 'act-001', student_id: 'stu-001', title: 'Science Club Member', category: 'Club', description: 'Active member of the school Science Club', date: '2026-06-15', result: 'Active', certificate_url: null, created_by: 'tch-002', created_at: '2026-06-15' },
  { id: 'act-002', student_id: 'stu-001', title: 'Inter-class Debate Competition', category: 'Cultural', description: 'Participated in the inter-class debate competition', date: '2026-07-20', result: '2nd Place', certificate_url: null, created_by: 'tch-003', created_at: '2026-07-22' },
  { id: 'act-003', student_id: 'stu-001', title: 'District Chess Tournament', category: 'Sports', description: 'Represented school in district level chess tournament', date: '2026-08-05', result: 'Quarter-finalist', certificate_url: null, created_by: 'tch-004', created_at: '2026-08-07' },
];

// --- Dashboard Stats ---

export const adminStats = {
  totalStudents: 842,
  totalTeachers: 45,
  totalClasses: 21,
  attendanceToday: 94.2,
  pendingComplaints: 8,
  upcomingEvents: 4,
  totalParents: 680,
  totalSubjects: 35,
};

export const monthlyAttendanceData = [
  { month: 'Apr', attendance: 95 },
  { month: 'May', attendance: 92 },
  { month: 'Jun', attendance: 88 },
  { month: 'Jul', attendance: 91 },
  { month: 'Aug', attendance: 94 },
];

export const classWiseAttendance = [
  { class: '6th', percentage: 96 },
  { class: '7th', percentage: 94 },
  { class: '8th', percentage: 92 },
  { class: '9th', percentage: 93 },
  { class: '10th', percentage: 91 },
  { class: '11th', percentage: 89 },
  { class: '12th', percentage: 88 },
];

export const subjectPerformance = [
  { subject: 'Math', average: 76 },
  { subject: 'Physics', average: 72 },
  { subject: 'Chemistry', average: 78 },
  { subject: 'Biology', average: 74 },
  { subject: 'English', average: 80 },
  { subject: 'Hindi', average: 71 },
  { subject: 'SST', average: 77 },
  { subject: 'CS', average: 82 },
];
