import React, { useState, useMemo } from 'react';
import { ALL_EVENTS, CATEGORIES, filterAndSearchEvents, ACTIVE_COMMITTEES } from '../data/events';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { Search, X, RotateCcw, Filter } from 'lucide-react';

export function EventsExplorer({ onShowToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    return filterAndSearchEvents({
      events: ALL_EVENTS,
      searchQuery,
      selectedCommittee,
      selectedCategory,
      priceFilter,
    });
  }, [searchQuery, selectedCommittee, selectedCategory, priceFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCommittee('ALL');
    setSelectedCategory('All');
    setPriceFilter('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCommittee !== 'ALL' ||
    selectedCategory !== 'All' ||
    priceFilter !== 'all';

  const handleRegisterEvent = (event) => {
    setSelectedEvent(null);
    if (onShowToast) {
      onShowToast(`Opening ParkAdda for ${event.title} (Event ID: ${event.parkAddaEventId || 'ZEPHYR26'})...`);
    }
  };

  const handleCopyContact = (phone) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
    }
    if (onShowToast) {
      onShowToast(`Copied coordinator contact (+91 ${phone}) to clipboard.`);
    }
  };

  return (
    <section
      id="events"
      className="space-y-5 sm:space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-black pb-4 sm:pb-5">
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          Events Directory
        </h1>

        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 bg-black text-white border-2 border-black font-neo font-bold tracking-wider uppercase text-xs shadow-[2px_2px_0px_0px_#000]">
            {filteredEvents.length} OF {ALL_EVENTS.length} EVENTS
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="neo-btn-primary px-3 py-1.5 flex items-center gap-1.5 text-xs font-neo font-bold uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[3px]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Matrix Card */}
      <div className="neo-card-lg p-4 sm:p-5 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black stroke-[2.5px]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, chapters, or keywords..."
            className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-white text-black placeholder:text-black/50 border-2 border-black font-body text-xs sm:text-sm focus:outline-none focus:bg-black/5 transition-all rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-black hover:opacity-60"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          )}
        </div>

        {/* Mobile Dropdowns / Desktop Chips Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t-2 border-black">
          
          {/* Chapter Filter */}
          <div className="space-y-1">
            <label className="text-xs font-neo font-bold text-black uppercase tracking-wider block">
              Chapter
            </label>
            <select
              value={selectedCommittee}
              onChange={(e) => setSelectedCommittee(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-black text-xs sm:text-sm text-black focus:outline-none focus:bg-black/5 transition-all uppercase tracking-wider font-neo font-bold rounded-none"
            >
              <option value="ALL">All Active Committees ({ALL_EVENTS.length})</option>
              {ACTIVE_COMMITTEES.map((committee) => {
                const label = committee === 'TRS' ? 'The Robotics Society (TRS)' : committee;
                return (
                  <option key={committee} value={committee}>
                    {label} ({ALL_EVENTS.filter((e) => e.committeesList.includes(committee)).length})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-xs font-neo font-bold text-black uppercase tracking-wider block">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-black text-xs sm:text-sm text-black focus:outline-none focus:bg-black/5 transition-all uppercase tracking-wider font-neo font-bold rounded-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Filter */}
          <div className="space-y-1">
            <label className="text-xs font-neo font-bold text-black uppercase tracking-wider block">
              Fee Type
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border-2 border-black text-xs sm:text-sm text-black focus:outline-none focus:bg-black/5 transition-all uppercase tracking-wider font-neo font-bold rounded-none"
            >
              <option value="all">All Fees (Free & Paid)</option>
              <option value="free">Free Events Only</option>
              <option value="paid">Paid Events Only</option>
            </select>
          </div>

        </div>

        {/* Desktop Quick Chapter Pills */}
        <div className="hidden md:block pt-3 border-t-2 border-black">
          <div className="flex flex-wrap gap-2">
            {ACTIVE_COMMITTEES.map((committee) => {
              const isSelected = selectedCommittee === committee;
              const label = committee === 'TRS' ? 'The Robotics Society' : committee;
              return (
                <button
                  key={committee}
                  onClick={() => setSelectedCommittee(committee)}
                  className={`px-3 py-1 text-xs font-neo font-bold uppercase tracking-wider transition-all duration-150 rounded-none border-2 border-black ${
                    isSelected
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={(evt) => setSelectedEvent(evt)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 neo-card space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mx-auto text-white shadow-[2px_2px_0px_0px_#000]">
            <Filter className="w-6 h-6 stroke-[2.5px]" />
          </div>

          <div className="space-y-1">
            <h3 className="font-neo font-black text-xl text-black uppercase tracking-tight">
              No Events Found
            </h3>
            <p className="font-body text-xs sm:text-sm text-black/80 font-medium">
              No events match your current filter selections.
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="neo-btn-primary px-5 py-2 text-xs"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        onRegister={handleRegisterEvent}
        onCopyContact={handleCopyContact}
      />
    </section>
  );
}
