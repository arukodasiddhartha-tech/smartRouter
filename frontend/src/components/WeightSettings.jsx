import React from 'react';
import { Sliders, Clock, DollarSign, Ruler, Leaf, RotateCcw } from 'lucide-react';

export function WeightSettings({ customWeights, setCustomWeights }) {
  const time = customWeights.time ?? 35;
  const cost = customWeights.cost ?? 30;
  const distance = customWeights.distance ?? 20;
  const emissions = customWeights.emissions ?? 15;

  const total = time + cost + distance + emissions || 1;
  const timePct = Math.round((time / total) * 100);
  const costPct = Math.round((cost / total) * 100);
  const distPct = Math.round((distance / total) * 100);
  const ecoPct = 100 - timePct - costPct - distPct;

  const handleSlider = (field, val) => {
    setCustomWeights((prev) => ({
      ...prev,
      [field]: Number(val)
    }));
  };

  const handleReset = () => {
    setCustomWeights({
      time: 35,
      cost: 30,
      distance: 20,
      emissions: 15
    });
  };

  return (
    <div className="space-y-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-purple-400" /> Multi-Attribute Weight Tuning
        </label>
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-2.5 h-2.5" /> Balanced
        </button>
      </div>

      <div className="space-y-2.5">
        {/* Time slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" /> Time Importance
            </span>
            <span className="font-semibold text-emerald-400">{timePct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={time}
            onChange={(e) => handleSlider('time', e.target.value)}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Cost slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-400" /> Cost Importance (Fuel + Tolls)
            </span>
            <span className="font-semibold text-amber-400">{costPct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={cost}
            onChange={(e) => handleSlider('cost', e.target.value)}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Distance slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 flex items-center gap-1">
              <Ruler className="w-3 h-3 text-blue-400" /> Distance Importance
            </span>
            <span className="font-semibold text-blue-400">{distPct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={distance}
            onChange={(e) => handleSlider('distance', e.target.value)}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Emissions slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300 flex items-center gap-1">
              <Leaf className="w-3 h-3 text-teal-400" /> Carbon Emissions (CO₂)
            </span>
            <span className="font-semibold text-teal-400">{ecoPct}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={emissions}
            onChange={(e) => handleSlider('emissions', e.target.value)}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>
      </div>
    </div>
  );
}

export default WeightSettings;
