const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

router.get('/', complaintsController.getComplaints); // For warden
router.post('/', complaintsController.submitComplaint); // For student
router.post('/resolve', complaintsController.resolveComplaint); // For warden

module.exports = router;
    