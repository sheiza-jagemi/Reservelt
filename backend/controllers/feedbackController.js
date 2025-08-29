const db = require('../database/db');
const { validationResult } = require('express-validator');

const getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, roomId } = req.query;
    const offset = (page - 1) * limit;
    
    let sql = 'SELECT * FROM feedback';
    let countSql = 'SELECT COUNT(*) as total FROM feedback';
    const params = [];
    const countParams = [];

    if (roomId) {
      sql += ' WHERE room_id = ?';
      countSql += ' WHERE room_id = ?';
      params.push(roomId);
      countParams.push(roomId);
    }

    sql += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [feedback, totalResult] = await Promise.all([
      db.query(sql, params),
      db.get(countSql, countParams)
    ]);

    const formattedFeedback = feedback.map(item => ({
      ...item,
      userName: item.user_name,
      roomId: item.room_id
    }));

    res.json({
      feedback: formattedFeedback,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.total,
        pages: Math.ceil(totalResult.total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await db.get('SELECT * FROM feedback WHERE id = ?', [id]);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const formattedFeedback = {
      ...feedback,
      userName: feedback.user_name,
      roomId: feedback.room_id
    };

    res.json(formattedFeedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

const createFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, email, rating, comment, roomId } = req.body;
    
    // Generate random avatar
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`;

    const result = await db.run(
      `INSERT INTO feedback (user_name, email, rating, comment, room_id, avatar)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, email || null, rating, comment, roomId || null, avatar]
    );

    const newFeedback = await db.get('SELECT * FROM feedback WHERE id = ?', [result.id]);
    
    res.status(201).json({
      ...newFeedback,
      userName: newFeedback.user_name,
      roomId: newFeedback.room_id
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, rating, comment, roomId } = req.body;

    const existingFeedback = await db.get('SELECT * FROM feedback WHERE id = ?', [id]);
    if (!existingFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    await db.run(
      `UPDATE feedback SET user_name = ?, email = ?, rating = ?, comment = ?, room_id = ? 
       WHERE id = ?`,
      [userName, email, rating, comment, roomId, id]
    );

    const updatedFeedback = await db.get('SELECT * FROM feedback WHERE id = ?', [id]);
    
    res.json({
      ...updatedFeedback,
      userName: updatedFeedback.user_name,
      roomId: updatedFeedback.room_id
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM feedback WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};

const getFeedbackStats = async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        AVG(rating) as average_rating,
        COUNT(*) as total_reviews,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
      FROM feedback
    `);

    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({ error: 'Failed to fetch feedback statistics' });
  }
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackStats
};