# Sptix — AI-native ATS Landing Page

A fully responsive, dark-themed marketing landing page for Sptix ATS
("The AI-native ATS built for how Indian teams actually hire").

Static site — no build step. Plain HTML + CSS + vanilla JS.

## Structure

- `index.html` — all sections: announcement bar, nav, hero, trust strip,
  problem stats, workflow preview, live dashboard mockup, module cards,
  AI Agent, AI features grid, Sptix-vs-generic comparison, comparison
  table, industries hub diagram, product suite, data policy, FAQ, CTA, footer
- `css/styles.css` — design tokens + responsive system
- `js/main.js` — mobile hamburger menu + single-open FAQ accordion

## Responsive breakpoints

| Width | Layout |
|---|---|
| ≥1081px | Full desktop (3-col grids, dashboard sidebar, hub orbit) |
| ≤1080px | 2-col grids, narrower dashboard sidebar |
| ≤880px | Hamburger nav, stacked panels, hub reflows vertically |
| ≤640px | Single-column everything, fluid type, 2-col award badges |
| ≤430px | Full-width CTAs, tighter gutters |
| ≤360px | Award badges single column, table stays scrollable |

## Run locally

```bash
python3 -m http.server 8399
# open http://localhost:8399
```

## Deploy

Deployed on Vercel as a static site (`vercel.json` sets clean URLs).
