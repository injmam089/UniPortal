const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getProfile = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const student = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]) || db.queryOne('SELECT * FROM students LIMIT 1');

    if (!student) {
        return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    const user = db.queryOne('SELECT id, email, username, role, created_at FROM users WHERE id = ?', [student.user_id]);

    // Fetch official documents
    const documents = db.queryAll('SELECT * FROM student_documents WHERE student_id = ? ORDER BY id ASC', [student.id]);

    // Fetch semester SGPA history
    const semesterGpa = db.queryAll('SELECT * FROM semester_gpa WHERE student_id = ? ORDER BY semester ASC', [student.id]);

    // Fetch recent activity audit
    const activities = db.queryAll('SELECT * FROM activity_logs WHERE user_id = ? ORDER BY id DESC LIMIT 6', [student.user_id]);

    // Compute profile completion percentage
    const completionFields = [
        student.full_name,
        user?.email,
        student.phone,
        student.dob,
        student.gender,
        student.address,
        student.permanent_address,
        student.emergency_name,
        student.emergency_phone,
        student.blood_group
    ];
    const filledCount = completionFields.filter(f => Boolean(f && f.toString().trim().length > 0)).length;
    const completionPercentage = Math.round((filledCount / completionFields.length) * 100);

    // Calculate academic stats
    const totalCredits = semesterGpa.reduce((acc, curr) => acc + (curr.credits_earned || 0), 0);
    const requiredCredits = 144;
    const creditsRemaining = Math.max(0, requiredCredits - totalCredits);

    res.json({
        success: true,
        student: {
            ...student,
            email: user ? user.email : 'injmamah@student.iul.ac.in',
            username: user ? user.username : 'student1'
        },
        academic: {
            program: student.program || 'Bachelor of Computer Application (BCA)',
            department: student.department || 'Department of Computer Application',
            faculty: student.faculty || 'Faculty of Computer Applications',
            university: student.university || 'Integral University, Lucknow',
            semester: student.semester || '5th Semester',
            section: student.section || 'Section A',
            group: student.group_id || 'Group 1',
            session: student.academic_session || '2024–2027 (Current: 2026–27)',
            status: student.academic_status || 'Active Student • Regular',
            cgpa: student.cgpa || 8.15,
            standing: (student.cgpa || 8.15) >= 8.0 ? 'First Class with Distinction' : 'First Class',
            totalCredits,
            requiredCredits,
            creditsRemaining,
            advisor: student.advisor || 'Dr. Arshiya Dilshad',
            semesterGpa
        },
        documents,
        activities,
        completion: {
            percentage: completionPercentage,
            verifiedItems: ['Student Identity', 'Academic Enrollment', 'Hostel Residence', 'University Email'],
            pendingItems: ['Physical Document Verification', 'Emergency Contact Verification']
        },
        security: {
            lastLogin: 'August 16, 2026 • 12:45 PM',
            twoFactor: 'Enabled (University SSO)',
            emailVerified: true,
            activeSessions: [
                { device: 'Desktop Chrome (Windows 11)', ip: '127.0.0.1 (Current Session)', active: true }
            ]
        }
    });
};

exports.updateProfile = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const {
        phone,
        dob,
        gender,
        blood_group,
        address,
        permanent_address,
        city,
        state,
        pincode,
        emergency_name,
        emergency_relation,
        emergency_phone
    } = req.body;

    // Validate phone if provided
    if (phone && phone.trim().length < 8) {
        return res.status(400).json({ success: false, message: 'Please enter a valid phone number.' });
    }

    db.run(
        `UPDATE students 
         SET phone = COALESCE(?, phone),
             dob = COALESCE(?, dob),
             gender = COALESCE(?, gender),
             blood_group = COALESCE(?, blood_group),
             address = COALESCE(?, address),
             permanent_address = COALESCE(?, permanent_address),
             city = COALESCE(?, city),
             state = COALESCE(?, state),
             pincode = COALESCE(?, pincode),
             emergency_name = COALESCE(?, emergency_name),
             emergency_relation = COALESCE(?, emergency_relation),
             emergency_phone = COALESCE(?, emergency_phone)
         WHERE id = ?`,
        [
            phone ?? null,
            dob ?? null,
            gender ?? null,
            blood_group ?? null,
            address ?? null,
            permanent_address ?? null,
            city ?? null,
            state ?? null,
            pincode ?? null,
            emergency_name ?? null,
            emergency_relation ?? null,
            emergency_phone ?? null,
            studentId
        ]
    );

    const updated = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]);

    // Log activity
    db.run(
        `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#38bdf8')`,
        [updated.user_id, 'Updated personal contact and emergency details in University SIS']
    );

    res.json({
        success: true,
        message: 'Profile records successfully updated in University Database',
        student: updated
    });
};

exports.getDocuments = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const documents = db.queryAll('SELECT * FROM student_documents WHERE student_id = ? ORDER BY id ASC', [studentId]);
    res.json({
        success: true,
        documents
    });
};

exports.getAcademicRecord = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const student = db.queryOne('SELECT * FROM students WHERE id = ?', [studentId]);
    const semesterGpa = db.queryAll('SELECT * FROM semester_gpa WHERE student_id = ? ORDER BY semester ASC', [studentId]);
    const courses = db.queryAll('SELECT * FROM courses ORDER BY id ASC');

    res.json({
        success: true,
        cgpa: student ? student.cgpa : 8.15,
        semesterGpa,
        courses
    });
};

exports.changePassword = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const student = db.queryOne('SELECT user_id FROM students WHERE id = ?', [studentId]);
    if (!student) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = db.queryOne('SELECT * FROM users WHERE id = ?', [student.user_id]);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    // Verify current password if provided
    if (currentPassword) {
        const isMatch = bcrypt.compareSync(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password does not match.' });
        }
    }

    const newHash = bcrypt.hashSync(newPassword, 10);
    db.run('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, user.id]);

    // Log activity
    db.run(
        `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#10b981')`,
        [user.id, 'Changed account security credentials / password']
    );

    res.json({
        success: true,
        message: 'Password successfully changed.'
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
