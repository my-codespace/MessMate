const express = require('express');
const router = express.Router();
const rebatesController = require('../controllers/rebatesController');

router.post('/', rebatesController.applyRebate);
router.get('/', rebatesController.getRebates);
router.post('/status', rebatesController.updateRebateStatus);

module.exports = router;
