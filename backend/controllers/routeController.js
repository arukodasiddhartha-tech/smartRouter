/**
 * Route Controller
 * Handles incoming HTTP requests for route comparison, locations, and vehicle profiles.
 */

import { findAndCompareRoutes, getAvailableLocations } from '../services/routingService.js';
import { VEHICLE_PROFILES } from '../services/costService.js';
import { DEMO_PRESETS } from '../data/demoGraph.js';

export const calculateRoutes = async (req, res) => {
  try {
    const {
      origin,
      destination,
      optimization,
      criteria,
      vehicle,
      vehicleSettings,
      weights,
      customWeights,
      maxAlternatives = 4
    } = req.body;

    const originQuery = origin;
    const destQuery = destination;

    if (!originQuery || !destQuery) {
      return res.status(400).json({
        success: false,
        error: 'Both origin and destination are required parameters.'
      });
    }

    if (String(originQuery).trim().toLowerCase() === String(destQuery).trim().toLowerCase()) {
      return res.status(400).json({
        success: false,
        error: 'Origin and destination cannot be the same location.'
      });
    }

    // Determine optimization mode
    const activeOptimization = (optimization || criteria || 'overall').toLowerCase();

    // Merge vehicle settings
    const activeVehicle = {
      ...(vehicleSettings || {}),
      ...(vehicle || {})
    };

    // Validation for vehicle
    if (activeVehicle.mileage != null && Number(activeVehicle.mileage) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Vehicle mileage must be greater than 0.'
      });
    }

    if (activeVehicle.fuelPrice != null && Number(activeVehicle.fuelPrice) < 0) {
      return res.status(400).json({
        success: false,
        error: 'Fuel price cannot be negative.'
      });
    }

    // Process weights
    let activeWeights = customWeights || weights || null;
    if (activeWeights) {
      const rawDist = Math.max(0, Number(activeWeights.distance) || 0);
      const rawTime = Math.max(0, Number(activeWeights.time) || 0);
      const rawCost = Math.max(0, Number(activeWeights.cost) || 0);
      const totalWeight = rawDist + rawTime + rawCost;

      if (totalWeight > 0) {
        activeWeights = {
          distance: rawDist / totalWeight,
          time: rawTime / totalWeight,
          cost: rawCost / totalWeight
        };
      }
    }

    const result = findAndCompareRoutes({
      originQuery,
      destinationQuery: destQuery,
      criteria: activeOptimization,
      vehicleSettings: activeVehicle,
      customWeights: activeWeights,
      maxAlternatives: Math.min(Math.max(Number(maxAlternatives) || 4, 2), 6)
    });

    // Conforms directly to Section 11 format while preserving backwards compatibility
    return res.status(200).json({
      success: true,
      origin: result.origin,
      destination: result.destination,
      recommendedRoute: result.recommendedRoute,
      routes: result.routes,
      explanation: result.explanation,
      optimization: result.optimization,
      isDemoData: true,
      data: result
    });
  } catch (error) {
    console.error('Error in calculateRoutes:', error.message);
    return res.status(400).json({
      success: false,
      error: error.message || 'An error occurred during route calculation.'
    });
  }
};

export const getLocations = async (req, res) => {
  try {
    const data = getAvailableLocations();
    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getVehicles = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: Object.values(VEHICLE_PROFILES)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getPresets = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: DEMO_PRESETS
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
