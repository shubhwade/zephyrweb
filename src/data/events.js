// Complete 67 Verified Events for ZEPHYR 2025
import rawEvents from '../events-data.json';

export const CATEGORIES = [
  "All",
  "Gaming",
  "Coding & AI",
  "Technical & Core",
  "Workshops",
  "Sports & Fun",
  "Cultural & Creative"
];

// Helper to determine accurate category
export function getEventCategory(event) {
  const t = (event.title || "").toLowerCase();
  const d = (event.desc || "").toLowerCase();

  if (
    t.includes("valorant") ||
    t.includes("codm") ||
    t.includes("bgmi") ||
    t.includes("fifa") ||
    t.includes("fc24") ||
    t.includes("free fire") ||
    t.includes("chess") ||
    t.includes("tekken") ||
    t.includes("mortal kombat") ||
    t.includes("pubg") ||
    t.includes("clash royale") ||
    t.includes("rocket league") ||
    t.includes("e football") ||
    t.includes("stumble guys") ||
    t.includes("arcade game") ||
    t.includes("wwe") ||
    (d.includes("gaming") && !d.includes("cricket") && !d.includes("football")) ||
    (d.includes("tournament") && !d.includes("cricket") && !d.includes("football"))
  ) {
    return "Gaming";
  }

  if (
    t.includes("workshop") ||
    t.includes("hands-on") ||
    t.includes("training") ||
    t.includes("masterclass") ||
    t.includes("garba") ||
    t.includes("dance workshop") ||
    t.includes("art workshop") ||
    t.includes("3d printing") ||
    t.includes("gen ai workshop") ||
    t.includes("content creation")
  ) {
    return "Workshops";
  }

  if (
    t.includes("code") ||
    t.includes("hack") ||
    t.includes("ctf") ||
    t.includes("capture the flag") ||
    t.includes("ai") ||
    t.includes("ml") ||
    t.includes("hunt") ||
    t.includes("tech hunt") ||
    t.includes("prompt") ||
    t.includes("ideathon") ||
    t.includes("anomaly") ||
    t.includes("canvasphere") ||
    d.includes("coding") ||
    d.includes("python") ||
    d.includes("developer") ||
    d.includes("algorithm") ||
    d.includes("ethical hacking")
  ) {
    return "Coding & AI";
  }

  if (
    t.includes("football") ||
    t.includes("cricket") ||
    t.includes("bullseye") ||
    t.includes("laser") ||
    t.includes("box") ||
    t.includes("rink") ||
    t.includes("dodgeball") ||
    t.includes("gel blaster") ||
    t.includes("bowling") ||
    t.includes("arm wrestling") ||
    t.includes("tug of war") ||
    t.includes("squid game") ||
    t.includes("dart football") ||
    t.includes("dare pong") ||
    t.includes("spin the wheel") ||
    t.includes("f1 reaction") ||
    t.includes("baton") ||
    d.includes("nerf") ||
    d.includes("sports")
  ) {
    return "Sports & Fun";
  }

  if (
    t.includes("cad") ||
    t.includes("bridge") ||
    t.includes("circuit") ||
    t.includes("robot") ||
    t.includes("drone") ||
    t.includes("line follower") ||
    t.includes("project presentation") ||
    t.includes("space blitz") ||
    t.includes("simulator") ||
    d.includes("hardware") ||
    d.includes("engineering") ||
    d.includes("3d printing") ||
    d.includes("ar vr")
  ) {
    return "Technical & Core";
  }

  if (
    t.includes("escape room") ||
    t.includes("scavenger hunt") ||
    t.includes("mystery") ||
    t.includes("haunted") ||
    t.includes("photo booth") ||
    t.includes("murderer") ||
    t.includes("takeshi") ||
    t.includes("skribble") ||
    t.includes("power show")
  ) {
    return "Cultural & Creative";
  }

  return "Technical & Core";
}

// Normalize and enrich all 67 raw events
export const ALL_EVENTS = rawEvents.map((evt) => {
  const category = getEventCategory(evt);
  const tagRaw = evt.tag || evt.college || "TSDW";
  const isCollab = tagRaw.includes(",");
  
  // Extract participating committees
  let committeesList = [];
  if (isCollab) {
    committeesList = tagRaw.split(",").map((s) => s.trim().toUpperCase());
  } else {
    committeesList = [tagRaw.trim().toUpperCase()];
  }

  // Normalize primary committee mapping
  let primaryCommittee = committeesList[0];
  if (primaryCommittee === "ACM-SIGAI") primaryCommittee = "SIGAI";
  if (primaryCommittee === "IEI") primaryCommittee = "IOT";

  // Build collaboration note
  let collabNote = null;
  if (isCollab) {
    collabNote = `Joint Initiative: ${committeesList.join(" × ")}`;
  }

  const priceNum = parseInt(evt.price, 10);
  const isFree = !evt.price || evt.price === "0" || evt.price === "Free" || isNaN(priceNum);
  const priceDisplay = isFree ? "Free Entry" : `₹${evt.price}`;

  const teamMin = evt.teamSize?.min || 1;
  const teamMax = evt.teamSize?.max || 1;
  let teamDisplay = "Solo (1 Player)";
  if (teamMin === teamMax && teamMin > 1) {
    teamDisplay = `Team of ${teamMin}`;
  } else if (teamMin !== teamMax) {
    teamDisplay = `${teamMin}–${teamMax} Players`;
  }

  return {
    ...evt,
    id: evt.id,
    title: evt.title,
    tag: tagRaw,
    primaryCommittee,
    committeesList,
    isCollab,
    collabNote,
    category,
    priceDisplay,
    isFree,
    prizeDisplay: evt.prize_pool || "Exciting Vouchers & Trophies",
    teamMin,
    teamMax,
    teamDisplay,
    image: evt.localImage || evt.image || `/event${evt.id}.webp`,
    phone_no: evt.phone_no || "9987330273",
  };
});

// Fast real-time multi-criteria search function
export function filterAndSearchEvents({
  events = ALL_EVENTS,
  searchQuery = "",
  selectedCommittee = "ALL",
  selectedCategory = "All",
  priceFilter = "all", // 'all' | 'free' | 'paid'
}) {
  const query = searchQuery.trim().toLowerCase();

  return events.filter((evt) => {
    // 1. Text Search matching title, tags, description, collab notes, category
    if (query !== "") {
      const titleMatch = evt.title.toLowerCase().includes(query);
      const tagMatch = evt.tag.toLowerCase().includes(query);
      const descMatch = (evt.desc || "").toLowerCase().includes(query);
      const catMatch = evt.category.toLowerCase().includes(query);
      const collabMatch = evt.collabNote ? evt.collabNote.toLowerCase().includes(query) : false;
      const committeeMatch = evt.committeesList.some((c) => c.toLowerCase().includes(query));

      if (!titleMatch && !tagMatch && !descMatch && !catMatch && !collabMatch && !committeeMatch) {
        return false;
      }
    }

    // 2. Committee Filter
    if (selectedCommittee !== "ALL") {
      const normSelected = selectedCommittee.toUpperCase();
      const hasCommittee = evt.committeesList.some((c) => {
        if (normSelected === "SIGAI") return c.includes("SIGAI");
        if (normSelected === "IOT") return c.includes("IEI") || c.includes("IOT");
        return c.includes(normSelected);
      });

      if (!hasCommittee) {
        return false;
      }
    }

    // 3. Category Filter
    if (selectedCategory !== "All") {
      if (evt.category !== selectedCategory) {
        return false;
      }
    }

    // 4. Price Filter
    if (priceFilter === "free" && !evt.isFree) {
      return false;
    }
    if (priceFilter === "paid" && evt.isFree) {
      return false;
    }

    return true;
  });
}
