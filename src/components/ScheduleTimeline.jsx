import React from 'react';
import { ScheduleItemCard } from './ScheduleItemCard.jsx';
import { ScheduleEmptyState } from './ScheduleEmptyState.jsx';
import { SCHEDULE_METADATA } from '../data/scheduleData.js';
import { Info } from 'lucide-react';

export function ScheduleTimeline({
  day,
  items,
  hasActiveFilters,
  searchQuery,
  selectedCommittee,
  onResetFilters,
  onOpenEventDetails,
  onShowToast
}) {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${day.id}`}
      aria-labelledby={`tab-${day.id}`}
      className="neo-card-lg p-5 sm:p-8 lg:p-9 space-y-6 sm:space-y-7 rounded-none"
    >
      {/* Day Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-4 sm:pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 bg-black border-2 border-black font-neo font-black text-xs text-white uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              {day.dayNumber}
            </span>
            <span className="px-2.5 py-0.5 bg-white border-2 border-black font-neo font-bold text-xs text-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#000]">
              {day.badge}
            </span>
          </div>

          <h2 className="font-neo font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
            {day.fullDate} — {day.theme}
          </h2>
          {day.subtitle && (
            <p className="font-body text-xs sm:text-sm text-black/80 font-medium pt-0.5">
              {day.subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-neo font-black text-xs px-3.5 py-1.5 bg-black text-white border-2 border-black tracking-wider uppercase shadow-[2px_2px_0px_0px_#000]">
            {items.length} {items.length === 1 ? 'Session' : 'Sessions'}
          </span>
        </div>
      </div>

      {/* Temporary Schedule Notice Box */}
      {SCHEDULE_METADATA.dataSource === 'development_temporary' && (
        <div className="p-3.5 bg-white border-3 border-black flex items-center justify-between gap-3 text-xs font-body shadow-[3px_3px_0px_0px_#000]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-black border-2 border-black flex items-center justify-center text-white shrink-0">
              <Info className="w-3.5 h-3.5 stroke-[3px]" />
            </div>
            <span className="text-xs font-medium text-black">
              <strong className="font-neo font-bold uppercase">Preliminary Itinerary:</strong> Session timings and venues are subject to final committee confirmation.
            </span>
          </div>
          <span className="font-neo font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 bg-black text-white border border-black shrink-0 hidden sm:inline">
            Stage 1 Schedule
          </span>
        </div>
      )}

      {/* Items List or Empty State */}
      {items.length > 0 ? (
        <div className="space-y-4 pt-1">
          {items.map((item, idx) => (
            <ScheduleItemCard
              key={item.id}
              item={item}
              index={idx}
              onOpenEventDetails={onOpenEventDetails}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      ) : (
        <ScheduleEmptyState
          hasActiveFilters={hasActiveFilters}
          searchQuery={searchQuery}
          selectedCommittee={selectedCommittee}
          onResetFilters={onResetFilters}
        />
      )}
    </div>
  );
}
