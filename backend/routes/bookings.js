const express = require('express');
const { body } = require('express-validator');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('roomId').isInt({ min: 1 }).withMessage('Valid room ID is required'),
  body('guestName').notEmpty().withMessage('Guest name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
];

// Public routes
router.post('/', bookingValidation, createBooking);

// Protected routes
router.get('/', authenticateToken, authorizeRole(['admin', 'staff']), getAllBookings);
router.get('/:id', authenticateToken, getBookingById);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'staff']), bookingValidation, updateBooking);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteBooking);

module.exports = router;