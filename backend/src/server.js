const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import models to ensure they are registered with sequelize
require('./models/Subscriber');
require('./models/Comment');
require('./models/ContactSubmission');

// Route imports
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');
const commentRoutes = require('./routes/comments');

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'sqlite'
  });
});

app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/articles/comments', commentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
      details: err.details || []
    }
  });
});

// Database Sync & Server Start
sequelize.sync({ alter: true }) // alter creates/updates tables
  .then(() => {
    console.log('✅ Database synced (SQLite via Sequelize)');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB sync error:', err);
    process.exit(1);
  });

module.exports = app;
