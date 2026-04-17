#!/usr/bin/env node
/**
 * generate-projects.js
 * Run: node generate-projects.js
 * Reads site-data.js and generates projects/{id}.html for every project.
 */

const fs = require('fs');
const path = require('path');

// Load SITE_DATA
const siteDataSrc = fs.readFileSync(path.join(__dirname, 'site-data.js'), 'utf8');
const SITE_DATA = eval('(function(){ ' + siteDataSrc + '; return SITE_DATA; })()');

const projectsDir = path.join(__dirname, 'projects');
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir);

function getPillarLabel(id) {
  const p = SITE_DATA.pillars.find(x => x.id === id);
  return p ? `${p.icon} ${p.label}` : id;
}

function generatePage(proj) {
  const pillarBadges = proj.pillars
    .map(pid => `<span class="pillar-badge">${getPillarLabel(pid)}</span>`)
    .join('');

  const achievementsHTML = (proj.details?.achievements || [])
    .map(a => `<li>${a}</li>`)
    .join('');

  const linksHTML = proj.links.length
    ? proj.links.map(l => `<a href="${l.url}" class="btn btn-ghost" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')
    : '';

  const imgHTML = proj.image
    ? `<img src="${proj.image}" alt="${proj.imageAlt || proj.title}" class="hero-img" />`
    : `<div class="hero-img-placeholder">${SITE_DATA.pillars.find(p => p.id === proj.pillars[0])?.icon || '🌍'}</div>`;

  const otherProjects = SITE_DATA.projects
    .filter(p => p.id !== proj.id)
    .slice(0, 3)
    .map(p => `
      <a href="${p.id}.html" class="related-card">
        <div class="related-img-wrap">
          ${p.image
            ? `<img src="${p.image}" alt="${p.imageAlt || p.title}" />`
            : `<div class="related-img-placeholder">${SITE_DATA.pillars.find(x => x.id === p.pillars[0])?.icon || '🌍'}</div>`}
          <div class="related-overlay"></div>
        </div>
        <div class="related-body">
          <div class="related-title">${p.title}</div>
          <div class="related-sub">${p.subtitle}</div>
        </div>
      </a>
    `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${proj.title} — Scott Hosking</title>
  <meta name="description" content="${proj.subtitle}. ${proj.description.replace(/\s+/g,' ').trim().slice(0,160)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/project-page.css" />
</head>
<body class="project-page">

  <nav id="navbar">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">SH</a>
      <ul class="nav-links">
        <li><a href="../index.html#about">About</a></li>
        <li><a href="../index.html#resilience">Resilience</a></li>
        <li><a href="../index.html#projects" class="active">Projects</a></li>
        <li><a href="../index.html#publications">Publications</a></li>
        <li><a href="../index.html#contact" class="nav-cta">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero -->
  <div class="proj-hero">
    <div class="proj-hero-img-wrap">
      ${imgHTML}
      <div class="proj-hero-overlay"></div>
    </div>
    <div class="proj-hero-content container">
      <a href="../index.html#projects" class="back-link">← All Projects</a>
      <div class="proj-hero-meta">
        <span class="project-status-img ${proj.status}">${proj.status}</span>
        <span class="hero-period">${proj.period}</span>
      </div>
      <h1 class="proj-hero-title">${proj.title}</h1>
      <p class="proj-hero-subtitle">${proj.subtitle}</p>
      <div class="proj-pillars-hero">${pillarBadges}</div>
    </div>
  </div>

  <!-- Main content -->
  <main class="proj-main container">

    <div class="proj-grid">

      <!-- Left: content -->
      <article class="proj-content">

        <section class="proj-section">
          <h2>Overview</h2>
          <p>${proj.details?.overview || proj.description}</p>
        </section>

        <section class="proj-section">
          <h2>Background</h2>
          <p>${proj.details?.background || ''}</p>
        </section>

        <section class="proj-section">
          <h2>Our Approach</h2>
          <p>${proj.details?.approach || ''}</p>
        </section>

        <section class="proj-section resilience-section">
          <div class="resilience-tag">
            <span class="section-label">National Resilience</span>
          </div>
          <h2>Why This Matters for National Resilience</h2>
          <p>${proj.details?.nationalResilience || ''}</p>
        </section>

        ${linksHTML ? `<div class="proj-links">${linksHTML}</div>` : ''}

      </article>

      <!-- Right: sidebar -->
      <aside class="proj-sidebar">

        <div class="sidebar-card">
          <div class="sidebar-label">Funder</div>
          <div class="sidebar-value">${proj.funder}</div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-label">Period</div>
          <div class="sidebar-value">${proj.period}</div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-label">Resilience Themes</div>
          <div class="sidebar-pillars">${pillarBadges}</div>
        </div>

        <div class="sidebar-card achievements-card">
          <div class="sidebar-label">Key Achievements</div>
          <ul class="achievements-list">
            ${achievementsHTML}
          </ul>
        </div>

        <div class="sidebar-card impact-card">
          <div class="sidebar-label">Impact</div>
          <div class="impact-text">${proj.impact}</div>
        </div>

      </aside>
    </div>

  </main>

  <!-- Related projects -->
  <section class="related-section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">More Projects</span>
        <h2>Related Research</h2>
      </div>
      <div class="related-grid">
        ${otherProjects}
      </div>
      <div style="text-align:center; margin-top:2rem;">
        <a href="../index.html#projects" class="btn btn-ghost">← Back to All Projects</a>
      </div>
    </div>
  </section>

  <footer>
    <div class="container footer-inner">
      <p class="footer-name">Dr Scott Hosking</p>
      <p class="footer-sub">AI × Climate Resilience · Alan Turing Institute · British Antarctic Survey</p>
      <p class="footer-copy">
        <a href="https://github.com/scotthosking/scotthosking.github.io" target="_blank" rel="noopener">Open source on GitHub ↗</a>
      </p>
    </div>
  </footer>

  <script>
    // Navbar scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  </script>

</body>
</html>`;
}

SITE_DATA.projects.forEach(proj => {
  const html = generatePage(proj);
  const outPath = path.join(projectsDir, `${proj.id}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Generated: projects/${proj.id}.html`);
});

console.log(`\nDone! Generated ${SITE_DATA.projects.length} project pages.`);
console.log('Remember to re-run this script whenever you update projects in site-data.js');
