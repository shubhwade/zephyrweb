import { MASTER_EVENTS, ACTIVE_COMMITTEES } from './eventsMaster.js';
import { getCommitteeContact } from './committeeContacts.js';
import { getParkAddaEventUrl, getParkAddaEventId, getParkAddaPackageCode } from './parkadda.js';
export const CATEGORIES = ['All', 'Gaming', 'Sports', 'Tech', 'Creative', 'Puzzle / Experience'];
export { ACTIVE_COMMITTEES };

export const ALL_EVENTS = MASTER_EVENTS.map((event) => {
  const eventId = getParkAddaEventId(event);
  const packageCode = getParkAddaPackageCode(event);
  const parkAddaUrl = getParkAddaEventUrl(event);

  return {
    ...event,
    phone_no: getCommitteeContact(event.committees[0])?.phone || '',
    id: event.id || event.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: event.title || event.eventName,
    tag: event.tag || (event.committees.length > 1 ? event.committees.join(' · ') : (event.committees[0].includes('Club') ? event.committees[0] : `${event.committees[0]} - TCET`)),
    committee: event.committees[0],
    committeesList: event.committees,
    primaryCommittee: event.committees[0],
    category: event.category,
    desc: event.description,
    description: event.description,
    mode: event.mode || 'Offline',
    imageAlt: event.imageAlt,
    imageSource: 'Unsplash',
    isShared: Boolean(event.isShared),
    collabNote: event.isShared ? `Shared with ${event.committees.join(' · ')}` : null,
    priceDisplay: event.priceDisplay || 'Register',
    prizeDisplay: event.prizeDisplay || event.prizePool || 'Open',
    teamDisplay: event.teamDisplay || 'Team',
    parkAddaEventId: eventId || 'ZEPHYR26',
    parkAddaPackageCode: packageCode || 'ZEPHYR26',
    parkAddaUrl: parkAddaUrl || 'https://www.parkadda.com/events',
  };
});
export function filterAndSearchEvents({ events = ALL_EVENTS, searchQuery = '', selectedCommittee = 'ALL', selectedCategory = 'All', priceFilter = 'all' }) {
  const query = searchQuery.trim().toLowerCase();
  return events.filter((evt) => {
    if (query) {
      const searchable = [evt.title, evt.committeesList.join(' '), evt.category, evt.mode, evt.desc].join(' ').toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    if (selectedCommittee !== 'ALL') {
      if (!evt.committeesList.includes(selectedCommittee)) return false;
    }
    if (selectedCategory !== 'All' && evt.category !== selectedCategory) return false;
    if (priceFilter === 'free' && evt.priceDisplay && evt.priceDisplay !== 'Free Entry' && evt.priceDisplay !== '₹0') return false;
    if (priceFilter === 'paid' && (!evt.priceDisplay || evt.priceDisplay === 'Free Entry' || evt.priceDisplay === '₹0')) return false;
    return true;
  });
}
