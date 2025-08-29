const db = require('../database/db');
const { validationResult } = require('express-validator');

const getAllRooms = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, occupancy } = req.query;
    let sql = 'SELECT * FROM rooms WHERE is_available = 1';
    const params = [];

    if (type) {
      sql += ' AND room_type = ?';
      params.push(type);
    }
    if (minPrice) {
      sql += ' AND price_per_night >= ?';
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      sql += ' AND price_per_night <= ?';
      params.push(parseFloat(maxPrice));
    }
    if (occupancy) {
      sql += ' AND max_occupancy >= ?';
      params.push(parseInt(occupancy));
    }

    const rooms = await db.query(sql, params);
    
    // Parse JSON fields
    const formattedRooms = rooms.map(room => ({
      ...room,
      amenities: room.amenities ? JSON.parse(room.amenities) : [],
      images: room.images ? JSON.parse(room.images) : [],
      isAvailable: Boolean(room.is_available),
      pricePerNight: room.price_per_night,
      maxOccupancy: room.max_occupancy,
      roomNumber: room.room_number,
      roomType: room.room_type
    }));

    res.json(formattedRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const formattedRoom = {
      ...room,
      amenities: room.amenities ? JSON.parse(room.amenities) : [],
      images: room.images ? JSON.parse(room.images) : [],
      isAvailable: Boolean(room.is_available),
      pricePerNight: room.price_per_night,
      maxOccupancy: room.max_occupancy,
      roomNumber: room.room_number,
      roomType: room.room_type
    };

    res.json(formattedRoom);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};

const createRoom = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomNumber, roomType, pricePerNight, maxOccupancy, amenities, images, description } = req.body;

    const result = await db.run(
      `INSERT INTO rooms (room_number, room_type, price_per_night, max_occupancy, amenities, images, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [roomNumber, roomType, pricePerNight, maxOccupancy, JSON.stringify(amenities), JSON.stringify(images), description]
    );

    const newRoom = await db.get('SELECT * FROM rooms WHERE id = ?', [result.id]);
    res.status(201).json({
      ...newRoom,
      amenities: JSON.parse(newRoom.amenities),
      images: JSON.parse(newRoom.images),
      isAvailable: Boolean(newRoom.is_available),
      pricePerNight: newRoom.price_per_night,
      maxOccupancy: newRoom.max_occupancy,
      roomNumber: newRoom.room_number,
      roomType: newRoom.room_type
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, roomType, pricePerNight, maxOccupancy, amenities, images, description, isAvailable } = req.body;

    await db.run(
      `UPDATE rooms SET room_number = ?, room_type = ?, price_per_night = ?, max_occupancy = ?, 
       amenities = ?, images = ?, description = ?, is_available = ? WHERE id = ?`,
      [roomNumber, roomType, pricePerNight, maxOccupancy, JSON.stringify(amenities), 
       JSON.stringify(images), description, isAvailable ? 1 : 0, id]
    );

    const updatedRoom = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);
    res.json({
      ...updatedRoom,
      amenities: JSON.parse(updatedRoom.amenities),
      images: JSON.parse(updatedRoom.images),
      isAvailable: Boolean(updatedRoom.is_available),
      pricePerNight: updatedRoom.price_per_night,
      maxOccupancy: updatedRoom.max_occupancy,
      roomNumber: updatedRoom.room_number,
      roomType: updatedRoom.room_type
    });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM rooms WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};