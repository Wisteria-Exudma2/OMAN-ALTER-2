// ============================================================
// MAP-DATA.JS — OMAN INTERACTIVE WORLD MAP
// Hierarchical map system dengan grid coordinates
// ============================================================

// ─── MAP HIERARCHY ────────────────────────────────────────────
// Level 0: World Map (Oman)
// Level 1: Region/Empire Maps (e.g., Aurelian Empire)
// Level 2: Detailed Territory Maps (future expansion)

const WORLD_MAPS = {
  'world-oman': {
    id: 'world-oman',
    name: 'OMAN WORLD MAP',
    level: 0,
    year: 2500,
    subtitle: 'Year 2500 RA — A Post-Apocalyptic World of Seven Factions',
    imageUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/OMAN%20WORLD%20MAP.png',
    description: 'Dunia OMAN yang luas — terdiri dari 7 faksi besar yang menguasai wilayah masing-masing.',
    gridConfig: {
      cols: 26,      // A-Z
      rows: 30,      // 1-30
      scale: 50,     // km per hex
    },
    regions: [
      {
        cellId: 'A-E:1-10',
        name: 'Aurelian Empire',
        emoji: '👑',
        color: '#d4a843',
        faction: 'aurelian',
        bounds: { startCol: 'A', endCol: 'E', startRow: 1, endRow: 10 },
        linkedMapId: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/AURELIAN%20EMPIRE%20MAP.png',
        description: 'Kerajaan emas yang mengusai gurun barat. Wilayah yang kaya namun keras.',
        majorCities: ['Solaris Prime', 'Helios Gate', 'Radiance'],
      },
      {
        cellId: 'F-K:1-10',
        name: 'Arcane Consortium',
        emoji: '🔮',
        color: '#00acc1',
        faction: 'arcane',
        bounds: { startCol: 'F', endCol: 'K', startRow: 1, endRow: 10 },
        linkedMapId: 'arcane-central-towers',
        description: 'Persekutuan penyihir yang mengontrol pengetahuan sihir kuno.',
        majorCities: ['Lumenora', 'Aetheriox', 'Celestial Nexus'],
      },
      {
        cellId: 'L-P:1-8',
        name: 'Shadow Covenant',
        emoji: '🌑',
        color: '#7b2d8b',
        faction: 'shadow',
        bounds: { startCol: 'L', endCol: 'P', startRow: 1, endRow: 8 },
        linkedMapId: 'shadow-underground-realm',
        description: 'Persekutuan gelap yang tinggal di bawah tanah. Penuh misteri.',
        majorCities: ['Umbral Hold', 'Nightshell', 'Obsidian Deep'],
      },
      {
        cellId: 'A-E:11-25',
        name: 'Wildlands Pact',
        emoji: '🌿',
        color: '#2e7d32',
        faction: 'wildlands',
        bounds: { startCol: 'A', endCol: 'E', startRow: 11, endRow: 25 },
        linkedMapId: 'wildlands-grassland-realm',
        description: 'Aliansi suku-suku liar yang menghuni padang luas.',
        majorCities: ['Greensmarth', 'Beastcaller\'s Camp', 'Rootward Fort'],
      },
      {
        cellId: 'F-K:11-20',
        name: 'Ironforge Guild',
        emoji: '⚒️',
        color: '#795548',
        faction: 'ironforge',
        bounds: { startCol: 'F', endCol: 'K', startRow: 11, endRow: 20 },
        linkedMapId: 'ironforge-forgelands',
        description: 'Guild pengrajin yang menguasai teknologi dan pertambangan.',
        majorCities: ['Irontempest', 'Molten Gate', 'Anvil District'],
      },
      {
        cellId: 'L-P:12-25',
        name: 'Crimson Crusade',
        emoji: '⚔️',
        color: '#c62828',
        faction: 'crimson',
        bounds: { startCol: 'L', endCol: 'P', startRow: 12, endRow: 25 },
        linkedMapId: 'crimson-fortress-realm',
        description: 'Pasukan militer yang agresif dan terorganisir dengan baik.',
        majorCities: ['Bloodhold', 'Scarlet Citadel', 'Fort Redemption'],
      },
      {
        cellId: 'Q-Z:1-30',
        name: 'Void Council',
        emoji: '🌀',
        color: '#1565c0',
        faction: 'void',
        bounds: { startCol: 'Q', endCol: 'Z', startRow: 1, endRow: 30 },
        linkedMapId: 'void-corrupted-lands',
        description: 'Dewan misterius yang mengontrol tanah terkorupsi timur laut.',
        majorCities: ['Voidspeech', 'Reality Scar', 'Obsidian Spire'],
      },
    ],
    legend: [
      { symbol: '🏰', label: 'Major City', color: '#d4a843' },
      { symbol: '🏘️', label: 'Minor Settlement', color: '#64b5f6' },
      { symbol: '⛰️', label: 'Mountain Range', color: '#999' },
      { symbol: '💧', label: 'Oasis/Water', color: '#4fc3f7' },
      { symbol: '💀', label: 'Ancient Ruins', color: '#999' },
      { symbol: '🚫', label: 'Forbidden Zone', color: '#ef5350' },
      { symbol: '═', label: 'Trade Route', color: '#d4a843' },
    ],
  },

  // ─── REGION MAP: AURELIAN EMPIRE ────────────────────────────
  'aurelian-nw-territory': {
    id: 'aurelian-nw-territory',
    name: 'AURELIAN EMPIRE',
    subtitle: 'Northwest Territory',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/aurelian-empire.jpg',
    description: 'Wilayah barat laut Aurelian Empire — pusat kekuasaan kerajaan emas dengan kota-kota megah dan padang pasir yang luas.',
    gridConfig: {
      cols: 14,      // A-N
      rows: 15,      // 1-15
      scale: 50,     // km per hex
    },
    locations: [
      { id: 'solaris-prime', name: 'Solaris Prime', grid: 'E3', type: 'major_city', emoji: '👑', lore: 'Ibu kota megah Aurelian Empire dengan istana emas.' },
      { id: 'helios-gate', name: 'Helios Gate', grid: 'C7', type: 'major_city', emoji: '🏰', lore: 'Benteng timur yang menjaga gerbang masuk empire.' },
      { id: 'radiance', name: 'Radiance', grid: 'G5', type: 'major_city', emoji: '✨', lore: 'Kota perdagangan yang bersinar di tengah gurun.' },
      { id: 'sunreach', name: 'Sunreach', grid: 'B6', type: 'settlement', emoji: '🏘️', lore: 'Kota kecil yang menjadi pusat spiritual.' },
      { id: 'amberwatch', name: 'Amberwatch', grid: 'I2', type: 'settlement', emoji: '⛰️', lore: 'Pos pengamatan di perbukitan amber.' },
      { id: 'suntemple-ra', name: 'Sun Temple of Ra', grid: 'F7', type: 'ruin', emoji: '🏛️', lore: 'Kuil kuno yang dibangun untuk Dewa Matahari.' },
      { id: 'obelisk-dawn', name: 'Obelisk of Dawn', grid: 'H5', type: 'landmark', emoji: '🗿', lore: 'Monumen kuno yang menandai timun tengah.' },
      { id: 'eye-sun', name: 'Eye of the Sun', grid: 'J8', type: 'oasis', emoji: '💧', lore: 'Mata air jernih di tengah gurun tandus.' },
    ],
    connections: [
      { from: 'solaris-prime', to: 'helios-gate', type: 'trade_route', distance: 3 },
      { from: 'solaris-prime', to: 'radiance', type: 'trade_route', distance: 2 },
      { from: 'helios-gate', to: 'sunreach', type: 'path', distance: 2 },
      { from: 'radiance', to: 'obelisk-dawn', type: 'trade_route', distance: 1 },
    ],
    legend: [
      { symbol: '👑', label: 'Major City', color: '#d4a843' },
      { symbol: '🏰', label: 'Fortress', color: '#d4a843' },
      { symbol: '🏘️', label: 'Settlement', color: '#64b5f6' },
      { symbol: '⛰️', label: 'Mountain', color: '#999' },
      { symbol: '💧', label: 'Oasis', color: '#4fc3f7' },
      { symbol: '🏛️', label: 'Ancient Site', color: '#999' },
      { symbol: '═', label: 'Trade Route', color: '#d4a843' },
    ],
  },

  // ─── REGION MAP: ARCANE CONSORTIUM ──────────────────────────
  'arcane-central-towers': {
    id: 'arcane-central-towers',
    name: 'ARCANE CONSORTIUM',
    subtitle: 'Central Towers & Magical Sanctuaries',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/arcane-consortium.jpg',
    description: 'Menara terapung dan heliksan ajaib yang menjadi pusat pengetahuan sihir dunia OMAN.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'lumenora', name: 'Lumenora', grid: 'G5', type: 'major_city', emoji: '🔮', lore: 'Kota cahaya yang dikelilingi kristal sihir.' },
      { id: 'aetheriox', grid: 'J8', type: 'major_city', emoji: '✨', lore: 'Akademi tertinggi penelitian aether magic.' },
      { id: 'celestial-nexus', grid: 'I4', type: 'landmark', emoji: '⭐', lore: 'Titik konvergensi energi celestial.' },
      { id: 'arcane-library', grid: 'H6', type: 'landmark', emoji: '📚', lore: 'Perpustakaan berisi semua pengetahuan sihir.' },
    ],
    legend: [
      { symbol: '🔮', label: 'Magical City', color: '#00acc1' },
      { symbol: '✨', label: 'Arcane Academy', color: '#4fc3f7' },
      { symbol: '⭐', label: 'Nexus Point', color: '#ffd700' },
      { symbol: '📚', label: 'Library', color: '#64b5f6' },
    ],
  },

  // ─── REGION MAP: SHADOW COVENANT ────────────────────────────
  'shadow-underground-realm': {
    id: 'shadow-underground-realm',
    name: 'SHADOW COVENANT',
    subtitle: 'Underground Kingdoms & Dark Depths',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/shadow-covenant.jpg',
    description: 'Kerajaan bawah tanah yang gelap dan penuh misteri. Tempat tinggal Shadow Covenant.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'umbral-hold', name: 'Umbral Hold', grid: 'D7', type: 'major_city', emoji: '🌑', lore: 'Ibukota bawah tanah yang penuh bayangan.' },
      { id: 'nightshell', name: 'Nightshell', grid: 'H9', type: 'major_city', emoji: '🐚', lore: 'Benteng seperti cangkang yang kokoh.' },
      { id: 'obsidian-deep', name: 'Obsidian Deep', grid: 'L11', type: 'landmark', emoji: '💎', lore: 'Tambang obsidian paling dalam.' },
    ],
    legend: [
      { symbol: '🌑', label: 'Shadow City', color: '#7b2d8b' },
      { symbol: '🐚', label: 'Fortress', color: '#ce93d8' },
      { symbol: '💎', label: 'Mine', color: '#9c27b0' },
    ],
  },

  // ─── REGION MAP: WILDLANDS PACT ────────────────────────────
  'wildlands-grassland-realm': {
    id: 'wildlands-grassland-realm',
    name: 'WILDLANDS PACT',
    subtitle: 'Grasslands & Tribal Territories',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/wildlands-pact.jpg',
    description: 'Padang luas yang dihuni oleh suku-suku liar dan makhluk berinsting predator.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'greensmarth', name: 'Greensmarth', grid: 'C14', type: 'major_city', emoji: '🌿', lore: 'Pusat kepemimpinan suku-suku Wildlands.' },
      { id: 'beastcaller-camp', name: 'Beastcaller\'s Camp', grid: 'E16', type: 'settlement', emoji: '🦁', lore: 'Kamp pelatihan pemilik binatang buas.' },
      { id: 'rootward-fort', name: 'Rootward Fort', grid: 'B18', type: 'settlement', emoji: '🛡️', lore: 'Benteng kayu yang dibangun dari akar pohon.' },
    ],
    legend: [
      { symbol: '🌿', label: 'Tribal Center', color: '#2e7d32' },
      { symbol: '🦁', label: 'Camp', color: '#81c784' },
      { symbol: '🛡️', label: 'Fort', color: '#558b2f' },
    ],
  },

  // ─── REGION MAP: IRONFORGE GUILD ────────────────────────────
  'ironforge-forgelands': {
    id: 'ironforge-forgelands',
    name: 'IRONFORGE GUILD',
    subtitle: 'Forgelands & Mining Territories',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/ironforge-guild.jpg',
    description: 'Wilayah pertambangan dan pengerjaan logam. Pusat industri dan teknologi OMAN.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'irontempest', name: 'Irontempest', grid: 'G10', type: 'major_city', emoji: '⚒️', lore: 'Kota pelabuhan industri terbesar.' },
      { id: 'molten-gate', name: 'Molten Gate', grid: 'F13', type: 'major_city', emoji: '🔥', lore: 'Gerbang masuk dengan dua gunung berapi.' },
      { id: 'anvil-district', name: 'Anvil District', grid: 'J12', type: 'settlement', emoji: '🔨', lore: 'Pusat pengerjaan senjata dan armor.' },
    ],
    legend: [
      { symbol: '⚒️', label: 'Major Forge', color: '#795548' },
      { symbol: '🔥', label: 'Volcanic', color: '#ff6a00' },
      { symbol: '🔨', label: 'Workshop', color: '#8d6e63' },
    ],
  },

  // ─── REGION MAP: CRIMSON CRUSADE ───────────────────────────
  'crimson-fortress-realm': {
    id: 'crimson-fortress-realm',
    name: 'CRIMSON CRUSADE',
    subtitle: 'Military Strongholds & Fortified Territories',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/crimson-crusade.jpg',
    description: 'Wilayah militer dengan benteng-benteng kokoh dan strategi perang yang ketat.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'bloodhold', name: 'Bloodhold', grid: 'M16', type: 'major_city', emoji: '⚔️', lore: 'Markas komando Crimson Crusade.' },
      { id: 'scarlet-citadel', name: 'Scarlet Citadel', grid: 'N20', type: 'major_city', emoji: '🏯', lore: 'Benteng megah dengan pertahanan berlapis.' },
      { id: 'fort-redemption', name: 'Fort Redemption', grid: 'L18', type: 'settlement', emoji: '🛡️', lore: 'Benteng penebusan untuk yang tersesat.' },
    ],
    legend: [
      { symbol: '⚔️', label: 'Military Command', color: '#c62828' },
      { symbol: '🏯', label: 'Citadel', color: '#ef5350' },
      { symbol: '🛡️', label: 'Fort', color: '#e53935' },
    ],
  },

  // ─── REGION MAP: VOID COUNCIL ──────────────────────────────
  'void-corrupted-lands': {
    id: 'void-corrupted-lands',
    name: 'VOID COUNCIL',
    subtitle: 'Corrupted Lands & Void Anomalies',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'assets/maps/void-council.jpg',
    description: 'Tanah yang terkorupsi oleh energi Void. Penuh anomali dan makhluk aneh.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      { id: 'voidspeech', name: 'Voidspeech', grid: 'J5', type: 'major_city', emoji: '🌀', lore: 'Kota yang berbicara dengan bahasa Void.' },
      { id: 'reality-scar', name: 'Reality Scar', grid: 'M8', type: 'landmark', emoji: '⚡', lore: 'Luka di realitas tempat Void menembus.' },
      { id: 'obsidian-spire', name: 'Obsidian Spire', grid: 'L3', type: 'landmark', emoji: '🗿', lore: 'Menara obsidian yang menyerap cahaya.' },
    ],
    legend: [
      { symbol: '🌀', label: 'Void City', color: '#1565c0' },
      { symbol: '⚡', label: 'Anomaly', color: '#90caf9' },
      { symbol: '🗿', label: 'Void Monument', color: '#424242' },
    ],
  },
};

// ─── HELPER FUNCTION ───────────────────────────────────────────
function getMapByGridCell(worldMapId, cellId) {
  const worldMap = WORLD_MAPS[worldMapId];
  if (!worldMap) return null;

  const region = worldMap.regions.find(r => {
    const cellRange = cellId.split(':');
    if (cellRange.length !== 2) return false;

    const [colRange, rowRange] = cellRange;
    const [startCol, endCol] = colRange.split('-');
    const [startRow, endRow] = rowRange.split('-');

    return (
      r.bounds.startCol === startCol &&
      r.bounds.endCol === endCol &&
      r.bounds.startRow === parseInt(startRow) &&
      r.bounds.endRow === parseInt(endRow)
    );
  });

  return region ? WORLD_MAPS[region.linkedMapId] : null;
}
