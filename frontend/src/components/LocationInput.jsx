import React from 'react';
import { MapPin, Navigation, ArrowUpDown, X, ChevronDown } from 'lucide-react';

export function LocationInput({
  origin,
  setOrigin,
  destination,
  setDestination,
  availableNodes = [],
  onSwap
}) {
  return (
    <div className="space-y-3 relative">
      {/* Origin Input */}
      <div className="relative">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Origin (Start)
          </span>
          {origin && (
            <button
              type="button"
              onClick={() => setOrigin('')}
              className="text-slate-500 hover:text-slate-300 text-[10px]"
            >
              Clear
            </button>
          )}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
            <Navigation className="w-4 h-4" />
          </div>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition appearance-none cursor-pointer"
          >
            <option value="" disabled>Select Starting Point...</option>
            {availableNodes.map((node) => (
              <option key={`orig-${node.id}`} value={node.id}>
                {node.shortName} — ({node.category})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Swap Button (Absolute center right or between fields) */}
      <div className="flex justify-end -my-1 pr-3 relative z-10">
        <button
          type="button"
          onClick={onSwap}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-400 hover:text-emerald-400 transition shadow-sm"
          title="Swap Origin and Destination"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Destination Input */}
      <div className="relative">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Destination (End)
          </span>
          {destination && (
            <button
              type="button"
              onClick={() => setDestination('')}
              className="text-slate-500 hover:text-slate-300 text-[10px]"
            >
              Clear
            </button>
          )}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-400">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition appearance-none cursor-pointer"
          >
            <option value="" disabled>Select Destination...</option>
            {availableNodes.map((node) => (
              <option key={`dest-${node.id}`} value={node.id}>
                {node.shortName} — ({node.category})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationInput;
