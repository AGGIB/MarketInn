const User = require('./User');
const Booking = require('./Booking');
const sequelize = require('../config/database');

// Define associations
Booking.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });
User.hasMany(Booking, { as: 'bookings', foreignKey: 'createdById' });

// Export models
module.exports = {
  sequelize,
  User,
  Booking
}; 