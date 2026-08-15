const db = require('../config/db');

exports.getProfile = (req, res) => {
    // Default to the first student record if not authenticated or specified
    const studentId = req.user?.studentId || 1;
    const student = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]) || db.queryOne('SELECT * FROM students LIMIT 1');

    if (!student) {
        return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    const user = db.queryOne('SELECT email, username, role FROM users WHERE id = ?', [student.user_id]);

    res.json({
        success: true,
        student: {
            ...student,
            email: user ? user.email : 'injmamah@student.iul.ac.in'
        }
    });
};

exports.updateProfile = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const { phone, dob, gender, address } = req.body;

    db.run(
        `UPDATE students 
         SET phone = COALESCE(?, phone),
             dob = COALESCE(?, dob),
             gender = COALESCE(?, gender),
             address = COALESCE(?, address)
         WHERE id = ?`,
        [phone, dob, gender, address, studentId]
    );

    const updated = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]);

    // Log activity
    db.run(
        `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#f093fb')`,
        [updated.user_id, 'Updated personal contact and address details']
    );

    res.json({
        success: true,
        message: 'Profile updated successfully',
        student: updated
    });
};

exports.updateGroup = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const { group_id } = req.body;

    if (!group_id) {
        return res.status(400).json({ success: false, message: 'Group ID is required.' });
    }

    db.run('UPDATE students SET group_id = ? WHERE id = ?', [group_id, studentId]);
    const updated = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]);

    // Log activity
    db.run(
        `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#667eea')`,
        [updated.user_id, `Changed practical lab batch to ${group_id}`]
    );

    res.json({
        success: true,
        message: `Lab group updated to ${group_id}`,
        group_id: updated.group_id
    });
};
