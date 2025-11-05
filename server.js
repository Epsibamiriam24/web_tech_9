const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

// Initialize DB (mongoose)
const connectDB = require('./db');
const User = require('./models/User');
const Resume = require('./models/Resume');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Enable CORS (allow React dev server in development, disable in production)
if (!isProduction) {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'replace-with-secure-secret-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000,
    secure: isProduction, // Use secure cookies in production
    sameSite: isProduction ? 'strict' : 'lax'
  }
}));

// Serve static files (old public folder for backward compatibility)
app.use(express.static(path.join(__dirname, 'public')));

// In production, serve React build
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, email, username, password, confirmPassword } = req.body;

  if (!fullName || !email || !username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  try {
    // Check duplicate email or username
    const existing = await User.findOne({ $or: [{ email }, { username }] }).exec();
    if (existing) return res.status(409).json({ error: 'Email or username already in use.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ full_name: fullName, email, username, password: hashed });
    // auto-login after registration
    req.session.userId = user._id;
    return res.json({ success: true, userId: user._id });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) return res.status(400).json({ error: 'Missing credentials.' });

  try {
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).exec();
    if (!user) return res.status(401).json({ error: 'Invalid username/email or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid username/email or password.' });

    req.session.userId = user._id;
    return res.json({ success: true, userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// Simple check route
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login.html');
  }
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/api/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const user = await User.findById(req.session.userId).select('id full_name email username created_at').exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// Middleware: require auth
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  next();
}

// Create a resume (protected)
app.post('/api/resumes', requireAuth, async (req, res) => {
  const { name, email, summary, skills } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  try {
    const r = await Resume.create({ user: req.session.userId, name, email, summary, skills });
    res.json({ success: true, resume: r });
  } catch (err) {
    console.error('Resume create error:', err);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// List resumes for current user (protected)
app.get('/api/resumes', requireAuth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.session.userId }).sort({ created_at: -1 }).exec();
    res.json({ resumes });
  } catch (err) {
    console.error('Resume list error:', err);
    res.status(500).json({ error: 'Failed to list resumes' });
  }
});

// In production, serve React app for all non-API routes (SPA fallback)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

// Start server only after DB connection succeeds
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error: %s', err && err.message ? err.message : err);
    console.error('Make sure your MONGODB_URI is correct and your IP is allowed in the Atlas Network Access whitelist.');
    process.exit(1);
  });
