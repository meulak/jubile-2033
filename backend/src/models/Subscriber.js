const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  language: {
    type: DataTypes.ENUM('fr', 'en', 'it'),
    defaultValue: 'fr',
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'unsubscribed'),
    defaultValue: 'pending',
  },
  confirmationToken: DataTypes.STRING,
  confirmationTokenExpiry: DataTypes.DATE,
  preferences: {
    type: DataTypes.JSON,
    defaultValue: {
      frequency: 'weekly',
      categories: ['all'],
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = Subscriber;
