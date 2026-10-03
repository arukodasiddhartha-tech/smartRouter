import React from 'react';
import { Car, Fuel, Zap, Truck, RotateCcw } from 'lucide-react';

const VEHICLE_OPTIONS = [
  {
    id: 'petrol_sedan',
    name: 'Petrol Sedan',
    icon: Car,
    defaultConsumption: 7.5,
    unit: 'L/100km',
    defaultPrice: 1.48,
    priceUnit: '$/L'
  },
  {
    id: 'diesel_suv',
    name: 'Diesel SUV',
    icon: Car,
    defaultConsumption: 8.2,
    unit: 'L/100km',
    defaultPrice: 1.58,
    priceUnit: '$/L'
  },
  {
    id: 'electric_car',
    name: 'Electric Vehicle (EV)',
    icon: Zap,
    defaultConsumption: 16.8,
    unit: 'kWh/100km',
    defaultPrice: 0.22,
    priceUnit: '$/kWh'
  },
  {
    id: 'hybrid_sedan',
    name: 'Hybrid Vehicle',
    icon: Fuel,
    defaultConsumption: 4.4,
    unit: 'L/100km',
    defaultPrice: 1.48,
    priceUnit: '$/L'
  },
  {
    id: 'commercial_truck',
    name: 'Commercial Freight Truck',
    icon: Truck,
    defaultConsumption: 26.5,
    unit: 'L/100km',
    defaultPrice: 1.62,
    priceUnit: '$/L'
  }
];

export function VehicleSettings({ vehicleSettings, setVehicleSettings }) {
  const currentVehicleType = vehicleSettings.vehicleType || 'petrol_sedan';
  const activeDef = VEHICLE_OPTIONS.find((v) => v.id === currentVehicleType) || VEHICLE_OPTIONS[0];

  const handleVehicleChange = (typeId) => {
    const selected = VEHICLE_OPTIONS.find((v) => v.id === typeId);
    if (!selected) return;
    setVehicleSettings({
      vehicleType: selected.id,
      consumptionPer100km: selected.defaultConsumption,
      fuelPricePerUnit: selected.defaultPrice
    });
  };

  const handleReset = () => {
    setVehicleSettings({
      vehicleType: activeDef.id,
      consumptionPer100km: activeDef.defaultConsumption,
      fuelPricePerUnit: activeDef.defaultPrice
    });
  };

  return (
    <div className="space-y-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Car className="w-3.5 h-3.5 text-emerald-400" /> Vehicle & Energy Profile
        </label>
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
          title="Reset to vehicle defaults"
        >
          <RotateCcw className="w-2.5 h-2.5" /> Defaults
        </button>
      </div>

      {/* Vehicle Type Select */}
      <div className="grid grid-cols-1 gap-1.5">
        <select
          value={currentVehicleType}
          onChange={(e) => handleVehicleChange(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {VEHICLE_OPTIONS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.defaultConsumption} {v.unit})
            </option>
          ))}
        </select>
      </div>

      {/* Fuel Consumption & Price inputs */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <label className="block text-[10px] font-medium text-slate-400 mb-1">
            Consumption ({activeDef.unit})
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="100"
            value={vehicleSettings.consumptionPer100km ?? activeDef.defaultConsumption}
            onChange={(e) =>
              setVehicleSettings((prev) => ({
                ...prev,
                consumptionPer100km: parseFloat(e.target.value) || 0
              }))
            }
            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-medium text-slate-400 mb-1">
            Energy Price ({activeDef.priceUnit})
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="20"
            value={vehicleSettings.fuelPricePerUnit ?? activeDef.defaultPrice}
            onChange={(e) =>
              setVehicleSettings((prev) => ({
                ...prev,
                fuelPricePerUnit: parseFloat(e.target.value) || 0
              }))
            }
            className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {currentVehicleType === 'electric_car' && (
        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>Regenerative braking active: negligible congestion fuel penalty.</span>
        </div>
      )}
    </div>
  );
}

export default VehicleSettings;
