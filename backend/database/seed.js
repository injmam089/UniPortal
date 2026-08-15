const bcrypt = require('bcryptjs');

function seedDatabase(db) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('password123', salt);

    // 1. Users
    db.run(
        `INSERT INTO users (username, password_hash, role, email) VALUES 
        (?, ?, 'student', 'injmamah@student.iul.ac.in'),
        (?, ?, 'teacher', 'arshiya.dilshad@iul.ac.in'),
        (?, ?, 'admin', 'admin@iul.ac.in')`,
        ['student1', passwordHash, 'teacher1', passwordHash, 'admin', passwordHash]
    );

    const studentUser = db.queryOne("SELECT id FROM users WHERE username = 'student1'");

    // 2. Student Details
    db.run(
        `INSERT INTO students (
            user_id, student_id, full_name, program, university, semester, enrollment_year, 
            cgpa, phone, dob, gender, address, advisor, group_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            studentUser.id,
            'STU-2400103912',
            'Injmam Ansari',
            'Bachelor of Computer Application (BCA)',
            'Integral University, Lucknow',
            '5th Semester',
            '2024',
            8.15,
            '+91 7052959935',
            'March 09, 2004',
            'Male',
            'J.N BOYS Hostel ROOM 05, LUCKNOW, INDIA 226026',
            'Arshiya Dilshad',
            'Group 1'
        ]
    );

    const studentRecord = db.queryOne("SELECT id FROM students WHERE student_id = 'STU-2400103912'");

    // 3. Courses catalog
    const courses = [
        { code: 'BCA501', name: 'Software Engineering Concepts', credits: 4, sem: 5, prof: 'Dr. Sarah Mitchell', room: 'Room 301', color: '#667eea', progress: 75 },
        { code: 'BCA502', name: 'Web Technology using Java', credits: 4, sem: 5, prof: 'Prof. David Chen', room: 'Lab 2', color: '#00d2ff', progress: 60 },
        { code: 'BCA503', name: 'Computer Graphics & Multimedia', credits: 4, sem: 5, prof: 'Dr. Emily Watson', room: 'Room 205', color: '#f093fb', progress: 85 },
        { code: 'BCA504', name: 'Cloud Computing Architecture', credits: 3, sem: 5, prof: 'Prof. Robert Taylor', room: 'Room 410', color: '#ff6b6b', progress: 45 },
        { code: 'BCA505', name: 'Cyber Law and Information Security', credits: 3, sem: 5, prof: 'Dr. Lisa Anderson', room: 'Room 102', color: '#4ade80', progress: 90 },
        { code: 'BCA506', name: 'Open Elective - AI & Machine Learning', credits: 3, sem: 5, prof: 'Dr. James Wilson', room: 'Auditorium B', color: '#fbbf24', progress: 70 },
        { code: 'BCA507', name: 'Web Technology Lab', credits: 2, sem: 5, prof: 'Prof. David Chen', room: 'Lab 2', color: '#00d2ff', progress: 80 },
        { code: 'BCA508', name: 'Computer Graphics Lab', credits: 2, sem: 5, prof: 'Dr. Emily Watson', room: 'Lab 4', color: '#f093fb', progress: 65 },
        { code: 'BCA509', name: 'Major Project Phase-I', credits: 4, sem: 5, prof: 'Arshiya Dilshad', room: 'Seminar Hall', color: '#a855f7', progress: 50 }
    ];

    for (const c of courses) {
        db.run(
            `INSERT INTO courses (code, name, credits, semester, prof_name, room, color, progress)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [c.code, c.name, c.credits, c.sem, c.prof, c.room, c.color, c.progress]
        );
    }

    // 4. Timetable / Schedule (Monday to Saturday periods)
    const scheduleItems = [
        // Monday
        { day: 'Mon', p: 1, s: '09:00 AM', e: '09:50 AM', code: 'BCA501', sub: 'Software Engineering Concepts', room: 'Room 301', prof: 'Dr. Sarah Mitchell', type: 'Theory', grp: 'All', dur: 1, col: '#667eea' },
        { day: 'Mon', p: 2, s: '09:50 AM', e: '10:40 AM', code: 'BCA502', sub: 'Web Technology using Java', room: 'Room 301', prof: 'Prof. David Chen', type: 'Theory', grp: 'All', dur: 1, col: '#00d2ff' },
        { day: 'Mon', p: 3, s: '10:40 AM', e: '11:30 AM', code: 'BCA503', sub: 'Computer Graphics & Multimedia', room: 'Room 205', prof: 'Dr. Emily Watson', type: 'Theory', grp: 'All', dur: 1, col: '#f093fb' },
        { day: 'Mon', p: 4, s: '11:30 AM', e: '12:20 PM', code: 'BCA504', sub: 'Cloud Computing Architecture', room: 'Room 410', prof: 'Prof. Robert Taylor', type: 'Theory', grp: 'All', dur: 1, col: '#ff6b6b' },
        { day: 'Mon', p: 5, s: '12:40 PM', e: '01:30 PM', code: 'BCA505', sub: 'Cyber Law and Info Security', room: 'Room 102', prof: 'Dr. Lisa Anderson', type: 'Theory', grp: 'All', dur: 1, col: '#4ade80' },
        { day: 'Mon', p: 6, s: '01:30 PM', e: '02:20 PM', code: 'BCA506', sub: 'Open Elective - AI & ML', room: 'Auditorium B', prof: 'Dr. James Wilson', type: 'Theory', grp: 'All', dur: 1, col: '#fbbf24' },
        { day: 'Mon', p: 7, s: '02:20 PM', e: '04:00 PM', code: 'BCA507', sub: 'Web Technology Lab', room: 'Lab 2', prof: 'Prof. David Chen', type: 'Lab', grp: 'Group 1', dur: 2, col: '#00d2ff' },

        // Tuesday
        { day: 'Tue', p: 1, s: '09:00 AM', e: '09:50 AM', code: 'BCA503', sub: 'Computer Graphics & Multimedia', room: 'Room 205', prof: 'Dr. Emily Watson', type: 'Theory', grp: 'All', dur: 1, col: '#f093fb' },
        { day: 'Tue', p: 2, s: '09:50 AM', e: '10:40 AM', code: 'BCA501', sub: 'Software Engineering Concepts', room: 'Room 301', prof: 'Dr. Sarah Mitchell', type: 'Theory', grp: 'All', dur: 1, col: '#667eea' },
        { day: 'Tue', p: 3, s: '10:40 AM', e: '11:30 AM', code: 'BCA502', sub: 'Web Technology using Java', room: 'Room 301', prof: 'Prof. David Chen', type: 'Theory', grp: 'All', dur: 1, col: '#00d2ff' },
        { day: 'Tue', p: 5, s: '12:40 PM', e: '01:30 PM', code: 'BCA505', sub: 'Cyber Law and Info Security', room: 'Room 102', prof: 'Dr. Lisa Anderson', type: 'Theory', grp: 'All', dur: 1, col: '#4ade80' },
        { day: 'Tue', p: 6, s: '01:30 PM', e: '02:20 PM', code: 'BCA506', sub: 'Open Elective - AI & ML', room: 'Auditorium B', prof: 'Dr. James Wilson', type: 'Theory', grp: 'All', dur: 1, col: '#fbbf24' },
        { day: 'Tue', p: 7, s: '02:20 PM', e: '04:00 PM', code: 'BCA508', sub: 'Computer Graphics Lab', room: 'Lab 4', prof: 'Dr. Emily Watson', type: 'Lab', grp: 'Group 1', dur: 2, col: '#f093fb' },

        // Wednesday
        { day: 'Wed', p: 1, s: '09:00 AM', e: '09:50 AM', code: 'BCA504', sub: 'Cloud Computing Architecture', room: 'Room 410', prof: 'Prof. Robert Taylor', type: 'Theory', grp: 'All', dur: 1, col: '#ff6b6b' },
        { day: 'Wed', p: 2, s: '09:50 AM', e: '10:40 AM', code: 'BCA501', sub: 'Software Engineering Concepts', room: 'Room 301', prof: 'Dr. Sarah Mitchell', type: 'Theory', grp: 'All', dur: 1, col: '#667eea' },
        { day: 'Wed', p: 3, s: '10:40 AM', e: '11:30 AM', code: 'BCA502', sub: 'Web Technology using Java', room: 'Room 301', prof: 'Prof. David Chen', type: 'Theory', grp: 'All', dur: 1, col: '#00d2ff' },
        { day: 'Wed', p: 4, s: '11:30 AM', e: '12:20 PM', code: 'BCA503', sub: 'Computer Graphics & Multimedia', room: 'Room 205', prof: 'Dr. Emily Watson', type: 'Theory', grp: 'All', dur: 1, col: '#f093fb' },
        { day: 'Wed', p: 5, s: '12:40 PM', e: '02:20 PM', code: 'BCA509', sub: 'Major Project Phase-I Guidance', room: 'Seminar Hall', prof: 'Arshiya Dilshad', type: 'Lab', grp: 'All', dur: 2, col: '#a855f7' },
        { day: 'Wed', p: 7, s: '02:20 PM', e: '03:10 PM', code: 'BCA506', sub: 'Open Elective - AI & ML', room: 'Auditorium B', prof: 'Dr. James Wilson', type: 'Theory', grp: 'All', dur: 1, col: '#fbbf24' },

        // Thursday
        { day: 'Thu', p: 1, s: '09:00 AM', e: '09:50 AM', code: 'BCA502', sub: 'Web Technology using Java', room: 'Room 301', prof: 'Prof. David Chen', type: 'Theory', grp: 'All', dur: 1, col: '#00d2ff' },
        { day: 'Thu', p: 2, s: '09:50 AM', e: '10:40 AM', code: 'BCA505', sub: 'Cyber Law and Info Security', room: 'Room 102', prof: 'Dr. Lisa Anderson', type: 'Theory', grp: 'All', dur: 1, col: '#4ade80' },
        { day: 'Thu', p: 3, s: '10:40 AM', e: '11:30 AM', code: 'BCA504', sub: 'Cloud Computing Architecture', room: 'Room 410', prof: 'Prof. Robert Taylor', type: 'Theory', grp: 'All', dur: 1, col: '#ff6b6b' },
        { day: 'Thu', p: 4, s: '11:30 AM', e: '12:20 PM', code: 'BCA501', sub: 'Software Engineering Concepts', room: 'Room 301', prof: 'Dr. Sarah Mitchell', type: 'Theory', grp: 'All', dur: 1, col: '#667eea' },
        { day: 'Thu', p: 5, s: '12:40 PM', e: '01:30 PM', code: 'BCA503', sub: 'Computer Graphics & Multimedia', room: 'Room 205', prof: 'Dr. Emily Watson', type: 'Theory', grp: 'All', dur: 1, col: '#f093fb' },
        { day: 'Thu', p: 6, s: '01:30 PM', e: '03:10 PM', code: 'BCA507', sub: 'Web Technology Lab (Practice)', room: 'Lab 2', prof: 'Prof. David Chen', type: 'Lab', grp: 'Group 1', dur: 2, col: '#00d2ff' },

        // Friday
        { day: 'Fri', p: 1, s: '09:00 AM', e: '09:50 AM', code: 'BCA501', sub: 'Software Engineering Concepts', room: 'Room 301', prof: 'Dr. Sarah Mitchell', type: 'Theory', grp: 'All', dur: 1, col: '#667eea' },
        { day: 'Fri', p: 2, s: '09:50 AM', e: '10:40 AM', code: 'BCA506', sub: 'Open Elective - AI & ML', room: 'Auditorium B', prof: 'Dr. James Wilson', type: 'Theory', grp: 'All', dur: 1, col: '#fbbf24' },
        { day: 'Fri', p: 3, s: '10:40 AM', e: '11:30 AM', code: 'BCA504', sub: 'Cloud Computing Architecture', room: 'Room 410', prof: 'Prof. Robert Taylor', type: 'Theory', grp: 'All', dur: 1, col: '#ff6b6b' },
        { day: 'Fri', p: 4, s: '11:30 AM', e: '12:20 PM', code: 'BCA505', sub: 'Cyber Law and Info Security', room: 'Room 102', prof: 'Dr. Lisa Anderson', type: 'Theory', grp: 'All', dur: 1, col: '#4ade80' },
        { day: 'Fri', p: 5, s: '12:40 PM', e: '02:20 PM', code: 'BCA508', sub: 'Computer Graphics Lab (Rendering)', room: 'Lab 4', prof: 'Dr. Emily Watson', type: 'Lab', grp: 'Group 1', dur: 2, col: '#f093fb' },

        // Saturday
        { day: 'Sat', p: 1, s: '09:00 AM', e: '10:40 AM', code: 'BCA509', sub: 'Major Project Phase-I Review', room: 'Seminar Hall', prof: 'Arshiya Dilshad', type: 'Lab', grp: 'All', dur: 2, col: '#a855f7' },
        { day: 'Sat', p: 3, s: '10:40 AM', e: '12:20 PM', code: 'BCA506', sub: 'AI & ML Seminar & Hands-on', room: 'Auditorium B', prof: 'Dr. James Wilson', type: 'Theory', grp: 'All', dur: 2, col: '#fbbf24' }
    ];

    for (const item of scheduleItems) {
        db.run(
            `INSERT INTO schedule (day_of_week, period_num, start_time, end_time, code, subject, room, prof_name, type, group_id, duration, color)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [item.day, item.p, item.s, item.e, item.code, item.sub, item.room, item.prof, item.type, item.grp, item.dur, item.col]
        );
    }

    // 5. Attendance
    const attendances = [
        { subject: 'Software Engineering Concepts', code: 'BCA501', present: 32, total: 36, percentage: 88.89 },
        { subject: 'Web Technology using Java', code: 'BCA502', present: 29, total: 34, percentage: 85.29 },
        { subject: 'Computer Graphics & Multimedia', code: 'BCA503', present: 31, total: 35, percentage: 88.57 },
        { subject: 'Cloud Computing Architecture', code: 'BCA504', present: 27, total: 32, percentage: 84.38 },
        { subject: 'Cyber Law and Info Security', code: 'BCA505', present: 28, total: 30, percentage: 93.33 },
        { subject: 'Open Elective - AI & ML', code: 'BCA506', present: 26, total: 32, percentage: 81.25 },
        { subject: 'Web Technology Lab', code: 'BCA507', present: 18, total: 20, percentage: 90.00 },
        { subject: 'Computer Graphics Lab', code: 'BCA508', present: 17, total: 20, percentage: 85.00 },
        { subject: 'Major Project Phase-I', code: 'BCA509', present: 19, total: 20, percentage: 95.00 }
    ];

    for (const a of attendances) {
        db.run(
            `INSERT INTO attendance (student_id, subject, code, present_count, total_count, percentage)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [studentRecord.id, a.subject, a.code, a.present, a.total, a.percentage]
        );
    }

    // 6. Results and SGPA
    const semesterResults = {
        1: {
            sgpa: 8.20, credits: 24,
            subjects: [
                { code: 'BCA101', name: 'Fundamentals of IT & Computer', credits: 4, ese: 34, ca: 52, total: 86, grade: 'A', points: 8.6 },
                { code: 'BCA102', name: 'Programming in C', credits: 4, ese: 36, ca: 54, total: 90, grade: 'A+', points: 9.0 },
                { code: 'BCA103', name: 'Mathematics I', credits: 4, ese: 30, ca: 48, total: 78, grade: 'B+', points: 7.8 },
                { code: 'BCA104', name: 'Professional Communication', credits: 3, ese: 32, ca: 50, total: 82, grade: 'A', points: 8.2 },
                { code: 'BCA105', name: 'Programming in C Lab', credits: 2, ese: 38, ca: 56, total: 94, grade: 'A+', points: 9.4 },
                { code: 'BCA106', name: 'IT & PC Hardware Lab', credits: 2, ese: 35, ca: 52, total: 87, grade: 'A', points: 8.7 }
            ]
        },
        2: {
            sgpa: 8.05, credits: 24,
            subjects: [
                { code: 'BCA201', name: 'Data Structures using C', credits: 4, ese: 33, ca: 51, total: 84, grade: 'A', points: 8.4 },
                { code: 'BCA202', name: 'Digital Electronics', credits: 4, ese: 31, ca: 47, total: 78, grade: 'B+', points: 7.8 },
                { code: 'BCA203', name: 'Discrete Mathematics', credits: 4, ese: 29, ca: 46, total: 75, grade: 'B+', points: 7.5 },
                { code: 'BCA204', name: 'Environmental Studies', credits: 3, ese: 35, ca: 53, total: 88, grade: 'A', points: 8.8 },
                { code: 'BCA205', name: 'Data Structures Lab', credits: 2, ese: 37, ca: 55, total: 92, grade: 'A+', points: 9.2 }
            ]
        },
        3: {
            sgpa: 8.25, credits: 24,
            subjects: [
                { code: 'BCA301', name: 'Object Oriented Programming with C++', credits: 4, ese: 35, ca: 53, total: 88, grade: 'A', points: 8.8 },
                { code: 'BCA302', name: 'Database Management Systems', credits: 4, ese: 36, ca: 55, total: 91, grade: 'A+', points: 9.1 },
                { code: 'BCA303', name: 'Computer Architecture & Org', credits: 4, ese: 31, ca: 48, total: 79, grade: 'B+', points: 7.9 },
                { code: 'BCA304', name: 'Operating System Principles', credits: 4, ese: 32, ca: 49, total: 81, grade: 'A', points: 8.1 },
                { code: 'BCA305', name: 'DBMS Lab with Oracle/MySQL', credits: 2, ese: 38, ca: 57, total: 95, grade: 'A+', points: 9.5 }
            ]
        },
        4: {
            sgpa: 8.10, credits: 24,
            subjects: [
                { code: 'BCA401', name: 'Python Programming Essentials', credits: 4, ese: 36, ca: 54, total: 90, grade: 'A+', points: 9.0 },
                { code: 'BCA402', name: 'Computer Networks & Security', credits: 4, ese: 32, ca: 48, total: 80, grade: 'A', points: 8.0 },
                { code: 'BCA403', name: 'Design & Analysis of Algorithms', credits: 4, ese: 30, ca: 47, total: 77, grade: 'B+', points: 7.7 },
                { code: 'BCA404', name: 'Management Information Systems', credits: 3, ese: 34, ca: 51, total: 85, grade: 'A', points: 8.5 },
                { code: 'BCA405', name: 'Python Programming Lab', credits: 2, ese: 38, ca: 56, total: 94, grade: 'A+', points: 9.4 }
            ]
        },
        5: {
            sgpa: 8.15, credits: 25,
            subjects: [
                { code: 'BCA501', name: 'Software Engineering Concepts', credits: 4, ese: 33, ca: 52, total: 85, grade: 'A', points: 8.5 },
                { code: 'BCA502', name: 'Web Technology using Java', credits: 4, ese: 34, ca: 53, total: 87, grade: 'A', points: 8.7 },
                { code: 'BCA503', name: 'Computer Graphics & Multimedia', credits: 4, ese: 31, ca: 49, total: 80, grade: 'A', points: 8.0 },
                { code: 'BCA504', name: 'Cloud Computing Architecture', credits: 3, ese: 30, ca: 46, total: 76, grade: 'B+', points: 7.6 },
                { code: 'BCA505', name: 'Cyber Law and Info Security', credits: 3, ese: 35, ca: 54, total: 89, grade: 'A', points: 8.9 },
                { code: 'BCA506', name: 'Open Elective - AI & ML', credits: 3, ese: 32, ca: 50, total: 82, grade: 'A', points: 8.2 },
                { code: 'BCA507', name: 'Web Technology Lab', credits: 2, ese: 37, ca: 55, total: 92, grade: 'A+', points: 9.2 },
                { code: 'BCA508', name: 'Computer Graphics Lab', credits: 2, ese: 36, ca: 54, total: 90, grade: 'A+', points: 9.0 }
            ]
        }
    };

    for (const [sem, data] of Object.entries(semesterResults)) {
        db.run(
            `INSERT INTO semester_gpa (student_id, semester, sgpa, credits_earned) VALUES (?, ?, ?, ?)`,
            [studentRecord.id, parseInt(sem), data.sgpa, data.credits]
        );

        for (const sub of data.subjects) {
            db.run(
                `INSERT INTO results (student_id, semester, code, name, credits, ese_marks, ca_marks, total_marks, grade, grade_points)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [studentRecord.id, parseInt(sem), sub.code, sub.name, sub.credits, sub.ese, sub.ca, sub.total, sub.grade, sub.points]
            );
        }
    }

    // 7. Fees
    const feeItems = [
        { component: 'Tuition Fee (Semester 5)', amount: 80000, status: 'Paid', due: '2026-07-15' },
        { component: 'Laboratory & Practical Fee', amount: 15000, status: 'Paid', due: '2026-07-15' },
        { component: 'Examination Fee (5th Sem)', amount: 6000, status: 'Paid', due: '2026-08-01' },
        { component: 'Library & Online Access Fee', amount: 4000, status: 'Pending', due: '2026-09-15' },
        { component: 'Hostel Maintenance & Utilities', amount: 12000, status: 'Pending', due: '2026-09-15' },
        { component: 'University Development Fund', amount: 3000, status: 'Pending', due: '2026-09-15' }
    ];

    for (const f of feeItems) {
        db.run(
            `INSERT INTO fees (student_id, component, amount, status, due_date) VALUES (?, ?, ?, ?, ?)`,
            [studentRecord.id, f.component, f.amount, f.status, f.due]
        );
    }

    // 8. Payments
    const payments = [
        { txn: 'TXN-2408-9841', desc: 'Semester 5 Tuition Fee (Full)', amount: 80000, status: 'Paid', date: '2026-07-10', method: 'UPI / NetBanking' },
        { txn: 'TXN-2408-9512', desc: 'Laboratory & Practical Fee', amount: 15000, status: 'Paid', date: '2026-07-12', method: 'Debit Card' },
        { txn: 'TXN-2408-9201', desc: 'Examination Fee (Odd Semester)', amount: 6000, status: 'Paid', date: '2026-07-28', method: 'UPI' }
    ];

    for (const p of payments) {
        db.run(
            `INSERT INTO payments (student_id, txn_id, description, amount, status, payment_date, method)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [studentRecord.id, p.txn, p.desc, p.amount, p.status, p.date, p.method]
        );
    }

    // 9. Quizzes
    const quizzes = [
        {
            id: 1, subject: 'Software Engineering Concepts', title: 'Agile & SDLC Models', questions_count: 5, time_limit: 5, difficulty: 'Medium', color: '#667eea', attempted: 1, score: 4,
            questions: [
                { q: 'Which SDLC model is characterized by customer involvement at each sprint?', options: ['Waterfall', 'Agile Scrum', 'Spiral', 'V-Model'], correct: 1 },
                { q: 'What does SRS stand for in Software Engineering?', options: ['System Rapid Standard', 'Software Requirements Specification', 'Software Resource System', 'Standard Requirement Script'], correct: 1 },
                { q: 'Which testing level is done directly by developers on individual modules?', options: ['Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing'], correct: 0 },
                { q: 'In software metrics, what does Cyclomatic Complexity measure?', options: ['Lines of code', 'Execution time', 'Number of linearly independent paths', 'Memory usage'], correct: 2 },
                { q: 'What is refactoring in software maintenance?', options: ['Fixing bugs', 'Changing external behavior', 'Restructuring code without changing behavior', 'Adding new features'], correct: 2 }
            ]
        },
        {
            id: 2, subject: 'Web Technology using Java', title: 'Java Servlets & JSP Fundamentals', questions_count: 5, time_limit: 5, difficulty: 'Medium', color: '#00d2ff', attempted: 1, score: 5,
            questions: [
                { q: 'Which interface must all Java Servlets implement?', options: ['HttpServlet', 'Servlet', 'GenericServlet', 'ServletConfig'], correct: 1 },
                { q: 'Which HTTP method is idempotent and used to retrieve data?', options: ['POST', 'GET', 'DELETE', 'CONNECT'], correct: 1 },
                { q: 'What is the lifecycle method called when a servlet is destroyed?', options: ['finalize()', 'stop()', 'destroy()', 'close()'], correct: 2 },
                { q: 'In JSP, which implicit object represents the HttpServletRequest?', options: ['req', 'request', 'httpRequest', 'in'], correct: 1 },
                { q: 'Which tag is used for JSP Scriptlets?', options: ['<%! %>', '<%-- %>', '<%= %>', '<% %>'], correct: 3 }
            ]
        },
        {
            id: 3, subject: 'Computer Graphics & Multimedia', title: 'Rasterization & Transformations', questions_count: 5, time_limit: 5, difficulty: 'Hard', color: '#f093fb', attempted: 1, score: 3,
            questions: [
                { q: 'Which line drawing algorithm uses only integer arithmetic?', options: ['DDA Algorithm', "Bresenham's Algorithm", 'Midpoint Algorithm', 'Scanline Algorithm'], correct: 1 },
                { q: 'What is homogeneous coordinates representation used for?', options: ['Color grading', 'Combining translation with linear transformations', 'Antialiasing', 'Depth testing'], correct: 1 },
                { q: 'Which algorithm is widely used for polygon clipping?', options: ['Cohen-Sutherland', 'Sutherland-Hodgman', 'Weiler-Atherton', "Bresenham's"], correct: 1 },
                { q: 'What does RGB color model stand for?', options: ['Red Green Black', 'Red Grey Blue', 'Red Green Blue', 'Radial Gradient Bitmap'], correct: 2 },
                { q: 'In 3D viewing, what is the Z-buffer algorithm used for?', options: ['Color blending', 'Hidden surface removal', 'Shading', 'Texture mapping'], correct: 1 }
            ]
        },
        {
            id: 4, subject: 'Cloud Computing Architecture', title: 'Service Models & Virtualization', questions_count: 5, time_limit: 5, difficulty: 'Medium', color: '#ff6b6b', attempted: 1, score: 4,
            questions: [
                { q: 'Which cloud service model provides virtual machines and storage?', options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'], correct: 2 },
                { q: 'What is a Type-1 Hypervisor also known as?', options: ['Hosted', 'Bare-metal', 'Container', 'Microkernel'], correct: 1 },
                { q: 'Which AWS service provides serverless compute?', options: ['EC2', 'S3', 'Lambda', 'RDS'], correct: 2 },
                { q: 'What is horizontal scaling in cloud architecture?', options: ['Adding bigger CPU', 'Adding more machine instances', 'Adding RAM', 'Upgrading storage SSD'], correct: 1 },
                { q: 'Which protocol is standard for secure object storage APIs?', options: ['FTP', 'REST over HTTPS', 'Telnet', 'SMTP'], correct: 1 }
            ]
        },
        {
            id: 5, subject: 'Cyber Law and Info Security', title: 'IT Act & Cryptography', questions_count: 5, time_limit: 5, difficulty: 'Easy', color: '#4ade80', attempted: 0, score: 0,
            questions: [
                { q: 'In which year was the Information Technology Act enacted in India?', options: ['1998', '2000', '2008', '2012'], correct: 1 },
                { q: 'Which section of IT Act deals with computer source documents tampering?', options: ['Section 65', 'Section 66', 'Section 67', 'Section 43'], correct: 0 },
                { q: 'What is asymmetric key cryptography?', options: ['Single shared key', 'Public and private key pair', 'No key', 'Random hash only'], correct: 1 },
                { q: 'What does CIA triad in cybersecurity stand for?', options: ['Control, Integrity, Access', 'Confidentiality, Integrity, Availability', 'Cyber, Internet, Authentication', 'Central, Internal, Audit'], correct: 1 },
                { q: 'What is phishing?', options: ['Network scanning', 'Fraudulent attempt to steal credentials', 'DDoS attack', 'SQL Injection'], correct: 1 }
            ]
        },
        {
            id: 6, subject: 'Open Elective - AI & ML', title: 'Machine Learning Basics', questions_count: 5, time_limit: 5, difficulty: 'Hard', color: '#fbbf24', attempted: 0, score: 0,
            questions: [
                { q: 'Which type of learning uses labeled input and output data?', options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Self-Supervised'], correct: 0 },
                { q: 'What is overfitting in a machine learning model?', options: ['High bias on training set', 'Poor performance on training data', 'High variance, fits noise in training data', 'Fast convergence'], correct: 2 },
                { q: 'Which algorithm is commonly used for classification tasks?', options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'], correct: 1 },
                { q: 'What is the activation function typically used in the output layer for binary classification?', options: ['ReLU', 'Sigmoid', 'Softmax', 'Tanh'], correct: 1 },
                { q: 'What does CNN stand for in Deep Learning?', options: ['Central Neural Network', 'Convolutional Neural Network', 'Connected Node Net', 'Cyclic Network Node'], correct: 1 }
            ]
        }
    ];

    for (const q of quizzes) {
        db.run(
            `INSERT INTO quizzes (id, subject, title, questions_count, time_limit, difficulty, color, attempted, score, questions_json)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [q.id, q.subject, q.title, q.questions_count, q.time_limit, q.difficulty, q.color, q.attempted, q.score, JSON.stringify(q.questions)]
        );
    }

    // 10. Quiz History
    const quizHistoryRecords = [
        { quiz: 'Agile & SDLC Models Quiz', sub: 'Software Engineering Concepts', score: '4/5', pct: 80, grade: 'A', date: 'Aug 5, 2026' },
        { quiz: 'Java Servlets & JSP Fundamentals', sub: 'Web Technology using Java', score: '5/5', pct: 100, grade: 'A+', date: 'Aug 3, 2026' },
        { quiz: 'Rasterization & Transformations', sub: 'Computer Graphics & Multimedia', score: '3/5', pct: 60, grade: 'B', date: 'Jul 28, 2026' },
        { quiz: 'Service Models & Virtualization', sub: 'Cloud Computing Architecture', score: '4/5', pct: 80, grade: 'A', date: 'Jul 25, 2026' }
    ];

    for (const qh of quizHistoryRecords) {
        db.run(
            `INSERT INTO quiz_history (student_id, quiz_title, subject, score, percentage, grade, attempt_date)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [studentRecord.id, qh.quiz, qh.sub, qh.score, qh.pct, qh.grade, qh.date]
        );
    }

    // 11. Assignments
    const assignments = [
        { id: 1, title: 'Software Requirement Specification (SRS) for Library System', sub: 'Software Engineering Concepts', code: 'BCA501', deadline: '2026-08-20', status: 'pending', file: null },
        { id: 2, title: 'Java Servlet User Authentication with Session Tracking', sub: 'Web Technology using Java', code: 'BCA502', deadline: '2026-08-22', status: 'pending', file: null },
        { id: 3, title: 'Bresenham Circle Drawing Algorithm Report in OpenGL/C', sub: 'Computer Graphics & Multimedia', code: 'BCA503', deadline: '2026-08-10', status: 'submitted', file: 'CG_Bresenham_Report.pdf', subDate: '2026-08-08' },
        { id: 4, title: 'AWS Cloud Architecture Comparative Analysis', sub: 'Cloud Computing Architecture', code: 'BCA504', deadline: '2026-08-05', status: 'submitted', file: 'Cloud_AWS_Architecture.pdf', subDate: '2026-08-04' },
        { id: 5, title: 'Case Study on Information Technology Act Section 66A', sub: 'Cyber Law and Info Security', code: 'BCA505', deadline: '2026-08-25', status: 'pending', file: null },
        { id: 6, title: 'JSP JDBC Database Connection & CRUD Demo', sub: 'Web Technology Lab', code: 'BCA507', deadline: '2026-07-28', status: 'late', file: 'WebTech_Lab_Demo.zip', subDate: '2026-07-30' },
        { id: 7, title: '2D/3D Geometric Transformations in C++', sub: 'Computer Graphics Lab', code: 'BCA508', deadline: '2026-08-01', status: 'submitted', file: 'Transforms_Lab.pdf', subDate: '2026-07-31' },
        { id: 8, title: 'Major Project Phase-I Synopsis & Literature Review', sub: 'Major Project Phase-I', code: 'BCA509', deadline: '2026-08-12', status: 'submitted', file: 'Project_Synopsis_Phase1.pdf', subDate: '2026-08-11' }
    ];

    for (const a of assignments) {
        db.run(
            `INSERT INTO assignments (id, student_id, title, subject, code, deadline, status, file_name, submission_date)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [a.id, studentRecord.id, a.title, a.sub, a.code, a.deadline, a.status, a.file, a.subDate || null]
        );
    }

    // 12. PYQ Papers
    const pyqs = [
        { sem: 4, sub: 'Python Programming Essentials', code: 'BCA401', year: '2025', exam: 'End-Sem', file: 'BCA401_EndSem_2025.pdf', dl: 142, pop: 1 },
        { sem: 4, sub: 'Computer Networks & Security', code: 'BCA402', year: '2025', exam: 'End-Sem', file: 'BCA402_EndSem_2025.pdf', dl: 98, pop: 1 },
        { sem: 4, sub: 'Design & Analysis of Algorithms', code: 'BCA403', year: '2024', exam: 'End-Sem', file: 'BCA403_EndSem_2024.pdf', dl: 185, pop: 1 },
        { sem: 3, sub: 'Database Management Systems', code: 'BCA302', year: '2024', exam: 'End-Sem', file: 'BCA302_EndSem_2024.pdf', dl: 210, pop: 1 },
        { sem: 3, sub: 'Object Oriented Programming with C++', code: 'BCA301', year: '2024', exam: 'Mid-Sem', file: 'BCA301_MidSem_2024.pdf', dl: 130, pop: 0 },
        { sem: 2, sub: 'Data Structures using C', code: 'BCA201', year: '2023', exam: 'End-Sem', file: 'BCA201_EndSem_2023.pdf', dl: 245, pop: 1 },
        { sem: 1, sub: 'Programming in C', code: 'BCA102', year: '2023', exam: 'End-Sem', file: 'BCA102_EndSem_2023.pdf', dl: 310, pop: 1 }
    ];

    for (const p of pyqs) {
        db.run(
            `INSERT INTO pyq_papers (semester, subject, code, year, exam_type, file_name, downloads, popular)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.sem, p.sub, p.code, p.year, p.exam, p.file, p.dl, p.pop]
        );
    }

    // 13. Notifications
    const notifications = [
        { icon: 'fa-solid fa-file-lines', bg: 'linear-gradient(135deg, #667eea, #764ba2)', text: 'Assignment "SRS for Library System" is due on Aug 20', time: '2 hours ago', read: 0 },
        { icon: 'fa-solid fa-indian-rupee-sign', bg: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', text: 'Fee payment reminder: ₹19,000 pending before Sep 15', time: '5 hours ago', read: 0 },
        { icon: 'fa-regular fa-calendar', bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', text: 'Mid-Semester Theory Examinations begin from Aug 28', time: '1 day ago', read: 0 },
        { icon: 'fa-solid fa-ranking-star', bg: 'linear-gradient(135deg, #4ade80, #22c55e)', text: 'Semester 4 final results verified & published (SGPA: 8.10)', time: '2 days ago', read: 1 },
        { icon: 'fa-solid fa-tower-broadcast', bg: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', text: 'Annual University Tech Fest "Fiesta 2026" registrations open!', time: '3 days ago', read: 1 }
    ];

    for (const n of notifications) {
        db.run(
            `INSERT INTO notifications (user_id, icon, bg_gradient, text, time_ago, is_read)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [studentUser.id, n.icon, n.bg, n.text, n.time, n.read]
        );
    }

    // 14. Activity Logs
    const activities = [
        { text: 'Submitted "Major Project Phase-I Synopsis"', time: 'Today, 11:30 AM', color: '#4ade80' },
        { text: 'Attended Web Technology using Java lecture', time: 'Today, 09:50 AM', color: '#667eea' },
        { text: 'Scored 5/5 in Java Servlets & JSP Quiz', time: 'Yesterday, 04:15 PM', color: '#00d2ff' },
        { text: 'Paid Examination Fee — ₹6,000 via UPI', time: 'Jul 28, 02:00 PM', color: '#ff6b6b' },
        { text: 'Enrolled in BCA 5th Semester courses', time: 'Jul 15, 11:00 AM', color: '#fbbf24' },
        { text: 'Updated contact details & hostel address', time: 'Jul 10, 03:30 PM', color: '#f093fb' }
    ];

    for (const act of activities) {
        db.run(
            `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, ?, ?)`,
            [studentUser.id, act.text, act.time, act.color]
        );
    }
}

module.exports = seedDatabase;
