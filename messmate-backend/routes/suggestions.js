const express = require('express');
const router = express.Router();
const suggestionsController = require('../controllers/suggestionsController');

router.post('/', suggestionsController.submitSuggestion);
router.get('/', suggestionsController.getSuggestions);
router.post('/approve', suggestionsController.approveSuggestion);

module.exports = router;
