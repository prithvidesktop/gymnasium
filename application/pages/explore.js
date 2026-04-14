/* ============================================================
   FLEXPASS — EXPLORE / MARKETPLACE PAGE
   ============================================================ */
window.FP = window.FP || {};
FP.pages = FP.pages || {};

FP.pages.explore = {
  _filter: { type: 'all', tier: null, sortBy: 'distance', search: '' },
  _viewMode: 'grid',   /* grid | list | map */

  render(params = {}) {
    if (params.type) this._filter.type = params.type;
    const gyms = FP.data.filterGyms(this._filter);

    return `
      <div class="page-enter" style="padding-bottom:80px">

        <!-- Search Bar -->
        <div style="padding:var(--space-md) var(--space-md) 0">
          <div role="search" aria-label="Search gyms and studios">
            <div class="input-wrapper" style="margin-bottom:0">
              <span class="input-icon" aria-hidden="true">🔍</span>
              <input class="form-input" type="search" id="explore-search"
                     placeholder="Search gyms, studios, activities..."
                     value="${this._filter.search}"
                     aria-label="Search gyms, studios and activities"
                     autocomplete="off"
                     oninput="FP.pages.explore._onSearch(this.value)"
                     style="border-radius:999px;padding-left:44px;background:var(--surface-2)">
            </div>
          </div>
        </div>

        <!-- Activity Type Filter -->
        <div class="filter-bar" style="padding-top:12px" role="group" aria-label="Filter by activity type">
          ${FP.data.activityTypes.map(t => `
            <div class="filter-chip ${this._filter.type === t.id ? 'active' : ''}"
                 onclick="FP.pages.explore._setType('${t.id}')"
                 role="button" tabindex="0"
                 aria-pressed="${this._filter.type === t.id}"
                 aria-label="${t.label}${this._filter.type === t.id ? ', selected' : ''}"
                 onkeydown="if(event.key==='Enter'||event.key===' ')FP.pages.explore._setType('${t.id}')">
              ${t.emoji} ${t.label}
            </div>`).join('')}
        </div>

        <!-- Sort + View toggle -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-md) 12px;gap:8px">
          <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;flex:1" role="group" aria-label="Sort options">
            ${[['distance','📍 Nearest'],['rating','⭐ Top Rated'],['price','💰 Price']].map(([k,l]) => `
              <button class="sort-btn ${this._filter.sortBy===k?'active':''}"
                      onclick="FP.pages.explore._setSort('${k}')"
                      aria-pressed="${this._filter.sortBy===k}">${l}</button>`).join('')}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0" role="group" aria-label="View mode">
            <button class="btn-icon btn btn-ghost btn-sm" style="border-radius:8px;font-size:16px;width:36px;height:36px;${this._viewMode==='grid'?'background:var(--primary);color:#fff':''}"
                    onclick="FP.pages.explore._setView('grid')"
                    aria-label="Grid view" aria-pressed="${this._viewMode==='grid'}">▦</button>
            <button class="btn-icon btn btn-ghost btn-sm" style="border-radius:8px;font-size:16px;width:36px;height:36px;${this._viewMode==='map'?'background:var(--primary);color:#fff':''}"
                    onclick="FP.pages.explore._setView('map')"
                    aria-label="Map view" aria-pressed="${this._viewMode==='map'}">🗺️</button>
          </div>
        </div>

        <!-- Results count (live region) -->
        <div style="padding:0 var(--space-md) 12px;font-size:13px;color:var(--text-muted)"
             role="status" aria-live="polite" aria-atomic="true" id="explore-results-count">
          ${gyms.length} venue${gyms.length !== 1 ? 's' : ''} found
          ${this._filter.type !== 'all' ? `· ${FP.data.activityTypes.find(t=>t.id===this._filter.type)?.label}` : ''}
          ${this._filter.search ? `· "${this._filter.search}"` : ''}
        </div>

        <!-- Map view -->
        ${this._viewMode === 'map' ? this._renderMap(gyms) : ''}

        <!-- Gym Grid / List — live region for dynamic updates -->
        <div id="explore-gym-list" aria-live="polite" aria-atomic="false">
          ${this._renderGymList(gyms)}
        </div>
      </div>`;
  },

  _renderMap(gyms) {
    const pins = gyms.slice(0, 8).map((g, i) => {
      const left = 10 + (i % 4) * 22;
      const top  = 20 + Math.floor(i / 4) * 45;
      return `<div class="map-pin" style="left:${left}%;top:${top}%;transform:none;font-size:22px;animation-delay:${i*0.1}s;cursor:pointer"
                   onclick="FP.Router.go('gym-detail',{id:'${g.id}'})"
                   role="button" tabindex="0"
                   aria-label="${g.name}"
                   onkeydown="if(event.key==='Enter')FP.Router.go('gym-detail',{id:'${g.id}'})">${g.emoji}</div>`;
    }).join('');

    return `
      <div class="map-placeholder" style="margin:0 var(--space-md) var(--space-md)" role="img" aria-label="Map showing ${gyms.length} nearby venues">
        ${pins}
        <div style="position:relative;z-index:1;text-align:center">
          <div style="font-size:28px;margin-bottom:4px" aria-hidden="true">🗺️</div>
          <span style="font-size:13px;font-weight:600">Interactive Map View</span>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Tap pins to view venue</div>
        </div>
      </div>`;
  },

  _renderGymList(gyms) {
    if (gyms.length === 0) {
      return `
        <div class="empty-state" role="status" aria-live="polite">
          <div class="empty-icon" aria-hidden="true">🔍</div>
          <div class="empty-title">No venues found</div>
          <div class="empty-desc">Try adjusting your filters or search differently</div>
          <button class="btn btn-secondary btn-sm" onclick="FP.pages.explore._clearFilters()">Clear Filters</button>
        </div>`;
    }

    if (this._viewMode === 'list') {
      return `<div style="padding:0 var(--space-md);display:flex;flex-direction:column;gap:12px" role="list">
                ${gyms.map(g => FP.GymCard.render(g, 'horizontal')).join('')}
              </div>`;
    }

    /* Grid view — uses responsive .gym-grid class */
    return `<div class="gym-grid" role="list">
              ${gyms.map(g => FP.GymCard.renderGrid ? FP.GymCard.renderGrid(g) : FP.GymCard.render(g)).join('')}
            </div>`;
  },

  _setType(type) {
    this._filter.type = type;
    this._rerender();
  },

  _setSort(sortBy) {
    this._filter.sortBy = sortBy;
    this._rerender();
  },

  _setView(mode) {
    this._viewMode = mode;
    this._rerender();
  },

  _onSearch: (() => {
    let timer;
    return function(val) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        FP.pages.explore._filter.search = val;
        FP.pages.explore._rerender();
      }, 300);
    };
  })(),

  _clearFilters() {
    this._filter = { type: 'all', tier: null, sortBy: 'distance', search: '' };
    this._rerender();
  },

  _rerender() {
    const content = document.getElementById('app-content');
    if (content) {
      const searchVal = this._filter.search;
      content.innerHTML = this.render();
      /* Restore search focus & value without disruptive layout shift */
      const searchEl = document.getElementById('explore-search');
      if (searchEl && searchVal) {
        searchEl.value = searchVal;
        searchEl.focus();
        searchEl.selectionStart = searchEl.selectionEnd = searchEl.value.length;
      }
    }
  },

  init() { /* click handlers are inline */ }
};
