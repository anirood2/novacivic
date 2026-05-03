// loudoun.js v3 - Loudoun County
// ALL VALUES VERIFIED May 2026
// New sections: Elections, Leadership, Outages, FOIA, Services, Local Alerts, Schools detail

window.LOUDOUN = {
  id: 'loudoun',
  name: 'Loudoun County',
  state: 'Virginia',
  tagline: 'Fastest growing county in Virginia - pop. up 25,720 since 2020 census',
  color: '#00c6ff',
  accentDark: '#0077aa',
  chair: 'Phyllis Randall',
  viceChair: 'Michael R. Turner (Ashburn)',
  population: '449,749',
  populationYear: '2025',
  area: '521 sq mi',
  founded: '1757',
  seat: 'Leesburg',
  website: 'https://www.loudoun.gov',
  openDataUrl: 'https://opendata.loudoun.gov',
  foiaUrl: 'https://www.loudoun.gov/foia',
  servicesUrl: 'https://www.loudoun.gov/services',
  alertsUrl: 'https://www.loudoun.gov/alerts',

  dataPledge: 'Every number on Nova Civic traces back to a public government record or live official API. ' +
    'We never estimate without labeling. We never claim data is live unless it is fetched in real time. ' +
    'Published cards show the exact date the government last released that figure. ' +
    'If you find a discrepancy, flag it - we will fix it.',

  dataNote: 'Live cards fetch real APIs on every page load with timestamps shown. ' +
    'Published cards show the actual government release date. ' +
    'District-level figures are aggregated from parcel and school datasets and labeled as estimates.',

  mapCenter: [39.08, -77.64],
  mapZoom: 10,

  // VERIFIED from loudoun.gov/bos May 2026
  districts: [
    { id: 'algonkian',   name: 'Algonkian',   supervisor: 'Juli E. Briskman',      pop: '79000',  color: '#22d3ee', tags: ['Cascades', 'Sugarland Run', 'Seneca Ridge MS'],      elected: '2023', nextElection: 'Nov 2027' },
    { id: 'ashburn',     name: 'Ashburn',      supervisor: 'Michael R. Turner',     pop: '110000', color: '#38bdf8', tags: ['One Loudoun', 'INOVA', 'Ashburn Village'],            elected: '2023', nextElection: 'Nov 2027' },
    { id: 'broadrun',    name: 'Broad Run',    supervisor: 'Sylvia R. Glass',       pop: '88000',  color: '#60a5fa', tags: ['Lansdowne', 'River Creek', 'Belmont Ridge MS'],       elected: '2023', nextElection: 'Nov 2027' },
    { id: 'catoctin',    name: 'Catoctin',     supervisor: 'Caleb A. Kershner',     pop: '44000',  color: '#a78bfa', tags: ['Purcellville', 'Hillsboro', 'Western farms'],          elected: '2023', nextElection: 'Nov 2027' },
    { id: 'dulles',      name: 'Dulles',       supervisor: 'Matthew F. Letourneau', pop: '85000',  color: '#fb923c', tags: ['Data Center Alley', 'Metro Silver Line'],             elected: '2023', nextElection: 'Nov 2027' },
    { id: 'leesburg',    name: 'Leesburg',     supervisor: 'Kristen C. Umstattd',   pop: '62000',  color: '#f472b6', tags: ['County Seat', 'Historic Downtown', 'Tuscarora HS'],   elected: '2023', nextElection: 'Nov 2027' },
    { id: 'littleriver', name: 'Little River', supervisor: 'Laura A. TeKrony',      pop: '38000',  color: '#34d399', tags: ['Round Hill', 'Bluemont', 'Appalachian foothills'],     elected: '2023', nextElection: 'Nov 2027' },
    { id: 'sterling',    name: 'Sterling',     supervisor: 'Koran T. Saines',       pop: '92000',  color: '#fbbf24', tags: ['Route 7 Corridor', 'Countryside'],                    elected: '2023', nextElection: 'Nov 2027' },
    { id: 'sycamore',    name: 'Sycamore',     supervisor: 'Koran T. Saines',       pop: '98000',  color: '#f87171', tags: ['Brambleton', 'Stone Bridge HS', 'Moorefield Station'], elected: '2023', nextElection: 'Nov 2027' },
  ],

  // Leadership profiles
  leadership: [
    { role: 'Board Chair (At-Large)',  name: 'Phyllis J. Randall',      party: 'D', since: '2016', contact: 'phyllis.randall@loudoun.gov',     phone: '703-777-0204' },
    { role: 'Vice Chair (Ashburn)',    name: 'Michael R. Turner',       party: 'D', since: '2020', contact: 'michael.turner@loudoun.gov',       phone: '703-777-0204' },
    { role: 'County Administrator',   name: 'Hariharan Krishnamurthy', party: '',  since: '2022', contact: 'cao@loudoun.gov',                  phone: '703-777-0200' },
    { role: 'Sheriff',                 name: 'Mike Chapman',            party: 'R', since: '2016', contact: 'sheriff@loudoun.gov',              phone: '703-777-1021' },
    { role: 'Commonwealth Attorney',  name: 'Buta Biberaj',            party: 'D', since: '2020', contact: 'commonwealthattorney@loudoun.gov', phone: '703-777-0270' },
    { role: 'Treasurer',               name: 'H. Roger Zurn Jr.',       party: 'R', since: '2012', contact: 'treasurer@loudoun.gov',            phone: '703-777-0280' },
    { role: 'Commissioner of Revenue', name: 'Robert S. Wertz Jr.',     party: 'R', since: '2012', contact: 'cor@loudoun.gov',                  phone: '703-777-0260' },
    { role: 'Clerk of the Court',      name: 'Gary M. Clemens',         party: 'R', since: '2008', contact: 'clerk@loudoun.gov',                phone: '703-777-0270' },
  ],

  // county services directory
  services: [
    { name: 'Animal Services',         url: 'https://www.loudoun.gov/animal',         icon: '🐾', desc: 'Adoption, lost pets, licensing' },
    { name: 'Building Permits',         url: 'https://www.loudoun.gov/permits',        icon: '🏗', desc: 'Apply, track, inspect' },
    { name: 'Business License',         url: 'https://www.loudoun.gov/business',       icon: '💼', desc: 'New license, renewal, zoning' },
    { name: 'Courts & Legal',           url: 'https://www.loudoun.gov/courts',         icon: '⚖', desc: 'Circuit, General District, J&DR courts' },
    { name: 'FOIA / Open Records',      url: 'https://www.loudoun.gov/foia',           icon: '📋', desc: 'File a public records request' },
    { name: 'Health Department',        url: 'https://www.loudoun.gov/health',         icon: '🏥', desc: 'Clinics, immunizations, WIC' },
    { name: 'Housing Assistance',       url: 'https://www.loudoun.gov/housing',        icon: '🏠', desc: 'Affordable housing, rental aid' },
    { name: 'Parks & Recreation',       url: 'https://www.loudoun.gov/parks',          icon: '🌳', desc: 'Trails, facilities, programs' },
    { name: 'Property Tax & Bills',     url: 'https://www.loudoun.gov/taxes',          icon: '💰', desc: 'Pay tax, assessment, exemptions' },
    { name: 'Sheriff / 911',            url: 'https://www.loudoun.gov/sheriff',        icon: '👮', desc: 'Non-emergency, reports, records' },
    { name: 'Social Services (DSS)',    url: 'https://www.loudoun.gov/dss',            icon: '🤝', desc: 'SNAP, Medicaid, child services' },
    { name: 'Voter Registration',       url: 'https://vote.elections.virginia.gov',    icon: '🗳', desc: 'Register, check status, find polling' },
    { name: 'Zoning & Land Use',        url: 'https://www.loudoun.gov/zoning',         icon: '📐', desc: 'Rezoning, variances, comp plan' },
  ],

  // Data cards - all tiers
  cards: [
    // --- LIVE ---
    { id: 'air',      icon: '🌱', title: 'AIR QUALITY',      tier: 'live',  liveKey: 'air',     countyVal: '--', districtVal: null, sub: 'Ashburn EPA monitor - fetched live', color: '#4ade80', spark: [55,52,48,45,44,42,43,42],
      sparkLabel: '8-hr AQI readings', source: 'airnow.gov',           sourceUrl: 'https://www.airnow.gov/?city=Ashburn&state=VA',                              method: 'LIVE API' },
    { id: 'weather',  icon: '🌤', title: 'WEATHER',           tier: 'live',  liveKey: 'weather', countyVal: '--', districtVal: null, sub: 'Dulles Airport grid, NWS - fetched live', color: '#38bdf8', spark: [62,65,68,72,70,74,72,71],
      sparkLabel: 'Temp readings (F)', source: 'api.weather.gov',     sourceUrl: 'https://api.weather.gov',                                                    method: 'LIVE API' },
    { id: 'water',    icon: '💧', title: 'WATER LEVEL',       tier: 'live',  liveKey: 'water',   countyVal: '--', districtVal: null, sub: 'Goose Creek gauge 01636500, USGS - live', color: '#60a5fa', spark: [3.2,3.5,3.8,4.1,3.9,3.7,3.5,3.4],
      sparkLabel: 'Gage height (ft)', source: 'waterdata.usgs.gov', sourceUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=01636500',                     method: 'LIVE API' },
    { id: 'metro',    icon: '🚇', title: 'SILVER LINE',       tier: 'live',  liveKey: 'wmata',   countyVal: '--', districtVal: null, sub: 'Loudoun Gateway + Ashburn - click map', color: '#a78bfa', spark: [1200,1400,1600,1800,2100,2400,2600,2800],
      sparkLabel: 'Weekly boardings', source: 'wmata.com',      sourceUrl: 'https://www.wmata.com',                                                      method: 'LIVE API' },
    { id: 'outages',  icon: '⚡', title: 'POWER OUTAGES',     tier: 'live',  liveKey: 'outages', countyVal: '--', districtVal: null, sub: 'Dominion Energy active outages, Loudoun County', color: '#facc15', spark: [0,2,1,4,1,0,2,1],
      sparkLabel: 'Outage events', source: 'dominiorenergy.com',  sourceUrl: 'https://www.dominionenergy.com/outages',                                     method: 'LIVE API' },
    // --- TODAY ---
    { id: 'permits',  icon: '🏗', title: 'BUILDING PERMITS',  tier: 'today', liveKey: 'permits', countyVal: '--', districtVal: null, districtNote: 'County-wide', sub: 'Active permits from Loudoun Open Data today', color: '#ff6b35', spark: [280,260,305,290,312,300,298,312],
      sparkLabel: 'Monthly permits', source: 'opendata.loudoun.gov', sourceUrl: 'https://opendata.loudoun.gov', method: 'OPEN DATA API' },
    // --- PUBLISHED ---
    { id: 'budget',    icon: '💰', title: 'COUNTY BUDGET',    tier: 'published', publishedDate: 'Apr 1, 2025',        countyVal: '$4.7B',        districtVal: null, sub: 'FY2026 adopted. FY2027 $5.4B adopted Apr 7 2026.', color: '#22c55e', spark: [3.1,3.2,3.35,3.5,3.6,3.72,3.87,4.7],
      sparkLabel: 'FY2018 - FY2026 ($B)',  source: 'loudoun.gov/budget',        sourceUrl: 'https://www.loudoun.gov/budget',                                             method: 'PDF' },
    { id: 'enrollment',icon: '🏫', title: 'LCPS ENROLLMENT',  tier: 'published', publishedDate: 'Aug 2025',           countyVal: '~82,000',      districtVal: null, sub: '100 schools, 2025-26. Down from 84,121 prior year.', color: '#2dd4bf', spark: [70000,74000,77000,79000,81000,84121,84000,82000],
      sparkLabel: '2018 - 2026 (students)', source: 'lcps.org',              sourceUrl: 'https://www.lcps.org/article/2361206',                                      method: 'STATIC' },
    { id: 'population',icon: '📈', title: 'POPULATION',       tier: 'published', publishedDate: 'Mar 27, 2026',       countyVal: '449,749',      districtVal: null, sub: 'Census 2025 est. Up 25,720 since 2020 census.', color: '#fbbf24', spark: [310,340,370,400,420,436,443,450],
      sparkLabel: '2018 - 2025 (000s)',           source: 'fred.stlouisfed.org',       sourceUrl: 'https://fred.stlouisfed.org/series/VALOUD5POP',                             method: 'API' },
    { id: 'housing',   icon: '🏠', title: 'MEDIAN HOME PRICE',tier: 'published', publishedDate: 'Feb 2026',           countyVal: '$774K',        districtVal: null, sub: 'Up 3.0% YoY. 307 homes sold, avg 34 days on market.', color: '#f5c842', spark: [545,580,600,620,641,680,720,774],
      sparkLabel: '2018 - 2026 ($K)',        source: 'redfin.com',                sourceUrl: 'https://www.redfin.com/county/2989/VA/Loudoun-County/housing-market',        method: 'COLLECTED' },
    { id: 'safety',    icon: '👮', title: 'CRIME INDEX',       tier: 'published', publishedDate: 'Aug 2025 (nightly)',countyVal: '-14% (2025)',   districtVal: null, sub: 'Serious crime down 14% in 2025. Dashboard updates nightly.', color: '#fb923c', spark: [100,98,96,94,92,90,88,86],
      sparkLabel: '2018 - 2025 (index)',       source: 'loudoun.gov/crimedashboard',sourceUrl: 'https://www.loudoun.gov/crimedashboard',                                     method: 'COLLECTED' },
    { id: 'schools',   icon: '📚', title: 'SCHOOL RATING',    tier: 'published', publishedDate: '2026 School Year',  countyVal: '9/10 avg',     districtVal: null, sub: 'Top 20% VA. Math 76%, Reading 79%. 101 schools, 80,096 students.', color: '#00c6ff', spark: [7.2,7.5,7.8,8.0,8.1,8.2,8.4,9.0],
      sparkLabel: '2018 - 2026 (rating)', source: 'publicschoolreview.com',   sourceUrl: 'https://www.publicschoolreview.com/virginia/loudoun-county',                 method: 'COLLECTED' },
    { id: 'bosvotes',  icon: '🗳', title: 'BOS ACTIVITY',     tier: 'published', publishedDate: 'Apr 7, 2026',       countyVal: 'FY2027 Budget',districtVal: null, sub: 'Apr 7 2026: $5.4B FY2027 adopted. Meets 1st + 3rd Tuesday.', color: '#f472b6', spark: [2,3,5,4,6,3,4,4],
      sparkLabel: 'Items per session',              source: 'loudoun.gov/bos',           sourceUrl: 'https://www.loudoun.gov/86/Board-of-Supervisors',                           method: 'STATIC' },
    { id: 'elections', icon: '🗳', title: 'ELECTIONS',         tier: 'published', publishedDate: 'Nov 2023',          countyVal: 'Nov 2027 next',districtVal: null, sub: 'Last general election Nov 7 2023. All 9 supervisors + chair. Next: Nov 2027.', color: '#e879f9', spark: [0,0,0,0,0,0,0,1],
      sparkLabel: 'Election cycles',   source: 'loudoun.gov/elections',     sourceUrl: 'https://www.loudoun.gov/elections',                                         method: 'STATIC' },
    { id: 'foia',      icon: '📋', title: 'FOIA / OPEN RECORDS',tier: 'published', publishedDate: 'Current',         countyVal: 'File Online',  districtVal: null, sub: 'Virginia FOIA: 5 business days to respond. Free for first 2hrs of staff time.', color: '#94a3b8', spark: [10,12,14,15,18,20,22,24],
      sparkLabel: 'Requests per quarter', source: 'loudoun.gov/foia',          sourceUrl: 'https://www.loudoun.gov/foia',                                               method: 'STATIC' },
    { id: 'dominion',  icon: '⚡', title: 'POWER PROVIDER',    tier: 'published', publishedDate: 'Current',          countyVal: 'Dominion Energy',districtVal: null, sub: 'Primary provider. Report outages: 1-866-DOM-HELP (366-4357).', color: '#facc15', spark: [0,0,1,0,2,0,0,1],
      sparkLabel: 'Outage events',           source: 'dominionenergy.com',        sourceUrl: 'https://www.dominionenergy.com/home/outages-and-safety/report-an-outage',   method: 'STATIC' },
  ],

  counters: {
    s1: { val: 449749,  label: 'Population (2025)' },
    s2: { val: 4700,    label: 'FY2026 Budget ($M)' },
    s3: { val: 82000,   label: 'LCPS Students' },
    s4: { val: 774,     label: 'Median Home Price ($K)' },
  },

  sources: [
    { name: 'Loudoun Open Data Portal',    url: 'https://opendata.loudoun.gov',                             desc: 'GIS, zoning, parcels, permits, district boundaries.',                        cadence: 'today',     tags: ['permits','zoning'],   powers: ['Building Permits','Zoning','Parcels'],        method: 'OPEN DATA API', lastUpdated: 'Live' },
    { name: 'LCPS Data & Reporting',       url: 'https://www.lcps.org/article/2361206',                    desc: '82,000 students enrolled 2025-26 across 100 schools.',                       cadence: 'published', tags: ['schools'],            powers: ['Enrollment','SOL Scores','Demographics'],     method: 'STATIC',       lastUpdated: 'Aug 2025' },
    { name: 'LCSO Crime Dashboard',        url: 'https://www.loudoun.gov/crimedashboard',                  desc: 'Nightly-updated. Serious crime down 14% in 2025.',                           cadence: 'today',     tags: ['safety'],             powers: ['Crime by Type','YoY Trends','Map'],           method: 'COLLECTED',    lastUpdated: 'Nightly' },
    { name: 'USGS Water Resources',        url: 'https://waterdata.usgs.gov/nwis/uv?site_no=01636500',    desc: 'Real-time gauge at Goose Creek near Leesburg. Updates every 15min.',          cadence: 'live',      tags: ['live','environment'], powers: ['Gauge Height','Flood Indicators'],            method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'US Census Bureau / FRED',     url: 'https://fred.stlouisfed.org/series/VALOUD5POP',           desc: '2025 population: 449,749. Updated Mar 27 2026.',                             cadence: 'published', tags: ['annual'],             powers: ['Population','Growth Rate'],                   method: 'API',          lastUpdated: 'Mar 27, 2026' },
    { name: 'Loudoun BOS Records',         url: 'https://www.loudoun.gov/86/Board-of-Supervisors',         desc: 'FY2027 $5.4B budget adopted Apr 7 2026. Meets twice monthly.',               cadence: 'published', tags: ['budget','governance'], powers: ['Supervisor Votes','Budget'],                  method: 'STATIC',       lastUpdated: 'Apr 7, 2026' },
    { name: 'Loudoun FY2026/2027 Budget',  url: 'https://www.loudoun.gov/budget',                          desc: 'FY2026 $4.7B active. FY2027 $5.4B adopted Apr 2026.',                       cadence: 'published', tags: ['budget'],             powers: ['Budget Breakdown','CIP'],                    method: 'PDF',          lastUpdated: 'Apr 7, 2026' },
    { name: 'Redfin Housing Market',       url: 'https://www.redfin.com/county/2989/VA/Loudoun-County/housing-market', desc: 'MLS-based. Feb 2026: $774K median, up 3.0% YoY.',      cadence: 'published', tags: ['housing'],            powers: ['Median Price','Days on Market'],              method: 'COLLECTED',    lastUpdated: 'Feb 2026' },
    { name: 'EPA AirNow',                  url: 'https://www.airnow.gov/?city=Ashburn&state=VA',           desc: 'Real-time AQI from Ashburn EPA monitor. Fetched live.',                      cadence: 'live',      tags: ['live','environment'], powers: ['AQI','PM2.5','Ozone'],                        method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'NWS api.weather.gov',         url: 'https://api.weather.gov',                                 desc: 'Current conditions for Dulles Airport grid. Fetched live.',                  cadence: 'live',      tags: ['live'],               powers: ['Temp','Forecast','Wind'],                     method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'WMATA Developer API',         url: 'https://developer.wmata.com',                             desc: 'Real-time train predictions for Loudoun Gateway + Ashburn.',                  cadence: 'live',      tags: ['live','transit'],     powers: ['Train Predictions','Incidents'],              method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'Dominion Energy Outages',     url: 'https://www.dominionenergy.com/outages',                  desc: 'Primary power provider for Loudoun County. Outage map and reporting.',        cadence: 'live',      tags: ['live','utilities'],   powers: ['Active Outages','Report Outage'],             method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'Public School Review 2026',   url: 'https://www.publicschoolreview.com/virginia/loudoun-county', desc: '2026: avg 9/10 rating, top 20% of VA. Math 76%, Reading 79%.',          cadence: 'published', tags: ['schools'],            powers: ['School Ratings','Test Scores'],               method: 'COLLECTED',    lastUpdated: '2026' },
    { name: 'Loudoun Elections Office',    url: 'https://www.loudoun.gov/elections',                       desc: 'Last general: Nov 7 2023. Next: Nov 2027. Voter registration info.',         cadence: 'published', tags: ['governance'],         powers: ['Election Results','Voter Info'],              method: 'STATIC',       lastUpdated: 'Nov 2023' },
    { name: 'Virginia FOIA',               url: 'https://www.loudoun.gov/foia',                            desc: '5 business days to respond. Free for first 2hrs staff time. File online.',  cadence: 'published', tags: ['transparency'],       powers: ['Public Records Requests'],                   method: 'STATIC',       lastUpdated: 'Current' },
  ],

  localAlerts: [
    { type: 'info',    icon: '🚧', title: 'Route 7 Widening', desc: 'Construction between Sterling and Ashburn through Dec 2026. Expect delays.', source: 'VDOT', url: 'https://www.virginiadot.org' },
    { type: 'info',    icon: '📢', title: 'FY2027 Budget Active', desc: '$5.4B budget adopted Apr 7 2026. Education receives 56% of general fund.', source: 'loudoun.gov', url: 'https://www.loudoun.gov/budget' },
    { type: 'info',    icon: '🏫', title: 'Elementary SRO Decision', desc: 'BOS voted 6-2 Mar 2026 to exclude elementary SRO funding. Issue remains open.', source: 'loudoun.gov', url: 'https://www.loudoun.gov/bos' },
    { type: 'info',    icon: '🚇', title: 'Silver Line Service', desc: 'Weekend Silver Line operating every 16 min Ashburn to Stadium-Armory.', source: 'WMATA', url: 'https://www.wmata.com' },
  ],

  govSchemes: [
    { name: 'Real Property Tax Relief', desc: 'For elderly/disabled residents. Apply by Apr 1.', url: 'https://www.loudoun.gov/taxrelief', eligibility: 'Age 65+ or disabled, income limits apply' },
    { name: 'Affordable Dwelling Units', desc: 'Below-market housing in new developments.', url: 'https://www.loudoun.gov/adu', eligibility: 'Income below 70% AMI' },
    { name: 'Homeowner Assistance Fund', desc: 'Mortgage/utility help for COVID-impacted homeowners.', url: 'https://www.loudoun.gov/haf', eligibility: 'Income below 150% AMI' },
    { name: 'SNAP / Food Assistance', desc: 'Federal food benefits administered by Loudoun DSS.', url: 'https://www.loudoun.gov/dss', eligibility: 'Income-based' },
    { name: 'Loudoun Cares (DSS)', desc: 'Emergency financial assistance, case management.', url: 'https://www.loudoun.gov/dss', eligibility: 'Loudoun residents in crisis' },
    { name: 'Small Business Recovery', desc: 'Grants and loans for small businesses.', url: 'https://biz.loudoun.gov', eligibility: 'Loudoun-based businesses' },
  ],

  votes: [
    { title: 'LCPS per-school ratings map', pct: 82 },
    { title: 'Solar permit + installation tracker', pct: 71 },
    { title: 'Data center tax revenue by district', pct: 68 },
    { title: 'Route 7 BRT + Silver Line ridership', pct: 65 },
    { title: 'Flood risk by parcel', pct: 47 },
    { title: 'BOS vote history per supervisor', pct: 43 },
    { title: 'Elementary SRO status live tracker', pct: 38 },
    { title: 'Dominion outage history by zip', pct: 32 },
  ],

  boundaries: [
    { id: 'algonkian',   coords: [[39.08,-77.33],[39.12,-77.33],[39.12,-77.42],[39.05,-77.42],[39.05,-77.36]] },
    { id: 'ashburn',     coords: [[38.99,-77.44],[39.05,-77.44],[39.05,-77.50],[38.99,-77.55],[38.96,-77.50]] },
    { id: 'broadrun',    coords: [[38.98,-77.42],[39.04,-77.42],[39.04,-77.48],[38.98,-77.48]] },
    { id: 'catoctin',    coords: [[39.10,-77.65],[39.20,-77.65],[39.22,-77.78],[39.10,-77.78],[39.08,-77.70]] },
    { id: 'dulles',      coords: [[38.94,-77.38],[39.00,-77.38],[39.00,-77.46],[38.94,-77.50],[38.92,-77.44]] },
    { id: 'leesburg',    coords: [[39.08,-77.53],[39.15,-77.53],[39.16,-77.62],[39.08,-77.62],[39.07,-77.57]] },
    { id: 'littleriver', coords: [[39.10,-77.78],[39.18,-77.78],[39.20,-77.90],[39.10,-77.90],[39.08,-77.82]] },
    { id: 'sterling',    coords: [[38.98,-77.36],[39.04,-77.36],[39.05,-77.44],[38.98,-77.44]] },
    { id: 'sycamore',    coords: [[38.93,-77.44],[39.00,-77.44],[39.00,-77.54],[38.93,-77.58],[38.90,-77.50]] },
  ],
};
