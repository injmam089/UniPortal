const express = require('express');
const router = express.Router();
const feesController = require('../controllers/feesController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, feesController.getFeeOverview);
router.post('/pay', optionalAuth, feesController.makePayment);

module.exports = router;
