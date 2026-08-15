const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, dashboardController.getDashboardData);

module.exports = router;
