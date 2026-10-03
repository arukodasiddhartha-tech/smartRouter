import React, { useState } from 'react';
import {
  Clock,
  Ruler,
  DollarSign,
  Leaf,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import {
  formatTime,
  formatDistance,
  formatCurrency,
  formatEmissions,
  getScoreColor
} from '../utils/formatters';

const BADGE_COLORS = {
  emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
};

export function RouteCard({
  route,
  isSelected,
  onSelect,
  onHover,
  routeColor = '#10b981'
}) {
  const [showSegments, setShowSegments] = useState(false);

  return (
    <div
      onMouseEnter={() => onHover && onHover(route.id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-slate-800/90 border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
          : 'bg-slate-850/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
      }`}
    >
      {/* Top Banner for Optimal Route */}
      {route.isOptimal && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-3.5 py-1 text-xs font-semibold text-white flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Optimal Choice for Your Goal
          </span>
          <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-mono">
            Rank #1
          </span>
        </div>
      )}

      <div className="p-3.5" onClick={() => onSelect(route)}>
        {/* Header row: Route Name & Score */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: routeColor }}
            />
            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {route.routeName}
              </h3>
              <p className="text-[11px] text-slate-400">
                {route.originName} ➔ {route.destinationName}
              </p>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-xl border text-center shrink-0 ${getScoreColor(
              route.score
            )}`}
          >
            <div className="text-xs font-black font-mono leading-none">
              {route.score}
            </div>
            <div className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 mt-0.5">
              Score
            </div>
          </div>
        </div>

        {/* Tags */}
        {route.tags && route.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {route.tags.map((t, idx) => (
              <span
                key={idx}
                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                  BADGE_COLORS[t.type] || BADGE_COLORS.blue
                }`}
              >
                {t.label}
              </span>
            ))}
          </div>
        )}

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-4 gap-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Clock className="w-3 h-3 text-emerald-400" /> Time
            </div>
            <div className="text-xs font-bold text-white">
              {formatTime(route.totalTimeMinutes)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Ruler className="w-3 h-3 text-blue-400" /> Dist
            </div>
            <div className="text-xs font-bold text-white">
              {formatDistance(route.totalDistance)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <DollarSign className="w-3 h-3 text-amber-400" /> Cost
            </div>
            <div className="text-xs font-bold text-white">
              {formatCurrency(route.costData.totalDirectCostUsd)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Leaf className="w-3 h-3 text-teal-400" /> CO₂
            </div>
            <div className="text-xs font-bold text-white">
              {formatEmissions(route.costData.co2EmissionsKg)}
            </div>
          </div>
        </div>

        {/* Cost breakdown snippet */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Fuel: {formatCurrency(route.costData.fuelCostUsd)} • Tolls: {formatCurrency(route.costData.tollCostUsd)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSegments(!showSegments);
            }}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-0.5"
          >
            {showSegments ? 'Hide Waypoints' : `${route.segments?.length || 0} Steps`}
            {showSegments ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Turn-by-Turn / Segment breakdown */}
      {showSegments && (
        <div className="bg-slate-900/90 border-t border-slate-800 p-3 space-y-2 text-xs">
          <div className="text-[11px] font-semibold text-slate-300 mb-1.5">
            Corridor Segments & Waypoints:
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {route.segments?.map((seg, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-800/70 border border-slate-750"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-medium text-slate-200 truncate">
                    {seg.roadName}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>{seg.from}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                    <span>{seg.to}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-slate-200">
                    {seg.distanceKm} km
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ~{seg.timeMinutes} min {seg.tollUsd > 0 && `(+$${seg.tollUsd})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteCard;
