import React from 'react';
import { Route, Sparkles, Cpu } from 'lucide-react';

export function LoadingState({ message = 'Computing optimal paths...' }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
          <Route className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-emerald-400 flex items-center justify-center shadow">
          <Cpu className="w-3 h-3 text-emerald-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white tracking-wide">
          {message}
        </h4>
        <p className="text-xs text-slate-400 max-w-xs">
          Traversing graph corridors with Yen's K-Shortest Paths and multi-criteria utility weighting...
        </p>
      </div>

      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-[shimmer_2s_infinite] -translate-x-full" />
      </div>
    </div>
  );
}

export default LoadingState;
