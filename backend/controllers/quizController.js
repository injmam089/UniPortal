const db = require('../config/db');

exports.getQuizzes = (req, res) => {
    const studentId = req.user?.studentId || 1;

    const quizzes = db.queryAll('SELECT * FROM quizzes');
    const history = db.queryAll(
        'SELECT * FROM quiz_history WHERE student_id = ? ORDER BY id DESC',
        [studentId]
    );

    const formattedQuizzes = quizzes.map(q => ({
        id: q.id,
        subject: q.subject,
        title: q.title,
        questions: q.questions_count,
        timeLimit: q.time_limit,
        difficulty: q.difficulty,
        color: q.color,
        attempted: Boolean(q.attempted),
        score: q.score,
        questionsList: JSON.parse(q.questions_json || '[]')
    }));

    const formattedHistory = history.map(h => ({
        quiz: h.quiz_title,
        subject: h.subject,
        score: h.score,
        percent: h.percentage,
        grade: h.grade,
        date: h.attempt_date
    }));

    res.json({
        success: true,
        quizzes: formattedQuizzes,
        history: formattedHistory
    });
};

exports.submitQuiz = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const quizId = parseInt(req.params.id);
    const { answers } = req.body; // Array of chosen indices [0, 2, 1, ...]

    const quiz = db.queryOne('SELECT * FROM quizzes WHERE id = ?', [quizId]);
    if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz not found.' });
    }

    const questions = JSON.parse(quiz.questions_json || '[]');
    let score = 0;

    questions.forEach((q, idx) => {
        if (answers && answers[idx] === q.correct) {
            score++;
        }
    });

    const percent = Math.round((score / questions.length) * 100);
    let grade = 'C';
    if (percent >= 90) grade = 'A+';
    else if (percent >= 80) grade = 'A';
    else if (percent >= 70) grade = 'B+';
    else if (percent >= 60) grade = 'B';

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Update quiz status
    db.run('UPDATE quizzes SET attempted = 1, score = ? WHERE id = ?', [score, quizId]);

    // Insert history record
    db.run(
        `INSERT INTO quiz_history (student_id, quiz_title, subject, score, percentage, grade, attempt_date)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [studentId, quiz.title, quiz.subject, `${score}/${questions.length}`, percent, grade, today]
    );

    // Log activity
    const student = db.queryOne('SELECT user_id FROM students WHERE id = ?', [studentId]);
    if (student) {
        db.run(
            `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#00d2ff')`,
            [student.user_id, `Completed "${quiz.title}" with score ${score}/${questions.length} (${grade})`]
        );
    }

    res.json({
        success: true,
        message: 'Quiz submitted successfully',
        score,
        total: questions.length,
        percentage: percent,
        grade
    });
};
