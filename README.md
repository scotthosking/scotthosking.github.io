# scotthosking.com

Personal website for Dr Scott Hosking — AI × Climate Resilience.  
Built as a **zero-dependency static site** that works directly on GitHub Pages.

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
  title: "Project Name",
  subtitle: "Short description",
  status: "active",           // "active" or "complete"
  period: "2024 – present",
  funder: "NERC",
  pillars: ["energy", "food"],  // from the pillars list below
  description: `Full description here.`,
  impact: "Key impact · Another impact point",
  links: [
    { label: "Website", url: "https://example.com" },
  ]
}
```

Available pillar IDs: `energy`, `food`, `water`, `ecosystem`, `infrastructure`, `national`

### Update social links
```js
social: {
  github:  "https://github.com/yourhandle",
  scholar: "https://scholar.google.com/...",
  twitter: "https://twitter.com/yourhandle",
  linkedin: "https://www.linkedin.com/in/yourhandle",
  email:   "mailto:you@example.com",
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

## 📁 File Structure

```
scotthosking.com/
├── index.html          # Main page structure (rarely needs editing)
├── site-data.js        # ✏️  ALL content lives here — edit this!
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
