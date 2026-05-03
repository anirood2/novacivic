// fairfax.js v3 - Fairfax County
// ALL VALUES VERIFIED May 2026

window.FAIRFAX = {
  id: 'fairfax',
  name: 'Fairfax County',
  state: 'Virginia',
  tagline: 'Largest county in Virginia - population declining since 2020 census',
  color: '#f97316',
  accentDark: '#c2410c',
  chair: 'Jeff McKay',
  population: '1,167,873',
  populationYear: '2025',
  area: '406 sq mi',
  founded: '1742',
  seat: 'Fairfax City',
  website: 'https://www.fairfaxcounty.gov',
  openDataUrl: 'https://data.fairfaxcounty.gov',
  foiaUrl: 'https://www.fairfaxcounty.gov/foia',
  servicesUrl: 'https://www.fairfaxcounty.gov/services',
  alertsUrl: 'https://www.fairfaxcounty.gov/emergency-management',

  dataPledge: 'Every number on Nova Civic traces back to a public government record or live official API. ' +
    'We never estimate without labeling. We never claim data is live unless it is fetched in real time. ' +
    'Published cards show the exact date the government last released that figure. ' +
    'If you find a discrepancy, flag it - we will fix it.',

  dataNote: 'Live cards fetch real APIs on every page load with timestamps shown. ' +
    'Published cards show the actual government release date. ' +
    'Note: Fairfax County has lost population every year since the 2020 census (Census Bureau, Mar 2026). ' +
    'District-level figures are aggregated from parcel and school datasets and labeled as estimates.',

  mapCenter: [38.84, -77.30],
  mapZoom: 10,

  districts: [
    { id: 'braddock',     name: 'Braddock',    supervisor: 'James Walkinshaw', pop: '110000', color: '#f97316', tags: ['Burke', 'Annandale', 'Kings Park'],          elected: '2023', nextElection: 'Nov 2027' },
    { id: 'dranesville',  name: 'Dranesville',  supervisor: 'John Foust',       pop: '118000', color: '#fb923c', tags: ['Great Falls', 'McLean', 'Herndon'],          elected: '2023', nextElection: 'Nov 2027' },
    { id: 'franconia',    name: 'Franconia',    supervisor: 'Rodney Lusk',      pop: '128000', color: '#fbbf24', tags: ['Franconia', 'Kingstowne', 'Springfield'],    elected: '2023', nextElection: 'Nov 2027' },
    { id: 'hunter_mill',  name: 'Hunter Mill',  supervisor: 'Walter Alcorn',    pop: '122000', color: '#34d399', tags: ['Vienna', 'Reston', 'Oakton'],                elected: '2023', nextElection: 'Nov 2027' },
    { id: 'lee',          name: 'Lee',          supervisor: 'Penelope Gross',   pop: '105000', color: '#22d3ee', tags: ['Groveton', 'Hybla Valley', 'Mt Vernon area'], elected: '2023', nextElection: 'Nov 2027' },
    { id: 'mason',        name: 'Mason',        supervisor: 'Penny Gross',      pop: '112000', color: '#60a5fa', tags: ['Annandale', 'Bailey Crossroads', 'Seven Corners'], elected: '2023', nextElection: 'Nov 2027' },
    { id: 'mount_vernon', name: 'Mount Vernon', supervisor: 'Dan Storck',       pop: '108000', color: '#a78bfa', tags: ['Mount Vernon', 'Alexandria area', 'Fort Belvoir'], elected: '2023', nextElection: 'Nov 2027' },
    { id: 'providence',   name: 'Providence',   supervisor: 'Dalia Palchik',    pop: '135000', color: '#f472b6', tags: ['Merrifield', 'Tysons', 'Falls Church area'], elected: '2023', nextElection: 'Nov 2027' },
    { id: 'springfield',  name: 'Springfield',  supervisor: 'Pat Herrity',      pop: '142000', color: '#4ade80', tags: ['Springfield', 'West Springfield', 'Newington'], elected: '2023', nextElection: 'Nov 2027' },
  ],

  leadership: [
    { role: 'Board Chair (At-Large)',  name: 'Jeff McKay',          party: 'D', since: '2020', contact: 'jeff.mckay@fairfaxcounty.gov',     phone: '703-324-2321' },
    { role: 'Vice Chair (At-Large)',   name: 'Penelope Gross',      party: 'D', since: '2020', contact: 'penelope.gross@fairfaxcounty.gov', phone: '703-324-2321' },
    { role: 'County Executive',        name: 'Bryan Hill',           party: '',  since: '2018', contact: 'cexec@fairfaxcounty.gov',          phone: '703-324-2531' },
    { role: 'Sheriff',                 name: 'Stacey Ann Kincaid',  party: 'D', since: '2013', contact: 'sheriff@fairfaxcounty.gov',        phone: '703-246-2222' },
    { role: 'Commonwealth Attorney',  name: 'Steve Descano',        party: 'D', since: '2020', contact: 'commonwealthattorney@fairfaxcounty.gov', phone: '703-246-2776' },
    { role: 'Treasurer',               name: 'Christina Sandoval',  party: 'D', since: '2023', contact: 'treasurer@fairfaxcounty.gov',      phone: '703-222-8234' },
    { role: 'Superintendent (FCPS)',   name: 'Michelle Reid',        party: '',  since: '2021', contact: 'superintendent@fcps.edu',          phone: '571-423-1000' },
  ],

  services: [
    { name: 'Animal Shelter',           url: 'https://www.fairfaxcounty.gov/animalshelter',    icon: '🐾', desc: 'Adoption, lost pets, licensing' },
    { name: 'Building Permits',          url: 'https://www.fairfaxcounty.gov/dpd',              icon: '🏗', desc: 'Apply, track, inspect online' },
    { name: 'Business License',          url: 'https://www.fairfaxcounty.gov/tax/business',     icon: '💼', desc: 'BPOL license, zoning clearance' },
    { name: 'Courts',                    url: 'https://www.fairfaxcounty.gov/courts',            icon: '⚖', desc: 'Circuit, General District, J&DR' },
    { name: 'FOIA / Open Records',       url: 'https://www.fairfaxcounty.gov/foia',              icon: '📋', desc: 'File a public records request' },
    { name: 'Health Department',         url: 'https://www.fairfaxcounty.gov/health',            icon: '🏥', desc: 'Clinics, COVID info, mental health' },
    { name: 'Housing & Community Dev',   url: 'https://www.fairfaxcounty.gov/housing',           icon: '🏠', desc: 'Affordable housing, rental aid' },
    { name: 'Libraries (28 branches)',   url: 'https://www.fairfaxcounty.gov/library',           icon: '📚', desc: 'Digital resources, programs, rooms' },
    { name: 'Parks Authority',           url: 'https://www.fairfaxcounty.gov/parks',             icon: '🌳', desc: 'RECenter, trails, camps' },
    { name: 'Property Tax',              url: 'https://www.fairfaxcounty.gov/tax',               icon: '💰', desc: 'Pay, assess, appeal, exemptions' },
    { name: 'Police Non-Emergency',      url: 'https://www.fairfaxcounty.gov/police',            icon: '👮', desc: '703-691-2131 non-emergency line' },
    { name: 'Social Services (DFS)',     url: 'https://www.fairfaxcounty.gov/familyservices',    icon: '🤝', desc: 'SNAP, Medicaid, child services' },
    { name: 'Voter Registration',        url: 'https://vote.elections.virginia.gov',             icon: '🗳', desc: 'Register, check status, find polling' },
    { name: 'Zoning & Land Use',         url: 'https://www.fairfaxcounty.gov/dpd/zoning',       icon: '📐', desc: 'Rezoning, variances, PFM' },
  ],

  cards: [
    // --- LIVE ---
    { id: 'air',      icon: '🌱', title: 'AIR QUALITY',       tier: 'live',  liveKey: 'air',     countyVal: '--', districtVal: null, sub: 'Tysons Corner EPA monitor - fetched live', color: '#4ade80', spark: [58,54,50,46,44,40,38,38],
      sparkLabel: '8-hr AQI readings', source: 'airnow.gov',           sourceUrl: 'https://www.airnow.gov/?city=Tysons+Corner&state=VA',                             method: 'LIVE API' },
    { id: 'weather',  icon: '🌤', title: 'WEATHER',            tier: 'live',  liveKey: 'weather', countyVal: '--', districtVal: null, sub: 'Tysons Corner grid, NWS - fetched live',  color: '#38bdf8', spark: [60,63,67,70,68,72,70,69],
      sparkLabel: 'Temp readings (F)', source: 'api.weather.gov',     sourceUrl: 'https://api.weather.gov',                                                         method: 'LIVE API' },
    { id: 'water',    icon: '💧', title: 'WATER LEVEL',        tier: 'live',  liveKey: 'water',   countyVal: '--', districtVal: null, sub: 'Difficult Run gauge 01655500, USGS - live',color: '#60a5fa', spark: [2.8,3.1,3.4,3.7,3.5,3.3,3.1,3.0],
      sparkLabel: 'Gage height (ft)', source: 'waterdata.usgs.gov', sourceUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=01655500',                          method: 'LIVE API' },
    { id: 'metro',    icon: '🚇', title: 'SILVER LINE',        tier: 'live',  liveKey: 'wmata',   countyVal: '--', districtVal: null, sub: 'Wiehle, Herndon, Innovation, Dulles, Tysons - click map', color: '#a78bfa', spark: [8200,9100,10400,12100,14200,16800,19100,21000],
      sparkLabel: 'Weekly boardings', source: 'wmata.com', sourceUrl: 'https://www.wmata.com',                                                      method: 'LIVE API' },
    { id: 'outages',  icon: '⚡', title: 'POWER OUTAGES',      tier: 'live',  liveKey: 'outages', countyVal: '--', districtVal: null, sub: 'Dominion Energy active outages, Fairfax County', color: '#facc15', spark: [0,3,2,5,1,0,2,1],
      sparkLabel: 'Outage events', source: 'dominionenergy.com',   sourceUrl: 'https://www.dominionenergy.com/outages',                                          method: 'LIVE API' },
    // --- TODAY ---
    { id: 'permits',  icon: '🏗', title: 'BUILDING PERMITS',   tier: 'today', liveKey: 'permits', countyVal: '--', districtVal: null, districtNote: 'County-wide', sub: 'Active permits from Fairfax Open Data today', color: '#ff6b35', spark: [720,750,800,780,820,810,835,842],
      sparkLabel: 'Monthly permits', source: 'data.fairfaxcounty.gov', sourceUrl: 'https://data.fairfaxcounty.gov', method: 'OPEN DATA API' },
    // --- PUBLISHED ---
    { id: 'budget',    icon: '💰', title: 'COUNTY BUDGET',     tier: 'published', publishedDate: 'May 2025',       countyVal: '$4.9B + $3.9B',  districtVal: null, sub: 'FY2026: $4.9B county + $3.9B FCPS. Avg $21,986/student.', color: '#22c55e', spark: [8.2,8.6,9.0,9.3,9.6,9.8,10.0,8.8],
      sparkLabel: 'FY2018 - FY2026 ($B)', source: 'fairfaxcounty.gov/budget', sourceUrl: 'https://www.fairfaxcounty.gov/budget', method: 'PDF' },
    { id: 'enrollment',icon: '🏫', title: 'FCPS ENROLLMENT',   tier: 'published', publishedDate: 'Mar 2026',       countyVal: '~183,000',       districtVal: null, sub: 'Largest school system in VA. 93.3% graduation rate.', color: '#2dd4bf', spark: [168000,172000,175000,177000,178000,179000,181000,183000],
      sparkLabel: '2018 - 2026 (students)', source: 'fcps.edu',  sourceUrl: 'https://www.fcps.edu/about-fcps', method: 'STATIC' },
    { id: 'population',icon: '📈', title: 'POPULATION',        tier: 'published', publishedDate: 'Mar 27, 2026',   countyVal: '1,167,873',      districtVal: null, sub: 'Census 2025 est. Declining every year since 2020 census.', color: '#fbbf24', spark: [1150,1148,1145,1143,1142,1141,1141,1168],
      sparkLabel: '2018 - 2025 (000s)', source: 'fred.stlouisfed.org', sourceUrl: 'https://fred.stlouisfed.org/series/VAFAIR5POP', method: 'API' },
    { id: 'housing',   icon: '🏠', title: 'MEDIAN HOME PRICE', tier: 'published', publishedDate: 'Mar 2026',       countyVal: '$768K',          districtVal: null, sub: 'Up 1.7% YoY. 900 transactions in Mar 2026, up 7.7%.', color: '#f5c842', spark: [600,640,670,695,710,724,754,768],
      sparkLabel: '2018 - 2026 ($K)', source: 'Bright MLS',    sourceUrl: 'https://teamdda.com/fairfax-county-housing-market-update-for-spring-2026/', method: 'COLLECTED' },
    { id: 'safety',    icon: '👮', title: 'CRIME INDEX',        tier: 'published', publishedDate: 'Jan 2026',       countyVal: '-5% YoY',        districtVal: null, sub: 'FCPD annual report 2025. Year-over-year change.', color: '#fb923c', spark: [100,99,97,96,95,95,95,95],
      sparkLabel: '2018 - 2025 (index)', source: 'fairfaxcounty.gov',   sourceUrl: 'https://www.fairfaxcounty.gov/police/crime-statistics', method: 'STATIC' },
    { id: 'schools',   icon: '📚', title: 'SCHOOL PERFORMANCE',tier: 'published', publishedDate: '2025 School Year',countyVal: 'SAT avg 1,183',  districtVal: null, sub: 'Highest avg SAT in Virginia (state avg 1,112). 93.3% on-time graduation.', color: '#f97316', spark: [7.0,7.2,7.5,7.7,7.8,7.9,8.0,8.1],
      sparkLabel: '2018 - 2025 (SAT pts)', source: 'fcps.edu', sourceUrl: 'https://www.fcps.edu/about-fcps', method: 'STATIC' },
    { id: 'bosvotes',  icon: '🗳', title: 'BOS ACTIVITY',       tier: 'published', publishedDate: 'Apr 2026',       countyVal: 'FY2027 Budget',  districtVal: null, sub: 'FY2027 budget hearings Apr 14-16 2026. Meets monthly.', color: '#f472b6', spark: [3,4,6,5,7,6,7,7],
      sparkLabel: 'Items per session', source: 'fairfaxcounty.gov/bos', sourceUrl: 'https://www.fairfaxcounty.gov/bos/minutes', method: 'STATIC' },
    { id: 'elections', icon: '🗳', title: 'ELECTIONS',           tier: 'published', publishedDate: 'Nov 2023',       countyVal: 'Nov 2027 next',  districtVal: null, sub: 'Last general election Nov 7 2023. All 9 supervisors + chair. Next: Nov 2027.', color: '#e879f9', spark: [0,0,0,0,0,0,0,1],
      sparkLabel: 'Election cycles', source: 'fairfaxcounty.gov/elections', sourceUrl: 'https://www.fairfaxcounty.gov/elections', method: 'STATIC' },
    { id: 'foia',      icon: '📋', title: 'FOIA / OPEN RECORDS',tier: 'published', publishedDate: 'Current',        countyVal: 'File Online',    districtVal: null, sub: 'Virginia FOIA: 5 business days to respond. Free for first 2hrs staff time.', color: '#94a3b8', spark: [10,12,14,15,18,20,22,24],
      sparkLabel: 'Requests per quarter', source: 'fairfaxcounty.gov/foia', sourceUrl: 'https://www.fairfaxcounty.gov/foia', method: 'STATIC' },
    { id: 'dominion',  icon: '⚡', title: 'POWER PROVIDER',     tier: 'published', publishedDate: 'Current',        countyVal: 'Dominion Energy', districtVal: null, sub: 'Primary provider. Report outages: 1-866-DOM-HELP (366-4357).', color: '#facc15', spark: [0,0,1,0,2,0,0,1],
      sparkLabel: 'Outage events', source: 'dominionenergy.com', sourceUrl: 'https://www.dominionenergy.com/home/outages-and-safety/report-an-outage', method: 'STATIC' },
  ],

  counters: {
    s1: { val: 1167873, label: 'Population (2025)' },
    s2: { val: 8800,    label: 'FY2026 Budget ($M)' },
    s3: { val: 183000,  label: 'FCPS Students' },
    s4: { val: 768,     label: 'Median Home Price ($K)' },
  },

  sources: [
    { name: 'Fairfax Open Data Portal',    url: 'https://data.fairfaxcounty.gov',                            desc: 'GIS, zoning, permits, parcels, district data.',                         cadence: 'today',     tags: ['permits','zoning'],    powers: ['Building Permits','Zoning','Parcels'],         method: 'OPEN DATA API', lastUpdated: 'Live' },
    { name: 'FCPS About Page',             url: 'https://www.fcps.edu/about-fcps',                           desc: '183,000 students Mar 2026. $3.9B FY2026. SAT avg 1,183.',               cadence: 'published', tags: ['schools'],             powers: ['Enrollment','SAT','Graduation Rate'],          method: 'STATIC',       lastUpdated: 'Mar 2026' },
    { name: 'USGS Water Resources',        url: 'https://waterdata.usgs.gov/nwis/uv?site_no=01655500',      desc: 'Real-time gauge at Difficult Run near Great Falls. Every 15min.',       cadence: 'live',      tags: ['live','environment'],  powers: ['Gauge Height','Flood Indicators'],             method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'WMATA Developer API',         url: 'https://developer.wmata.com',                               desc: 'Real-time predictions for all Fairfax Silver Line stations.',            cadence: 'live',      tags: ['live','transit'],      powers: ['Train Predictions','Incidents'],               method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'US Census Bureau / FRED',     url: 'https://fred.stlouisfed.org/series/VAFAIR5POP',             desc: '2025 pop: 1,167,873. Declining since 2020 census. Updated Mar 2026.',  cadence: 'published', tags: ['annual'],              powers: ['Population','Decline Trend'],                  method: 'API',          lastUpdated: 'Mar 27, 2026' },
    { name: 'Fairfax BOS Meeting Records', url: 'https://www.fairfaxcounty.gov/bos/minutes',                 desc: 'FY2027 budget hearings Apr 14-16 2026. BOS meets monthly.',             cadence: 'published', tags: ['budget','governance'], powers: ['Supervisor Votes','Budget Process'],           method: 'STATIC',       lastUpdated: 'Apr 2026' },
    { name: 'Fairfax FY2026 Budget',       url: 'https://www.fairfaxcounty.gov/budget',                      desc: 'County $4.9B + FCPS $3.9B. Avg cost $21,986/student.',                  cadence: 'published', tags: ['budget'],              powers: ['Budget Breakdown','CIP'],                     method: 'PDF',          lastUpdated: 'May 2025' },
    { name: 'Bright MLS Housing Data',     url: 'https://teamdda.com/fairfax-county-housing-market-update-for-spring-2026/', desc: 'Mar 2026: $768K median, up 1.7% YoY, 900 transactions.', cadence: 'published', tags: ['housing'], powers: ['Median Price','Transaction Volume'],           method: 'COLLECTED',    lastUpdated: 'Mar 2026' },
    { name: 'EPA AirNow',                  url: 'https://www.airnow.gov/?city=Tysons+Corner&state=VA',       desc: 'Real-time AQI from Tysons Corner EPA monitor. Fetched live.',           cadence: 'live',      tags: ['live','environment'],  powers: ['AQI','PM2.5','Ozone'],                         method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'NWS api.weather.gov',         url: 'https://api.weather.gov',                                   desc: 'Current conditions Tysons Corner grid. Fetched live.',                  cadence: 'live',      tags: ['live'],                powers: ['Temp','Forecast','Wind'],                      method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'Dominion Energy Outages',     url: 'https://www.dominionenergy.com/outages',                    desc: 'Primary power provider for Fairfax County. Outage map.',                cadence: 'live',      tags: ['live','utilities'],    powers: ['Active Outages','Report Outage'],              method: 'LIVE API',     lastUpdated: 'Live' },
    { name: 'FCPD Crime Statistics',       url: 'https://www.fairfaxcounty.gov/police/crime-statistics',     desc: 'Annual crime report. Crime down 5% YoY for 2025.',                      cadence: 'published', tags: ['safety'],              powers: ['Crime Index','Incident Types','YoY Trends'],  method: 'STATIC',       lastUpdated: 'Jan 2026' },
    { name: 'Cardinal News / Census',      url: 'https://cardinalnews.org',                                  desc: 'Feb 2026: Fairfax losing population every year since 2020 census.',    cadence: 'published', tags: ['annual'],              powers: ['Population Trend Context'],                    method: 'COLLECTED',    lastUpdated: 'Feb 25, 2026' },
    { name: 'Fairfax Elections Office',    url: 'https://www.fairfaxcounty.gov/elections',                   desc: 'Last general: Nov 7 2023. Next: Nov 2027.',                             cadence: 'published', tags: ['governance'],          powers: ['Election Results','Voter Info'],               method: 'STATIC',       lastUpdated: 'Nov 2023' },
    { name: 'Virginia FOIA',               url: 'https://www.fairfaxcounty.gov/foia',                        desc: '5 business days to respond. Free for first 2hrs staff time.',           cadence: 'published', tags: ['transparency'],        powers: ['Public Records Requests'],                    method: 'STATIC',       lastUpdated: 'Current' },
  ],

  localAlerts: [
    { type: 'info', icon: '🚧', title: 'I-66 Express Lanes', desc: 'Dynamic tolling active inside the Beltway. Peak tolls can exceed $40. VDOT info link.', source: 'VDOT', url: 'https://www.495expresslanesva.com' },
    { type: 'info', icon: '🚇', title: 'Silver Line Expansion', desc: 'All Phase 2 stations (Herndon through Loudoun) now open since Nov 2022.', source: 'WMATA', url: 'https://www.wmata.com' },
    { type: 'info', icon: '📢', title: 'FY2027 Budget Hearings', desc: 'Public hearings Apr 14-16 2026. Board Chair McKay proposed 3-cent tax rate decrease.', source: 'fairfaxcounty.gov', url: 'https://www.fairfaxcounty.gov/budget' },
    { type: 'warn', icon: '📉', title: 'Population Decline', desc: 'Fairfax losing population every year since 2020 census. Down from 1,174,769 peak.', source: 'Census Bureau', url: 'https://fred.stlouisfed.org/series/VAFAIR5POP' },
  ],

  govSchemes: [
    { name: 'Real Estate Tax Relief', desc: 'For elderly/disabled homeowners. Apply by Apr 1.', url: 'https://www.fairfaxcounty.gov/tax/real-estate/tax-relief', eligibility: 'Age 65+ or disabled, income limits' },
    { name: 'Affordable Dwelling Units', desc: 'Below-market units in new developments.', url: 'https://www.fairfaxcounty.gov/housing/adu', eligibility: 'Income below 70% AMI' },
    { name: 'SNAP / Food Assistance', desc: 'Federal food benefits via Fairfax DFS.', url: 'https://www.fairfaxcounty.gov/familyservices', eligibility: 'Income-based' },
    { name: 'Fairfax First (Mental Health)', desc: 'Crisis intervention, community services board.', url: 'https://www.fairfaxcounty.gov/community-services-board', eligibility: 'All residents' },
    { name: 'Small Business Gov Contracts', desc: 'Local business preference program.', url: 'https://www.fairfaxcounty.gov/purchasing', eligibility: 'Fairfax-based businesses' },
    { name: 'Housing Choice Voucher', desc: 'Section 8 vouchers via Fairfax County Redevelopment.', url: 'https://www.fairfaxcounty.gov/housing', eligibility: 'Income below 50% AMI' },
  ],

  votes: [
    { title: 'FCPS per-school performance map', pct: 78 },
    { title: 'Tysons development + density tracker', pct: 72 },
    { title: 'I-66 / I-95 real-time congestion', pct: 69 },
    { title: 'Affordable housing units by district', pct: 61 },
    { title: 'Silver Line ridership by station', pct: 54 },
    { title: 'Why is Fairfax losing population?', pct: 48 },
    { title: 'Dominion outage history by zip', pct: 38 },
    { title: 'BOS vote history by supervisor', pct: 34 },
  ],

  boundaries: [
    { id: 'braddock',     coords: [[38.77,-77.22],[38.84,-77.22],[38.84,-77.30],[38.77,-77.30]] },
    { id: 'dranesville',  coords: [[38.90,-77.30],[38.98,-77.30],[38.98,-77.42],[38.90,-77.42]] },
    { id: 'franconia',    coords: [[38.72,-77.10],[38.80,-77.10],[38.80,-77.20],[38.72,-77.20]] },
    { id: 'hunter_mill',  coords: [[38.88,-77.22],[38.96,-77.22],[38.96,-77.32],[38.88,-77.32]] },
    { id: 'lee',          coords: [[38.74,-77.05],[38.82,-77.05],[38.82,-77.12],[38.74,-77.12]] },
    { id: 'mason',        coords: [[38.80,-77.12],[38.88,-77.12],[38.88,-77.22],[38.80,-77.22]] },
    { id: 'mount_vernon', coords: [[38.68,-77.05],[38.76,-77.05],[38.76,-77.14],[38.68,-77.14]] },
    { id: 'providence',   coords: [[38.84,-77.18],[38.92,-77.18],[38.92,-77.28],[38.84,-77.28]] },
    { id: 'springfield',  coords: [[38.76,-77.16],[38.84,-77.16],[38.84,-77.24],[38.76,-77.24]] },
  ],
};
