import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readData, writeData, addItem } from '../utils/dataStorage.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Default users for testing
const defaultUsers = [
  {
    id: '1',
    email: 'admin@herbtrace.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'processor@herbtrace.com',
    password: 'processor123',
    role: 'processor',
    name: 'Processor User'
  },
  {
    id: '3',
    email: 'lab@herbtrace.com',
    password: 'lab123',
    role: 'lab',
    name: 'Lab Technician'
  },
  {
    id: '4',
    email: 'manufacturer@herbtrace.com',
    password: 'manufacturer123',
    role: 'manufacturer',
    name: 'Manufacturer User'
  },
  {
    id: '5',
    email: 'farmer@herbtrace.com',
    password: 'farmer123',
    role: 'farmer',
    name: 'Demo Farmer'
  }
];

// Initialize users file with default users
const initializeUsers = () => {
  const users = readData('users.json');
  if (users.length === 0) {
    writeData('users.json', defaultUsers);
    return defaultUsers;
  }
  // Merge default users if they don't exist
  defaultUsers.forEach(defaultUser => {
    if (!users.find(u => u.email === defaultUser.email)) {
      users.push(defaultUser);
    }
  });
  writeData('users.json', users);
  return users;
};

initializeUsers();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
  }

    const users = readData('users.json');
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, hash this with bcrypt
      role: 'farmer',
      name
    };

    addItem('users.json', newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    res.json({
      message: 'Registration successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readData('users.json');
    
    // Find user matching email, password, and optionally role
    const user = users.find(u => {
      const emailMatch = u.email === email;
      const passwordMatch = u.password === password;
      const roleMatch = role ? u.role === role : true;
      return emailMatch && passwordMatch && roleMatch;
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user (requires authentication)
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      const users = readData('users.json');
      const user = users.find(u => u.id === decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

