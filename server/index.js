const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const { requireTeacherClassParam } = require('./auth/middleware');
const { stripComparativeFields } = require('./auth/rbac');
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
    // Attach a basic user context. In real app, fetch from DB.
    // Demo mapping: username 'teacher' => role teacher with scope classes
    let role = 'admin';
    let scope = undefined;
    if (user?.username === 'teacher') {
      role = 'teacher';
      scope = { classIds: ['CLASS-3A', 'CLASS-5B'] };
    }
    req.user = { id: user.username, role, scope };
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

// Current user endpoint
app.get('/api/me', authenticateToken, (req, res) => {
  res.json({ ok:true, user: req.user });
});

// Fetch logs
app.get('/api/logs', authenticateToken, (req, res) => {
  res.json(logs);
});

// Create a new log
app.post('/api/logs', authenticateToken, (req, res) => {
  const log = { ...req.body, user: req.user.id };
  logs.push(log);
  res.status(201).json(log);
});

// Predictions endpoint - returns dummy data; replace with real model later
app.get('/api/predictions', authenticateToken, requireTeacherClassParam('class_id'), (req, res) => {
  const data = {
    forecast: {
      class_id: req.query.class_id,
      risk: 3,
      description: 'Partly cloudy',
      criticalTimes: ['2:15 PM - 87% chance energy crash'],
      focusStudents: ['Noah'],
      strategies: ['Movement break', 'Visual schedule'],
      schoolAgg: { avgRisk: 4 },
      byTeacher: { t1: 3, t2: 5 }
    }
  };
  data.forecast = stripComparativeFields(data.forecast);
  res.json(data);
});

// School-wide report (blocked for teachers)
app.get('/api/school-report', authenticateToken, (req, res) => {
  if (req.user?.role === 'teacher') return res.status(403).json({ ok:false, error:'teacher_no_school_report' });
  res.json({ ok:true, report: { summary: 'school-wide data' } });
});

// Error handler with friendly messages
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const map = {
    auth_required: 'Sign in to continue.',
    out_of_scope: 'This class is not in your scope.',
    role_required: 'Insufficient permissions.',
    class_id_required: 'class_id is required.'
  };
  res.status(status).json({ ok:false, error: map[err.message] || err.message || 'error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;