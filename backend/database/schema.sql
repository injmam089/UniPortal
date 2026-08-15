-- =========================================================
-- UniPortal Student Management System Relational Database Schema
-- Compatible with SQLite and standard SQL
-- =========================================================

-- 1. Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student', -- 'student', 'teacher', 'admin'
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students profile details
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    student_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    program TEXT NOT NULL,
    university TEXT NOT NULL,
    semester TEXT NOT NULL,
    enrollment_year TEXT NOT NULL,
    cgpa REAL NOT NULL DEFAULT 0.00,
    phone TEXT,
    dob TEXT,
    gender TEXT,
    address TEXT,
    advisor TEXT,
    group_id TEXT DEFAULT 'Group 1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Courses catalog
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    credits INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    prof_name TEXT NOT NULL,
    room TEXT NOT NULL,
    color TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Class Timetable / Schedule
CREATE TABLE IF NOT EXISTS schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week TEXT NOT NULL, -- 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    period_num INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    course_id INTEGER,
    code TEXT NOT NULL,
    subject TEXT NOT NULL,
    room TEXT NOT NULL,
    prof_name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Theory', -- 'Theory', 'Lab'
    group_id TEXT DEFAULT 'All', -- 'All', 'Group 1', 'Group 2'
    duration INTEGER DEFAULT 1,
    color TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- 5. Attendance tracking
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    code TEXT,
    present_count INTEGER NOT NULL DEFAULT 0,
    total_count INTEGER NOT NULL DEFAULT 0,
    percentage REAL NOT NULL DEFAULT 0.00,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 6. Results and Grades
CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    credits INTEGER NOT NULL,
    ese_marks INTEGER NOT NULL DEFAULT 0,
    ca_marks INTEGER NOT NULL DEFAULT 0,
    total_marks INTEGER NOT NULL DEFAULT 0,
    grade TEXT NOT NULL,
    grade_points REAL NOT NULL DEFAULT 0.0,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 7. Semester GPA summary
CREATE TABLE IF NOT EXISTS semester_gpa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    sgpa REAL NOT NULL,
    credits_earned INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 8. Fee Components
CREATE TABLE IF NOT EXISTS fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    component TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Paid', 'Pending', 'Overdue'
    due_date TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 9. Payment Transactions
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    txn_id TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'Paid',
    payment_date TEXT NOT NULL,
    method TEXT DEFAULT 'Card',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 10. Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    questions_count INTEGER NOT NULL,
    time_limit INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    color TEXT NOT NULL,
    attempted INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    questions_json TEXT NOT NULL
);

-- 11. Quiz History
CREATE TABLE IF NOT EXISTS quiz_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    quiz_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    score TEXT NOT NULL,
    percentage INTEGER NOT NULL,
    grade TEXT NOT NULL,
    attempt_date TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 12. Assignments
CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    code TEXT NOT NULL,
    deadline TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'submitted', 'late'
    file_name TEXT,
    submission_date TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 13. PYQ Papers
CREATE TABLE IF NOT EXISTS pyq_papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    semester INTEGER NOT NULL,
    subject TEXT NOT NULL,
    code TEXT NOT NULL,
    year TEXT NOT NULL,
    exam_type TEXT NOT NULL, -- 'Mid-Sem', 'End-Sem'
    file_name TEXT,
    downloads INTEGER DEFAULT 0,
    popular INTEGER DEFAULT 0
);

-- 14. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    icon TEXT NOT NULL,
    bg_gradient TEXT NOT NULL,
    text TEXT NOT NULL,
    time_ago TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 15. Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    time_text TEXT NOT NULL,
    color TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
