const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  articleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorName: DataTypes.STRING,
  authorEmail: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  parentCommentId: DataTypes.UUID,
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'spam', 'deleted'),
    defaultValue: 'pending',
  },
  ipAddress: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = Comment;
