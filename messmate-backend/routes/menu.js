const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/today', menuController.getTodayMenu);
router.post('/', menuController.postMenu);
router.get('/all', menuController.getAllMenus); // For warden
router.post('/approve', menuController.approveMenu); // For warden

module.exports = router;

