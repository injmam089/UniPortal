const db = require('../config/db');

exports.getAssignments = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const assignments = db.queryAll('SELECT * FROM assignments WHERE student_id = ? ORDER BY deadline ASC', [studentId]);

    res.json({
        success: true,
        assignments: assignments.map(a => ({
            id: a.id,
            title: a.title,
            subject: a.subject,
            code: a.code,
            deadline: a.deadline,
            status: a.status,
            file: a.file_name,
            submittedAt: a.submission_date
        }))
    });
};

exports.submitAssignment = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const assignmentId = parseInt(req.params.id);
    const { fileName = 'Assignment_Submission.pdf' } = req.body;

    const assignment = db.queryOne('SELECT * FROM assignments WHERE id = ? AND student_id = ?', [assignmentId, studentId]);
    if (!assignment) {
        return res.status(404).json({ success: false, message: 'Assignment not found.' });
    }

    const today = new Date().toISOString().split('T')[0];

    db.run(
        `UPDATE assignments SET status = 'submitted', file_name = ?, submission_date = ? WHERE id = ?`,
        [fileName, today, assignmentId]
    );

    // Log activity
    const student = db.queryOne('SELECT user_id FROM students WHERE id = ?', [studentId]);
    if (student) {
        db.run(
            `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#4ade80')`,
            [student.user_id, `Submitted assignment "${assignment.title}"`]
        );
    }

    res.json({
        success: true,
        message: 'Assignment submitted successfully',
        assignment: {
            id: assignment.id,
            title: assignment.title,
            status: 'submitted',
            file: fileName,
            submittedAt: today
        }
    });
};
