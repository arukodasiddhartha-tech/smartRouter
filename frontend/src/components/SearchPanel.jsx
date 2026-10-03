import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  BarChart2,
  FileText,
  Route as RouteIcon
} from 'lucide-react';
import LocationInput from './LocationInput';
import OptimizationSelector from './OptimizationSelector';
import VehicleSettings from './VehicleSettings';
import WeightSettings from './WeightSettings';
import RouteCard from './RouteCard';
import LoadingState from './LoadingState';
import ErrorMessage from './ErrorMessage';

export function SearchPanel({
  origin,
  setOrigin,
  destination,
  setDestination,
  criteria,
  setCriteria,
  vehicleSettings,
  setVehicleSettings,
  customWeights,
  setCustomWeights,
  availableNodes = [],
  onSwapLocations,
  onSubmit,
  loading,
  error,
  routes = [],
  selectedRouteId,
  onSelectRoute,
  onHoverRoute,
  routeColors = [],
  activeTab,
  setActiveTab
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit();
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-800 overflow-hidden w-full lg:w-[460px] shrink-0">
      {/* Scrollable form and controls container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Origin & Destination */}
          <LocationInput
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            availableNodes={availableNodes}
            onSwap={onSwapLocations}
          />

          {/* Optimization Selector */}
          <OptimizationSelector criteria={criteria} setCriteria={setCriteria} />

          {/* Custom Weight Sliders (automatically visible when custom is selected) */}
          {criteria === 'custom' && (
            <WeightSettings
              customWeights={customWeights}
              setCustomWeights={setCustomWeights}
            />
          )}

          {/* Advanced Vehicle & Cost Settings Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition border-t border-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                Vehicle & Fuel Parameters
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showAdvanced && (
              <div className="pt-2">
                <VehicleSettings
                  vehicleSettings={vehicleSettings}
                  setVehicleSettings={setVehicleSettings}
                />
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!origin || !destination || loading}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              !origin || !destination || loading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RouteIcon className="w-4 h-4 animate-spin" /> Calculating Corridors...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Compare & Optimize Routes
              </span>
            )}
          </button>
        </form>

        {/* Status: Loading or Error */}
        {loading && <LoadingState message="Analyzing shortest paths & traffic..." />}
        {error && <ErrorMessage message={error} onRetry={onSubmit} />}

        {/* Results Section */}
        {!loading && routes.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            {/* View Switching Tabs */}
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Found {routes.length} Alternative Routes
              </div>
              <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-750 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
                    activeTab === 'cards'
                      ? 'bg-emerald-500 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <RouteIcon className="w-3 h-3" /> List
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('explanation')}
                  className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
                    activeTab === 'explanation'
                      ? 'bg-emerald-500 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" /> Rationale
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('matrix')}
                  className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
                    activeTab === 'matrix'
                      ? 'bg-emerald-500 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-3 h-3" /> Matrix
                </button>
              </div>
            </div>

            {/* Route Cards */}
            <div className="space-y-3">
              {routes.map((route, idx) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  isSelected={route.id === selectedRouteId}
                  onSelect={onSelectRoute}
                  onHover={onHoverRoute}
                  routeColor={routeColors[route.routeIndex ?? idx]}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Powered by Yen's K-Shortest Paths</span>
        <span>Leaflet + OSM</span>
      </div>
    </div>
  );
}

export default SearchPanel;
