// routes/tasks.js
const express = require('express');

const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const task = await Task.create({ name });

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { listId } = req.body;

    if (listId) {
      task.listId = listId;
    }

    const { completed } = req.body;

    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.destroy({ where: { id } });

    return res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
