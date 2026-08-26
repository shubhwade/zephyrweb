// Schedule and Master Event Integrity Validation Engine
import { MASTER_EVENTS, MASTER_EVENTS_BY_ID } from './eventsMaster.js';
import { FESTIVAL_DAYS, SCHEDULE_ITEMS } from './scheduleData.js';
import { COMMITTEES_DATA } from './committees.js';

export function validateScheduleIntegrity() {
  const errors = [];
  const warnings = [];

  const committeeCodeSet = new Set(
    COMMITTEES_DATA.flatMap((c) => [c.id, c.code, c.shortName]).filter(Boolean)
  );
  // Add council code
  committeeCodeSet.add("TSDW");

  // 1. Validate Master Events
  const seenEventIds = new Set();
  MASTER_EVENTS.forEach((evt) => {
    if (!evt.id) {
      errors.push(`Master event missing ID: "${evt.title}"`);
    } else if (seenEventIds.has(evt.id)) {
      errors.push(`Duplicate Master Event ID: "${evt.id}"`);
    }
    seenEventIds.add(evt.id);

    if (!evt.title) {
      errors.push(`Master event ID "${evt.id}" is missing a title.`);
    }

    if (!evt.committeeIds || evt.committeeIds.length === 0) {
      errors.push(`Master event "${evt.id}" has no assigned committeeIds.`);
    } else {
      evt.committeeIds.forEach((cid) => {
        if (!committeeCodeSet.has(cid)) {
          warnings.push(`Master event "${evt.id}" has unknown committee code "${cid}".`);
        }
      });
    }
  });

  // 2. Validate Festival Days
  const seenDayIds = new Set();
  FESTIVAL_DAYS.forEach((day) => {
    if (!day.id) {
      errors.push(`Festival Day missing ID: "${day.dayNumber}"`);
    } else if (seenDayIds.has(day.id)) {
      errors.push(`Duplicate Festival Day ID: "${day.id}"`);
    }
    seenDayIds.add(day.id);
  });

  // 3. Validate Schedule Items
  const seenScheduleIds = new Set();
  SCHEDULE_ITEMS.forEach((item) => {
    if (!item.id) {
      errors.push(`Schedule item missing ID on date ${item.date}`);
    } else if (seenScheduleIds.has(item.id)) {
      errors.push(`Duplicate Schedule item ID: "${item.id}"`);
    }
    seenScheduleIds.add(item.id);

    if (!seenDayIds.has(item.dayId)) {
      errors.push(`Schedule item "${item.id}" references unknown dayId "${item.dayId}".`);
    }

    if (item.eventId) {
      if (!MASTER_EVENTS_BY_ID[item.eventId]) {
        errors.push(`Schedule item "${item.id}" references unknown eventId "${item.eventId}".`);
      }
    } else if (!item.customTitle) {
      errors.push(`Schedule item "${item.id}" has neither eventId nor customTitle.`);
    }

    if (!item.startTime || !/^\d{2}:\d{2}$/.test(item.startTime)) {
      errors.push(`Schedule item "${item.id}" has invalid startTime "${item.startTime}" (expected HH:MM).`);
    }

    if (item.endTime && !/^\d{2}:\d{2}$/.test(item.endTime)) {
      errors.push(`Schedule item "${item.id}" has invalid endTime "${item.endTime}" (expected HH:MM).`);
    }
  });

  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
    summary: {
      totalMasterEvents: MASTER_EVENTS.length,
      totalFestivalDays: FESTIVAL_DAYS.length,
      totalScheduleItems: SCHEDULE_ITEMS.length
    }
  };
}
