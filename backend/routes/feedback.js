const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackStats
} = require('../controllers/feedbackController');

const router = express.Router();

// Validation rules
const feedbackValidation = [
  body('userName').notEmpty().withMessage('User name is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 1000 }).withMessage('Comment must be less than 1000 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required if provided'),
  body('roomId').optional().isInt({ min: 1 }).withMessage('Valid room ID is required if provided')
];

// Public routes
router.get('/', getAllFeedback);
router.get('/stats', getFeedbackStats);
router.get('/:id', getFeedbackById);
router.post('/', feedbackValidation, createFeedback);

// Protected routes (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), feedbackValidation, updateFeedback);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteFeedback);

module.exports = router;