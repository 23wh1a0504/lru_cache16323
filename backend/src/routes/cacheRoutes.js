const express = require('express');
const router = express.Router();
const LRUCache = require('../cache/LRUCache');

// Initialize cache with capacity from config or default
const config = require('../config');
const cache = new LRUCache(config.MAX_CACHE_SIZE);

// GET cache stats and items
router.get('/stats', (req, res) => {
  try {
    const stats = cache.getStats();
    res.json({
      success: true,
      ...stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET specific key
router.get('/:key', (req, res) => {
  try {
    const { key } = req.params;
    const operation = cache.get(key);
    
    res.json({
      success: true,
      operation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT (set) key-value pair
router.put('/:key', express.json(), (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    if (value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Value is required'
      });
    }
    
    const operation = cache.put(key, value);
    
    res.json({
      success: true,
      operation,
      stats: cache.getStats()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE specific key
router.delete('/:key', (req, res) => {
  try {
    const { key } = req.params;
    const operation = cache.delete(key);
    
    res.json({
      success: true,
      operation,
      stats: cache.getStats()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST clear cache
router.post('/clear', (req, res) => {
  try {
    const operation = cache.clear();
    
    res.json({
      success: true,
      operation,
      stats: cache.getStats()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET recent operations
router.get('/operations/recent', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const operations = cache.getRecentOperations(limit);
    
    res.json({
      success: true,
      operations,
      count: operations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST update cache capacity
router.post('/capacity', express.json(), (req, res) => {
  try {
    const { capacity } = req.body;
    
    if (!capacity || capacity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid capacity (positive number) is required'
      });
    }
    
    // Create new cache with updated capacity
    const oldStats = cache.getStats();
    const oldItems = cache.toArray();
    
    // Create new cache with new capacity
    const newCache = new LRUCache(capacity);
    
    // Transfer items (up to new capacity, maintaining LRU order)
    const itemsToTransfer = oldItems.slice(-capacity);
    itemsToTransfer.forEach(([key, value]) => {
      newCache.put(key, value);
    });
    
    // Replace the cache reference
    Object.assign(cache, newCache);
    
    res.json({
      success: true,
      message: `Cache capacity updated to ${capacity}`,
      oldCapacity: config.MAX_CACHE_SIZE,
      newCapacity: capacity,
      stats: cache.getStats()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;