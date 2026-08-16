const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/profile', optionalAuth, studentController.getProfile);
router.put('/profile', optionalAuth, studentController.updateProfile);
router.get('/documents', optionalAuth, studentController.getDocuments);
router.get('/academic', optionalAuth, studentController.getAcademicRecord);
router.post('/change-password', optionalAuth, studentController.changePassword);
router.put('/group', optionalAuth, studentController.updateGroup);

module.exports = router;
