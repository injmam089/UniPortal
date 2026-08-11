/* ============================================
   UniPortal — Student Dashboard JavaScript
   All interactivity, mock data, and animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // MOCK DATA
    // =============================================

    const student = {
        name: 'Injmam ',
        id: 'STU-2400103912',
        department: 'Computer Application',
        semester: '5th',
        cgpa: 3.72,
        email: 'injmamah@student.iul.ac.in',
        phone: '+91 7052959935',
        enrollmentYear: 2024,
        dob: 'March 09, 2004',
        gender: 'Male',
        address: 'J.N BOYS Hostel ROOM 05, LUCKNOW, INDIA 226026',
        advisor: 'Mrs. Arshiya Dilshad',
    };

    const courses = [
        { code: 'CS301', name: 'Data Structures & Algorithms', prof: 'Dr. Robert Smith', room: 'Room 301', credits: 4, days: 'Mon, Wed, Fri', time: '9:00 - 10:30 AM', progress: 72, color: '#667eea' },
        { code: 'CS302', name: 'Database Management Systems', prof: 'Dr. Lisa Jones', room: 'Lab 2', credits: 4, days: 'Mon, Thu', time: '11:00 AM - 12:30 PM', progress: 65, color: '#00d2ff' },
        { code: 'CS303', name: 'Operating Systems', prof: 'Dr. Michael Lee', room: 'Room 305', credits: 3, days: 'Tue, Thu', time: '9:00 - 10:30 AM', progress: 58, color: '#f093fb' },
        { code: 'CS304', name: 'Computer Networks', prof: 'Dr. Emily Brown', room: 'Room 201', credits: 3, days: 'Wed, Fri', time: '2:00 - 3:30 PM', progress: 48, color: '#ff6b6b' },
        { code: 'CS305', name: 'Software Engineering', prof: 'Dr. David Wilson', room: 'Room 102', credits: 3, days: 'Tue, Fri', time: '11:00 AM - 12:30 PM', progress: 80, color: '#4ade80' },
        { code: 'MA301', name: 'Discrete Mathematics', prof: 'Prof. Amy Chen', room: 'Room 410', credits: 3, days: 'Mon, Wed', time: '2:00 - 3:30 PM', progress: 55, color: '#fbbf24' }
    ];

    const attendanceData = [
        { subject: 'Data Structures', percent: 92, present: 33, total: 36 },
        { subject: 'Database Systems', percent: 88, present: 30, total: 34 },
        { subject: 'Operating Systems', percent: 78, present: 25, total: 32 },
        { subject: 'Computer Networks', percent: 85, present: 28, total: 33 },
        { subject: 'Software Engineering', percent: 95, present: 19, total: 20 },
        { subject: 'Discrete Mathematics', percent: 75, present: 24, total: 32 }
    ];

    const scheduleByDay = {
        'Mon': [
            { time: '9:00 - 10:30', subject: 'Data Structures', room: 'Room 301', prof: 'Dr. Smith', color: '#667eea' },
            { time: '11:00 - 12:30', subject: 'Database Systems', room: 'Lab 2', prof: 'Dr. Jones', color: '#00d2ff' },
            { time: '2:00 - 3:30', subject: 'Discrete Math', room: 'Room 410', prof: 'Prof. Chen', color: '#fbbf24' }
        ],
        'Tue': [
            { time: '9:00 - 10:30', subject: 'Operating Systems', room: 'Room 305', prof: 'Dr. Lee', color: '#f093fb' },
            { time: '11:00 - 12:30', subject: 'Software Engg.', room: 'Room 102', prof: 'Dr. Wilson', color: '#4ade80' }
        ],
        'Wed': [
            { time: '9:00 - 10:30', subject: 'Data Structures', room: 'Room 301', prof: 'Dr. Smith', color: '#667eea' },
            { time: '2:00 - 3:30', subject: 'Computer Networks', room: 'Room 201', prof: 'Dr. Brown', color: '#ff6b6b' },
            { time: '3:45 - 5:00', subject: 'Discrete Math', room: 'Room 410', prof: 'Prof. Chen', color: '#fbbf24' }
        ],
        'Thu': [
            { time: '9:00 - 10:30', subject: 'Operating Systems', room: 'Room 305', prof: 'Dr. Lee', color: '#f093fb' },
            { time: '11:00 - 12:30', subject: 'Database Systems', room: 'Lab 2', prof: 'Dr. Jones', color: '#00d2ff' }
        ],
        'Fri': [
            { time: '9:00 - 10:30', subject: 'Data Structures', room: 'Room 301', prof: 'Dr. Smith', color: '#667eea' },
            { time: '11:00 - 12:30', subject: 'Software Engg.', room: 'Room 102', prof: 'Dr. Wilson', color: '#4ade80' },
            { time: '2:00 - 3:30', subject: 'Computer Networks', room: 'Room 201', prof: 'Dr. Brown', color: '#ff6b6b' }
        ],
        'Sat': [
            { time: '10:00 - 12:00', subject: 'Lab: Database', room: 'Lab 2', prof: 'Dr. Jones', color: '#00d2ff' }
        ]
    };

    const feeBreakdown = [
        { component: 'Tuition Fee', amount: 8000, status: 'Paid' },
        { component: 'Laboratory Fee', amount: 1500, status: 'Paid' },
        { component: 'Library Fee', amount: 500, status: 'Pending' },
        { component: 'Sports & Activities', amount: 600, status: 'Pending' },
        { component: 'Examination Fee', amount: 800, status: 'Pending' },
        { component: 'Technology Fee', amount: 600, status: 'Paid' }
    ];

    const paymentHistory = [
        { date: '2024-08-15', txnId: 'TXN-2024-4521', desc: 'Semester 5 Tuition (Partial)', amount: 5000, status: 'Paid' },
        { date: '2024-07-02', txnId: 'TXN-2024-3876', desc: 'Technology Fee', amount: 600, status: 'Paid' },
        { date: '2024-06-20', txnId: 'TXN-2024-3654', desc: 'Laboratory Fee', amount: 1500, status: 'Paid' },
        { date: '2024-06-01', txnId: 'TXN-2024-3210', desc: 'Tuition (Remaining)', amount: 3000, status: 'Paid' },
        { date: '2024-05-15', txnId: 'TXN-2024-2890', desc: 'Library & Sports Fee', amount: 1100, status: 'Pending' },
        { date: '2024-05-10', txnId: 'TXN-2024-2765', desc: 'Examination Fee', amount: 800, status: 'Overdue' }
    ];

    const resultsData = {
        1: { gpa: 3.65, subjects: [
            { name: 'Introduction to Programming', code: 'CS101', credits: 4, grade: 'A', points: 4.0 },
            { name: 'Calculus I', code: 'MA101', credits: 4, grade: 'B+', points: 3.3 },
            { name: 'Physics I', code: 'PH101', credits: 3, grade: 'A-', points: 3.7 },
            { name: 'English Communication', code: 'EN101', credits: 2, grade: 'A', points: 4.0 },
            { name: 'Engineering Drawing', code: 'ME101', credits: 3, grade: 'B+', points: 3.3 }
        ]},
        2: { gpa: 3.58, subjects: [
            { name: 'Object Oriented Programming', code: 'CS102', credits: 4, grade: 'A-', points: 3.7 },
            { name: 'Calculus II', code: 'MA102', credits: 4, grade: 'B', points: 3.0 },
            { name: 'Physics II', code: 'PH102', credits: 3, grade: 'B+', points: 3.3 },
            { name: 'Digital Logic Design', code: 'CS103', credits: 3, grade: 'A', points: 4.0 },
            { name: 'Environmental Science', code: 'ES101', credits: 2, grade: 'A', points: 4.0 }
        ]},
        3: { gpa: 3.72, subjects: [
            { name: 'Data Structures', code: 'CS201', credits: 4, grade: 'A', points: 4.0 },
            { name: 'Linear Algebra', code: 'MA201', credits: 3, grade: 'B+', points: 3.3 },
            { name: 'Computer Architecture', code: 'CS202', credits: 3, grade: 'A-', points: 3.7 },
            { name: 'Probability & Statistics', code: 'MA202', credits: 3, grade: 'A-', points: 3.7 },
            { name: 'Economics', code: 'HS201', credits: 2, grade: 'A', points: 4.0 }
        ]},
        4: { gpa: 3.80, subjects: [
            { name: 'Algorithms', code: 'CS251', credits: 4, grade: 'A', points: 4.0 },
            { name: 'Theory of Computation', code: 'CS252', credits: 3, grade: 'A-', points: 3.7 },
            { name: 'Microprocessors', code: 'CS253', credits: 3, grade: 'B+', points: 3.3 },
            { name: 'Numerical Methods', code: 'MA251', credits: 3, grade: 'A', points: 4.0 },
            { name: 'Technical Writing', code: 'EN201', credits: 2, grade: 'A', points: 4.0 }
        ]},
        5: { gpa: 3.85, subjects: [
            { name: 'Data Structures & Algorithms', code: 'CS301', credits: 4, grade: 'A', points: 4.0 },
            { name: 'Database Management Systems', code: 'CS302', credits: 4, grade: 'A-', points: 3.7 },
            { name: 'Operating Systems', code: 'CS303', credits: 3, grade: 'A', points: 4.0 },
            { name: 'Computer Networks', code: 'CS304', credits: 3, grade: 'B+', points: 3.3 },
            { name: 'Software Engineering', code: 'CS305', credits: 3, grade: 'A', points: 4.0 },
            { name: 'Discrete Mathematics', code: 'MA301', credits: 3, grade: 'B+', points: 3.3 }
        ]}
    };

    const notifications = [
        { icon: 'fa-solid fa-file-lines', bg: 'linear-gradient(135deg, #667eea, #764ba2)', text: 'Assignment "DSA Problem Set 4" is due tomorrow', time: '2 hours ago', unread: true },
        { icon: 'fa-solid fa-wallet', bg: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', text: 'Fee payment reminder: $2,450 pending before Sep 15', time: '5 hours ago', unread: true },
        { icon: 'fa-regular fa-calendar', bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', text: 'Mid-semester exams start from Aug 25', time: '1 day ago', unread: true },
        { icon: 'fa-solid fa-ranking-star', bg: 'linear-gradient(135deg, #4ade80, #22c55e)', text: 'Semester 4 results have been published', time: '2 days ago', unread: false },
        { icon: 'fa-solid fa-tower-broadcast', bg: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', text: 'Annual Tech Fest registrations are open!', time: '3 days ago', unread: false }
    ];

    const recentActivity = [
        { text: 'Submitted "Database ER Diagram" assignment', time: 'Today, 10:30 AM', color: '#4ade80' },
        { text: 'Attended Operating Systems lecture', time: 'Today, 9:00 AM', color: '#667eea' },
        { text: 'Viewed Semester 4 results', time: 'Yesterday, 4:15 PM', color: '#f093fb' },
        { text: 'Paid Laboratory Fee — $1,500', time: 'Yesterday, 2:00 PM', color: '#00d2ff' },
        { text: 'Enrolled in Software Engineering course', time: 'Aug 3, 11:00 AM', color: '#fbbf24' },
        { text: 'Updated phone number in profile', time: 'Aug 1, 3:30 PM', color: '#ff6b6b' }
    ];

    const todaysClasses = [
        { time: '9:00 AM', subject: 'Data Structures', room: 'Room 301', prof: 'Dr. Smith' },
        { time: '11:00 AM', subject: 'Database Systems', room: 'Lab 2', prof: 'Dr. Jones' },
        { time: '2:00 PM', subject: 'Discrete Math', room: 'Room 410', prof: 'Prof. Chen' }
    ];

    const pyqData = [
        { subject: 'Data Structures & Algorithms', code: 'CS301', year: 2024, examType: 'End-Semester', difficulty: 'Hard', downloads: 34, color: '#667eea' },
        { subject: 'Database Management Systems', code: 'CS302', year: 2024, examType: 'Mid-Semester', difficulty: 'Medium', downloads: 28, color: '#00d2ff' },
        { subject: 'Operating Systems', code: 'CS303', year: 2024, examType: 'End-Semester', difficulty: 'Hard', downloads: 22, color: '#f093fb' },
        { subject: 'Computer Networks', code: 'CS304', year: 2023, examType: 'End-Semester', difficulty: 'Medium', downloads: 18, color: '#ff6b6b' },
        { subject: 'Software Engineering', code: 'CS305', year: 2023, examType: 'Mid-Semester', difficulty: 'Easy', downloads: 12, color: '#4ade80' },
        { subject: 'Discrete Mathematics', code: 'MA301', year: 2023, examType: 'End-Semester', difficulty: 'Hard', downloads: 15, color: '#fbbf24' },
        { subject: 'Data Structures & Algorithms', code: 'CS301', year: 2023, examType: 'Mid-Semester', difficulty: 'Medium', downloads: 20, color: '#667eea' },
        { subject: 'Database Management Systems', code: 'CS302', year: 2022, examType: 'End-Semester', difficulty: 'Easy', downloads: 10, color: '#00d2ff' },
        { subject: 'Operating Systems', code: 'CS303', year: 2022, examType: 'Mid-Semester', difficulty: 'Medium', downloads: 8, color: '#f093fb' },
        { subject: 'Computer Networks', code: 'CS304', year: 2024, examType: 'Mid-Semester', difficulty: 'Easy', downloads: 14, color: '#ff6b6b' },
        { subject: 'Discrete Mathematics', code: 'MA301', year: 2022, examType: 'End-Semester', difficulty: 'Hard', downloads: 6, color: '#fbbf24' },
        { subject: 'Software Engineering', code: 'CS305', year: 2024, examType: 'End-Semester', difficulty: 'Medium', downloads: 16, color: '#4ade80' }
    ];

    const examTimetable = [
        { subject: 'Data Structures & Algorithms', code: 'CS301', date: '2026-08-25', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall A', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Database Management Systems', code: 'CS302', date: '2026-08-28', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall B', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Operating Systems', code: 'CS303', date: '2026-09-01', time: '2:00 PM - 5:00 PM', venue: 'Exam Hall A', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Computer Networks', code: 'CS304', date: '2026-09-04', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall C', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Software Engineering', code: 'CS305', date: '2026-09-07', time: '2:00 PM - 5:00 PM', venue: 'Exam Hall B', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Discrete Mathematics', code: 'MA301', date: '2026-07-15', time: '10:00 AM - 12:00 PM', venue: 'Exam Hall A', duration: '2 hrs', status: 'completed' },
        { subject: 'Calculus II', code: 'MA102', date: '2026-07-12', time: '2:00 PM - 4:00 PM', venue: 'Exam Hall C', duration: '2 hrs', status: 'completed' },
        { subject: 'Physics II', code: 'PH102', date: '2026-07-10', time: '10:00 AM - 12:30 PM', venue: 'Exam Hall B', duration: '2.5 hrs', status: 'completed' }
    ];

    const quizzesData = [
        {
            id: 1, subject: 'Data Structures', title: 'DSA Fundamentals Quiz', questions: 5, timeLimit: 5, difficulty: 'Medium', color: '#667eea', attempted: true, score: 4,
            questionsList: [
                { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
                { q: 'Which data structure uses LIFO principle?', options: ['Queue', 'Array', 'Stack', 'Linked List'], correct: 2 },
                { q: 'What is the worst-case time complexity of QuickSort?', options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 2 },
                { q: 'Which traversal gives sorted output in BST?', options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'], correct: 1 },
                { q: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2 }
            ]
        },
        {
            id: 2, subject: 'Database Systems', title: 'SQL & Normalization', questions: 5, timeLimit: 5, difficulty: 'Easy', color: '#00d2ff', attempted: true, score: 5,
            questionsList: [
                { q: 'Which SQL keyword is used to retrieve data?', options: ['GET', 'FETCH', 'SELECT', 'RETRIEVE'], correct: 2 },
                { q: 'Which normal form removes partial dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 1 },
                { q: 'What does ACID stand for in database transactions?', options: ['Atomicity, Consistency, Isolation, Durability', 'Addition, Consistency, Integrity, Data', 'Atomicity, Concurrency, Isolation, Data', 'All Correct In Database'], correct: 0 },
                { q: 'Which join returns all rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correct: 3 },
                { q: 'What is a foreign key?', options: ['A primary key in another table', 'A reference to a primary key in another table', 'A unique constraint', 'An index'], correct: 1 }
            ]
        },
        {
            id: 3, subject: 'Operating Systems', title: 'Process Management', questions: 5, timeLimit: 5, difficulty: 'Hard', color: '#f093fb', attempted: true, score: 3,
            questionsList: [
                { q: 'Which scheduling algorithm has the minimum average waiting time?', options: ['FCFS', 'SJF', 'Round Robin', 'Priority'], correct: 1 },
                { q: 'What is a deadlock?', options: ['A fast process', 'Circular wait among processes', 'A type of scheduling', 'Memory allocation'], correct: 1 },
                { q: 'Which page replacement algorithm is optimal?', options: ['FIFO', 'LRU', 'Optimal', 'Random'], correct: 2 },
                { q: 'What is thrashing?', options: ['Fast execution', 'Excessive paging', 'CPU overload', 'Memory leak'], correct: 1 },
                { q: 'Which of these is NOT a process state?', options: ['Ready', 'Running', 'Compiling', 'Blocked'], correct: 2 }
            ]
        },
        {
            id: 4, subject: 'Computer Networks', title: 'Network Protocols', questions: 5, timeLimit: 5, difficulty: 'Medium', color: '#ff6b6b', attempted: true, score: 4,
            questionsList: [
                { q: 'Which layer of OSI model handles routing?', options: ['Data Link', 'Network', 'Transport', 'Session'], correct: 1 },
                { q: 'What protocol is used for secure web browsing?', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2 },
                { q: 'What is the default port for HTTP?', options: ['21', '25', '80', '443'], correct: 2 },
                { q: 'Which protocol is connectionless?', options: ['TCP', 'UDP', 'FTP', 'HTTP'], correct: 1 },
                { q: 'What does DNS stand for?', options: ['Data Network Service', 'Domain Name System', 'Digital Network Standard', 'Direct Name Server'], correct: 1 }
            ]
        },
        {
            id: 5, subject: 'Software Engineering', title: 'SDLC Models', questions: 5, timeLimit: 5, difficulty: 'Easy', color: '#4ade80', attempted: false, score: 0,
            questionsList: [
                { q: 'Which SDLC model is also known as the linear sequential model?', options: ['Agile', 'Waterfall', 'Spiral', 'V-Model'], correct: 1 },
                { q: 'What does UML stand for?', options: ['Unified Modeling Language', 'Universal Markup Language', 'Unified Management Logic', 'User Model Language'], correct: 0 },
                { q: 'Which testing is done without knowing internal code?', options: ['White Box', 'Black Box', 'Grey Box', 'Unit Testing'], correct: 1 },
                { q: 'What is a use case diagram used for?', options: ['Database design', 'Functional requirements', 'Code structure', 'Network topology'], correct: 1 },
                { q: 'Which methodology emphasizes iterative development?', options: ['Waterfall', 'Big Bang', 'Agile', 'Prototype'], correct: 2 }
            ]
        },
        {
            id: 6, subject: 'Discrete Mathematics', title: 'Logic & Sets', questions: 5, timeLimit: 5, difficulty: 'Hard', color: '#fbbf24', attempted: false, score: 0,
            questionsList: [
                { q: 'What is the contrapositive of "If P then Q"?', options: ['If Q then P', 'If not P then not Q', 'If not Q then not P', 'If P then not Q'], correct: 2 },
                { q: 'How many subsets does a set with 4 elements have?', options: ['4', '8', '16', '32'], correct: 2 },
                { q: 'What is a tautology?', options: ['Always false', 'Always true', 'Sometimes true', 'Undefined'], correct: 1 },
                { q: 'In graph theory, what is a complete graph?', options: ['Every vertex connected to every other', 'No edges', 'Tree structure', 'Bipartite graph'], correct: 0 },
                { q: 'What is the principle of mathematical induction based on?', options: ['Contradiction', 'Base case and inductive step', 'Direct proof', 'Counter example'], correct: 1 }
            ]
        }
    ];

    const quizHistory = [
        { quiz: 'DSA Fundamentals Quiz', subject: 'Data Structures', score: '4/5', percent: 80, date: 'Aug 5, 2026', grade: 'A' },
        { quiz: 'SQL & Normalization', subject: 'Database Systems', score: '5/5', percent: 100, date: 'Aug 3, 2026', grade: 'A+' },
        { quiz: 'Process Management', subject: 'Operating Systems', score: '3/5', percent: 60, date: 'Jul 28, 2026', grade: 'B' },
        { quiz: 'Network Protocols', subject: 'Computer Networks', score: '4/5', percent: 80, date: 'Jul 25, 2026', grade: 'A' }
    ];

    const assignmentsData = [
        { id: 1, title: 'DSA Problem Set 4', subject: 'Data Structures & Algorithms', code: 'CS301', deadline: '2026-08-10', status: 'pending', file: null },
        { id: 2, title: 'ER Diagram Design', subject: 'Database Management Systems', code: 'CS302', deadline: '2026-08-12', status: 'pending', file: null },
        { id: 3, title: 'OS Process Scheduling Report', subject: 'Operating Systems', code: 'CS303', deadline: '2026-08-05', status: 'submitted', file: 'OS_Report.pdf' },
        { id: 4, title: 'Network Topology Analysis', subject: 'Computer Networks', code: 'CS304', deadline: '2026-08-03', status: 'submitted', file: 'Network_Analysis.pdf' },
        { id: 5, title: 'UML Use Case Diagrams', subject: 'Software Engineering', code: 'CS305', deadline: '2026-08-15', status: 'pending', file: null },
        { id: 6, title: 'Socket Programming Lab', subject: 'Computer Networks', code: 'CS304', deadline: '2026-07-28', status: 'late', file: 'Socket_Lab.zip' },
        { id: 7, title: 'SQL Query Optimization', subject: 'Database Management Systems', code: 'CS302', deadline: '2026-07-30', status: 'submitted', file: 'SQL_Optimization.pdf' },
        { id: 8, title: 'Graph Theory Proofs', subject: 'Discrete Mathematics', code: 'MA301', deadline: '2026-08-01', status: 'submitted', file: 'Graph_Proofs.pdf' }
    ];


    // =============================================
    // NAVIGATION
    // =============================================

    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const cardLinks = document.querySelectorAll('.card-link, .quick-link');

    function switchPage(pageId) {
        // Update nav
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });

        // Switch pages
        pages.forEach(page => {
            if (page.id === `page-${pageId}`) {
                page.classList.add('active');
                page.style.animation = 'none';
                page.offsetHeight; // trigger reflow
                page.style.animation = 'fadeIn 0.4s ease';
            } else {
                page.classList.remove('active');
            }
        });

        // Close mobile sidebar
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');

        // Trigger page-specific renders
        if (pageId === 'dashboard') animateStatCards();
        if (pageId === 'attendance') renderAttendancePage();
        if (pageId === 'schedule') renderSchedule();
        if (pageId === 'classes') renderClasses();
        if (pageId === 'fees') renderFees();
        if (pageId === 'results') renderResults(1);
        if (pageId === 'pyq') renderPYQ();
        if (pageId === 'exams') renderExamTimetable();
        if (pageId === 'quiz') renderQuiz();
        if (pageId === 'assignments') renderAssignments();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            switchPage(link.dataset.page);
        });
    });

    cardLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) switchPage(page);
        });
    });

    // =============================================
    // SIDEBAR (Mobile)
    // =============================================

    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarClose = document.getElementById('sidebarClose');

    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('show');
    });

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
    });

    // =============================================
    // HEADER — Date/Time
    // =============================================

    const headerDate = document.getElementById('headerDate');
    function updateDateTime() {
        const now = new Date();
        headerDate.textContent = now.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        });
    }
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // =============================================
    // NOTIFICATIONS
    // =============================================

    const notifBtn = document.getElementById('notificationBtn');
    const notifDropdown = document.getElementById('notificationsDropdown');
    const notifList = document.getElementById('notificationsList');
    const notifCount = document.getElementById('notificationCount');
    const markAllRead = document.getElementById('markAllRead');

    function renderNotifications() {
        notifList.innerHTML = notifications.map((n, i) => `
            <div class="notif-item ${n.unread ? 'unread' : ''}" data-idx="${i}">
                <div class="notif-icon" style="background: ${n.bg};">
                    <i class="${n.icon}" style="color: white;"></i>
                </div>
                <div class="notif-content">
                    <div class="notif-text">${n.text}</div>
                    <div class="notif-time">${n.time}</div>
                </div>
            </div>
        `).join('');

        const unread = notifications.filter(n => n.unread).length;
        notifCount.textContent = unread;
        notifCount.classList.toggle('hidden', unread === 0);
    }

    notifBtn.addEventListener('click', e => {
        e.stopPropagation();
        notifDropdown.classList.toggle('show');
    });

    markAllRead.addEventListener('click', () => {
        notifications.forEach(n => n.unread = false);
        renderNotifications();
    });

    notifList.addEventListener('click', e => {
        const item = e.target.closest('.notif-item');
        if (item) {
            const idx = parseInt(item.dataset.idx);
            notifications[idx].unread = false;
            renderNotifications();
        }
    });

    document.addEventListener('click', e => {
        if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
            notifDropdown.classList.remove('show');
        }
        const searchSugg = document.getElementById('searchSuggestions');
        if (searchSugg && !searchSugg.contains(e.target)) {
            searchSugg.classList.remove('show');
        }
    });

    renderNotifications();

    // =============================================
    // SEARCH
    // =============================================

    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');

    const searchableItems = [
        { text: 'Dashboard', icon: 'fa-solid fa-grid-2', page: 'dashboard' },
        { text: 'Attendance', icon: 'fa-solid fa-clipboard-check', page: 'attendance' },
        { text: 'Schedule / Timetable', icon: 'fa-regular fa-calendar-days', page: 'schedule' },
        { text: 'My Classes', icon: 'fa-solid fa-book-open-reader', page: 'classes' },
        { text: 'Fees & Payments', icon: 'fa-solid fa-wallet', page: 'fees' },
        { text: 'Results / Grades', icon: 'fa-solid fa-chart-column', page: 'results' },
        { text: 'Profile', icon: 'fa-regular fa-circle-user', page: 'profile' },
        { text: 'Previous Year Questions', icon: 'fa-solid fa-box-archive', page: 'pyq' },
        { text: 'Exam Timetable', icon: 'fa-solid fa-calendar-check', page: 'exams' },
        { text: 'Quizzes', icon: 'fa-solid fa-brain', page: 'quiz' },
        { text: 'Assignments', icon: 'fa-solid fa-cloud-arrow-up', page: 'assignments' },
        ...courses.map(c => ({ text: c.name, icon: 'fa-solid fa-book-bookmark', page: 'classes' }))
    ];

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        if (!q) {
            searchSuggestions.classList.remove('show');
            return;
        }
        const matches = searchableItems.filter(item => item.text.toLowerCase().includes(q));
        if (matches.length === 0) {
            searchSuggestions.classList.remove('show');
            return;
        }
        searchSuggestions.innerHTML = matches.slice(0, 6).map(m => `
            <div class="search-suggestion-item" data-page="${m.page}">
                <i class="${m.icon}"></i> ${m.text}
            </div>
        `).join('');
        searchSuggestions.classList.add('show');
    });

    searchSuggestions.addEventListener('click', e => {
        const item = e.target.closest('.search-suggestion-item');
        if (item) {
            switchPage(item.dataset.page);
            searchInput.value = '';
            searchSuggestions.classList.remove('show');
        }
    });

    // =============================================
    // DASHBOARD
    // =============================================

    // Animated counter
    function animateCounter(element, target, duration = 1500, decimals = 0) {
        let start = 0;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = start + (target - start) * eased;
            element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(step);
            else element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
        }
        requestAnimationFrame(step);
    }

    function animateStatCards() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseFloat(el.dataset.target);
            const decimals = parseInt(el.dataset.decimals) || 0;
            animateCounter(el, target, 1500, decimals);
        });
    }

    // Upcoming classes
    function renderUpcomingClasses() {
        const container = document.getElementById('upcomingClasses');
        container.innerHTML = todaysClasses.map(c => `
            <div class="class-item">
                <div class="class-time-badge">${c.time}</div>
                <div class="class-details">
                    <h4>${c.subject}</h4>
                    <span>${c.room} • ${c.prof}</span>
                </div>
            </div>
        `).join('');
    }

    // Recent activity
    function renderRecentActivity() {
        const container = document.getElementById('recentActivity');
        container.innerHTML = recentActivity.map(a => `
            <div class="activity-item">
                <div class="activity-dot" style="background: ${a.color};"></div>
                <div>
                    <div class="activity-text">${a.text}</div>
                    <div class="activity-time">${a.time}</div>
                </div>
            </div>
        `).join('');
    }

    // Mini attendance bars
    function renderMiniAttendance() {
        const container = document.getElementById('miniAttendanceBars');
        container.innerHTML = attendanceData.map(a => {
            let fillClass = '';
            if (a.percent < 75) fillClass = 'warning';
            else if (a.percent < 85) fillClass = 'caution';
            return `
                <div class="mini-bar-item">
                    <span class="mini-bar-label">${a.subject}</span>
                    <div class="mini-bar">
                        <div class="mini-bar-fill ${fillClass}" style="width: 0%;" data-width="${a.percent}%"></div>
                    </div>
                    <span class="mini-bar-value">${a.percent}%</span>
                </div>
            `;
        }).join('');

        // Animate after render
        setTimeout(() => {
            container.querySelectorAll('.mini-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 300);
    }

    // =============================================
    // ATTENDANCE PAGE
    // =============================================

    function renderAttendancePage() {
        // Subject bars
        const subjectContainer = document.getElementById('subjectAttendance');
        subjectContainer.innerHTML = attendanceData.map(a => {
            let cls = 'good';
            let color = '#4ade80';
            if (a.percent < 75) { cls = 'poor'; color = '#ff6b6b'; }
            else if (a.percent < 85) { cls = 'moderate'; color = '#fbbf24'; }
            return `
                <div class="subject-bar-item">
                    <div class="subject-bar-header">
                        <span class="subject-bar-name">${a.subject}</span>
                        <span class="subject-bar-percent" style="color: ${color};">${a.percent}% (${a.present}/${a.total})</span>
                    </div>
                    <div class="subject-bar-track">
                        <div class="subject-bar-fill ${cls}" style="width: ${a.percent}%;"></div>
                    </div>
                </div>
            `;
        }).join('');

        // Calendar
        renderAttendanceCalendar();
    }

    function renderAttendanceCalendar() {
        const container = document.getElementById('attendanceCalendar');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let html = days.map(d => `<div class="cal-header">${d}</div>`).join('');

        // Generate last 30 days
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 29);

        // Fill leading empty slots
        const firstDayOfWeek = startDate.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            html += '<div class="cal-day empty"></div>';
        }

        for (let i = 0; i < 30; i++) {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            const dayNum = d.getDate();
            const dow = d.getDay();

            let status = 'present';
            if (dow === 0) {
                status = 'holiday'; // Sundays
            } else {
                // Random absences (~13%)
                const hash = (dayNum * 7 + i * 13) % 100;
                if (hash < 13) status = 'absent';
                if (dayNum === 15 || dayNum === 26) status = 'holiday'; // special holidays
            }

            html += `<div class="cal-day ${status}" title="${d.toLocaleDateString()}">${dayNum}</div>`;
        }

        container.innerHTML = html;
    }

    // =============================================
    // SCHEDULE PAGE
    // =============================================

    function renderSchedule() {
        const navContainer = document.getElementById('scheduleDayNav');
        const gridContainer = document.getElementById('scheduleGrid');
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date().getDay(); // 0=Sun
        const todayIdx = today === 0 ? 5 : today - 1; // Map to Mon=0

        // Day tabs
        navContainer.innerHTML = dayNames.map((d, i) => 
            `<button class="day-tab ${i === todayIdx ? 'active' : ''}" data-day="${d}">${d}</button>`
        ).join('');

        // Render selected day's schedule
        function showDay(day) {
            const slots = scheduleByDay[day] || [];
            const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00'];

            let html = '<div class="schedule-header"></div>';
            html += '<div class="schedule-header">Schedule</div>';

            timeSlots.forEach(time => {
                html += `<div class="schedule-time">${time}</div>`;
                const match = slots.find(s => s.time.startsWith(time.replace(':00', '')));
                if (match) {
                    html += `
                        <div class="schedule-slot filled" style="border-left-color: ${match.color};">
                            <div class="schedule-slot-subject">${match.subject}</div>
                            <div class="schedule-slot-info">${match.room} • ${match.prof}</div>
                        </div>
                    `;
                } else {
                    html += '<div class="schedule-slot"></div>';
                }
            });

            gridContainer.innerHTML = html;
            gridContainer.style.gridTemplateColumns = '80px 1fr';
        }

        showDay(dayNames[todayIdx]);

        navContainer.addEventListener('click', e => {
            const tab = e.target.closest('.day-tab');
            if (tab) {
                navContainer.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                showDay(tab.dataset.day);
            }
        });
    }

    // =============================================
    // CLASSES PAGE
    // =============================================

    function renderClasses() {
        const container = document.getElementById('classesGrid');
        container.innerHTML = courses.map((c, i) => `
            <div class="class-card" data-index="${i}" style="animation-delay: ${i * 0.08}s;">
                <div class="class-card-accent" style="background: linear-gradient(90deg, ${c.color}, ${c.color}80);"></div>
                <div class="class-card-body">
                    <!-- View Mode -->
                    <div class="class-card-view" data-idx="${i}">
                        <div class="class-card-top-row">
                            <div class="class-card-code">${c.code}</div>
                            <button class="btn-edit-class" data-idx="${i}" title="Edit Course">
                                <i class="fa-solid fa-pen-nib"></i>
                            </button>
                        </div>
                        <div class="class-card-name">${c.name}</div>
                        <div class="class-card-meta">
                            <div class="class-card-meta-item"><i class="fa-solid fa-chalkboard-user"></i> ${c.prof}</div>
                            <div class="class-card-meta-item"><i class="fa-solid fa-location-dot"></i> ${c.room}</div>
                            <div class="class-card-meta-item"><i class="fa-regular fa-clock"></i> ${c.days} | ${c.time}</div>
                            <div class="class-card-meta-item"><i class="fa-solid fa-star-half-stroke"></i> ${c.credits} Credits</div>
                        </div>
                    </div>
                    <!-- Edit Mode (hidden by default) -->
                    <div class="class-card-edit" data-idx="${i}" style="display: none;">
                        <div class="edit-field">
                            <label>Subject Code</label>
                            <input type="text" class="form-input edit-code" value="${c.code}" />
                        </div>
                        <div class="edit-field">
                            <label>Subject Name</label>
                            <input type="text" class="form-input edit-name" value="${c.name}" />
                        </div>
                        <div class="edit-field">
                            <label>Professor</label>
                            <input type="text" class="form-input edit-prof" value="${c.prof}" />
                        </div>
                        <div class="edit-field">
                            <label>Room</label>
                            <input type="text" class="form-input edit-room" value="${c.room}" />
                        </div>
                        <div class="edit-actions">
                            <button class="btn btn-primary btn-sm btn-save-class" data-idx="${i}">
                                <i class="fa-solid fa-check"></i> Save
                            </button>
                            <button class="btn btn-secondary btn-sm btn-cancel-class" data-idx="${i}">
                                <i class="fa-solid fa-xmark"></i> Cancel
                            </button>
                        </div>
                    </div>
                    <div class="class-card-progress">
                        <div class="class-card-progress-label">
                            <span>Syllabus Completion</span>
                            <span>${c.progress}%</span>
                        </div>
                        <div class="class-progress-track">
                            <div class="class-progress-fill" style="width: ${c.progress}%; background: linear-gradient(90deg, ${c.color}, ${c.color}99);"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach edit/save/cancel handlers
        container.querySelectorAll('.btn-edit-class').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const idx = btn.dataset.idx;
                const card = container.querySelector(`.class-card[data-index="${idx}"]`);
                card.querySelector('.class-card-view').style.display = 'none';
                card.querySelector('.class-card-edit').style.display = 'block';
                card.classList.add('editing');
            });
        });

        container.querySelectorAll('.btn-cancel-class').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const idx = btn.dataset.idx;
                const card = container.querySelector(`.class-card[data-index="${idx}"]`);
                card.querySelector('.class-card-view').style.display = '';
                card.querySelector('.class-card-edit').style.display = 'none';
                card.classList.remove('editing');
            });
        });

        container.querySelectorAll('.btn-save-class').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.idx);
                const card = container.querySelector(`.class-card[data-index="${idx}"]`);
                const editSection = card.querySelector('.class-card-edit');

                const newCode = editSection.querySelector('.edit-code').value.trim();
                const newName = editSection.querySelector('.edit-name').value.trim();
                const newProf = editSection.querySelector('.edit-prof').value.trim();
                const newRoom = editSection.querySelector('.edit-room').value.trim();

                if (!newCode || !newName || !newProf || !newRoom) {
                    alert('All fields are required.');
                    return;
                }

                const oldName = courses[idx].name;
                const oldProf = courses[idx].prof;

                // Update the course data
                courses[idx].code = newCode;
                courses[idx].name = newName;
                courses[idx].prof = newProf;
                courses[idx].room = newRoom;

                // Also update schedule data that references this course
                Object.values(scheduleByDay).forEach(daySlots => {
                    daySlots.forEach(slot => {
                        if (slot.prof === oldProf && slot.subject.includes(oldName.split(' ')[0])) {
                            slot.subject = newName.length > 18 ? newName.substring(0, 18) + '.' : newName;
                            slot.prof = newProf;
                            slot.room = newRoom;
                        }
                    });
                });

                // Also update attendance data that matches
                attendanceData.forEach(a => {
                    if (oldName.toLowerCase().includes(a.subject.toLowerCase().split(' ')[0].toLowerCase()) ||
                        a.subject.toLowerCase().includes(oldName.toLowerCase().split(' ')[0].toLowerCase())) {
                        // Only update if clearly matching
                        const oldFirst = oldName.split(' ')[0].toLowerCase();
                        const attFirst = a.subject.split(' ')[0].toLowerCase();
                        if (oldFirst === attFirst) {
                            a.subject = newName.length > 22 ? newName.substring(0, 22) : newName;
                        }
                    }
                });

                // Show save success feedback
                const saveBtn = card.querySelector('.btn-save-class');
                saveBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Saved!';
                saveBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

                setTimeout(() => {
                    // Re-render the classes page
                    renderClasses();
                }, 600);
            });
        });
    }

    // =============================================
    // FEES PAGE
    // =============================================

    function renderFees() {
        // Fee breakdown
        const fbody = document.getElementById('feeBreakdownBody');
        fbody.innerHTML = feeBreakdown.map(f => {
            let badgeClass = 'badge-success';
            if (f.status === 'Pending') badgeClass = 'badge-warning';
            if (f.status === 'Overdue') badgeClass = 'badge-danger';
            return `
                <tr>
                    <td>${f.component}</td>
                    <td>$${f.amount.toLocaleString()}</td>
                    <td><span class="badge ${badgeClass}">${f.status}</span></td>
                </tr>
            `;
        }).join('');

        // Payment history
        const phbody = document.getElementById('paymentHistoryBody');
        phbody.innerHTML = paymentHistory.map(p => {
            let badgeClass = 'badge-success';
            if (p.status === 'Pending') badgeClass = 'badge-warning';
            if (p.status === 'Overdue') badgeClass = 'badge-danger';
            return `
                <tr>
                    <td>${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style="font-family: monospace; color: var(--accent-1);">${p.txnId}</td>
                    <td>${p.desc}</td>
                    <td>$${p.amount.toLocaleString()}</td>
                    <td><span class="badge ${badgeClass}">${p.status}</span></td>
                </tr>
            `;
        }).join('');

        // Animate fee progress bar
        setTimeout(() => {
            const fill = document.querySelector('.fee-progress-fill');
            if (fill) fill.style.width = fill.dataset.percent + '%';
        }, 300);
    }

    // =============================================
    // RESULTS PAGE
    // =============================================

    function renderResults(sem) {
        const data = resultsData[sem];
        if (!data) return;

        const container = document.getElementById('semesterResults');
        let html = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.subjects.forEach(s => {
            let gradeClass = 'grade-A';
            if (s.grade.startsWith('B')) gradeClass = 'grade-B';
            else if (s.grade.startsWith('C')) gradeClass = 'grade-C';
            else if (s.grade.startsWith('D')) gradeClass = 'grade-D';

            html += `
                <tr>
                    <td>${s.name}</td>
                    <td style="font-family: monospace; color: var(--accent-1);">${s.code}</td>
                    <td>${s.credits}</td>
                    <td><span class="grade-badge ${gradeClass}">${s.grade}</span></td>
                    <td>${s.points.toFixed(1)}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
            <div class="semester-gpa">
                <span class="semester-gpa-label">Semester ${sem} GPA</span>
                <span class="semester-gpa-value">${data.gpa.toFixed(2)}</span>
            </div>
        `;

        container.innerHTML = html;

        // Update tab active
        document.querySelectorAll('.sem-tab').forEach(t => {
            t.classList.toggle('active', parseInt(t.dataset.sem) === sem);
        });
    }

    // Semester tab clicks
    document.getElementById('semesterTabs').addEventListener('click', e => {
        const tab = e.target.closest('.sem-tab');
        if (tab) renderResults(parseInt(tab.dataset.sem));
    });

    // Grade distribution
    function renderGradeDistribution() {
        const allGrades = {};
        Object.values(resultsData).forEach(sem => {
            sem.subjects.forEach(s => {
                const base = s.grade.replace(/[+-]/, '');
                allGrades[base] = (allGrades[base] || 0) + 1;
            });
        });

        const gradeOrder = ['A', 'B', 'C', 'D'];
        const colors = { A: 'var(--gradient-green)', B: 'var(--gradient-primary)', C: 'linear-gradient(135deg, #fbbf24, #f59e0b)', D: 'var(--gradient-red)' };
        const maxCount = Math.max(...Object.values(allGrades), 1);

        const container = document.getElementById('gradeDistribution');
        container.innerHTML = `<div class="grade-dist-grid">
            ${gradeOrder.map(g => {
                const count = allGrades[g] || 0;
                const heightPercent = (count / maxCount) * 100;
                return `
                    <div class="grade-bar-wrapper">
                        <div class="grade-bar" style="height: ${heightPercent}%; background: ${colors[g]};">
                            <span class="grade-bar-count">${count}</span>
                        </div>
                        <span class="grade-bar-label">${g}</span>
                    </div>
                `;
            }).join('')}
        </div>`;
    }

    // =============================================
    // PYQ PAGE
    // =============================================

    function renderPYQ() {
        // Build filter pills from unique subjects
        const subjects = [...new Set(pyqData.map(p => p.subject))];
        const filterContainer = document.getElementById('pyqSubjectFilter');
        if (filterContainer) {
            filterContainer.innerHTML = `<button class="filter-pill active" data-subject="all">All Subjects</button>` +
                subjects.map(s => `<button class="filter-pill" data-subject="${s}">${s.length > 20 ? s.substring(0, 18) + '...' : s}</button>`).join('');
        }

        applyPYQFilters();

        // Filter pill clicks
        if (filterContainer) {
            filterContainer.addEventListener('click', e => {
                const pill = e.target.closest('.filter-pill');
                if (pill) {
                    filterContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                    applyPYQFilters();
                }
            });
        }

        const yearFilter = document.getElementById('pyqYearFilter');
        const examFilter = document.getElementById('pyqExamFilter');
        if (yearFilter) yearFilter.addEventListener('change', applyPYQFilters);
        if (examFilter) examFilter.addEventListener('change', applyPYQFilters);
    }

    function applyPYQFilters() {
        const activeSubject = document.querySelector('#pyqSubjectFilter .filter-pill.active')?.dataset.subject || 'all';
        const yearVal = document.getElementById('pyqYearFilter')?.value || 'all';
        const examVal = document.getElementById('pyqExamFilter')?.value || 'all';

        let filtered = pyqData;
        if (activeSubject !== 'all') filtered = filtered.filter(p => p.subject === activeSubject);
        if (yearVal !== 'all') filtered = filtered.filter(p => p.year === parseInt(yearVal));
        if (examVal !== 'all') filtered = filtered.filter(p => p.examType === examVal);

        const grid = document.getElementById('pyqGrid');
        if (!grid) return;

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="card" style="grid-column: 1/-1; text-align:center; padding: 3rem;"><p style="color: var(--text-muted);"><i class="fa-solid fa-folder-open" style="font-size:2rem; display:block; margin-bottom:1rem;"></i>No papers found matching your filters.</p></div>`;
            return;
        }

        grid.innerHTML = filtered.map((p, i) => `
            <div class="pyq-card" style="animation-delay: ${i * 0.08}s;">
                <div class="pyq-card-header">
                    <h3>${p.subject}</h3>
                    <span class="difficulty-badge difficulty-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
                </div>
                <div class="pyq-card-meta">
                    <span><i class="fa-solid fa-hashtag"></i> ${p.code}</span>
                    <span><i class="fa-regular fa-calendar"></i> ${p.year}</span>
                    <span><i class="fa-solid fa-file-lines"></i> ${p.examType}</span>
                </div>
                <div class="pyq-card-footer">
                    <button class="pyq-download-btn" onclick="alert('Downloading ${p.code}_${p.examType.replace(/\\s/g,'_')}_${p.year}.pdf (Demo)')">
                        <i class="fa-solid fa-download"></i> Download PDF
                    </button>
                    <span class="pyq-download-count"><i class="fa-solid fa-arrow-down"></i> ${p.downloads}</span>
                </div>
            </div>
        `).join('');
    }

    // =============================================
    // EXAM TIMETABLE PAGE
    // =============================================

    function renderExamTimetable() {
        const upcoming = examTimetable.filter(e => e.status === 'upcoming');
        const completed = examTimetable.filter(e => e.status === 'completed');

        const upcomingBody = document.getElementById('upcomingExamsBody');
        const completedBody = document.getElementById('completedExamsBody');

        if (upcomingBody) {
            upcomingBody.innerHTML = upcoming.map(e => {
                const examDate = new Date(e.date + 'T10:00:00');
                const now = new Date();
                const diff = examDate - now;
                const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
                const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

                let urgency = 'normal';
                if (days <= 3) urgency = 'urgent';
                else if (days <= 7) urgency = 'soon';

                const dateStr = new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

                return `<tr>
                    <td><strong style="color: var(--text-primary);">${e.subject}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${e.code}</span></td>
                    <td>${dateStr}</td>
                    <td>${e.time}</td>
                    <td><span class="exam-venue"><i class="fa-solid fa-location-dot"></i> ${e.venue}</span></td>
                    <td>${e.duration}</td>
                    <td><span class="exam-countdown ${urgency}"><i class="fa-regular fa-clock"></i> ${days}d ${hours}h</span></td>
                </tr>`;
            }).join('');
        }

        if (completedBody) {
            completedBody.innerHTML = completed.map(e => {
                const dateStr = new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
                return `<tr>
                    <td><strong style="color: var(--text-primary);">${e.subject}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${e.code}</span></td>
                    <td>${dateStr}</td>
                    <td>${e.time}</td>
                    <td><span class="exam-venue"><i class="fa-solid fa-location-dot"></i> ${e.venue}</span></td>
                    <td><span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Completed</span></td>
                </tr>`;
            }).join('');
        }
    }

    // =============================================
    // QUIZ PAGE
    // =============================================

    let currentQuiz = null;
    let currentQuestionIdx = 0;
    let userAnswers = [];
    let quizTimerInterval = null;
    let quizTimeRemaining = 0;

    function renderQuiz() {
        const quizGrid = document.getElementById('quizGrid');
        const historyBody = document.getElementById('quizHistoryBody');

        if (quizGrid) {
            quizGrid.innerHTML = quizzesData.map((q, i) => `
                <div class="quiz-card" style="animation-delay: ${i * 0.08}s;">
                    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(135deg, ${q.color}, ${q.color}88);"></div>
                    <div class="quiz-card-subject">${q.subject}</div>
                    <h3>${q.title}</h3>
                    <div class="quiz-card-meta">
                        <span><i class="fa-solid fa-circle-question"></i> ${q.questions} Questions</span>
                        <span><i class="fa-regular fa-clock"></i> ${q.timeLimit} min</span>
                    </div>
                    <div class="quiz-card-footer">
                        <span class="difficulty-badge difficulty-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                        <button class="quiz-start-btn" data-quiz-id="${q.id}" ${q.attempted ? '' : ''}>
                            <i class="fa-solid fa-play"></i> ${q.attempted ? 'Retake' : 'Start'}
                        </button>
                    </div>
                </div>
            `).join('');

            // Attach start quiz listeners
            quizGrid.querySelectorAll('.quiz-start-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const quizId = parseInt(btn.dataset.quizId);
                    startQuiz(quizId);
                });
            });
        }

        if (historyBody) {
            historyBody.innerHTML = quizHistory.map(h => {
                let gradeClass = 'grade-A';
                if (h.grade.startsWith('B')) gradeClass = 'grade-B';
                else if (h.grade.startsWith('C')) gradeClass = 'grade-C';

                return `<tr>
                    <td><strong style="color: var(--text-primary);">${h.quiz}</strong></td>
                    <td>${h.subject}</td>
                    <td>${h.score} (${h.percent}%)</td>
                    <td>${h.date}</td>
                    <td><span class="grade-badge ${gradeClass}">${h.grade}</span></td>
                </tr>`;
            }).join('');
        }
    }

    function startQuiz(quizId) {
        currentQuiz = quizzesData.find(q => q.id === quizId);
        if (!currentQuiz) return;

        currentQuestionIdx = 0;
        userAnswers = new Array(currentQuiz.questionsList.length).fill(-1);
        quizTimeRemaining = currentQuiz.timeLimit * 60;

        const modal = document.getElementById('quizModal');
        document.getElementById('quizModalTitle').textContent = currentQuiz.title;
        document.getElementById('quizResult').style.display = 'none';
        document.getElementById('quizQuestionArea').style.display = 'block';
        document.getElementById('quizSubmitBtn').style.display = 'none';
        document.getElementById('quizCloseResultBtn').style.display = 'none';
        document.getElementById('quizNextBtn').style.display = '';
        document.getElementById('quizPrevBtn').style.display = '';
        document.getElementById('quizScoreTotal').textContent = currentQuiz.questionsList.length;

        modal.classList.add('show');
        renderQuizQuestion();
        startQuizTimer();
    }

    function renderQuizQuestion() {
        const qData = currentQuiz.questionsList[currentQuestionIdx];
        const total = currentQuiz.questionsList.length;

        document.getElementById('quizQuestion').textContent = `Q${currentQuestionIdx + 1}. ${qData.q}`;
        document.getElementById('quizProgressText').textContent = `${currentQuestionIdx + 1} / ${total}`;
        document.getElementById('quizProgressFill').style.width = `${((currentQuestionIdx + 1) / total) * 100}%`;

        const letters = ['A', 'B', 'C', 'D'];
        document.getElementById('quizOptions').innerHTML = qData.options.map((opt, i) => `
            <div class="quiz-option ${userAnswers[currentQuestionIdx] === i ? 'selected' : ''}" data-option="${i}">
                <span class="quiz-option-letter">${letters[i]}</span>
                <span>${opt}</span>
            </div>
        `).join('');

        // Option click handlers
        document.querySelectorAll('#quizOptions .quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const idx = parseInt(opt.dataset.option);
                userAnswers[currentQuestionIdx] = idx;
                document.querySelectorAll('#quizOptions .quiz-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
            });
        });

        // Show/hide prev/next/submit
        document.getElementById('quizPrevBtn').style.display = currentQuestionIdx === 0 ? 'none' : '';
        if (currentQuestionIdx === total - 1) {
            document.getElementById('quizNextBtn').style.display = 'none';
            document.getElementById('quizSubmitBtn').style.display = '';
        } else {
            document.getElementById('quizNextBtn').style.display = '';
            document.getElementById('quizSubmitBtn').style.display = 'none';
        }
    }

    function startQuizTimer() {
        clearInterval(quizTimerInterval);
        updateTimerDisplay();
        quizTimerInterval = setInterval(() => {
            quizTimeRemaining--;
            updateTimerDisplay();
            if (quizTimeRemaining <= 0) {
                clearInterval(quizTimerInterval);
                submitQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const mins = Math.floor(quizTimeRemaining / 60).toString().padStart(2, '0');
        const secs = (quizTimeRemaining % 60).toString().padStart(2, '0');
        const timerEl = document.getElementById('quizTimeLeft');
        timerEl.textContent = `${mins}:${secs}`;

        const timerContainer = document.querySelector('.quiz-timer');
        if (quizTimeRemaining <= 60) {
            timerContainer.classList.add('warning');
        } else {
            timerContainer.classList.remove('warning');
        }
    }

    function submitQuiz() {
        clearInterval(quizTimerInterval);
        let score = 0;
        currentQuiz.questionsList.forEach((q, i) => {
            if (userAnswers[i] === q.correct) score++;
        });

        const total = currentQuiz.questionsList.length;
        const percent = Math.round((score / total) * 100);

        // Update quiz data
        currentQuiz.attempted = true;
        currentQuiz.score = score;

        // Show result
        document.getElementById('quizQuestionArea').style.display = 'none';
        document.getElementById('quizPrevBtn').style.display = 'none';
        document.getElementById('quizNextBtn').style.display = 'none';
        document.getElementById('quizSubmitBtn').style.display = 'none';
        document.getElementById('quizCloseResultBtn').style.display = '';

        const resultDiv = document.getElementById('quizResult');
        resultDiv.style.display = 'flex';
        document.getElementById('quizScoreValue').textContent = score;

        let message = 'Keep Practicing!';
        if (percent >= 90) message = 'Outstanding! 🎉';
        else if (percent >= 70) message = 'Great Job! 👏';
        else if (percent >= 50) message = 'Good Effort! 💪';

        document.getElementById('quizResultMessage').textContent = message;
        document.getElementById('quizResultDetail').textContent = `You scored ${percent}% (${score}/${total})`;
    }

    // Quiz modal event listeners
    const quizModal = document.getElementById('quizModal');
    const quizModalClose = document.getElementById('quizModalClose');
    const quizPrevBtn = document.getElementById('quizPrevBtn');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizSubmitBtn = document.getElementById('quizSubmitBtn');
    const quizCloseResultBtn = document.getElementById('quizCloseResultBtn');

    if (quizModalClose) quizModalClose.addEventListener('click', () => {
        quizModal.classList.remove('show');
        clearInterval(quizTimerInterval);
    });

    if (quizModal) quizModal.addEventListener('click', e => {
        if (e.target === quizModal) {
            quizModal.classList.remove('show');
            clearInterval(quizTimerInterval);
        }
    });

    if (quizPrevBtn) quizPrevBtn.addEventListener('click', () => {
        if (currentQuestionIdx > 0) {
            currentQuestionIdx--;
            renderQuizQuestion();
        }
    });

    if (quizNextBtn) quizNextBtn.addEventListener('click', () => {
        if (currentQuiz && currentQuestionIdx < currentQuiz.questionsList.length - 1) {
            currentQuestionIdx++;
            renderQuizQuestion();
        }
    });

    if (quizSubmitBtn) quizSubmitBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to submit the quiz?')) {
            submitQuiz();
        }
    });

    if (quizCloseResultBtn) quizCloseResultBtn.addEventListener('click', () => {
        quizModal.classList.remove('show');
        renderQuiz();
    });

    // =============================================
    // ASSIGNMENTS PAGE
    // =============================================

    let selectedFile = null;

    function renderAssignments() {
        const assignmentSelect = document.getElementById('assignmentSelect');
        const assignmentsBody = document.getElementById('assignmentsBody');

        if (assignmentSelect) {
            const pendingAssignments = assignmentsData.filter(a => a.status === 'pending');
            assignmentSelect.innerHTML = `<option value="">Select Assignment...</option>` +
                pendingAssignments.map(a => `<option value="${a.id}">${a.title} — ${a.subject}</option>`).join('');
        }

        if (assignmentsBody) {
            assignmentsBody.innerHTML = assignmentsData.map(a => {
                const deadlineDate = new Date(a.deadline);
                const dateStr = deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const now = new Date();
                const isOverdue = deadlineDate < now && a.status === 'pending';

                let statusBadge = '';
                if (a.status === 'submitted') statusBadge = '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Submitted</span>';
                else if (a.status === 'late') statusBadge = '<span class="badge badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> Late</span>';
                else if (isOverdue) statusBadge = '<span class="badge badge-danger"><i class="fa-regular fa-clock"></i> Overdue</span>';
                else statusBadge = '<span class="badge badge-warning"><i class="fa-regular fa-clock"></i> Pending</span>';

                let actionCol = '';
                if (a.file) actionCol = `<span style="color: var(--accent); font-size: 0.85rem; cursor:pointer;" onclick="alert('Opening ${a.file} (Demo)')"><i class="fa-solid fa-file-arrow-down"></i> ${a.file}</span>`;
                else actionCol = '<span style="color: var(--text-muted); font-size: 0.82rem;">No file</span>';

                return `<tr>
                    <td><strong style="color: var(--text-primary);">${a.title}</strong></td>
                    <td>${a.subject}<br><span style="font-size: 0.78rem; color: var(--text-muted);">${a.code}</span></td>
                    <td>${dateStr}</td>
                    <td>${statusBadge}</td>
                    <td>${actionCol}</td>
                </tr>`;
            }).join('');
        }
    }

    // Upload dropzone interactions
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadFileInfo = document.getElementById('uploadFileInfo');
    const uploadFileName = document.getElementById('uploadFileName');
    const uploadFileSize = document.getElementById('uploadFileSize');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const submitAssignmentBtn = document.getElementById('submitAssignmentBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadProgressFill = document.getElementById('uploadProgressFill');
    const uploadProgressText = document.getElementById('uploadProgressText');

    if (dropzone) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', e => {
            e.preventDefault();
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('drag-over');
        });

        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            if (e.dataTransfer.files.length > 0) {
                handleFileSelect(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                handleFileSelect(fileInput.files[0]);
            }
        });
    }

    function handleFileSelect(file) {
        selectedFile = file;
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        uploadFileName.textContent = file.name;
        uploadFileSize.textContent = `${sizeMB} MB`;
        uploadFileInfo.style.display = 'block';
        uploadProgress.style.display = 'none';
        uploadProgressFill.style.width = '0%';
        submitAssignmentBtn.disabled = !document.getElementById('assignmentSelect').value;
    }

    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', () => {
            selectedFile = null;
            uploadFileInfo.style.display = 'none';
            fileInput.value = '';
            submitAssignmentBtn.disabled = true;
        });
    }

    const assignmentSelect = document.getElementById('assignmentSelect');
    if (assignmentSelect) {
        assignmentSelect.addEventListener('change', () => {
            submitAssignmentBtn.disabled = !(assignmentSelect.value && selectedFile);
        });
    }

    if (submitAssignmentBtn) {
        submitAssignmentBtn.addEventListener('click', () => {
            if (!selectedFile || !assignmentSelect.value) return;

            submitAssignmentBtn.disabled = true;
            submitAssignmentBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
            uploadProgress.style.display = 'flex';

            let progress = 0;
            const uploadInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(uploadInterval);

                    uploadProgressFill.style.width = '100%';
                    uploadProgressText.textContent = '100%';

                    setTimeout(() => {
                        // Update assignment data
                        const assignId = parseInt(assignmentSelect.value);
                        const assignment = assignmentsData.find(a => a.id === assignId);
                        if (assignment) {
                            assignment.status = 'submitted';
                            assignment.file = selectedFile.name;
                        }

                        submitAssignmentBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Submitted!';
                        submitAssignmentBtn.style.background = 'var(--gradient-green)';

                        setTimeout(() => {
                            submitAssignmentBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Assignment';
                            submitAssignmentBtn.style.background = '';
                            submitAssignmentBtn.disabled = true;
                            selectedFile = null;
                            uploadFileInfo.style.display = 'none';
                            fileInput.value = '';
                            uploadProgress.style.display = 'none';
                            uploadProgressFill.style.width = '0%';
                            assignmentSelect.value = '';
                            renderAssignments();
                        }, 2000);
                    }, 500);
                }
                uploadProgressFill.style.width = `${progress}%`;
                uploadProgressText.textContent = `${Math.round(progress)}%`;
            }, 200);
        });
    }

    // =============================================
    // PROFILE - Edit Mode
    // =============================================

    const editProfileBtn = document.getElementById('editProfileBtn');
    let editMode = false;

    editProfileBtn.addEventListener('click', () => {
        editMode = !editMode;
        const editableFields = document.querySelectorAll('#profileInfo .info-value[data-field]');

        if (editMode) {
            editProfileBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';
            editableFields.forEach(el => {
                const val = el.textContent;
                const field = el.dataset.field;
                el.innerHTML = `<input type="text" value="${val}" data-field="${field}">`;
            });
        } else {
            editProfileBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';
            editableFields.forEach(el => {
                const input = el.querySelector('input');
                if (input) el.textContent = input.value;
            });
        }
    });

    // =============================================
    // PAYMENT MODAL
    // =============================================

    const payNowBtn = document.getElementById('payNowBtn');
    const paymentModal = document.getElementById('paymentModal');
    const modalClose = document.getElementById('modalClose');
    const paymentForm = document.getElementById('paymentForm');

    payNowBtn.addEventListener('click', () => {
        paymentModal.classList.add('show');
    });

    modalClose.addEventListener('click', () => {
        paymentModal.classList.remove('show');
    });

    paymentModal.addEventListener('click', e => {
        if (e.target === paymentModal) paymentModal.classList.remove('show');
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = val;
    });

    // Expiry formatting
    const expiryInput = document.getElementById('cardExpiry');
    expiryInput.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
        e.target.value = val;
    });

    paymentForm.addEventListener('submit', e => {
        e.preventDefault();
        // Simulate payment
        const btn = paymentForm.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Payment Successful!';
            btn.style.background = 'var(--gradient-green)';
            setTimeout(() => {
                paymentModal.classList.remove('show');
                btn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay $2,450.00';
                btn.style.background = '';
                btn.disabled = false;
            }, 2000);
        }, 2500);
    });

    // =============================================
    // LOGOUT
    // =============================================

    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            alert('You have been logged out. (Demo)');
        }
    });

    // =============================================
    // HEADER USER → Profile
    // =============================================

    document.getElementById('headerUser').addEventListener('click', () => {
        switchPage('profile');
    });

    // =============================================
    // INITIALIZE DASHBOARD
    // =============================================

    renderUpcomingClasses();
    renderRecentActivity();
    renderMiniAttendance();
    renderGradeDistribution();
    animateStatCards();

    // Pre-render pages that need data
    renderAttendancePage();
    renderSchedule();
    renderClasses();
    renderFees();
    renderResults(1);
    renderPYQ();
    renderExamTimetable();
    renderQuiz();
    renderAssignments();

});
