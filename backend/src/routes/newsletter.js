const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { validate, validateSubscriber } = require('../middleware/validation');
const { newsletterLimiter } = require('../middleware/rateLimit');

// Public routes
router.post('/subscribe', newsletterLimiter, validate(validateSubscriber), newsletterController.subscribe);
router.post('/confirm/:token', newsletterController.confirm);
router.post('/unsubscribe', newsletterController.unsubscribe);
router.post('/preferences', newsletterController.updatePreferences);
router.get('/status/:email', newsletterController.getStatus);

module.exports = router;
