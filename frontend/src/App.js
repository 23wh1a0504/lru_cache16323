import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaMemory, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import CacheVisualizer from './components/CacheVisualizer';
import CacheControls from './components/CacheControls';
import CacheStats from './components/CacheStats';
import './styles.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [cacheData, setCacheData] = useState(null);
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCacheData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/cache/stats`);
      setCacheData(response.data);
      
      // Fetch recent operations
      const opsResponse = await axios.get(`${API_BASE_URL}/cache/operations/recent?limit=10`);
      setOperations(opsResponse.data.operations);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch cache data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleGet = async (key) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/cache/${key}`);
      showMessage(`Get operation: ${response.data.operation.result}`, 
                 response.data.operation.result === 'HIT' ? 'success' : 'error');
      await fetchCacheData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get item');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePut = async (key, value) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/cache/${key}`, { value });
      const op = response.data.operation;
      let message = `Set ${key} = ${value}`;
      if (op.evictedKey) {
        message += ` (evicted ${op.evictedKey})`;
      }
      showMessage(message, 'success');
      await fetchCacheData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to set item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (key) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/cache/${key}`);
      showMessage(`Deleted key: ${key}`, 'success');
      await fetchCacheData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to clear the entire cache?')) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/cache/clear`);
      showMessage('Cache cleared successfully', 'success');
      await fetchCacheData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to clear cache');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCapacity = async (capacity) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/cache/capacity`, { capacity });
      showMessage(response.data.message, 'success');
      await fetchCacheData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update capacity');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on component mount
  useEffect(() => {
    fetchCacheData();
  }, [fetchCacheData]);

  return (
    <div className="app">
      <header className="header">
        <h1>
          <FaMemory /> LRU Cache Visualizer
        </h1>
        <p>
          Interactive visualization of Least Recently Used cache algorithm. 
          See how items move through the cache and get evicted when capacity is reached.
        </p>
      </header>

      {/* Toast Messages */}
      {error && (
        <div className="toast">
          <div className="error">
            <FaExclamationTriangle /> {error}
          </div>
        </div>
      )}
      
      {success && (
        <div className="toast">
          <div className="success">
            <FaCheckCircle /> {success}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      <div className="cache-container">
        <CacheVisualizer 
          cacheItems={cacheData?.items || []} 
          capacity={cacheData?.capacity || 10}
        />
        
        <CacheControls
          onGet={handleGet}
          onPut={handlePut}
          onClear={handleClear}  
          onUpdateCapacity={handleUpdateCapacity}
          isLoading={isLoading}
        />
      </div>

      <CacheStats 
        stats={cacheData}
        operations={operations}
      />

      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        color: 'white',
        opacity: 0.8,
        fontSize: '0.9rem'
      }}>
        <p>
          LRU Cache Visualizer • Built with React & Node.js • 
          Items flow from LRU (least recently used) to MRU (most recently used)
        </p>
      </footer>
    </div>
  );
}

export default App;