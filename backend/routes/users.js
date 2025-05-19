const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Get all users - Admin only
router.get('/', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get own profile - Employee or Employer
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
});

// Update own profile (including "bio") - Employee or Employer
router.put('/me', protect, async (req, res) => {
  const updates = { ...req.body };

  // Prevent role or password change here (or do a separate route for password change)
  delete updates.role;
  delete updates.password;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(updatedUser);
});

// Delete own profile - Employee or Employer
router.delete('/me', protect, async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ msg: 'Your profile was deleted' });
});

// Admin: Delete any user by ID
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  if(req.user.id === req.params.id) {
    return res.status(400).json({ msg: 'Admin cannot delete themselves' });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'User deleted by admin' });
});

// Admin: Update any user (e.g., role) by ID
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const updates = { ...req.body };
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
  res.json(user);
});

module.exports = router;
