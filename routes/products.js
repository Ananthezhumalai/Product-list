const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = db('products');
    
    if (q) {
      query = query.where('name', 'like', `%${q}%`)
                   .orWhere('description', 'like', `%${q}%`);
    }

    const { count } = await query.clone().count('* as count').first();
    const total = parseInt(count, 10);
    
    const products = await query.select('*').limit(limit).offset(offset);

    res.json({
      data: products,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    console.error("DEBUG:", err);
    res.status(500).json({ error: err.message || JSON.stringify(err) || "Unknown error" });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;
    if (!isNaN(id)) {
      product = await db('products').where({ id }).first();
    }
    if (!product) {
      product = await db('products').where({ sku: id }).first();
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const [id] = await db('products').insert(req.body).returning('id');
    const newProduct = await db('products').where('id', typeof id === 'object' ? id.id : id).first();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRows = await db('products').where({ id }).update(req.body);
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = await db('products').where({ id }).first();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await db('products').where({ id }).del();
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
