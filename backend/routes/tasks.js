const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET todas las tareas
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// POST nueva tarea
router.post('/', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.status(201).json(newTask);
});

// DELETE tarea por ID
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tarea eliminada' });
});

// PUT actualizar tarea (completado)
router.put('/:id', async (req, res) => {
  const { completed } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed },
    { new: true }
  );
  res.json(task);
});


module.exports = router;
