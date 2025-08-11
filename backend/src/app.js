const express = require('express');
const cors = require('cors');
const previewRoutes = require('./routes/preview');
const { errorHandler } = require('./middleware/errorHandler');

const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }));
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));

  // Routes
  app.use('/api', previewRoutes);

  // Error handling middleware
  app.use(errorHandler);

  // 404 handler 
  app.use('/*catchAll', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  return app;
};

module.exports = createApp;
