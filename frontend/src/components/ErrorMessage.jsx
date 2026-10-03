import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl space-y-3">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-rose-300">
            Route Calculation Error
          </h4>
          <p className="text-xs text-rose-200/80 mt-0.5">
            {message || 'Unable to compute routes for the selected criteria.'}
          </p>
        </div>
      </div>

      {onRetry && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 rounded-xl text-xs font-medium text-rose-200 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3 h-3" /> Retry Calculation
          </button>
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
