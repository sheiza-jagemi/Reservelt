const db = require('../database/db');
const { validationResult } = require('express-validator');

const getAllBookings = async (req, res) => {
  try {
    const { roomId, status } = req.query;
    let sql = `
      SELECT b.*, r.room_number, r.room_type 
      FROM bookings b 
      JOIN rooms r ON b.room_id = r.id
    `;
    const params = [];

    if (roomId || status) {
      sql += ' WHERE';
      const conditions = [];
      
      if (roomId) {
        conditions.push(' b.room_id = ?');
        params.push(roomId);
      }
      if (status) {
        conditions.push(' b.status = ?');
        params.push(status);
      }
      
      sql += conditions.join(' AND');
    }

    sql += ' ORDER BY b.booking_date DESC';

    const bookings = await db.query(sql, params);
    
    const formattedBookings = bookings.map(booking => ({
      ...booking,
      checkIn: booking.check_in,
      checkOut: booking.check_out,
      guestName: booking.guest_name,
      totalPrice: booking.total_price,
      bookingDate: booking.booking_date,
      roomId: booking.room_id,
      roomNumber: booking.room_number,
      roomType: booking.room_type
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await db.get(
      `SELECT b.*, r.room_number, r.room_type 
       FROM bookings b 
       JOIN rooms r ON b.room_id = r.id 
       WHERE b.id = ?`, 
      [id]
    );
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const formattedBooking = {
      ...booking,
      checkIn: booking.check_in,
      checkOut: booking.check_out,
      guestName: booking.guest_name,
      totalPrice: booking.total_price,
      bookingDate: booking.booking_date,
      roomId: booking.room_id,
      roomNumber: booking.room_number,
      roomType: booking.room_type
    };

    res.json(formattedBooking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

const checkAvailability = async (roomId, checkIn, checkOut, excludeBookingId = null) => {
  let sql = `
    SELECT COUNT(*) as count FROM bookings 
    WHERE room_id = ? AND status != 'cancelled' 
    AND ((check_in <= ? AND check_out > ?) OR (check_in < ? AND check_out >= ?))
  `;
  const params = [roomId, checkIn, checkIn, checkOut, checkOut];

  if (excludeBookingId) {
    sql += ' AND id != ?';
    params.push(excludeBookingId);
  }

  const result = await db.get(sql, params);
  return result.count === 0;
};

const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomId, guestName, email, phone, checkIn, checkOut, guests, totalPrice } = req.body;

    // Check room exists
    const room = await db.get('SELECT * FROM rooms WHERE id = ? AND is_available = 1', [roomId]);
    if (!room) {
      return res.status(404).json({ error: 'Room not found or not available' });
    }

    // Check availability
    const isAvailable = await checkAvailability(roomId, checkIn, checkOut);
    if (!isAvailable) {
      return res.status(409).json({ error: 'Room is not available for the selected dates' });
    }

    // Check occupancy
    if (guests > room.max_occupancy) {
      return res.status(400).json({ error: 'Number of guests exceeds room capacity' });
    }

    const result = await db.run(
      `INSERT INTO bookings (room_id, guest_name, email, phone, check_in, check_out, guests, total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [roomId, guestName, email, phone, checkIn, checkOut, guests, totalPrice]
    );

    const newBooking = await db.get(
      `SELECT b.*, r.room_number, r.room_type 
       FROM bookings b 
       JOIN rooms r ON b.room_id = r.id 
       WHERE b.id = ?`, 
      [result.id]
    );

    res.status(201).json({
      ...newBooking,
      checkIn: newBooking.check_in,
      checkOut: newBooking.check_out,
      guestName: newBooking.guest_name,
      totalPrice: newBooking.total_price,
      bookingDate: newBooking.booking_date,
      roomId: newBooking.room_id
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomId, guestName, email, phone, checkIn, checkOut, guests, totalPrice, status } = req.body;

    // Check if booking exists
    const existingBooking = await db.get('SELECT * FROM bookings WHERE id = ?', [id]);
    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // If dates are being changed, check availability
    if (checkIn && checkOut && roomId) {
      const isAvailable = await checkAvailability(roomId, checkIn, checkOut, id);
      if (!isAvailable) {
        return res.status(409).json({ error: 'Room is not available for the selected dates' });
      }
    }

    await db.run(
      `UPDATE bookings SET room_id = ?, guest_name = ?, email = ?, phone = ?, 
       check_in = ?, check_out = ?, guests = ?, total_price = ?, status = ? 
       WHERE id = ?`,
      [roomId, guestName, email, phone, checkIn, checkOut, guests, totalPrice, status, id]
    );

    const updatedBooking = await db.get(
      `SELECT b.*, r.room_number, r.room_type 
       FROM bookings b 
       JOIN rooms r ON b.room_id = r.id 
       WHERE b.id = ?`, 
      [id]
    );

    res.json({
      ...updatedBooking,
      checkIn: updatedBooking.check_in,
      checkOut: updatedBooking.check_out,
      guestName: updatedBooking.guest_name,
      totalPrice: updatedBooking.total_price,
      bookingDate: updatedBooking.booking_date,
      roomId: updatedBooking.room_id
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM bookings WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};