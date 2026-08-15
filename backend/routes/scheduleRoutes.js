const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/', scheduleController.getSchedule);
router.get('/today', scheduleController.getTodaysClasses);

module.exports = router;
