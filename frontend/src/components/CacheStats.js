import React from 'react';
import { 
  FaChartBar, 
  FaDatabase, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExchangeAlt,
  FaPercentage,
  FaHistory,
  FaClock,
  FaSearch,
  FaPlus,
  FaTrash,
  FaBroom
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CacheStats = ({ stats, operations }) => {
  if (!stats) return null;

  const chartData = {
    labels: ['Hits', 'Misses', 'Evictions'],
    datasets: [
      {
        label: 'Cache Operations',
        data: [stats.hits, stats.misses, stats.evictions],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',    // Green for hits
          'rgba(239, 68, 68, 0.7)',    // Red for misses
          'rgba(245, 158, 11, 0.7)',   // Yellow for evictions
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cache Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getOperationIcon = (type) => {
    switch(type) {
      case 'GET': return <FaSearch />;
      case 'PUT': return <FaPlus />;
      case 'DELETE': return <FaTrash />;
      case 'CLEAR': return <FaBroom />;
      default: return <FaClock />;
    }
  };

  const getResultColor = (result) => {
    switch(result) {
      case 'HIT':
      case 'STORED':
      case 'DELETED':
      case 'CLEARED':
        return 'text-green-600';
      case 'MISS':
      case 'NOT_FOUND':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="stats-operations-container">
      <div className="stats-section">
        <div className="section-title">
          <FaChartBar />
          <h3>Cache Statistics</h3>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.size}</div>
            <div className="stat-label">
              <FaDatabase /> Current Size
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.capacity}</div>
            <div className="stat-label">
              <FaDatabase /> Capacity
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#10b981' }}>
              {stats.hits}
            </div>
            <div className="stat-label">
              <FaCheckCircle /> Cache Hits
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ef4444' }}>
              {stats.misses}
            </div>
            <div className="stat-label">
              <FaTimesCircle /> Cache Misses
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>
              {stats.evictions}
            </div>
            <div className="stat-label">
              <FaExchangeAlt /> Evictions
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#7c3aed' }}>
              {stats.hitRatio}
            </div>
            <div className="stat-label">
              <FaPercentage /> Hit Ratio
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '25px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="operations-section">
        <div className="section-title">
          <FaHistory />
          <h3>Recent Operations</h3>
        </div>
        
        <div className="operations-list">
          {operations && operations.length > 0 ? (
            operations.map((op, index) => (
              <div key={index} className="operation-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className={`operation-type operation-${op.type.toLowerCase()}`}>
                    {getOperationIcon(op.type)} {op.type}
                  </div>
                  <div>
                    <strong>{op.key}</strong>
                    {op.value !== undefined && op.value !== null && (
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Value: {JSON.stringify(op.value)}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={`operation-result ${getResultColor(op.result)}`}>
                    {op.result}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {formatTime(op.timestamp)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cache" style={{ padding: '20px' }}>
              <FaHistory />
              <p>No operations yet. Perform actions to see history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CacheStats;