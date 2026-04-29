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

      const linksHTML = proj.links.length
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
  function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const SIZE = 420;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = SIZE + 'px';
    canvas.style.height = SIZE + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Project locations for research sites
    const SITES = [
      { lat:  75, lon:   0, label: 'Arctic / IceNet' },
      { lat: -72, lon: -70, label: 'Antarctic' },
      { lat:  12, lon:  -1, label: 'West Africa' },
      { lat:  52, lon:   0, label: 'UK / Turing' },
      { lat: -42, lon: 172, label: 'New Zealand' },
      { lat:  35, lon:  85, label: 'Central Asia' },
    ];

    const CX = SIZE / 2, CY = SIZE / 2, R = SIZE / 2 - 20;
    let angle = 0;

    function latLonToXY(lat, lon, tilt = 0.4) {
      const phi = (lat * Math.PI) / 180;
      const lambda = (lon * Math.PI) / 180;
      const x = R * Math.cos(phi) * Math.sin(lambda + angle);
      const y = R * (Math.sin(phi) * Math.cos(tilt) - Math.cos(phi) * Math.cos(lambda + angle) * Math.sin(tilt));
      const z = R * (Math.sin(phi) * Math.sin(tilt) + Math.cos(phi) * Math.cos(lambda + angle) * Math.cos(tilt));
      return { x, y, z };
    }

    function drawGlobe() {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Globe base
      const grad = ctx.createRadialGradient(CX - 40, CY - 40, R * 0.1, CX, CY, R);
      grad.addColorStop(0, '#1e2540');
      grad.addColorStop(1, '#08090d');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Atmosphere glow
      const atmo = ctx.createRadialGradient(CX, CY, R * 0.85, CX, CY, R * 1.08);
      atmo.addColorStop(0, 'rgba(48,200,176,0)');
      atmo.addColorStop(1, 'rgba(48,200,176,0.08)');
      ctx.beginPath();
      ctx.arc(CX, CY, R * 1.06, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // Lat/lon grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const { x, y, z } = latLonToXY(lat, lon);
          if (z < 0) continue;
          lon === -180 ? ctx.moveTo(CX + x, CY + y) : ctx.lineTo(CX + x, CY + y);
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const { x, y, z } = latLonToXY(lat, lon);
          if (z < 0) continue;
          lat === -90 ? ctx.moveTo(CX + x, CY + y) : ctx.lineTo(CX + x, CY + y);
        }
        ctx.stroke();
      }

      // Research sites
      SITES.forEach(site => {
        const { x, y, z } = latLonToXY(site.lat, site.lon);
        if (z < 0) return; // hidden side
        const sx = CX + x, sy = CY + y;
        const alpha = Math.min(1, (z / R + 0.2) * 2);

        // Pulse ring
        ctx.beginPath();
        ctx.arc(sx, sy, 6 + Math.sin(Date.now() * 0.003 + site.lon) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240,160,48,${alpha * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dot
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,160,48,${alpha})`;
        ctx.fill();
      });

      // Polar highlight (Arctic & Antarctic)
      const arcticPos = latLonToXY(85, 0);
      if (arcticPos.z > 0) {
        const ax = CX + arcticPos.x, ay = CY + arcticPos.y;
        const g2 = ctx.createRadialGradient(ax, ay, 0, ax, ay, 30);
        g2.addColorStop(0, 'rgba(48,200,176,0.25)');
        g2.addColorStop(1, 'rgba(48,200,176,0)');
        ctx.beginPath();
        ctx.arc(ax, ay, 30, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();
      }

      // Globe edge highlight
      const edgeGrad = ctx.createRadialGradient(CX - R * 0.5, CY - R * 0.5, 0, CX, CY, R);
      edgeGrad.addColorStop(0, 'rgba(255,255,255,0.05)');
      edgeGrad.addColorStop(0.7, 'rgba(255,255,255,0)');
      edgeGrad.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = edgeGrad;
      ctx.fill();

      // Clip to circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.restore();

      angle += 0.003;
      requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
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
