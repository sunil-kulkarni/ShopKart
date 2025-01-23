const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shopkart', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: Array,
});

const User = mongoose.model('User', UserSchema);

// Middleware for verifying JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, cart: [] });
  try {
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: 'Signup failed' });
  }
});
// Get cart items endpoint
app.get('/cart', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching cart' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Add to cart endpoint
app.post('/cart/add', authenticate, async (req, res) => {
  const { product } = req.body;
  try {
    await User.findByIdAndUpdate(req.userId, { $push: { cart: product } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding to cart' });
  }
});

// Remove from cart endpoint
app.post('/cart/remove', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => item.id !== productId);
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing item from cart' });
  }
});


// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
