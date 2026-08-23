import React from 'react';
import { CalendarX, RotateCcw } from 'lucide-react';

export function ScheduleEmptyState({
  hasActiveFilters,
  searchQuery,
  selectedCommittee,
  onResetFilters
}) {
  return (
    <div className="p-8 sm:p-14 text-center space-y-4 rounded-none bg-white border-4 border-dashed border-black shadow-[6px_6px_0px_0px_#000]">
      <div className="w-14 h-14 mx-auto bg-black border-3 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_#000]">
        <CalendarX className="w-7 h-7 stroke-[2.5px]" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="font-neo font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
          No Sessions Found
        </h3>
        <p className="font-body text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
          {hasActiveFilters ? (
            <>
              No schedule sessions match your current query{' '}
              {searchQuery && <span className="font-bold underline text-black">"{searchQuery}"</span>}
              {selectedCommittee !== 'ALL' && (
                <span> in committee <span className="font-bold underline text-black">{selectedCommittee}</span></span>
              )}.
            </>
          ) : (
            'No sessions scheduled for this day yet. Check back soon for official updates.'
          )}
        </p>
      </div>

      {hasActiveFilters && (
        <div className="pt-2">
          <button
            onClick={onResetFilters}
            className="neo-btn-primary px-6 py-2.5 text-xs inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 stroke-[3px]" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
