/**
 * ParkAdda Configuration and Event-to-Package Mapping for ZEPHYR 2026
 *
 * Official Destination:
 * Event ID: ZEPHYR26
 * Direct Cart / Booking URL:
 * https://staging.parkadda.com/events/book?event_id=ZEPHYR26&package_code=<PACKAGE_CODE>
 *
 * Passing `package_code` automatically selects the competition and populates it into "Your cart" on ParkAdda.
 */

export const PARKADDA_CONFIG = {
  baseUrl: 'https://www.parkadda.com',
  eventsUrl: 'https://www.parkadda.com/events',
  bookEndpoint: '/events',
  viewEndpoint: '/events',
  defaultEventId: 'ZEPHYR26',
  portalName: 'ParkAdda',
};

/**
 * Verified mapping between ZEPHYR festival events and ParkAdda package codes.
 * Extracted and validated directly against ParkAdda staging portal for ZEPHYR26.
 */
export const EVENT_PARKADDA_MAP = {
  // CSI Events
  'garba-workshop': { eventId: 'ZEPHYR26', packageCode: 'CSI_GARBA_WS', eventName: 'Garba Workshop' },
  'rink-football': { eventId: 'ZEPHYR26', packageCode: 'CSI_RINK_FB', eventName: 'Rink Football' },
  'neon-cricket': { eventId: 'ZEPHYR26', packageCode: 'CSI_NEON_CRICKET', eventName: 'Neon Cricket' },
  'cricket-auction': { eventId: 'ZEPHYR26', packageCode: 'CSI_CRICK_AUCT', eventName: 'Cricket Auction' },
  codm: { eventId: 'ZEPHYR26', packageCode: 'CSI_CODM', eventName: 'CodM' },
  'tech-hunt': { eventId: 'ZEPHYR26', packageCode: 'CSI_TECH_HUNT', eventName: 'Tech Hunt' },
  'human-snake-ladder': { eventId: 'ZEPHYR26', packageCode: 'CSI_SNAKE_LAD', eventName: 'Human Snake Ladder' },

  // ASCE Events
  'tug-of-war': { eventId: 'ZEPHYR26', packageCode: 'ASCE_TUG_5P1', eventName: 'Tug of War' },
  'tug-of-war-5p1': { eventId: 'ZEPHYR26', packageCode: 'ASCE_TUG_5P1', eventName: 'Tug of War (5+1)' },
  'tug-of-war-7p1': { eventId: 'ZEPHYR26', packageCode: 'ASCE_TUG_7P1', eventName: 'Tug of War (7+1)' },
  'neon-dodgeball': { eventId: 'ZEPHYR26', packageCode: 'ASCE_NEON_DODGE', eventName: 'Neon Dodgeball' },
  'free-fire-classic': { eventId: 'ZEPHYR26', packageCode: 'ASCE_FF_CLASSIC', eventName: 'Free Fire (Classic)' },
  'bgmi-classic': { eventId: 'ZEPHYR26', packageCode: 'ASCE_BGMI_CLASSIC', eventName: 'BGMI (Classic)' },
  'asce-bgmi-classic': { eventId: 'ZEPHYR26', packageCode: 'ASCE_BGMI_CLASSIC', eventName: 'BGMI (Classic)' },
  'iete-bgmi-classic': { eventId: 'ZEPHYR26', packageCode: 'ASCE_BGMI_CLASSIC', eventName: 'BGMI (Classic)' },
  'ieee-bgmi-classic': { eventId: 'ZEPHYR26', packageCode: 'ASCE_BGMI_CLASSIC', eventName: 'BGMI (Classic)' },

  // TRS Events
  'glow-carrom': { eventId: 'ZEPHYR26', packageCode: 'TRS_GLOW_CARROM', eventName: 'Glow Carrom' },
  'bgmi-tdm': { eventId: 'ZEPHYR26', packageCode: 'TRS_BGMI_TDM', eventName: 'BGMI (TDM)' },
  'cad-competiton': { eventId: 'ZEPHYR26', packageCode: 'TRS_CAD_COMP', eventName: 'CAD Competiton' },
  'cad-competition': { eventId: 'ZEPHYR26', packageCode: 'TRS_CAD_COMP', eventName: 'CAD Competition' },
  'technical-event-autocad': { eventId: 'ZEPHYR26', packageCode: 'TRS_CAD_COMP', eventName: 'Technical Event (AutoCAD)' },
  '3d-printing': { eventId: 'ZEPHYR26', packageCode: 'TRS_3D_PRINT', eventName: '3D Printing' },
  'fall-guys': { eventId: 'ZEPHYR26', packageCode: 'TRS_FALL_GUYS', eventName: 'Fall Guys' },

  // ACM Events
  valorant: { eventId: 'ZEPHYR26', packageCode: 'ACM_VALORANT', eventName: 'Valorant' },
  'dance-workshop': { eventId: 'ZEPHYR26', packageCode: 'ACM_DANCE_WS', eventName: 'Dance Workshop' },
  vibecoding: { eventId: 'ZEPHYR26', packageCode: 'ACM_VIBECODE', eventName: 'Vibecoding' },
  'escape-room': { eventId: 'ZEPHYR26', packageCode: 'ACM_ESCAPE', eventName: 'Escape Room' },
  'scavenger-hunt': { eventId: 'ZEPHYR26', packageCode: 'ACM_SCAV_HUNT', eventName: 'Scavenger Hunt' },
  'power-show': { eventId: 'ZEPHYR26', packageCode: 'ACM_POWER_SHOW', eventName: 'Power Show' },
  'wwe-console': { eventId: 'ZEPHYR26', packageCode: 'ACM_WWE', eventName: 'WWE Console' },
  'cyber-heist': { eventId: 'ZEPHYR26', packageCode: 'ACM_CYBER_HEIST', eventName: 'Cyber Heist' },

  // S4DS Events
  'neon-bowling': { eventId: 'ZEPHYR26', packageCode: 'S4DS_NEON_BOWL', eventName: 'Neon Bowling' },
  'canvashpere-hack': { eventId: 'ZEPHYR26', packageCode: 'S4DS_CANVASHACK', eventName: 'Canvashpere Hack' },
  traitors: { eventId: 'ZEPHYR26', packageCode: 'S4DS_TRAITORS', eventName: 'Traitors' },
  'human-foosball': { eventId: 'ZEPHYR26', packageCode: 'S4DS_FOOSBALL', eventName: 'Human Foosball' },

  // IEEE Events
  'gel-blaster': { eventId: 'ZEPHYR26', packageCode: 'IEEE_GEL_BLAST', eventName: 'Gel Blaster' },
  'ar-cricket': { eventId: 'ZEPHYR26', packageCode: 'IEEE_AR_CRICKET', eventName: 'AR Cricket' },
  ideathon: { eventId: 'ZEPHYR26', packageCode: 'IEEE_IDEATHON', eventName: 'Ideathon' },
  'art-workshop-tote-bag': { eventId: 'ZEPHYR26', packageCode: 'IEEE_TOTEBAG_WS', eventName: 'Art Workshop (Tote Bag)' },
  'catch-the-baton': { eventId: 'ZEPHYR26', packageCode: 'IEEE_BATON', eventName: 'Catch the Baton' },

  // IETE Events
  'fifa-ps5': { eventId: 'ZEPHYR26', packageCode: 'IETE_FIFA_PS5', eventName: 'FIFA PS5' },
  'haunted-house': { eventId: 'ZEPHYR26', packageCode: 'IETE_HAUNTED', eventName: 'Haunted House' },
  'arm-wrestling': { eventId: 'ZEPHYR26', packageCode: 'IETE_ARM_WREST', eventName: 'Arm Wrestling' },
  'squid-game': { eventId: 'ZEPHYR26', packageCode: 'IETE_SQUID', eventName: 'Squid Game' },
  'gen-ai-workshop': { eventId: 'ZEPHYR26', packageCode: 'IETE_GENAI_WS', eventName: 'Gen AI Workshop' },
  'content-creation-workshop': { eventId: 'ZEPHYR26', packageCode: 'IETE_CONTENT_WS', eventName: 'Content Creation Workshop' },

  // SIGAI Events
  'box-cricket': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_BOX_CRICKET', eventName: 'Box Cricket' },
  'mystery-maze': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_MYSTERY', eventName: 'Mystery Maze' },
  // Takeshi's Castle
  'takeshis-castle': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle" },
  'takeshi-s-castle': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle" },
  'takeshi-castle': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle" },
  'sigai-takeshis-castle': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle" },
  'sigai-takeshi-s-castle': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle" },
  'takeshis-castle-2p': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI_2P', eventName: "Takeshi's Castle (2 Players)" },
  'takeshis-castle-4p': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle (4 Players)" },
  'takeshis-castle-2-players': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI_2P', eventName: "Takeshi's Castle (2 Players)" },
  'takeshis-castle-4-players': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_TAKESHI', eventName: "Takeshi's Castle (4 Players)" },
  'free-fire-tdm': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_FF_TDM', eventName: 'Free Fire (TDM)' },
  'ai-crime-lab': { eventId: 'ZEPHYR26', packageCode: 'SIGAI_AI_CRIME', eventName: 'AI Crime Lab' },

  // IEI / IOT Events
  'neon-football': { eventId: 'ZEPHYR26', packageCode: 'IEI_NEON_FB', eventName: 'Neon Football' },
  'neon-football-solo': { eventId: 'ZEPHYR26', packageCode: 'IEI_NEON_FB', eventName: 'Neon Football (Solo)' },
  'neon-football-duo': { eventId: 'ZEPHYR26', packageCode: 'IEI_NEON_FB_DUO', eventName: 'Neon Football (Duo)' },
  'ar-vr-space-blitz': { eventId: 'ZEPHYR26', packageCode: 'IEI_ARVR_BLITZ', eventName: 'AR-VR Space Blitz' },
  'two-minute-arcade': { eventId: 'ZEPHYR26', packageCode: 'IEI_2MIN_ARC', eventName: 'Two Minute Arcade' },
  'model-rocketry-workshop': { eventId: 'ZEPHYR26', packageCode: 'IEI_AI_IOT_WS', eventName: 'Model Rocketry Workshop' },
  'workshop-on-ai-iot': { eventId: 'ZEPHYR26', packageCode: 'IEI_AI_IOT_WS', eventName: 'Model Rocketry Workshop' },
  'mortal-kombat': { eventId: 'ZEPHYR26', packageCode: 'IEI_MK', eventName: 'Mortal Kombat' },

  // ASME Events
  'football-dart': { eventId: 'ZEPHYR26', packageCode: 'ASME_FB_DART_SOLO', eventName: 'Football Dart' },
  'football-dart-single': { eventId: 'ZEPHYR26', packageCode: 'ASME_FB_DART_SOLO', eventName: 'Football Dart (Single)' },
  'football-dart-duo': { eventId: 'ZEPHYR26', packageCode: 'ASME_FB_DART_DUO', eventName: 'Football Dart (Duo)' },
  'spin-the-wheel': { eventId: 'ZEPHYR26', packageCode: 'ASME_SPIN_SOLO', eventName: 'Spin the Wheel' },
  'spin-the-wheel-single': { eventId: 'ZEPHYR26', packageCode: 'ASME_SPIN_SOLO', eventName: 'Spin the Wheel (Single)' },
  'spin-the-wheel-duo': { eventId: 'ZEPHYR26', packageCode: 'ASME_SPIN_DUO', eventName: 'Spin the Wheel (Duo)' },
  'racing-team': { eventId: 'ZEPHYR26', packageCode: 'ASME_SOLIDWORKS', eventName: 'Racing Team' },
  'workshop-solidworks': { eventId: 'ZEPHYR26', packageCode: 'ASME_SOLIDWORKS', eventName: 'Racing Team' },

  // OWASP Events
  'capture-the-flag': { eventId: 'ZEPHYR26', packageCode: 'OWASP_CTF', eventName: 'Capture The Flag' },
  'rocket-league': { eventId: 'ZEPHYR26', packageCode: 'OWASP_ROCKET', eventName: 'Rocket League' },
  'efootball-mobile': { eventId: 'ZEPHYR26', packageCode: 'OWASP_EFOOT', eventName: 'eFootball Mobile' },

  // AAAI Events
  'among-us': { eventId: 'ZEPHYR26', packageCode: 'AAAI_AMONG_US', eventName: 'AMONG US' },
  'the-sql-investigation': { eventId: 'ZEPHYR26', packageCode: 'AAAI_SQL_INV', eventName: 'The SQL Investigation' },

  // BBA Events
  photobooth: { eventId: 'ZEPHYR26', packageCode: 'BBA_PHOTOBOOTH', eventName: 'Photobooth' },
  'photo-booth': { eventId: 'ZEPHYR26', packageCode: 'BBA_PHOTOBOOTH', eventName: 'Photobooth' },
  'bba-photobooth': { eventId: 'ZEPHYR26', packageCode: 'BBA_PHOTOBOOTH', eventName: 'Photobooth' },
};

/**
 * Normalizes an event name or slug into a lookup key.
 */
function normalizeKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Resolves the ParkAdda mapping configuration for a given event object or identifier.
 * Returns null if the event is not mapped to a verified ParkAdda package.
 *
 * @param {object|string} eventOrId
 * @returns {{ eventId: string, packageCode: string, eventName: string } | null}
 */
export function getParkAddaMapping(eventOrId) {
  if (!eventOrId) return null;

  const candidates = [];
  if (typeof eventOrId === 'string') {
    candidates.push(eventOrId);
  } else if (typeof eventOrId === 'object') {
    if (eventOrId.id) candidates.push(eventOrId.id);
    if (eventOrId.title) candidates.push(eventOrId.title);
    if (eventOrId.eventName) candidates.push(eventOrId.eventName);
  }

  for (const candidate of candidates) {
    const key = normalizeKey(candidate);
    if (EVENT_PARKADDA_MAP[key]) {
      return EVENT_PARKADDA_MAP[key];
    }
    // Also try stripping committee prefixes (e.g. sigai-takeshis-castle -> takeshis-castle)
    const strippedKey = key.replace(/^(csi|asce|owasp|trs|acm|s4ds|ieee|iete|sigai|iei|iot|asme|aaai|bba)-+/i, '');
    if (EVENT_PARKADDA_MAP[strippedKey]) {
      return EVENT_PARKADDA_MAP[strippedKey];
    }
    // Also try apostrophe variation (takeshi-s-castle <-> takeshis-castle)
    const variant1 = key.replace(/-s-/g, 's-');
    if (EVENT_PARKADDA_MAP[variant1]) return EVENT_PARKADDA_MAP[variant1];
    const variant2 = strippedKey.replace(/-s-/g, 's-');
    if (EVENT_PARKADDA_MAP[variant2]) return EVENT_PARKADDA_MAP[variant2];
  }

  // Check if the event object already has packageCode or parkAddaEventId
  if (typeof eventOrId === 'object') {
    if (eventOrId.packageCode) {
      return {
        eventId: eventOrId.parkAddaEventId || PARKADDA_CONFIG.defaultEventId,
        packageCode: eventOrId.packageCode,
        eventName: eventOrId.title || eventOrId.eventName || '',
      };
    }
  }

  return null;
}

/**
 * Resolves the ParkAdda Event ID for a given event object or identifier.
 */
export function getParkAddaEventId(eventOrId) {
  const mapping = getParkAddaMapping(eventOrId);
  return mapping ? mapping.eventId : null;
}

/**
 * Resolves the ParkAdda Package Code for a given event object or identifier.
 */
export function getParkAddaPackageCode(eventOrId) {
  const mapping = getParkAddaMapping(eventOrId);
  return mapping ? mapping.packageCode : null;
}

/**
 * Safely constructs the verified ParkAdda URL.
 * Redirects all event registrations to https://www.parkadda.com/events.
 *
 * @param {string} [eventId]
 * @param {string} [packageCode]
 * @returns {string} - Exact ParkAdda events portal URL
 */
export function buildParkAddaUrl(eventId, packageCode) {
  return PARKADDA_CONFIG.eventsUrl;
}

/**
 * Resolves the official verified ParkAdda URL that redirects to the events portal.
 * Redirects all registrations directly to https://www.parkadda.com/events.
 *
 * @param {object|string} [eventOrId] - The event object or identifier
 * @returns {string} - Direct ParkAdda events portal URL: https://www.parkadda.com/events
 */
export function getParkAddaEventUrl(eventOrId) {
  return PARKADDA_CONFIG.eventsUrl;
}
