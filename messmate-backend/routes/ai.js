const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.get('/menu-suggestions', aiController.getMenuSuggestions);

module.exports = router;
