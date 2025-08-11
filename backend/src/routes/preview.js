const express = require('express');
const previewController = require('../controllers/previewController');
const { validateUrl } = require('../middleware/validation');

const router = express.Router();

// POST /api/preview - Get URL preview
router.post('/preview', validateUrl, previewController.getPreview);

module.exports = router;
