const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = []; // Temporary storage for demo; replace with a database in production

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (for demo purposes)
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully!' });
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    // Generate JWT Token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
