const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, assignmentController.getAssignments);
router.post('/:id/submit', optionalAuth, assignmentController.submitAssignment);

module.exports = router;
