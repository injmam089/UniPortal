const db = require('../config/db');

exports.getDashboardData = (req, res) => {
    const studentId = req.user?.studentId || 1;

    const student = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]) || db.queryOne('SELECT * FROM students LIMIT 1');
    const coursesCount = db.queryOne('SELECT COUNT(*) as count FROM courses');
    
    // Attendance
    const attendances = db.queryAll('SELECT present_count, total_count FROM attendance WHERE student_id = ?', [student.id]);
    const totalPresent = attendances.reduce((s, a) => s + a.present_count, 0);
    const totalClasses = attendances.reduce((s, a) => s + a.total_count, 0);
    const overallAttendance = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 87;

    // Fees
    const fees = db.queryAll('SELECT amount, status FROM fees WHERE student_id = ?', [student.id]);
    const pendingFees = fees.filter(f => f.status !== 'Paid').reduce((s, f) => s + f.amount, 0);

    // Notifications & Activities
    const notifications = db.queryAll('SELECT * FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 5', [student.user_id]);
    const activities = db.queryAll('SELECT * FROM activity_logs WHERE user_id = ? ORDER BY id DESC LIMIT 6', [student.user_id]);

    res.json({
        success: true,
        stats: {
            attendance: overallAttendance,
            cgpa: student.cgpa,
            coursesCount: coursesCount.count,
            pendingFees: pendingFees
        },
        student: {
            name: student.full_name,
            studentId: student.student_id,
            program: student.program,
            semester: student.semester,
            group: student.group_id
        },
        notifications: notifications.map(n => ({
            icon: n.icon,
            bg: n.bg_gradient,
            text: n.text,
            time: n.time_ago,
            unread: !n.is_read
        })),
        recentActivity: activities.map(a => ({
            text: a.text,
            time: a.time_text,
            color: a.color
        }))
    });
};
