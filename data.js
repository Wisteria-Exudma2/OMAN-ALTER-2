// ============================================================
// DATA.JS — OMAN WEBSITE
// Semua data konten statis
// ============================================================

// ─── RA CALENDAR DATA ────────────────────────────────────────
const RA_MONTHS = [
  { id: 1,  name: "Qamarun",    symbol: "☾",  meaning: "Bulan Purnama",       real: "Januari" },
  { id: 2,  name: "Thurayya",   symbol: "✦",  meaning: "Gugusan Pleiades",    real: "Februari" },
  { id: 3,  name: "Jawzaa",     symbol: "⊕",  meaning: "Rasi Orion",          real: "Maret" },
  { id: 4,  name: "Suhailun",   symbol: "★",  meaning: "Bintang Canopus",     real: "April" },
  { id: 5,  name: "Mizanun",    symbol: "⚖",  meaning: "Neraca Langit",       real: "Mei" },
  { id: 6,  name: "Aqrabun",    symbol: "♏",  meaning: "Rasi Scorpius",       real: "Juni" },
  { id: 7,  name: "Nasmun",     symbol: "🌌", meaning: "Angin Nebula",        real: "Juli" },
  { id: 8,  name: "Shaulaa",    symbol: "⚡",  meaning: "Bintang Shaula",      real: "Agustus" },
  { id: 9,  name: "Denabun",    symbol: "✧",  meaning: "Bintang Deneb",       real: "September" },
  { id: 10, name: "Rijlun",     symbol: "⬟",  meaning: "Bintang Rigel",       real: "Oktober" },
  { id: 11, name: "Dabaranun",  symbol: "♈",  meaning: "Bintang Aldebaran",   real: "November" },
  { id: 12, name: "Siryusun",   symbol: "✺",  meaning: "Bintang Sirius",      real: "Desember" },
];

const RA_DAYS = [
  { id: 0, name: "Yawm al-Qamar",    short: "QMR", meaning: "Hari Bulan" },
  { id: 1, name: "Yawm al-Mirrikh",  short: "MRK", meaning: "Hari Mars" },
  { id: 2, name: "Yawm al-Utarid",   short: "UTR", meaning: "Hari Merkurius" },
  { id: 3, name: "Yawm al-Mushtari", short: "MST", meaning: "Hari Jupiter" },
  { id: 4, name: "Yawm al-Zuhrah",   short: "ZHR", meaning: "Hari Venus" },
  { id: 5, name: "Yawm al-Zuhal",    short: "ZHL", meaning: "Hari Saturnus" },
  { id: 6, name: "Yawm al-Shams",    short: "SHM", meaning: "Hari Matahari" },
];

// Waktu OMAN = Waktu Nyata (UTC+7/WIB) + 9 jam
// Tahun OMAN = Tahun Nyata + 474 (2026 → 2500 RA)
const RA_YEAR_OFFSET = 474;
const RA_TIME_OFFSET_HOURS = 9;

// ─── FACTION TIMEZONE DATA ────────────────────────────────────
const FACTION_TIMEZONES = [
  {
    id: "ironforge",
    name: "Ironforge Guild",
    region: "Tengah-Selatan",
    offset: 0,
    color: "#b87333",
    accentColor: "#ff6a00",
    emoji: "⚒️",
    image: "assets/faction-ironforge.png",
    desc: "Waktu Standar OMAN"
  },
  {
    id: "arcane",
    name: "Arcane Consortium",
    region: "Tengah-Utara",
    offset: 1,
    color: "#00ced1",
    accentColor: "#4fc3f7",
    emoji: "🔮",
    image: "assets/faction-arcane.png",
    desc: "+1 jam (Menara Terapung)"
  },
  {
    id: "aurelian",
    name: "Aurelian Empire",
    region: "Barat Laut",
    offset: -2,
    color: "#d4a843",
    accentColor: "#ffd700",
    emoji: "👑",
    image: "assets/faction-aurelian.png",
    desc: "-2 jam (Gurun Emas)"
  },
  {
    id: "shadow",
    name: "Shadow Covenant",
    region: "Timur Laut",
    offset: 2,
    color: "#7b2d8b",
    accentColor: "#ce93d8",
    emoji: "🌑",
    image: "assets/faction-shadow.png",
    desc: "+2 jam (Kota Bawah Tanah)"
  },
  {
    id: "wildlands",
    name: "Wildlands Pact",
    region: "Barat",
    offset: -3,
    color: "#2e7d32",
    accentColor: "#81c784",
    emoji: "🌿",
    image: "assets/faction-wildlands.png",
    desc: "-3 jam (Padang Rumput)"
  },
  {
    id: "crimson",
    name: "Crimson Crusade",
    region: "Tenggara",
    offset: 3,
    color: "#c62828",
    accentColor: "#ef9a9a",
    emoji: "⚔️",
    image: "assets/faction-crimson.png",
    desc: "+3 jam (Benteng Militer)"
  },
  {
    id: "void",
    name: "Void Council",
    region: "Jauh Timur",
    offset: 4,
    color: "#1a237e",
    accentColor: "#90caf9",
    emoji: "🌀",
    image: "assets/faction-void.png",
    desc: "+4 jam (Tanah Terkorupsi)"
  },
];

// ─── CLASS DATA ───────────────────────────────────────────────
const CLASS_DATA = {
  warrior: {
    name: "Warrior",
    icon: "⚔️",
    image: "assets/class-warrior.jpg",
    role: "Damage Dealer & Tank Frontline",
    weapon: "Pedang, Kapak, Tombak",
    trait: "Penguasa medan perang — kuat, tangguh, dan menakutkan",
    playstyle: "Agresif dan tahan banting. Warrior unggul dalam pertarungan jarak dekat dan mampu menyerap serangan musuh sambil memberikan tekanan konstan.",
    stats: { STR: 90, VIT: 80, INT: 20, SPI: 25, AGI: 60 },
    color: "#c0392b",
    skills: ["Power Strike", "Shield Bash", "Berserk", "War Cry", "Last Stand"]
  },
  mage: {
    name: "Mage",
    icon: "✨",
    image: "assets/class-mage.jpg",
    role: "Magic Damage Dealer",
    weapon: "Staff, Orb, Grimoire",
    trait: "Penguasa sihir kuno — destruktif dan tak terprediksi",
    playstyle: "Jarak jauh dengan damage sihir massif. Mage sangat rentan secara fisik namun mampu menghancurkan musuh sebelum mereka mendekat.",
    stats: { STR: 20, VIT: 30, INT: 95, SPI: 70, AGI: 50 },
    color: "#8e44ad",
    skills: ["Fireball", "Arcane Bolt", "Blizzard", "Time Stop", "Meteor Strike"]
  },
  archer: {
    name: "Archer",
    icon: "🏹",
    image: "assets/class-archer.jpg",
    role: "Ranged DPS & Scout",
    weapon: "Busur, Crossbow, Dagger",
    trait: "Jiwa bebas berburu — cepat, presisi, dan licik",
    playstyle: "Menyerang dari jarak aman dengan kecepatan tinggi. Archer mengandalkan mobilitas dan akurasi untuk menguras musuh sebelum mereka bisa menyentuhnya.",
    stats: { STR: 55, VIT: 45, INT: 35, SPI: 30, AGI: 95 },
    color: "#27ae60",
    skills: ["Quick Shot", "Piercing Arrow", "Rain of Arrows", "Shadow Step", "Eagle Eye"]
  },
  priest: {
    name: "Priest",
    icon: "✝️",
    image: "assets/class-priest.jpg",
    role: "Healer & Support",
    weapon: "Staff Suci, Rosario, Buku Doa",
    trait: "Cahaya di kegelapan — penjaga jiwa dan pemulih luka",
    playstyle: "Mendukung tim dengan heal, buff, dan melindungi rekan dari efek status negatif. Priest lemah secara ofensif namun tak ternilai dalam grup.",
    stats: { STR: 20, VIT: 40, INT: 60, SPI: 95, AGI: 40 },
    color: "#f39c12",
    skills: ["Holy Light", "Mend Wounds", "Divine Shield", "Resurrect", "Holy Nova"]
  },
  guardian: {
    name: "Guardian",
    icon: "🛡️",
    image: "assets/class-guardian.jpg",
    role: "Tank & Protector",
    weapon: "Perisai Besar, Warhammer, Halberd",
    trait: "Benteng hidup — tak tergoyahkan dan selalu melindungi",
    playstyle: "Menahan serangan untuk melindungi rekan. Guardian berdiri di garis terdepan, menarik perhatian musuh sambil teman-temannya menyerang dari belakang.",
    stats: { STR: 65, VIT: 95, INT: 20, SPI: 45, AGI: 30 },
    color: "#2980b9",
    skills: ["Taunt", "Shield Wall", "Iron Fortress", "Counter Strike", "Aegis"]
  }
};

// ─── RACE DATA ────────────────────────────────────────────────
const RACE_DATA = [
  {
    id: "human", name: "Human", emoji: "👤", image: "assets/race-human.jpg",
    hp: 50, mp: 20,
    trait: "Adaptasi Cepat",
    traitDesc: "Dapat berganti class setelah Level 30 tanpa penalti besar",
    bonus: "+5 semua stat dasar",
    color: "#e8dcc8",
    lore: "Manusia adalah ras paling adaptif di Oman. Kemampuan mereka untuk belajar dan beradaptasi membuat mereka unggul di semua bidang."
  },
  {
    id: "elf", name: "Elf", emoji: "🧝", image: "assets/race-elf.jpg",
    hp: 25, mp: 45,
    trait: "Mata Elang",
    traitDesc: "Serangan jarak jauh +15% akurasi dan +10% CRIT",
    bonus: "+10 INT, +10 AGI",
    color: "#81c784",
    lore: "Elf hidup ribuan tahun dalam harmoni dengan alam dan sihir. Telinga lancip mereka menangkap bisikan angin yang membawa rahasia dunia."
  },
  {
    id: "dwarf", name: "Dwarf", emoji: "⛏️", image: "assets/race-dwarf.jpg",
    hp: 60, mp: 10,
    trait: "Kulit Besi",
    traitDesc: "PHYS DEF +20%, tidak bisa di-knockback",
    bonus: "+15 VIT, +10 STR",
    color: "#b87333",
    lore: "Dwarf adalah ahli tempa dan penambang ulung. Tubuh mereka yang kokoh seperti batu gunung tempat mereka tinggal."
  },
  {
    id: "wolfkin", name: "Wolfkin", emoji: "🐺", image: "assets/race-wolfkin.jpg",
    hp: 45, mp: 25,
    trait: "Insting Predator",
    traitDesc: "CRIT DMG +25%, bonus +10 AGI saat HP < 50%",
    bonus: "+10 STR, +10 AGI",
    color: "#78909c",
    lore: "Keturunan serigala kuno yang berevolusi menjadi ras humanoid. Naluri berburu mereka tajam dan naluri kawanan mereka kuat."
  },
  {
    id: "darkelf", name: "Dark Elf", emoji: "🌑", image: "assets/race-darkelf.jpg",
    hp: 35, mp: 35,
    trait: "Bayangan Abadi",
    traitDesc: "Dapat menghilang 1 ronde (tidak bisa diserang), CD 5 ronde",
    bonus: "+10 AGI, +10 INT",
    color: "#7b2d8b",
    lore: "Dark Elf hidup di kegelapan dan menguasai seni ilusi serta racun. Mereka adalah master stealth yang ditakuti di seluruh Oman."
  },
  {
    id: "dragonborn", name: "Dragonborn", emoji: "🐉", image: "assets/race-dragonborn.jpg",
    hp: 55, mp: 30,
    trait: "Napas Naga",
    traitDesc: "1x per pertarungan: serangan AOE yang mengabaikan DEF musuh",
    bonus: "+12 STR, +8 VIT",
    color: "#d32f2f",
    lore: "Keturunan langsung dari naga kuno. Darah naga dalam tubuh mereka memberi kekuatan luar biasa dan napas api yang menghancurkan."
  },
  {
    id: "faeborn", name: "Faeborn", emoji: "🧚", image: "assets/race-faeborn.jpg",
    hp: 20, mp: 50,
    trait: "Sihir Peri",
    traitDesc: "Semua skill sihir -1 AP cost, tidak bisa minimum di bawah 1",
    bonus: "+15 INT, +10 SPI",
    color: "#e91e63",
    lore: "Ras yang lahir dari alam peri, tempat sihir mengalir seperti air. Tubuh mereka rapuh namun potensi sihir mereka tak tertandingi."
  },
  {
    id: "beastkin", name: "Beastkin", emoji: "🦁", image: "assets/race-beastkin.jpg",
    hp: 50, mp: 15,
    trait: "Fury Form",
    traitDesc: "Saat HP < 30%, semua stat fisik +30% selama 3 ronde",
    bonus: "+12 STR, +8 AGI",
    color: "#f57c00",
    lore: "Beastkin adalah gabungan manusia dan hewan buas. Mereka bertempur dengan naluri binatang yang memuncak saat terdesak."
  },
  {
    id: "undead", name: "Undead", emoji: "💀", image: "assets/race-undead.jpg",
    hp: 40, mp: 30,
    trait: "Jiwa Abadi",
    traitDesc: "1x per pertarungan: bertahan dengan 1 HP saat menerima serangan yang harusnya KO",
    bonus: "+10 VIT, +10 SPI",
    color: "#546e7a",
    lore: "Ras yang kembali dari kematian. Mereka membawa ketenangan abadi dan ketahanan terhadap kematian yang membuat musuh-musuh mereka gemetar."
  },
  {
    id: "celestial", name: "Celestial", emoji: "⭐", image: "assets/race-celestial.jpg",
    hp: 30, mp: 45,
    trait: "Berkat Bintang",
    traitDesc: "Setiap 3 ronde, regenerasi 10% HP & MP",
    bonus: "+10 INT, +10 SPI",
    color: "#ffd54f",
    lore: "Keturunan makhluk langit yang turun ke Oman. Mereka memancarkan cahaya bintang dan membawa berkah ilahi kepada sesama."
  }
];

// ─── FACTION DATA ─────────────────────────────────────────────
const FACTION_DATA = [
  {
    id: "aurelian",
    name: "Aurelian Empire",
    icon: "👑",
    image: "assets/faction-aurelian.png",
    region: "Barat Laut — Gurun Emas",
    color: "#d4a843",
    accent: "#ffd700",
    desc: "Kerajaan megah yang berdiri di atas pasir emas. Aurelian Empire menguasai jalur perdagangan terbesar dan memiliki militer paling terlatih.",
    buff: "Gold Advantage: semua transaksi Zen +10%",
    pros: ["Akses pasar eksklusif", "Militer terlatih", "Diplomasi kuat"],
    cons: ["Pajak tinggi untuk member", "Konflik dengan Shadow"],
    allies: ["Ironforge Guild"],
    enemies: ["Shadow Covenant", "Void Council"]
  },
  {
    id: "shadow",
    name: "Shadow Covenant",
    icon: "🌑",
    image: "assets/faction-shadow.png",
    region: "Timur Laut — Kota Bawah Tanah",
    color: "#7b2d8b",
    accent: "#ce93d8",
    desc: "Organisasi rahasia yang beroperasi dari kota bawah tanah. Shadow Covenant menguasai jaringan intel dan perdagangan gelap Oman.",
    buff: "Stealth Bonus: semua aksi bisa skip 1 giliran musuh 1x/pertarungan",
    pros: ["Intel terbaik", "Jaringan luas", "Skill assassin eksklusif"],
    cons: ["Reputasi buruk", "Musuh banyak"],
    allies: ["Void Council"],
    enemies: ["Aurelian Empire", "Crimson Crusade"]
  },
  {
    id: "arcane",
    name: "Arcane Consortium",
    icon: "🔮",
    image: "assets/faction-arcane.png",
    region: "Tengah-Utara — Menara Terapung",
    color: "#00acc1",
    accent: "#4fc3f7",
    desc: "Persekutuan para penyihir dan ilmuwan yang bermukim di menara terapung. Arcane Consortium menguasai ilmu sihir tertinggi di Oman.",
    buff: "Magic Mastery: semua skill INT +15% damage",
    pros: ["Research & crafting terbaik", "Library sihir", "Neutral stance"],
    cons: ["Biaya keanggotaan mahal", "Jarang terlibat perang"],
    allies: ["Wildlands Pact"],
    enemies: ["Void Council"]
  },
  {
    id: "wildlands",
    name: "Wildlands Pact",
    icon: "🌿",
    image: "assets/faction-wildlands.png",
    region: "Barat — Padang Rumput Luas",
    color: "#2e7d32",
    accent: "#81c784",
    desc: "Aliansi suku-suku bebas yang hidup menyatu dengan alam. Wildlands Pact menguasai pengetahuan alam, racun, dan kemampuan bertahan hidup.",
    buff: "Nature Bond: HP regen +5 per ronde di luar dungeon",
    pros: ["Taming beast mounts", "Herbalism & alchemy", "Anti-tracking"],
    cons: ["Tidak bisa tinggal di kota", "Teknologi terbatas"],
    allies: ["Arcane Consortium"],
    enemies: ["Ironforge Guild"]
  },
  {
    id: "ironforge",
    name: "Ironforge Guild",
    icon: "⚒️",
    image: "assets/faction-ironforge.png",
    region: "Tengah-Selatan — Kota Tempa",
    color: "#795548",
    accent: "#ff6a00",
    desc: "Guild pandai besi dan insinyur terbesar di Oman. Ironforge Guild memproduksi equipment terbaik dan senjata paling mematikan.",
    buff: "Mastercraft: semua equipment dari Ironforge +10% stat bonus",
    pros: ["Crafting tier tertinggi", "Equipment diskon", "Netral secara politik"],
    cons: ["Mahal bergabungnya", "Mobilitas rendah"],
    allies: ["Aurelian Empire"],
    enemies: ["Wildlands Pact"]
  },
  {
    id: "crimson",
    name: "Crimson Crusade",
    icon: "⚔️",
    image: "assets/faction-crimson.png",
    region: "Tenggara — Benteng Militer",
    color: "#c62828",
    accent: "#ef9a9a",
    desc: "Pasukan perang fanatik yang menguasai benteng militer di tenggara. Crimson Crusade hidup untuk perang dan memenangkannya.",
    buff: "War Fury: PHYS ATK +10%, +5% setiap ronde bertahan",
    pros: ["PvP specialist", "Dungeon clearing cepat", "Glory points bonus"],
    cons: ["Tidak bisa menolak tantangan duel", "Reputasi agresif"],
    allies: ["Aurelian Empire"],
    enemies: ["Shadow Covenant", "Wildlands Pact"]
  },
  {
    id: "void",
    name: "Void Council",
    icon: "🌀",
    image: "assets/faction-void.png",
    region: "Jauh Timur — Tanah Terkorupsi",
    color: "#1565c0",
    accent: "#90caf9",
    desc: "Dewan penguasa dimensi kekosongan. Void Council memanipulasi realita dan waktu, membuat mereka menjadi faksi paling misterius dan berbahaya.",
    buff: "Void Touch: 20% chance setiap serangan memicu extra damage void",
    pros: ["Skill unik eksklusif", "Time manipulation", "Lore terlengkap"],
    cons: ["Dipandang sebagai ancaman", "Quest khusus sangat sulit"],
    allies: ["Shadow Covenant"],
    enemies: ["Arcane Consortium", "Aurelian Empire"]
  }
];

// ─── LEVELING DATA ────────────────────────────────────────────
const LEVEL_TABLE = [
  { level: 1,   rank: "Pendatang",      exp: 0,       bonus: "Mulai petualangan" },
  { level: 5,   rank: "Petualang",      exp: 500,     bonus: "+1 Skill Slot" },
  { level: 10,  rank: "Petualang Muda", exp: 2000,    bonus: "Buka Area Baru" },
  { level: 15,  rank: "Petualang Berpengalaman", exp: 5000, bonus: "+1 Skill Slot" },
  { level: 20,  rank: "Pejuang",        exp: 10000,   bonus: "Guild Quest Tersedia" },
  { level: 25,  rank: "Pejuang Veteran",exp: 18000,   bonus: "+1 Skill Slot" },
  { level: 30,  rank: "Ksatria",        exp: 30000,   bonus: "Buka Dungeon Tier 2" },
  { level: 40,  rank: "Ksatria Agung",  exp: 55000,   bonus: "+1 Skill Slot" },
  { level: 50,  rank: "Pahlawan",       exp: 90000,   bonus: "Buka Raid Boss" },
  { level: 55,  rank: "Pahlawan Mitos", exp: 120000,  bonus: "+1 Skill Slot" },
  { level: 70,  rank: "Legenda",        exp: 200000,  bonus: "Title Eksklusif" },
  { level: 80,  rank: "Legenda Abadi",  exp: 300000,  bonus: "+1 Skill Slot" },
  { level: 90,  rank: "Dewa Perang",    exp: 450000,  bonus: "Buka Lore Tersembunyi" },
  { level: 99,  rank: "Abadi",          exp: 650000,  bonus: "+1 Skill Slot" },
  { level: 100, rank: "OMEGA",          exp: 1000000, bonus: "Signature Move + Title OMEGA" },
];

// ─── QUEST DATA ───────────────────────────────────────────────
const QUEST_DATA = {
  daily: [
    { name: "Patroli Kota", desc: "Lakukan 3 RP aktif di kota utama", exp: 150, zen: 50, item: "Potion x2", difficulty: "Mudah" },
    { name: "Berburu Slime", desc: "Kalahkan 5 slime di area pemula", exp: 200, zen: 75, item: "Slime Gel x5", difficulty: "Mudah" },
    { name: "Antar Pesan", desc: "Roleplay menjadi kurir antar kota", exp: 180, zen: 60, item: "Riding Crop", difficulty: "Mudah" },
    { name: "Latihan Bertarung", desc: "Spar dengan 2 player berbeda", exp: 250, zen: 100, item: "EXP Scroll x1", difficulty: "Normal" },
  ],
  weekly: [
    { name: "Dungeon Perdana", desc: "Selesaikan 1 dungeon bersama grup (min 3 orang)", exp: 800, zen: 400, item: "Rare Equipment Box", difficulty: "Normal" },
    { name: "Turnamen Mini", desc: "Ikuti PvP turnamen mingguan (min 5 peserta)", exp: 1200, zen: 600, item: "Glory Token x5", difficulty: "Sulit" },
    { name: "Guild Contribution", desc: "Sumbangkan 500 Zen ke kas guild", exp: 600, zen: 0, item: "Guild Medal x2", difficulty: "Normal" },
    { name: "Grand Hunt", desc: "Kalahkan Boss Monster bersama raid (min 5 orang)", exp: 2000, zen: 1000, item: "Epic Equipment Box", difficulty: "Sangat Sulit" },
  ],
  story: [
    { name: "Awal Petualangan", desc: "Selesaikan 10 Quest Harian pertama", exp: 500, zen: 200, item: "Starter Pack", difficulty: "Mudah" },
    { name: "Pilih Faksi", desc: "Bergabung dengan satu dari 7 faksi di Oman", exp: 1000, zen: 500, item: "Faction Badge", difficulty: "Normal" },
    { name: "Rahasia Dungeon Kuno", desc: "Temukan 3 artefak tersembunyi di dungeon", exp: 3000, zen: 1500, item: "Ancient Artifact", difficulty: "Sulit" },
    { name: "Konfrontasi Void", desc: "Hadapi dan kalahkan emissary Void Council", exp: 5000, zen: 3000, item: "Legendary Scroll", difficulty: "Ekstrem" },
  ],
  guild: [
    { name: "Defend the Fort", desc: "Pertahankan markas guild dari serangan musuh (PvP event)", exp: 1500, zen: 800, item: "Guild Weapon Blueprint", difficulty: "Sulit" },
    { name: "Territory War", desc: "Menangkan 3 wilayah dalam perang antar faksi", exp: 2500, zen: 1500, item: "Territory Flag", difficulty: "Sangat Sulit" },
    { name: "Guild Hall Upgrade", desc: "Kumpulkan material untuk upgrade guild hall", exp: 1000, zen: 0, item: "Hall Token x10", difficulty: "Normal" },
    { name: "Guild Boss Raid", desc: "Kalahkan Boss Khusus Guild bersama-sama", exp: 4000, zen: 2000, item: "Guild Legendary Box", difficulty: "Ekstrem" },
  ]
};

// ─── EQUIPMENT DATA ───────────────────────────────────────────
const EQUIPMENT_TIERS = [
  { tier: "Common",    color: "#9e9e9e", bonus: "+1–5 stat",  drop: "Semua area" },
  { tier: "Uncommon",  color: "#4caf50", bonus: "+5–10 stat", drop: "Dungeon Normal" },
  { tier: "Rare",      color: "#2196f3", bonus: "+10–20 stat",drop: "Dungeon Lanjutan" },
  { tier: "Epic",      color: "#9c27b0", bonus: "+20–35 stat",drop: "Raid Boss" },
  { tier: "Legendary", color: "#ff9800", bonus: "+35–50 stat",drop: "World Boss / Event" },
];

const EQUIPMENT_SLOTS = [
  { slot: "Helm",      icon: "🪖", desc: "Pelindung kepala, berikan bonus VIT/SPI" },
  { slot: "Armor",     icon: "🧥", desc: "Baju perang utama, berikan bonus VIT/STR" },
  { slot: "Weapon",    icon: "⚔️", desc: "Senjata utama, berikan bonus STR/INT/AGI" },
  { slot: "Offhand",   icon: "🛡️", desc: "Tangan kiri, bisa shield/tome/quiver" },
  { slot: "Boots",     icon: "👢", desc: "Sepatu, berikan bonus AGI" },
  { slot: "Accessory", icon: "💍", desc: "Cincin/kalung, berikan bonus campuran" },
];

// ─── SKILL DATA ───────────────────────────────────────────────
const SKILL_SYSTEM = {
  slots: [
    { type: "Nova",      icon: "🛡️", slots: 2, ap: 2,     mana: "No Mana",      desc: "Aksi Normal — serangan dasar yang efisien" },
    { type: "Supernova", icon: "💥", slots: 2, ap: 3,     mana: "Mid (min 20)", desc: "Aksi Kuat — serangan bertenaga dengan efek" },
    { type: "HyperNova", icon: "⚡", slots: 1, ap: "4–5", mana: "High (70–100%)", desc: "Aksi Ultimate — serangan paling powerful" },
    { type: "Wild",      icon: "🎯", slots: 2, ap: 1,     mana: "No Mana",      desc: "Aksi Khusus — trik unik di luar combat normal" },
    { type: "Signature", icon: "🌟", slots: 1, ap: "—",   mana: "Special",       desc: "Signature Move — unlock di Level 100, serangan khas" },
  ],
  unlockLevels: [1, 5, 7, 15, 20, 25, 30, 40, 50, 55, 70, 80, 90, 99, 100],
  unlockTable: [
    { level: 1,   type: 'nova',      icon: '🛡️', color: '#4fc3f7', label: 'NOVA',      desc: '+1 Aksi Normal dari Starter Skill Class' },
    { level: 5,   type: 'wild',      icon: '🎯', color: '#ff7043', label: 'WILD',      desc: '+1 Aksi Khusus setelah Level Up' },
    { level: 7,   type: 'nova',      icon: '🛡️', color: '#4fc3f7', label: 'NOVA',      desc: '+1 Aksi Normal setelah Level Up' },
    { level: 15,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: '+1 Aksi Kuat setelah Level Up' },
    { level: 20,  type: 'wild',      icon: '🎯', color: '#ff7043', label: 'WILD',      desc: '+1 Aksi Khusus setelah Level Up' },
    { level: 25,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: '+1 Aksi Kuat setelah Level Up' },
    { level: 30,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: 'Supernova Enhancement: Pilih 1 Aksi Kuat. Damage permanen +(3 + 0.5×STR/INT)' },
    { level: 40,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: 'Supernova Enhancement 2: Pilih 1 Aksi Kuat. Damage permanen +(3 + 0.5×STR/INT)' },
    { level: 50,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Unlock +1 Aksi Ultimate / HyperNova Action' },
    { level: 55,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Upgrade: Bonus Damage +(5 + 1×STR/INT)' },
    { level: 70,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Branch: Pilih 1 — (1) CD -1 Turn / (2) Mana -10% / (3) Status Effect +1 Turn' },
    { level: 80,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Combine: Boleh gabungkan Ultimate (Max 1 Player). Syarat ketentuan berlaku.' },
    { level: 90,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate pasti mengenai target. Max damage yang diterima musuh: 80% Max HP.' },
    { level: 99,  type: 'mastery',   icon: '💎', color: '#e040fb', label: 'MASTERY',   desc: '+30 All Stat. Tahap tertinggi yang dapat dicapai saat ini.' },
    { level: 100, type: 'signature', icon: '🗡️', color: '#d4a843', label: 'SIGNATURE', desc: 'Unlock Signature Move. Cara mencapainya berbeda tiap player. Harus disetujui Arbiter.' },
  ],
  damageFormula: {
    phys: "STR Penyerang − VIT Target + 5",
    magic: "INT Penyerang − SPI Target + 5",
    minDmg: 5,
    maxDmg: "40% Max HP Target",
    critDmg: "STR/INT + 5 (abaikan DEF)"
  }
};

// ─── ECONOMY DATA ─────────────────────────────────────────────
const ECONOMY_DATA = {
  currency: "Zen",
  currencyIcon: "💰",
  tiers: [
    { name: "Petualang",  range: "0 – 999 Zen",      color: "#9e9e9e", perks: "Akses pasar dasar" },
    { name: "Pedagang",   range: "1,000 – 9,999 Zen", color: "#4caf50", perks: "Diskon 5% merchant" },
    { name: "Saudagar",   range: "10,000 – 49,999",   color: "#2196f3", perks: "Akses lelang eksklusif" },
    { name: "Taipan",     range: "50,000+ Zen",        color: "#ffd700", perks: "Pengaruh ekonomi faksi" },
  ],
  earn: ["Quest & Misi", "Menang PvP/Dungeon", "Jual item", "Transaksi antar player", "Event spesial"],
  spend: ["Beli equipment", "Upgrade item", "Sewa properti", "Bayar informan", "Donasi guild"],
  rules: [
    "Dilarang minta Zen gratis tanpa alasan RP",
    "Semua transaksi wajib disertai roleplay",
    "Harga ditentukan oleh supply & demand komunitas",
    "GM berhak freeze akun yang curang"
  ]
};
