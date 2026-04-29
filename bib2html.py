#!/usr/bin/env python3
"""
bib2html.py — Convert a BibTeX file into publications.html
              matching the scotthosking.com site style.

Usage:
    python bib2html.py references.bib
    python bib2html.py references.bib -o publications.html
    python bib2html.py references.bib --max-authors 8

No external dependencies required — pure Python 3.
"""

import argparse
import re
import sys
from html import escape
from pathlib import Path


# ── Configuration ──────────────────────────────────────────────────────────

MAX_AUTHORS = 8  # overridden by --max-authors

# Maps entry types (lowercase) to section labels, in display order.
SECTIONS = [
    ("Peer-Reviewed Publications",
     {"article", "inproceedings", "incollection", "conference", "book"}),
    ("Preprints & Conference Papers",
     {"preprint", "unpublished"}),
    ("Reports",
     {"techreport", "report"}),
    ("PhD Thesis",
     {"phdthesis", "mastersthesis"}),
    ("Datasets",
     {"datasets", "dataset", "software", "misc"}),
]

# Journal names (lowercase substrings) that get amber highlighting.
HIGHLIGHT_JOURNALS = {
    "nature communications", "nature climate change", "nature geoscience",
    "nature methods", "nature machine intelligence",
    "science advances",
}
# Exact-match journals that also get highlighted.
HIGHLIGHT_JOURNALS_EXACT = {"nature", "science"}


# ── BibTeX parser (no dependencies) ───────────────────────────────────────

def _extract_value(text, pos):
    """Read a brace-balanced, quoted, or bare value starting at text[pos].
    Returns (value, new_pos)."""
    while pos < len(text) and text[pos] in ' \t\n\r':
        pos += 1
    if pos >= len(text):
        return '', pos

    if text[pos] == '{':
        depth, pos = 1, pos + 1
        start = pos
        while pos < len(text) and depth:
            if text[pos] == '{':
                depth += 1
            elif text[pos] == '}':
                depth -= 1
            pos += 1
        return text[start:pos - 1], pos

    if text[pos] == '"':
        pos += 1
        start = pos
        while pos < len(text) and text[pos] != '"':
            pos += 1
        return text[start:pos], pos + 1

    # Bare value (year, month, macros)
    start = pos
    while pos < len(text) and text[pos] not in ',}\n\r':
        pos += 1
    return text[start:pos].strip(), pos


def _parse_fields(body):
    """Parse comma-separated key = value fields from an entry body."""
    fields = {}
    pos = 0
    while pos < len(body):
        # Skip whitespace / commas
        while pos < len(body) and body[pos] in ' \t\n\r,':
            pos += 1
        if pos >= len(body):
            break
        eq = body.find('=', pos)
        if eq == -1:
            break
        name = body[pos:eq].strip().lower()
        pos = eq + 1
        value, pos = _extract_value(body, pos)
        if name:
            fields[name] = value.strip()
    return fields


def parse_bibtex(content):
    """Return a list of dicts, one per BibTeX entry."""
    entries = []
    pos = 0
    while pos < len(content):
        at = content.find('@', pos)
        if at == -1:
            break
        brace = content.find('{', at)
        if brace == -1:
            break
        etype = content[at + 1:brace].strip().lower()
        # Skip non-entry @ blocks
        if etype in ('comment', 'string', 'preamble'):
            pos = brace + 1
            continue
        # Walk to the matching closing brace
        depth, j = 1, brace + 1
        while j < len(content) and depth:
            if content[j] == '{':
                depth += 1
            elif content[j] == '}':
                depth -= 1
            j += 1
        body = content[brace + 1:j - 1]
        comma = body.find(',')
        if comma == -1:
            pos = j
            continue
        key = body[:comma].strip()
        fields = _parse_fields(body[comma + 1:])
        fields['ENTRYTYPE'] = etype
        fields['ID'] = key
        entries.append(fields)
        pos = j
    return entries


# ── Text helpers ───────────────────────────────────────────────────────────

def clean_braces(text):
    """Strip LaTeX grouping braces while keeping their contents."""
    if not text:
        return ''
    prev = None
    while prev != text:
        prev = text
        text = re.sub(r'\{([^{}]*)\}', r'\1', text)
    return text.strip()


def format_authors(author_str):
    """Abbreviate and optionally truncate a BibTeX author string."""
    if not author_str:
        return ''
    raw = [a.strip() for a in re.split(r'\s+and\s+', author_str, flags=re.IGNORECASE)]
    out = []
    for name in raw:
        name = clean_braces(name)
        if ',' in name:
            # "Last, First Middle" → "F. M. Last"
            last, _, rest = name.partition(',')
            initials = ' '.join(p[0] + '.' for p in rest.split() if p)
            out.append(f"{initials} {last.strip()}".strip() if initials else last.strip())
        else:
            parts = name.split()
            if len(parts) >= 2:
                initials = ' '.join(p[0] + '.' for p in parts[:-1])
                out.append(f"{initials} {parts[-1]}")
            else:
                out.append(name)
    if len(out) > MAX_AUTHORS:
        return ', '.join(out[:MAX_AUTHORS]) + ' et al.'
    return ', '.join(out)


def get_url(entry):
    """Return the canonical URL for an entry (DOI preferred)."""
    doi = entry.get('doi', '').strip()
    url = entry.get('url', '').strip()
    if doi:
        doi = re.sub(r'^https?://(?:dx\.)?doi\.org/', '', doi)
        doi = re.sub(r'^https?://', '', doi)
        return f"https://doi.org/{doi}"
    return url


def get_year(entry):
    try:
        return int(entry.get('year', '0').strip())
    except ValueError:
        return 0


def get_venue(entry):
    for field in ('journal', 'booktitle', 'publisher', 'school', 'institution'):
        v = entry.get(field, '').strip()
        if v:
            return clean_braces(v)
    return ''


def is_highlight(entry):
    venue = get_venue(entry).lower()
    if venue in HIGHLIGHT_JOURNALS_EXACT:
        return True
    return any(h in venue for h in HIGHLIGHT_JOURNALS)


# ── HTML rendering ─────────────────────────────────────────────────────────

def render_item(entry):
    title   = escape(clean_braces(entry.get('title', 'Untitled')))
    authors = escape(format_authors(entry.get('author', '')))
    venue   = escape(get_venue(entry))
    year    = escape(entry.get('year', '').strip())
    url     = get_url(entry)
    hi      = is_highlight(entry)

    css = 'pub-item highlight reveal' if hi else 'pub-item reveal'
    if url:
        safe_url = url.replace("'", "\\'")
        attrs = f' onclick="window.open(\'{safe_url}\',\'_blank\')" style="cursor:pointer"'
        arrow = (f'<a href="{escape(url)}" class="pub-arrow" '
                 f'target="_blank" rel="noopener" aria-label="Read paper">→</a>')
    else:
        attrs = ''
        arrow = '<span class="pub-arrow"></span>'

    return (
        f'        <div class="{css}"{attrs}>\n'
        f'          <div class="pub-year">{year}</div>\n'
        f'          <div>\n'
        f'            <div class="pub-title">{title}</div>\n'
        f'            <div class="pub-authors">{authors}</div>\n'
        f'            <div class="pub-journal">{venue}</div>\n'
        f'          </div>\n'
        f'          {arrow}\n'
        f'        </div>'
    )


def render_section(label, entries):
    if not entries:
        return ''
    entries = sorted(entries, key=get_year, reverse=True)
    items = '\n'.join(render_item(e) for e in entries)
    return (
        f'  <section class="pub-section">\n'
        f'    <div class="container">\n'
        f'      <div class="pub-section-title">{escape(label)}</div>\n'
        f'      <div class="pub-list">\n'
        f'{items}\n'
        f'      </div>\n'
        f'    </div>\n'
        f'  </section>\n'
    )


# ── Page template ──────────────────────────────────────────────────────────
# Uses a sentinel so CSS/JS braces don't need escaping.

PAGE_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Publications — Dr Scott Hosking</title>
  <meta name="description" content="Full list of publications by Dr Scott Hosking — AI, Climate Science, and Environmental Forecasting." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <style>
    .pub-page-hero {
      padding: calc(64px + 4rem) 0 3rem;
      background: var(--bg-2);
      border-bottom: 1px solid var(--border);
    }
    .pub-page-hero .section-label { margin-bottom: .5rem; }
    .pub-page-hero h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.15;
      color: var(--ink);
      margin-bottom: 1rem;
    }
    .pub-page-hero p { color: var(--ink-2); max-width: 52ch; }
    .pub-section { padding: 3.5rem 0 1rem; }
    .pub-section + .pub-section { padding-top: 2.5rem; }
    .pub-section-title {
      font-family: var(--font-mono);
      font-size: .75rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--teal);
      margin-bottom: 1.25rem;
    }
    .pub-back {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      font-size: .85rem;
      color: var(--ink-3);
      transition: color .2s;
    }
    .pub-back:hover { color: var(--amber); }
  </style>
</head>
<body>

  <nav id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">SH</a>
      <ul class="nav-links">
        <li><a href="index.html#about">About</a></li>
        <li><a href="index.html#projects">Projects</a></li>
        <li><a href="index.html#publications">Selected Publications</a></li>
        <li><a href="index.html#contact" class="nav-cta">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="pub-page-hero">
    <div class="container">
      <a href="index.html" class="pub-back">← Back to scotthosking.com</a>
      <div style="height:1.5rem"></div>
      <span class="section-label">Research Output</span>
      <h1>Publications</h1>
      <p>Peer-reviewed papers, preprints, reports, and datasets spanning AI, climate science, and environmental forecasting.</p>
    </div>
  </div>

%%SECTIONS%%
  <footer>
    <div class="container footer-inner">
      <p class="footer-name">Dr Scott Hosking</p>
      <p class="footer-sub">AI × Climate Resilience · Alan Turing Institute · British Antarctic Survey</p>
      <p class="footer-copy">Built with plain HTML/CSS/JS.
        <a href="https://github.com/scotthosking/scotthosking.github.io" target="_blank" rel="noopener">Open source on GitHub ↗</a>
      </p>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
  <script>
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => obs.observe(el)), 100);
  </script>
</body>
</html>
'''


# ── Main ───────────────────────────────────────────────────────────────────

def main():
    global MAX_AUTHORS

    ap = argparse.ArgumentParser(
        description='Convert a BibTeX file into publications.html'
    )
    ap.add_argument('bib', help='Path to the .bib file')
    ap.add_argument('-o', '--output', default='publications.html',
                    help='Output HTML file (default: publications.html)')
    ap.add_argument('--max-authors', type=int, default=8,
                    help='Authors to show before "et al." (default: 8)')
    args = ap.parse_args()

    MAX_AUTHORS = args.max_authors

    bib_path = Path(args.bib)
    if not bib_path.exists():
        sys.exit(f'ERROR: file not found: {bib_path}')

    content = bib_path.read_text(encoding='utf-8', errors='replace')
    entries = parse_bibtex(content)
    print(f'Parsed {len(entries)} entries from {bib_path.name}')

    # Group entries into sections
    grouped = {label: [] for label, _ in SECTIONS}
    ungrouped_types = set()

    for entry in entries:
        etype = entry.get('ENTRYTYPE', '')
        placed = False
        for label, types in SECTIONS:
            if etype in types:
                grouped[label].append(entry)
                placed = True
                break
        if not placed:
            ungrouped_types.add(etype)

    if ungrouped_types:
        print(f'WARNING: unrecognised entry types (skipped): {ungrouped_types}')

    for label, _ in SECTIONS:
        print(f'  {label}: {len(grouped[label])}')

    sections_html = ''.join(
        render_section(label, grouped[label]) for label, _ in SECTIONS
    )

    html = PAGE_TEMPLATE.replace('%%SECTIONS%%', sections_html)

    out_path = Path(args.output)
    out_path.write_text(html, encoding='utf-8')
    print(f'\nWritten → {out_path}')


if __name__ == '__main__':
    main()
