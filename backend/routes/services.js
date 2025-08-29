const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceCategories
} = require('../controllers/serviceController');

const router = express.Router();

// Validation rules
const serviceValidation = [
  body('name').notEmpty().withMessage('Service name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Description is required')
];

// Public routes
router.get('/', getAllServices);
router.get('/categories', getServiceCategories);
router.get('/:id', getServiceById);

// Protected routes (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), serviceValidation, createService);
router.put('/:id', authenticateToken, authorizeRole(['admin']), serviceValidation, updateService);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteService);

module.exports = router;