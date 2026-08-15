const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, quizController.getQuizzes);
router.post('/:id/submit', optionalAuth, quizController.submitQuiz);

module.exports = router;
