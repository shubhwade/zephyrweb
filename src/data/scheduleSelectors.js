// Schedule Data Selectors, Transforms & Status Engine for ZEPHYR MMXXV
import { FESTIVAL_DAYS, SCHEDULE_ITEMS } from './scheduleData.js';
import { MASTER_EVENTS_BY_ID } from './eventsMaster.js';
import { COMMITTEES_DATA } from './committees.js';

// Helper map of committees by Code/ID
const COMMITTEES_BY_CODE = COMMITTEES_DATA.reduce((acc, c) => {
  acc[c.id] = c;
  if (c.code) acc[c.code] = c;
  return acc;
}, {});

/**
 * Calculates current live state of a schedule item based on current local date/time
 * Returns: 'live' | 'starting_soon' | 'upcoming' | 'completed'
 */
export function getScheduleItemLiveStatus(item, referenceDate = new Date()) {
  try {
    if (!item.date || !item.startTime) return 'upcoming';

    const itemStartDate = new Date(`${item.date}T${item.startTime.padStart(5, '0')}:00`);

    let itemEndDate;
    if (item.endTime) {
      itemEndDate = new Date(`${item.date}T${item.endTime.padStart(5, '0')}:00`);
    } else {
      // Default 2-hour duration if endTime not specified
      itemEndDate = new Date(itemStartDate.getTime() + 2 * 60 * 60 * 1000);
    }

    const nowTime = referenceDate.getTime();
    const startTime = itemStartDate.getTime();
    const endTime = itemEndDate.getTime();

    // 30 minutes in milliseconds
    const thirtyMinMs = 30 * 60 * 1000;

    if (nowTime >= startTime && nowTime <= endTime) {
      return 'live';
    } else if (nowTime < startTime && startTime - nowTime <= thirtyMinMs) {
      return 'starting_soon';
    } else if (nowTime > endTime) {
      return 'completed';
    }
    return 'upcoming';
  } catch {
    return 'upcoming';
  }
}

/**
 * Enriches a raw schedule item with master event data and committee metadata
 */
export function enrichScheduleItem(rawItem) {
  const masterEvent = rawItem.eventId ? MASTER_EVENTS_BY_ID[rawItem.eventId] : null;

  // Resolve title
  const title = masterEvent?.title || rawItem.customTitle || "Unnamed Session";

  // Resolve committee IDs
  const committeeIds = masterEvent?.committeeIds || rawItem.customCommitteeIds || ["TSDW"];

  // Resolve enriched committee objects
  const committees = committeeIds.map((code) => {
    const found = COMMITTEES_BY_CODE[code];
    return found || {
      id: code,
      code,
      name: code,
      shortName: code,
      fullName: code === "TSDW" ? "TSDW Central Council" : code,
      accent: "#9E7438"
    };
  });

  // Resolve category
  const category = masterEvent?.category || rawItem.category || "General";

  // Resolve notes (replaces / collab / moved)
  const note = masterEvent?.note || rawItem.note || null;

  // Resolve venue
  const isNoVenue = rawItem.eventId === 'robot-car-in-a-cage' || masterEvent?.id === 'robot-car-in-a-cage' || masterEvent?.eventName === 'Robot Car in a Cage';
  const venue = isNoVenue ? "" : (rawItem.venue || masterEvent?.venueHint || "TCET Campus (Venue TBA)");

  // Resolve description
  const description = masterEvent?.description || rawItem.description || "";

  // Resolve price / prize
  const price = masterEvent?.price || null;
  const prizePool = masterEvent?.prizePool || null;

  // Resolve action label & handler
  const action = rawItem.action || {
    label: masterEvent?.numericId ? `Details` : "View Itinerary",
    type: "details"
  };

  const statusLive = getScheduleItemLiveStatus(rawItem);

  return {
    ...rawItem,
    title,
    masterEvent,
    numericId: masterEvent?.numericId || null,
    committeeIds,
    committees,
    primaryCommittee: committees[0] || null,
    category,
    note,
    venue,
    description,
    price,
    prizePool,
    action,
    statusLive,
    isCollab: committeeIds.length > 1
  };
}

/**
 * Get all enriched schedule items for a given day ID
 */
export function getEnrichedScheduleForDay(dayId) {
  const rawItems = SCHEDULE_ITEMS.filter((item) => item.dayId === dayId);
  return rawItems.map(enrichScheduleItem);
}

/**
 * Multi-criteria filter & search engine over schedule items
 */
export function filterAndSearchSchedule({
  dayId = "day-1",
  searchQuery = "",
  selectedCommittee = "ALL",
  selectedCategory = "All"
}) {
  const dayItems = getEnrichedScheduleForDay(dayId);
  const query = searchQuery.trim().toLowerCase();

  return dayItems.filter((item) => {
    // 1. Text Search Filter
    if (query !== "") {
      const titleMatch = item.title.toLowerCase().includes(query);
      const venueMatch = item.venue.toLowerCase().includes(query);
      const categoryMatch = item.category.toLowerCase().includes(query);
      const noteMatch = item.note ? item.note.toLowerCase().includes(query) : false;
      const descMatch = item.description ? item.description.toLowerCase().includes(query) : false;
      const committeeMatch = item.committees.some(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.fullName.toLowerCase().includes(query)
      );

      if (!titleMatch && !venueMatch && !categoryMatch && !noteMatch && !descMatch && !committeeMatch) {
        return false;
      }
    }

    // 2. Committee Filter
    if (selectedCommittee !== "ALL") {
      const normSelected = selectedCommittee.toUpperCase();
      const hasCommittee = item.committeeIds.some((cid) => {
        const u = cid.toUpperCase();
        if (normSelected === "SIGAI") return u.includes("SIGAI");
        if (normSelected === "IEI" || normSelected === "IOT") return u.includes("IEI") || u.includes("IOT");
        if (normSelected === "MAVERICS") return u.includes("MAVERICS");
        if (normSelected === "RACING CLUB" || normSelected === "ECLIPSE RACING CLUB" || normSelected === "ECLIPSE") return u.includes("RACING") || u.includes("ECLIPSE");
        if (normSelected.includes("MAVERICS") && u.includes("MAVERICS")) return true;
        if (normSelected === "RC") return u === "RC" || u.includes("ROTARACT");
        return u === normSelected;
      });

      if (!hasCommittee) {
        return false;
      }
    }

    // 3. Category Filter
    if (selectedCategory !== "All") {
      if (item.category !== selectedCategory) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Returns festival summary metrics
 */
export function getFestivalStats() {
  return {
    totalDays: FESTIVAL_DAYS.length,
    totalSessions: SCHEDULE_ITEMS.length,
    activeCommitteesCount: 13
  };
}
