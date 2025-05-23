const express = require('express');
const router = express.Router();
const billsController = require('../controllers/billsController');

router.post('/', billsController.createBill);
router.get('/', billsController.getBills);
router.post('/pay', billsController.payBill);

module.exports = router;
