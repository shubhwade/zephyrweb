import React from 'react';
import { FESTIVAL_DAYS } from '../data/scheduleData.js';
import { getEnrichedScheduleForDay } from '../data/scheduleSelectors.js';

export function ScheduleDayTabs({ activeDayId, onSelectDay }) {
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (index + 1) % FESTIVAL_DAYS.length;
      onSelectDay(FESTIVAL_DAYS[nextIdx].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (index - 1 + FESTIVAL_DAYS.length) % FESTIVAL_DAYS.length;
      onSelectDay(FESTIVAL_DAYS[prevIdx].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelectDay(FESTIVAL_DAYS[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSelectDay(FESTIVAL_DAYS[FESTIVAL_DAYS.length - 1].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Festival Days Schedule"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
    >
      {FESTIVAL_DAYS.map((day, idx) => {
        const isSelected = activeDayId === day.id;
        const daySessions = getEnrichedScheduleForDay(day.id);

        return (
          <button
            key={day.id}
            role="tab"
            id={`tab-${day.id}`}
            aria-selected={isSelected}
            aria-controls={`tabpanel-${day.id}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelectDay(day.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`p-4 sm:p-5 lg:p-6 text-left transition-all duration-150 relative rounded-none ${
              isSelected
                ? 'bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_#000] -translate-y-1'
                : 'bg-white text-black border-3 border-black hover:bg-[#FAF7F2] hover:shadow-[4px_4px_0px_0px_#000] shadow-[2px_2px_0px_0px_#000]'
            }`}
          >
            {/* Header row: Day Number + Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className={`font-neo font-black text-xs uppercase tracking-wider ${isSelected ? 'text-white' : 'text-black'}`}>
                {day.dayNumber}
              </span>
              <span className={`font-neo font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] ${isSelected ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {daySessions.length} Sessions
              </span>
            </div>

            {/* Date */}
            <div className={`font-neo font-black text-xl sm:text-2xl leading-tight uppercase tracking-tight ${isSelected ? 'text-white' : 'text-black'}`}>
              {day.fullDate}
            </div>

            {/* Theme */}
            <div className={`text-xs font-body font-medium uppercase tracking-wider mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-black/80'}`}>
              {day.theme}
            </div>
          </button>
        );
      })}
    </div>
  );
}
