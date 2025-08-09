const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demo purposes
const users = {
  'demo': {
    username: 'demo',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // 'password'
  },
  'teacher': {
    username: 'teacher',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // 'password'
  },
  'admin': {
    username: 'admin',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // 'password'
  }
};
const logs = [];

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });
  if (users[username]) return res.status(409).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  users[username] = { username, password: hashed };
  res.status(201).json({ message: 'User registered' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ user: { username }, token });
});

// Fetch logs
app.get('/api/logs', authenticateToken, (req, res) => {
  res.json(logs);
});

// Create a new log
app.post('/api/logs', authenticateToken, (req, res) => {
  const log = { ...req.body, user: req.user.username };
  logs.push(log);
  res.status(201).json(log);
});

// Predictions endpoint - returns dummy data; replace with real model later
app.get('/api/predictions', authenticateToken, (req, res) => {
  res.json({
    forecast: {
      risk: 3,
      description: 'Partly cloudy',
      criticalTimes: ['2:15 PM - 87% chance energy crash'],
      focusStudents: ['Noah'],
      strategies: ['Movement break', 'Visual schedule']
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});