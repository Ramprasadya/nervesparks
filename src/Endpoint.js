const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }

    req.user = decoded;
    next();
  });
}

// Helper function to generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    role: user.role,
  };

  return jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' });
}

// User logout API (invalidate token)
app.post('/api/user/logout', async (req, res) => {
    const token = req.headers['authorization'];
  
    if (token) {
      // Add token to blacklist with an expiration time (optional but recommended)
      tokenBlacklist.add(token);
      setTimeout(() => {
        tokenBlacklist.delete(token);
      }, 24 * 60 * 60 * 1000); // 24 hours
    }
  
    res.json({ message: 'Logged out successfully.' });
  });

  app.post('/api/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save user to the database
      const newUser = await db.collection('users').insertOne({
        username,
        password: hashedPassword,
      });
  
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  });
  
  // User login API
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await db.collection('users').findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Create and send JWT token for authentication
      const token = jwt.sign({ username: user.username }, 'your-secret-key');
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  });
  
  
  // Protected user route
  app.get('/api/user/dashboard', verifyToken, (req, res) => {
    // User-specific logic
  });

// User registration API
app.post('/api/user/register', async (req, res) => {
  // Registration logic and password hashing
});

// User login API
app.post('/api/user/login', async (req, res) => {
  // Login logic and JWT token generation
});

// Dealership registration API
app.post('/api/dealership/register', async (req, res) => {
  // Registration logic for dealerships
});

// Dealership login API
app.post('/api/dealership/login', async (req, res) => {
  // Login logic for dealerships and JWT token generation
});

// Admin login API
app.post('/api/admin/login', async (req, res) => {
  // Login logic for admin and JWT token generation
});

// Protected user route
app.get('/api/user/dashboard', verifyToken, (req, res) => {
  // User-specific logic
});

// Protected dealership route
app.get('/api/dealership/dashboard', verifyToken, (req, res) => {
  // Dealership-specific logic
});

// Protected admin route
app.get('/api/admin/dashboard', verifyToken, (req, res) => {
  // Admin-specific logic
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
