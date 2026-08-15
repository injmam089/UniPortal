const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    const user = db.queryOne('SELECT * FROM users WHERE username = ?', [username.trim()]);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
    }

    const student = db.queryOne('SELECT * FROM students WHERE user_id = ?', [user.id]);

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, studentId: student ? student.id : null },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email
        },
        student: student || null
    });
};

exports.getMe = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const user = db.queryOne('SELECT id, username, role, email, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const student = db.queryOne('SELECT * FROM students WHERE user_id = ?', [user.id]);

    res.json({
        success: true,
        user,
        student: student || null
    });
};
