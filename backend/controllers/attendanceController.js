const db = require('../config/db');

exports.getAttendance = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const records = db.queryAll('SELECT * FROM attendance WHERE student_id = ?', [studentId]);

    const totalPresent = records.reduce((sum, r) => sum + r.present_count, 0);
    const totalClasses = records.reduce((sum, r) => sum + r.total_count, 0);
    const overallPercentage = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

    res.json({
        success: true,
        overallPercentage,
        totalPresent,
        totalClasses,
        records: records.map(r => ({
            subject: r.subject,
            code: r.code,
            percent: Math.round(r.percentage),
            present: r.present_count,
            total: r.total_count
        }))
    });
};

exports.updateAttendance = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const { code, isPresent } = req.body;

    const record = db.queryOne('SELECT * FROM attendance WHERE student_id = ? AND code = ?', [studentId, code]);
    if (!record) {
        return res.status(404).json({ success: false, message: 'Attendance record not found.' });
    }

    const newPresent = isPresent ? record.present_count + 1 : record.present_count;
    const newTotal = record.total_count + 1;
    const newPercent = (newPresent / newTotal) * 100;

    db.run(
        'UPDATE attendance SET present_count = ?, total_count = ?, percentage = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newPresent, newTotal, newPercent, record.id]
    );

    res.json({
        success: true,
        message: 'Attendance recorded successfully',
        record: {
            subject: record.subject,
            code: record.code,
            percent: Math.round(newPercent),
            present: newPresent,
            total: newTotal
        }
    });
};
