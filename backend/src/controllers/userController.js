const { User } = require('../models');

/**
 * Get all users
 * @route GET /api/users
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
  }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 */
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user.', error: error.message });
  }
};

/**
 * Create a new user (admin only)
 * @route POST /api/users
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    
    // Create the user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'staff',
      isActive: isActive !== undefined ? isActive : true,
      createdById: req.user.id
    });
    
    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.status(201).json({
      message: 'User created successfully.',
      user: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user.', error: error.message });
  }
};

/**
 * Update a user
 * @route PUT /api/users/:id
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role, isActive } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    
    await user.save();
    
    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.json({
      message: 'User updated successfully.',
      user: userResponse
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user.', error: error.message });
  }
};

/**
 * Delete a user
 * @route DELETE /api/users/:id
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Prevent deleting self
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account.' });
    }
    
    await user.destroy();
    
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user.', error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 