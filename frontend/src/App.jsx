import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import RouteMap from './components/RouteMap';
import RouteComparison from './components/RouteComparison';
import RouteExplanation from './components/RouteExplanation';
import routeApi from './services/api';
import { Route, Info, X, Zap, Cpu, Award, ShieldCheck } from 'lucide-react';

const ROUTE_COLORS = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b', '#ec4899'];

export function App() {
  const [origin, setOrigin] = useState('SF_DOWNTOWN');
  const [destination, setDestination] = useState('SAN_JOSE_DT');
  const [criteria, setCriteria] = useState('fastest');
  const [vehicleSettings, setVehicleSettings] = useState({
    vehicleType: 'petrol_sedan',
    consumptionPer100km: 7.5,
    fuelPricePerUnit: 1.48
  });
  const [customWeights, setCustomWeights] = useState({
    time: 35,
    cost: 30,
    distance: 20,
    emissions: 15
  });

  const [availableNodes, setAvailableNodes] = useState([]);
  const [presets, setPresets] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [hoveredRouteId, setHoveredRouteId] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [originNode, setOriginNode] = useState(null);
  const [destinationNode, setDestinationNode] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' | 'explanation' | 'matrix'
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      try {
        const health = await routeApi.checkHealth();
        if (health?.status === 'online') {
          setBackendOnline(true);
        }
      } catch (err) {
        console.warn('Backend server offline or unreachable:', err.message);
        setBackendOnline(false);
      }

      try {
        const locRes = await routeApi.getLocations();
        if (locRes?.success && locRes.data) {
          setAvailableNodes(locRes.data.nodes || []);
          setPresets(locRes.data.presets || []);
        }
      } catch (err) {
        console.error('Failed to fetch initial locations:', err.message);
      }
    }

    init();
  }, []);

  // Compute routes function
  const handleCalculateRoutes = async () => {
    if (!origin || !destination) {
      setError('Please select both an origin and a destination.');
      return;
    }

    if (origin === destination) {
      setError('Origin and destination cannot be the same node.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await routeApi.calculateRoutes({
        origin,
        destination,
        criteria,
        vehicleSettings,
        customWeights,
        maxAlternatives: 4
      });

      if (response?.success && response.data) {
        const data = response.data;
        setRoutes(data.routes || []);
        setExplanation(data.explanation || null);
        setSelectedRouteId(data.optimalRouteId || (data.routes[0]?.id ?? null));
        setOriginNode(data.origin);
        setDestinationNode(data.destination);
        setBackendOnline(true);
      } else {
        setError(response?.error || 'Failed to compute routes.');
      }
    } catch (err) {
      console.error('Route calculation error:', err);
      setError(
        err.response?.data?.error ||
        err.message ||
        'Error connecting to RouteOpt backend API.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Trigger initial calculation once locations are loaded
  useEffect(() => {
    if (availableNodes.length > 0 && routes.length === 0) {
      handleCalculateRoutes();
    }
  }, [availableNodes]);

  // Re-run calculation automatically when criteria changes if routes are already loaded
  useEffect(() => {
    if (routes.length > 0 && !loading) {
      handleCalculateRoutes();
    }
  }, [criteria]);

  // Swap origin and destination
  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Select a demo preset
  const handleSelectPreset = (preset) => {
    setOrigin(preset.origin);
    setDestination(preset.destination);
    // Directly run calculation with new values
    setTimeout(() => {
      routeApi
        .calculateRoutes({
          origin: preset.origin,
          destination: preset.destination,
          criteria,
          vehicleSettings,
          customWeights,
          maxAlternatives: 4
        })
        .then((res) => {
          if (res?.success && res.data) {
            setRoutes(res.data.routes || []);
            setExplanation(res.data.explanation || null);
            setSelectedRouteId(res.data.optimalRouteId);
            setOriginNode(res.data.origin);
            setDestinationNode(res.data.destination);
          }
        })
        .catch((err) => {
          setError(err.response?.data?.error || err.message);
        });
    }, 50);
  };

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Header Bar */}
      <Header
        backendOnline={backendOnline}
        presets={presets}
        onSelectPreset={handleSelectPreset}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left: Search & Route List Sidebar */}
        <SearchPanel
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          criteria={criteria}
          setCriteria={setCriteria}
          vehicleSettings={vehicleSettings}
          setVehicleSettings={setVehicleSettings}
          customWeights={customWeights}
          setCustomWeights={setCustomWeights}
          availableNodes={availableNodes}
          onSwapLocations={handleSwapLocations}
          onSubmit={handleCalculateRoutes}
          loading={loading}
          error={error}
          routes={routes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={(r) => setSelectedRouteId(r.id)}
          onHoverRoute={(id) => setHoveredRouteId(id)}
          routeColors={ROUTE_COLORS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right: Interactive Map & Analytical Overlays */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-950">
          {/* Top/Main: Leaflet Interactive Map */}
          <div className="flex-1 w-full h-full relative">
            <RouteMap
              routes={routes}
              selectedRouteId={selectedRouteId}
              hoveredRouteId={hoveredRouteId}
              onSelectRoute={(r) => setSelectedRouteId(r.id)}
              routeColors={ROUTE_COLORS}
              origin={originNode}
              destination={destinationNode}
            />
          </div>

          {/* Bottom Analytical Drawer (Tab-based: Rationale or Comparison Matrix) */}
          {routes.length > 0 && activeTab !== 'cards' && (
            <div className="max-h-[48%] overflow-y-auto p-4 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl z-20">
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700"
                >
                  <X className="w-3.5 h-3.5" /> Close Drawer
                </button>
              </div>

              {activeTab === 'explanation' && (
                <RouteExplanation explanation={explanation} criteria={criteria} />
              )}

              {activeTab === 'matrix' && (
                <RouteComparison
                  routes={routes}
                  selectedRouteId={selectedRouteId}
                  onSelectRoute={(r) => setSelectedRouteId(r.id)}
                  routeColors={ROUTE_COLORS}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Algorithm & Documentation Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Cpu className="w-5 h-5 text-emerald-400" />
                RouteOpt Algorithmic Engine Architecture
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-emerald-400 text-sm mb-1">
                  1. Graph & Yen's K-Shortest Loopless Paths
                </h4>
                <p>
                  RouteOpt models road networks as weighted directed graphs with edge properties for distance, free-flow speed, live congestion multiplier, and bridge/highway tolls. It implements <strong>Yen's K-Shortest Paths algorithm</strong> to generate loopless, genuinely distinct candidate corridors (e.g. US-101 vs I-280 vs East Bay I-880).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-400 text-sm mb-1">
                  2. Cost & Emission Calculation
                </h4>
                <p>
                  Computes fuel/energy expenditure based on vehicle powertrain (Petrol, Diesel, EV, Hybrid, Commercial Truck). Congestion sensitivity models extra fuel waste during stop-and-go delays (up to +35%), while EV regenerative braking captures kinetic energy during deceleration.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-400 text-sm mb-1">
                  3. Multi-Attribute Utility Optimization
                </h4>
                <p>
                  Candidate routes are evaluated across 4 dimensions: travel time, monetary cost (fuel + tolls), distance, and CO₂ emissions. Min-max normalization and criteria weighting produce an objective 0–100 utility score to select the optimal path.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-400 text-sm mb-1">
                  4. Automated Explanation Generation
                </h4>
                <p>
                  The engine articulates human-readable rationales quantifying exact minute and dollar trade-offs against each alternative corridor.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
