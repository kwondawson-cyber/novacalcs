/* ============================================
   novacalcs.com — common.js
   Favorites · Search · Utils
   ============================================ */

(function () {
  'use strict';

  // ==========================================
  // FAVORITES
  // ==========================================
  const FAVORITES_KEY = 'nc_favorites';

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }
    catch { return []; }
  }

  function saveFavorites(arr) {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr)); }
    catch {}
  }

  function isFavorited(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx > -1) favs.splice(idx, 1);
    else favs.unshift(id);
    saveFavorites(favs);
    return idx === -1; // true = now favorited
  }

  // Bind all favorite buttons on page
  function initFavorites() {
    document.querySelectorAll('[data-fav-btn]').forEach(btn => {
      const id = btn.dataset.favBtn;
      if (isFavorited(id)) btn.classList.add('starred');
      btn.setAttribute('title', isFavorited(id) ? 'Hapus dari favorit' : 'Tambah ke favorit');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const now = toggleFavorite(id);
        this.classList.toggle('starred', now);
        this.setAttribute('title', now ? 'Hapus dari favorit' : 'Tambah ke favorit');
        renderFavoritesSection();
      });
    });
  }

  // Render favorites strip at top
  function renderFavoritesSection() {
    const container = document.getElementById('favorites-grid');
    if (!container) return;

    const favs = getFavorites();
    const section = document.getElementById('favorites-section');

    if (favs.length === 0) {
      if (section) section.classList.add('hidden');
      return;
    }

    if (section) section.classList.remove('hidden');

    // Build cards from data
    const allCalcs = window.NC_CALCS || [];
    const favCalcs = favs.map(id => allCalcs.find(c => c.id === id)).filter(Boolean);

    container.innerHTML = favCalcs.map(calc => buildCardHTML(calc)).join('');
    bindCardEvents(container);
  }

  // ==========================================
  // SEARCH & FILTER
  // ==========================================
  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounce;
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(() => filterCalcs(this.value.trim()), 150);
    });

    // Clear on Escape
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { this.value = ''; filterCalcs(''); }
    });
  }

  function filterCalcs(query) {
    const allCalcs = window.NC_CALCS || [];
    const q = query.toLowerCase();
    const activeCat = document.querySelector('.cat-tab.active')?.dataset.cat || 'all';

    let filtered = allCalcs;
    if (activeCat !== 'all') {
      filtered = filtered.filter(c => c.cat === activeCat);
    }
    if (q) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.desc && c.desc.toLowerCase().includes(q)) ||
        (c.keywords && c.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }

    renderMainGrid(filtered);

    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.classList.toggle('hidden', filtered.length > 0);
    }
  }

  function renderMainGrid(calcs) {
    const grid = document.getElementById('main-grid');
    if (!grid) return;
    grid.innerHTML = calcs.map(c => buildCardHTML(c)).join('');
    bindCardEvents(grid);
    initFavorites();
  }

  // ==========================================
  // CATEGORY TABS
  // ==========================================
  function initCategoryTabs() {
    const tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Sync sidebar
        const cat = this.dataset.cat;
        document.querySelectorAll('.sidebar-cat').forEach(sc => {
          sc.classList.toggle('active', sc.dataset.cat === cat);
        });

        filterCalcs(document.getElementById('search-input')?.value || '');
      });
    });

    // Sidebar cats
    document.querySelectorAll('.sidebar-cat').forEach(sc => {
      sc.addEventListener('click', function () {
        const cat = this.dataset.cat;
        const tab = document.querySelector(`.cat-tab[data-cat="${cat}"]`);
        if (tab) tab.click();
        // Mobile: scroll tab into view
        tab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }

  // ==========================================
  // CARD BUILDER
  // ==========================================
  function buildCardHTML(calc) {
    const starred = isFavorited(calc.id) ? 'starred' : '';
    const badge = calc.badge
      ? `<span class="badge badge-${calc.badge}">${calc.badge === 'new' ? 'Baru' : 'Populer'}</span>`
      : '';
    return `
      <a href="/id/${calc.slug}.html" class="calc-card" data-id="${calc.id}">
        <div class="card-icon">${calc.icon}</div>
        <div class="card-name">${calc.name} ${badge}</div>
        <div class="card-desc">${calc.desc}</div>
        <button class="card-favorite ${starred}" data-fav-btn="${calc.id}" aria-label="Favorit">
          ${starred ? '★' : '☆'}
        </button>
      </a>`;
  }

  function bindCardEvents(container) {
    container.querySelectorAll('[data-fav-btn]').forEach(btn => {
      const id = btn.dataset.favBtn;
      if (isFavorited(id)) btn.classList.add('starred');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const now = toggleFavorite(id);
        this.classList.toggle('starred', now);
        this.innerHTML = now ? '★' : '☆';
        renderFavoritesSection();
      });
    });
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    // Render main grid first time
    if (window.NC_CALCS && document.getElementById('main-grid')) {
      renderMainGrid(window.NC_CALCS);
    }
    renderFavoritesSection();
    initFavorites();
    initSearch();
    initCategoryTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.NC = { getFavorites, toggleFavorite, filterCalcs };

})();
