import React from 'react';
import {
  formatTime,
  formatDistance,
  formatCurrency,
  formatEmissions,
  getScoreColor
} from '../utils/formatters';
import { Award, Check, TrendingDown, TrendingUp } from 'lucide-react';

export function RouteComparison({
  routes = [],
  selectedRouteId,
  onSelectRoute,
  routeColors = []
}) {
  if (!routes || routes.length === 0) return null;

  // Find minimums across all routes for highlighting
  const minTime = Math.min(...routes.map((r) => r.totalTimeMinutes));
  const minDist = Math.min(...routes.map((r) => r.totalDistance));
  const minCost = Math.min(...routes.map((r) => r.costData.totalDirectCostUsd));
  const minEco = Math.min(...routes.map((r) => r.costData.co2EmissionsKg));
  const maxScore = Math.max(...routes.map((r) => r.score));

  const optimalRoute = routes[0];

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Side-by-Side Route Comparison Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Compare all calculated alternatives against the optimal route
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-3 font-semibold">Route</th>
              <th className="py-2.5 px-3 font-semibold text-center">Score</th>
              <th className="py-2.5 px-3 font-semibold">Travel Time</th>
              <th className="py-2.5 px-3 font-semibold">Distance</th>
              <th className="py-2.5 px-3 font-semibold">Fuel Cost</th>
              <th className="py-2.5 px-3 font-semibold">Tolls</th>
              <th className="py-2.5 px-3 font-semibold">Total Cost</th>
              <th className="py-2.5 px-3 font-semibold">CO₂ Emissions</th>
              <th className="py-2.5 px-3 font-semibold">Traffic Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {routes.map((r, idx) => {
              const isSelected = selectedRouteId === r.id;
              const isBestTime = r.totalTimeMinutes === minTime;
              const isBestDist = r.totalDistance === minDist;
              const isBestCost = r.costData.totalDirectCostUsd === minCost;
              const isBestEco = r.costData.co2EmissionsKg === minEco;
              const isBestScore = r.score === maxScore;

              const timeDiff = r.totalTimeMinutes - optimalRoute.totalTimeMinutes;
              const costDiff = r.costData.totalDirectCostUsd - optimalRoute.costData.totalDirectCostUsd;

              return (
                <tr
                  key={r.id}
                  onClick={() => onSelectRoute(r)}
                  className={`transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/30 font-medium'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* Route Label */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: routeColors[idx] || '#10b981' }}
                      />
                      <div>
                        <span className="text-white font-medium block truncate max-w-[140px] md:max-w-none">
                          {r.routeName}
                        </span>
                        {r.isOptimal && (
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Recommended
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg border font-mono font-bold text-xs ${getScoreColor(
                        r.score
                      )}`}
                    >
                      {r.score}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3 px-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className={isBestTime ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                        {formatTime(r.totalTimeMinutes)}
                      </span>
                      {timeDiff !== 0 && (
                        <span className="text-[10px] text-slate-400">
                          ({timeDiff > 0 ? `+${Math.round(timeDiff)}m` : `${Math.round(timeDiff)}m`})
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="py-3 px-3">
                    <span className={isBestDist ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                      {formatDistance(r.totalDistance)}
                    </span>
                  </td>

                  {/* Fuel Cost */}
                  <td className="py-3 px-3 text-slate-300">
                    {formatCurrency(r.costData.fuelCostUsd)}
                  </td>

                  {/* Tolls */}
                  <td className="py-3 px-3">
                    <span className={r.totalTollUsd === 0 ? 'text-emerald-400' : 'text-amber-400'}>
                      {r.totalTollUsd === 0 ? 'Free' : formatCurrency(r.totalTollUsd)}
                    </span>
                  </td>

                  {/* Total Cost */}
                  <td className="py-3 px-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className={isBestCost ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                        {formatCurrency(r.costData.totalDirectCostUsd)}
                      </span>
                      {costDiff !== 0 && (
                        <span className="text-[10px] text-slate-400">
                          ({costDiff > 0 ? `+$${costDiff.toFixed(2)}` : `-$${Math.abs(costDiff).toFixed(2)}`})
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Emissions */}
                  <td className="py-3 px-3">
                    <span className={isBestEco ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                      {formatEmissions(r.costData.co2EmissionsKg)}
                    </span>
                  </td>

                  {/* Congestion multiplier */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        r.costData.avgCongestionMultiplier < 1.25
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : r.costData.avgCongestionMultiplier < 1.45
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {r.costData.avgCongestionMultiplier}x
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RouteComparison;
