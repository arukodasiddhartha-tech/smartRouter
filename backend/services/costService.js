/**
 * Cost and Emissions Calculation Service
 * Models realistic vehicle energy consumption, monetary expense, and environmental impact.
 * Implements the formulas:
 *   fuel_required = distance / mileage
 *   fuel_cost = fuel_required * fuel_price
 *   total_cost = fuel_cost + toll_cost
 */

export const VEHICLE_PROFILES = {
  car: {
    id: 'car',
    name: 'Car (Petrol)',
    category: 'Petrol',
    fuelType: 'petrol',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 15.0, // km / litre (corresponds to ~6.67 L/100km)
    defaultFuelPrice: 105.0, // ₹ per litre
    consumptionPer100km: 6.67,
    fuelPricePerUnit: 105.0,
    co2KgPerUnit: 2.31, // 2.31 kg CO2 per litre
    congestionSensitivity: 0.25,
    wearCostPerKm: 1.5 // ₹1.5/km
  },
  diesel_suv: {
    id: 'diesel_suv',
    name: 'SUV (Diesel)',
    category: 'Diesel',
    fuelType: 'diesel',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 12.0, // km / litre
    defaultFuelPrice: 94.0, // ₹ per litre
    consumptionPer100km: 8.33,
    fuelPricePerUnit: 94.0,
    co2KgPerUnit: 2.68,
    congestionSensitivity: 0.20,
    wearCostPerKm: 2.0
  },
  electric_car: {
    id: 'electric_car',
    name: 'Electric Vehicle (EV)',
    category: 'Electric',
    fuelType: 'electric',
    unit: 'kWh',
    unitName: 'kWh',
    defaultMileage: 6.5, // km / kWh (battery efficiency)
    defaultFuelPrice: 8.0, // ₹ per kWh
    consumptionPer100km: 15.38,
    fuelPricePerUnit: 8.0,
    co2KgPerUnit: 0.045, // clean grid mix
    congestionSensitivity: 0.05, // regenerative braking
    wearCostPerKm: 0.8
  },
  motorcycle: {
    id: 'motorcycle',
    name: 'Motorcycle / Two-Wheeler',
    category: 'Petrol',
    fuelType: 'petrol',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 45.0, // km / litre
    defaultFuelPrice: 105.0, // ₹ per litre
    consumptionPer100km: 2.22,
    fuelPricePerUnit: 105.0,
    co2KgPerUnit: 2.31,
    congestionSensitivity: 0.10,
    wearCostPerKm: 0.5
  },
  hybrid_sedan: {
    id: 'hybrid_sedan',
    name: 'Hybrid Sedan',
    category: 'Hybrid',
    fuelType: 'hybrid',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 22.0, // km / litre
    defaultFuelPrice: 105.0,
    consumptionPer100km: 4.55,
    fuelPricePerUnit: 105.0,
    co2KgPerUnit: 2.31,
    congestionSensitivity: 0.12,
    wearCostPerKm: 1.2
  },
  commercial_truck: {
    id: 'commercial_truck',
    name: 'Commercial Freight Truck',
    category: 'Commercial',
    fuelType: 'diesel',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 4.0, // km / litre
    defaultFuelPrice: 94.0,
    consumptionPer100km: 25.0,
    fuelPricePerUnit: 94.0,
    co2KgPerUnit: 2.68,
    congestionSensitivity: 0.35,
    wearCostPerKm: 5.0
  },
  petrol_sedan: {
    id: 'petrol_sedan',
    name: 'Petrol Sedan (e.g. Honda City)',
    category: 'Gasoline',
    fuelType: 'petrol',
    unit: 'L',
    unitName: 'litres',
    defaultMileage: 15.0,
    defaultFuelPrice: 105.0,
    consumptionPer100km: 7.5,
    fuelPricePerUnit: 105.0,
    co2KgPerUnit: 2.31,
    congestionSensitivity: 0.25,
    wearCostPerKm: 1.5
  }
};

const PROFILE_ALIASES = {
  car: 'car',
  sedan: 'car',
  petrol: 'car',
  suv: 'diesel_suv',
  diesel: 'diesel_suv',
  ev: 'electric_car',
  bike: 'motorcycle',
  truck: 'commercial_truck',
  hybrid: 'hybrid_sedan'
};

export function resolveVehicleProfile(key) {
  if (!key) return VEHICLE_PROFILES.car;
  const normalizedKey = String(key).toLowerCase().trim();
  if (VEHICLE_PROFILES[normalizedKey]) {
    return VEHICLE_PROFILES[normalizedKey];
  }
  const aliasedKey = PROFILE_ALIASES[normalizedKey];
  if (aliasedKey && VEHICLE_PROFILES[aliasedKey]) {
    return VEHICLE_PROFILES[aliasedKey];
  }
  return VEHICLE_PROFILES.car;
}

/**
 * Calculates comprehensive costs and emissions for a route
 * @param {Object} route - Contains totalDistance, totalTimeMinutes, totalTollUsd, edges
 * @param {Object} customVehicleSettings - Optional overrides for vehicle type, fuel price, mileage
 */
export function calculateRouteCost(route, customVehicleSettings = {}) {
  const profileKey = customVehicleSettings.type || customVehicleSettings.vehicleType || 'car';
  const baseProfile = resolveVehicleProfile(profileKey);

  // Mileage (km / L or km / kWh)
  let mileage = Number(customVehicleSettings.mileage);
  if (!mileage || mileage <= 0) {
    if (customVehicleSettings.consumptionPer100km && Number(customVehicleSettings.consumptionPer100km) > 0) {
      mileage = 100 / Number(customVehicleSettings.consumptionPer100km);
    } else {
      mileage = baseProfile.defaultMileage;
    }
  }

  // Fuel / Energy Price (₹ / L or ₹ / kWh)
  let fuelPrice = customVehicleSettings.fuelPrice != null
    ? Number(customVehicleSettings.fuelPrice)
    : (customVehicleSettings.fuelPricePerUnit != null
        ? Number(customVehicleSettings.fuelPricePerUnit)
        : baseProfile.defaultFuelPrice);

  if (fuelPrice < 0) fuelPrice = baseProfile.defaultFuelPrice;

  const distanceKm = Math.max(0, Number(route.totalDistance) || 0);
  const tollCost = Math.max(0, Number(route.totalTollUsd != null ? route.totalTollUsd : (route.toll_cost || 0)));

  // Calculate congestion multiplier across edges
  let weightedCongestion = 1.0;
  if (route.edges && route.edges.length > 0) {
    const totalDist = route.edges.reduce((sum, e) => sum + (e.distance_km || 0), 0);
    const sumCongestDist = route.edges.reduce(
      (sum, e) => sum + ((e.distance_km || 0) * (e.congestion_factor || 1.0)),
      0
    );
    weightedCongestion = totalDist > 0 ? (sumCongestDist / totalDist) : 1.0;
  }

  // Energy consumption factoring in congestion
  const congestionExtraRatio = Math.max(0, weightedCongestion - 1.0) * baseProfile.congestionSensitivity;
  const effectiveMileage = Math.max(0.5, mileage / (1 + congestionExtraRatio));

  // Core formula:
  // fuel_required = distance / mileage
  // fuel_cost = fuel_required * fuel_price
  // total_cost = fuel_cost + toll_cost
  const fuelRequired = distanceKm / effectiveMileage;
  const fuelCost = fuelRequired * fuelPrice;
  const totalCost = fuelCost + tollCost;

  // Maintenance wear cost
  const wearCost = distanceKm * baseProfile.wearCostPerKm;
  const totalOperatingCost = totalCost + wearCost;

  // Environmental emissions (kg CO2)
  const co2EmissionsKg = fuelRequired * baseProfile.co2KgPerUnit;

  return {
    vehicleType: baseProfile.id,
    vehicleName: baseProfile.name,
    fuelType: customVehicleSettings.fuelType || baseProfile.fuelType,
    fuelUnit: baseProfile.unit,
    fuelUnitName: baseProfile.unitName,
    mileage: parseFloat(mileage.toFixed(1)),
    effectiveMileage: parseFloat(effectiveMileage.toFixed(1)),
    fuelPrice: parseFloat(fuelPrice.toFixed(2)),
    fuelRequired: parseFloat(fuelRequired.toFixed(2)),
    energyConsumed: parseFloat(fuelRequired.toFixed(2)), // compatibility alias
    fuelCost: parseFloat(fuelCost.toFixed(2)),
    fuelCostUsd: parseFloat(fuelCost.toFixed(2)), // compatibility alias
    tollCost: parseFloat(tollCost.toFixed(2)),
    tollCostUsd: parseFloat(tollCost.toFixed(2)), // compatibility alias
    wearCost: parseFloat(wearCost.toFixed(2)),
    wearCostUsd: parseFloat(wearCost.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    totalDirectCostUsd: parseFloat(totalCost.toFixed(2)), // compatibility alias
    totalOperatingCost: parseFloat(totalOperatingCost.toFixed(2)),
    totalOperatingCostUsd: parseFloat(totalOperatingCost.toFixed(2)),
    co2EmissionsKg: parseFloat(co2EmissionsKg.toFixed(2)),
    avgCongestionMultiplier: parseFloat(weightedCongestion.toFixed(2)),
    isEstimate: true,
    currency: '₹',
    disclaimer: 'Estimated cost based on distance, nominal vehicle mileage, toll data, and fuel pricing.'
  };
}
