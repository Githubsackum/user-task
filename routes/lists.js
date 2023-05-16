const express = require('express');

const router = express.Router();
const List = require('../models/List');

router.get('/', async (req, res) => {
  try {
    const lists = await List.findAll();

    return res.json(lists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const list = await List.create({ name });

    return res.json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await List.destroy({ where: { id } });

    return res.json({ message: 'List deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;