const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');

// Initialize database & seed tables
db.init();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/results', require('./routes/resultsRoutes'));
app.use('/api/fees', require('./routes/feesRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/pyq', require('./routes/pyqRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'UniPortal Student Management System API',
        timestamp: new Date().toISOString(),
        database: 'SQLite (Active & Seeded)'
    });
});

// Serve frontend static assets from root workspace
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// Fallback to index.html for SPA-style routing
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 UniPortal Full-Stack Server running!`);
    console.log(`🌐 Application URL : http://localhost:${PORT}`);
    console.log(`📡 API Endpoints   : http://localhost:${PORT}/api/health`);
    console.log(`📦 Database Engine : SQLite (database.sqlite)`);
    console.log(`====================================================`);
});

module.exports = { app, server };
