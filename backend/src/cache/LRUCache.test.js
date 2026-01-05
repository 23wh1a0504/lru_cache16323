const LRUCache = require('./LRUCache');

describe('LRUCache', () => {
  let cache;

  beforeEach(() => {
    cache = new LRUCache(3);
  });

  test('should store and retrieve values', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    
    expect(cache.get('a').value).toBe(1);
    expect(cache.get('b').value).toBe(2);
  });

  test('should update existing key', () => {
    cache.put('a', 1);
    cache.put('a', 2);
    
    expect(cache.get('a').value).toBe(2);
  });

  test('should evict least recently used item when capacity is exceeded', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    cache.put('d', 4); // Should evict 'a'
    
    expect(cache.get('a').result).toBe('MISS');
    expect(cache.get('b').value).toBe(2);
    expect(cache.get('c').value).toBe(3);
    expect(cache.get('d').value).toBe(4);
  });

  test('should mark get as HIT when key exists', () => {
    cache.put('a', 1);
    const result = cache.get('a');
    
    expect(result.result).toBe('HIT');
    expect(result.value).toBe(1);
  });

  test('should mark get as MISS when key does not exist', () => {
    const result = cache.get('nonexistent');
    
    expect(result.result).toBe('MISS');
    expect(result.value).toBeNull();
  });

  test('should track statistics correctly', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.get('a'); // HIT
    cache.get('c'); // MISS
    cache.put('c', 3);
    cache.put('d', 4); // Evicts 'b'
    
    const stats = cache.getStats();
    
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(1);
    expect(stats.evictions).toBe(1);
    expect(stats.size).toBe(3);
  });

  test('should clear cache correctly', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.clear();
    
    const stats = cache.getStats();
    
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
  });

  test('should delete specific key', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    
    const deleteResult = cache.delete('a');
    expect(deleteResult.result).toBe('DELETED');
    
    expect(cache.get('a').result).toBe('MISS');
    expect(cache.get('b').value).toBe(2);
  });

  test('should return items in correct order (LRU to MRU)', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    
    // Access 'a' to make it MRU
    cache.get('a');
    
    // Add new item to evict LRU ('b')
    cache.put('d', 4);
    
    const items = cache.toArray();
    // Should be [['c', 3], ['a', 1], ['d', 4]]
    
    expect(items[0][0]).toBe('c'); // LRU
    expect(items[2][0]).toBe('d'); // MRU
  });
});