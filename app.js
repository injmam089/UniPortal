/* ============================================
   UniPortal — Student Dashboard JavaScript
   All interactivity, mock data, and animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // MOCK DATA
    // =============================================

    const student = {
        name: 'Injmam Ansari',
        fatherName: 'Mr. Ahsanullah Ansari',
        motherName: 'Mrs Jamila Khatoon',
        id: 'STU-2400103912',
        department: 'Bachelor of Computer Application (BCA)',
        university: 'Integral University, Lucknow',
        semester: '5th Semester',
        cgpa: 8.15,
        email: 'injmamah@student.iul.ac.in',
        phone: '+91 7052959935',
        enrollmentYear: 2024,
        dob: 'March 09, 2004',
        gender: 'Male',
        address: 'J.N BOYS Hostel ROOM 05, LUCKNOW, INDIA 226026',
        advisor: 'Mrs. Arshiya Dilshad',
    };

    const courses = [
        { code: 'CA301', name: 'Computer Graphics and Multimedia Application', prof: 'Mohd Adnan', room: 'Room E414 / E211 / B113', credits: 4, days: 'Mon, Tue, Wed, Fri', time: 'Mon 1:30 PM / Tue 10:40 AM / Wed 2:20 PM / Fri 9:50 AM', progress: 72, color: '#667eea', type: 'Theory' },
        { code: 'CA324', name: 'Algorithm Analysis and Design', prof: 'Arshiya Dilshad', room: 'Room E414 / E109 / E107', credits: 4, days: 'Mon, Wed, Thu, Fri', time: 'Mon 2:20 PM / Wed 3:10 PM / Thu 11:30 AM / Fri 10:40 AM', progress: 68, color: '#00d2ff', type: 'Theory' },
        { code: 'CA325', name: 'Full Stack Web Development-II', prof: 'M. Muhammad Muzammil', room: 'Room E211 / E219', credits: 4, days: 'Tue, Wed, Thu, Fri', time: 'Tue 1:30 PM / Wed 10:40 AM / Thu 9:50 AM / Fri 9:00 AM', progress: 75, color: '#4ade80', type: 'Theory' },
        { code: 'CA326', name: 'Introduction to Mobile Application Development', prof: 'Fareen', room: 'Room E414 / E211 / E219 / E103A', credits: 4, days: 'Mon, Tue, Thu, Fri', time: 'Mon 9:50 AM / Tue 12:40 PM / Thu 9:00 AM / Fri 2:20 PM', progress: 62, color: '#f093fb', type: 'Theory' },
        { code: 'CA327', name: 'Introduction to Internet of Things', prof: 'Kashif Asad', room: 'Room E219', credits: 4, days: 'Mon, Thu, Fri', time: 'Mon 3:10 PM / Thu 1:30 PM / Fri 3:10 PM', progress: 58, color: '#ff6b6b', type: 'Theory' },
        { code: 'CG301', name: 'Career Development Course', prof: 'Ayaz Mahmood', room: 'Room E302 / E219', credits: 2, days: 'Mon, Tue', time: 'Mon 12:40 PM / Tue 3:10 PM', progress: 85, color: '#fbbf24', type: 'Theory' },
        { code: 'CA307', name: 'Cyber Security & Forensics', prof: 'Dr. Mohd. Suhaib Kidwai', room: 'Room E219', credits: 3, days: 'Mon, Wed, Thu, Fri', time: 'Mon 11:30 AM / Wed 12:40 PM / Thu 2:20 PM / Fri 1:30 PM', progress: 78, color: '#3a7bd5', type: 'Practical' },
        { code: 'CA312', name: 'Computer Graphics and Multimedia Application Lab', prof: 'Mohd Talha', room: 'Room B129', credits: 1, days: 'Tue, Wed', time: '09:00 AM–10:40 AM', progress: 80, color: '#667eea', type: 'Practical' },
        { code: 'CA330', name: 'Mobile Application Development Lab', prof: 'Abdullah Aqeel', room: 'CSE Lab (B126)', credits: 2, days: 'Thu', time: '03:10 PM–04:00 PM', progress: 65, color: '#f093fb', type: 'Practical' }
    ];

    const attendanceData = [
        { subject: 'Computer Graphics', percent: 92, present: 33, total: 36 },
        { subject: 'Algorithm Analysis', percent: 88, present: 30, total: 34 },
        { subject: 'Full Stack Web-II', percent: 95, present: 19, total: 20 },
        { subject: 'Mobile App Dev', percent: 85, present: 28, total: 33 },
        { subject: 'Internet of Things', percent: 78, present: 25, total: 32 },
        { subject: 'Career Development', percent: 90, present: 18, total: 20 },
        { subject: 'Cyber Security', percent: 88, present: 15, total: 17 },
        { subject: 'Graphics & Media Lab', percent: 100, present: 12, total: 12 },
        { subject: 'Mobile App Lab', percent: 80, present: 8, total: 10 }
    ];

    const scheduleByDay = {
        'Mon': [
            { startPeriod: 2, periodName: '2nd Period', time: '09:50 AM – 10:40 AM', duration: 1, subject: 'Introduction to Mobile Application Development', code: 'CA326', prof: 'Fareen', group: 'Group 2', type: 'Theory', room: 'Room E414', color: '#f093fb' },
            { startPeriod: 4, periodName: '4th Period', time: '11:30 AM – 12:20 PM', duration: 1, subject: 'Cyber Security & Forensics', code: 'CA307', prof: 'Dr. Mohd. Suhaib Kidwai', group: 'Group 1', type: 'Lab', room: 'Room E219', color: '#3a7bd5', isLab: true },
            { startPeriod: 5, periodName: '5th Period', time: '12:40 PM – 01:30 PM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Ayaz Mahmood', group: 'Group 2', type: 'Theory', room: 'Room E302', color: '#fbbf24' },
            { startPeriod: 6, periodName: '6th Period', time: '01:30 PM – 02:20 PM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Mohd Adnan', group: 'Group 2', type: 'Theory', room: 'Room E414', color: '#667eea' },
            { startPeriod: 7, periodName: '7th Period', time: '02:20 PM – 03:10 PM', duration: 1, subject: 'Algorithm Analysis and Design', code: 'CA324', prof: 'Arshiya Dilshad', group: 'Group 2', type: 'Theory', room: 'Room E414', color: '#00d2ff' },
            { startPeriod: 8, periodName: '8th Period', time: '03:10 PM – 04:00 PM', duration: 1, subject: 'Introduction to Internet of Things', code: 'CA327', prof: 'Kashif Asad', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#ff6b6b' }
        ],
        'Tue': [
            { startPeriod: 1, periodName: '1st & 2nd Period', time: '09:00 AM – 10:40 AM', duration: 2, subject: 'Computer Graphics and Multimedia Application Lab', code: 'CA312', prof: 'Mohd Talha', group: 'Group 1', type: 'Lab', room: 'Room B129', color: '#667eea', isLab: true },
            { startPeriod: 3, periodName: '3rd Period', time: '10:40 AM – 11:30 AM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Mohd Adnan', group: 'Group 2', type: 'Theory', room: 'Room B113', color: '#667eea' },
            { startPeriod: 5, periodName: '5th Period', time: '12:40 PM – 01:30 PM', duration: 1, subject: 'Introduction to Mobile Application Development', code: 'CA326', prof: 'Fareen', group: 'Group 2', type: 'Theory', room: 'Room E211', color: '#f093fb' },
            { startPeriod: 6, periodName: '6th Period', time: '01:30 PM – 02:20 PM', duration: 1, subject: 'Full Stack Web Development-II', code: 'CA325', prof: 'M. Muhammad Muzammil', group: 'Group 2', type: 'Theory', room: 'Room E211', color: '#4ade80' },
            { startPeriod: 8, periodName: '8th Period', time: '03:10 PM – 04:00 PM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Ayaz Mahmood', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#fbbf24' }
        ],
        'Wed': [
            { startPeriod: 1, periodName: '1st & 2nd Period', time: '09:00 AM – 10:40 AM', duration: 2, subject: 'Computer Graphics and Multimedia Application Lab', code: 'CA312', prof: 'Mohd Talha', group: 'Group 1', type: 'Lab', room: 'Room B129', color: '#667eea', isLab: true },
            { startPeriod: 3, periodName: '3rd Period', time: '10:40 AM – 11:30 AM', duration: 1, subject: 'Full Stack Web Development-II', code: 'CA325', prof: 'M. Muhammad Muzammil', group: 'Group 2', type: 'Theory', room: 'Room E211', color: '#4ade80' },
            { startPeriod: 5, periodName: '5th Period', time: '12:40 PM – 01:30 PM', duration: 1, subject: 'Cyber Security & Forensics', code: 'CA307', prof: 'Dr. Mohd. Suhaib Kidwai', group: 'Group 1', type: 'Lab', room: 'Room E219', color: '#3a7bd5', isLab: true },
            { startPeriod: 7, periodName: '7th Period', time: '02:20 PM – 03:10 PM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Mohd Adnan', group: 'Group 2', type: 'Theory', room: 'Room E414', color: '#667eea' },
            { startPeriod: 8, periodName: '8th Period', time: '03:10 PM – 04:00 PM', duration: 1, subject: 'Algorithm Analysis and Design', code: 'CA324', prof: 'Arshiya Dilshad', group: 'Group 2', type: 'Theory', room: 'Room E414', color: '#00d2ff' }
        ],
        'Thu': [
            { startPeriod: 1, periodName: '1st Period', time: '09:00 AM – 09:50 AM', duration: 1, subject: 'Introduction to Mobile Application Development', code: 'CA326', prof: 'Fareen', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#f093fb' },
            { startPeriod: 2, periodName: '2nd Period', time: '09:50 AM – 10:40 AM', duration: 1, subject: 'Full Stack Web Development-II', code: 'CA325', prof: 'M. Muhammad Muzammil', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#4ade80' },
            { startPeriod: 4, periodName: '4th Period', time: '11:30 AM – 12:20 PM', duration: 1, subject: 'Algorithm Analysis and Design', code: 'CA324', prof: 'Arshiya Dilshad', group: 'Group 2', type: 'Theory', room: 'Room E109', color: '#00d2ff' },
            { startPeriod: 6, periodName: '6th Period', time: '01:30 PM – 02:20 PM', duration: 1, subject: 'Introduction to Internet of Things', code: 'CA327', prof: 'Kashif Asad', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#ff6b6b' },
            { startPeriod: 7, periodName: '7th Period', time: '02:20 PM – 03:10 PM', duration: 1, subject: 'Cyber Security & Forensics', code: 'CA307', prof: 'Dr. Mohd. Suhaib Kidwai', group: 'Group 1', type: 'Lab', room: 'Room E219', color: '#3a7bd5', isLab: true },
            { startPeriod: 8, periodName: '8th Period', time: '03:10 PM – 04:00 PM', duration: 1, subject: 'Mobile Application Development Lab', code: 'CA330', prof: 'Abdullah Aqeel', group: 'Group 1', type: 'Lab', room: 'CSE Lab (B126)', color: '#f093fb', isLab: true }
        ],
        'Fri': [
            { startPeriod: 1, periodName: '1st Period', time: '09:00 AM – 09:50 AM', duration: 1, subject: 'Full Stack Web Development-II', code: 'CA325', prof: 'M. Muhammad Muzammil', group: 'Group 2', type: 'Theory', room: 'Room E211', color: '#4ade80' },
            { startPeriod: 2, periodName: '2nd Period', time: '09:50 AM – 10:40 AM', duration: 1, subject: 'Computer Graphics and Multimedia Application', code: 'CA301', prof: 'Mohd Adnan', group: 'Group 2', type: 'Theory', room: 'Room E211', color: '#667eea' },
            { startPeriod: 3, periodName: '3rd Period', time: '10:40 AM – 11:30 AM', duration: 1, subject: 'Algorithm Analysis and Design', code: 'CA324', prof: 'Arshiya Dilshad', group: 'Group 2', type: 'Theory', room: 'Room E107', color: '#00d2ff' },
            { startPeriod: 6, periodName: '01:30 PM – 02:20 PM', duration: 1, subject: 'Cyber Security & Forensics', code: 'CA307', prof: 'Dr. Mohd. Suhaib Kidwai', group: 'Group 1', type: 'Lab', room: 'Room E219', color: '#3a7bd5', isLab: true },
            { startPeriod: 7, periodName: '7th Period', time: '02:20 PM – 03:10 PM', duration: 1, subject: 'Introduction to Mobile Application Development', code: 'CA326', prof: 'Fareen', group: 'Group 2', type: 'Theory', room: 'Room E103A', color: '#f093fb' },
            { startPeriod: 8, periodName: '8th Period', time: '03:10 PM – 04:00 PM', duration: 1, subject: 'Introduction to Internet of Things', code: 'CA327', prof: 'Kashif Asad', group: 'Group 2', type: 'Theory', room: 'Room E219', color: '#ff6b6b' }
        ],
        'Sat': [],
        'Sun': []
    };

    const feeBreakdown = [
        { component: 'Tuition Fee', amount: 80000, status: 'Paid' },
        { component: 'Laboratory Fee', amount: 15000, status: 'Paid' },
        { component: 'Library Fee', amount: 5000, status: 'Pending' },
        { component: 'Sports & Activities', amount: 6000, status: 'Pending' },
        { component: 'Examination Fee', amount: 8000, status: 'Pending' },
        { component: 'Technology Fee', amount: 6000, status: 'Paid' }
    ];

    const paymentHistory = [
        { date: '2025-08-15', txnId: 'TXN-2025-4521', desc: 'Semester 5 Tuition (Partial)', amount: 50000, status: 'Paid' },
        { date: '2025-07-02', txnId: 'TXN-2025-1876', desc: 'Technology Fee', amount: 6000, status: 'Paid' },
        { date: '2025-06-20', txnId: 'TXN-2025-1654', desc: 'Laboratory Fee', amount: 15000, status: 'Paid' },
        { date: '2025-06-01', txnId: 'TXN-2025-1210', desc: 'Tuition (Remaining)', amount: 30000, status: 'Paid' },
        { date: '2025-05-15', txnId: 'TXN-2025-0890', desc: 'Library & Sports Fee', amount: 11000, status: 'Pending' },
        { date: '2025-05-10', txnId: 'TXN-2025-0765', desc: 'Examination Fee', amount: 8000, status: 'Pending' }
    ];

    const resultsData = {
        1: {
            academicYear: '2024–25',
            semesterName: 'First Semester',
            sgpa: 8.12,
            cgpa: 8.12,
            totalCredits: 25,
            eseTotal: '237 / 320',
            caTotal: '377 / 480',
            overallTotal: '614 / 800',
            result: 'PASS',
            subjects: [
                { code: 'CA110', name: 'Computer Fundamentals and C Programming', ese: '22 / 40', ca: '39 / 60', total: '61 / 100', credits: 4, grade: 'C' },
                { code: 'CA114', name: 'Introduction to IT Industry', ese: '36 / 40', ca: '51 / 60', total: '87 / 100', credits: 4, grade: 'O' },
                { code: 'ES115', name: 'Fundamentals of Environmental Science', ese: '21 / 40', ca: '49 / 60', total: '70 / 100', credits: 4, grade: 'C' },
                { code: 'LN104', name: 'Essential Professional Communication', ese: '33 / 40', ca: '43 / 60', total: '76 / 100', credits: 4, grade: 'B' },
                { code: 'MT151', name: 'Computational Mathematics', ese: '34 / 40', ca: '49 / 60', total: '83 / 100', credits: 4, grade: 'A' },
                { code: 'CA103', name: 'C Programming Lab', ese: '24 / 40', ca: '43 / 60', total: '67 / 100', credits: 2, grade: 'C' },
                { code: 'CA104', name: 'Computer Application Lab', ese: '34 / 40', ca: '52 / 60', total: '86 / 100', credits: 2, grade: 'O' },
                { code: 'LN152', name: 'Basic Professional Communication Lab', ese: '33 / 40', ca: '51 / 60', total: '84 / 100', credits: 1, grade: 'A' }
            ]
        },
        2: {
            academicYear: '2024–25',
            semesterName: 'Second Semester',
            sgpa: 8.20,
            cgpa: 8.16,
            totalCredits: 25,
            eseTotal: '238 / 320',
            caTotal: '388 / 480',
            overallTotal: '626 / 800',
            result: 'PASS',
            subjects: [
                { code: 'CA107', name: 'Data Structure using C', ese: '26 / 40', ca: '48 / 60', total: '74 / 100', credits: 4, grade: 'C' },
                { code: 'CA113', name: 'Cyber Crime and Cyber Law', ese: '27 / 40', ca: '42 / 60', total: '69 / 100', credits: 4, grade: 'C' },
                { code: 'CA115', name: 'Computer Organization & Architecture', ese: '32 / 40', ca: '48 / 60', total: '80 / 100', credits: 4, grade: 'A' },
                { code: 'LN131', name: 'Effective Communication and Media Studies in English', ese: '29 / 40', ca: '47 / 60', total: '76 / 100', credits: 4, grade: 'B' },
                { code: 'MT152', name: 'Numerical and Statistical Methods', ese: '31 / 40', ca: '56 / 60', total: '87 / 100', credits: 4, grade: 'O' },
                { code: 'CA108', name: 'Data Structure Lab', ese: '28 / 40', ca: '46 / 60', total: '74 / 100', credits: 2, grade: 'C' },
                { code: 'CA116', name: 'Computer Organization & Architecture Lab', ese: '33 / 40', ca: '51 / 60', total: '84 / 100', credits: 2, grade: 'A' },
                { code: 'LN153', name: 'Advanced Professional Communication Lab II', ese: '32 / 40', ca: '50 / 60', total: '82 / 100', credits: 1, grade: 'A' }
            ]
        },
        3: {
            academicYear: '2025–26',
            semesterName: 'Third Semester',
            sgpa: 8.36,
            cgpa: 8.23,
            totalCredits: 25,
            eseTotal: '245 / 320',
            caTotal: '386 / 480',
            overallTotal: '631 / 800',
            result: 'PASS',
            subjects: [
                { code: 'CA203', name: 'Object Oriented Programming Concepts using C++', ese: '29 / 40', ca: '45 / 60', total: '74 / 100', credits: 4, grade: 'C' },
                { code: 'CA204', name: 'Fundamentals of Database Management System', ese: '31 / 40', ca: '50 / 60', total: '81 / 100', credits: 4, grade: 'A' },
                { code: 'CA218', name: 'Data Compression and Multimedia System', ese: '36 / 40', ca: '52 / 60', total: '88 / 100', credits: 4, grade: 'O' },
                { code: 'CA221', name: 'Web Development', ese: '31 / 40', ca: '50 / 60', total: '81 / 100', credits: 4, grade: 'A' },
                { code: 'CA222', name: 'Discrete Mathematical Structure', ese: '29 / 40', ca: '43 / 60', total: '72 / 100', credits: 4, grade: 'C' },
                { code: 'CA206', name: 'C++ Lab', ese: '30 / 40', ca: '48 / 60', total: '78 / 100', credits: 2, grade: 'B' },
                { code: 'CA207', name: 'DBMS Lab', ese: '28 / 40', ca: '49 / 60', total: '77 / 100', credits: 2, grade: 'C' },
                { code: 'CA223', name: 'Web Development Lab', ese: '31 / 40', ca: '49 / 60', total: '80 / 100', credits: 1, grade: 'A' }
            ]
        },
        4: {
            academicYear: '2025–26',
            semesterName: 'Fourth Semester',
            sgpa: 7.92,
            cgpa: 8.15,
            totalCredits: 25,
            eseTotal: '235 / 320',
            caTotal: '378 / 480',
            overallTotal: '613 / 800',
            result: 'PASS',
            subjects: [
                { code: 'CA210', name: 'Software Engineering and Project Management', ese: '30 / 40', ca: '52 / 60', total: '82 / 100', credits: 4, grade: 'A' },
                { code: 'CA213', name: 'Principles of Operating System', ese: '35 / 40', ca: '48 / 60', total: '83 / 100', credits: 4, grade: 'A' },
                { code: 'CA214', name: 'JAVA Programming', ese: '34 / 40', ca: '50 / 60', total: '84 / 100', credits: 4, grade: 'A' },
                { code: 'CA225', name: 'Full Stack Web Development-I', ese: '24 / 40', ca: '46 / 60', total: '70 / 100', credits: 4, grade: 'C' },
                { code: 'CA226', name: 'Data Communication & Computer Networks', ese: '23 / 40', ca: '41 / 60', total: '64 / 100', credits: 4, grade: 'D' },
                { code: 'CA216', name: 'JAVA Programming Lab', ese: '27 / 40', ca: '45 / 60', total: '72 / 100', credits: 2, grade: 'C' },
                { code: 'CA227', name: 'Operating System Lab', ese: '29 / 40', ca: '44 / 60', total: '73 / 100', credits: 2, grade: 'C' },
                { code: 'CA228', name: 'Full Stack Web Development-II Lab', ese: '33 / 40', ca: '52 / 60', total: '85 / 100', credits: 1, grade: 'O' }
            ]
        },
        5: {
            academicYear: '2026–27',
            semesterName: 'Fifth Semester',
            status: 'Current Semester (In Progress)',
            totalCredits: 27,
            enrolledCount: 9
        }
    };

    const notifications = [
        { icon: 'fa-solid fa-file-lines', bg: 'linear-gradient(135deg, #667eea, #764ba2)', text: 'Assignment "Web Dev II Project" is due tomorrow', time: '2 hours ago', unread: true },
        { icon: 'fa-solid fa-wallet', bg: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', text: 'Fee payment reminder: ₹19,000 pending before Sep 15', time: '5 hours ago', unread: true },
        { icon: 'fa-solid fa-bullhorn', bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', text: 'Mid-semester exam timetable released for BCA Sem 5', time: '1 day ago', unread: false },
        { icon: 'fa-solid fa-ranking-star', bg: 'linear-gradient(135deg, #4ade80, #22c55e)', text: 'Semester 4 results have been published', time: '2 days ago', unread: false },
        { icon: 'fa-solid fa-tower-broadcast', bg: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', text: 'Annual Tech Fest registrations are open!', time: '3 days ago', unread: false }
    ];

    const activities = [
        { text: 'Submitted Full Stack Web Dev-II Lab Assignment', time: 'Today, 2:30 PM', color: '#4ade80' },
        { text: 'Completed Algorithm Analysis Quiz (Score: 90%)', time: 'Today, 10:15 AM', color: '#667eea' },
        { text: 'Viewed Semester 4 results', time: 'Yesterday, 4:15 PM', color: '#f093fb' },
        { text: 'Paid Laboratory Fee — ₹15,000', time: 'Yesterday, 2:00 PM', color: '#00d2ff' },
        { text: 'Enrolled in Full Stack Web Dev-II course', time: 'Aug 3, 11:00 AM', color: '#fbbf24' },
        { text: 'Updated phone number in profile', time: 'Aug 1, 3:30 PM', color: '#ff6b6b' }
    ];

    const todaysClasses = [
        { time: '9:50 AM', subject: 'Mobile App Dev', room: 'Room E414', prof: 'Fareen' },
        { time: '1:30 PM', subject: 'Computer Graphics', room: 'Room E414', prof: 'Mohd Adnan' },
        { time: '2:20 PM', subject: 'Algorithm Analysis', room: 'Room E414', prof: 'Arshiya Dilshad' }
    ];

    const pyqData = [
        // ===== SEMESTER 1 (2024–25) =====
        { id: 1, sem: 1, subject: 'Computer Fundamentals and C Programming', code: 'CA110', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 84, popular: true },
        { id: 2, sem: 1, subject: 'Computer Fundamentals and C Programming', code: 'CA110', year: '2024–25', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 62, popular: false },
        { id: 3, sem: 1, subject: 'Introduction to IT Industry', code: 'CA114', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 95, popular: true },
        { id: 4, sem: 1, subject: 'Fundamentals of Environmental Science', code: 'ES115', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 41, popular: false },
        { id: 5, sem: 1, subject: 'Essential Professional Communication', code: 'LN104', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 58, popular: false },
        { id: 6, sem: 1, subject: 'Computational Mathematics', code: 'MT151', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 110, popular: true },
        { id: 7, sem: 1, subject: 'Computational Mathematics', code: 'MT151', year: '2024–25', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 72, popular: false },
        { id: 8, sem: 1, subject: 'C Programming Lab', code: 'CA103', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 9, sem: 1, subject: 'Computer Application Lab', code: 'CA104', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 10, sem: 1, subject: 'Basic Professional Communication Lab', code: 'LN152', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },

        // ===== SEMESTER 2 (2024–25) =====
        { id: 11, sem: 2, subject: 'Data Structure using C', code: 'CA107', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 125, popular: true },
        { id: 12, sem: 2, subject: 'Data Structure using C', code: 'CA107', year: '2024–25', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 78, popular: false },
        { id: 13, sem: 2, subject: 'Cyber Crime and Cyber Law', code: 'CA113', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 52, popular: false },
        { id: 14, sem: 2, subject: 'Computer Organization & Architecture', code: 'CA115', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 104, popular: true },
        { id: 15, sem: 2, subject: 'Effective Communication and Media Studies in English', code: 'LN131', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 49, popular: false },
        { id: 16, sem: 2, subject: 'Numerical and Statistical Methods', code: 'MT152', year: '2024–25', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 118, popular: true },
        { id: 17, sem: 2, subject: 'Data Structure Lab', code: 'CA108', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 18, sem: 2, subject: 'Computer Organization & Architecture Lab', code: 'CA116', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 19, sem: 2, subject: 'Advanced Professional Communication Lab II', code: 'LN153', year: '2024–25', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },

        // ===== SEMESTER 3 (2025–26) =====
        { id: 20, sem: 3, subject: 'Object Oriented Programming Concepts using C++', code: 'CA203', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 138, popular: true },
        { id: 21, sem: 3, subject: 'Object Oriented Programming Concepts using C++', code: 'CA203', year: '2025–26', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 86, popular: false },
        { id: 22, sem: 3, subject: 'Fundamentals of Database Management System', code: 'CA204', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 145, popular: true },
        { id: 23, sem: 3, subject: 'Fundamentals of Database Management System', code: 'CA204', year: '2025–26', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 92, popular: false },
        { id: 24, sem: 3, subject: 'Data Compression and Multimedia System', code: 'CA218', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 64, popular: false },
        { id: 25, sem: 3, subject: 'Web Development', code: 'CA221', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 128, popular: true },
        { id: 26, sem: 3, subject: 'Discrete Mathematical Structure', code: 'CA222', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 102, popular: false },
        { id: 27, sem: 3, subject: 'C++ Lab', code: 'CA206', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 28, sem: 3, subject: 'DBMS Lab', code: 'CA207', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 29, sem: 3, subject: 'Web Development Lab', code: 'CA223', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },

        // ===== SEMESTER 4 (2025–26) =====
        { id: 30, sem: 4, subject: 'Software Engineering and Project Management', code: 'CA210', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 115, popular: true },
        { id: 31, sem: 4, subject: 'Principles of Operating System', code: 'CA213', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 132, popular: true },
        { id: 32, sem: 4, subject: 'JAVA Programming', code: 'CA214', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 160, popular: true },
        { id: 33, sem: 4, subject: 'JAVA Programming', code: 'CA214', year: '2025–26', type: 'Theory', examType: 'Mid-Semester', hasFile: true, downloads: 95, popular: false },
        { id: 34, sem: 4, subject: 'Full Stack Web Development-I', code: 'CA225', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 140, popular: true },
        { id: 35, sem: 4, subject: 'Data Communication & Computer Networks', code: 'CA226', year: '2025–26', type: 'Theory', examType: 'End-Semester', hasFile: true, downloads: 108, popular: false },
        { id: 36, sem: 4, subject: 'JAVA Programming Lab', code: 'CA216', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 37, sem: 4, subject: 'Operating System Lab', code: 'CA227', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false },
        { id: 38, sem: 4, subject: 'Full Stack Web Development-II Lab', code: 'CA228', year: '2025–26', type: 'Lab / Practical', examType: 'End-Semester', hasFile: false, downloads: 0, popular: false }
    ];

    const examTimetable = [
        { subject: 'Computer Graphics and Multimedia Application', code: 'CA301', date: '2026-08-25', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall A', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Algorithm Analysis and Design', code: 'CA324', date: '2026-08-28', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall B', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Full Stack Web Development-II', code: 'CA325', date: '2026-09-01', time: '2:00 PM - 5:00 PM', venue: 'Exam Hall A', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Introduction to Mobile Application Development', code: 'CA326', date: '2026-09-04', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall C', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Introduction to Internet of Things', code: 'CA327', date: '2026-09-07', time: '2:00 PM - 5:00 PM', venue: 'Exam Hall B', duration: '3 hrs', status: 'upcoming' },
        { subject: 'Career Development Course', code: 'CG301', date: '2026-07-15', time: '10:00 AM - 12:00 PM', venue: 'Exam Hall A', duration: '2 hrs', status: 'completed' }
    ];

    const quizzesData = [
        {
            id: 1,
            subject: 'Computer Graphics and Multimedia Application',
            code: 'CA301',
            type: 'Theory',
            title: 'Computer Graphics Fundamentals',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Medium',
            color: '#667eea',
            attempted: true,
            score: 4,
            questionsList: [
                { q: 'Which algorithm is used for line drawing using integer calculations only?', options: ['DDA Algorithm', "Bresenham's Line Algorithm", 'Midpoint Circle Algorithm', 'Cohen-Sutherland'], correct: 1 },
                { q: 'What is clipping in computer graphics?', options: ['Enlarging a graphic', 'Removing parts of primitives outside a view window', 'Changing pixel colors', 'Rasterization'], correct: 1 },
                { q: 'Which transformation moves an object from one position to another?', options: ['Rotation', 'Translation', 'Scaling', 'Reflection'], correct: 1 },
                { q: 'What is anti-aliasing?', options: ['Sharpening lines', 'Technique to reduce staircase visual distortion (jaggies)', 'Adding 3D shadows', 'Compression'], correct: 1 },
                { q: 'Which color model is primarily used for computer monitors?', options: ['CMYK', 'HSV', 'RGB', 'YIQ'], correct: 2 }
            ]
        },
        {
            id: 2,
            subject: 'Algorithm Analysis and Design',
            code: 'CA324',
            type: 'Theory',
            title: 'Algorithm Analysis Fundamentals',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Hard',
            color: '#00d2ff',
            attempted: true,
            score: 5,
            questionsList: [
                { q: 'What does Big-O notation represent in algorithm analysis?', options: ['Best case time complexity', 'Worst case time complexity upper bound', 'Exact execution time in seconds', 'Average space requirement'], correct: 1 },
                { q: 'Which paradigm does Merge Sort use?', options: ['Greedy Approach', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'], correct: 2 },
                { q: 'What is the time complexity of solving 0/1 Knapsack using Dynamic Programming?', options: ['O(n)', 'O(n log n)', 'O(n * W)', 'O(2^n)'], correct: 2 },
                { q: 'Which algorithm finds single-source shortest paths with non-negative edge weights?', options: ['Bellman-Ford', "Dijkstra's Algorithm", "Floyd-Warshall", 'Kruskal'], correct: 1 },
                { q: 'What property is required for Dynamic Programming to apply to a problem?', options: ['Strict Sorting', 'Optimal Substructure & Overlapping Subproblems', 'Greedy Choice', 'Randomization'], correct: 1 }
            ]
        },
        {
            id: 3,
            subject: 'Full Stack Web Development-II',
            code: 'CA325',
            type: 'Theory',
            title: 'Full Stack Web Development-II',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Medium',
            color: '#4ade80',
            attempted: true,
            score: 4,
            questionsList: [
                { q: 'What is Node.js?', options: ['A frontend framework', 'An asynchronous event-driven JavaScript runtime environment', 'A relational database engine', 'A CSS preprocessor'], correct: 1 },
                { q: 'Which Express middleware parses incoming requests with JSON payloads?', options: ['express.static()', 'express.json()', 'express.urlencoded()', 'cors()'], correct: 1 },
                { q: 'Which HTTP status code represents "Created successfully"?', options: ['200', '201', '404', '500'], correct: 1 },
                { q: 'What type of database is MongoDB?', options: ['Relational SQL', 'Document-oriented NoSQL', 'Graph database', 'Key-value store'], correct: 1 },
                { q: 'Which method signs a JSON Web Token (JWT) in Node.js?', options: ['jwt.create()', 'jwt.sign()', 'jwt.encode()', 'jwt.hash()'], correct: 1 }
            ]
        },
        {
            id: 4,
            subject: 'Introduction to Mobile Application Development',
            code: 'CA326',
            type: 'Theory',
            title: 'Mobile Application Development',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Easy',
            color: '#f093fb',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'Which file contains essential configuration in an Android app?', options: ['build.gradle', 'AndroidManifest.xml', 'MainActivity.java', 'strings.xml'], correct: 1 },
                { q: 'Which method is called first when an Android Activity starts?', options: ['onStart()', 'onResume()', 'onCreate()', 'onLaunch()'], correct: 2 },
                { q: 'What is an Intent in Android?', options: ['A database connection', 'An asynchronous messaging object to request an action', 'A layout widget', 'A network thread'], correct: 1 },
                { q: 'Which layout aligns UI components linearly in a single direction?', options: ['RelativeLayout', 'ConstraintLayout', 'LinearLayout', 'TableLayout'], correct: 2 },
                { q: 'Which programming language is officially supported for modern Android dev alongside Java?', options: ['Kotlin', 'Swift', 'C#', 'Python'], correct: 0 }
            ]
        },
        {
            id: 5,
            subject: 'Introduction to Internet of Things',
            code: 'CA327',
            type: 'Theory',
            title: 'Internet of Things Fundamentals',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Easy',
            color: '#ff6b6b',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'Which lightweight messaging protocol is widely used in IoT devices?', options: ['HTTP', 'MQTT', 'FTP', 'SMTP'], correct: 1 },
                { q: 'What is an actuator in an IoT system?', options: ['A sensor that measures temperature', 'A component that converts electrical signals into physical motion', 'A cloud database', 'A gateway router'], correct: 1 },
                { q: 'What does RFID stand for?', options: ['Radio Frequency Identification', 'Remote Field Information Device', 'Rapid Frequency Data', 'Rotational Field ID'], correct: 0 },
                { q: 'Which microcontroller board is popular for IoT WiFi/Bluetooth projects?', options: ['ESP32', '8051 Microcontroller', 'Raspberry Pi Pico (non-wireless)', 'Intel Core i7'], correct: 0 },
                { q: 'What is Edge Computing in IoT?', options: ['Storing all data in public cloud', 'Processing data closer to sensor devices', 'Using edge routers only', 'Backup storage'], correct: 1 }
            ]
        },
        {
            id: 6,
            subject: 'Career Development Course',
            code: 'CG301',
            type: 'Theory',
            title: 'Career Development & Interview Skills',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Medium',
            color: '#fbbf24',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'What is the primary purpose of a professional resume summary?', options: ['List all personal hobbies', 'Highlight key technical skills, experience & career value', 'Provide salary demands', 'List reference phone numbers'], correct: 1 },
                { q: 'In the STAR interview response method, what does "A" stand for?', options: ['Achievement', 'Action', 'Analysis', 'Ability'], correct: 1 },
                { q: 'What is professional workplace etiquette?', options: ['Adhering to ethical conduct, punctuality, and mutual respect', 'Casual dress always', 'Ignoring deadlines', 'Only communicating via text'], correct: 0 },
                { q: 'What is a key practice for effective technical interview answers?', options: ['Memorizing code line by line', 'Structured explanation using examples & problem-solving steps', 'Giving single-word answers', 'Interrupting the interviewer'], correct: 1 },
                { q: 'Which document accompanies a job application resume?', options: ['Transcript', 'Cover Letter', 'Recommendation Slip', 'Identity Proof'], correct: 1 }
            ]
        },
        {
            id: 7,
            subject: 'Computer Graphics and Multimedia Application Lab',
            code: 'CA312',
            type: 'LAB / PRACTICAL',
            title: 'Computer Graphics & Multimedia Practical',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Medium',
            color: '#667eea',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'In OpenGL / C graphics programming, which function initializes the graphics system?', options: ['initgraph()', 'graphicsInit()', 'startGraphics()', 'openWindow()'], correct: 0 },
                { q: 'Which coordinate system is commonly used in 2D graphics programming?', options: ['Polar Coordinates', 'Cartesian Coordinates (X, Y)', 'Spherical Coordinates', 'Cylindrical Coordinates'], correct: 1 },
                { q: 'Which function draws a circle using the midpoint algorithm in graphics library?', options: ['drawCircle()', 'circle(x, y, radius)', 'renderCircle()', 'plotCircle()'], correct: 1 },
                { q: 'What is flood fill algorithm used for in graphics lab experiments?', options: ['Line drawing', 'Filling a connected region with a specific color', 'Clipping lines', 'Text rendering'], correct: 1 },
                { q: 'Which header file is traditionally included for Turbo C graphics routines?', options: ['<graphics.h>', '<opengl.h>', '<draw.h>', '<canvas.h>'], correct: 0 }
            ]
        },
        {
            id: 8,
            subject: 'Full Stack Web Development-II Lab',
            code: 'CA329',
            type: 'LAB / PRACTICAL',
            title: 'Full Stack Web Development-II Practical',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Medium',
            color: '#4ade80',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'Which command initializes a new Node.js project creating package.json?', options: ['npm start', 'npm init -y', 'node init', 'npm create-app'], correct: 1 },
                { q: 'Which tool is used to test REST APIs during backend development?', options: ['Postman / Hoppscotch', 'VS Code Live Server', 'Git Bash', 'Webpack'], correct: 0 },
                { q: 'Which Mongoose method saves a document instance to MongoDB?', options: ['doc.save()', 'doc.insert()', 'doc.push()', 'doc.store()'], correct: 0 },
                { q: 'What does CORS stand for in web API development?', options: ['Cross-Origin Resource Sharing', 'Central Online Relay Service', 'Cross Open Request Standard', 'Client Origin Redirect System'], correct: 0 },
                { q: 'Which environment variable file is commonly used to store database URIs and JWT secrets securely?', options: ['package.json', '.env', 'config.xml', 'app.config.js'], correct: 1 }
            ]
        },
        {
            id: 9,
            subject: 'Mobile Application Development Lab',
            code: 'CA330',
            type: 'LAB / PRACTICAL',
            title: 'Mobile Application Development Practical',
            questions: 5,
            timeLimit: 5,
            difficulty: 'Easy',
            color: '#f093fb',
            attempted: false,
            score: 0,
            questionsList: [
                { q: 'Which XML attribute sets the unique identifier for a view widget in Android?', options: ['android:id', 'android:name', 'android:key', 'android:tag'], correct: 0 },
                { q: 'Which method handles click events on a Button in Android Activity?', options: ['setOnClickListener()', 'setOnTabListener()', 'setButtonAction()', 'onClickHandle()'], correct: 0 },
                { q: 'What is Toast in Android development?', options: ['A transient small pop-up notification message', 'A database model', 'A layout widget', 'A background service'], correct: 0 },
                { q: 'Which UI component displays a scrollable list of items efficiently in Android?', options: ['ScrollView', 'RecyclerView', 'TableLayout', 'AbsoluteLayout'], correct: 1 },
                { q: 'Which function is used to navigate to another Activity via Intent?', options: ['startActivity(intent)', 'openActivity(intent)', 'launchScreen(intent)', 'nextActivity(intent)'], correct: 0 }
            ]
        }
    ];

    const quizHistory = [
        { quiz: 'Computer Graphics Fundamentals', subject: 'Computer Graphics and Multimedia Application', code: 'CA301', score: '4/5', percent: 80, date: 'Aug 10, 2026', grade: 'A' },
        { quiz: 'Algorithm Analysis Fundamentals', subject: 'Algorithm Analysis and Design', code: 'CA324', score: '5/5', percent: 100, date: 'Aug 08, 2026', grade: 'O' },
        { quiz: 'Full Stack Web Development-II', subject: 'Full Stack Web Development-II', code: 'CA325', score: '4/5', percent: 80, date: 'Aug 05, 2026', grade: 'A' }
    ];

    const assignmentsData = [
        { id: 1, title: 'Computer Graphics Fundamentals', subject: 'Computer Graphics and Multimedia Application', code: 'CA301', deadline: '2026-08-18', status: 'pending', file: null },
        { id: 2, title: 'Multimedia Image Processing', subject: 'Computer Graphics and Multimedia Application', code: 'CA301', deadline: '2026-08-22', status: 'pending', file: null },
        { id: 3, title: 'Algorithm Complexity Analysis', subject: 'Algorithm Analysis and Design', code: 'CA324', deadline: '2026-08-16', status: 'pending', file: null },
        { id: 4, title: 'Sorting Algorithms Implementation', subject: 'Algorithm Analysis and Design', code: 'CA324', deadline: '2026-08-25', status: 'pending', file: null },
        { id: 5, title: 'React & API Integration', subject: 'Full Stack Web Development-II', code: 'CA325', deadline: '2026-08-20', status: 'pending', file: null },
        { id: 6, title: 'Responsive Full Stack Web Application', subject: 'Full Stack Web Development-II', code: 'CA325', deadline: '2026-08-28', status: 'pending', file: null },
        { id: 7, title: 'Mobile UI and Navigation', subject: 'Introduction to Mobile Application Development', code: 'CA326', deadline: '2026-08-19', status: 'pending', file: null },
        { id: 8, title: 'IoT Architecture and Applications', subject: 'Introduction to Internet of Things', code: 'CA327', deadline: '2026-08-23', status: 'pending', file: null },
        { id: 9, title: 'Career Planning and Professional Development', subject: 'Career Development Course', code: 'CG301', deadline: '2026-08-26', status: 'pending', file: null }
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
        if (pageId === 'results') {
            renderResults(1);
            renderGradeDistribution();
        }
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
        const todayIdx = today === 0 ? 5 : today - 1; // Map to Mon=0...Sat=5

        // Day tabs
        navContainer.innerHTML = dayNames.map((d, i) => 
            `<button class="day-tab ${i === todayIdx ? 'active' : ''}" data-day="${d}">${d}</button>`
        ).join('');

        const periodDefinitions = [
            { num: 1, name: '1st Period', time: '09:00 AM – 09:50 AM', timeLabel: '9:00 AM' },
            { num: 2, name: '2nd Period', time: '09:50 AM – 10:40 AM', timeLabel: '9:50 AM' },
            { num: 3, name: '3rd Period', time: '10:40 AM – 11:30 AM', timeLabel: '10:40 AM' },
            { num: 4, name: '4th Period', time: '11:30 AM – 12:20 PM', timeLabel: '11:30 AM' },
            { isBreak: true, name: 'LUNCH BREAK', time: '12:20 PM – 12:40 PM', timeLabel: '12:20 PM' },
            { num: 5, name: '5th Period', time: '12:40 PM – 01:30 PM', timeLabel: '12:40 PM' },
            { num: 6, name: '6th Period', time: '01:30 PM – 02:20 PM', timeLabel: '1:30 PM' },
            { num: 7, name: '7th Period', time: '02:20 PM – 03:10 PM', timeLabel: '2:20 PM' },
            { num: 8, name: '8th Period', time: '03:10 PM – 04:00 PM', timeLabel: '3:10 PM' }
        ];

        function showDay(day) {
            const slots = scheduleByDay[day] || [];
            let html = '<div class="schedule-header"></div>';
            html += '<div class="schedule-header">Schedule</div>';
            let skipPeriodsRemaining = 0;

            periodDefinitions.forEach((pd) => {
                if (pd.isBreak) {
                    html += `<div class="schedule-time">${pd.timeLabel}</div>`;
                    html += `
                        <div class="schedule-slot filled" style="border-left-color: var(--text-muted); opacity: 0.75;">
                            <div class="schedule-slot-subject">LUNCH BREAK</div>
                            <div class="schedule-slot-info">${pd.time}</div>
                        </div>
                    `;
                    return;
                }

                if (skipPeriodsRemaining > 0) {
                    skipPeriodsRemaining--;
                    html += `<div class="schedule-time">${pd.timeLabel}</div>`;
                    html += '<div class="schedule-slot"></div>';
                    return;
                }

                const match = slots.find(s => s.startPeriod === pd.num);

                html += `<div class="schedule-time">${pd.timeLabel}</div>`;

                if (match) {
                    const isLab = match.duration >= 2;
                    if (match.duration > 1) {
                        skipPeriodsRemaining = match.duration - 1;
                    }
                    const groupText = (isLab || match.type === 'Lab') ? 'Lab • Group 1' : 'Theory';
                    const subjectDisplay = `${match.code} - ${match.subject}`;

                    html += `
                        <div class="schedule-slot filled" style="border-left-color: ${match.color};">
                            <div class="schedule-slot-subject">${subjectDisplay}</div>
                            <div class="schedule-slot-info">${match.room} • ${match.prof} (${groupText})</div>
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

    function updateLiveTracker() {
        const liveBody = document.getElementById('liveClassBody');
        const nextBody = document.getElementById('nextClassBody');
        const liveCountdown = document.getElementById('liveCountdown');
        const nextCountdown = document.getElementById('nextCountdown');

        if (!liveBody || !nextBody) return;

        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayCode = days[now.getDay()];
        const todaySlots = scheduleByDay[dayCode] || [];

        const curMinutes = now.getHours() * 60 + now.getMinutes();

        function parseMinutes(timeStr) {
            const parts = timeStr.trim().split(' ');
            const [h, m] = parts[0].split(':').map(Number);
            let mins = (h % 12) * 60 + m;
            if (parts[1] && parts[1].toUpperCase() === 'PM') mins += 12 * 60;
            return mins;
        }

        let activeSlot = null;
        let nextSlot = null;

        for (const slot of todaySlots) {
            const timeParts = slot.time.split('–');
            if (timeParts.length === 2) {
                const startMins = parseMinutes(timeParts[0]);
                const endMins = parseMinutes(timeParts[1]);

                if (curMinutes >= startMins && curMinutes < endMins) {
                    activeSlot = { ...slot, endMins };
                } else if (curMinutes < startMins && !nextSlot) {
                    nextSlot = { ...slot, startMins };
                }
            }
        }

        if (activeSlot) {
            const minsLeft = activeSlot.endMins - curMinutes;
            if (liveCountdown) liveCountdown.textContent = `Ends in ${minsLeft} min`;
            liveBody.innerHTML = `
                <h4>${activeSlot.subject} (${activeSlot.code})</h4>
                <div class="status-meta">
                    <span><i class="fa-solid fa-chalkboard-user" style="color: var(--accent-1);"></i> ${activeSlot.prof}</span>
                    <span><i class="fa-solid fa-location-dot" style="color: var(--accent-2);"></i> ${activeSlot.room}</span>
                    <span><i class="fa-regular fa-clock" style="color: var(--text-muted);"></i> ${activeSlot.time}</span>
                </div>
            `;
        } else {
            if (liveCountdown) liveCountdown.textContent = 'No active session';
            liveBody.innerHTML = `
                <h4>No class currently in session</h4>
                <div class="status-meta">
                    <span><i class="fa-regular fa-calendar-check" style="color: var(--accent-1);"></i> Relax or review notes for your upcoming class</span>
                </div>
            `;
        }

        if (nextSlot) {
            const minsUntil = nextSlot.startMins - curMinutes;
            if (nextCountdown) nextCountdown.textContent = `Starts in ${minsUntil} min`;
            nextBody.innerHTML = `
                <h4>${nextSlot.subject} (${nextSlot.code})</h4>
                <div class="status-meta">
                    <span><i class="fa-solid fa-chalkboard-user" style="color: var(--accent-1);"></i> ${nextSlot.prof}</span>
                    <span><i class="fa-solid fa-location-dot" style="color: var(--accent-2);"></i> ${nextSlot.room}</span>
                    <span><i class="fa-regular fa-clock" style="color: var(--text-muted);"></i> ${nextSlot.time}</span>
                </div>
            `;
        } else if (todaySlots.length > 0) {
            const firstSlot = todaySlots[0];
            if (nextCountdown) nextCountdown.textContent = `Scheduled today`;
            nextBody.innerHTML = `
                <h4>${firstSlot.subject} (${firstSlot.code})</h4>
                <div class="status-meta">
                    <span><i class="fa-solid fa-chalkboard-user" style="color: var(--accent-1);"></i> ${firstSlot.prof}</span>
                    <span><i class="fa-solid fa-location-dot" style="color: var(--accent-2);"></i> ${firstSlot.room}</span>
                    <span><i class="fa-regular fa-clock" style="color: var(--text-muted);"></i> ${firstSlot.time}</span>
                </div>
            `;
        } else {
            if (nextCountdown) nextCountdown.textContent = 'No more classes today';
            nextBody.innerHTML = `
                <h4>All classes completed for today!</h4>
                <div class="status-meta">
                    <span><i class="fa-solid fa-check-double" style="color: #4ade80;"></i> Check tomorrow's schedule in the timetable grid above</span>
                </div>
            `;
        }
    }

    setInterval(updateLiveTracker, 30000);

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
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div class="class-card-code">${c.code}</div>
                                <span class="subject-type-badge ${c.type === 'Practical' ? 'badge-practical' : 'badge-theory'}">${c.type === 'Practical' ? 'Lab • Group 1' : 'Theory'}</span>
                            </div>
                            <button class="btn-edit-class" data-idx="${i}" title="Edit Course">
                                <i class="fa-solid fa-pen-nib"></i>
                            </button>
                        </div>
                        <div class="class-card-name">${c.name}</div>
                        <div class="class-card-meta">
                            <div class="class-card-meta-item"><i class="fa-solid fa-chalkboard-user"></i> ${c.prof}</div>
                            <div class="class-card-meta-item"><i class="fa-solid fa-location-dot"></i> ${c.room}</div>
                            <div class="class-card-meta-item"><i class="fa-regular fa-calendar-days"></i> ${c.days}</div>
                            <div class="class-card-meta-item"><i class="fa-regular fa-clock"></i> ${c.time}</div>
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
        // Calculate summary metrics dynamically from feeBreakdown source of truth
        const total = feeBreakdown.reduce((sum, f) => sum + f.amount, 0);
        const paid = feeBreakdown.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
        const pending = total - paid;
        const percent = Math.round((paid / total) * 1000) / 10;

        // Update fee overview UI elements
        const totalEl = document.querySelector('.fee-amount');
        const paidEl = document.querySelector('.paid-label');
        const pendingEl = document.querySelector('.pending-label');
        const fill = document.querySelector('.fee-progress-fill');

        if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
        if (paidEl) paidEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Paid: ₹${paid.toLocaleString()}`;
        if (pendingEl) pendingEl.innerHTML = `<i class="fa-regular fa-clock"></i> Pending: ₹${pending.toLocaleString()}`;
        if (fill) {
            fill.dataset.percent = percent;
            setTimeout(() => { fill.style.width = percent + '%'; }, 300);
        }

        // Fee breakdown table
        const fbody = document.getElementById('feeBreakdownBody');
        if (fbody) {
            fbody.innerHTML = feeBreakdown.map(f => {
                let badgeClass = 'badge-success';
                if (f.status === 'Pending') badgeClass = 'badge-warning';
                if (f.status === 'Overdue') badgeClass = 'badge-danger';
                return `
                    <tr>
                        <td>${f.component}</td>
                        <td>₹${f.amount.toLocaleString()}</td>
                        <td><span class="badge ${badgeClass}">${f.status}</span></td>
                    </tr>
                `;
            }).join('');
        }

        // Payment history table
        const phbody = document.getElementById('paymentHistoryBody');
        if (phbody) {
            phbody.innerHTML = paymentHistory.map(p => {
                let badgeClass = 'badge-success';
                if (p.status === 'Pending') badgeClass = 'badge-warning';
                if (p.status === 'Overdue') badgeClass = 'badge-danger';
                return `
                    <tr>
                        <td>${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td style="font-family: monospace; color: var(--accent-1);">${p.txnId}</td>
                        <td>${p.desc}</td>
                        <td>₹${p.amount.toLocaleString()}</td>
                        <td><span class="badge ${badgeClass}">${p.status}</span></td>
                    </tr>
                `;
            }).join('');
        }
    }

    // =============================================
    // RESULTS PAGE
    // =============================================

    function renderResults(sem) {
        const data = resultsData[sem];
        if (!data) return;

        const container = document.getElementById('semesterResults');

        if (sem === 5) {
            container.innerHTML = `
                <div style="padding: 30px; text-align: center; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-1); margin-bottom: 8px;">
                        <i class="fa-solid fa-book-open-reader"></i> Fifth Semester — Current Enrolled Semester
                    </div>
                    <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 16px; font-size: 0.9rem;">
                        Official Semester 5 examination marks are not published yet. 9 courses currently enrolled (27 Total Credits).
                    </p>
                    <div style="display: inline-flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center;">
                        <span class="badge badge-primary" style="font-size: 0.85rem; padding: 6px 14px;">Academic Status: In Progress</span>
                        <span class="badge badge-success" style="font-size: 0.85rem; padding: 6px 14px;">Total Enrolled Credits: 27</span>
                    </div>
                </div>
            `;
            document.querySelectorAll('.sem-tab').forEach(t => {
                t.classList.toggle('active', parseInt(t.dataset.sem) === sem);
            });
            return;
        }

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
                <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0;">${data.semesterName} (${data.academicYear})</h3>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Integral University, Lucknow • BCA</span>
                </div>
                <div class="badge badge-success" style="font-size: 0.85rem; padding: 4px 12px;"><i class="fa-solid fa-circle-check"></i> ${data.result}</div>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Course Title</th>
                            <th>ESE</th>
                            <th>CA</th>
                            <th>Total</th>
                            <th>Credit</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        data.subjects.forEach(s => {
            let gradeClass = 'grade-A';
            if (s.grade === 'O') gradeClass = 'grade-O';
            else if (s.grade.startsWith('B')) gradeClass = 'grade-B';
            else if (s.grade.startsWith('C')) gradeClass = 'grade-C';
            else if (s.grade.startsWith('D')) gradeClass = 'grade-D';

            html += `
                <tr>
                    <td style="font-family: monospace; color: var(--accent-1); font-weight: 600;">${s.code}</td>
                    <td>${s.name}</td>
                    <td>${s.ese}</td>
                    <td>${s.ca}</td>
                    <td><strong>${s.total}</strong></td>
                    <td>${s.credits}</td>
                    <td><span class="grade-badge ${gradeClass}">${s.grade}</span></td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 20px; padding: 16px; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">ESE Total</span><strong style="font-size: 0.95rem; color: var(--text-primary);">${data.eseTotal}</strong></div>
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">CA Total</span><strong style="font-size: 0.95rem; color: var(--text-primary);">${data.caTotal}</strong></div>
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Overall Marks</span><strong style="font-size: 0.95rem; color: var(--text-primary);">${data.overallTotal}</strong></div>
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Semester Credits</span><strong style="font-size: 0.95rem; color: var(--text-primary);">${data.totalCredits} Credits</strong></div>
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Semester SGPA</span><strong style="font-size: 1.1rem; color: var(--accent-1);">${data.sgpa.toFixed(2)} / 10.00</strong></div>
                <div><span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Cumulative CGPA</span><strong style="font-size: 1.1rem; color: var(--accent-5);">${data.cgpa.toFixed(2)} / 10.00</strong></div>
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

    // SGPA & CGPA progression chart (10.00 scale)
    function renderGradeDistribution() {
        const container = document.getElementById('gradeDistribution');
        if (!container) return;

        const semData = [
            { sem: 'Sem 1', sgpa: 8.12, cgpa: 8.12, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { sem: 'Sem 2', sgpa: 8.20, cgpa: 8.16, color: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
            { sem: 'Sem 3', sgpa: 8.36, cgpa: 8.23, color: 'linear-gradient(135deg, #4ade80, #22c55e)' },
            { sem: 'Sem 4', sgpa: 7.92, cgpa: 8.15, color: 'linear-gradient(135deg, #f093fb, #f5576c)' }
        ];

        let html = `
            <div class="grade-dist-grid" style="height: 180px; display: flex; align-items: flex-end; justify-content: space-around; padding: 25px 10px 10px; gap: 15px;">
                ${semData.map(d => {
                    const heightPercent = Math.max(15, (d.sgpa / 10.0) * 100);
                    return `
                        <div class="grade-bar-wrapper" style="flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; position: relative;">
                            <div class="grade-bar" style="width: 100%; max-width: 55px; height: 0%; min-height: 4px; background: ${d.color}; border-radius: 8px 8px 0 0; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1); position: relative; box-shadow: 0 0 15px rgba(102, 126, 234, 0.25);" data-height="${heightPercent}%">
                                <span class="grade-bar-count" style="position: absolute; top: -24px; left: 50%; transform: translateX(-50%); font-size: 0.78rem; font-weight: 700; color: var(--text-primary); white-space: nowrap;">${d.sgpa.toFixed(2)}</span>
                            </div>
                            <span class="grade-bar-label" style="font-size: 0.8rem; font-weight: 700; margin-top: 8px; color: var(--text-primary);">${d.sem}</span>
                            <span style="font-size: 0.68rem; color: var(--text-muted); font-weight: 500;">CGPA ${d.cgpa.toFixed(2)}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-color); font-size: 0.78rem; color: var(--text-secondary);">
                <span><i class="fa-solid fa-chart-line" style="color:var(--accent-1);"></i> Scale: <strong>10.00 Max CGPA</strong></span>
                <span>Overall CGPA: <strong style="color:var(--accent-1); font-size:0.9rem;">8.15 / 10.00</strong></span>
            </div>
        `;
        container.innerHTML = html;

        setTimeout(() => {
            container.querySelectorAll('.grade-bar').forEach(bar => {
                bar.style.height = bar.dataset.height;
            });
        }, 100);
    }

    // =============================================
    // PYQ PAGE
    // =============================================

    function renderPYQ() {
        // Populate subject dropdown with all 32 subjects grouped by semester
        const subjectSelect = document.getElementById('pyqSubjectSelect');
        if (subjectSelect) {
            let options = `<option value="all">All Subjects (32)</option>`;
            for (let sem = 1; sem <= 4; sem++) {
                const semSubjects = pyqData.filter(p => p.sem === sem);
                const uniqueSubjects = [...new Map(semSubjects.map(item => [item.code, item])).values()];
                options += `<optgroup label="Semester ${sem}">`;
                uniqueSubjects.forEach(s => {
                    options += `<option value="${s.subject}">[${s.code}] ${s.subject}</option>`;
                });
                options += `</optgroup>`;
            }
            subjectSelect.innerHTML = options;
        }

        // Calculate and update dynamic stat counters
        const totalPapers = pyqData.filter(p => p.hasFile).length;
        const uniqueSubjectsCovered = new Set(pyqData.filter(p => p.hasFile).map(p => p.code)).size;
        const totalDownloads = pyqData.reduce((acc, p) => acc + (p.downloads || 0), 0);
        const popularCount = pyqData.filter(p => p.popular).length;

        const elTotal = document.getElementById('pyqStatTotalPapers');
        const elSub = document.getElementById('pyqStatSubjects');
        const elDl = document.getElementById('pyqStatDownloads');
        const elPop = document.getElementById('pyqStatPopular');

        if (elTotal) { elTotal.dataset.target = totalPapers; elTotal.textContent = totalPapers; }
        if (elSub) { elSub.dataset.target = uniqueSubjectsCovered; elSub.textContent = uniqueSubjectsCovered; }
        if (elDl) { elDl.dataset.target = totalDownloads; elDl.textContent = totalDownloads; }
        if (elPop) { elPop.dataset.target = popularCount; elPop.textContent = popularCount; }

        applyPYQFilters();

        // Semester pills handler
        const semPillsContainer = document.getElementById('pyqSemesterPills');
        if (semPillsContainer) {
            semPillsContainer.addEventListener('click', e => {
                const pill = e.target.closest('.filter-pill');
                if (pill) {
                    semPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                    applyPYQFilters();
                }
            });
        }

        // Search & Filter event listeners
        const searchInput = document.getElementById('pyqSearchInput');
        const yearFilter = document.getElementById('pyqYearFilter');
        const examFilter = document.getElementById('pyqExamFilter');

        if (searchInput) searchInput.addEventListener('input', applyPYQFilters);
        if (subjectSelect) subjectSelect.addEventListener('change', applyPYQFilters);
        if (yearFilter) yearFilter.addEventListener('change', applyPYQFilters);
        if (examFilter) examFilter.addEventListener('change', applyPYQFilters);
    }

    function applyPYQFilters() {
        const activeSem = document.querySelector('#pyqSemesterPills .filter-pill.active')?.dataset.sem || 'all';
        const searchVal = (document.getElementById('pyqSearchInput')?.value || '').trim().toLowerCase();
        const subjectVal = document.getElementById('pyqSubjectSelect')?.value || 'all';
        const yearVal = document.getElementById('pyqYearFilter')?.value || 'all';
        const examVal = document.getElementById('pyqExamFilter')?.value || 'all';

        let filtered = pyqData.filter(p => {
            if (activeSem !== 'all' && p.sem !== parseInt(activeSem)) return false;
            if (yearVal !== 'all' && p.year !== yearVal) return false;
            if (examVal !== 'all' && p.examType !== examVal) return false;
            if (subjectVal !== 'all' && p.subject !== subjectVal) return false;

            if (searchVal) {
                const matchCode = p.code.toLowerCase().includes(searchVal);
                const matchName = p.subject.toLowerCase().includes(searchVal);
                const matchSem = `semester ${p.sem}`.includes(searchVal) || `sem ${p.sem}`.includes(searchVal);
                if (!matchCode && !matchName && !matchSem) return false;
            }
            return true;
        });

        const grid = document.getElementById('pyqGrid');
        if (!grid) return;

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="card" style="grid-column: 1/-1; text-align:center; padding: 3rem; background: var(--bg-glass);">
                    <p style="color: var(--text-muted); font-size: 0.95rem;">
                        <i class="fa-solid fa-folder-open" style="font-size:2.2rem; display:block; margin-bottom:1rem; color: var(--accent-1);"></i>
                        No question papers found matching your criteria.
                    </p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map((p, i) => {
            const isLab = p.type.includes('Lab');
            const typeBadgeClass = isLab ? 'badge-practical' : 'badge-theory';

            return `
                <div class="pyq-card" style="animation-delay: ${i * 0.05}s;">
                    <div class="pyq-card-header">
                        <div>
                            <span class="badge ${typeBadgeClass}" style="margin-bottom: 6px;">${p.type}</span>
                            <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${p.subject}</h3>
                        </div>
                    </div>
                    <div class="pyq-card-meta" style="margin-top: 10px; gap: 10px;">
                        <span><i class="fa-solid fa-hashtag" style="color:var(--accent-1);"></i> <strong>${p.code}</strong></span>
                        <span><i class="fa-solid fa-layer-group" style="color:var(--accent-2);"></i> Semester ${p.sem} (${p.year})</span>
                        <span><i class="fa-solid fa-file-lines" style="color:var(--accent-5);"></i> ${p.examType}</span>
                    </div>
                    <div class="pyq-card-footer" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-color);">
                        ${p.hasFile ? `
                            <div style="display: flex; gap: 8px; width: 100%; align-items: center; justify-content: space-between;">
                                <div style="display: flex; gap: 8px;">
                                    <button class="pyq-download-btn" onclick="alert('Viewing ${p.code} ${p.examType} Question Paper (Demo)')" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;">
                                        <i class="fa-solid fa-eye"></i> View
                                    </button>
                                    <button class="pyq-download-btn" onclick="alert('Downloading ${p.code}_${p.examType.replace(/\\s/g,'_')}_${p.year.replace('–','_')}.pdf')" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; background: var(--gradient-primary);">
                                        <i class="fa-solid fa-download"></i> PDF
                                    </button>
                                </div>
                                <span class="pyq-download-count" style="font-size: 0.78rem;"><i class="fa-solid fa-arrow-down"></i> ${p.downloads}</span>
                            </div>
                        ` : `
                            <div style="width: 100%; text-align: center;">
                                <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted); padding: 6px 12px; font-size: 0.78rem;">
                                    <i class="fa-solid fa-clock"></i> PYQ not available yet
                                </span>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
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

        // Dynamic statistics calculation
        const availableCount = quizzesData.length;
        const completedQuizzes = quizzesData.filter(q => q.attempted);
        const completedCount = completedQuizzes.length;
        const pendingCount = availableCount - completedCount;

        let avgScorePercent = 0;
        if (completedCount > 0) {
            const totalPercent = completedQuizzes.reduce((sum, q) => sum + Math.round((q.score / q.questionsList.length) * 100), 0);
            avgScorePercent = Math.round(totalPercent / completedCount);
        }

        const elAvailable = document.getElementById('quizStatAvailable');
        const elCompleted = document.getElementById('quizStatCompleted');
        const elAvgScore = document.getElementById('quizStatAvgScore');
        const elPending = document.getElementById('quizStatPending');

        if (elAvailable) { elAvailable.dataset.target = availableCount; elAvailable.textContent = availableCount; }
        if (elCompleted) { elCompleted.dataset.target = completedCount; elCompleted.textContent = completedCount; }
        if (elAvgScore) { elAvgScore.dataset.target = avgScorePercent; elAvgScore.textContent = avgScorePercent; }
        if (elPending) { elPending.dataset.target = pendingCount; elPending.textContent = pendingCount; }

        if (quizGrid) {
            quizGrid.innerHTML = quizzesData.map((q, i) => {
                const isLab = q.type.includes('LAB');
                const typeBadgeClass = isLab ? 'badge-practical' : 'badge-theory';
                const codeBadgeText = isLab ? `${q.code} • Sem 5 • Lab` : `${q.code} • Sem 5`;

                return `
                    <div class="quiz-card" style="animation-delay: ${i * 0.08}s;">
                        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(135deg, ${q.color}, ${q.color}88);"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span class="badge ${typeBadgeClass}">${isLab ? 'Lab' : 'Theory'}</span>
                            <span class="badge badge-primary" style="font-size: 0.75rem; font-weight: 600;">${codeBadgeText}</span>
                        </div>
                        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px; line-height: 1.35;">${q.title}</h3>
                        <div class="quiz-card-meta" style="margin-bottom: 14px;">
                            <span><i class="fa-solid fa-circle-question" style="color: var(--accent-1);"></i> ${q.questions} Questions</span>
                            <span><i class="fa-regular fa-clock" style="color: var(--accent-2);"></i> ${q.timeLimit} min</span>
                        </div>
                        <div class="quiz-card-footer" style="padding-top: 12px; border-top: 1px solid var(--border-color);">
                            <span class="difficulty-badge difficulty-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                            <button class="quiz-start-btn" data-quiz-id="${q.id}">
                                ${q.attempted ? '<i class="fa-solid fa-rotate-right"></i> Retake' : '<i class="fa-solid fa-play"></i> Start'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Attach start quiz listeners
            quizGrid.querySelectorAll('.quiz-start-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const quizId = parseInt(btn.dataset.quizId);
                    startQuiz(quizId);
                });
            });
        }

        if (historyBody) {
            if (quizHistory.length === 0) {
                historyBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 1.5rem; display:block; margin-bottom: 0.5rem;"></i>No quiz attempts yet.</td></tr>`;
            } else {
                historyBody.innerHTML = quizHistory.map(h => {
                    let gradeClass = 'grade-A';
                    if (h.grade === 'O') gradeClass = 'grade-O';
                    else if (h.grade.startsWith('B')) gradeClass = 'grade-B';
                    else if (h.grade.startsWith('C')) gradeClass = 'grade-C';
                    else if (h.grade.startsWith('D')) gradeClass = 'grade-D';

                    return `<tr>
                        <td><strong style="color: var(--text-primary);">${h.quiz}</strong></td>
                        <td>${h.subject}</td>
                        <td><span class="badge badge-primary">${h.code}</span></td>
                        <td>${h.score} (${h.percent}%)</td>
                        <td>${h.date}</td>
                        <td><span class="grade-badge ${gradeClass}">${h.grade}</span></td>
                    </tr>`;
                }).join('');
            }
        }
    }

    function startQuiz(quizId) {
        currentQuiz = quizzesData.find(q => q.id === quizId);
        if (!currentQuiz) return;

        currentQuestionIdx = 0;
        userAnswers = new Array(currentQuiz.questionsList.length).fill(-1);
        quizTimeRemaining = currentQuiz.timeLimit * 60;

        const modal = document.getElementById('quizModal');
        document.getElementById('quizModalTitle').textContent = `[${currentQuiz.code}] ${currentQuiz.title}`;
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
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;

        const timerContainer = document.querySelector('.quiz-timer');
        if (timerContainer) {
            if (quizTimeRemaining <= 60) {
                timerContainer.classList.add('warning');
            } else {
                timerContainer.classList.remove('warning');
            }
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

        // Calculate Grade
        let grade = 'D';
        if (percent >= 90) grade = 'O';
        else if (percent >= 80) grade = 'A';
        else if (percent >= 70) grade = 'B';
        else if (percent >= 60) grade = 'C';

        // Add or update attempt history record
        const existingIdx = quizHistory.findIndex(h => h.code === currentQuiz.code);
        const newRecord = {
            quiz: currentQuiz.title,
            subject: currentQuiz.subject,
            code: currentQuiz.code,
            score: `${score}/${total}`,
            percent: percent,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            grade: grade
        };

        if (existingIdx !== -1) {
            quizHistory[existingIdx] = newRecord;
        } else {
            quizHistory.unshift(newRecord);
        }

        // Re-render Quiz page stats & cards
        renderQuiz();

        // Show result modal
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

        // Calculate dynamic stats
        const totalCount = assignmentsData.length;
        const submittedCount = assignmentsData.filter(a => a.status === 'submitted').length;
        const pendingCount = assignmentsData.filter(a => a.status === 'pending').length;
        const lateCount = assignmentsData.filter(a => a.status === 'late').length;

        const elTotal = document.getElementById('assignStatTotal');
        const elSubmitted = document.getElementById('assignStatSubmitted');
        const elPending = document.getElementById('assignStatPending');
        const elLate = document.getElementById('assignStatLate');

        if (elTotal) { elTotal.dataset.target = totalCount; elTotal.textContent = totalCount; }
        if (elSubmitted) { elSubmitted.dataset.target = submittedCount; elSubmitted.textContent = submittedCount; }
        if (elPending) { elPending.dataset.target = pendingCount; elPending.textContent = pendingCount; }
        if (elLate) { elLate.dataset.target = lateCount; elLate.textContent = lateCount; }

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
                    <td>${a.subject}<br><span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${a.code}</span></td>
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
                btn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay ₹2,450.00';
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

    // Global Keyboard Shortcut (Ctrl+K or Cmd+K) for Global Search
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
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
