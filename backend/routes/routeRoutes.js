/**
 * Route Definitions
 */

import express from 'express';
import {
  calculateRoutes,
  getLocations,
  getVehicles,
  getPresets
} from '../controllers/routeController.js';

const router = express.Router();

router.post('/', calculateRoutes);
router.post('/calculate', calculateRoutes);
router.get('/locations', getLocations);
router.get('/vehicles', getVehicles);
router.get('/presets', getPresets);

export default router;
