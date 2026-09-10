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
  'CODM': { prizePool: 'Worth ₹2,000', priceDisplay: '₹150', teamDisplay: '5' },
  'Tech Hunt': { prizePool: 'Worth ₹1,000', priceDisplay: '₹100', teamDisplay: '3' },
  'Human Snake Ladder': { prizePool: 'Coupons', priceDisplay: '₹50', teamDisplay: 'Solo' },
  'Human Snake and Ladder': { prizePool: 'Coupons', priceDisplay: '₹50', teamDisplay: 'Solo' },
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
  'Technical Event': { prizePool: 'Not listed', priceDisplay: 'Not listed', teamDisplay: 'Individual' },
  'Neon Dodgeball': { prizePool: 'Not listed', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'Free Fire (Classic)': { prizePool: '₹8,000', priceDisplay: '₹200', teamDisplay: '4+1' },
  'Capture The Flag': { prizePool: '₹5,000', priceDisplay: '₹100', teamDisplay: 'Solo or Duo' },
  'CTF (Capture The Flag)': { prizePool: '₹5,000', priceDisplay: '₹100', teamDisplay: 'Solo or Duo' },
  'Rocket League': { prizePool: '₹1,500', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'eFootball Mobile': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'eFootball (Mobile)': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'Football': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'WWE Console': { prizePool: 'Not listed', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Glow Carrom': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Solo' },
  'BGMI (TDM)': { prizePool: '₹8,000', priceDisplay: '₹200', teamDisplay: '4' },
  'CAD Competiton': { prizePool: '₹5,000', priceDisplay: '₹200', teamDisplay: 'Individual' },
  'CAD Competition': { prizePool: '₹5,000', priceDisplay: '₹200', teamDisplay: 'Individual' },
  '3D Printing': { prizePool: 'Certificates', priceDisplay: '₹200', teamDisplay: 'Individual' },
  '3D Printing Workshop': { prizePool: 'Certificates', priceDisplay: '₹200', teamDisplay: 'Individual' },
  'Fall Guys': { prizePool: '₹1,500', priceDisplay: '₹80', teamDisplay: 'Individual' },
  'Dance Workshop': { prizePool: 'E-Certificates', priceDisplay: '₹150', teamDisplay: 'Individual' },
  Vibecoding: { prizePool: '₹2,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Vibe Coding': { prizePool: '₹2,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Escape Room': { prizePool: '₹3,000', priceDisplay: '₹250', teamDisplay: '4' },
  'Scavenger Hunt': { prizePool: '₹3,000', priceDisplay: '₹200', teamDisplay: '4' },
  'Power Show': { prizePool: '₹3,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  Powershow: { prizePool: '₹3,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Neon Bowling': { prizePool: '₹2,000', priceDisplay: '₹120', teamDisplay: 'Solo' },
  'Canvashpere Hack': { prizePool: 'Not listed', priceDisplay: '₹50', teamDisplay: 'Individual' },
  Canvasphere: { prizePool: 'Not listed', priceDisplay: '₹50', teamDisplay: 'Individual' },
  Traitors: { prizePool: '₹3,000', priceDisplay: '₹200', teamDisplay: '4' },
  'Gel Blaster': { prizePool: 'Kind', priceDisplay: '₹300', teamDisplay: '4' },
  'Human Foosball': { prizePool: '₹2,000', priceDisplay: '₹200', teamDisplay: '4' },
  'AR Cricket': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Individual' },
  Ideathon: { prizePool: '₹10,000', priceDisplay: '₹100', teamDisplay: '2/3/4' },
  'Art Workshop (Tote Bag)': { prizePool: 'Not listed', priceDisplay: '₹225', teamDisplay: 'Individual' },
  'Tote Bag Workshop': { prizePool: 'Not listed', priceDisplay: '₹225', teamDisplay: 'Individual' },
  'Catch the Baton': { prizePool: '₹1,000', priceDisplay: '₹60', teamDisplay: 'Individual' },
  'FIFA PS5': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Individual' },
  'FIFA Console': { prizePool: '₹3,000', priceDisplay: '₹150', teamDisplay: 'Individual' },
  'Haunted House': { prizePool: '₹3,500', priceDisplay: '₹100', teamDisplay: '4' },
  'Arm Wrestling': { prizePool: '₹3,000', priceDisplay: '₹30', teamDisplay: 'Individual' },
  'Squid Game': { prizePool: '₹3,000', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Gen AI Workshop': { prizePool: '₹1,000', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Content Creation Workshop': { prizePool: '₹500', priceDisplay: '₹100', teamDisplay: 'Individual' },
  'Mystery Maze': {
    prizePool: '₹7,000',
    priceDisplay: '₹160 (2 Players) / ₹280 (4 Players)',
    teamDisplay: '2 or 4 Players',
    options: [
      { key: '2p', label: '2 Players', priceDisplay: '₹160', packageCode: 'SIGAI_MYSTERY_2P' },
      { key: '4p', label: '4 Players', priceDisplay: '₹280', packageCode: 'SIGAI_MYSTERY' }
    ]
  },
  "Takeshi's Castle": {
    prizePool: '₹7,500',
    priceDisplay: '₹170 (2 Players) / ₹300 (4 Players)',
    teamDisplay: '2 or 4 Players',
    options: [
      { key: '2p', label: '2 Players', priceDisplay: '₹170', packageCode: 'SIGAI_TAKESHI_2P' },
      { key: '4p', label: '4 Players', priceDisplay: '₹300', packageCode: 'SIGAI_TAKESHI' }
    ]
  },
  'Free Fire (TDM)': {
    prizePool: '₹7,000',
    priceDisplay: '₹140 (2 Players) / ₹250 (4 Players)',
    teamDisplay: '2 or 4 Players',
    options: [
      { key: '2p', label: '2 Players', priceDisplay: '₹140', packageCode: 'SIGAI_FF_TDM_2P' },
      { key: '4p', label: '4 Players', priceDisplay: '₹250', packageCode: 'SIGAI_FF_TDM' }
    ]
  },
  'FF TDM': {
    prizePool: '₹7,000',
    priceDisplay: '₹140 (2 Players) / ₹250 (4 Players)',
    teamDisplay: '2 or 4 Players',
    options: [
      { key: '2p', label: '2 Players', priceDisplay: '₹140', packageCode: 'SIGAI_FF_TDM_2P' },
      { key: '4p', label: '4 Players', priceDisplay: '₹250', packageCode: 'SIGAI_FF_TDM' }
    ]
  },
  'Robot Car in a Cage': {
    prizePool: '₹3,000',
    priceDisplay: '₹500',
    teamDisplay: 'Team / Squad',
    dates: 'All 3 Days',
    mode: 'Offline',
    packageCode: 'ASME_ROBOT_CAR'
  },
  'Director’s Cut — Short Film Festival': {
    prizePool: 'Trophies & Awards',
    priceDisplay: 'FREE (Members) / ₹300/person (Non-Members)',
    teamDisplay: '6 Members',
    theme: 'When the Mind Speaks',
    duration: '7–10 minutes including credits',
    venue: 'TCET',
    date: '29th September 2026',
    packageCode: 'RC_SHORT_FILM',
    options: [
      { key: 'members', label: 'Members', priceDisplay: 'FREE', packageCode: 'RC_SHORT_FILM' },
      { key: 'non-members', label: 'Non-Members', priceDisplay: '₹300/person', packageCode: 'RC_SHORT_FILM' }
    ]
  },
  "Director's Cut — Short Film Festival": {
    prizePool: 'Trophies & Awards',
    priceDisplay: 'FREE (Members) / ₹300/person (Non-Members)',
    teamDisplay: '6 Members',
    theme: 'When the Mind Speaks',
    duration: '7–10 minutes including credits',
    venue: 'TCET',
    date: '29th September 2026',
    packageCode: 'RC_SHORT_FILM',
    options: [
      { key: 'members', label: 'Members', priceDisplay: 'FREE', packageCode: 'RC_SHORT_FILM' },
      { key: 'non-members', label: 'Non-Members', priceDisplay: '₹300/person', packageCode: 'RC_SHORT_FILM' }
    ]
  },
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
  'Murderer Among Us': { prizePool: '₹2,000', priceDisplay: '₹60', teamDisplay: 'Solo' },
  'The SQL Investigation': { prizePool: '₹1,000', priceDisplay: '₹30', teamDisplay: 'Individual' },
  Photobooth: { prizePool: 'Not listed', priceDisplay: '₹100', teamDisplay: 'Solo or Group' },
  'Code Unlock': { prizePool: '₹1,000', priceDisplay: '₹50', teamDisplay: 'Individual' },
  'Cyber Heist': { prizePool: '₹1,000', priceDisplay: '₹50', teamDisplay: 'Individual' }
};

export const MASTER_EVENTS = [
  {eventName:'Garba Workshop',title:'Garba Workshop',id:'garba-workshop',committees:['CSI'],category:'Creative',mode:'Offline',image:'/wordmark/garba.jpg',imageAlt:'Garba dancers performing in a circular formation',description:'A guided workshop where participants learn Garba footwork, hand gestures, and traditional dance movements.',isShared:false},
  {eventName:'Rink Football',title:'Rink Football',id:'rink-football',committees:['CSI'],category:'Sports',mode:'Offline',image:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',imageAlt:'Indoor rink football players competing in an enclosed arena',description:'A fast-paced football game played in a rink, focusing on speed, skill, and teamwork.',isShared:false},
  {eventName:'Neon Cricket',title:'Neon Cricket',id:'neon-cricket',committees:['CSI'],category:'Sports',mode:'Offline',image:'/wordmark/neon cricket.jpg',imageAlt:'Neon lit cricket action with glowing pitch lines',description:'A cricket game played under UV lights with glowing neon equipment and a vibrant neon-themed setup.',isShared:false},
  {eventName:'Cricket Auction',title:'Cricket Auction',id:'cricket-auction',committees:['CSI'],category:'Sports',mode:'Offline',image:'/wordmark/cricket auction.jpg',imageAlt:'Cricket auctioneer and bidders in a dramatic sports event setting',description:'Participants act as team owners and bid for cricket players in a live auction, using strategy to build their teams.',isShared:false},
  {eventName:'CodM',title:'CODM',id:'codm',committees:['CSI'],category:'Gaming',mode:'Offline',image:'/wordmark/codm.jpg',imageAlt:'Call of Duty Mobile tactical squad combat in a cinematic battle scene',description:'Participants compete in intense multiplayer battles in Call of Duty Mobile, using strategy, teamwork, and combat skills.',isShared:false},
  {eventName:'Tech Hunt',title:'Tech Hunt',id:'tech-hunt',committees:['CSI'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students solving digital clues around screens and tech stations',description:'Participants solve coding and tech challenges to unlock the next stage and progress through a series of connected challenges.',isShared:false},
  {eventName:'Human Snake Ladder',title:'Human Snake and Ladder',id:'human-snake-ladder',committees:['CSI'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/human snakes n ladders.jpg',imageAlt:'People stepping on a giant human snake and ladder board',description:'A life-sized Snake and Ladder game where participants move across the board, complete challenge tasks, and race to reach the finish.',isShared:false},
  {eventName:'Tug of War',title:'Tug of War',id:'tug-of-war',committees:['ASCE'],category:'Sports',mode:'Offline',image:'/wordmark/tug of war.jpg',imageAlt:'Two teams pulling a rope in a competitive tug-of-war challenge',description:"Tug of war is a sport that pits two teams against each other in a test of strength. Teams pull on opposite ends of a rope, with the goal to bring the rope a certain distance against the force of the opposing team’s pull. It's a legacy event of Civil. In 2024, the ASCE committee also organised this event, which became one of the most successful zephyr events, with many participants from other colleges.",isShared:false},
  {eventName:'Box Cricket',title:'Box Cricket',id:'box-cricket',committees:['ASCE','OWASP','SIGAI'],category:'Sports',mode:'Offline',image:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',imageAlt:'Enclosed box cricket pitch with a batsman in action',description:'A high energy adaptation of cricket played in a compact box arena, making every ball and every shot crucial. Teams face off in shorter overs where fast paced action and quick decision making decide the winners. Box Cricket ensures thrilling encounters, last ball finishes, and immense excitement for both players and spectators. With collaborations adding to the competitive edge, this event promises nonstop adrenaline.',isShared:true},
  {eventName:'Valorant',title:'Valorant',id:'valorant',committees:['ASCE','ACM','S4DS','IEEE'],category:'Gaming',mode:'Online',image:'/wordmark/valorant.jpg',imageAlt:'Cinematic tactical shooter scene with Valorant-inspired agents',description:'Assemble your squad, sharpen your aim, and compete in an intense Valorant tournament against other teams. Coordinate, strategize, and fight your way to the championship.',isShared:true},
  {eventName:'BGMI (Classic)',title:'BGMI (Classic)',id:'bgmi-classic',committees:['ASCE','IEEE','IETE'],category:'Gaming',mode:'Online',image:'/wordmark/bgmi.jpg',imageAlt:'Battle royale gameplay in a tactical survival environment',description:'A competitive squad-based Battle Royale tournament. Teams of 4 players compete in a BGMI match, earning points based on their finishing position and eliminations. The team with the highest total score wins.',isShared:true},
  {eventName:'Technical Event (AutoCAD)',title:'Technical Event',id:'technical-event-autocad',committees:['ASCE'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'Engineering workstation showing CAD design and technical drawings',description:'A dedicated event focused on advancing technical knowledge and skills in Civil Engineering. From software workshops to innovative challenges, this platform gives students practical exposure and opportunities to learn from industry experts.',isShared:false},
  {eventName:'Neon Dodgeball',title:'Neon Dodgeball',id:'neon-dodgeball',committees:['ASCE'],category:'Sports',mode:'Offline',image:'/wordmark/neon dodgeball.jpg',imageAlt:'Neon lit dodgeball match in a dark arena',description:'An electrifying twist on the classic dodgeball game with glowing dodgeballs and darkened area, where one team eliminates players from the opposing team by hitting them with the ball while avoiding getting hit themselves.',isShared:false},
  {eventName:'Free Fire (Classic)',title:'Free Fire (Classic)',id:'free-fire-classic',committees:['ASCE'],category:'Gaming',mode:'Online',image:'/wordmark/free fire.jpg',imageAlt:'Battle royale action in a classic survival setting',description:'An exciting gaming competition where participants compete in free fire classic matches, showcasing their team work, strategy, survival skills, and gaming abilities. The event aim to provide students with a fun, competitive, and engaging gaming experience.',isShared:false},
  {eventName:'Capture The Flag',title:'CTF (Capture The Flag)',id:'capture-the-flag',committees:['OWASP'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Cybersecurity CTF environment with terminals and flags',description:'A competitive cybersecurity challenge where teams hack systems to capture digital “flags” while protecting their own. Test your coding and security skills in exciting online competitions.',isShared:false},
  {eventName:'Rocket League',title:'Rocket League',id:'rocket-league',committees:['OWASP'],category:'Gaming',mode:'Online',image:'/wordmark/rocket league.jpg',imageAlt:'Rocket-powered cars playing football in a futuristic arena',description:'A fast-paced football showdown where speed and control are everything.',isShared:false},
  {eventName:'eFootball Mobile',title:'eFootball (Mobile)',id:'efootball-mobile',committees:['OWASP'],category:'Gaming',mode:'Online',image:'/wordmark/efootball mobile.jpg',imageAlt:'Mobile football action on a gaming setup with stadium lighting',description:'Free soccer game on your phone featuring real teams and players. Build your squad, play online matches, and compete with players worldwide.',isShared:false},
  {eventName:'WWE Console',title:'WWE Console',id:'wwe-console',committees:['ACM','OWASP'],category:'Gaming',mode:'Offline',image:'/wordmark/wwe console.jpg',imageAlt:'Professional wrestling ring under dramatic stadium lights',description:'Become a WWE wrestler or create your own character. Fight in the ring, master signature moves, and win championships in this realistic wrestling game.',isShared:true},
  {eventName:'Glow Carrom',title:'Glow Carrom',id:'glow-carrom',committees:['TRS','ASME'],category:'Sports',mode:'Offline',image:'/wordmark/glow carrom.jpg',imageAlt:'Glowing carrom board under neon lights',description:'A neon-lit precision game where every shot requires accuracy and tactical board control in a vibrant, glow-in-the-dark setting.',isShared:true},
  {eventName:'BGMI (TDM)',title:'BGMI (TDM)',id:'bgmi-tdm',committees:['TRS'],category:'Gaming',mode:'Online',image:'/wordmark/bgmi.jpg',imageAlt:'Team deathmatch battle in a tactical shooter arena',description:'Close-quarters tactical battles dominated by fast-paced gunplay, quick reflexes, and team coordination.',isShared:false},
  {eventName:'CAD Competiton',title:'CAD Competition',id:'cad-competiton',committees:['TRS'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students working on detailed mechanical designs in CAD',description:'A timed AutoCAD drafting challenge to create accurate Isometric and Orthographic drawings, evaluated on precision, clarity, and time management.',isShared:false},
  {eventName:'3D Printing',title:'3D Printing Workshop',id:'3d-printing',committees:['TRS'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',imageAlt:'3D printer producing a detailed object in a lab',description:'A practical workshop exploring rapid prototyping techniques and the fundamentals of additive manufacturing.',isShared:false},
  {eventName:'Fall Guys',title:'Fall Guys',id:'fall-guys',committees:['TRS'],category:'Creative',mode:'Online',image:'/wordmark/fall guys.webp',imageAlt:'Colorful digital drawing and guessing game setup',description:'A chaotic, multiplayer party royale where players navigate bizarre obstacle courses and avoid elimination to claim the crown.',isShared:false},
  {eventName:'Dance Workshop',title:'Dance Workshop',id:'dance-workshop',committees:['ACM'],category:'Creative',mode:'Offline',image:'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students rehearsing choreography in a studio',description:'A freestyle dance workshop designed for participants of all skill levels. Learn, groove, experiment, and enjoy a high-energy dance session with fellow participants.',isShared:false},
  {eventName:'Vibecoding',title:'Vibe Coding',id:'vibecoding',committees:['ACM'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Creative coding workstation with multiple screens and modern interfaces',description:'A creative coding challenge where participants turn ideas into functional digital experiences. Build, experiment, and showcase your coding skills by creating an innovative solution within the given challenge/theme.',isShared:false},
  {eventName:'Escape Room',title:'Escape Room',id:'escape-room',committees:['ACM'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/escape room.jpg',imageAlt:'Mystery escape-room challenge with clues and locks',description:"Step into a magical world of mystery, solve puzzles, uncover hidden clues, and race against time to escape before it's too late.",isShared:false},
  {eventName:'Scavenger Hunt',title:'Scavenger Hunt',id:'scavenger-hunt',committees:['ACM'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/scavenger hunt.jpg',imageAlt:'Students searching for clues across campus',description:'Follow clues, solve exciting tasks, and navigate through a series of challenges to reach the ultimate destination.',isShared:false},
  {eventName:'Power Show',title:'Powershow',id:'power-show',committees:['ACM'],category:'Creative',mode:'Offline',image:'/wordmark/pwoershow.jpg',imageAlt:'High-energy stage crowd under intense lighting',description:'A fitness challenge featuring strength competitions such as Deadlift and Bench Press, where participants can test their strength and compete for the top spot.',isShared:false},
  {eventName:'Neon Bowling',title:'Neon Bowling',id:'neon-bowling',committees:['S4DS'],category:'Sports',mode:'Offline',image:'/wordmark/neon bowling.jpg',imageAlt:'Neon bowling alley with glowing balls and pins',description:'A fun bowling game where participants roll a bowling ball to knock down as many pins as possible. The player/team with the highest score wins.',isShared:false},
  {eventName:'Canvashpere Hack',title:'Canvasphere',id:'canvashpere-hack',committees:['S4DS'],category:'Tech',mode:'Online',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Creative tech hackathon with collaborative development screens',description:'A creative design-based game where participants use their Canva skills to create posters, graphics, or other visual designs based on a given theme or challenge. Participants will be judged on their creativity, design skills, and presentation.',isShared:false},
  {eventName:'Traitors',title:'Traitors',id:'traitors',committees:['S4DS'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/traitors.jpg',imageAlt:'Players in a suspicious social deduction setup',description:'A strategy and deception-based game where participants work together to complete tasks while identifying the hidden traitors among them. Players must use observation, communication, and strategy to identify the traitors and win the game.',isShared:false},
  {eventName:'Human Foosball',title:'Human Foosball',id:'human-foosball',committees:['S4DS'],category:'Sports',mode:'Offline',image:'/wordmark/human foosball.jpg',imageAlt:'Human foosball players competing in a team arena',description:'A human-sized version of foosball where participants play as the players on a foosball field. Teams work together to pass and kick the ball and score goals against the opposing team.',isShared:false},
  {eventName:'Gel Blaster',title:'Gel Blaster',id:'gel-blaster',committees:['IEEE'],category:'Sports',mode:'Offline',image:'/wordmark/gel blaster.jpg',imageAlt:'Gel blaster players in protective gear during a competitive arena match',description:'A 4v4 team battle using gel-bead blasters. Players try to tag out the opposing squad before getting tagged themselves — the last team standing wins.',isShared:false},
  {eventName:'AR Cricket',title:'AR Cricket',id:'ar-cricket',committees:['IEEE'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',imageAlt:'AR cricket interaction with digital overlays during live play',description:'A solo batting challenge using augmented reality. Each player gets 2 overs to score as many runs as possible, with the top scorers featured on a live leaderboard.',isShared:false},
  {eventName:'Ideathon',title:'Ideathon',id:'ideathon',committees:['IEEE'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students brainstorming around a table with sticky notes and laptops',description:'A hackathon where teams pitch original software and hardware project ideas to solve real-world problems. Judges reward the most innovative solutions with prizes.',isShared:false},
  {eventName:'Art Workshop (Tote Bag)',title:'Tote Bag Workshop',id:'art-workshop-tote-bag',committees:['IEEE'],category:'Creative',mode:'Offline',image:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',imageAlt:'Fluid resin artwork in a colorful workshop scene',description:'A hands-on art session where participants design and decorate their own tote bag using paint, stencils, and other materials — and take the finished bag home.',isShared:false},
  {eventName:'Catch the Baton',title:'Catch the Baton',id:'catch-the-baton',committees:['IEEE'],category:'Sports',mode:'Offline',image:'/wordmark/catch the baton.jpg',imageAlt:'Relay race runners passing a baton mid-run',description:'A quick-reflex game — players try to catch a falling stick before it hits the ground. Fastest reactions win.',isShared:false},
  {eventName:'FIFA PS5',title:'FIFA Console',id:'fifa-ps5',committees:['IETE'],category:'Gaming',mode:'Offline',image:'/wordmark/fifa 25.jpg',imageAlt:'PS5 football match on a large screen in an esports setup',description:'A 1v1 football tournament played on PS5. Participants choose their teams and compete in matches, with winners advancing through the tournament bracket until the final winner is decided.',isShared:false},
  {eventName:'Haunted House',title:'Haunted House',id:'haunted-house',committees:['IETE'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/haunted house.jpg',imageAlt:'Dark haunted house entrance with fog and eerie lighting',description:'An horror-themed challenge where participants enter a decorated haunted house and navigate through scary obstacles and surprises while completing the challenge within the given time.',isShared:false},
  {eventName:'Arm Wrestling',title:'Arm Wrestling',id:'arm-wrestling',committees:['IETE'],category:'Sports',mode:'Offline',image:'/wordmark/arm wrestling.jpg',imageAlt:'Two competitive arm wrestlers at a table in a dramatic match',description:"A head-to-head strength competition where two participants compete in an arm-wrestling match. The participant who successfully pins their opponent's hand wins and advances to the next round.",isShared:false},
  {eventName:'Squid Game',title:'Squid Game',id:'squid-game',committees:['IETE'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/squid game.jpg',imageAlt:'Competitive challenge arena inspired by elimination-game aesthetics',description:'A series of fun and challenging elimination-based games. Participants compete in different rounds, and those who fail a challenge are eliminated. The challenges continue until the final participant remains.',isShared:false},
  {eventName:'Gen AI Workshop',title:'Gen AI Workshop',id:'gen-ai-workshop',committees:['IETE'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',imageAlt:'Students exploring generative AI interfaces and futuristic data visuals',description:'A hands-on workshop introducing participants to Generative AI tools and their practical applications. Participants will learn how to use AI for tasks such as generating content, images, ideas, and other creative or productivity-based applications through guided activities.',isShared:false},
  {eventName:'Content Creation Workshop',title:'Content Creation Workshop',id:'content-creation-workshop',committees:['IETE'],category:'Creative',mode:'Offline',image:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Content creator studio with camera, lights and editing monitor',description:'A practical workshop focused on creating engaging digital content. Participants will learn the basics of content creation, including planning ideas, creating visuals/videos, writing captions, and using creative tools to produce social-media-ready content.',isShared:false},
  {eventName:'Mystery Maze',title:'Mystery Maze',id:'mystery-maze',committees:['SIGAI'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/mystery maze.jpg',imageAlt:'Atmospheric maze with participants navigating mysterious corridors',description:'In Mystery Maze, four participants embark on a thrilling adventure through a complex labyrinth with five challenging levels. Each level presents intricate puzzles and enigmatic clues that must be solved to progress.',isShared:false},
  {eventName:"Takeshi's Castle",title:"Takeshi's Castle",id:'takeshi-s-castle',committees:['SIGAI'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/takeshi castle.jpg',imageAlt:'Challenge course with contestants navigating obstacles',description:'This Takeshi’s Castle inspired 3-level game includes levels from the real show where players have to combine their physical strength and intelligence in order to clear obstacles present within the rounds.',isShared:false},
  {eventName:'Free Fire (TDM)',title:'Free Fire (TDM)',id:'free-fire-tdm',committees:['SIGAI'],category:'Gaming',mode:'Offline',image:'/wordmark/free fire.jpg',imageAlt:'Close-quarters Team Deathmatch action in a tactical combat arena',description:'The Free Fire event will be conducted as a 4v4 team battle. Teams of four will compete against each other in a best-of-three format. Players must work together strategically to outmaneuver and eliminate the opposing team. The event will test both individual skills and teamwork in a controlled environment, ensuring a fair and competitive experience for all participants.',isShared:false},
  {eventName:'AI Crime Lab',title:'AI Crime Lab',id:'ai-crime-lab',committees:['SIGAI'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'AI forensic investigation lab with digital evidence and analysis panels',description:'AI Crime Lab is an interactive AI-themed mystery event where participants step into the role of digital investigators to solve a deepfake-based crime. Participants analyze evidence, collect hidden clues, identify suspects, and use logical reasoning to reverse-engineer the sequence of events. The event combines artificial intelligence concepts, cybersecurity awareness, and problem-solving, offering a fun and engaging learning experience.',isShared:false},
  {eventName:'Neon Football',title:'Neon Football',id:'neon-football',committees:['IEI'],category:'Sports',mode:'Offline',image:'/wordmark/neon football.jpg',imageAlt:'Football under glowing blue and purple arena lights',description:'Experience traditional football with a visually striking twist, played on a glowing field under immersive neon lights.',isShared:false},
  {eventName:'AR-VR Space Blitz',title:'AR-VR Space Blitz',id:'ar-vr-space-blitz',committees:['IEI'],category:'Tech',mode:'Offline',image:'/wordmark/ar vr blitz.jpg',imageAlt:'Immersive AR-VR space battlefield with headset and futuristic visuals',description:'A fast-paced, action-filled shooting challenge where players test their aim and reflexes to climb the leaderboard for prizes.',isShared:false},
  {eventName:'Two Minute Arcade',title:'Two Minute Arcade',id:'two-minute-arcade',committees:['IEI'],category:'Puzzle / Experience',mode:'Offline',image:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',imageAlt:'Retro-modern arcade machines in a colorful instant-play zone',description:'A fast-paced 1v1 retro gaming showdown where players go head-to-head in classic arcade titles like Street Fighter.',isShared:false},
  {eventName:'Model Rocketry Workshop',title:'Model Rocketry Workshop',id:'model-rocketry-workshop',committees:['IEI'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',imageAlt:'Hands-on model rocketry workshop with rocket design and fabrication',description:'Model Rocketry Workshop is a hands on experience that takes participants through the world of rocketry. Learn rocket science, design and stability, explore CAD & 3D printing and build your own model rocket.',isShared:false},
  {eventName:'Mortal Kombat',title:'Mortal Kombat',id:'mortal-kombat',committees:['IEI'],category:'Gaming',mode:'Offline',image:'/wordmark/mortal kombat.jpg',imageAlt:'Fighting game arena with two combatants facing each other',description:'A competitive, round-robin fighting tournament where players battle multiple opponents to prove their reflexes, strategy, and skill.',isShared:false},
  {eventName:'Football Dart',title:'Football Dart',id:'football-dart',committees:['ASME'],category:'Sports',mode:'Offline',image:'/wordmark/football dart.jpg',imageAlt:'Football hitting a giant dartboard target in a sports challenge',description:'A creative sports challenge where precision meets football power.',isShared:false},
  {eventName:'Spin the Wheel',title:'Spin the Wheel',id:'spin-the-wheel',committees:['ASME'],category:'Puzzle / Experience',mode:'Offline',image:'/wordmark/spin the wheel.jpg',imageAlt:'Prize wheel spinning in a carnival-style event',description:'A suspenseful spin-to-win moment built around rewards and crowd energy.',isShared:false},
  {eventName:'Racing Team',title:'Racing Team',id:'racing-team',committees:['ASME'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',imageAlt:'High-performance racing vehicle and automotive design engineering',description:'High-performance automotive engineering, vehicle design and racing team aerodynamics.',isShared:false},
  {eventName:'AMONG US',title:'Murderer Among Us',id:'among-us',committees:['AAAI'],category:'Gaming',mode:'Offline',image:'/wordmark/among us.jpg',imageAlt:'Among Us game challenge',description:'A classroom will turn into a thrilling crime scene. Where the participants have to find the murderer with the help of the given clues and the murderer is one of the participants. Can you solve the case before time runs out?',isShared:false},
  {eventName:'The SQL Investigation',title:'The SQL Investigation',id:'the-sql-investigation',committees:['AAAI'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'SQL investigation on a computer workstation',description:'A valuable item has been stolen, and you are the prime suspect. Your only way to prove your innocence is by investigating the evidence stored in a database using SQL queries. Across multiple rounds, you will analyze access logs, locations, transactions, communications, CCTV records, and other clues. Each round introduces new SQL concepts and reveals another piece of the mystery. Find contradictions, uncover hidden connections, and identify the real thief. Can your SQL skills clear your name before time runs out?',isShared:false},
  {eventName:'Code Unlock',title:'Code Unlock',id:'code-unlock',committees:['ACM','CSI'],category:'Tech',mode:'Offline',image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',imageAlt:'Code Unlock cybersecurity and puzzle challenge on a computer workstation',description:'Teams solve coding and puzzle challenges as cyber investigators, progressing through multiple rounds to recover stolen data.',isShared:true},
  {eventName:'Photobooth',title:'Photobooth',id:'photobooth',committees:['BBA'],category:'Creative',mode:'Offline',image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',imageAlt:'Festive photo booth setup',description:'Capture memorable moments with friends at the festival.',isShared:false},
  {eventName:'Robot Car in a Cage',title:'Robot Car in a Cage',id:'robot-car-in-a-cage',committees:['Maverics','Eclipse Racing Club'],category:'Tech',mode:'Offline',image:'/wordmark/robot in a car cage.jpg',imageAlt:'Robotic car battle competition in a confined caged arena',description:'Robot Car in a Cage is an intense robotic racing competition where participants put their custom-built robots to the ultimate test inside a confined arena. Teams must control and maneuver their robot cars through obstacles while strategically battling their opponents, showcasing speed, precision, control, and engineering skills. The event offers a hands-on experience of racing technology, vehicle dynamics, design, and performance, challenging participants to combine engineering knowledge with strategy and skill.',isShared:true},
  {eventName:'Director’s Cut — Short Film Festival',title:'Director’s Cut — Short Film Festival',id:'directors-cut-short-film-festival',committees:['RC'],category:'Creative',mode:'Offline',image:'/wordmark/directors cut.webp',imageAlt:'Film director clapboard and camera setup for short film festival',description:'A short-film festival celebrating cinematic storytelling, creativity, and imagination. Participants will create an original short film based on the theme “When the Mind Speaks,” exploring thoughts, emotions, perspectives, and untold stories through the power of film',isShared:false}
].map((event,index) => ({
  ...event,
  ...(EVENT_DETAILS[event.title] || EVENT_DETAILS[event.eventName] || {}),
  id: event.id || slugify(event.eventName || event.title || 'event-' + (index + 1)),
  title: event.title || event.eventName,
  mode: event.mode || 'Offline',
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
    acc[prefix + '-' + event.id] = event;
    acc[prefix + '-' + noApos] = event;
    acc[prefix + '-' + plain] = event;
  });

  // Multi-committee combined prefixes (e.g. asce-owasp-sigai-box-cricket, trs-asme-glow-carrom)
  if (event.committeeIds && event.committeeIds.length > 1) {
    const combined1 = event.committeeIds.map((c) => c.toLowerCase()).join('-');
    acc[combined1 + '-' + event.id] = event;
    const combined2 = event.committeeIds.slice().reverse().map((c) => c.toLowerCase()).join('-');
    acc[combined2 + '-' + event.id] = event;
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
    acc['iei-workshop-on-ai-iot'] = event;
    acc['iei-workshop-ai-iot'] = event;
  }
  if (event.committeeIds.includes('IEI')) {
    acc['iot-' + event.id] = event;
    acc['iot-' + noApos] = event;
    acc['iot-' + plain] = event;
  }
  if (event.eventName === 'AMONG US') {
    acc['murderer-among-us'] = event;
    acc['aaai-murderer-among-us'] = event;
  }
  if (event.eventName === 'FIFA PS5') {
    acc['fifa-console'] = event;
    acc['iete-fifa-console'] = event;
  }
  if (event.eventName === 'CAD Competiton') {
    acc['cad-competition'] = event;
    acc['trs-cad-competition'] = event;
  }
  if (event.eventName === '3D Printing') {
    acc['3d-printing-workshop'] = event;
    acc['trs-3d-printing-workshop'] = event;
  }
  if (event.eventName === 'Canvashpere Hack') {
    acc['canvasphere'] = event;
    acc['s4ds-canvasphere'] = event;
  }
  if (event.eventName === 'Human Snake Ladder') {
    acc['human-snake-and-ladder'] = event;
    acc['csi-human-snake-and-ladder'] = event;
  }
  if (event.eventName === 'Capture The Flag') {
    acc['ctf-capture-the-flag'] = event;
    acc['owasp-ctf-capture-the-flag'] = event;
  }
  if (event.eventName === 'Technical Event (AutoCAD)') {
    acc['technical-event'] = event;
    acc['asce-technical-event'] = event;
  }
  if (event.eventName === 'Art Workshop (Tote Bag)') {
    acc['tote-bag-workshop'] = event;
    acc['ieee-tote-bag-workshop'] = event;
  }
  if (event.eventName === 'Power Show') {
    acc['powershow'] = event;
    acc['acm-powershow'] = event;
  }
  if (event.eventName === 'Vibecoding') {
    acc['vibe-coding'] = event;
    acc['acm-vibe-coding'] = event;
  }
  if (event.eventName === 'eFootball Mobile') {
    acc['football'] = event;
    acc['owasp-football'] = event;
    acc['efootball'] = event;
    acc['owasp-efootball'] = event;
  }
  if (event.eventName === 'Director’s Cut — Short Film Festival') {
    acc['directors-cut'] = event;
    acc['directors-cut-short-film-festival'] = event;
    acc['rc-directors-cut'] = event;
    acc['rc-directors-cut-short-film-festival'] = event;
  }
  if (event.eventName === 'Robot Car in a Cage') {
    acc['robot-car'] = event;
    acc['robot-car-in-a-cage'] = event;
    acc['cage-robot-car'] = event;
    acc['maverics-robot-car-in-a-cage'] = event;
    acc['racing-club-robot-car-in-a-cage'] = event;
    acc['eclipse-racing-club-robot-car-in-a-cage'] = event;
    acc['maverics-eclipse-robot-car-in-a-cage'] = event;
  }
  if (event.eventName === 'Code Unlock' || event.id === 'code-unlock') {
    acc['code-unlock'] = event;
    acc['cyber-heist'] = event;
    acc['acm-code-unlock'] = event;
    acc['csi-code-unlock'] = event;
    acc['acm-cyber-heist'] = event;
    acc['csi-cyber-heist'] = event;
  }

  return acc;
}, {
  'owasp-ctf': MASTER_EVENTS.find((e) => e.eventName === 'Capture The Flag'),
  'asce-autocad': MASTER_EVENTS.find((e) => e.eventName === 'Technical Event (AutoCAD)'),
  'owasp-acm-wwe-console': MASTER_EVENTS.find((e) => e.eventName === 'WWE Console'),
  'trs-asme-bgmi-tdm': MASTER_EVENTS.find((e) => e.eventName === 'BGMI (TDM)'),
  'rc-directors-cut': MASTER_EVENTS.find((e) => e.eventName === 'Director’s Cut — Short Film Festival'),
  'robot-car-in-a-cage': MASTER_EVENTS.find((e) => e.eventName === 'Robot Car in a Cage'),
  'code-unlock': MASTER_EVENTS.find((e) => e.eventName === 'Code Unlock'),
  'cyber-heist': MASTER_EVENTS.find((e) => e.eventName === 'Code Unlock'),
});

export const ACTIVE_COMMITTEES = ['CSI','ASCE','OWASP','TRS','ACM','S4DS','IEEE','IETE','SIGAI','IEI','ASME','AAAI','BBA','RC','MAVERICS','RACING CLUB'];
export const EVENT_RELATIONSHIP_COUNT = MASTER_EVENTS.reduce((total, event) => total + event.committeesList.length, 0);
export const VALID_EVENT_NAMES = MASTER_EVENTS.map((event) => event.eventName);
