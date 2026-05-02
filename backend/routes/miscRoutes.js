const express = require('express');
const router = express.Router();
const { submitFeedback, submitContact, getDebugData } = require('../controllers/miscController');

router.post('/feedback', submitFeedback);
router.post('/contact', submitContact);
router.get('/debug-data', getDebugData);

module.exports = router;
