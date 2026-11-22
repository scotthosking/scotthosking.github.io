# scotthosking.com

Personal website for Dr Scott Hosking — AI × Climate Resilience.  
Built as a **zero-dependency static site** that works directly on GitHub Pages.

This includes:
- [My Publications](https://scotthosking.com/publications) - via [python script](https://github.com/scotthosking/scotthosking.github.io#-updating-the-publications-page) 
- [Notebooks](https://scotthosking.com/notebooks)
- [Amundsen Sea Low Index](https://scotthosking.com/asl_index)

---

## 🚀 Quick Start (GitHub Pages)

1. **Fork or clone** this repository
2. Go to **Settings → Pages** in your GitHub repo
3. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name`

For a custom domain (`scotthosking.com`):
- Add a `CNAME` file containing your domain name
- Point your DNS `A` records to GitHub Pages IPs (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

---

## ✏️ Editing Content

**All site content lives in one file: `site-data.js`**

You never need to touch the HTML or CSS to update content.  
Just edit `site-data.js` and push to GitHub.

### Update your personal info
```js
name: "Dr Scott Hosking",
tagline: "AI × Climate Resilience",
bio: `Your bio here...`,
```

### Add or edit a project
Find the `projects` array and add an entry:
```js
{
  id: "my-project",           // unique ID, no spaces
  url: "https://...",         // external link the card will open (e.g. Turing project page)
  title: "Project Name",
  subtitle: "Short description",
  status: "active",           // "active" or "complete"
  period: "2024 – present",
  funder: "NERC",
  pillars: ["energy", "food"],  // used for the filter bar
  description: `Full description here.`,
  impact: "Key impact · Another impact point",
  links: [
    { label: "Website", url: "https://example.com" },
  ]
}
```

When `url` is set the card becomes a clickable link opening in a new tab. Leave it as `""` to render the card as a non-clickable box.

Available pillar IDs: `energy`, `food`, `water`, `ecosystem`, `infrastructure`, `national`

### Update social links
```js
social: {
  github:   "https://github.com/yourhandle",
  scholar:  "https://scholar.google.com/...",
  bluesky:  "https://bsky.app/profile/yourhandle.bsky.social",
  linkedin: "https://www.linkedin.com/in/yourhandle",
  email:    "mailto:you@example.com",
},
```

### Add a publication
```js
{
  year: 2024,
  title: "Paper title here",
  authors: "Author A, Author B, Hosking et al.",
  journal: "Nature",
  url: "https://doi.org/...",
  highlight: true   // set true to visually highlight this paper
}
```

---

## 📚 Updating the Publications Page

`publications.html` is generated from a BibTeX file using `bib2html.py`.

### Basic usage

```bash
python bib2html.py references.bib
```

This reads `references.bib` and writes `publications.html` in the current directory.

### Options

```bash
# Write to a specific output file
python bib2html.py references.bib -o publications.html

# Shorten author lists earlier (default is 8 before "et al.")
python bib2html.py references.bib --max-authors 6
```

### How entries are mapped

| BibTeX type | Section |
|---|---|
| `@article`, `@inproceedings`, `@incollection` | Peer-Reviewed Publications |
| `@unpublished` | Preprints & Conference Papers |
| `@techreport` | Reports |
| `@phdthesis` | PhD Thesis |
| `@misc` | Data & Software |

Only standard BibTeX entry types are used. Preprints and workshop papers are `@unpublished`, with the venue in the required `note` field (e.g. `note = {arXiv preprint arXiv:2610.12658}`, plus `eprint`/`archivePrefix` for arXiv). Datasets and software are `@misc`, with the source in `howpublished` (e.g. `howpublished = {Zenodo, software}`). Escape `&` as `\&` in field values.

Entries within each section are sorted newest-first by `year`.

Papers published in Nature, Science, and their family journals are automatically highlighted in amber.

### Notes

- No external dependencies — pure Python 3, no `pip install` needed.
- DOI fields are normalised automatically (bare DOIs and full `https://doi.org/` URLs both work).
- Links use `doi`, falling back to `url`, then `pdf`.
- Long author lists are cut to 8 names + "et al.", but "Hosking" is always kept visible (shown as `…, J. S. Hosking et al.`).
- Add `!` to a surname (e.g. `Wolff!, Eric`) to mark an incomplete author list; "et al." is appended after that author.
- LaTeX accents (`{\'e}`, `{\o}`) are converted to Unicode, and `--` renders as a single hyphen.
- `sh_publications.bib` is the source of truth: edit it and regenerate, rather than editing `publications.html` by hand.
- Author names are abbreviated to initials regardless of whether the BibTeX uses `Last, First` or `First Last` format.
- Unrecognised entry types are skipped with a warning printed to the terminal.

---

## 📁 File Structure

```
scotthosking.com/
├── index.html          # Main page structure (rarely needs editing)
├── publications.html   # Generated by bib2html.py — do not edit by hand
├── site-data.js        # ✏️  ALL content lives here — edit this!
├── bib2html.py         # Script: converts a .bib file → publications.html
├── assets/
│   ├── css/
│   │   └── style.css   # Styles (edit for design changes)
│   └── js/
│       └── main.js     # Rendering logic (rarely needs editing)
└── README.md           # This file
```

---

## 🎨 Design Changes

### Colours
Edit the CSS variables at the top of `assets/css/style.css`:

```css
:root {
  --amber:  #f0a030;   /* Primary accent colour */
  --teal:   #30c8b0;   /* Secondary accent colour */
  --bg:     #08090d;   /* Background */
  --ink:    #e8eaf0;   /* Main text */
}
```

### Fonts
The site uses [Google Fonts](https://fonts.google.com). To change:
1. Update the `<link>` in `index.html`
2. Update `--font-display`, `--font-body`, `--font-mono` in the CSS

### Globe animation
The rotating globe in the hero is drawn on a `<canvas>` element by the `initGlobe()` function in `assets/js/main.js`. Things you can adjust there:

- **Rotation speed** — `angle += 0.003` (increase to spin faster)
- **Research site dots** — the `SITES` array (lat/lon coordinates)
- **Colours** — orange dots `rgba(240,160,48,...)`, teal glow `rgba(48,200,176,...)`
- **Globe size** — `const SIZE = 420`
- **Grid density** — the lat/lon loop steps (currently `30` degrees)

---

## 🛠️ Local Development

No build step needed. Just open `index.html` in a browser, or run a local server:

```bash
# Python (any system)
python -m http.server 8000

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8000`

---

## 📊 Stats / Numbers

Update the hero stats by editing the HTML in `index.html` directly (search for `hero-stats`):

```html
<div class="stat">
  <span class="stat-num">20+</span>
  <span class="stat-label">Researchers</span>
</div>
```

---

## 📄 Licence

MIT — free to fork and adapt.

## Climate data (warming stripes and globe)

The thin bar at the top of every page shows the warming stripes for London, and
the hero globe's land dots warm through the global temperature record from 1850
to today, with regional heat extremes that become more frequent as the world warms. Both
are baked into the site by `climate_stripes.py`. Run it once a year to add the
latest year, then regenerate the publications page so it picks up the same CSS:

```bash
python3 climate_stripes.py
python3 bib2html.py sh_publications.bib -o publications.html
```

- **London stripes:** the Berkeley Earth local series for the grid cell covering London
  (1850–2020), extended with Met Office Heathrow annual means offset-matched over 1991–2020.
  They follow the #ShowYourStripes method: anomalies relative to 1971–2000, a colour range of
  ±2.6σ (1901–2000), and the 16-colour RdBu palette. The script writes these between the
  `<climate-stripes>` markers in `assets/css/style.css`.
- **Globe:** Berkeley Earth Land/Ocean global annual anomalies relative to 1850–1900, written
  between the `<climate-global>` markers in `assets/js/main.js`. Each dot's warming scales
  that series by an illustrative pattern: land warms faster than the global mean and the
  Arctic fastest of all. It is not a gridded dataset.
  Over this, a smooth, slowly drifting field of continental-scale warm and cool patches
  makes the dots pulse like natural climate variability. It is illustrative, not observed.
  White dots over the Arctic Ocean show sea ice. Its edge retreats northwards as the
  global series warms and wavers with the variability field. This is also illustrative.
