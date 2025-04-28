const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware to all booking routes
router.use(authenticate);

// GET all bookings with pagination and filtering
router.get('/', bookingController.getAllBookings);

// GET a single booking by ID
router.get('/:id', bookingController.getBookingById);

// POST create a new booking
router.post('/', bookingController.createBooking);

// PUT update an existing booking
router.put('/:id', bookingController.updateBooking);

// DELETE a booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router; 