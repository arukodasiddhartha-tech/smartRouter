import React from 'react';
import { Route, Sparkles, Activity, Compass, Zap, HelpCircle } from 'lucide-react';

export function Header({
  backendOnline,
  presets = [],
  onSelectPreset,
  onOpenHelp
}) {
  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-30 shrink-0">
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Route className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Route<span className="text-emerald-400">Opt</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              v1.0 Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Intelligent Multi-Criteria Route Comparison & Optimization
          </p>
        </div>
      </div>

      {/* Center: Presets Quick Bar */}
      <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
        <span className="text-slate-400 pl-2 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Corridors:
        </span>
        {presets.slice(0, 3).map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPreset(p)}
            className="px-2.5 py-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title={p.description}
          >
            {p.title.split('➔')[0].trim()} ➔ {p.title.split('➔')[1].trim()}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        {/* Presets dropdown for mobile / tablet */}
        {presets.length > 0 && (
          <div className="relative lg:hidden">
            <select
              onChange={(e) => {
                const found = presets.find((p) => p.id === e.target.value);
                if (found) onSelectPreset(found);
              }}
              className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              defaultValue=""
            >
              <option value="" disabled>Load Preset Corridor...</option>
              {presets.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Backend Status indicator */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/70 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span className="text-slate-300 hidden sm:inline">
            {backendOnline ? 'API Active' : 'API Offline'}
          </span>
        </div>

        {/* Info button */}
        {onOpenHelp && (
          <button
            onClick={onOpenHelp}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="Algorithm & Engine Info"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
