const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactSubmission = sequelize.define('ContactSubmission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: DataTypes.STRING,
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachmentUrl: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('new', 'replied', 'archived'),
    defaultValue: 'new',
  },
  ipAddress: DataTypes.STRING,
  createdAt: DataTypes.DATE,
});

module.exports = ContactSubmission;
