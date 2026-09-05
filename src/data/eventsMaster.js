const normalizeCommitteeId = (committee) => {
  if (!committee) return null;
  const value = String(committee).trim();
  if (!value) return null;
  return value.replace(/\s*-\s*TCET\s*$/i, '').trim().toUpperCase();
};

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'event';

const EVENT_DETAILS = {
  'Garba Workshop': { prizePool: 'Not listed', priceDisplay: '₹200', teamDisplay: 'Individual' },
  'Rink Football': { prizePool: 'Worth ₹3,500', priceDisplay: '₹450', teamDisplay: '5+2' },
  'Neon Cricket': { prizePool: 'Worth ₹2,500', priceDisplay: '₹250', teamDisplay: '5' },
  'Cricket Auction': { prizePool: 'Worth ₹6,000', priceDisplay: '₹400', teamDisplay: '5' },
  'CodM': { prizePool: 'Worth ₹2,000', priceDisplay: '₹150', teamDisplay: '5' },
  'Tech Hunt': { prizePool: 'Worth ₹1,000', priceDisplay: '₹100', teamDisplay: '3' },
  'Human Snake Ladder': { prizePool: 'Coupons', priceDisplay: '₹50', teamDisplay: 'Solo' },
  'Tug of War': {
    prizePool: '₹2,500',
    priceDisplay: '₹300 (5+1) / ₹400 (7+1)',
    teamDisplay: '5+1 or 7+1',
    options: [
      { key: '5p1', label: '5+1 Team', priceDisplay: '₹300', packageCode: 'ASCE_TUG_5P1' },
      { key: '7p1', label: '7+1 Team', priceDisplay: '₹400', packageCode: 'ASCE_TUG_7P1' }
    ]
  },
  'Box Cricket': { prizePool: '₹9,000', priceDisplay: '₹400', teamDisplay: '7' },
  Valorant: { prizePool: '₹18,000', priceDisplay: '₹400', teamDisplay: '5' },
  'BGMI (Classic)': { prizePool: '₹12,000', priceDisplay: '₹200', teamDisplay: '4' },
  'Technical Event (AutoCAD)': { prizePool: 'Not listed', priceDisplay: 'Not listed', teamDisplay: 'Individual' },
  'Neon Dodgeball': { prizePool: 'Not listed', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'Free Fire (Classic)': { prizePool: '₹8,000', priceDisplay: '₹200', teamDisplay: '4+1' },
  'Capture The Flag': { prizePool: '₹5,000', priceDisplay: '₹100', teamDisplay: 'Solo or Duo' },
  'Rocket League': { prizePool: '₹1,500', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'eFootball Mobile': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'WWE Console': { prizePool: 'Not listed', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Glow Carrom': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Solo' },
  'BGMI (TDM)': { prizePool: '₹8,000', priceDisplay: '₹200', teamDisplay: '4' },
  'CAD Competiton': { prizePool: '₹5,000', priceDisplay: '₹200', teamDisplay: 'Individual' },
  '3D Printing': { prizePool: 'Certificates', priceDisplay: '₹200', teamDisplay: 'Individual' },
  'Fall Guys': { prizePool: '₹1,500', priceDisplay: '₹80', teamDisplay: 'Individual' },
  'Dance Workshop': { prizePool: 'E-Certificates', priceDisplay: '₹150', teamDisplay: 'Individual' },
  Vibecoding: { prizePool: '₹2,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Escape Room': { prizePool: '₹3,000', priceDisplay: '₹250', teamDisplay: '4' },
  'Scavenger Hunt': { prizePool: '₹3,000', priceDisplay: '₹200', teamDisplay: '4' },
  'Power Show': { prizePool: '₹3,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Neon Bowling': { prizePool: '₹2,000', priceDisplay: '₹120', teamDisplay: 'Solo' },
  'Canvashpere Hack': { prizePool: 'Not listed', priceDisplay: '₹50', teamDisplay: 'Individual' },
  Traitors: { prizePool: '₹3,000', priceDisplay: '₹200', teamDisplay: '4' },
  'Gel Blaster': { prizePool: 'Kind', priceDisplay: '₹300', teamDisplay: '4' },
  'Human Foosball': { prizePool: '₹2,000', priceDisplay: '₹200', teamDisplay: '4' },
  'AR Cricket': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Individual' },
  Ideathon: { prizePool: '₹10,000', priceDisplay: '₹100', teamDisplay: '2/3/4' },
  'Art Workshop (Tote Bag)': { prizePool: 'Not listed', priceDisplay: '₹225', teamDisplay: 'Individual' },
  'Catch the Baton': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'FIFA PS5': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Individual' },
  'Haunted House': { prizePool: '₹3,500', priceDisplay: '₹100', teamDisplay: '4' },
  'Arm Wrestling': { prizePool: '₹3,000', priceDisplay: '₹30', teamDisplay: 'Individual' },
  'Squid Game': { prizePool: '₹3,000', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Gen AI Workshop': { prizePool: '₹1,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Content Creation Workshop': { prizePool: '₹500', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Mystery Maze': { prizePool: '₹7,000', priceDisplay: '₹160 (2 Players) / ₹280 (4 Players)', teamDisplay: '2 or 4 Players' },
  "Takeshi's Castle": {
    prizePool: '₹7,500',
    priceDisplay: '₹170 (2 Players) / ₹300 (4 Players)',
    teamDisplay: '2 or 4 Players',
    options: [
      { key: '2p', label: '2 Players', priceDisplay: '₹170', packageCode: 'SIGAI_TAKESHI_2P' },
      { key: '4p', label: '4 Players', priceDisplay: '₹300', packageCode: 'SIGAI_TAKESHI' }
    ]
  },
  'Free Fire (TDM)': { prizePool: '₹7,000', priceDisplay: '₹140 (2 Players) / ₹250 (4 Players)', teamDisplay: '2 or 4 Players' },
  'AI Crime Lab': { prizePool: '₹6,000', priceDisplay: '₹60', teamDisplay: 'Solo' },
  'Neon Football': {
    prizePool: '₹5,500',
    priceDisplay: '₹80 (Solo) / ₹140 (Duo)',
    teamDisplay: 'Solo or Duo',
    options: [
      { key: 'solo', label: 'Solo', priceDisplay: '₹80', packageCode: 'IEI_NEON_FB' },
      { key: 'duo', label: 'Duo', priceDisplay: '₹140', packageCode: 'IEI_NEON_FB_DUO' }
    ]
  },
  'AR-VR Space Blitz': { prizePool: '₹2,000', priceDisplay: '₹130', teamDisplay: 'Individual' },
  'Two Minute Arcade': { prizePool: '₹1,500', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Model Rocketry Workshop': { prizePool: '₹2,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Workshop on AI-IoT': { prizePool: '₹2,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Mortal Kombat': { prizePool: '₹2,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'Football Dart': {
    prizePool: 'Vouchers',
    priceDisplay: '₹40 Single / ₹60 Duo',
    teamDisplay: 'Solo or Duo',
    options: [
      { key: 'single', label: 'Single', priceDisplay: '₹40', packageCode: 'ASME_FB_DART_SOLO' },
      { key: 'duo', label: 'Duo', priceDisplay: '₹60', packageCode: 'ASME_FB_DART_DUO' }
    ]
  },
  'Spin the Wheel': {
    prizePool: 'Vouchers',
    priceDisplay: '₹30 Single / ₹50 Duo',
    teamDisplay: 'Solo or Duo',
    options: [
      { key: 'single', label: 'Single', priceDisplay: '₹30', packageCode: 'ASME_SPIN_SOLO' },
      { key: 'duo', label: 'Duo', priceDisplay: '₹50', packageCode: 'ASME_SPIN_DUO' }
    ]
  },
  'Racing Team': { prizePool: 'Online Certificate', priceDisplay: '₹500', teamDisplay: 'Individual' },
  'Workshop Solidworks': { prizePool: 'Online Certificate', priceDisplay: '₹500', teamDisplay: 'Individual' },
  'AMONG US': { prizePool: '₹2,000', priceDisplay: '₹60', teamDisplay: 'Solo' },
  'The SQL Investigation': { prizePool: '₹1,000', priceDisplay: '₹30', teamDisplay: 'Individual' },
  Photobooth: { prizePool: 'Not listed', priceDisplay: '₹100', teamDisplay: 'Solo or Group' },
  'Cyber Heist': { prizePool: '₹1,000', priceDisplay: '₹50', teamDisplay: 'Individual' }
};

export const MASTER_EVENTS = [
  {eventName:'Garba Workshop',committees:['CSI'],category:'Creative',image:'/wordmark/garba.jpg',imageAlt:'Garba dancers performing in a circular formation',description:'A vibrant Garba workshop blending rhythm and traditional Gujarati energy.',isShared:false},
  {eventName:'Rink Football',committees:['CSI'],category:'Sports',image:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',imageAlt:'Indoor rink football players competing in an enclosed arena',description:'Fast indoor football with tight turnarounds and tactical pressure.',isShared:false},
  {eventName:'Neon Cricket',committees:['CSI'],category:'Sports',image:'/wordmark/neon cricket.jpg',imageAlt:'Neon lit cricket action with glowing pitch lines',description:'A futuristic cricket showdown lit by UV energy and electric atmosphere.',isShared:false},
  {eventName:'Cricket Auction',committees:['CSI'],category:'Sports',image:'/wordmark/cricket auction.jpg',imageAlt:'Cricket auctioneer and bidders in a dramatic sports event setting',description:'Build a dream XI under pressure while bidding strategically for players.',isShared:false},
  {eventName:'CodM',committees:['CSI'],category:'Gaming',image:'/wordmark/codm.jpg',imageAlt:'Call of Duty Mobile tactical squad combat in a cinematic battle scene',description:'A mobile tactical shooter with quick rounds and squad coordination.',isShared:false},
  {eventName:'Tech Hunt',committees:['CSI'],category:'Tech',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students solving digital clues around screens and tech stations',description:'A clue-based technology challenge blending puzzles and rapid problem solving.',isShared:false},
  {eventName:'Human Snake Ladder',committees:['CSI'],category:'Puzzle / Experience',image:'/wordmark/human snakes n ladders.jpg',imageAlt:'People stepping on a giant human snake and ladder board',description:'A campus-sized game of luck and movement with a playful social twist.',isShared:false},
  {eventName:'Tug of War',committees:['ASCE'],category:'Sports',image:'/wordmark/tug of war.jpg',imageAlt:'Two teams pulling a rope in a competitive tug-of-war challenge',description:'A raw strength contest defined by teamwork, balance and endurance.',isShared:false},
  {eventName:'Box Cricket',committees:['ASCE','OWASP','SIGAI'],category:'Sports',image:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',imageAlt:'Enclosed box cricket pitch with a batsman in action',description:'A fast and intense enclosed cricket showdown with quick scoring moments.',isShared:true},
  {eventName:'Valorant',committees:['ASCE','ACM','S4DS','IEEE'],category:'Gaming',image:'/wordmark/valorant.jpg',imageAlt:'Cinematic tactical shooter scene with Valorant-inspired agents',description:'Precision-first tactical shooter action centred on strategy and coordination.',isShared:true},
  {eventName:'BGMI (Classic)',committees:['ASCE','IEEE','IETE'],category:'Gaming',image:'/wordmark/bgmi.jpg',imageAlt:'Battle royale gameplay in a tactical survival environment',description:'Classic battle royale survival where positioning and team play decide the winner.',isShared:true},
  {eventName:'Technical Event (AutoCAD)',committees:['ASCE'],category:'Tech',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'Engineering workstation showing CAD design and technical drawings',description:'A precision AutoCAD challenge focused on design quality and technical accuracy.',isShared:false},
  {eventName:'Neon Dodgeball',committees:['ASCE'],category:'Sports',image:'/wordmark/neon dodgeball.jpg',imageAlt:'Neon lit dodgeball match in a dark arena',description:'A high-speed dodgeball battle under ultraviolet lights and competitive pressure.',isShared:false},
  {eventName:'Free Fire (Classic)',committees:['ASCE'],category:'Gaming',image:'/wordmark/free fire.jpg',imageAlt:'Battle royale action in a classic survival setting',description:'A squad survival experience built on movement, timing and smart decisions.',isShared:false},
  {eventName:'Capture The Flag',committees:['OWASP'],category:'Tech',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Cybersecurity CTF environment with terminals and flags',description:'A cybersecurity challenge packed with puzzle solving and technical discovery.',isShared:false},
  {eventName:'Rocket League',committees:['OWASP'],category:'Gaming',image:'/wordmark/rocket league.jpg',imageAlt:'Rocket-powered cars playing football in a futuristic arena',description:'A fast-paced football showdown where speed and control are everything.',isShared:false},
  {eventName:'eFootball Mobile',committees:['OWASP'],category:'Gaming',image:'/wordmark/efootball mobile.jpg',imageAlt:'Mobile football action on a gaming setup with stadium lighting',description:'A tactical mobile football clash with quick passing and decisive finishes.',isShared:false},
  {eventName:'WWE Console',committees:['ACM','OWASP'],category:'Gaming',image:'/wordmark/wwe console.jpg',imageAlt:'Professional wrestling ring under dramatic stadium lights',description:'A console wrestling spectacle mixing action, theatrics and strong matchups.',isShared:true},
  {eventName:'Glow Carrom',committees:['TRS','ASME'],category:'Sports',image:'/wordmark/glow carrom.jpg',imageAlt:'Glowing carrom board under neon lights',description:'A neon-lit precision game where every shot is tactical and exact.',isShared:true},
  {eventName:'BGMI (TDM)',committees:['TRS'],category:'Gaming',image:'/wordmark/bgmi.jpg',imageAlt:'Team deathmatch battle in a tactical shooter arena',description:'Close-quarters tactical battles dominated by teamwork and quick calls.',isShared:false},
  {eventName:'CAD Competiton',committees:['TRS'],category:'Tech',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students working on detailed mechanical designs in CAD',description:'A design challenge balancing technical accuracy and engineering creativity.',isShared:false},
  {eventName:'3D Printing',committees:['TRS'],category:'Tech',image:'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',imageAlt:'3D printer producing a detailed object in a lab',description:'A practical workshop exploring rapid prototyping and digital fabrication.',isShared:false},
  {eventName:'Fall Guys',committees:['TRS'],category:'Creative',image:'/wordmark/fall guys.webp',imageAlt:'Colorful digital drawing and guessing game setup',description:'A fast sketch-and-guess challenge powered by creativity and reaction time.',isShared:false},
  {eventName:'Dance Workshop',committees:['ACM'],category:'Creative',image:'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students rehearsing choreography in a studio',description:'A high-energy dance session focused on movement and confidence.',isShared:false},
  {eventName:'Vibecoding',committees:['ACM'],category:'Tech',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Creative coding workstation with multiple screens and modern interfaces',description:'A code-and-design sprint where creativity meets functional thinking.',isShared:false},
  {eventName:'Escape Room',committees:['ACM'],category:'Puzzle / Experience',image:'/wordmark/escape room.jpg',imageAlt:'Mystery escape-room challenge with clues and locks',description:'A team puzzle experience where communication and observation drive success.',isShared:false},
  {eventName:'Scavenger Hunt',committees:['ACM'],category:'Puzzle / Experience',image:'/wordmark/scavenger hunt.jpg',imageAlt:'Students searching for clues across campus',description:'A campus-wide clue challenge that rewards teamwork and quick thinking.',isShared:false},
  {eventName:'Power Show',committees:['ACM'],category:'Creative',image:'/wordmark/pwoershow.jpg',imageAlt:'High-energy stage crowd under intense lighting',description:'A dramatic stage performance with power, sound and crowd energy.',isShared:false},
  {eventName:'Neon Bowling',committees:['S4DS'],category:'Sports',image:'/wordmark/neon bowling.jpg',imageAlt:'Neon bowling alley with glowing balls and pins',description:'Strike under the lights in a futuristic bowling showdown.',isShared:false},
  {eventName:'Canvashpere Hack',committees:['S4DS'],category:'Tech',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Creative tech hackathon with collaborative development screens',description:'A creative hacking sprint blending technology, design and collaboration.',isShared:false},
  {eventName:'Traitors',committees:['S4DS'],category:'Puzzle / Experience',image:'/wordmark/traitors.jpg',imageAlt:'Players in a suspicious social deduction setup',description:'A bluff-heavy social deduction challenge where trust is fragile.',isShared:false},
  {eventName:'Human Foosball',committees:['S4DS'],category:'Sports',image:'/wordmark/human foosball.jpg',imageAlt:'Human foosball players competing in a team arena',description:'A fast-paced team challenge built around coordination and movement.',isShared:false},
  {eventName:'Gel Blaster',committees:['IEEE'],category:'Sports',image:'/wordmark/gel blaster.jpg',imageAlt:'Gel blaster players in protective gear during a competitive arena match',description:'A safe, interactive tactical challenge driven by speed and accuracy.',isShared:false},
  {eventName:'AR Cricket',committees:['IEEE'],category:'Tech',image:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',imageAlt:'AR cricket interaction with digital overlays during live play',description:'A futuristic cricket experience blending sports with digital overlays.',isShared:false},
  {eventName:'Ideathon',committees:['IEEE'],category:'Tech',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students brainstorming around a table with sticky notes and laptops',description:'An innovation challenge where raw ideas turn into practical solutions.',isShared:false},
  {eventName:'Art Workshop (Tote Bag)',committees:['IEEE'],category:'Creative',image:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',imageAlt:'Fluid resin artwork in a colorful workshop scene',description:'A vibrant art session exploring fluid textures and layered color blending.',isShared:false},
  {eventName:'Catch the Baton',committees:['IEEE'],category:'Sports',image:'/wordmark/catch the baton.jpg',imageAlt:'Relay race runners passing a baton mid-run',description:'A rapid relay challenge where baton handoff decides the race.',isShared:false},
  {eventName:'FIFA PS5',committees:['IETE'],category:'Gaming',image:'/wordmark/fifa 25.jpg',imageAlt:'PS5 football match on a large screen in an esports setup',description:'Console football action with crisp control, strategy and finishing flair.',isShared:false},
  {eventName:'Haunted House',committees:['IETE'],category:'Puzzle / Experience',image:'/wordmark/haunted house.jpg',imageAlt:'Dark haunted house entrance with fog and eerie lighting',description:'A mysterious horror experience blending suspense, fear and puzzle moments.',isShared:false},
  {eventName:'Arm Wrestling',committees:['IETE'],category:'Sports',image:'/wordmark/arm wrestling.jpg',imageAlt:'Two competitive arm wrestlers at a table in a dramatic match',description:'A one-on-one strength contest driven by leverage, grit and composure.',isShared:false},
  {eventName:'Squid Game',committees:['IETE'],category:'Puzzle / Experience',image:'/wordmark/squid game.jpg',imageAlt:'Competitive challenge arena inspired by elimination-game aesthetics',description:'A nerve-based challenge where strategy and timing define survival.',isShared:false},
  {eventName:'Gen AI Workshop',committees:['IETE'],category:'Tech',image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students exploring generative AI interfaces and futuristic data visuals',description:'A hands-on AI workshop covering prompt design and real-world logic.',isShared:false},
  {eventName:'Content Creation Workshop',committees:['IETE'],category:'Creative',image:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Content creator studio with camera, lights and editing monitor',description:'A practical creator workshop focused on storytelling and digital production.',isShared:false},
  {eventName:'Mystery Maze',committees:['SIGAI'],category:'Puzzle / Experience',image:'/wordmark/mystery maze.jpg',imageAlt:'Atmospheric maze with participants navigating mysterious corridors',description:'A maze of clues and hidden routes that reward sharp observation.',isShared:false},
  {eventName:"Takeshi's Castle",committees:['SIGAI'],category:'Puzzle / Experience',image:'/wordmark/takeshi castle.jpg',imageAlt:'Challenge course with contestants navigating obstacles',description:'A colorful physical obstacle challenge full of chaos and surprise.',isShared:false},
  {eventName:'Free Fire (TDM)',committees:['SIGAI'],category:'Gaming',image:'/wordmark/free fire.jpg',imageAlt:'Close-quarters Team Deathmatch action in a tactical combat arena',description:'A fast arena battle where cover, timing and communication rule the round.',isShared:false},
  {eventName:'AI Crime Lab',committees:['SIGAI'],category:'Tech',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'AI forensic investigation lab with digital evidence and analysis panels',description:'A forensic challenge where AI-assisted evidence interpretation unlocks the case.',isShared:false},
  {eventName:'Neon Football',committees:['IOT'],category:'Sports',image:'/wordmark/neon football.jpg',imageAlt:'Football under glowing blue and purple arena lights',description:'A futuristic football match built on speed, rhythm and electric atmosphere.',isShared:false},
  {eventName:'AR-VR Space Blitz',committees:['IOT'],category:'Tech',image:'/wordmark/ar vr blitz.jpg',imageAlt:'Immersive AR-VR space battlefield with headset and futuristic visuals',description:'A space-themed immersive challenge combining VR and AR action.',isShared:false},
  {eventName:'Two Minute Arcade',committees:['IOT'],category:'Puzzle / Experience',image:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',imageAlt:'Retro-modern arcade machines in a colorful instant-play zone',description:'A high-speed arcade challenge built for quick rounds and instant reactions.',isShared:false},
  {eventName:'Model Rocketry Workshop',committees:['IOT'],category:'Tech',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Hands-on model rocketry workshop with rocket design and fabrication',description:'A hands-on model rocketry workshop where participants will learn the fundamentals of building rockets and get practical experience in designing and making their own model rockets.',isShared:false},
  {eventName:'Mortal Kombat',committees:['IOT'],category:'Gaming',image:'/wordmark/mortal kombat.jpg',imageAlt:'Fighting game arena with two combatants facing each other',description:'A dramatic fighting showdown defined by combo execution and precision.',isShared:false},
  {eventName:'Football Dart',committees:['ASME'],category:'Sports',image:'/wordmark/football dart.jpg',imageAlt:'Football hitting a giant dartboard target in a sports challenge',description:'A creative sports challenge where precision meets football power.',isShared:false},
  {eventName:'Spin the Wheel',committees:['ASME'],category:'Puzzle / Experience',image:'/wordmark/spin the wheel.jpg',imageAlt:'Prize wheel spinning in a carnival-style event',description:'A suspenseful spin-to-win moment built around rewards and crowd energy.',isShared:false},
  {eventName:'Racing Team',committees:['ASME'],category:'Tech',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'High-performance racing vehicle and automotive design engineering',description:'High-performance automotive engineering, vehicle design and racing team aerodynamics.',isShared:false},
  {eventName:'AMONG US',committees:['AAAI'],category:'Gaming',image:'/wordmark/among us.jpg',imageAlt:'Among Us game challenge',description:'A social deduction challenge built around teamwork and deception.',isShared:false},
  {eventName:'The SQL Investigation',committees:['AAAI'],category:'Tech',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'SQL investigation on a computer workstation',description:'A database investigation challenge focused on querying and deduction.',isShared:false},
  {eventName:'Cyber Heist',committees:['ACM','CSI'],category:'Tech',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Cybersecurity challenge on a computer workstation',description:'A technical heist challenge focused on cybersecurity and problem solving.',isShared:true},
  {eventName:'Photobooth',committees:['BBA'],category:'Creative',image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',imageAlt:'Festive photo booth setup',description:'Capture memorable moments with friends at the festival.',isShared:false}
].map((event,index) => ({
  ...event,
  ...(EVENT_DETAILS[event.eventName] || {}),
  id: slugify(event.eventName || event.title || `event-${index + 1}`),
  title: event.eventName || event.title,
  committeeIds: (event.committees || []).map(normalizeCommitteeId).filter(Boolean),
  committeesList: (event.committees || []).map(normalizeCommitteeId).filter(Boolean)
}));

export const MASTER_EVENTS_BY_ID = MASTER_EVENTS.reduce((acc, event) => {
  acc[event.id] = event;
  const noApos = event.id.replace(/-s-/g, 's-');
  const plain = event.id.replace(/-s-/g, '-');
  acc[noApos] = event;
  acc[plain] = event;
  (event.committeeIds || []).forEach((cid) => {
    const prefix = cid.toLowerCase();
    acc[`${prefix}-${event.id}`] = event;
    acc[`${prefix}-${noApos}`] = event;
    acc[`${prefix}-${plain}`] = event;
  });

  // Multi-committee combined prefixes (e.g. asce-owasp-sigai-box-cricket, trs-asme-glow-carrom)
  if (event.committeeIds && event.committeeIds.length > 1) {
    const combined1 = event.committeeIds.map((c) => c.toLowerCase()).join('-');
    acc[`${combined1}-${event.id}`] = event;
    const combined2 = event.committeeIds.slice().reverse().map((c) => c.toLowerCase()).join('-');
    acc[`${combined2}-${event.id}`] = event;
  }

  // Backwards-compatible aliases for renamed events
  if (event.eventName === 'Racing Team') {
    acc['workshop-solidworks'] = event;
    acc['asme-workshop-solidworks'] = event;
  }
  if (event.eventName === 'Model Rocketry Workshop') {
    acc['workshop-on-ai-iot'] = event;
    acc['iot-workshop-on-ai-iot'] = event;
    acc['iot-workshop-ai-iot'] = event;
  }

  return acc;
}, {
  'owasp-ctf': MASTER_EVENTS.find((e) => e.eventName === 'Capture The Flag'),
  'asce-autocad': MASTER_EVENTS.find((e) => e.eventName === 'Technical Event (AutoCAD)'),
  'owasp-acm-wwe-console': MASTER_EVENTS.find((e) => e.eventName === 'WWE Console'),
  'trs-asme-bgmi-tdm': MASTER_EVENTS.find((e) => e.eventName === 'BGMI (TDM)'),
});

export const ACTIVE_COMMITTEES = ['CSI','ASCE','OWASP','TRS','ACM','S4DS','IEEE','IETE','SIGAI','IOT','ASME','AAAI','BBA'];
export const EVENT_RELATIONSHIP_COUNT = MASTER_EVENTS.reduce((total, event) => total + event.committeesList.length, 0);
export const VALID_EVENT_NAMES = MASTER_EVENTS.map((event) => event.eventName);
