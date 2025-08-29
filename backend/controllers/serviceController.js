const db = require('../database/db');
const { validationResult } = require('express-validator');

const getAllServices = async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM services';
    const params = [];

    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY category, name';

    const services = await db.query(sql, params);
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await db.get('SELECT * FROM services WHERE id = ?', [id]);
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, description } = req.body;

    const result = await db.run(
      `INSERT INTO services (name, category, price, description)
       VALUES (?, ?, ?, ?)`,
      [name, category, price, description]
    );

    const newService = await db.get('SELECT * FROM services WHERE id = ?', [result.id]);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description } = req.body;

    const existingService = await db.get('SELECT * FROM services WHERE id = ?', [id]);
    if (!existingService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await db.run(
      `UPDATE services SET name = ?, category = ?, price = ?, description = ? 
       WHERE id = ?`,
      [name, category, price, description, id]
    );

    const updatedService = await db.get('SELECT * FROM services WHERE id = ?', [id]);
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM services WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};

const getServiceCategories = async (req, res) => {
  try {
    const categories = await db.query('SELECT DISTINCT category FROM services ORDER BY category');
    res.json(categories.map(row => row.category));
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({ error: 'Failed to fetch service categories' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceCategories
};