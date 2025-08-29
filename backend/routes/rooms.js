const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

const router = express.Router();

// Validation rules
const roomValidation = [
  body('roomNumber').notEmpty().withMessage('Room number is required'),
  body('roomType').isIn(['Single', 'Double', 'Executive Suite']).withMessage('Invalid room type'),
  body('pricePerNight').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('maxOccupancy').isInt({ min: 1 }).withMessage('Max occupancy must be at least 1'),
  body('amenities').isArray().withMessage('Amenities must be an array'),
  body('images').isArray().withMessage('Images must be an array'),
  body('description').notEmpty().withMessage('Description is required')
];

// Public routes
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

// Protected routes (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), roomValidation, createRoom);
router.put('/:id', authenticateToken, authorizeRole(['admin']), roomValidation, updateRoom);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteRoom);

module.exports = router;