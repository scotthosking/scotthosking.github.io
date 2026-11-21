/* ============================================================
   SCOTT HOSKING — Main JS
   Renders all content from SITE_DATA in site-data.js
   ============================================================ */

(function () {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────
  const el = (id) => document.getElementById(id);
  const create = (tag, classes, html) => {
    const e = document.createElement(tag);
    if (classes) e.className = classes;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  // ── Hero ─────────────────────────────────────────────────
  function renderHero() {
    el('hero-name').textContent = SITE_DATA.name;
    el('hero-tagline').textContent = SITE_DATA.tagline;
    el('hero-bio').textContent = SITE_DATA.bio.replace(/\s+/g, ' ').trim();

  }

  // ── About Timeline ────────────────────────────────────────
  const TIMELINE = [
    { year: '2024', text: '<strong>International Conference on Climate Informatics</strong> — Conference Chair' },
    { year: '2023', text: '<strong>FastNet</strong> — Senior Responsible Owner for UK\'s National AI weather model with UK Met Office' },
    { year: '2023', text: '<strong>AI Safety Summit</strong> — Selected as AI for Good exemplar by the UK Department for Science, Innovation and Technology' },
    { year: '2021', text: '<strong>IceNet published</strong> in Nature Communications — first pan-Arctic AI sea ice forecasting model' },
    { year: '2020', text: '<strong>Alan Turing Institute</strong> — Established an environmental programme of research' },
    { year: '2019', text: '<strong>Co-Director, AI4ER CDT</strong> — UKRI Centre for Doctoral Training at Cambridge' },
    { year: '2018', text: '<strong>Founded the BAS AI Lab</strong> — Dedicated AI research team within British Antarctic Survey' },
  ];

  function renderTimeline() {
    const wrap = el('about-timeline');
    TIMELINE.forEach(item => {
      const div = create('div', 'timeline-item reveal');
      div.innerHTML = `
        <span class="tl-year">${item.year}</span>
        <span class="tl-dot"></span>
        <span class="tl-text">${item.text}</span>
      `;
      wrap.appendChild(div);
    });
  }

  // ── Filter Bar ────────────────────────────────────────────
  function renderFilterBar() {
    const bar = el('filter-bar');
    // All button already in HTML, just add pillar buttons
    SITE_DATA.pillars.forEach(pillar => {
      const btn = create('button', 'filter-btn', `${pillar.icon} ${pillar.label}`);
      btn.dataset.filter = pillar.id;
      if (pillar.description) btn.title = pillar.description;
      btn.addEventListener('click', () => {
        filterProjects(pillar.id);
        setFilterBtn(pillar.id);
        // Sync pillar card highlight
        document.querySelectorAll('.pillar-card').forEach(c => {
          c.classList.toggle('active', c.dataset.pillar === pillar.id);
        });
      });
      bar.appendChild(btn);
    });

    // All button listener
    bar.querySelector('[data-filter="all"]').addEventListener('click', () => {
      filterProjects('all');
      setFilterBtn('all');
      document.querySelectorAll('.pillar-card').forEach(c => c.classList.remove('active'));
    });
  }

  function setFilterBtn(filter) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
  }

  function filterProjects(filter) {
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const pillars = card.dataset.pillars ? card.dataset.pillars.split(',') : [];
        card.classList.toggle('hidden', !pillars.includes(filter));
      }
    });
    const empty = el('projects-empty');
    if (empty) empty.hidden = !!document.querySelector('.project-card:not(.hidden)');
  }

  // ── Projects ─────────────────────────────────────────────
  function getPillarLabel(id) {
    const p = SITE_DATA.pillars.find(x => x.id === id);
    return p ? `${p.icon} ${p.label}` : id;
  }

  function renderProjects() {
    const grid = el('projects-grid');
    SITE_DATA.projects.forEach((proj, i) => {
      const hasUrl = !!proj.url;
      const card = document.createElement(hasUrl ? 'a' : 'div');
      card.className = 'project-card reveal';
      if (hasUrl) {
        card.href = proj.url;
        card.target = '_blank';
        card.rel = 'noopener';
      }
      card.dataset.pillars = proj.pillars.join(',');
      card.style.transitionDelay = `${(i % 3) * 0.07}s`;

      // Image or emoji placeholder
      const imgHtml = proj.image
        ? `<img class="project-img" src="${proj.image}" alt="${proj.imageAlt || proj.title}" loading="lazy" />`
        : `<div class="project-img-placeholder">${SITE_DATA.pillars.find(p => p.id === proj.pillars[0])?.icon || '🌍'}</div>`;

      const pillarsHTML = proj.pillars
        .map(pid => `<span class="pillar-badge">${getPillarLabel(pid)}</span>`)
        .join('');

      const linksHTML = proj.links?.length
        ? `<div class="project-links">${proj.links.map(l => `<span class="project-link">${l.label} ↗</span>`).join('')}</div>`
        : '';

      card.innerHTML = `
        <div class="project-img-wrap">
          ${imgHtml}
          <div class="project-img-overlay"></div>
          <span class="project-status-img ${proj.status}">${proj.status}</span>
          ${hasUrl ? '<div class="project-cta-bar">View project webpage→</div>' : ''}
        </div>
        <div class="project-body">
          <div class="project-top">
            <div>
              <div class="project-title">${proj.title}</div>
              <div class="project-subtitle">${proj.subtitle}</div>
            </div>
          </div>
          <div class="project-meta">
            <span class="meta-tag">${proj.period}</span>
            <span class="meta-tag funder">${proj.funder}</span>
          </div>
          <p class="project-desc">${proj.description.replace(/\s+/g, ' ').trim()}</p>
          <div class="project-pillars">${pillarsHTML}</div>
          <div class="project-impact">Impact: ${proj.impact}</div>
          ${linksHTML}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ── Publications ──────────────────────────────────────────
  function renderPublications() {
    const list = el('pub-list');
    SITE_DATA.publications.forEach(pub => {
      const item = create('div', `pub-item${pub.highlight ? ' highlight' : ''} reveal`);
      item.innerHTML = `
        <div class="pub-year">${pub.year}</div>
        <div>
          <div class="pub-title">${pub.title}</div>
          <div class="pub-authors">${pub.authors}</div>
          <div class="pub-journal">${pub.journal}</div>
        </div>
        <a href="${pub.url}" class="pub-arrow" target="_blank" rel="noopener" aria-label="Read paper">→</a>
      `;
      if (pub.url && pub.url !== '#') {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => window.open(pub.url, '_blank'));
      }
      list.appendChild(item);
    });
  }

  // ── Contact ───────────────────────────────────────────────
  const CONTACT_ICONS = {
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    scholar: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    bluesky: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.513 6.87-1.257 7.823-4.308.953 3.051 2.81 9.821 7.823 4.308 4.557-5.073 1.082-6.498-2.83-7.078-.139-.016-.277-.034-.415-.056.14.017.279.036.415.056 2.67.296 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>`,
  };

  const CONTACT_LABELS = {
    email: 'Email',
    github: 'GitHub',
    scholar: 'Google Scholar',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
    bluesky: 'Bluesky',
  };

  function renderContact() {
    const wrap = el('contact-links');
    Object.entries(SITE_DATA.social).forEach(([key, url]) => {
      const a = create('a', 'contact-link');
      a.href = url;
      if (!url.startsWith('mailto')) { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = `${CONTACT_ICONS[key] || ''}<span>${CONTACT_LABELS[key] || key}</span>`;
      wrap.appendChild(a);
    });
  }

  // ── Globe Canvas ──────────────────────────────────────────
  // Dotted Earth (Natural Earth 110m land, 2° grid) with orbiting
  // data streams and arcs linking research sites.
  function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const SIZE = 460;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const CX = SIZE / 2, CY = SIZE / 2, R = SIZE * 0.3;
    const TILT = 0.38;                       // view tilt (north pole toward viewer)
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    const TEAL = '48,200,176', AMBER = '240,160,48', INK = '190,200,228';

    // Land mask: 90 rows (90°N→90°S) × 180 cols (180°W→180°E), hex-packed bits
    const LAND = [
      '000000000000000000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '0000000000007f800ffc0000000000000000000000000',
      '000000000017ff3fffffe000000000000040000000000',
      '00000000061df0ffffff0000f8000000003c000000000',
      '000000030027c3ffffff8000200000000006000000000',
      '0000000038afc007ffff00000000030007ffc001d8000',
      '0000000e88b7b003fffe000000000c003ffffec000000',
      '80180009fc33fc00fffa00000300041dffffffeffc801',
      '00fffbfe725d8f00fff800001ff000edfffffffffffdf',
      'e0ffffffffff87c1ff8000007ffebffdfffffffffffff',
      '31fffffffffd1f80fc01e000f9ebfffffffffffffffff',
      '00fffffffff8034078000003e7fffffffffffffffffff',
      '01fdffffffe01e0038000007e7ffffffffffffffff2f0',
      '007807ffffe01e4000000007e3ffffffffffffff82200',
      '001001fffff80fe000000182c7fffffffffffffe00f00',
      '0080007fffff9ff8000003820ffffffffffffffc00e00',
      '0000007fffff9ffc000006cfffffffffffffffffc0800',
      '0000003ffffffffc000000dfffffffffffffffff40000',
      '00000017ffffff460000007fffffffffffffffff40000',
      '0000000fffffffc10000007ffffffffffffffffe40000',
      '0000000fffffff600000007f7f97cffffffffffc00000',
      '0000000ffffffe00000007f19f03cffffffffff8c0000',
      '0000000ffffffc00000003c26f7fe7ffffffffe080000',
      '0000000ffffff000000007c02dffe7fffffff84080000',
      '00000007fffff0000000018740ffe7fffffffe6300000',
      '00000003fffff000000001fe022ffffffffffc4f00000',
      '00000001ffffc000000003ff000ffffffffffc1800000',
      '00000000ffff8000000007ffef7ffffffffffe0000000',
      '000000003fc04000000007ffffffdffffffffe0000000',
      '000000005f80400000001fffffefe7fffffffc0000000',
      '000000002f80000000001fffffe7f41ffffffc0000000',
      '000000000780c00000003ffffff7ff07fffff20000000',
      '000000000786100000007ffffffbfe07fcff000000000',
      '0000000003cc020000003ffffff9fe03f07e800000000',
      '0000000000fc000000003ffffff9f801e07f020000000',
      '00000000000f000000007ffffffde001c01f020000000',
      '000000000003000000003ffffffe8001c01f820000000',
      '0000000000010f0000003fffffff3000c013008000000',
      '000000000000aff000001fffffffe000a012000000000',
      '0000000000001ff800000fffffffe0002000008000000',
      '0000000000001fff00000687ffffc000002c180000000',
      '0000000000001fff80000001ffff80000014380000000',
      '0000000000003fff80000001ffff000000187a0000000',
      '0000000000003fffe0000003fffe0000000c781800000',
      '0000000000003ffffc000001fffc00000006762b80000',
      '0000000000007fffff000000fffc000000020101e0000',
      '0000000000003fffff800000fffc00000001c001f0800',
      '0000000000001fffff000000fffc000000000880d0200',
      '0000000000001ffffe0000007ffc00000000000000000',
      '0000000000000ffffe000000fffc20000000001c40000',
      '0000000000000ffffe000000fffc2000000000fc60040',
      '00000000000003fffc000000fff8e000000001fe60000',
      '00000000000001fffc000000fff0e000000001ffe0000',
      '00000000000001fffc0000007ff0c00000000ffff8080',
      '00000000000001fff00000007ff0c00000001ffff8000',
      '00000000000001ffc00000007fe0800000001ffffc000',
      '00000000000001ffc00000003fc0000000001ffffe000',
      '00000000000003ff800000003fc0000000001ffffe000',
      '00000000000003ff800000001f80000000000ffffe000',
      '00000000000003ff000000001f00000000000f07fc000',
      '00000000000003f8000000000000000000000801f8008',
      '00000000000007fc000000000000000000000000f8004',
      '00000000000007e000000000000000000000000000006',
      '00000000000007a00000000000000000000000003000c',
      '00000000000003c000000000000000000000000010018',
      '000000000000078000000000000000000000000000030',
      '000000000000078000000000000000000000000000000',
      '0000000000000f0000000000000000080000000000000',
      '0000000000000e0000000000000000000000000000000',
      '000000000000070000000000000000000000000000000',
      '000000000000030000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '000000000000000000000000000000000000000000000',
      '000000000000002000000000000000000000000000000',
      '00000000000000c00000000000001e00020ff9ffe0000',
      '00000000000000c0000000000013fff87fffffffff000',
      '00000000000003e00000001ffffffff3fffffffffffc0',
      '00000000038400f000001ffffffffffffffffffffffe0',
      '00000ffff4ffffc000007ffffffffffffffffffffff80',
      '0001ffffffffe000001ffffffffffffffffffffffff00',
      '004fffffffffe00070fffffffffffffffffffffffff00',
      '0000fffffffffe0080ffffffffffffffffffffffffc00',
      '0007fffffffffffffffffffffffffffffffffffffff80',
      'ff803ffffffffffffffffffffffffffffffffffffffff',
      'fffffffffffffffffffffffffffffffffffffffffffff',
      'fffffffffffffffffffffffffffffffffffffffffffff'
    ];
    const isLand = (lat, lon) => {
      const r = Math.min(89, Math.max(0, Math.floor((90 - lat) / 2)));
      const c = Math.min(179, Math.max(0, Math.floor((lon + 180) / 2)));
      return (parseInt(LAND[r][c >> 2], 16) >> (3 - (c & 3))) & 1;
    };

    // Evenly spaced dots over land
    const dots = [];
    const STEP = 2.1;
    for (let lat = -88; lat <= 88; lat += STEP) {
      const dLon = STEP / Math.max(Math.cos(lat * Math.PI / 180), 0.08);
      for (let lon = -180; lon < 180; lon += dLon) {
        if (isLand(lat, lon)) dots.push([lat * Math.PI / 180, lon * Math.PI / 180]);
      }
    }

    const SITES = [
      { lat:  75, lon:   0 },   // Arctic / IceNet
      { lat: -75, lon: -100 },  // Antarctica / Amundsen Sea
      { lat:  12, lon:  -1 },   // West Africa
      { lat:  52, lon:   0 },   // UK / Turing
      { lat: -42, lon: 172 },   // New Zealand
      { lat:  33, lon:  77 },   // High Mountain Asia
      { lat: -12, lon: -76 },   // Peruvian Andes
    ].map(s => ({ phi: s.lat * Math.PI / 180, lam: s.lon * Math.PI / 180 }));

    let spin = 0;          // Earth rotation
    let t = 0;             // animation clock (frames)

    // Earth-fixed point (lat/lon, radius k·R) → screen + depth
    function earth(phi, lam, k = 1) {
      const cp = Math.cos(phi), l = lam + spin;
      const x = cp * Math.sin(l), y = Math.sin(phi), z = cp * Math.cos(l);
      return view(x * k, y * k, z * k);
    }
    // Apply view tilt; returns screen coords and depth (z>0 faces viewer)
    function view(x, y, z) {
      const y2 = y * cosT - z * sinT, z2 = y * sinT + z * cosT;
      return { sx: CX + x * R, sy: CY - y2 * R, z: z2, d: Math.hypot(x, y2) };
    }
    // Hidden if behind the globe disc
    const occluded = p => p.z < 0 && p.d < 1;

    // Orbiting data rings: radius, inclination, node, speed, packets
    const RINGS = [
      { r: 1.30, inc: 1.10, node: 0.4,  speed: 0.0030,  n: 7, col: TEAL },
      { r: 1.46, inc: -0.42, node: 2.1, speed: -0.0021, n: 5, col: AMBER },
      { r: 1.20, inc: 0.22, node: -0.9, speed: 0.0042,  n: 6, col: TEAL },
    ].map(g => ({ ...g, ci: Math.cos(g.inc), si: Math.sin(g.inc),
                  cn: Math.cos(g.node), sn: Math.sin(g.node) }));
    function ringPoint(g, th) {
      // circle in XZ plane → incline about X → rotate about Y (node)
      let x = g.r * Math.cos(th), y = 0, z = g.r * Math.sin(th);
      [y, z] = [y * g.ci - z * g.si, y * g.si + z * g.ci];
      [x, z] = [x * g.cn + z * g.sn, -x * g.sn + z * g.cn];
      return view(x, y, z);
    }

    // Draw ring paths + packets for one depth layer (back or front)
    function drawRings(front) {
      RINGS.forEach(g => {
        // faint orbit path
        ctx.strokeStyle = `rgba(${g.col},0.10)`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= 120; i++) {
          const p = ringPoint(g, (i / 120) * Math.PI * 2);
          const show = (p.z >= 0) === front && !occluded(p);
          if (show) { pen ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy); pen = true; }
          else pen = false;
        }
        ctx.stroke();
        // data packets with fading trails
        for (let k = 0; k < g.n; k++) {
          const head = t * g.speed + (k / g.n) * Math.PI * 2 + (k % 2) * 0.35;
          const dir = Math.sign(g.speed);
          for (let j = 0; j < 14; j++) {
            const p = ringPoint(g, head - dir * j * 0.022);
            if ((p.z >= 0) !== front || occluded(p)) continue;
            const a = (1 - j / 14) * (front ? 0.95 : 0.45);
            ctx.fillStyle = `rgba(${g.col},${a})`;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, j === 0 ? 1.9 : 1.3 * (1 - j / 18), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    }

    // Data arcs between research sites
    const arcs = [];
    const toVec = s => [Math.cos(s.phi) * Math.sin(s.lam), Math.sin(s.phi), Math.cos(s.phi) * Math.cos(s.lam)];
    function spawnArc() {
      const a = Math.floor(Math.random() * SITES.length);
      let b = Math.floor(Math.random() * (SITES.length - 1)); if (b >= a) b++;
      const va = toVec(SITES[a]), vb = toVec(SITES[b]);
      const om = Math.acos(Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
      arcs.push({ va, vb, om, born: t, life: 220 });
    }
    function arcPoint(arc, s) {
      const { va, vb, om } = arc;
      const so = Math.sin(om) || 1;
      const wa = Math.sin((1 - s) * om) / so, wb = Math.sin(s * om) / so;
      const v = [va[0] * wa + vb[0] * wb, va[1] * wa + vb[1] * wb, va[2] * wa + vb[2] * wb];
      const h = 1 + 0.12 * om * Math.sin(Math.PI * s);       // lift above surface
      const phi = Math.asin(Math.max(-1, Math.min(1, v[1])));
      const lam = Math.atan2(v[0], v[2]);
      return earth(phi, lam, h);
    }
    function drawArcs() {
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i], age = (t - arc.born) / arc.life;
        if (age > 1) { arcs.splice(i, 1); continue; }
        const headS = Math.min(1, age * 2), tailS = Math.max(0, age * 2 - 1);
        const N = 40;
        ctx.lineWidth = 1;
        let prev = null;
        for (let j = 0; j <= N; j++) {
          const s = tailS + (headS - tailS) * (j / N);
          const p = arcPoint(arc, s);
          if (prev && !occluded(p) && !occluded(prev)) {
            ctx.strokeStyle = `rgba(${AMBER},${0.15 + 0.55 * (j / N)})`;
            ctx.beginPath(); ctx.moveTo(prev.sx, prev.sy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
          }
          prev = p;
        }
        const hp = arcPoint(arc, headS);
        if (!occluded(hp) && headS < 1) {
          ctx.fillStyle = `rgba(${AMBER},0.95)`;
          ctx.beginPath(); ctx.arc(hp.sx, hp.sy, 2, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (t % 70 === 0 && arcs.length < 4) spawnArc();
    }

    function drawEarth() {
      // atmosphere halo
      const halo = ctx.createRadialGradient(CX, CY, R * 0.92, CX, CY, R * 1.22);
      halo.addColorStop(0, `rgba(${TEAL},0.16)`);
      halo.addColorStop(1, `rgba(${TEAL},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.22, 0, Math.PI * 2); ctx.fill();

      // ocean sphere
      const base = ctx.createRadialGradient(CX - R * 0.35, CY - R * 0.4, R * 0.05, CX, CY, R);
      base.addColorStop(0, '#1a2140');
      base.addColorStop(1, '#090b14');
      ctx.fillStyle = base;
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();

      // faint graticule
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 0.5;
      const line = pts => {
        ctx.beginPath(); let pen = false;
        pts.forEach(p => { if (p.z > 0) { pen ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy); pen = true; } else pen = false; });
        ctx.stroke();
      };
      for (let lat = -60; lat <= 60; lat += 30) {
        const pts = []; for (let lon = -180; lon <= 180; lon += 6) pts.push(earth(lat * Math.PI / 180, lon * Math.PI / 180));
        line(pts);
      }
      for (let lon = -180; lon < 180; lon += 30) {
        const pts = []; for (let lat = -90; lat <= 90; lat += 6) pts.push(earth(lat * Math.PI / 180, lon * Math.PI / 180));
        line(pts);
      }

      // land dots, brighter toward the centre of the disc
      for (let i = 0; i < dots.length; i++) {
        const p = earth(dots[i][0], dots[i][1]);
        if (p.z <= 0.02) continue;
        ctx.fillStyle = `rgba(${INK},${0.18 + 0.62 * p.z})`;
        ctx.fillRect(p.sx - 0.75, p.sy - 0.75, 1.5, 1.5);
      }

      // research sites
      SITES.forEach((s, i) => {
        const p = earth(s.phi, s.lam);
        if (p.z <= 0) return;
        const pulse = (t * 0.012 + i * 0.37) % 1;
        ctx.strokeStyle = `rgba(${AMBER},${(1 - pulse) * 0.6 * p.z})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2 + pulse * 9, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(${AMBER},${0.4 + 0.6 * p.z})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.4, 0, Math.PI * 2); ctx.fill();
      });

      // limb shading
      const limb = ctx.createRadialGradient(CX - R * 0.3, CY - R * 0.35, R * 0.2, CX, CY, R);
      limb.addColorStop(0, 'rgba(255,255,255,0.04)');
      limb.addColorStop(0.75, 'rgba(0,0,0,0)');
      limb.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = limb;
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();
    }

    function frame() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      drawRings(false);   // behind the globe
      drawEarth();
      drawArcs();
      drawRings(true);    // in front of the globe
    }

    // Static frame for reduced motion; otherwise animate only while visible
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    spin = 0.6; t = 140; spawnArc(); spawnArc(); arcs[1].born = 60;
    if (reduce) { frame(); return; }
    let running = false, visible = true;
    function loop() {
      if (!visible || document.hidden) { running = false; return; }
      spin += 0.0025; t += 1;
      frame();
      requestAnimationFrame(loop);
    }
    const start = () => { if (!running) { running = true; requestAnimationFrame(loop); } };
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    start();
  }

  // ── Navbar scroll ─────────────────────────────────────────
  function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Mobile toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAs = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
  }

  // ── Scroll reveal ─────────────────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 0);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Observe after a tiny delay to ensure DOM is painted
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  }

  // ── Init ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderTimeline();
    renderFilterBar();
    renderProjects();
    renderPublications();
    renderContact();
    initGlobe();
    initNavbar();
    initReveal();
  });

})();
