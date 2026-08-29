import { MASTER_EVENTS } from './eventsMaster';
import { getCommitteeContact } from './committeeContacts';
export const CATEGORIES = ['All', 'Gaming', 'Sports', 'Tech', 'Creative', 'Puzzle / Experience'];
export const ACTIVE_COMMITTEES = ['CSI','ASCE','OWASP','TRS','ACM','S4DS','IEEE','IETE','SIGAI','IOT','ASME','AAAI','BBA'];
export const ALL_EVENTS = MASTER_EVENTS.map((event) => ({
  ...event,
  phone_no: getCommitteeContact(event.committees[0])?.phone || '',
  id: event.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  title: event.eventName,
  tag: event.committees.length > 1 ? event.committees.join(' · ') : `${event.committees[0]} - TCET`,
  committee: event.committees[0],
  committeesList: event.committees,
  primaryCommittee: event.committees[0],
  category: event.category,
  desc: event.description,
  description: event.description,
  imageAlt: event.imageAlt,
  imageSource: 'Unsplash',
  isShared: Boolean(event.isShared),
  collabNote: event.isShared ? `Shared with ${event.committees.join(' · ')}` : null,
  priceDisplay: event.priceDisplay || 'Register',
  prizeDisplay: event.prizeDisplay || event.prizePool || 'Open',
  teamDisplay: event.teamDisplay || 'Team',
}));
export function filterAndSearchEvents({ events = ALL_EVENTS, searchQuery = '', selectedCommittee = 'ALL', selectedCategory = 'All', priceFilter = 'all' }) {
  const query = searchQuery.trim().toLowerCase();
  return events.filter((evt) => {
    if (query) {
      const searchable = [evt.title, evt.committeesList.join(' '), evt.category, evt.desc].join(' ').toLowerCase();
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
