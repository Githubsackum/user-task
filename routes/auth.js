const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'mysecret');

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});