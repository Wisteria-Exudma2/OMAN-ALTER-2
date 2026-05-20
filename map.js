/* ============================================================
   MAP SYSTEM FUNCTIONS — OMAN INTERACTIVE WORLD MAP
   Integrasi dengan main.js untuk menampilkan map di home page
   ============================================================ */

'use strict';

// ════════════════════════════════════════════════════════════
// MAP SYSTEM - STATE MANAGEMENT
// ════════════════════════════════════════════════════════════
let currentMapId = 'world-oman';
let mapNavigationHistory = ['world-oman'];

// ════════════════════════════════════════════════════════════
// INITIALIZE MAP SYSTEM
// ════════════════════════════════════════════════════════════
function initMapSystem() {
  renderMapTabs();
  renderMapDisplay(currentMapId);
  renderRegionCards();
}

// ════════════════════════════════════════════════════════════
// RENDER MAP TABS
// ════════════════════════════════════════════════════════════
function renderMapTabs() {
  const tabsContainer = document.getElementById('map-tabs');
  if (!tabsContainer) return;

  // World map tab + 7 faction tabs
  const tabs = [
    { id: 'world-oman', label: '🗺️ DUNIA', emoji: '🌍' },
    { id: 'aurelian-nw-territory', label: 'Aurelian', emoji: '👑' },
    { id: 'arcane-central-towers', label: 'Arcane', emoji: '🔮' },
    { id: 'shadow-underground-realm', label: 'Shadow', emoji: '🌑' },
    { id: 'wildlands-grassland-realm', label: 'Wildlands', emoji: '🌿' },
    { id: 'ironforge-forgelands', label: 'Ironforge', emoji: '⚒️' },
    { id: 'crimson-fortress-realm', label: 'Crimson', emoji: '⚔️' },
    { id: 'void-corrupted-lands', label: 'Void', emoji: '🌀' },
  ];

  tabsContainer.innerHTML = tabs.map(tab => `
    <button class="map-tab ${tab.id === currentMapId ? 'active' : ''}" 
            data-map-id="${tab.id}" 
            id="tab-map-${tab.id}"
            title="${tab.label}">
      ${tab.emoji}
      <span class="map-tab-label">${tab.label}</span>
    </button>
  `).join('');

  // Attach event listeners
  tabsContainer.querySelectorAll('.map-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const mapId = btn.dataset.mapId;
      switchMap(mapId);
    });
  });
}

// ════════════════════════════════════════════════════════════
// SWITCH MAP WITH ANIMATION
// ════════════════════════════════════════════════════════════
function switchMap(mapId) {
  if (!WORLD_MAPS[mapId]) return;

  // Update active tab
  document.querySelectorAll('.map-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mapId === mapId);
  });

  // Add to history
  if (mapId !== currentMapId) {
    mapNavigationHistory.push(mapId);
  }

  // Trigger animation + render
  const container = document.getElementById('map-display-container');
  if (container) {
    container.style.opacity = '0.5';
    container.style.transform = 'scale(0.98)';
  }

  setTimeout(() => {
    currentMapId = mapId;
    renderMapDisplay(mapId);
    renderRegionCards();
    if (container) {
      container.style.opacity = '1';
      container.style.transform = 'scale(1)';
    }
  }, 300);
}

// ════════════════════════════════════════════════════════════
// RENDER MAP DISPLAY (Image + Legend)
// ════════════════════════════════════════════════════════════
function renderMapDisplay(mapId) {
  const mapData = WORLD_MAPS[mapId];
  if (!mapData) return;

  const imageWrapper = document.getElementById('map-image-wrapper');
  const mapTitle = document.getElementById('map-title');
  const mapSubtitle = document.getElementById('map-subtitle');
  const mapLegend = document.getElementById('map-legend');
  const mapImage = document.getElementById('map-image');

  if (!imageWrapper) return;

  // Update title & subtitle
  mapTitle.textContent = mapData.name;
  mapSubtitle.textContent = mapData.subtitle || mapData.description;

  // Load map image
  mapImage.src = mapData.imageUrl;
  mapImage.alt = mapData.name;

  // Render legend
  mapLegend.innerHTML = `
    <div class="legend-header">📍 LEGENDA</div>
    <div class="legend-items">
      ${mapData.legend.map(item => `
        <div class="legend-item">
          <span class="legend-symbol" style="color: ${item.color};">${item.symbol}</span>
          <span class="legend-label">${item.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// RENDER REGION CARDS (Clickable Areas)
// ════════════════════════════════════════════════════════════
function renderRegionCards() {
  const mapData = WORLD_MAPS[currentMapId];
  if (!mapData || !mapData.regions) return;

  const regionsGrid = document.getElementById('map-regions-grid');
  if (!regionsGrid) return;

  regionsGrid.innerHTML = mapData.regions.map(region => `
    <div class="region-card" 
         style="border-color: ${region.color}22; --region-color: ${region.color};"
         onclick="switchMap('${region.linkedMapId}')"
         id="region-${region.name.replace(/\s+/g, '-').toLowerCase()}">
      <style>
        #region-${region.name.replace(/\s+/g, '-').toLowerCase()}::before {
          background: ${region.color};
        }
        #region-${region.name.replace(/\s+/g, '-').toLowerCase()}:hover {
          border-color: ${region.color}66;
          box-shadow: 0 0 20px ${region.color}44;
        }
      </style>
      
      <div class="region-emoji">${region.emoji}</div>
      <div class="region-name">${region.name}</div>
      <div class="region-faction" style="color: ${region.color};">
        ${region.faction ? `<span class="faction-badge">${region.faction.toUpperCase()}</span>` : ''}
      </div>
      <div class="region-desc">${region.description}</div>
      <div class="region-cities">
        <small style="color: var(--text-dim);">
          ${region.majorCities ? `${region.majorCities.slice(0, 2).join(', ')}...` : 'Kota-kota kecil'}
        </small>
      </div>
      <div class="region-action">
        🔍 Lihat Detail →
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// GO BACK TO PREVIOUS MAP
// ════════════════════════════════════════════════════════════
function mapGoBack() {
  if (mapNavigationHistory.length > 1) {
    mapNavigationHistory.pop();
    const previousMapId = mapNavigationHistory[mapNavigationHistory.length - 1];
    switchMap(previousMapId);
  }
}

// ════════════════════════════════════════════════════════════
// EXPORT FUNCTIONS FOR USE IN MAIN.JS
// ════════════════════════════════════════════════════════════
// Functions di-export sebagai global untuk diakses dari HTML
window.switchMap = switchMap;
window.mapGoBack = mapGoBack;
window.initMapSystem = initMapSystem;
