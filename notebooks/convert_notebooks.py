#!/usr/bin/env python3
"""Convert Jekyll notebook markdown files to styled HTML pages."""

import os, re, html

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTEBOOKS_DIR = os.path.dirname(os.path.abspath(__file__))

NAV = """  <nav id="navbar">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">SH</a>
      <ul class="nav-links">
        <li><a href="../index.html#about">About</a></li>
        <li><a href="../index.html#projects">Projects</a></li>
        <li><a href="../index.html#publications">Publications</a></li>
        <li><a href="../index.html#contact" class="nav-cta">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>"""

FOOTER = """  <footer>
    <div class="container footer-inner">
      <p class="footer-name">Dr Scott Hosking</p>
      <p class="footer-sub">AI &times; Climate Resilience &middot; Alan Turing Institute</p>
      <p class="footer-copy">
        Built with plain HTML/CSS/JS.
        <a href="https://github.com/scotthosking/scotthosking.github.io" target="_blank" rel="noopener">Open source on GitHub &#x2197;</a>
      </p>
    </div>
  </footer>"""

SCRIPTS = """  <script src="../assets/js/main.js"></script>
  <script>
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
    document.querySelector('.nav-toggle')?.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  </script>"""

PAGE_CSS = """
    <style>
      body.notebook-page { background: var(--bg); }

      .nb-hero {
        padding-top: 64px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--border);
      }
      .nb-hero-inner {
        max-width: 860px;
        margin: 0 auto;
        padding: clamp(2.5rem,7vw,4.5rem) clamp(1.25rem,5vw,3rem) clamp(2rem,5vw,3rem);
      }
      .nb-title {
        font-family: var(--font-display);
        font-size: clamp(1.8rem,5vw,3rem);
        font-weight: 400;
        line-height: 1.15;
        color: var(--ink);
        margin: .5rem 0 1.25rem;
      }
      .nb-tags { display:flex; flex-wrap:wrap; gap:.35rem; margin-top:.75rem; }
      .nb-tag {
        font-family: var(--font-mono);
        font-size: .68rem;
        padding: .2em .55em;
        border-radius: 3px;
        background: rgba(255,255,255,0.05);
        color: var(--ink-3);
        letter-spacing: .05em;
      }
      .nb-tag.py { color: var(--amber); background: var(--amber-dim); }

      .nb-body {
        max-width: 860px;
        margin: 0 auto;
        padding: clamp(2.5rem,6vw,4rem) clamp(1.25rem,5vw,3rem);
      }

      .nb-body p {
        color: var(--ink-2);
        font-size: 1rem;
        line-height: 1.75;
        margin-bottom: 1.1rem;
      }
      .nb-body p a { color: var(--amber); text-decoration: underline; text-underline-offset: 3px; }
      .nb-body p a:hover { color: #f8b84a; }

      .nb-h1, .nb-h2 {
        font-family: var(--font-display);
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--ink);
        margin: 2.5rem 0 .8rem;
        line-height: 1.2;
      }
      .nb-h3 {
        font-family: var(--font-mono);
        font-size: .85rem;
        font-weight: 500;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: var(--amber);
        margin: 2rem 0 .6rem;
        padding-bottom: .4rem;
        border-bottom: 1px solid var(--border);
      }

      .nb-list {
        list-style: none;
        margin: 0 0 1.1rem 0;
        padding: 0;
      }
      .nb-list li {
        color: var(--ink-2);
        font-size: 1rem;
        line-height: 1.7;
        padding-left: 1.2rem;
        position: relative;
        margin-bottom: .3rem;
      }
      .nb-list li::before {
        content: '–';
        position: absolute;
        left: 0;
        color: var(--ink-3);
      }
      .nb-list li a { color: var(--amber); text-decoration: underline; text-underline-offset: 3px; }

      .nb-code {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-left: 3px solid var(--amber);
        border-radius: var(--radius);
        padding: 1.25rem 1.5rem;
        overflow-x: auto;
        margin: .5rem 0 1rem;
        font-family: var(--font-mono);
        font-size: .82rem;
        line-height: 1.65;
        color: var(--ink);
      }
      .nb-code code { font-family: inherit; }

      .nb-output {
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: .9rem 1.25rem;
        overflow-x: auto;
        margin: 0 0 1rem;
        font-family: var(--font-mono);
        font-size: .78rem;
        line-height: 1.6;
        color: var(--ink-3);
      }

      .nb-table-wrap {
        overflow-x: auto;
        margin: .5rem 0 1.5rem;
        border: 1px solid var(--border);
        border-radius: var(--radius);
      }
      .nb-table-wrap table {
        border-collapse: collapse;
        width: 100%;
        font-family: var(--font-mono);
        font-size: .78rem;
      }
      .nb-table-wrap th {
        background: var(--bg-card);
        color: var(--amber);
        padding: .55rem .9rem;
        text-align: left;
        border-bottom: 1px solid var(--border);
        letter-spacing: .05em;
      }
      .nb-table-wrap td {
        padding: .45rem .9rem;
        color: var(--ink-2);
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      .nb-table-wrap tr:last-child td { border-bottom: none; }
      .nb-table-wrap tr:hover td { background: var(--bg-2); }
      /* strip the scoped style blocks */
      .nb-table-wrap style { display: none; }

      .nb-img {
        max-width: 100%;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        display: block;
        margin: .5rem 0 1.5rem;
      }

      @media (max-width: 640px) {
        .nb-code, .nb-output { font-size: .74rem; padding: .9rem 1rem; }
      }
    </style>"""


def parse_frontmatter(text):
    if not text.startswith('---'):
        return {}, text
    end = text.find('\n---', 3)
    if end == -1:
        return {}, text
    fm_raw = text[3:end].strip()
    body = text[end+4:].strip()
    fm = {}
    for line in fm_raw.splitlines():
        if line.startswith('  - '):
            key = list(fm.keys())[-1]
            fm[key].append(line[4:].strip())
        elif ':' in line:
            k, _, v = line.partition(':')
            v = v.strip().strip("'\"")
            fm[k.strip()] = v if v else []
    return fm, body


def escape(text):
    return html.escape(text)


def fix_img_src(src):
    # /notebooks/images/foo/bar.png -> images/foo/bar.png
    if src.startswith('/notebooks/images/'):
        return 'images/' + src[len('/notebooks/images/'):]
    return src


def inline(text):
    # links first
    text = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)',
                  r'<a href="\2" target="_blank" rel="noopener">\1</a>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    text = re.sub(r'(?<![_a-zA-Z])_(.+?)_(?![_a-zA-Z])', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text


def convert_body(body):
    lines = body.split('\n')
    out = []
    i = 0

    def peek(n=0):
        idx = i + n
        return lines[idx] if idx < len(lines) else ''

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # ── pass-through HTML blocks (pandas tables / div outputs) ──────────
        if stripped.startswith('<div') or stripped == '<div>':
            block = []
            depth = 0
            while i < len(lines):
                l = lines[i]
                block.append(l)
                depth += l.count('<div') - l.count('</div>')
                i += 1
                if depth <= 0 and len(block) > 1:
                    break
            out.append('<div class="nb-table-wrap">' + '\n'.join(block) + '</div>')
            continue

        # ── image ────────────────────────────────────────────────────────────
        m = re.match(r'!\[([^\]]*)\]\(([^\)]+)\)', stripped)
        if m:
            alt, src = m.group(1), fix_img_src(m.group(2))
            out.append(f'<img src="{src}" alt="{escape(alt)}" class="nb-img">')
            i += 1
            continue

        # ── fenced code block ────────────────────────────────────────────────
        if stripped.startswith('```'):
            lang = stripped[3:].strip() or 'python'
            i += 1
            code_lines = []
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1
            code_text = escape('\n'.join(code_lines))
            out.append(f'<pre class="nb-code"><code class="language-{lang}">{code_text}</code></pre>')
            continue

        # ── indented output block (4 spaces, not HTML) ───────────────────────
        if line.startswith('    ') and not stripped.startswith('<'):
            output_lines = []
            while i < len(lines) and (lines[i].startswith('    ') or lines[i].strip() == ''):
                raw = lines[i]
                output_lines.append(raw[4:] if raw.startswith('    ') else '')
                i += 1
            text = escape('\n'.join(output_lines).strip())
            if text:
                out.append(f'<pre class="nb-output">{text}</pre>')
            continue

        # ── headings ─────────────────────────────────────────────────────────
        if stripped.startswith('#### '):
            out.append(f'<h4 class="nb-h3">{inline(stripped[5:])}</h4>')
            i += 1; continue
        if stripped.startswith('### '):
            out.append(f'<h3 class="nb-h3">{inline(stripped[4:])}</h3>')
            i += 1; continue
        if stripped.startswith('## '):
            out.append(f'<h2 class="nb-h2">{inline(stripped[3:])}</h2>')
            i += 1; continue
        if stripped.startswith('# '):
            out.append(f'<h2 class="nb-h1">{inline(stripped[2:])}</h2>')
            i += 1; continue

        # ── unordered list ───────────────────────────────────────────────────
        if re.match(r'^[\*\-] ', stripped):
            items = []
            while i < len(lines) and re.match(r'^[\*\-] ', lines[i].strip()):
                items.append(f'<li>{inline(lines[i].strip()[2:])}</li>')
                i += 1
            out.append('<ul class="nb-list">\n' + '\n'.join(items) + '\n</ul>')
            continue

        # ── blank line ───────────────────────────────────────────────────────
        if stripped == '':
            i += 1; continue

        # ── paragraph ────────────────────────────────────────────────────────
        para = []
        while i < len(lines):
            l = lines[i]
            s = l.strip()
            if (s == '' or s.startswith('#') or s.startswith('```')
                    or s.startswith('!') or l.startswith('    ')
                    or re.match(r'^[\*\-] ', s) or s.startswith('<div')):
                break
            para.append(s)
            i += 1
        if para:
            out.append(f'<p>{inline(" ".join(para))}</p>')

    return '\n'.join(out)


def build_page(fm, body_html, md_filename):
    title = fm.get('title', 'Notebook')
    tags = fm.get('tags', [])
    if isinstance(tags, str):
        tags = [tags]

    tag_html = ''
    for t in tags:
        cls = 'nb-tag py' if t == 'python' else 'nb-tag'
        tag_html += f'<span class="{cls}">{escape(str(t))}</span>'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{escape(title)} — Scott Hosking</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/style.css" />
{PAGE_CSS}
</head>
<body class="notebook-page">

{NAV}

  <header class="nb-hero">
    <div class="nb-hero-inner">
      <a href="../notebooks.html" style="font-family:var(--font-mono);font-size:.78rem;letter-spacing:.08em;color:var(--ink-2);text-transform:uppercase;">← All Notebooks</a>
      <h1 class="nb-title">{escape(title)}</h1>
      <div class="nb-tags">{tag_html}</div>
    </div>
  </header>

  <main>
    <div class="nb-body">
{body_html}
    </div>
  </main>

{FOOTER}

{SCRIPTS}
</body>
</html>"""


def convert_file(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()
    fm, body = parse_frontmatter(text)
    body_html = convert_body(body)
    page = build_page(fm, body_html, os.path.basename(md_path))
    out_path = md_path.replace('.md', '.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(page)
    print(f'  {os.path.basename(out_path)}')


if __name__ == '__main__':
    print('Converting notebooks...')
    for fname in sorted(os.listdir(NOTEBOOKS_DIR)):
        if fname.endswith('.md'):
            convert_file(os.path.join(NOTEBOOKS_DIR, fname))
    print('Done.')
