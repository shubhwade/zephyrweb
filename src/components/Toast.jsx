import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none p-4 flex items-start gap-3.5 animate-fade-in"
    >
      <div className="shrink-0">
        <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
          {type === 'success' && <CheckCircle2 className="w-4 h-4 stroke-[3px]" />}
          {type === 'error' && <AlertCircle className="w-4 h-4 stroke-[3px]" />}
          {type === 'info' && <Info className="w-4 h-4 stroke-[3px]" />}
        </div>
      </div>

      <div className="flex-grow font-neo font-bold text-xs sm:text-sm text-black leading-snug uppercase tracking-wide pt-0.5">
        {message}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 p-1 bg-black text-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <X className="w-3.5 h-3.5 stroke-[3px]" />
        </button>
      )}
    </div>
  );
}
