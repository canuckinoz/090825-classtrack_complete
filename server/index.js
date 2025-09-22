const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET environment variable is not set');
}

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
const students = [
  { id: 1, name: "Emma Thompson", recentActivity: "none", status: "thriving", positiveRatio: 0.9 },
  { id: 2, name: "Liam Chen", recentActivity: "none", status: "growing",   positiveRatio: 0.7 },
  { id: 3, name: "Sophie Taylor", recentActivity: "none", status: "resting",  positiveRatio: 0.4 },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });
    if (users[username]) return res.status(409).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    users[username] = { username, password: hashed };
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users[username];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user: { username }, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
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

// Fetch students
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(students);
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