import React, { useState, useMemo } from 'react';
import { FESTIVAL_DAYS } from '../data/scheduleData.js';
import { filterAndSearchSchedule } from '../data/scheduleSelectors.js';
import { ScheduleDayTabs } from './ScheduleDayTabs.jsx';
import { ScheduleFilterBar } from './ScheduleFilterBar.jsx';
import { ScheduleTimeline } from './ScheduleTimeline.jsx';
import { EventModal } from './EventModal.jsx';

import { getParkAddaEventUrl, getParkAddaEventId, getParkAddaPackageCode } from '../data/parkadda.js';

export function ScheduleSection({ onShowToast, _onNavigate }) {
  const [activeDayId, setActiveDayId] = useState('day-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalEvent, setModalEvent] = useState(null);

  const activeDay = useMemo(() => {
    return FESTIVAL_DAYS.find((d) => d.id === activeDayId) || FESTIVAL_DAYS[0];
  }, [activeDayId]);

  const filteredItems = useMemo(() => {
    return filterAndSearchSchedule({
      dayId: activeDayId,
      searchQuery,
      selectedCommittee,
      selectedCategory
    });
  }, [activeDayId, searchQuery, selectedCommittee, selectedCategory]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCommittee !== 'ALL' ||
    selectedCategory !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCommittee('ALL');
    setSelectedCategory('All');
  };

  const handleOpenEventDetails = (masterEvent) => {
    if (!masterEvent) return;
    const parkAddaEventId = getParkAddaEventId(masterEvent);
    const parkAddaPackageCode = getParkAddaPackageCode(masterEvent);
    const parkAddaUrl = getParkAddaEventUrl(masterEvent);

    // Format object for EventModal compatibility
    const formattedForModal = {
      id: masterEvent.numericId || masterEvent.id,
      title: masterEvent.title,
      desc: masterEvent.description,
      tag: masterEvent.primaryCommitteeId,
      college: masterEvent.primaryCommitteeId,
      primaryCommittee: masterEvent.primaryCommitteeId,
      committeesList: masterEvent.committeeIds || [masterEvent.primaryCommitteeId],
      isCollab: (masterEvent.committeeIds || []).length > 1,
      collabNote: masterEvent.note || null,
      priceDisplay: masterEvent.price ? `₹${masterEvent.price}` : 'Free Entry',
      prizeDisplay: masterEvent.prizePool || 'Exciting Vouchers & Trophies',
      teamDisplay: masterEvent.teamSize?.max > 1
        ? `${masterEvent.teamSize.min}–${masterEvent.teamSize.max} Players`
        : 'Solo (1 Player)',
      image: masterEvent.image || `/event${masterEvent.numericId || 1}.webp`,
      phone_no: masterEvent.phoneNo || '9987330273',
      venue: (masterEvent.id === 'robot-car-in-a-cage' || masterEvent.eventName === 'Robot Car in a Cage') ? null : (masterEvent.venueHint || 'TCET Campus'),
      parkAddaEventId,
      parkAddaPackageCode,
      parkAddaUrl
    };
    setModalEvent(formattedForModal);
  };

  const handleRegisterFromModal = (event) => {
    setModalEvent(null);
    if (onShowToast) {
      onShowToast(`Opening ParkAdda Events Portal for ${event.title}...`);
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
      id="schedule"
      className="space-y-5 sm:space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-black pb-4 sm:pb-5">
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          Festival Schedule
        </h1>
      </div>

      {/* 1. Day Switcher Tabs */}
      <ScheduleDayTabs
        activeDayId={activeDayId}
        onSelectDay={(dayId) => setActiveDayId(dayId)}
      />

      {/* 2. Search & Filter Controls */}
      <ScheduleFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCommittee={selectedCommittee}
        onCommitteeChange={setSelectedCommittee}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onResetFilters={handleResetFilters}
        totalResults={filteredItems.length}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 3. Chronological Timeline */}
      <ScheduleTimeline
        day={activeDay}
        items={filteredItems}
        hasActiveFilters={hasActiveFilters}
        searchQuery={searchQuery}
        selectedCommittee={selectedCommittee}
        onResetFilters={handleResetFilters}
        onOpenEventDetails={handleOpenEventDetails}
        onShowToast={onShowToast}
      />

      {/* 4. Connected Event Modal */}
      {modalEvent && (
        <EventModal
          event={modalEvent}
          isOpen={Boolean(modalEvent)}
          onClose={() => setModalEvent(null)}
          onRegister={handleRegisterFromModal}
          onCopyContact={handleCopyContact}
        />
      )}
    </section>
  );
}
