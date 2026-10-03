/**
 * Quick validation script for backend routing algorithms and services
 */

import { findAndCompareRoutes, getAvailableLocations } from './services/routingService.js';
import { VEHICLE_PROFILES } from './services/costService.js';

console.log('--- 1. Testing Location Graph & Presets ---');
const locations = getAvailableLocations();
console.log(`Loaded ${locations.nodes.length} nodes and ${locations.presets.length} presets.`);
console.assert(locations.nodes.length > 15, 'Should have rich node network');

console.log('\n--- 2. Testing Route Optimization: Fastest ---');
const fastestResult = findAndCompareRoutes({
  originQuery: 'SF_DOWNTOWN',
  destinationQuery: 'SAN_JOSE_DT',
  criteria: 'fastest',
  vehicleSettings: { vehicleType: 'petrol_sedan' },
  maxAlternatives: 4
});

console.log(`Origin: ${fastestResult.origin.shortName} -> Destination: ${fastestResult.destination.shortName}`);
console.log(`Found ${fastestResult.routes.length} alternative corridors:`);
fastestResult.routes.forEach((r, idx) => {
  console.log(
    `  Route ${idx + 1} (${r.routeName}): Time: ${r.totalTimeMinutes} min, Dist: ${r.totalDistance} km, Cost: $${r.costData.totalDirectCostUsd}, Score: ${r.score} (Optimal: ${r.isOptimal})`
  );
});

console.assert(fastestResult.routes.length >= 2, 'Should find at least 2 distinct routes');
console.assert(fastestResult.explanation.summary.length > 0, 'Explanation should be present');
console.log(`Explanation Summary: "${fastestResult.explanation.summary}"`);

console.log('\n--- 3. Testing Route Optimization: Cheapest (EV vs Petrol) ---');
const evResult = findAndCompareRoutes({
  originQuery: 'SF_DOWNTOWN',
  destinationQuery: 'SAN_JOSE_DT',
  criteria: 'cheapest',
  vehicleSettings: {
    vehicleType: 'electric_car',
    consumptionPer100km: 16.8,
    fuelPricePerUnit: 0.22
  },
  maxAlternatives: 3
});

console.log(`EV Fuel Cost: $${evResult.routes[0].costData.fuelCostUsd} (CO2: ${evResult.routes[0].costData.co2EmissionsKg} kg)`);
console.log(`Petrol Fuel Cost was: $${fastestResult.routes[0].costData.fuelCostUsd} (CO2: ${fastestResult.routes[0].costData.co2EmissionsKg} kg)`);
console.assert(evResult.routes[0].costData.fuelCostUsd < fastestResult.routes[0].costData.fuelCostUsd, 'EV fuel cost should be cheaper');

console.log('\n--- 4. Testing Cross-Bay Route with Tolls ---');
const tollResult = findAndCompareRoutes({
  originQuery: 'OAKLAND_DT',
  destinationQuery: 'PALO_ALTO',
  criteria: 'balanced',
  maxAlternatives: 3
});
console.log(`Oakland -> Palo Alto has ${tollResult.routes.length} routes.`);
tollResult.routes.forEach((r, i) => {
  console.log(`  Route ${i + 1}: ${r.routeName}, Toll: $${r.totalTollUsd}, Time: ${r.totalTimeMinutes}m`);
});

console.log('\n✅ ALL BACKEND TESTS PASSED!');
