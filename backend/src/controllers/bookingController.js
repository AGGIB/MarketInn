const Booking = require('../models/Booking');
const { Op } = require('sequelize');

/**
 * Get all bookings with pagination and filtering
 * @route GET /api/bookings
 */
const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;
    
    // Filter options
    const where = {};
    if (req.query.guestName) {
      where.guestName = { [Op.like]: `%${req.query.guestName}%` };
    }
    if (req.query.status) {
      where.status = req.query.status;
    }
    if (req.query.startDate && req.query.endDate) {
      where[Op.or] = [
        {
          checkInDate: {
            [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
          }
        },
        {
          checkOutDate: {
            [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
          }
        }
      ];
    }

    const { count, rows } = await Booking.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      totalItems: count,
      bookings: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

/**
 * Get a single booking by ID
 * @route GET /api/bookings/:id
 */
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
};

/**
 * Create a new booking
 * @route POST /api/bookings
 */
const createBooking = async (req, res) => {
  try {
    const {
      guestName,
      roomId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      bookingSource,
      price,
      status,
      notes
    } = req.body;

    // Validation
    if (!guestName || !roomId || !checkInDate || !checkOutDate || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if dates are valid
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    const newBooking = await Booking.create({
      guestName,
      roomId,
      checkInDate,
      checkOutDate,
      adults: adults || 1,
      children: children || 0,
      bookingSource: bookingSource || 'Direct',
      price,
      status: status || 'Confirmed',
      notes,
      createdById: req.user ? req.user.id : null
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

/**
 * Update an existing booking
 * @route PUT /api/bookings/:id
 */
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const {
      guestName,
      roomId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      bookingSource,
      price,
      status,
      notes
    } = req.body;

    // Validate dates if they are provided
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      
      if (checkIn >= checkOut) {
        return res.status(400).json({ message: 'Check-out date must be after check-in date' });
      }
    }

    await booking.update({
      guestName: guestName || booking.guestName,
      roomId: roomId || booking.roomId,
      checkInDate: checkInDate || booking.checkInDate,
      checkOutDate: checkOutDate || booking.checkOutDate,
      adults: adults !== undefined ? adults : booking.adults,
      children: children !== undefined ? children : booking.children,
      bookingSource: bookingSource || booking.bookingSource,
      price: price !== undefined ? price : booking.price,
      status: status || booking.status,
      notes: notes !== undefined ? notes : booking.notes
    });

    res.status(200).json({
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
};

/**
 * Delete a booking
 * @route DELETE /api/bookings/:id
 */
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking', error: error.message });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
}; 