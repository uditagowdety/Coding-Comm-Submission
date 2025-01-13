const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Check if the provided password matches the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const dashboard = async (req, res) => {
    try {
      // `req.user` is populated by the `authenticate` middleware
      const userId = req.user.id;
  
      // Fetch the user details from the database
      const user = await User.findById(userId).select('-password'); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return user details
      res.status(200).json({
        message: `Welcome, ${user.username}`,
        data: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching dashboard data' });
    }
  };

module.exports = { registerUser, loginUser, dashboard };
