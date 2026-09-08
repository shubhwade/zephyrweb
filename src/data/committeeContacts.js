export const COMMITTEE_CONTACTS = {
  ACM: { label: 'ACM - TCET', name: 'Girik Shukla', phone: '7304361777' },
  CSI: { label: 'CSI - TCET', name: 'Jay Kakadiya', phone: '9619186578' },
  'ACM SIGAI': { label: 'ACM SIGAI - TCET', name: 'Pranav', phone: '7710829523' },
  SIGAI: { label: 'ACM SIGAI - TCET', name: 'Pranav', phone: '7710829523' },
  S4DS: { label: 'S4DS - TCET', name: 'Aayan Sheikh', phone: '9867235285' },
  TRS: { label: 'The Robotics Society - TCET', name: 'Shubham Verma', phone: '8879216399' },
  OWASP: { label: 'OWASP - TCET', name: 'Prastuth Shetty', phone: '8976369399' },
  IETE: { label: 'IETE - TCET', name: 'Shubham G', phone: '9324380352' },
  IEEE: { label: 'IEEE - TCET', name: 'Tanmay Malkapurkar', phone: '8149773228' },
  IEI: { label: 'IEI - TCET', name: 'Shreya Shrivastav', phone: '7208445992' },
  ASCE: { label: 'ASCE - TCET', name: 'Bhavik Thakur', phone: '7400128532' },
  ASME: { label: 'ASME - TCET', name: 'Varuna Karande', phone: '9967852636' },
  AAAI: { label: 'AAAI - TCET', name: 'Shrishti Saroj', phone: '8928261591' },
  BBA: { label: 'BBA - TCET', name: 'Smit Dingankar', phone: '8591550413' },
  IOT: { label: 'IEI - TCET', name: 'Shreya Shrivastav', phone: '7208445992' },
  RC: { label: 'Rotaract Club - TCET', name: 'RC Desk', phone: '9987330273' },
  'RC - TCET': { label: 'Rotaract Club - TCET', name: 'RC Desk', phone: '9987330273' },
  MAVERICS: { label: 'Maverics - TCET', name: 'Technical Head', phone: '9137520094' },
  'MAVERICS - TCET': { label: 'Maverics - TCET', name: 'Technical Head', phone: '9137520094' },
  'ECLIPSE RACING CLUB': { label: 'Eclipse Racing Club - TCET', name: 'Technical Head', phone: '9137520094' },
  'RACING CLUB': { label: 'Eclipse Racing Club - TCET', name: 'Technical Head', phone: '9137520094' },
  'ECLIPSE RACING CLUB - TCET': { label: 'Eclipse Racing Club - TCET', name: 'Technical Head', phone: '9137520094' },
  'MAVERICS × ECLIPSE RACING CLUB': { label: 'Maverics × Eclipse - TCET', name: 'Technical Head', phone: '9137520094' },
  'MAVERICS × ECLIPSE': { label: 'Maverics × Eclipse - TCET', name: 'Technical Head', phone: '9137520094' },
};

export const EVENT_COMMITTEE_ROUTE = {
  'Garba Workshop': ['CSI'],
  'Rink Football': ['CSI'],
  'Neon Cricket': ['CSI'],
  'Cricket Auction': ['CSI'],
  'CodM': ['CSI'],
  'Tech Hunt': ['CSI'],
  'Human Snake Ladder': ['CSI'],
  'Tug of War': ['ASCE'],
  'Box Cricket': ['ASCE', 'OWASP', 'SIGAI'],
  'Valorant': ['ASCE', 'ACM', 'S4DS', 'IEEE'],
  'BGMI (Classic)': ['ASCE', 'IEEE', 'IETE'],
  'Technical Event (AutoCAD)': ['ASCE'],
  'Neon Dodgeball': ['ASCE'],
  'Free Fire (Classic)': ['ASCE'],
  'Capture The Flag': ['OWASP'],
  'Rocket League': ['OWASP'],
  'eFootball Mobile': ['OWASP'],
  'WWE Console': ['ACM', 'OWASP'],
  'Glow Carrom': ['TRS', 'ASME'],
  'BGMI (TDM)': ['TRS'],
  'CAD Competiton': ['TRS'],
  '3D Printing': ['TRS'],
  'Fall Guys': ['TRS'],
  'Dance Workshop': ['ACM'],
  'Vibecoding': ['ACM'],
  'Cyber Heist': ['ACM', 'CSI'],
  'Escape Room': ['ACM'],
  'Scavenger Hunt': ['ACM'],
  'Power Show': ['ACM'],
  'Neon Bowling': ['S4DS'],
  'Canvashpere Hack': ['S4DS'],
  'Traitors': ['S4DS'],
  'Human Foosball': ['S4DS'],
  'Gel Blaster': ['IEEE'],
  'AR Cricket': ['IEEE'],
  'Ideathon': ['IEEE'],
  'Art Workshop (Tote Bag)': ['IEEE'],
  'Catch the Baton': ['IEEE'],
  'FIFA PS5': ['IETE'],
  'Haunted House': ['IETE'],
  'Arm Wrestling': ['IETE'],
  'Squid Game': ['IETE'],
  'Gen AI Workshop': ['IETE'],
  'Content Creation Workshop': ['IETE'],
  'Mystery Maze': ['SIGAI'],
  'Takeshi\'s Castle': ['SIGAI'],
  'Free Fire (TDM)': ['SIGAI'],
  'AI Crime Lab': ['SIGAI'],
  'Neon Football': ['IEI'],
  'AR-VR Space Blitz': ['IEI'],
  'Two Minute Arcade': ['IEI'],
  'Model Rocketry Workshop': ['IEI'],
  'Workshop on AI-IoT': ['IEI'],
  'Mortal Kombat': ['IEI'],
  'Football Dart': ['ASME'],
  'Spin the Wheel': ['ASME'],
  'Racing Team': ['ASME'],
  'Workshop Solidworks': ['ASME'],
  'AMONG US': ['AAAI'],
  'The SQL Investigation': ['AAAI'],
  'Photobooth': ['BBA'],
  'Robot Car in a Cage': ['Maverics', 'Eclipse Racing Club'],
  'Director’s Cut — Short Film Festival': ['RC'],
  "Director's Cut — Short Film Festival": ['RC'],
};

export function normalizeCommitteeKey(value) {
  if (!value) return '';
  const normalized = String(value).trim();
  const direct = {
    'ACM-SIGAI': 'SIGAI',
    'ACM SIGAI': 'SIGAI',
    'IOT / IEI': 'IEI',
    'IOT/IEI': 'IEI',
    'IOT': 'IEI',
    'IEI': 'IEI',
    'IEI - TCET': 'IEI',
    'ACM - TCET': 'ACM',
    'CSI - TCET': 'CSI',
    'ASCE - TCET': 'ASCE',
    'OWASP - TCET': 'OWASP',
    'TRS - TCET': 'TRS',
    'The Robotics Society': 'TRS',
    'The Robotics Society - TCET': 'TRS',
    'S4DS - TCET': 'S4DS',
    'IEEE - TCET': 'IEEE',
    'IETE - TCET': 'IETE',
    'ASME - TCET': 'ASME',
    'AAAI - TCET': 'AAAI',
    'BBA - TCET': 'BBA',
    'RC - TCET': 'RC',
    'RC': 'RC',
    'Rotaract': 'RC',
    'Rotaract Club': 'RC',
    'MAVERICS': 'MAVERICS',
    'Maverics': 'MAVERICS',
    'MAVERICS - TCET': 'MAVERICS',
    'ECLIPSE RACING CLUB': 'ECLIPSE RACING CLUB',
    'Eclipse Racing Club': 'ECLIPSE RACING CLUB',
    'RACING CLUB': 'ECLIPSE RACING CLUB',
    'Racing Club': 'ECLIPSE RACING CLUB',
    'ECLIPSE': 'ECLIPSE RACING CLUB',
    'MAVERICS × ECLIPSE RACING CLUB': 'MAVERICS × ECLIPSE RACING CLUB',
    'MAVERICS × ECLIPSE': 'MAVERICS × ECLIPSE RACING CLUB',
    'Maverics × Eclipse Racing Club': 'MAVERICS × ECLIPSE RACING CLUB',
  };

  return direct[normalized] || normalized.toUpperCase();
}

export function normalizePhoneNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return '';
  const withCountry = digits.startsWith('91') ? digits : `91${digits.replace(/^0+/, '')}`;
  return withCountry.length === 12 ? withCountry : '';
}

export function formatPhoneDisplay(value) {
  const normalized = normalizePhoneNumber(value);
  if (!normalized) return '';
  return `+91 ${normalized.slice(2, 7)} ${normalized.slice(7)}`;
}

export function getRegistrationRouteForEvent(event) {
  if (!event) return [];
  const key = event.title || event.name || event.eventName || '';
  const byTitle = EVENT_COMMITTEE_ROUTE[key];
  if (byTitle && byTitle.length) return byTitle;

  const committeeList = Array.isArray(event.committeesList)
    ? event.committeesList
    : Array.isArray(event.committees)
      ? event.committees
      : [];

  const normalized = committeeList.map((entry) => normalizeCommitteeKey(entry)).filter(Boolean);
  if (normalized.length) return normalized;

  const primary = normalizeCommitteeKey(event.primaryCommittee || event.committee || event.tag || '');
  return primary ? [primary] : [];
}

export function getCommitteeContact(committeeKey) {
  const normalized = normalizeCommitteeKey(committeeKey);
  return COMMITTEE_CONTACTS[normalized] || null;
}

