import React from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export function RouteExplanation({ explanation, criteria }) {
  if (!explanation || !explanation.summary) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-emerald-500/30 p-4 space-y-3.5 shadow-xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Why Route {explanation.optimalRouteIndex} is Optimal
            </h3>
            <p className="text-[11px] text-emerald-400 font-medium">
              Objective: {explanation.criteriaLabel} Optimization
            </p>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
          Utility: {explanation.score}/100
        </div>
      </div>

      {/* Executive Summary */}
      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
        {explanation.summary}
      </div>

      {/* Key Strengths */}
      {explanation.keyStrengths && explanation.keyStrengths.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Key Route Highlights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {explanation.keyStrengths.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-800/40 border border-slate-750"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade-off Breakdown vs Alternatives */}
      {explanation.comparisons && explanation.comparisons.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-slate-800">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Comparative Trade-off Analysis
          </div>
          <div className="space-y-2">
            {explanation.comparisons.map((c, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-750 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-semibold text-slate-200">
                    vs Route {c.alternativeIndex} ({c.alternativeName}):
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {c.reasonsAgainstSummary} • {c.tollComparison}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400 shrink-0 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 self-start md:self-auto">
                  Score: {c.score} vs {explanation.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteExplanation;
