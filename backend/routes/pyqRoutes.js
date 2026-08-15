const express = require('express');
const router = express.Router();
const pyqController = require('../controllers/pyqController');

router.get('/', pyqController.getPYQ);

module.exports = router;
