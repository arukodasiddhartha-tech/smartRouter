/**
 * API Service for RouteOpt
 */

import axios from 'axios';

// Support both direct proxy and explicit backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

export const routeApi = {
  // Calculate routes
  async calculateRoutes({
    origin,
    destination,
    criteria = 'fastest',
    vehicleSettings = {},
    customWeights = null,
    maxAlternatives = 4
  }) {
    const response = await apiClient.post('/routes/calculate', {
      origin,
      destination,
      criteria,
      vehicleSettings,
      customWeights,
      maxAlternatives
    });
    return response.data;
  },

  // Get all geographic nodes & demo presets
  async getLocations() {
    const response = await apiClient.get('/routes/locations');
    return response.data;
  },

  // Get vehicle profiles
  async getVehicles() {
    const response = await apiClient.get('/routes/vehicles');
    return response.data;
  },

  // Get presets
  async getPresets() {
    const response = await apiClient.get('/routes/presets');
    return response.data;
  },

  // Health check
  async checkHealth() {
    const response = await apiClient.get('/health');
    return response.data;
  }
};

export default routeApi;
