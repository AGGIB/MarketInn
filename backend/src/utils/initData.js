const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Create initial admin user if none exists
 */
const initializeAdminUser = async () => {
  try {
    const adminCount = await User.count({ where: { role: 'admin' } });
    
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@wyndhamgarden.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      console.log('Initial admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
};

module.exports = { initializeAdminUser }; 