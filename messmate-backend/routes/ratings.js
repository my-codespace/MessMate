const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');

router.post('/', ratingsController.submitRating);
router.get('/', ratingsController.getAllRatings);

module.exports = router;
