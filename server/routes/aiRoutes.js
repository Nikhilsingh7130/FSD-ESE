const express = require('express');
const aiController = require('../controllers/aiController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// AI Complaint Analyzer
router.post('/analyze', authenticateToken, aiController.analyzeComplaint);

module.exports = router;
