const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { validate, validateComment } = require('../middleware/validation');

// Public routes
router.post('/', validate(validateComment), commentsController.createComment);
router.get('/:articleId', commentsController.getComments);

// Admin routes (Placeholder for authentication - will be protected in production)
router.post('/:commentId/approve', commentsController.approveComment);
router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;
