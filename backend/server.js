/**
 * RouteOpt Backend Server
 * Express application exposing REST API for Route Comparison and Optimization
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routeRoutes from './routes/routeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/routes', routeRoutes);

// Health check endpoint
// Health check endpoint per specification
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Route Comparison & Optimization Engine',
    version: '1.0.0'
  });
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 RouteOpt Backend Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Routes API:   http://localhost:${PORT}/api/routes/locations`);
  console.log(`====================================================`);
});
