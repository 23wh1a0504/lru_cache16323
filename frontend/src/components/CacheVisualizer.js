import React from 'react';
import { FaDatabase, FaInfoCircle, FaArrowRight, FaExchangeAlt } from 'react-icons/fa';

const CacheVisualizer = ({ cacheItems, capacity }) => {
  const getItemClass = (position, total) => {
    if (total === 0) return 'cache-item';
    if (position === 1) return 'cache-item lru'; // Least Recently Used
    if (position === total) return 'cache-item mru'; // Most Recently Used
    return 'cache-item';
  };

  if (!cacheItems || cacheItems.length === 0) {
    return (
      <div className="visualizer-section">
        <div className="section-title">
          <FaDatabase />
          <h3>Cache Visualization</h3>
          <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#6b7280' }}>
            Empty • Capacity: {capacity}
          </span>
        </div>
        <div className="empty-cache">
          <div style={{ fontSize: '3rem', color: '#e5e7eb', marginBottom: '15px' }}>
            <FaDatabase />
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Cache is empty. Add items to visualize the LRU algorithm.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="visualizer-section">
      <div className="section-title">
        <FaDatabase />
        <h3>Cache Visualization</h3>
        <span style={{ 
          marginLeft: 'auto', 
          fontSize: '0.9rem', 
          background: '#f3f4f6',
          padding: '4px 12px',
          borderRadius: '20px',
          color: '#4b5563'
        }}>
          {cacheItems.length} / {capacity} items
        </span>
      </div>
      
      <div className="cache-items">
        {cacheItems.map((item) => (
          <div key={item.key} className={getItemClass(item.position, cacheItems.length)}>
            <div className="cache-item-position">
              #{item.position}
            </div>
            <div className="cache-item-key">{item.key}</div>
            <div className="cache-item-value">
              {typeof item.value === 'object' 
                ? JSON.stringify(item.value) 
                : String(item.value)}
            </div>
            <div className="cache-item-status">
              {item.position === 1 ? 'LRU' : 
               item.position === cacheItems.length ? 'MRU' : 
               `Position ${item.position}`}
            </div>
          </div>
        ))}
      </div>

      <div className="cache-explanation">
        <h4><FaInfoCircle /> Understanding the Flow</h4>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          margin: '20px 0',
          padding: '15px',
          background: 'linear-gradient(90deg, #fef3c7, #dbeafe)',
          borderRadius: '10px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="cache-item lru" style={{ transform: 'scale(0.9)', margin: '0 auto' }}>
              <div className="cache-item-key">LRU</div>
              <div className="cache-item-value">Next to evict</div>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '5px', color: '#92400e' }}>
              Least Recently Used
            </div>
          </div>
          
          <FaArrowRight style={{ color: '#6b7280', fontSize: '1.5rem' }} />
          
          <div style={{ textAlign: 'center' }}>
            <div className="cache-item" style={{ transform: 'scale(0.8)', margin: '0 auto' }}>
              <div className="cache-item-key">Items</div>
              <div className="cache-item-value">Middle items</div>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '5px', color: '#374151' }}>
              Ordered by recency
            </div>
          </div>
          
          <FaArrowRight style={{ color: '#6b7280', fontSize: '1.5rem' }} />
          
          <div style={{ textAlign: 'center' }}>
            <div className="cache-item mru" style={{ transform: 'scale(0.9)', margin: '0 auto' }}>
              <div className="cache-item-key">MRU</div>
              <div className="cache-item-value">Most recent</div>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '5px', color: '#065f46' }}>
              Most Recently Used
            </div>
          </div>
        </div>
        
        <div style={{ 
          background: '#f8fafc', 
          padding: '15px', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--primary-color)'
        }}>
          <p style={{ marginBottom: '10px' }}>
            <FaExchangeAlt style={{ marginRight: '8px', color: '#6b7280' }} />
            <strong>How it works:</strong> When cache reaches capacity ({capacity} items), 
            the LRU (oldest) item is automatically evicted to make room for new entries.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            marginTop: '15px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                borderRadius: '4px',
                margin: '0 auto 5px'
              }}></div>
              <span style={{ fontSize: '0.9rem' }}>LRU (Evict next)</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                borderRadius: '4px',
                margin: '0 auto 5px'
              }}></div>
              <span style={{ fontSize: '0.9rem' }}>Middle Items</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '4px',
                margin: '0 auto 5px'
              }}></div>
              <span style={{ fontSize: '0.9rem' }}>MRU (Most recent)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheVisualizer;