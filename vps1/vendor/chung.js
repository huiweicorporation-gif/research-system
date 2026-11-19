/**
 * ═══════════════════════════════════════════════════════════════════
 *  COMMON.JS — Global Utility Library (Global MT Object)
 *  Command Center YouTube  |  ES6+  |  No dependencies
 *  Refactored to English-first codebase v0.2.0
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

/* ─── GLOBAL MT OBJECT ──────────────────────────────────────────────
 *  MT = "MyTool" — single namespace, no global scope pollution
 * ─────────────────────────────────────────────────────────────────── */
const MT = (() => {

  // ── ICON PATHS (Lucide-style SVG paths) ─────────────────────────
  // Each entry is an array [viewBox?, path_d] or a path_d string
  const _icPaths = {
    // Navigation & Layout
    'map':      'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-12v15',
    'layers':   'M2 12l10-6 10 6-10 6-10-6zm0 6l10 6 10-6M2 6l10 6 10-6',
    'castle':   'M22 20V8h-4l-2-4H8L6 8H2v12h20zM6 20v-4h4v4H6zm8 0v-4h4v4h-4zM2 12h20',
    'flag':     'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 7v-7',
    'chevron-right': 'M9 18l6-6-6-6',
    'chevron-left':  'M15 18l-6-6 6-6',
    'chevron-down':  'M6 9l6 6 6-6',
    'chevron-up':    'M18 15l-6-6-6 6',

    // Actions & Status
    'play':     'M5 3l14 9-14 9V3z',
    'swords':   'M14.5 17.5L3 6V3h3l11.5 11.5m0 0l3 3a1 1 0 01-1.5 1.5l-3-3m0-6L21 3M9 3L3 9',
    'target':   'M12 22a10 10 0 100-20 10 10 0 000 20zm0-14a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 100 4 2 2 0 000-4z',
    'zap':      'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    'flame':    'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z',
    'trophy':   'M6 9H2V5h4m12 4h4V5h-4M6 5h12a1 1 0 011 1v7a7 7 0 01-14 0V6a1 1 0 011-1zm-3 9.5a6 6 0 006 4h6a6 6 0 006-4M9 20h6m-3 0v4',
    'medal':    'M12 15a7 7 0 100-14 7 7 0 000 14zm0 0l-2.5 8.5L12 21l2.5 2.5L12 15z',
    'shield':   'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'lock':     'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zm-7 4a1 1 0 110 2 1 1 0 010-2zm-3-4V7a3 3 0 116 0v4',
    'check':    'M20 6L9 17l-5-5',
    'x':        'M18 6L6 18M6 6l12 12',
    'alert':    'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01',
    'hammer':   'M13 2l-2 2.5h3L12 7H9l-2 2.5h3L8 12H5l-2 2 7 7 2-2v-3l2.5-2V13l2-2V8l2-2.5H14L13 2zm1 10l-4.5 4.5',
    'upload':   'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5-5 5m5-5v12',

    // Time & Schedule
    'clock':    'M12 22a10 10 0 100-20 10 10 0 000 20zm0-14v6l4 2',
    'hourglass':'M5 22h14M5 2h14m-7 10l-5 5V2l5 5 5-5v15l-5-5z',
    'calendar': 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',

    // Data & Content
    'users':    'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m22 0v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    'eye':      'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 100 6 3 3 0 000-6z',
    'film':     'M2 2h20v20H2V2zm4 0v20M18 2v20M2 8h4m10 0h6M2 16h4m10 0h6',
    'truck':    'M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3M9 17h8m-8 0a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 114 0 2 2 0 01-4 0zm3-5l-4-5h4v5z',
    'box':      'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zm-10-9l7 4-7 4-7-4 7-4zm-7 5l7 4v7m7-11v7',

    // Domain-specific
    'factory':  'M2 20V8l8-6 8 6v12H2zm4 0v-4h4v4H6zm8 0v-4h4v4h-4zm-8-8h4v4H6v-4zm8 0h4v4h-4v-4z',
    'brain':    'M9.5 2A2.5 2.5 0 017 4.5v.5H5a3 3 0 00-3 3v1a3 3 0 003 3h.5V13A2.5 2.5 0 008 15.5V17a1 1 0 002 0v-1.5A2.5 2.5 0 0012.5 13v-.5H13a3 3 0 003-3V8a3 3 0 00-3-3h-2v-.5A2.5 2.5 0 009.5 2zm5 0A2.5 2.5 0 0117 4.5V5h2a3 3 0 013 3v1a3 3 0 01-3 3h-.5V13A2.5 2.5 0 0116 15.5V17a1 1 0 01-2 0v-1.5A2.5 2.5 0 0111.5 13v-.5H11a3 3 0 01-3-3V8a3 3 0 013-3h2v-.5A2.5 2.5 0 0114.5 2z',
    'flask':    'M8 2h8m-4 0v6l-4 4m4-4l4 4v10H6V16l4-4V2',
  };

  // ── PRIVATE: DOM SETUP (toast container, modal, drawer) ──────────
  let _toastContainer = null;
  let _modalEl = null;
  let _drawerEl = null;

  function _ensureToast() {
    if (!_toastContainer) {
      _toastContainer = document.getElementById('toast-container');
      if (!_toastContainer) {
        _toastContainer = document.createElement('div');
        _toastContainer.id = 'toast-container';
        document.body.appendChild(_toastContainer);
      }
    }
    return _toastContainer;
  }

  function _ensureModal() {
    if (!_modalEl) {
      _modalEl = document.getElementById('global-modal');
      if (!_modalEl) {
        _modalEl = document.createElement('div');
        _modalEl.id = 'global-modal';
        _modalEl.className = 'modal-overlay';
        _modalEl.innerHTML = `
          <div class="modal-frame" role="dialog" aria-modal="true">
            <div class="modal-header">
              <span id="_modal-title"></span>
              <button class="btn btn-ghost btn-sm" id="_modal-close" aria-label="Close">
                ${_pub.ic('x', 14)}
              </button>
            </div>
            <div class="modal-body" id="_modal-content"></div>
            <div class="modal-footer" id="_modal-footer"></div>
          </div>`;
        document.body.appendChild(_modalEl);

        _modalEl.querySelector('#_modal-close')?.addEventListener('click', () => _pub.closeModal());
        _modalEl.addEventListener('click', (e) => { if (e.target === _modalEl) _pub.closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') _pub.closeModal(); });
      }
    }
    return _modalEl;
  }

  function _ensureDrawer() {
    if (!_drawerEl) {
      _drawerEl = document.getElementById('global-drawer');
      if (!_drawerEl) {
        _drawerEl = document.createElement('div');
        _drawerEl.id = 'global-drawer';
        _drawerEl.className = 'drawer-overlay';
        _drawerEl.innerHTML = `
          <div class="drawer-frame" role="complementary">
            <div class="drawer-header">
              <div>
                <div id="_drawer-title"></div>
                <div class="drawer-subtitle" id="_drawer-subtitle"></div>
              </div>
              <button class="btn btn-ghost btn-sm" id="_drawer-close" aria-label="Close">
                ${_pub.ic('x', 14)}
              </button>
            </div>
            <div class="drawer-body" id="_drawer-content"></div>
          </div>`;
        document.body.appendChild(_drawerEl);

        _drawerEl.querySelector('#_drawer-close')?.addEventListener('click', () => _pub.closeDrawer());
        _drawerEl.addEventListener('click', (e) => { if (e.target === _drawerEl) _pub.closeDrawer(); });
      }
    }
    return _drawerEl;
  }

  // ── PUBLIC API ───────────────────────────────────────────────────
  const _pub = {

    /* ─── 1. ESCAPE HTML (XSS protection) ─────────────────────────
     *  MT.esc('<script>alert(1)</script>') → '&lt;script&gt;...'
     */
    esc(str) {
      if (str == null) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },

    /* ─── 2. FORMAT NUMBER with comma separators ───────────────────
     *  MT.num(1234567)        → '1,234,567'
     *  MT.num(1234.567, 2)   → '1,234.57'
     */
    num(n, decimals = 0) {
      if (n == null || isNaN(n)) return '—';
      return Number(n).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    },
    /** @deprecated Use MT.num() */
    so(...a) { return this.num(...a); },

    /* ─── 3. COMPACT NUMBER format ─────────────────────────────────
     *  MT.fmt(1200)       → '1.2K'
     *  MT.fmt(3500000)    → '3.5M'
     *  MT.fmt(1200000000) → '1.2B'
     */
    fmt(num) {
      if (num == null || isNaN(num)) return '—';
      const n = Number(num);
      const abs = Math.abs(n);
      const sign = n < 0 ? '-' : '';
      if (abs >= 1e9) return sign + (abs / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
      if (abs >= 1e6) return sign + (abs / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
      if (abs >= 1e3) return sign + (abs / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
      return sign + String(abs);
    },

    /* ─── 4. FORMAT PERCENTAGE ──────────────────────────────────────
     *  MT.pct(0.856)  → '85.6%'
     *  MT.pct(12.5, true) → '12.5%'  (value already a percentage)
     */
    pct(num, isAlready = false) {
      if (num == null || isNaN(num)) return '—';
      const val = isAlready ? Number(num) : Number(num) * 100;
      return val.toFixed(1) + '%';
    },
    /** @deprecated Use MT.pct() */
    pc(...a) { return this.pct(...a); },

    /* ─── 5. CLAMP NUMBER ───────────────────────────────────────────
     *  MT.clamp(150, 0, 100) → 100
     */
    clamp(val, min, max) {
      return Math.min(Math.max(Number(val), min), max);
    },
    /** @deprecated Use MT.clamp() */
    kep(...a) { return this.clamp(...a); },

    /* ─── 6. HASH STRING → INTEGER ─────────────────────────────────
     *  Generates a consistent color from a channel name / id.
     *  MT.hash('GameChannel') → 12345678 (same output for same input)
     */
    hash(str) {
      let h = 0;
      const s = String(str);
      for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        h = (h << 5) - h + char;
        h |= 0; // Convert to 32-bit integer
      }
      return Math.abs(h);
    },
    /** @deprecated Use MT.hash() */
    bam(...a) { return this.hash(...a); },

    /* ─── 7. ICON PATH DATA ─────────────────────────────────────────
     *  MT.icPath('play') → SVG path string
     */
    icPath(name) {
      return _icPaths[name] || '';
    },
    /** @deprecated Use MT.icPath() */
    icTho(...a) { return this.icPath(...a); },

    /* ─── 8. RENDER ICON SVG ────────────────────────────────────────
     *  MT.ic('play', 16) → '<svg ...><path d="..."/></svg>'
     *  MT.ic('play', 16, '#2ee6c5') → teal icon
     */
    ic(name, size = 16, color = 'currentColor') {
      const d = _icPaths[name];
      if (!d) return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      // Fill-based icons (no stroke)
      const fillIcons = ['play', 'flame'];
      const isFill = fillIcons.includes(name);
      const strokeAttr = isFill
        ? `fill="${color}" stroke="none"`
        : `fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${strokeAttr} aria-hidden="true"><path d="${d}"/></svg>`;
    },

    /* ─── 9. FETCH JSON ─────────────────────────────────────────────
     *  MT.fetchJSON('/vps1/data.json').then(d => console.log(d))
     */
    async fetchJSON(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
      return res.json();
    },
    /** @deprecated Use MT.fetchJSON() */
    async taiJSON(url) { return this.fetchJSON(url); },

    /* ─── 10. AUTO REFRESH ──────────────────────────────────────────
     *  const stop = MT.refresh(() => loadData(), 30000)
     *  stop() // cancel interval
     */
    refresh(callback, interval = 30000) {
      if (typeof callback !== 'function') return () => {};
      callback(); // call immediately on first run
      const id = setInterval(callback, interval);
      return () => clearInterval(id);
    },
    /** @deprecated Use MT.refresh() */
    lamMoi(...a) { return this.refresh(...a); },

    /* ─── 11. UPDATE SYSTEM STATUS ──────────────────────────────────
     *  MT.status(Date.now(), null)        → show timestamp OK
     *  MT.status(null, 'Connection error') → show error state
     */
    status(timestamp, error = null) {
      const el = document.getElementById('system-status');
      if (!el) return;
      if (error) {
        el.className = 'status-indicator error';
        el.innerHTML = `<span class="status-dot error"></span>${this.esc(error)}`;
        return;
      }
      const ts = timestamp ? new Date(timestamp) : new Date();
      const timeStr = ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      el.className = 'status-indicator ok';
      el.innerHTML = `<span class="status-dot"></span>Updated ${timeStr}`;
    },
    /** @deprecated Use MT.status() */
    song(...a) { return this.status(...a); },

    /* ─── 12. DONUT / RING CHART ────────────────────────────────────
     *  MT.donut(75, 80, '#2ee6c5', '75%', 'Complete')
     *  → returns HTML string to inject via innerHTML
     */
    donut(percent, size = 80, color = 'var(--ta)', text = '', label = '') {
      const pct  = this.clamp(Number(percent) || 0, 0, 100);
      const r    = (size - 10) / 2;
      const circ = 2 * Math.PI * r;
      const dash = (pct / 100) * circ;
      const gap  = circ - dash;
      const cx   = size / 2;
      const cy   = size / 2;
      const fontSize  = size < 60 ? 10 : size < 90 ? 13 : 16;
      const labelSize = size < 60 ? 8 : 10;

      return `<div class="donut-wrap">
        <div class="donut-svg" style="width:${size}px;height:${size}px;">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-label="${this.esc(label || text)}">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="6"/>
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
              stroke-linecap="round" stroke-dasharray="${dash} ${gap}"
              transform="rotate(-90 ${cx} ${cy})"
              style="transition:stroke-dasharray 0.6s ease"/>
          </svg>
          <div class="donut-text">
            <span style="font-size:${fontSize}px;font-weight:700;color:${color};line-height:1">${this.esc(text || pct + '%')}</span>
          </div>
        </div>
        ${label ? `<span class="donut-label">${this.esc(label)}</span>` : ''}
      </div>`;
    },
    /** @deprecated Use MT.donut() */
    vong(...a) { return this.donut(...a); },

    /* ─── 13. SPARKLINE (Mini line chart) ───────────────────────────
     *  MT.spark([10, 25, 18, 30, 22, 35], '#2ee6c5')
     *  → inline HTML <svg...>
     */
    spark(data = [], color = 'var(--ta)', w = 80, h = 28) {
      if (!data || data.length < 2) return '';
      const nums = data.map(Number);
      const min  = Math.min(...nums);
      const max  = Math.max(...nums);
      const range = max - min || 1;
      const pad   = 2;
      const stepX = (w - pad * 2) / (nums.length - 1);

      const pts = nums.map((v, i) => {
        const x = pad + i * stepX;
        const y = pad + (1 - (v - min) / range) * (h - pad * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');

      // Area fill path (below the line)
      const first = `${pad},${h - pad}`;
      const last  = `${(pad + (nums.length - 1) * stepX).toFixed(1)},${h - pad}`;
      const fillPts = `${first} ${pts} ${last}`;
      const gradId  = `sg-${Math.random().toString(36).slice(2)}`;

      return `<span class="spark-wrap">
        <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" overflow="visible">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polyline points="${fillPts}" fill="url(#${gradId})" stroke="none"/>
          <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="${(pad + (nums.length - 1) * stepX).toFixed(1)}" cy="${(pad + (1 - (nums[nums.length - 1] - min) / range) * (h - pad * 2)).toFixed(1)}" r="2.5" fill="${color}"/>
        </svg>
      </span>`;
    },

    /* ─── 14. OPEN DRAWER ───────────────────────────────────────────
     *  MT.openDrawer('Channel Details', '@username', '<p>content...</p>')
     */
    openDrawer(title, subtitle = '', content = '') {
      const el    = _ensureDrawer();
      const tdEl  = el.querySelector('#_drawer-title');
      const stEl  = el.querySelector('#_drawer-subtitle');
      const bdEl  = el.querySelector('#_drawer-content');
      if (tdEl) tdEl.textContent = title;
      if (stEl) stEl.textContent = subtitle;
      if (bdEl) bdEl.innerHTML = content;
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    /** @deprecated Use MT.openDrawer() */
    moNgan(...a) { return this.openDrawer(...a); },

    closeDrawer() {
      if (_drawerEl) _drawerEl.classList.remove('open');
      document.body.style.overflow = '';
    },
    /** @deprecated Use MT.closeDrawer() */
    dongNgan() { return this.closeDrawer(); },

    /* ─── 15. OPEN MODAL (Dialog) ───────────────────────────────────
     *  MT.openModal('Title', '<p>content...</p>')
     *  MT.openModal('Confirm', '...', { footer: '<button>OK</button>' })
     */
    openModal(title, content = '', opts = {}) {
      const el   = _ensureModal();
      const tdEl = el.querySelector('#_modal-title');
      const bdEl = el.querySelector('#_modal-content');
      const ftEl = el.querySelector('#_modal-footer');
      if (tdEl) tdEl.textContent = title;
      if (bdEl) bdEl.innerHTML = content;
      if (ftEl) ftEl.innerHTML = opts.footer || `<button class="btn btn-sm" onclick="MT.closeModal()">Close</button>`;
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    /** @deprecated Use MT.openModal() */
    moHop(...a) { return this.openModal(...a); },

    closeModal() {
      if (_modalEl) _modalEl.classList.remove('open');
      document.body.style.overflow = '';
    },
    /** @deprecated Use MT.closeModal() */
    dongModal() { return this.closeModal(); },

    /* ─── 16. TOAST NOTIFICATION ────────────────────────────────────
     *  MT.toast('Saved successfully!', 'success', 3000)
     *  type: '' (default/teal) | 'success' | 'error' | 'warning'
     */
    toast(content, type = '', duration = 3500) {
      const container = _ensureToast();
      const el = document.createElement('div');
      el.className = `toast ${type}`.trim();

      const iconMap = { 'success': 'check', 'error': 'x', 'warning': 'alert' };
      const iconName = iconMap[type] || 'zap';
      el.innerHTML = `${this.ic(iconName, 14)}<span>${content}</span>`;

      container.appendChild(el);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('show'));
      });

      setTimeout(() => {
        el.classList.remove('show');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
      }, duration);
    },

    /* ─── 17. MAP (Stub — overridden if Leaflet/Maps is available) ──
     *  Stub structure prevents undefined errors
     */
    map: {
      _instance: null,
      _markers:  [],

      render(containerId, opts = {}) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-3);font-family:var(--f-hud);font-size:11px;letter-spacing:.05em;">
          ${MT.ic('map', 20)}<span style="margin-left:8px">MAP — Connect a Map API to activate</span>
        </div>`;
        console.info('[MT.map.render] Map stub. Integrate Google Maps / Leaflet to enable.');
      },

      panTo(lat, lng, opts = {}) {
        console.info('[MT.map.panTo] Pan to:', lat, lng, opts);
      },

      colorLayer(layerName, colorFn) {
        console.info('[MT.map.colorLayer] Color layer:', layerName);
      },

      fitBounds(bounds) {
        console.info('[MT.map.fitBounds] Fit bounds:', bounds);
      },

      addMarker(lat, lng, popup = '', opts = {}) {
        console.info('[MT.map.addMarker] Add marker:', lat, lng, popup);
      },

      clearMarkers() {
        this._markers = [];
        console.info('[MT.map.clearMarkers] Markers cleared.');
      },
    },
    /** @deprecated Use MT.map */
    banDo: null, // set below

    /* ─── ADDITIONAL UTILITIES ──────────────────────────────────── */

    /**
     * Generate HSL color from string (uses hash for consistency)
     * MT.color('GameChannel') → 'hsl(142, 65%, 55%)'
     */
    color(str, s = 65, l = 55) {
      const h = this.hash(str) % 360;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    /** @deprecated Use MT.color() */
    mau(...a) { return this.color(...a); },

    /**
     * Generate letter avatar SVG
     * MT.avatar('NHAT NAM', 36) → HTML img/svg string
     */
    avatar(name = '?', size = 36) {
      const initials = String(name).trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const bg = this.color(name);
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
        <rect width="${size}" height="${size}" rx="${size / 2}" fill="${bg}" opacity="0.85"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          fill="#fff" font-size="${Math.round(size * 0.38)}px" font-family="var(--f-hud)" font-weight="600">${initials}</text>
      </svg>`;
    },

    /**
     * Format relative timestamp
     * MT.timeAgo(timestamp) → '3 minutes ago', '2 hours ago', ...
     */
    timeAgo(timestamp) {
      const diff = (Date.now() - Number(timestamp)) / 1000;
      if (diff < 60)      return 'Just now';
      if (diff < 3600)    return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400)   return `${Math.floor(diff / 3600)} hours ago`;
      if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
      return new Date(timestamp).toLocaleDateString('en-US');
    },
    /** @deprecated Use MT.timeAgo() */
    tuNay(...a) { return this.timeAgo(...a); },

    /**
     * Copy text to clipboard
     * MT.copy('text').then(() => MT.toast('Copied!'))
     */
    async copy(text) {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
    },

    /**
     * Debounce function
     * const debouncedSearch = MT.debounce(search, 300);
     */
    debounce(fn, delay = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    /**
     * Throttle function
     */
    throttle(fn, limit = 100) {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Get query param from URL
     * MT.qp('tab') → 'overview' (if ?tab=overview)
     */
    qp(key) {
      return new URLSearchParams(window.location.search).get(key);
    },

    /**
     * Determine chip color class by relative value
     * MT.chipColor(75) → 'chip-success' | 'chip-warning' | 'chip-danger'
     */
    chipColor(pct, thresholds = { success: 70, warning: 40 }) {
      if (pct >= thresholds.success) return 'chip-success';
      if (pct >= thresholds.warning) return 'chip-warning';
      return 'chip-danger';
    },
    /** @deprecated Use MT.chipColor() */
    mauChip(...a) { return this.chipColor(...a); },

    /**
     * Text color class based on delta (up/down)
     * MT.deltaColor(10)  → 'text-success'
     * MT.deltaColor(-5)  → 'text-danger'
     */
    deltaColor(delta) {
      if (delta > 0) return 'text-success';
      if (delta < 0) return 'text-danger';
      return 'text-3';
    },
    /** @deprecated Use MT.deltaColor() */
    mauDelta(...a) { return this.deltaColor(...a); },

    /**
     * Render delta with arrow indicator
     * MT.delta(12.5, '%') → '<span class="text-success">▲ 12.5%</span>'
     */
    delta(val, suffix = '') {
      if (val == null || isNaN(val)) return '<span class="text-3">—</span>';
      const n = Number(val);
      const cls   = n > 0 ? 'text-success' : n < 0 ? 'text-danger' : 'text-3';
      const arrow = n > 0 ? '▲' : n < 0 ? '▼' : '';
      return `<span class="${cls}">${arrow} ${Math.abs(n).toFixed(1)}${suffix}</span>`;
    },
  };

  // Wire deprecated banDo alias to map
  _pub.banDo = _pub.map;

  return _pub;
})();

/* ── EXPORT / GLOBAL ────────────────────────────────────────────────
 *  Ensure MT is available on window for inline HTML scripts
 * ─────────────────────────────────────────────────────────────────── */
if (typeof window !== 'undefined') {
  window.MT = MT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MT;
}
