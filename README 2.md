# Nova Civic 🗺️
### Northern Virginia Civic Transparency Platform

> Real data. Zero spin. Free forever.
> Built by a Brambleton resident, for every resident.

**Live site:** [anirood2.github.io/novacivic](https://anirood2.github.io/novacivic)

---

## What Is This?

Nova Civic is an open-source civic transparency platform covering **Loudoun County** and **Fairfax County**, Virginia. It pulls real data from government APIs and open data portals and displays it in one place — no paywalls, no accounts, no spin.

Every number on this site traces back to a public record or a live government API. Every card links directly to its source. If you spot a discrepancy, open an issue.

---

## Counties Covered

| County | Districts | Population | Open Data Portal |
|---|---|---|---|
| Loudoun County, VA | 9 Supervisory Districts | 449,749 (2025) | [opendata.loudoun.gov](https://opendata.loudoun.gov) |
| Fairfax County, VA | 9 Magisterial Districts | 1,167,873 (2025) | [data.fairfaxcounty.gov](https://data.fairfaxcounty.gov) |

---

## Data Tiers — Honest Labeling

Every card on the site is labeled with one of three honest tiers:

| Badge | Meaning |
|---|---|
| 🟢 **LIVE** | Fetched from a real API on every page load. Timestamp shown. |
| 🔵 **TODAY** | Pulled from a county Socrata open data API today. |
| ⚪ **PUB [Date]** | Static. Shows the actual date the government last published this data. |

No fake DAILY or WEEKLY badges on annual data. If the Census publishes population once a year, the card says so.

---

## Live Data Sources

These APIs are called on every page load:

| Source | Data | Auth |
|---|---|---|
| [EPA AirNow](https://www.airnow.gov) | Real-time Air Quality Index | Free community key |
| [NWS api.weather.gov](https://api.weather.gov) | Current conditions + forecast | None required |
| [USGS Water Resources](https://waterdata.usgs.gov) | Stream gauge height (Goose Creek / Difficult Run) | None required |
| [Loudoun Open Data (Socrata)](https://opendata.loudoun.gov) | Active building permits | None required |
| [Fairfax Open Data (Socrata)](https://data.fairfaxcounty.gov) | Active building permits | None required |
| [WMATA Developer API](https://developer.wmata.com) | Silver Line real-time train predictions + incidents | API key required |

---

## WMATA Setup (Required for Train Predictions)

Train arrival predictions on the map require a free WMATA API key.

1. Sign up at [developer.wmata.com](https://developer.wmata.com)
2. Get your primary key from the dashboard
3. Open `js/api.js`
4. Replace this line:
   ```js
   var WMATA_KEY = 'YOUR_WMATA_PRIMARY_KEY_HERE';
   ```
   with your actual key:
   ```js
   var WMATA_KEY = 'abc123yourrealkeyhere';
   ```
5. **Do not commit your real key to a public repo.** Add `js/api.js` to `.gitignore` or use an environment variable approach if you move to a backend.

---

## File Structure

```
novacivic/
├── index.html          # Main shell — nav, map, layout. No logic.
├── data/
│   ├── loudoun.js      # All Loudoun districts, cards, sources, metadata
│   └── fairfax.js      # All Fairfax districts, cards, sources, metadata
├── css/
│   └── style.css       # All styles
└── js/
    ├── api.js          # All live API fetch functions (WMATA key lives here)
    ├── map.js          # Leaflet map init, district polygons, station markers
    ├── render.js       # All DOM rendering — cards, sources, ticker, votes
    └── app.js          # State machine — county switcher, district select, scope toggle
```

### Adding a Third County

1. Create `data/yourcounty.js` following the same structure as `loudoun.js`
2. Add a `<button>` to the county switcher in `index.html`
3. Add your WMATA stations to `js/api.js`
4. That's it. No other files change.

---

## Map

Built with [Leaflet.js](https://leafletjs.com) and [CartoDB dark tiles](https://carto.com/basemaps/). No API key required for the map itself.

- **Base layer:** `dark_matter_nolabels` — dark terrain and roads, no text
- **District polygons:** drawn on top of base layer
- **Label layer:** `dark_matter_only_labels` — city/town names rendered above polygons so labels stay readable
- **WMATA markers:** pulsing purple dots at each Silver Line station, click for live arrivals

---

## Static Data — Published Dates

These cards show the most recently published official figure and its source date:

| Card | Loudoun | Fairfax | Source |
|---|---|---|---|
| Median Home Price | $774K (Feb 2026) | $768K (Mar 2026) | Redfin / Bright MLS |
| Population | 449,749 (Mar 2026) | 1,167,873 (Mar 2026) | US Census Bureau / FRED |
| County Budget | $4.7B FY2026 (Apr 2025) | $4.9B + $3.9B FCPS (May 2025) | County budget offices |
| School Enrollment | ~82,000 (Aug 2025) | ~183,000 (Mar 2026) | LCPS / FCPS |
| School Rating | 9/10 avg, top 20% VA (2026) | SAT avg 1,183 (2025) | Public School Review / FCPS |
| Crime Index | -14% YoY (2025) | -5% YoY (2025) | LCSO / FCPD |

Static values are updated manually when new official data is published. To suggest a correction, open an issue with a link to the source.

---

## Deployment

This is a static site. No build step. No backend. No node_modules.

**GitHub Pages:**
1. Push this repo to GitHub
2. Go to Settings → Pages → Deploy from branch → `main` → `/ (root)`
3. Done. Live in ~60 seconds.

**Local development:**
```bash
# Any static server works. Examples:
python3 -m http.server 8080
npx serve .
```
Do not open `index.html` directly as a file — the JS modules require a server due to CORS.

---

## Roadmap / Vote on Features

Community votes on what gets built next are on the live site under "Vote on What We Build Next." Current top requests:

- LCPS per-school ratings map
- Silver Line ridership by station (WMATA data)
- Data center tax revenue tracker by district
- Real-time BOS vote feed from Granicus RSS
- Flood risk by parcel
- Elementary SRO status tracker (following Mar 2026 BOS vote)

---

## Contributing

Pull requests welcome. A few ground rules:

- Every data value must link to a primary source URL
- No estimated values without a clear label
- No fake cadence badges — if data updates annually, the card must say so
- Run the validation script before submitting:
  ```bash
  node -e "
  global.window = global;
  eval(require('fs').readFileSync('data/loudoun.js','utf8'));
  eval(require('fs').readFileSync('data/fairfax.js','utf8'));
  console.log('Loudoun districts:', window.LOUDOUN.districts.length);
  console.log('Fairfax districts:', window.FAIRFAX.districts.length);
  "
  ```

---

## Disclaimer

This is an **independent, community-built project**. It is not affiliated with, endorsed by, or operated by Loudoun County, Fairfax County, LCPS, FCPS, WMATA, or any government agency.

Data is sourced from public records and open APIs. While we make every effort to keep figures current and accurate, always verify critical information at the official source linked on each card.

---

## License

MIT License — free to use, fork, and build on.

---

*Built by a Brambleton resident who got tired of digging through 12 government portals to find basic facts about their own county.*
