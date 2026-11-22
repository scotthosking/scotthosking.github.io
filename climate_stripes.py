#!/usr/bin/env python3
"""
Refresh the climate data baked into the site.

  1. London warming stripes  ->  assets/css/style.css  (between CLIMATE-STRIPES markers)
  2. Global temperature series for the hero globe  ->  assets/js/main.js
     (between CLIMATE-GLOBAL markers)

Sources
  London: Berkeley Earth local land-surface series for the grid cell covering
          London (52.24N, 0.00W), 1850-2020, extended with Met Office Heathrow
          station annual means, offset-matched to Berkeley Earth over 1991-2020
          (r = 0.98 over the 1948-2020 overlap).
  Global: Berkeley Earth Land/Ocean annual anomalies (Rohde & Hausfather 2020).

Stripes follow the #ShowYourStripes method (Ed Hawkins): anomalies relative to
1971-2000, colour range +/-2.6 standard deviations of 1901-2000 annual means,
16-colour ColorBrewer RdBu palette.

Usage:  python3 climate_stripes.py
"""
import re
import statistics as st
import urllib.request

BE_LONDON = ('https://berkeley-earth-temperature.s3.us-west-1.amazonaws.com/'
             'Local/TAVG/Text/52.24N-0.00W-TAVG-Trend.txt')
HEATHROW = ('https://www.metoffice.gov.uk/pub/data/weather/uk/climate/'
            'stationdata/heathrowdata.txt')
BE_GLOBAL = ('https://berkeley-earth-temperature.s3.us-west-1.amazonaws.com/'
             'Global/Land_and_Ocean_summary.txt')

START = 1850
PALETTE = ['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1',
           '#c6dbef', '#deebf7', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a',
           '#ef3b2c', '#cb181d', '#a50f15', '#67000d']

CSS_FILE = 'assets/css/style.css'
JS_FILE = 'assets/js/main.js'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', 'replace')


def berkeley_local_annual(text):
    months = {}
    for line in text.splitlines():
        if line.startswith('%') or not line.strip():
            continue
        p = line.split()
        months.setdefault(int(p[0]), []).append(float(p[2]))
    return {y: sum(v) / 12 for y, v in months.items()
            if len(v) == 12 and all(x == x for x in v)}


def heathrow_annual(text):
    months = {}
    for line in text.splitlines():
        p = line.split()
        if len(p) < 4 or not (p[0].isdigit() and p[1].isdigit()):
            continue
        if 'Provisional' in line:
            continue
        try:
            tx, tn = float(p[2].rstrip('*#')), float(p[3].rstrip('*#'))
        except ValueError:
            continue
        months.setdefault(int(p[0]), []).append((tx + tn) / 2)
    return {y: sum(v) / 12 for y, v in months.items() if len(v) == 12}


def berkeley_global_annual(text):
    out = {}
    for line in text.splitlines():
        if line.startswith('%') or not line.strip():
            continue
        p = line.split()
        if p[0].isdigit() and p[1] != 'NaN':
            out[int(p[0])] = float(p[1])
    return out


def replace_block(path, tag, body, comment=('/*', '*/')):
    o, c = comment
    tail = f' {c}' if c else ''
    start, end = re.escape(f'{o} <{tag}>{tail}'), re.escape(f'{o} </{tag}>{tail}')
    src = open(path, encoding='utf-8').read()
    pat = re.compile(rf'({start}\n)(?:.*?\n)?([ \t]*{end})', re.S)
    if not pat.search(src):
        raise SystemExit(f'markers <{tag}> not found in {path}')
    src = pat.sub(lambda m: m.group(1) + body + '\n' + m.group(2), src, count=1)
    open(path, 'w', encoding='utf-8').write(src)


def main():
    be = berkeley_local_annual(fetch(BE_LONDON))
    hw = heathrow_annual(fetch(HEATHROW))
    offset = st.mean(hw[y] - be[y] for y in range(1991, 2021))
    london = {y: v for y, v in be.items() if y >= START}
    for y, v in hw.items():
        if y not in london:
            london[y] = v - offset
    years = list(range(START, max(london) + 1))
    missing = [y for y in years if y not in london]
    if missing:
        raise SystemExit(f'gap in London series: {missing}')

    base = st.mean(london[y] for y in range(1971, 2001))
    sd = st.pstdev([london[y] for y in range(1901, 2001)])
    n, w = len(years), 100 / len(years)
    stops = []
    for i, y in enumerate(years):
        x = (london[y] - base) / (2.6 * sd)               # -1 .. 1
        k = min(15, max(0, int((x + 1) / 2 * 16)))
        stops.append(f'{PALETTE[k]} {i * w:.3f}% {(i + 1) * w:.3f}%')
    css = (f'/* London {years[0]}-{years[-1]}: Berkeley Earth + Met Office Heathrow */\n'
           f'.climate-stripes {{\n  background: linear-gradient(90deg,\n    '
           + ',\n    '.join(stops) + ');\n}')
    replace_block(CSS_FILE, 'climate-stripes', css)

    g = berkeley_global_annual(fetch(BE_GLOBAL))
    pre = st.mean(g[y] for y in range(1850, 1901))
    gy = [y for y in range(START, max(g) + 1) if y in g]
    vals = ','.join(f'{g[y] - pre:.2f}' for y in gy)
    js = (f'    // Berkeley Earth global annual anomaly vs 1850-1900, {gy[0]}-{gy[-1]}\n'
          f'    const GLOBAL_T = {{ start: {gy[0]}, v: [{vals}] }};')
    replace_block(JS_FILE, 'climate-global', js, comment=('//', ''))
    print(f'London stripes {years[0]}-{years[-1]} ({n} yrs, Heathrow offset {offset:.2f}); '
          f'global {gy[0]}-{gy[-1]}')


if __name__ == '__main__':
    main()
