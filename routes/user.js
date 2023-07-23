const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const router = express.Router()
const User = require('../model/UserFirst')
const bodyParser = require('body-parser');
const JWT_TOKEN = "codingislife";
// Middleware to verify JWT token



// user registration
  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;

    //   Avialability of user

    let user = await User.findOne({username:username});
    if(user){
        return res.status(400).json({error : "A user with this email already exists"});
    }
  
      // Hash the password before saving it to the database
      let salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Save user to the database
       user = await User.create({
        username:username,
        password: hashedPassword,
      });
     
     const data ={
       user:{
        id : user.id
       }
      }
    //  console.log(data)
      const authToken = jwt.sign(data, JWT_TOKEN);
    //   console.log(authToken)
      res.json({success:authToken});
    } catch (error) {
        console.log(error.massage)
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  });
  
  // User logout API (invalidate token)
router.post('/user/logout', async (req, res) => {
    const token = req.headers['auth-token'];
  
    if (token) {
      // Add token to blacklist with an expiration time (optional but recommended)
      tokenBlacklist.add(token);
      setTimeout(() => {
        tokenBlacklist.delete(token);
      }, 24 * 60 * 60 * 1000); // 24 hours
    }
  
    res.json({ message: 'Logged out successfully.' });
  });


  // User login API
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Create and send JWT token for authentication
      const data = {
        user:{
          id : user.id
        }
      }
      
    //  Signing with jwt 
      const authtoken =  jwt.sign(data , JWT_TOKEN);
      res.json({success:authtoken})

    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  });
  
  
  // Protected user route
  app.get('/api/user/dashboard', (req, res) => {
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
app.get('/api/user/dashboard', (req, res) => {
  // User-specific logic
});

// Protected dealership route
app.get('/api/dealership/dashboard', (req, res) => {
  // Dealership-specific logic
});

// Protected admin route
app.get('/api/admin/dashboard', (req, res) => {
  // Admin-specific logic
});



module.exports = router
