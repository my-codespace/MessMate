const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/ratings', analyticsController.getRatingsAnalytics);

module.exports = router;
