const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, resultsController.getAllResults);
router.get('/:semester', optionalAuth, resultsController.getSemesterResults);

module.exports = router;
