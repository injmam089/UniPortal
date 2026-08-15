const db = require('../config/db');

exports.getSemesterResults = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const semester = parseInt(req.params.semester) || 1;

    const gpaInfo = db.queryOne(
        'SELECT sgpa, credits_earned FROM semester_gpa WHERE student_id = ? AND semester = ?',
        [studentId, semester]
    );

    const subjects = db.queryAll(
        'SELECT code, name, credits, ese_marks as ese, ca_marks as ca, total_marks as total, grade, grade_points as points FROM results WHERE student_id = ? AND semester = ?',
        [studentId, semester]
    );

    if (!subjects || subjects.length === 0) {
        return res.status(404).json({ success: false, message: `No results found for semester ${semester}.` });
    }

    res.json({
        success: true,
        semester,
        gpa: gpaInfo ? gpaInfo.sgpa : 8.15,
        creditsEarned: gpaInfo ? gpaInfo.credits_earned : 24,
        subjects
    });
};

exports.getAllResults = (req, res) => {
    const studentId = req.user?.studentId || 1;

    const allGpa = db.queryAll('SELECT semester, sgpa FROM semester_gpa WHERE student_id = ?', [studentId]);
    const allSubjects = db.queryAll(
        'SELECT semester, code, name, credits, ese_marks as ese, ca_marks as ca, total_marks as total, grade, grade_points as points FROM results WHERE student_id = ?',
        [studentId]
    );

    const resultsData = {};
    for (let i = 1; i <= 5; i++) {
        const semGpa = allGpa.find(g => g.semester === i);
        const semSubjs = allSubjects.filter(s => s.semester === i);
        if (semSubjs.length > 0) {
            resultsData[i] = {
                gpa: semGpa ? semGpa.sgpa : 8.15,
                subjects: semSubjs
            };
        }
    }

    res.json({
        success: true,
        resultsData
    });
};
