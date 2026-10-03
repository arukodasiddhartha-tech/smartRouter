import React from 'react';
import { Zap, Ruler, DollarSign, Leaf, Scale, Sliders } from 'lucide-react';

const CRITERIA_OPTIONS = [
  {
    id: 'fastest',
    label: 'Fastest',
    icon: Zap,
    badge: 'Min Time',
    desc: 'Bypasses arterial bottlenecks; favors high-speed freeways',
    color: 'emerald'
  },
  {
    id: 'shortest',
    label: 'Shortest',
    icon: Ruler,
    badge: 'Min Distance',
    desc: 'Minimizes physical odometer kilometers traveled',
    color: 'blue'
  },
  {
    id: 'cheapest',
    label: 'Cheapest',
    icon: DollarSign,
    badge: 'Min $ Cost',
    desc: 'Minimizes combined fuel consumption and bridge/highway tolls',
    color: 'amber'
  },
  {
    id: 'eco',
    label: 'Eco-Friendly',
    icon: Leaf,
    badge: 'Min CO₂',
    desc: 'Reduces stop-and-go energy loss and tailpipe greenhouse emissions',
    color: 'teal'
  },
  {
    id: 'balanced',
    label: 'Balanced',
    icon: Scale,
    badge: 'Multi-Utility',
    desc: 'Harmonizes time, monetary expense, distance, and congestion',
    color: 'indigo'
  },
  {
    id: 'custom',
    label: 'Custom',
    icon: Sliders,
    badge: 'User Weights',
    desc: 'Tune your own weight priorities for each attribute',
    color: 'purple'
  }
];

export function OptimizationSelector({ criteria, setCriteria }) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Optimization Objective
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {CRITERIA_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = criteria === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setCriteria(opt.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                  : 'bg-slate-850/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {opt.badge}
                </span>
              </div>
              <div>
                <p className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OptimizationSelector;
