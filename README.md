# LRU Cache Visualizer

An interactive web application that visualizes the Least Recently Used (LRU) cache algorithm in real-time.

![LRU Cache Visualizer](https://img.shields.io/badge/status-active-success)
![React](https://img.shields.io/badge/frontend-react-blue)
![Node.js](https://img.shields.io/badge/backend-node.js-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 📋 Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Frontend
- **Real-time Visualization**: See cache items move from LRU to MRU position
- **Interactive Controls**: Add, get, delete, and clear cache items
- **Statistics Dashboard**: View cache hits, misses, evictions, and hit ratio
- **Operation History**: Track recent cache operations with timestamps
- **Responsive Design**: Works on desktop and mobile devices

### Backend
- **RESTful API**: Complete CRUD operations for cache management
- **LRU Algorithm**: Efficient O(1) implementation using Map
- **Statistics Tracking**: Real-time performance metrics
- **Operation Logging**: Detailed audit trail of all operations
- **Configurable Capacity**: Dynamic cache size adjustment

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lru-cache-visualizer.git
cd lru-cache-visualizer