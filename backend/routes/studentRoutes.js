const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/profile', optionalAuth, studentController.getProfile);
router.put('/profile', optionalAuth, studentController.updateProfile);
router.put('/group', optionalAuth, studentController.updateGroup);

module.exports = router;
