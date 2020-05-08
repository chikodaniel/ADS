const express = require('express');
const router = express.Router();

// Task Model
const Puesto = require('../models/task2');

// GET all Tasks
router.get('/', async (req, res) => {
  const puestos = await Puesto.find();
  res.json(puestos);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const puestos = await Puesto.findById(req.params.id);
  res.json(puestos);
});


module.exports = router;