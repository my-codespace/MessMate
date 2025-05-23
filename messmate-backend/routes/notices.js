const express = require('express');
const router = express.Router();
const noticesController = require('../controllers/noticesController');

router.get('/', noticesController.getNotices);
router.post('/', noticesController.postNotice);

module.exports = router;
