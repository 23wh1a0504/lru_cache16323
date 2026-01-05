class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.operations = [];
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }

  get(key) {
    const operation = {
      type: 'GET',
      key,
      timestamp: new Date().toISOString()
    };

    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      
      this.hits++;
      operation.result = 'HIT';
      operation.value = value;
    } else {
      this.misses++;
      operation.result = 'MISS';
      operation.value = null;
    }

    this.operations.push(operation);
    return operation;
  }

  put(key, value) {
    const operation = {
      type: 'PUT',
      key,
      value,
      timestamp: new Date().toISOString()
    };

    if (this.cache.has(key)) {
      // Remove existing key to re-insert at end
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      this.evictions++;
      operation.evictedKey = firstKey;
    }

    this.cache.set(key, value);
    operation.result = 'STORED';
    this.operations.push(operation);
    return operation;
  }

  delete(key) {
    const operation = {
      type: 'DELETE',
      key,
      timestamp: new Date().toISOString()
    };

    const deleted = this.cache.delete(key);
    operation.result = deleted ? 'DELETED' : 'NOT_FOUND';
    this.operations.push(operation);
    return operation;
  }

  clear() {
    const operation = {
      type: 'CLEAR',
      timestamp: new Date().toISOString()
    };

    this.cache.clear();
    this.operations = [];
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
    
    operation.result = 'CLEARED';
    this.operations.push(operation);
    return operation;
  }

  getStats() {
    return {
      size: this.cache.size,
      capacity: this.capacity,
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions,
      hitRatio: this.hits + this.misses > 0 
        ? (this.hits / (this.hits + this.misses)).toFixed(2) 
        : 0,
      items: Array.from(this.cache.entries()).map(([key, value], index) => ({
        key,
        value,
        position: index + 1
      }))
    };
  }

  getRecentOperations(count = 10) {
    return this.operations.slice(-count).reverse();
  }

  peek(key) {
    return this.cache.has(key) ? this.cache.get(key) : null;
  }

  toArray() {
    return Array.from(this.cache.entries());
  }
}

module.exports = LRUCache;