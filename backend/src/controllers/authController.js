const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Only admins can create admin users
    if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Only admins can create admin accounts.' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'staff',
      createdById: req.user ? req.user.id : null
    });

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully.',
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
};

/**
 * Log in a user
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is inactive. Please contact an administrator.' });
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      message: 'Login successful.',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login.', error: error.message });
  }
};

/**
 * Get the current user's profile
 * @route GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    // User is attached to request by auth middleware
    const userResponse = req.user.toJSON();
    delete userResponse.password;

    res.json({
      user: userResponse
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching profile.', error: error.message });
  }
};

/**
 * Update user profile
 * @route PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      message: 'Profile updated successfully.',
      user: userResponse
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile.', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
}; 