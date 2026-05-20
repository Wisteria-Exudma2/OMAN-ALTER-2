/* ============================================================
   CALCULATOR.JS — OMAN WEBSITE
   Supabase config + Stat formulas + Battle Simulator
   ============================================================ */

// ─── SUPABASE CONFIG ─────────────────────────────────────────
// Ganti dengan URL dan key Supabase proyekmu
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

let supabaseClient = null;
try {
  if (window.supabase && SUPABASE_URL !== 'https://your-project.supabase.co') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch(e) { console.warn('Supabase not initialized:', e); }

// ─── HP/MP BASE PER RAS ───────────────────────────────────────
const RACE_BASE_STATS = {
  human:     { hp: 50, mp: 20 },
  elf:       { hp: 25, mp: 45 },
  dwarf:     { hp: 60, mp: 10 },
  wolfkin:   { hp: 45, mp: 25 },
  darkelf:   { hp: 35, mp: 35 },
  dragonborn:{ hp: 55, mp: 30 },
  faeborn:   { hp: 20, mp: 50 },
  beastkin:  { hp: 50, mp: 15 },
  undead:    { hp: 40, mp: 30 },
  celestial: { hp: 30, mp: 45 },
};

// ─── STAT CALCULATION FORMULAS ────────────────────────────────
function calculateDerivedStats(params) {
  const { race, level, str, vit, int_, spi, agi,
          equipStr=0, equipVit=0, equipInt=0, equipSpi=0, equipAgi=0,
          titleStr=0, titleVit=0, titleInt=0, titleSpi=0, titleAgi=0 } = params;

  const base = RACE_BASE_STATS[race] || { hp: 50, mp: 20 };

  // Effective stats (base + equipment + title bonus)
  const effStr = str + equipStr + titleStr;
  const effVit = vit + equipVit + titleVit;
  const effInt = int_ + equipInt + titleInt;
  const effSpi = spi + equipSpi + titleSpi;
  const effAgi = agi + equipAgi + titleAgi;

  // Derived stats
  const maxHp   = base.hp + (effStr + effVit) * 2 + level * 2;
  const maxMp   = base.mp + (effInt + effSpi) * 2 + level * 2;
  const maxAp   = 5 + Math.floor(effAgi / 10);
  const critPct = Math.min(effAgi, 20);
  const physAtk = effStr * 2 + 5;
  const physDef = effVit * 2;
  const magAtk  = effInt * 2 + 5;
  const magDef  = effSpi * 2;

  return { maxHp, maxMp, maxAp, critPct, physAtk, physDef, magAtk, magDef,
           effStr, effVit, effInt, effSpi, effAgi };
}

// ─── DAMAGE CALCULATION ───────────────────────────────────────
function calcPhysDmg(atk, def, isCrit = false) {
  if (isCrit) return atk.effStr + 5;
  return Math.max(5, (atk.effStr - def.effVit) + 5);
}
function calcMagDmg(atk, def, isCrit = false) {
  if (isCrit) return atk.effInt + 5;
  return Math.max(5, (atk.effInt - def.effSpi) + 5);
}
function capDamage(dmg, targetMaxHp) {
  return Math.min(dmg, Math.floor(targetMaxHp * 0.4));
}

// ─── CALC RENDERER ────────────────────────────────────────────
let calcState = {
  playerName: '',
  charName: '',
  race: 'human',
  class_: 'warrior',
  level: 1,
  stats: { str: 5, vit: 5, int: 5, spi: 5, agi: 5 },
  equip: { str: 0, vit: 0, int: 0, spi: 0, agi: 0 },
  title: { str: 0, vit: 0, int: 0, spi: 0, agi: 0 },
};

function getAvailablePoints() {
  const lvl = parseInt(calcState.level) || 1;
  const allocated = Object.values(calcState.stats).reduce((a, b) => a + b, 0);
  return (20 + (lvl - 1) * 2) - allocated;
}

function renderStatCalc() {
  const area = document.getElementById('calc-display-area');
  const avail = getAvailablePoints();
  const derived = calculateDerivedStats({
    race: calcState.race,
    level: parseInt(calcState.level) || 1,
    str: calcState.stats.str, vit: calcState.stats.vit,
    int_: calcState.stats.int, spi: calcState.stats.spi,
    agi: calcState.stats.agi,
    equipStr: calcState.equip.str, equipVit: calcState.equip.vit,
    equipInt: calcState.equip.int, equipSpi: calcState.equip.spi,
    equipAgi: calcState.equip.agi,
    titleStr: calcState.title.str, titleVit: calcState.title.vit,
    titleInt: calcState.title.int, titleSpi: calcState.title.spi,
    titleAgi: calcState.title.agi,
  });

  const maxPoints = 20 + ((parseInt(calcState.level)||1) - 1) * 2;
  const statKeys = ['str','vit','int','spi','agi'];
  const statLabels = { str:'STR', vit:'VIT', int:'INT', spi:'SPI', agi:'AGI' };
  const statColors = { str:'#e57373', vit:'#64b5f6', int:'#ce93d8', spi:'#fff176', agi:'#80cbc4' };

  area.innerHTML = `
    <div class="tab-content active">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <!-- Left: Character Info -->
        <div>
          <div class="card mb-16">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">INFORMASI KARAKTER</div>
            <div class="form-group">
              <label class="form-label" for="calc-player-name">NAMA PLAYER</label>
              <input class="form-input" id="calc-player-name" type="text" placeholder="Username WhatsApp" value="${calcState.playerName}" oninput="calcState.playerName=this.value" />
            </div>
            <div class="form-group">
              <label class="form-label" for="calc-char-name">NAMA KARAKTER</label>
              <input class="form-input" id="calc-char-name" type="text" placeholder="Nama karakter RP" value="${calcState.charName}" oninput="calcState.charName=this.value" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="form-group">
                <label class="form-label" for="calc-race">RAS</label>
                <select class="form-select" id="calc-race" onchange="calcState.race=this.value; renderStatCalc()">
                  ${Object.keys(RACE_BASE_STATS).map(r => `<option value="${r}" ${calcState.race===r?'selected':''}>${r.charAt(0).toUpperCase()+r.slice(1)}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="calc-class">CLASS</label>
                <select class="form-select" id="calc-class" onchange="calcState.class_=this.value">
                  ${Object.keys(CLASS_DATA).map(c => `<option value="${c}" ${calcState.class_===c?'selected':''}>${CLASS_DATA[c].name}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="calc-level">LEVEL (1–100)</label>
              <input class="form-input" id="calc-level" type="number" min="1" max="100" value="${calcState.level}" oninput="calcState.level=Math.min(100,Math.max(1,+this.value||1)); renderStatCalc()" />
            </div>
          </div>

          <!-- Stat Allocation -->
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);">ALOKASI STAT</div>
              <div style="font-family:var(--font-ui);font-size:0.75rem;font-weight:700;color:${avail>=0?'var(--gold)':'#ef9a9a'};">
                ${avail} POIN TERSISA
              </div>
            </div>
            ${statKeys.map(k => {
              const val = calcState.stats[k];
              const pct = Math.min(100, (val / 100) * 100);
              return `
              <div class="stat-allocator">
                <div class="stat-alloc-name" style="color:${statColors[k]}">${statLabels[k]}</div>
                <button class="stat-alloc-btn" onclick="adjustStat('${k}',-1)" id="btn-dec-${k}">−</button>
                <div class="stat-alloc-val">${val}</div>
                <button class="stat-alloc-btn" onclick="adjustStat('${k}',1)" id="btn-inc-${k}">+</button>
                <div class="stat-alloc-bar">
                  <div class="stat-alloc-fill" style="width:${pct}%; background:linear-gradient(90deg,${statColors[k]},${statColors[k]}88)"></div>
                </div>
              </div>`
            }).join('')}
          </div>
        </div>

        <!-- Right: Results -->
        <div>
          <div class="card mb-16">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">BONUS EQUIPMENT & TITLE</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${statKeys.map(k => `
              <div>
                <label class="form-label">EQP ${statLabels[k]}</label>
                <input class="form-input" type="number" min="0" value="${calcState.equip[k]}" oninput="calcState.equip['${k}']=+this.value||0; renderStatCalc()" style="padding:6px 10px;" />
              </div>`).join('')}
              <div></div>
            </div>
            <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${statKeys.map(k => `
              <div>
                <label class="form-label">TITLE ${statLabels[k]}</label>
                <input class="form-input" type="number" min="0" value="${calcState.title[k]}" oninput="calcState.title['${k}']=+this.value||0; renderStatCalc()" style="padding:6px 10px;" />
              </div>`).join('')}
              <div></div>
            </div>
          </div>

          <!-- Derived Stats Output -->
          <div class="card">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">HASIL KALKULASI</div>
            <div class="result-grid">
              <div class="result-card">
                <div class="result-card-val" style="color:#ef9a9a;">${derived.maxHp}</div>
                <div class="result-card-label">MAX HP</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#64b5f6;">${derived.maxMp}</div>
                <div class="result-card-label">MAX MP</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#fff176;">${derived.maxAp}</div>
                <div class="result-card-label">MAX AP</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#ff7043;">${derived.critPct}%</div>
                <div class="result-card-label">CRIT%</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#e57373;">${derived.physAtk}</div>
                <div class="result-card-label">PHYS ATK</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#90caf9;">${derived.physDef}</div>
                <div class="result-card-label">PHYS DEF</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#ce93d8;">${derived.magAtk}</div>
                <div class="result-card-label">MAG ATK</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#c5e1a5;">${derived.magDef}</div>
                <div class="result-card-label">MAG DEF</div>
              </div>
            </div>
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--dark-border);">
              <div style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-ui);margin-bottom:8px;">FORMULA RUMUS:</div>
              <div style="font-size:0.65rem;color:var(--text-dim);line-height:1.8;">
                HP = HP_Ras + (STR+VIT)×2 + Level×2<br>
                MP = MP_Ras + (INT+SPI)×2 + Level×2<br>
                AP = 5 + ⌊AGI÷10⌋ &nbsp; CRIT = MIN(AGI, 20)%
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
            <button class="btn-primary" onclick="saveCharacter()" id="btn-save-char" style="flex:1;">💾 Simpan ke DB</button>
            <button class="btn-secondary" onclick="loadCharacter()" id="btn-load-char" style="flex:1;">📂 Load dari DB</button>
            <button class="btn-secondary" onclick="resetCalc()" id="btn-reset-calc">🔄 Reset</button>
          </div>
          <div id="calc-msg" style="margin-top:12px;font-size:0.78rem;font-family:var(--font-ui);"></div>
        </div>
      </div>
    </div>
  `;
}

function adjustStat(key, delta) {
  const avail = getAvailablePoints();
  const cur = calcState.stats[key];
  if (delta > 0 && avail <= 0) return;
  if (delta < 0 && cur <= 1) return;
  calcState.stats[key] = cur + delta;
  renderStatCalc();
}

function resetCalc() {
  calcState.stats = { str: 5, vit: 5, int: 5, spi: 5, agi: 5 };
  calcState.equip = { str: 0, vit: 0, int: 0, spi: 0, agi: 0 };
  calcState.title = { str: 0, vit: 0, int: 0, spi: 0, agi: 0 };
  renderStatCalc();
}

async function saveCharacter() {
  const msg = document.getElementById('calc-msg');
  if (!supabaseClient) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi. Isi URL & key di calculator.js</span>';
    return;
  }
  if (!calcState.playerName || !calcState.charName) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi Nama Player dan Nama Karakter dulu!</span>';
    return;
  }
  const data = {
    player_name: calcState.playerName,
    char_name: calcState.charName,
    race: calcState.race,
    class: calcState.class_,
    level: parseInt(calcState.level),
    base_str: calcState.stats.str, base_vit: calcState.stats.vit,
    base_int: calcState.stats.int, base_spi: calcState.stats.spi,
    base_agi: calcState.stats.agi,
    equip_str: calcState.equip.str, equip_vit: calcState.equip.vit,
    equip_int: calcState.equip.int, equip_spi: calcState.equip.spi,
    equip_agi: calcState.equip.agi,
    title_str: calcState.title.str, title_vit: calcState.title.vit,
    title_int: calcState.title.int, title_spi: calcState.title.spi,
    title_agi: calcState.title.agi,
  };
  const { error } = await supabaseClient.from('characters').upsert(data, { onConflict: 'player_name' });
  if (error) {
    msg.innerHTML = `<span style="color:#ef9a9a;">❌ Error: ${error.message}</span>`;
  } else {
    msg.innerHTML = '<span style="color:#81c784;">✅ Karakter berhasil disimpan!</span>';
  }
}

async function loadCharacter() {
  const msg = document.getElementById('calc-msg');
  if (!supabaseClient) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi.</span>';
    return;
  }
  const name = calcState.playerName;
  if (!name) { msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi Nama Player dulu!</span>'; return; }
  const { data, error } = await supabaseClient.from('characters').select('*').eq('player_name', name).single();
  if (error || !data) {
    msg.innerHTML = `<span style="color:#ef9a9a;">❌ Karakter tidak ditemukan.</span>`;
    return;
  }
  calcState = {
    playerName: data.player_name,
    charName: data.char_name,
    race: data.race,
    class_: data.class,
    level: data.level,
    stats: { str: data.base_str, vit: data.base_vit, int: data.base_int, spi: data.base_spi, agi: data.base_agi },
    equip: { str: data.equip_str, vit: data.equip_vit, int: data.equip_int, spi: data.equip_spi, agi: data.equip_agi },
    title: { str: data.title_str, vit: data.title_vit, int: data.title_int, spi: data.title_spi, agi: data.title_agi },
  };
  renderStatCalc();
  document.getElementById('calc-msg').innerHTML = '<span style="color:#81c784;">✅ Karakter berhasil dimuat!</span>';
}

// ─── BATTLE SIMULATOR RENDERER ───────────────────────────────
function renderBattleSimulator() {
  const area = document.getElementById('calc-display-area');
  area.innerHTML = `
    <div class="tab-content active">
      <div class="card text-center" style="padding:48px;">
        <div style="font-size:3rem;margin-bottom:16px;">⚔️</div>
        <div style="font-family:var(--font-ui);font-size:0.9rem;font-weight:700;color:var(--text-bright);margin-bottom:8px;">BATTLE SIMULATOR</div>
        <div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:24px;">
          Battle simulator turn-by-turn dengan AP system, status effects, buff/debuff, dan battle log real-time.
        </div>
        <div style="font-size:0.75rem;color:var(--gold);font-family:var(--font-ui);">
          🚧 Halaman ini akan tersedia segera — buat karakter di tab Stat Kalkulator dulu!
        </div>
      </div>
    </div>
  `;
}

// ─── CHARACTER LIST RENDERER ─────────────────────────────────
async function renderCharacterList() {
  const area = document.getElementById('calc-display-area');
  if (!supabaseClient) {
    area.innerHTML = `
      <div class="tab-content active">
        <div class="card text-center" style="padding:48px;">
          <div style="font-size:2.5rem;margin-bottom:16px;">🗄️</div>
          <div style="font-family:var(--font-ui);font-size:0.9rem;color:var(--text-bright);margin-bottom:8px;">GM CHARACTER VIEW</div>
          <div style="font-size:0.82rem;color:var(--text-dim);">Konfigurasi Supabase URL dan Anon Key di file <code style="color:var(--gold)">calculator.js</code> untuk mengaktifkan fitur ini.</div>
        </div>
      </div>`;
    return;
  }
  area.innerHTML = '<div class="tab-content active"><div class="card text-center"><div class="pulse" style="color:var(--text-dim);">Loading...</div></div></div>';
  const { data, error } = await supabaseClient.from('characters').select('*').order('player_name');
  if (error) {
    area.innerHTML = `<div class="tab-content active"><div class="card"><span style="color:#ef9a9a;">Error: ${error.message}</span></div></div>`;
    return;
  }
  // Render list
  area.innerHTML = `
    <div class="tab-content active">
      <div style="margin-bottom:16px;">
        <input class="form-input" id="char-search" type="text" placeholder="🔍 Cari nama player atau karakter..." oninput="filterCharList(this.value, ${JSON.stringify(data).replace(/"/g,'&quot;')})" />
      </div>
      <div id="char-list-grid" class="grid-3">
        ${data.map(c => renderCharCard(c)).join('')}
      </div>
    </div>`;
}

function renderCharCard(c) {
  const d = calculateDerivedStats({ race:c.race, level:c.level, str:c.base_str, vit:c.base_vit, int_:c.base_int, spi:c.base_spi, agi:c.base_agi });
  return `
    <div class="card">
      <div style="font-family:var(--font-ui);font-size:0.8rem;font-weight:700;color:var(--text-bright);">${c.char_name}</div>
      <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:12px;">${c.player_name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.2);color:var(--gold);padding:2px 8px;border-radius:10px;">Lv.${c.level}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${c.class}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${c.race}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:0.7rem;color:var(--text-dim);margin-bottom:12px;">
        <span>HP: <strong style="color:#ef9a9a;">${d.maxHp}</strong></span>
        <span>MP: <strong style="color:#64b5f6;">${d.maxMp}</strong></span>
        <span>ATK: <strong style="color:#e57373;">${d.physAtk}</strong></span>
        <span>DEF: <strong style="color:#90caf9;">${d.physDef}</strong></span>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-secondary" style="flex:1;padding:8px;font-size:0.65rem;" onclick="loadCharById('${c.player_name}')">📂 Load</button>
        <button class="btn-secondary" style="padding:8px;font-size:0.65rem;border-color:#ef9a9a;color:#ef9a9a;" onclick="deleteChar('${c.id}')">🗑️</button>
      </div>
    </div>`;
}

async function deleteChar(id) {
  if (!confirm('Hapus karakter ini?')) return;
  await supabaseClient.from('characters').delete().eq('id', id);
  renderCharacterList();
}

async function loadCharById(playerName) {
  calcState.playerName = playerName;
  navigateTo('kalkulator');
  // Switch to stat tab
  setTimeout(() => {
    document.querySelectorAll('#calc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-calc-stat').classList.add('active');
    loadCharacter();
  }, 100);
}
