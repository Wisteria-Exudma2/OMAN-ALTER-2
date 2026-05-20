/* ============================================================
   MAIN.JS — OMAN WEBSITE
   SPA Navigation + Space Canvas + RA World Clock + All Pages
   ============================================================ */

'use strict';

// ════════════════════════════════════════════════════════════
// SPA NAVIGATION
// ════════════════════════════════════════════════════════════
const PAGES = ['home','class','ras','leveling','ekonomi','faksi','quest','equipment','skill','kalkulator'];

function navigateTo(pageId) {
  PAGES.forEach(p => {
    const page = document.getElementById(`page-${p}`);
    const btn  = document.getElementById(`nav-${p}`);
    if (!page || !btn) return;
    const isActive = p === pageId;
    page.classList.toggle('active', isActive);
    btn.classList.toggle('active', isActive);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPage(pageId);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.page));
});

function renderPage(pageId) {
  switch(pageId) {
    case 'class':     renderClassPage(); break;
    case 'ras':       renderRasPage(); break;
    case 'leveling':  renderLevelingPage(); break;
    case 'ekonomi':   renderEkonomiPage(); break;
    case 'faksi':     renderFaksiPage(); break;
    case 'quest':     renderQuestPage(); break;
    case 'equipment': renderEquipmentPage(); break;
    case 'skill':     renderSkillPage(); break;
    case 'kalkulator':renderKalkulatorPage(); break;
  }
}

// ════════════════════════════════════════════════════════════
// SPACE CANVAS ANIMATION
// ════════════════════════════════════════════════════════════
(function initSpaceCanvas() {
  const canvas = document.getElementById('space-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [], constellations = [], shootingStars = [];
  let animFrame, lastShoot = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
    buildConstellations();
  }

  function buildStars() {
    stars = [];
    const N = Math.floor((W * H) / 2800);
    for (let i = 0; i < N; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.2,
        base: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: pickStarColor(),
      });
    }
  }
  function pickStarColor() {
    const p = Math.random();
    if (p < 0.6) return '#e8dcc8';
    if (p < 0.75) return '#aad4ff';
    if (p < 0.87) return '#ffd9aa';
    return '#d4a843';
  }

  function buildConstellations() {
    constellations = [];
    const patterns = [
      // Orion-like
      [[0.12,0.15],[0.14,0.20],[0.10,0.25],[0.16,0.25],[0.13,0.30],[0.11,0.35],[0.15,0.35]],
      // Cassiopeia-like
      [[0.75,0.08],[0.79,0.12],[0.83,0.08],[0.87,0.13],[0.91,0.09]],
      // Big Dipper
      [[0.30,0.55],[0.34,0.52],[0.38,0.52],[0.42,0.55],[0.42,0.60],[0.46,0.61],[0.50,0.60]],
      // Southern Cross
      [[0.60,0.70],[0.64,0.74],[0.60,0.78],[0.56,0.74],[0.60,0.74]],
      // Pleiades cluster
      [[0.20,0.68],[0.23,0.65],[0.26,0.67],[0.22,0.70],[0.25,0.72],[0.28,0.69]],
      // Scorpius tail
      [[0.70,0.35],[0.73,0.38],[0.76,0.36],[0.79,0.40],[0.77,0.44],[0.73,0.46]],
    ];
    patterns.forEach(pts => {
      constellations.push(pts.map(([xr,yr]) => ({
        x: xr * W + (Math.random()-0.5)*20,
        y: yr * H + (Math.random()-0.5)*20,
        r: Math.random()*0.9+0.5,
        phase: Math.random()*Math.PI*2,
      })));
    });
  }

  function spawnShootingStar() {
    const ang = (40 + Math.random()*10) * Math.PI/180; // 40–50°
    const sx  = Math.random() * W * 0.6;
    const sy  = Math.random() * H * 0.25;
    const len = 120 + Math.random() * 140;
    const spd = 6 + Math.random() * 5;
    shootingStars.push({ x:sx, y:sy, vx:spd*Math.cos(ang), vy:spd*Math.sin(ang), len, life:1 });
  }

  function drawMilkyWay() {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,    'rgba(70,30,120,0)');
    grad.addColorStop(0.20, 'rgba(80,40,130,0.06)');
    grad.addColorStop(0.40, 'rgba(50,80,160,0.10)');
    grad.addColorStop(0.55, 'rgba(60,90,170,0.12)');
    grad.addColorStop(0.70, 'rgba(80,50,140,0.08)');
    grad.addColorStop(1,    'rgba(50,20,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function drawNebulae() {
    const nebulae = [
      { x:0.15*W, y:0.20*H, rx:200, ry:140, r:'rgba(130,50,200,0.04)' },
      { x:0.75*W, y:0.15*H, rx:160, ry:120, r:'rgba(50,100,220,0.05)' },
      { x:0.50*W, y:0.50*H, rx:300, ry:180, r:'rgba(0,150,180,0.04)' },
      { x:0.85*W, y:0.65*H, rx:180, ry:140, r:'rgba(200,80,100,0.04)' },
      { x:0.25*W, y:0.80*H, rx:200, ry:150, r:'rgba(50,180,130,0.04)' },
    ];
    nebulae.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx,n.ry));
      g.addColorStop(0, n.r);
      g.addColorStop(1, 'transparent');
      ctx.save();
      ctx.scale(n.rx/Math.max(n.rx,n.ry), n.ry/Math.max(n.rx,n.ry));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x * Math.max(n.rx,n.ry)/n.rx, n.y * Math.max(n.rx,n.ry)/n.ry, Math.max(n.rx,n.ry), 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawAurora(t) {
    const waves = [
      { color:'rgba(0,255,150,0.05)',  amp:30, freq:0.003, phase:0,    yBase:0.05 },
      { color:'rgba(0,180,220,0.06)',  amp:25, freq:0.004, phase:1.2,  yBase:0.07 },
      { color:'rgba(120,0,200,0.04)', amp:20, freq:0.0025,phase:2.4,  yBase:0.09 },
      { color:'rgba(0,120,255,0.05)', amp:18, freq:0.0035,phase:3.6,  yBase:0.11 },
    ];
    waves.forEach(w => {
      ctx.beginPath();
      ctx.moveTo(0, w.yBase*H);
      for (let x=0; x<=W; x+=4) {
        const y = w.yBase*H + Math.sin(x*w.freq + t*0.0008 + w.phase)*w.amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, 0); ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = w.color;
      ctx.fill();
    });
  }

  function drawStars(t) {
    stars.forEach(s => {
      const flicker = s.base + Math.sin(t*s.speed + s.phase)*0.4;
      ctx.globalAlpha = Math.max(0.05, Math.min(1, flicker));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawConstellations(t) {
    constellations.forEach(pts => {
      ctx.strokeStyle = 'rgba(212,168,67,0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      pts.forEach((p, i) => {
        if (i===0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      pts.forEach(p => {
        const alpha = 0.4 + Math.sin(t*0.002 + p.phase)*0.3;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#d4a843';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    });
  }

  function drawShootingStars() {
    shootingStars = shootingStars.filter(s => s.life > 0);
    shootingStars.forEach(s => {
      const tailX = s.x - s.vx * (s.len/Math.hypot(s.vx,s.vy));
      const tailY = s.y - s.vy * (s.len/Math.hypot(s.vx,s.vy));
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(255,255,255,${s.life*0.9})`);
      ctx.globalAlpha = s.life;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      s.x += s.vx; s.y += s.vy;
      s.life -= 0.018;
    });
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#020408';
    ctx.fillRect(0, 0, W, H);
    drawMilkyWay();
    drawNebulae();
    drawAurora(t);
    drawStars(t);
    drawConstellations(t);

    if (t - lastShoot > (3000 + Math.random()*4000)) {
      spawnShootingStar();
      lastShoot = t;
    }
    drawShootingStars();
    animFrame = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  animFrame = requestAnimationFrame(frame);
})();

// ════════════════════════════════════════════════════════════
// RA WORLD CLOCK + CALENDAR
// ════════════════════════════════════════════════════════════
const RA_TIME_OFFSET_H = 9;   // OMAN time = real WIB + 9 jam
const RA_YEAR_OFF      = 474; // 2026 → 2500 RA

function getRATime() {
  const now = new Date();
  // Local time + 9 hours offset
  const omt = new Date(now.getTime() + RA_TIME_OFFSET_H * 3600 * 1000);
  return omt;
}

function getRADate(date) {
  return {
    year:    date.getUTCFullYear() + RA_YEAR_OFF,
    month:   date.getUTCMonth(),       // 0-indexed
    day:     date.getUTCDate(),
    weekday: date.getUTCDay(),          // 0=Sun
    hours:   date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };
}

function pad2(n) { return String(n).padStart(2,'0'); }

function updateRAClock() {
  const omt = getRATime();
  const ra  = getRADate(omt);

  const month   = RA_MONTHS[ra.month];
  const weekday = RA_DAYS[ra.weekday];

  // Update clock digits
  const hEl = document.getElementById('ra-hours');
  const mEl = document.getElementById('ra-minutes');
  const sEl = document.getElementById('ra-seconds');
  if (!hEl) return;

  hEl.textContent = pad2(ra.hours);
  mEl.textContent = pad2(ra.minutes);
  sEl.textContent = pad2(ra.seconds);

  document.getElementById('ra-date-display').textContent =
    `${weekday.name}, ${ra.day} ${month.name}`;
  document.getElementById('ra-date-year').textContent =
    `Tahun ${ra.year} RA ✦ Era Bintang`;
  document.getElementById('ra-month-meaning').textContent =
    `${month.symbol} ${month.name} — ${month.meaning}`;

  // Update faction timezone clocks
  updateFactionClocks(omt);
}

function updateFactionClocks(omtBase) {
  FACTION_TIMEZONES.forEach(f => {
    const el = document.getElementById(`ftz-time-${f.id}`);
    if (!el) return;
    const fdt = new Date(omtBase.getTime() + f.offset * 3600000);
    const ra  = getRADate(fdt);
    el.textContent = `${pad2(ra.hours)}:${pad2(ra.minutes)}`;
  });
}

function renderFactionTimezoneGrid() {
  const grid = document.getElementById('faction-tz-grid');
  if (!grid) return;
  grid.innerHTML = FACTION_TIMEZONES.map(f => `
    <div class="faction-tz-card" id="ftz-card-${f.id}"
         style="border-color: ${f.color}22;"
         onmouseover="this.style.borderColor='${f.color}66'"
         onmouseout="this.style.borderColor='${f.color}22'">
      <style>#ftz-card-${f.id}::before { background: ${f.color}; }</style>
      <div class="faction-tz-icon">${f.emoji}</div>
      <div class="faction-tz-name" style="color:${f.color};">${f.name}</div>
      <div class="faction-tz-time" id="ftz-time-${f.id}" style="color:${f.accentColor};">00:00</div>
      <div class="faction-tz-offset" style="color:${f.color}88;">${f.desc}</div>
    </div>
  `).join('');
}

function renderRACalendar() {
  const grid = document.getElementById('ra-cal-grid');
  if (!grid) return;

  const omt = getRATime();
  const ra  = getRADate(omt);
  const month = RA_MONTHS[ra.month];

  // Update header
  document.getElementById('ra-cal-month-name').textContent = month.name;
  document.getElementById('ra-cal-year-label').textContent = `Tahun ${ra.year} RA`;
  document.getElementById('ra-cal-symbol').textContent = month.symbol;

  // Day headers
  const dayHeaders = RA_DAYS.map(d =>
    `<div class="ra-cal-day-header" title="${d.name}">${d.short}</div>`
  ).join('');

  // Days in month (real calendar)
  const year  = omt.getUTCFullYear();
  const month0= omt.getUTCMonth();
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  // First day of month (0=Sun)
  const firstDay = new Date(Date.UTC(year, month0, 1)).getUTCDay();
  // Previous month days
  const prevDays = new Date(year, month0, 0).getDate();

  let cells = '';

  // Fill prev month placeholders
  for (let i = firstDay - 1; i >= 0; i--) {
    cells += `<div class="ra-cal-cell other-month">${prevDays - i}</div>`;
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === ra.day;
    cells += `<div class="ra-cal-cell${isToday?' today':''}">${d}</div>`;
  }
  // Next month fill
  const total = firstDay + daysInMonth;
  const rem   = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= rem; d++) {
    cells += `<div class="ra-cal-cell other-month">${d}</div>`;
  }

  grid.innerHTML = dayHeaders + cells;
}

function initRAClock() {
  renderFactionTimezoneGrid();
  renderRACalendar();
  updateRAClock();
  setInterval(() => {
    updateRAClock();
    // Rebuild calendar at midnight
    const omt = getRATime();
    const ra  = getRADate(omt);
    if (ra.hours === 0 && ra.minutes === 0 && ra.seconds === 0) {
      renderRACalendar();
    }
  }, 1000);
}

// ════════════════════════════════════════════════════════════
// HOME PAGE: STAT COUNTERS
// ════════════════════════════════════════════════════════════
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(id);
    }, 25);
  });
}

// ════════════════════════════════════════════════════════════
// CLASS PAGE
// ════════════════════════════════════════════════════════════
let currentClass = 'warrior';

function renderClassPage() {
  renderClassDisplay(currentClass);
  document.querySelectorAll('#class-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#class-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentClass = btn.dataset.class;
      renderClassDisplay(currentClass);
    });
  });
}

function renderClassDisplay(classKey) {
  const c = CLASS_DATA[classKey];
  const area = document.getElementById('class-display-area');
  const statKeys = ['STR','VIT','INT','SPI','AGI'];
  const statColors = ['#e57373','#64b5f6','#ce93d8','#fff176','#80cbc4'];

  area.innerHTML = `
    <div class="class-display">
      <div class="class-artwork" style="border-color:${c.color}44;">
        <img src="${c.image}" alt="${c.name}" onerror="this.style.display='none'" />
        <span style="font-size:5rem;position:relative;z-index:1;">${c.icon}</span>
      </div>
      <div class="class-info">
        <div class="class-name glow-gold" style="color:${c.color}; margin-bottom:8px;">${c.name}</div>
        <div class="class-role-badge" style="border-color:${c.color}55;color:${c.color};">${c.role}</div>
        <div class="class-info-row">
          <div class="class-info-label">SENJATA KHAS</div>
          <div class="class-info-val">🗡️ ${c.weapon}</div>
        </div>
        <div class="class-info-row">
          <div class="class-info-label">KEKHASAN</div>
          <div class="class-info-val">✨ ${c.trait}</div>
        </div>
        <div class="class-info-row">
          <div class="class-info-label">PLAYSTYLE</div>
          <div class="class-info-val">${c.playstyle}</div>
        </div>
        <div class="class-stats">
          <div class="class-stats-title">BASE STAT DISTRIBUTION</div>
          ${statKeys.map((s,i) => {
            const val = c.stats[s];
            return `
            <div class="stat-bar-wrap">
              <div class="stat-bar-label">
                <span style="color:${statColors[i]}">${s}</span>
                <span>${val}/100</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="background:linear-gradient(90deg,${statColors[i]},${statColors[i]}88);" data-width="${val}"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div style="margin-top:20px;">
          <div class="class-info-label" style="margin-bottom:10px;">SIGNATURE SKILLS</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${c.skills.map(sk => `
              <span style="font-size:0.68rem;font-family:var(--font-ui);background:rgba(212,168,67,0.08);border:1px solid ${c.color}33;color:${c.color};padding:4px 12px;border-radius:20px;">${sk}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  // Animate stat bars
  requestAnimationFrame(() => {
    area.querySelectorAll('.stat-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  });
}

// ════════════════════════════════════════════════════════════
// RAS PAGE
// ════════════════════════════════════════════════════════════
function renderRasPage() {
  const grid = document.getElementById('race-grid');
  grid.innerHTML = RACE_DATA.map(r => `
    <div class="race-card" onclick="renderRaceDetail('${r.id}')" id="race-card-${r.id}"
         style="border-color:${r.color}22;"
         onmouseover="this.style.borderColor='${r.color}55'"
         onmouseout="this.style.borderColor='${r.color}22'">
      <div class="race-card-img" style="background:${r.color}15;border:2px solid ${r.color}33;">
        <img src="${r.image}" alt="${r.name}" width="64" height="64"
             style="border-radius:50%;object-fit:cover;width:100%;height:100%;"
             onerror="this.parentElement.innerHTML='<span style=font-size:2rem>${r.emoji}</span>'" />
      </div>
      <div class="race-card-name">${r.name}</div>
      <div class="race-card-trait" style="color:${r.color};">${r.trait}</div>
      <div class="race-card-desc">${r.bonus}</div>
    </div>
  `).join('');
}

function renderRaceDetail(raceId) {
  const r = RACE_DATA.find(r => r.id === raceId);
  if (!r) return;
  const area = document.getElementById('race-detail-area');
  area.innerHTML = `
    <div class="card" style="border-color:${r.color}44;margin-top:16px;animation:fadeInPage 0.3s ease;">
      <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
        <div style="width:100px;height:100px;border-radius:50%;background:${r.color}15;border:2px solid ${r.color}55;display:flex;align-items:center;justify-content:center;font-size:3rem;flex-shrink:0;">
          ${r.emoji}
        </div>
        <div style="flex:1;min-width:240px;">
          <div style="font-family:var(--font-ui);font-size:1.1rem;font-weight:800;color:${r.color};margin-bottom:4px;">${r.name}</div>
          <div style="font-size:0.78rem;color:var(--text-dim);margin-bottom:16px;">${r.lore}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:${r.color}10;border:1px solid ${r.color}30;border-radius:10px;padding:12px;">
              <div style="font-family:var(--font-ui);font-size:0.6rem;letter-spacing:0.15em;color:${r.color};margin-bottom:6px;">SPECIAL TRAIT</div>
              <div style="font-size:0.75rem;font-weight:700;color:var(--text-bright);margin-bottom:4px;">${r.trait}</div>
              <div style="font-size:0.72rem;color:var(--text-dim);">${r.traitDesc}</div>
            </div>
            <div style="background:rgba(212,168,67,0.06);border:1px solid rgba(212,168,67,0.15);border-radius:10px;padding:12px;">
              <div style="font-family:var(--font-ui);font-size:0.6rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:6px;">STAT BONUS</div>
              <div style="font-size:0.75rem;color:var(--text);">${r.bonus}</div>
              <div style="margin-top:8px;font-size:0.7rem;color:var(--text-dim);">HP Base: <strong style="color:#ef9a9a">${r.hp}</strong> &nbsp; MP Base: <strong style="color:#64b5f6">${r.mp}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ════════════════════════════════════════════════════════════
// LEVELING PAGE
// ════════════════════════════════════════════════════════════
function renderLevelingPage() {
  const tbody = document.getElementById('level-table-body');
  if (!tbody || tbody.children.length > 0) return;
  tbody.innerHTML = LEVEL_TABLE.map(l => `
    <tr class="${l.level===100?'level-100':''}">
      <td><strong style="color:var(--gold);font-family:var(--font-ui);">${l.level}</strong></td>
      <td>${l.rank}</td>
      <td>${l.exp.toLocaleString()}</td>
      <td>${l.bonus}</td>
    </tr>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// EKONOMI PAGE
// ════════════════════════════════════════════════════════════
function renderEkonomiPage() {
  const area = document.getElementById('ekonomi-content');
  if (area.innerHTML.trim()) return;

  area.innerHTML = `
    <!-- Tier Cards -->
    <div class="grid-4 mb-32">
      ${ECONOMY_DATA.tiers.map(t => `
        <div class="card text-center" style="border-color:${t.color}33;">
          <div style="font-size:2rem;margin-bottom:8px;">💰</div>
          <div style="font-family:var(--font-ui);font-size:0.8rem;font-weight:700;color:${t.color};margin-bottom:6px;">${t.name}</div>
          <div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:8px;">${t.range}</div>
          <div style="font-size:0.7rem;background:${t.color}15;border:1px solid ${t.color}30;border-radius:8px;padding:6px 10px;color:var(--text);">${t.perks}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid-2">
      <!-- Cara Dapat -->
      <div class="card">
        <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">💎 CARA MENDAPAT ZEN</div>
        ${ECONOMY_DATA.earn.map(e => `
          <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="color:var(--gold);">✦</span>
            <span style="font-size:0.82rem;">${e}</span>
          </div>
        `).join('')}
      </div>
      <!-- Cara Pakai -->
      <div class="card">
        <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">💸 CARA MENGGUNAKAN ZEN</div>
        ${ECONOMY_DATA.spend.map(s => `
          <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="color:#64b5f6;">◆</span>
            <span style="font-size:0.82rem;">${s}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Rules -->
    <div class="card mt-24" style="border-color:rgba(255,152,0,0.2);">
      <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:#ffb74d;margin-bottom:16px;">⚠️ ATURAN EKONOMI</div>
      ${ECONOMY_DATA.rules.map((r,i) => `
        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-family:var(--font-ui);font-size:0.65rem;color:#ffb74d;min-width:24px;">${String(i+1).padStart(2,'0')}</span>
          <span style="font-size:0.82rem;">${r}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// FAKSI PAGE
// ════════════════════════════════════════════════════════════
let currentFaction = 'aurelian';

function renderFaksiPage() {
  const tabs = document.getElementById('faction-tabs');
  if (!tabs.innerHTML.trim()) {
    tabs.innerHTML = FACTION_DATA.map(f => `
      <button class="tab-btn${f.id===currentFaction?' active':''}" data-faction="${f.id}" id="tab-faction-${f.id}">
        ${f.icon} ${f.name.split(' ')[0].toUpperCase()}
      </button>
    `).join('');
    tabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFaction = btn.dataset.faction;
        renderFactionDisplay(currentFaction);
      });
    });
  }
  renderFactionDisplay(currentFaction);
}

function renderFactionDisplay(factionId) {
  const f = FACTION_DATA.find(f => f.id === factionId);
  const area = document.getElementById('faction-display-area');
  area.innerHTML = `
    <div class="faction-header" style="animation:fadeInPage 0.3s ease;">
      <div class="faction-logo" style="border-color:${f.color};color:${f.color};">
        <img src="${f.image}" alt="${f.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
             onerror="this.parentElement.innerHTML='<span style=font-size:3rem>${f.icon}</span>'" />
      </div>
      <div class="faction-name" style="color:${f.color};">${f.name}</div>
      <div class="faction-region">📍 ${f.region}</div>
    </div>
    <div class="grid-2">
      <div class="card" style="border-color:${f.color}33;">
        <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:${f.color};margin-bottom:12px;">DESKRIPSI</div>
        <p style="font-size:0.85rem;line-height:1.7;">${f.desc}</p>
        <div style="margin-top:16px;padding:12px;background:${f.color}10;border:1px solid ${f.color}30;border-radius:10px;">
          <div style="font-size:0.65rem;font-family:var(--font-ui);color:${f.color};margin-bottom:6px;">FACTION BUFF</div>
          <div style="font-size:0.82rem;">⚡ ${f.buff}</div>
        </div>
      </div>
      <div>
        <div class="card mb-16" style="border-color:rgba(76,175,80,0.2);">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#81c784;margin-bottom:10px;">✅ KEUNTUNGAN</div>
          ${f.pros.map(p => `<div style="font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">✦ ${p}</div>`).join('')}
        </div>
        <div class="card mb-16" style="border-color:rgba(244,67,54,0.2);">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#ef9a9a;margin-bottom:10px;">❌ KEKURANGAN</div>
          ${f.cons.map(c => `<div style="font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">✦ ${c}</div>`).join('')}
        </div>
        <div class="card" style="border-color:var(--dark-border);">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#81c784;margin-bottom:8px;">🤝 SEKUTU</div>
              ${f.allies.map(a=>`<div style="font-size:0.78rem;color:var(--text-dim);">${a}</div>`).join('')}
            </div>
            <div>
              <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#ef9a9a;margin-bottom:8px;">⚔️ MUSUH</div>
              ${f.enemies.map(e=>`<div style="font-size:0.78rem;color:var(--text-dim);">${e}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
// QUEST PAGE
// ════════════════════════════════════════════════════════════
let currentQuestTab = 'daily';

function renderQuestPage() {
  document.querySelectorAll('#quest-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#quest-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuestTab = btn.dataset.quest;
      renderQuestDisplay(currentQuestTab);
    });
  });
  renderQuestDisplay(currentQuestTab);
}

function renderQuestDisplay(type) {
  const quests = QUEST_DATA[type];
  const area   = document.getElementById('quest-display-area');
  area.innerHTML = quests.map(q => `
    <div class="quest-card">
      <div class="quest-diff ${q.difficulty.replace(' ','.')}">${q.difficulty}</div>
      <div class="quest-info">
        <div class="quest-name">${q.name}</div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-rewards">
          <span class="quest-reward-badge">⭐ ${q.exp.toLocaleString()} EXP</span>
          <span class="quest-reward-badge">💰 ${q.zen.toLocaleString()} Zen</span>
          ${q.item ? `<span class="quest-reward-badge">📦 ${q.item}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// EQUIPMENT PAGE
// ════════════════════════════════════════════════════════════
function renderEquipmentPage() {
  const area = document.getElementById('equipment-content');
  if (area.innerHTML.trim()) return;

  area.innerHTML = `
    <!-- Tier strips -->
    <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--text-dim);margin-bottom:12px;">ITEM RARITY TIER</div>
    <div class="tier-strip mb-32">
      ${EQUIPMENT_TIERS.map(t => `
        <div class="tier-badge" style="color:${t.color};border-color:${t.color}55;background:${t.color}10;">
          ${t.tier}
        </div>
      `).join('')}
    </div>
    <div class="grid-3 mb-32">
      ${EQUIPMENT_TIERS.map(t => `
        <div class="card" style="border-color:${t.color}33;">
          <div style="font-family:var(--font-ui);font-size:0.78rem;font-weight:700;color:${t.color};margin-bottom:8px;">${t.tier}</div>
          <div style="font-size:0.75rem;margin-bottom:4px;"><span style="color:var(--text-dim);">Bonus:</span> ${t.bonus}</div>
          <div style="font-size:0.75rem;"><span style="color:var(--text-dim);">Drop dari:</span> ${t.drop}</div>
        </div>
      `).join('')}
    </div>

    <!-- Equipment Slots -->
    <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--text-dim);margin-bottom:12px;">EQUIPMENT SLOT (6 SLOT)</div>
    <div class="grid-3">
      ${EQUIPMENT_SLOTS.map(s => `
        <div class="card text-center">
          <div style="font-size:2.2rem;margin-bottom:10px;">${s.icon}</div>
          <div style="font-family:var(--font-ui);font-size:0.78rem;font-weight:700;color:var(--text-bright);margin-bottom:6px;">${s.slot}</div>
          <div style="font-size:0.75rem;color:var(--text-dim);">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// SKILL PAGE
// ════════════════════════════════════════════════════════════
let currentSkillTab = 'system';

function renderSkillPage() {
  document.querySelectorAll('#skill-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#skill-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkillTab = btn.dataset.skill;
      renderSkillDisplay(currentSkillTab);
    });
  });
  renderSkillDisplay(currentSkillTab);
}

function renderSkillDisplay(type) {
  const area = document.getElementById('skill-display-area');
  if (type === 'system') {
    area.innerHTML = `
      <!-- Slot Overview Cards -->
      <div style="font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.18em;color:var(--text-dim);margin-bottom:14px;">⚡ DISTRIBUSI 8 SKILL SLOT</div>
      <div class="skill-slot-grid" style="margin-bottom:40px;">
        ${SKILL_SYSTEM.slots.map(s => `
          <div class="skill-slot-card">
            <div class="skill-slot-icon">${s.icon}</div>
            <div class="skill-slot-type">${s.type}</div>
            <div class="skill-slot-count">${s.slots} Slot</div>
            <div class="skill-slot-detail"><strong>AP:</strong> ${s.ap} &nbsp; <strong>MP:</strong> ${s.mana}</div>
            <div class="skill-slot-detail" style="margin-top:8px;">${s.desc}</div>
          </div>
        `).join('')}
      </div>

      <!-- Unlock Per Level Table (styled like screenshot) -->
      <div class="skill-unlock-section">
        <div class="skill-unlock-title">
          <span class="skill-unlock-title-icon">🎯</span>
          <span>Unlock Per Level</span>
        </div>
        <div class="skill-unlock-table">
          ${SKILL_SYSTEM.unlockTable.map((row, idx) => `
            <div class="skill-unlock-row${idx % 2 === 1 ? ' alt' : ''}" id="skill-row-lv${row.level}">
              <div class="skill-unlock-lv" style="color:${row.color};">Lv.${row.level}</div>
              <div class="skill-unlock-icon-wrap" style="background:${row.color}18; border-color:${row.color}40;">
                <span class="skill-unlock-type-icon">${row.icon}</span>
              </div>
              <div class="skill-unlock-desc">${row.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Damage Formula -->
      <div class="grid-2 mt-24">
        <div class="card">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:14px;">📐 FORMULA DAMAGE</div>
          <div style="font-size:0.78rem;line-height:2.2;">
            <div>⚔️ PHYS DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.phys}</span></div>
            <div>✨ MAG DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.magic}</span></div>
            <div>🔻 MIN DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.minDmg}</span></div>
            <div>🔺 MAX DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.maxDmg}</span></div>
            <div>💥 CRIT DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.critDmg}</span></div>
          </div>
        </div>
        <div class="card">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:14px;">🏷️ LEGENDA TIPE AKSI</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${[
              { icon:'🛡️', label:'Nova (Aksi Normal)',        color:'#4fc3f7', ap:'2 AP / No Mana' },
              { icon:'🎯', label:'Wild (Aksi Khusus)',         color:'#ff7043', ap:'1 AP / No Mana' },
              { icon:'💥', label:'Supernova (Aksi Kuat)',      color:'#ff5252', ap:'3 AP / Mid Mana' },
              { icon:'⚡', label:'HyperNova (Ultimate)',        color:'#ffd740', ap:'4–5 AP / High Mana' },
              { icon:'💎', label:'Mastery Bonus',              color:'#e040fb', ap:'Passive' },
              { icon:'🗡️', label:'Signature Move',             color:'#d4a843', ap:'Lv.100 Unlock' },
            ].map(t => `
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:1rem;width:22px;text-align:center;">${t.icon}</span>
                <div style="flex:1;">
                  <div style="font-family:var(--font-ui);font-size:0.62rem;font-weight:700;color:${t.color};">${t.label}</div>
                  <div style="font-size:0.65rem;color:var(--text-dim);">${t.ap}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  } else {
    area.innerHTML = `
<div class="sgd-intro">
        Magic atau Skill di Dunia OMAN memang dibuat berdasarkan <span style="color:var(--gold);">imajinasi & kreativitas</span> player,
        namun wajib mengikuti aturan tipe, AP cost, dan formula yang berlaku.
      </div>
      <div class="sgd-grid">
        ${SKILL_GUIDE_DATA.map(s => `
          <div class="sgd-card" style="border-left-color:${s.color};">
            <!-- Header -->
            <div class="sgd-header">
              <div class="sgd-icon-wrap" style="background:${s.colorDim};border-color:${s.color}44;">
                <span class="sgd-icon">${s.icon}</span>
              </div>
              <div class="sgd-header-info">
                <div class="sgd-title" style="color:${s.color};">${s.title.replace(/\n/g,'<br>')}</div>
                <div class="sgd-cost">${s.ap} · ${s.mana}</div>
              </div>
            </div>
            <!-- Tagline -->
            <div class="sgd-tagline" style="border-left-color:${s.color};color:${s.color};">
              ${s.tagline.replace(/\n/g,'<br>')}
            </div>
            <!-- Karakteristik -->
            <div class="sgd-section-label">KARAKTERISTIK</div>
            <ul class="sgd-list">
              ${s.karakteristik.map(k => `<li class="sgd-list-item">· ${k}</li>`).join('')}
            </ul>
            <!-- Contoh Skill -->
            <div class="sgd-section-label" style="margin-top:14px;">CONTOH SKILL</div>
            <div class="sgd-examples">
              ${s.contohSkill.map(ex => `
                <div class="sgd-example">
                  <span class="sgd-class-tag" style="border-color:${s.color}55;color:${s.color};">[${ex.class}]</span>
                  <span class="sgd-skill-name">${ex.name}</span>
                  <span class="sgd-skill-sep">—</span>
                  <span class="sgd-skill-desc">${ex.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>
      `).join('')}
      </div>
      <!-- Format box -->
      <div class="sgd-format-box">
        <div class="sgd-format-title">📋 FORMAT PENULISAN SKILL</div>
        <div class="sgd-format-body">
          <div class="sgd-format-row"><span class="sgd-format-key">Nama Skill</span><span class="sgd-format-val">— nama unik skill kamu</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Tipe Aksi</span><span class="sgd-format-val">— Nova / Supernova / HyperNova / Wild / Signature</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">AP Cost</span><span class="sgd-format-val">— sesuai tipe aksi</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Deskripsi RP</span><span class="sgd-format-val">— apa yang dilakukan skill dalam narasi</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Efek Game</span><span class="sgd-format-val">— damage / buff / debuff / efek status</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Cooldown</span><span class="sgd-format-val">— berapa ronde istirahat (sesuai tipe)</span></div>
        </div>
      </div>
   </div>`;
  }
}

// ════════════════════════════════════════════════════════════
// KALKULATOR PAGE
// ════════════════════════════════════════════════════════════
let currentCalcTab = 'stat';

function renderKalkulatorPage() {
  document.querySelectorAll('#calc-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#calc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCalcTab = btn.dataset.calc;
      renderCalcDisplay(currentCalcTab);
    });
  });
  renderCalcDisplay(currentCalcTab);
}

function renderCalcDisplay(type) {
  if (type === 'stat') renderStatCalc();
  else if (type === 'battle') renderBattleSimulator();
  else if (type === 'list') renderCharacterList();
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Animate counters when they're in view
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); counterObs.disconnect(); } });
  }, { threshold: 0.3 });
  const statsBand = document.querySelector('.stats-band');
  if (statsBand) counterObs.observe(statsBand);

  // Init RA Clock (always visible on home page)
  initRAClock();

  // Render initial home page already rendered via HTML
  // Other pages rendered on navigation
});
