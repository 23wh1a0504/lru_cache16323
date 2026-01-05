const express = require('express');
const cors = require('cors');
const config = require('./config');
const cacheRoutes = require('./routes/cacheRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cache', cacheRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'LRU Cache API',
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'LRU Cache Visualizer API',
    endpoints: {
      'GET /api/cache/stats': 'Get cache statistics and items',
      'GET /api/cache/:key': 'Get value for a key',
      'PUT /api/cache/:key': 'Set key-value pair',
      'DELETE /api/cache/:key': 'Delete a key',
      'POST /api/cache/clear': 'Clear entire cache',
      'GET /api/cache/operations/recent': 'Get recent operations',
      'POST /api/cache/capacity': 'Update cache capacity'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`🌐 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 CORS Origin: ${config.CORS_ORIGIN}`);
  console.log(`📊 Cache capacity: ${config.MAX_CACHE_SIZE}`);
});