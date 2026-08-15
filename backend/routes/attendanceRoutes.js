const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, attendanceController.getAttendance);
router.post('/mark', optionalAuth, attendanceController.updateAttendance);

module.exports = router;
