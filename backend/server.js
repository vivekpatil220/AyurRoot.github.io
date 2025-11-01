import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.js';
import collectionRoutes from './routes/collections.js';
import processingBatchRoutes from './routes/processingBatches.js';
import labTestRoutes from './routes/labTests.js';
import productRoutes from './routes/products.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data directory
const DATA_DIR = join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files if they don't exist
const dataFiles = [
  'collections.json',
  'processingBatches.json',
  'labTests.json',
  'products.json',
  'users.json'
];

dataFiles.forEach(file => {
  const filePath = join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/processing-batches', processingBatchRoutes);
app.use('/api/lab-tests', labTestRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HerbTrace API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'HerbTrace Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      collections: '/api/collections',
      processingBatches: '/api/processing-batches',
      labTests: '/api/lab-tests',
      products: '/api/products'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HerbTrace Backend Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
});

