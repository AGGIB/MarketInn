const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  guestName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  adults: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  children: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  bookingSource: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Direct'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Confirmed', 'Pending', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Confirmed'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bookings',
  timestamps: true
});

module.exports = Booking; 