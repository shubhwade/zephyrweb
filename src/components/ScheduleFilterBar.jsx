import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import { COMMITTEES_DATA } from '../data/committees.js';
import { CATEGORIES } from '../data/events.js';

export function ScheduleFilterBar({
  searchQuery,
  onSearchChange,
  selectedCommittee,
  onCommitteeChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  totalResults,
  hasActiveFilters
}) {
  return (
    <div className="neo-card-lg p-5 sm:p-7 space-y-5 rounded-none">
      
      {/* Top Row: Search Input + Status & Reset */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        
        {/* Search Field */}
        <div className="relative flex-1">
          <label htmlFor="schedule-search-input" className="sr-only">
            Search schedule events, committees, or notes
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black stroke-[2.5px]" />
          <input
            id="schedule-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sessions, committees (e.g. ACM, OWASP), games, or notes..."
            className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-white text-black placeholder:text-black/50 border-2 border-black font-body text-xs sm:text-sm focus:outline-none focus:bg-black/5 transition-all rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black hover:opacity-60 focus:outline-none"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          )}
        </div>

        {/* Counter and Reset Trigger */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <div
            aria-live="polite"
            className="px-3 py-2 bg-black border-2 border-black font-neo font-black text-xs uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#000]"
          >
            {totalResults} {totalResults === 1 ? 'SESSION' : 'SESSIONS'}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="neo-btn-primary px-3.5 py-2 flex items-center gap-1.5 font-neo font-bold text-xs uppercase tracking-wider rounded-none focus-visible:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[3px]" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Second Row: Committee Filter Pills */}
      <div className="space-y-2 pt-2 border-t-2 border-black">
        <div className="flex items-center gap-1.5 text-black text-xs font-neo font-bold uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-black stroke-[2.5px]" />
          <span>Filter by Committee:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar flex-wrap">
          {COMMITTEES_DATA.map((com) => {
            const isSelected = selectedCommittee === com.id;
            return (
              <button
                key={com.id}
                onClick={() => onCommitteeChange(com.id)}
                className={`px-3 py-1 font-neo font-bold text-xs uppercase tracking-wider transition-all duration-150 shrink-0 rounded-none border-2 border-black ${
                  isSelected
                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {com.shortName || com.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Third Row: Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar flex-wrap border-t-2 border-black">
        <span className="text-black text-xs font-neo font-bold uppercase tracking-wider mr-1 shrink-0">
          Category:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 font-neo font-bold text-[11px] uppercase tracking-wider transition-all duration-150 shrink-0 rounded-none border-2 border-black ${
                isSelected
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

    </div>
  );
}
