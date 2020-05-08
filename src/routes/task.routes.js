const express = require('express');
const router = express.Router();

// Task Model
const Empleado = require('../models/task');

// GET all Tasks
router.get('/', async (req, res) => {
  const empleados = await Empleado.find();
  res.json(empleados);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const empleados = await Empleado.findById(req.params.id);
  res.json(empleados);
});

// ADD a new task
router.post('/', async (req, res) => {
  const { clave, nombre, puesto, sueldo } = req.body;
  const empleados = new Empleado({clave, nombre, puesto, sueldo});
  await empleados.save();
  res.json({status: 'Task Saved'});
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const { clave, nombre, puesto, sueldo } = req.body;
  const empleados = {clave, nombre, puesto, sueldo};
  await Empleado.findByIdAndUpdate(req.params.id, empleados);
  res.json({status: 'Task Updated'});
});

router.delete('/:nombre', async (req, res) => {
  await Empleado.findByIdAndRemove(req.params.nombre);
  res.json({status: 'Task Deleted'});
});
module.exports = router;