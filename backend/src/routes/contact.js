const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validate, validateContact } = require('../middleware/validation');
const { contactLimiter } = require('../middleware/rateLimit');

// Public routes
router.post('/', contactLimiter, validate(validateContact), contactController.handleContact);

module.exports = router;
