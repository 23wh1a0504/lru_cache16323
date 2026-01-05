import React, { useState } from 'react';
import { 
  FaPlus, FaSearch, FaSync, FaBroom,
  FaKey, FaHashtag, FaRandom, FaDatabase
} from 'react-icons/fa';

const CacheControls = ({ 
  onGet, 
  onPut, 
  onClear, 
  onUpdateCapacity,
  isLoading 
}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [capacity, setCapacity] = useState('');
  const [getKey, setGetKey] = useState('');

  const handlePut = () => {
    if (key && value) {
      onPut(key, value);
      setKey('');
      setValue('');
    }
  };

  const handleGet = () => {
    if (getKey) {
      onGet(getKey);
      setGetKey('');
    }
  };

  const handleRandom = () => {
    const randomKey = `key_${Math.floor(Math.random() * 1000)}`;
    const randomValue = `value_${Math.floor(Math.random() * 10000)}`;
    onPut(randomKey, randomValue);
  };

  const handleUpdateCapacity = () => {
    if (capacity && parseInt(capacity) > 0) {
      onUpdateCapacity(parseInt(capacity));
      setCapacity('');
    }
  };

  return (
    <div className="controls-section">
      <div className="control-group">
        <div className="section-title">
          <FaPlus />
          <h3>Add Cache Item</h3>
        </div>
        
        <div className="form-group">
          <label><FaKey /> Key</label>
          <input
            type="text"
            className="form-control"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter cache key (e.g., 'user', 'session')"
          />
        </div>
        
        <div className="form-group">
          <label><FaHashtag /> Value</label>
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter cache value"
          />
        </div>
        
        <div className="btn-group">
          <button 
            className="btn btn-primary" 
            onClick={handlePut}
            disabled={isLoading || !key || !value}
          >
            <FaPlus /> Add to Cache
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={handleRandom}
            disabled={isLoading}
          >
            <FaRandom /> Add Random Item
          </button>
        </div>

        <div className="quick-suggestions" style={{ marginTop: '15px' }}>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
            <FaKey /> Try these keys:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                setKey('username');
                setValue('john_doe');
              }}
            >
              username = john_doe
            </button>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                setKey('session_id');
                setValue('abc123xyz');
              }}
            >
              session_id = abc123xyz
            </button>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                setKey('counter');
                setValue('42');
              }}
            >
              counter = 42
            </button>
          </div>
        </div>
      </div>

      <div className="control-group">
        <div className="section-title">
          <FaSearch />
          <h3>Get Cache Item</h3>
        </div>
        
        <div className="form-group">
          <label><FaDatabase /> Key to Retrieve</label>
          <input
            type="text"
            className="form-control"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
            placeholder="Enter key to retrieve from cache"
          />
        </div>
        
        <div className="btn-group">
          <button 
            className="btn btn-success" 
            onClick={handleGet}
            disabled={isLoading || !getKey}
          >
            <FaSearch /> Get from Cache
          </button>
        </div>

        <div className="quick-suggestions" style={{ marginTop: '15px' }}>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
            <FaSearch /> Quick access:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-outline-success btn-sm"
              onClick={() => setGetKey('username')}
            >
              Get username
            </button>
            <button 
              className="btn btn-outline-success btn-sm"
              onClick={() => setGetKey('session_id')}
            >
              Get session_id
            </button>
            <button 
              className="btn btn-outline-success btn-sm"
              onClick={() => setGetKey('counter')}
            >
              Get counter
            </button>
          </div>
        </div>
      </div>

      <div className="control-group">
        <div className="section-title">
          <FaSync />
          <h3>Cache Settings</h3>
        </div>
        
        <div className="form-group">
          <label><FaDatabase /> Cache Capacity</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              className="form-control"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter new size"
              min="1"
              max="20"
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-warning"
              onClick={handleUpdateCapacity}
              disabled={isLoading || !capacity || parseInt(capacity) <= 0}
              style={{ whiteSpace: 'nowrap' }}
            >
              <FaSync /> Update
            </button>
          </div>
          <small style={{ color: '#6b7280', display: 'block', marginTop: '5px' }}>
            Maximum number of items cache can hold
          </small>
        </div>
        
        <div className="form-group" style={{ marginTop: '15px' }}>
          <label><FaBroom /> Cache Management</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Clear all items from cache?')) {
                  onClear();
                }
              }}
              disabled={isLoading}
              style={{ flex: 1 }}
            >
              <FaBroom /> Clear All Cache
            </button>
          </div>
          <small style={{ color: '#6b7280', display: 'block', marginTop: '5px' }}>
            Removes all items from cache
          </small>
        </div>
      </div>
    </div>
  );
};

export default CacheControls;