// ── FAIRFAX COUNTY DATA ────────────────────────────────────
// Source: data.fairfaxcounty.gov | fcps.edu | fairfaxcounty.gov/budget
// Last verified: May 2025

window.FAIRFAX = {
  id: 'fairfax',
  name: 'Fairfax County',
  state: 'Virginia',
  tagline: 'Largest county in Virginia by population',
  color: '#f97316',
  accentDark: '#c2410c',
  supervisor: 'Chair: Jeff McKay',
  population: '1,150,000',
  area: '406 sq mi',
  founded: '1742',
  seat: 'Fairfax City',
  website: 'https://www.fairfaxcounty.gov',
  openDataUrl: 'https://data.fairfaxcounty.gov',
  lastUpdated: 'May 1, 2025',
  dataNote: 'County-level data sourced from Fairfax County Open Data Portal (data.fairfaxcounty.gov). District-level figures are aggregated from parcel, permit, and school-level datasets using magisterial district boundary data. Some metrics are county-wide by nature and are clearly labeled.',

  mapCenter: [38.84, -77.30],
  mapZoom: 10,

  districts: [
    { id: 'braddock',    name: 'Braddock',    supervisor: 'James Walkinshaw',   pop: '110000', color: '#f97316', center: [38.80, -77.28], tags: ['Burke', 'Annandale', 'Kings Park'] },
    { id: 'dranesville', name: 'Dranesville',  supervisor: 'John Foust',         pop: '118000', color: '#fb923c', center: [38.96, -77.36], tags: ['Great Falls', 'McLean', 'Herndon'] },
    { id: 'franklinpark',name: 'Franconia',    supervisor: 'Rodney Lusk',        pop: '128000', color: '#fbbf24', center: [38.77, -77.15], tags: ['Franconia', 'Kingstowne', 'Springfield'] },
    { id: 'hunter_mill', name: 'Hunter Mill',  supervisor: 'Walter Alcorn',      pop: '122000', color: '#34d399', center: [38.92, -77.28], tags: ['Vienna', 'Reston', 'Oakton'] },
    { id: 'lee',         name: 'Lee',          supervisor: 'Penelope Gross',     pop: '105000', color: '#22d3ee', center: [38.78, -77.10], tags: ['Groveton', 'Hybla Valley', 'Mount Vernon area'] },
    { id: 'mason',       name: 'Mason',        supervisor: 'Penny Gross',        pop: '112000', color: '#60a5fa', center: [38.83, -77.17], tags: ['Annandale', 'Bailey Crossroads', 'Seven Corners'] },
    { id: 'mount_vernon',name: 'Mount Vernon', supervisor: 'Dan Storck',         pop: '108000', color: '#a78bfa', center: [38.72, -77.10], tags: ['Mount Vernon', 'Alexandria area', 'Fort Belvoir'] },
    { id: 'providence',  name: 'Providence',   supervisor: 'Dalia Palchik',      pop: '135000', color: '#f472b6', center: [38.87, -77.22], tags: ['Merrifield', 'Tysons', 'Falls Church area'] },
    { id: 'springfield', name: 'Springfield',  supervisor: 'Pat Herrity',        pop: '142000', color: '#4ade80', center: [38.79, -77.20], tags: ['Springfield', 'West Springfield', 'Newington'] },
  ],

  countyCards: [
    { id: 'schools',    icon: '📚', title: 'SCHOOLS',          countyVal: '91/100',  districtVal: null,     districtNote: 'aggregated',  sub: '198 schools · 181,000 students enrolled',  badge: 'DAILY',  cadence: 'daily',  color: '#f97316', spark: [72,75,78,80,83,85,88,91],         source: 'fcps.edu' },
    { id: 'housing',    icon: '🏠', title: 'HOUSING',          countyVal: '$724K',   districtVal: '$698K',  districtNote: 'est',          sub: 'Median sale price · 112 homes sold / 30 days', badge: 'DAILY', cadence: 'daily', color: '#f5c842', spark: [580,600,640,670,695,710,720,724], source: 'virginiarealtors.org' },
    { id: 'permits',    icon: '🏗️', title: 'BUILDING PERMITS', countyVal: '842',     districtVal: '94',     districtNote: 'est',          sub: 'Issued this month · 62 commercial · 780 residential', badge: 'LIVE', cadence: 'live', color: '#fb923c', spark: [720,750,800,780,820,810,835,842], source: 'data.fairfaxcounty.gov' },
    { id: 'budget',     icon: '💰', title: 'COUNTY BUDGET',    countyVal: '$10.1B',  districtVal: null,     districtNote: 'county-wide',  sub: 'FY2025 · Education 52% · Public Safety 16%', badge: 'ANNUAL', cadence: 'annual', color: '#22c55e', spark: [8.2,8.6,9.0,9.3,9.6,9.8,10.0,10.1], source: 'fairfaxcounty.gov/budget' },
    { id: 'metro',      icon: '🚇', title: 'METRO RIDERSHIP',  countyVal: '182K/day',districtVal: null,     districtNote: 'county-wide',  sub: 'Daily Silver/Blue/Orange/Yellow Line riders', badge: 'LIVE',  cadence: 'live',  color: '#38bdf8', spark: [120,135,148,158,165,170,178,182],  source: 'wmata.com' },
    { id: 'traffic',    icon: '🚗', title: 'TRAFFIC & COMMUTE',countyVal: '42 min',  districtVal: '45 min', districtNote: 'est',          sub: 'Avg commute to DC · I-66 / Beltway / I-95', badge: 'LIVE',  cadence: 'live',  color: '#a78bfa', spark: [35,38,42,45,44,42,41,42],          source: 'virginiadot.org' },
    { id: 'bosvotes',   icon: '🗳️', title: 'SUPERVISOR VOTES', countyVal: '7 items', districtVal: null,     districtNote: 'county-wide',  sub: 'Past 30 days · Next BOS: June 10 · Fairfax', badge: 'WEEKLY', cadence: 'weekly', color: '#f472b6', spark: [3,4,6,5,7,6,7,7],               source: 'fairfaxcounty.gov/bos' },
    { id: 'safety',     icon: '👮', title: 'PUBLIC SAFETY',    countyVal: '-5%',     districtVal: '-4%',    districtNote: 'est',          sub: 'Crime index vs prior year · FCPD report',  badge: 'DAILY',  cadence: 'daily', color: '#fb923c', spark: [100,99,97,96,95,95,95,95],         source: 'fairfaxcounty.gov/police' },
    { id: 'air',        icon: '🌱', title: 'AIR QUALITY',      countyVal: '38 AQI',  districtVal: null,     districtNote: 'county-wide',  sub: 'Good · EPA AirNow · Tyson Corner monitor', badge: 'LIVE',   cadence: 'live',  color: '#4ade80', spark: [60,52,48,45,44,40,38,38],          source: 'airnow.gov' },
    { id: 'population', icon: '📈', title: 'DEMOGRAPHICS',     countyVal: '1.15M',   districtVal: '128K',   districtNote: 'Providence',   sub: 'Largest county in Virginia · 100+ languages', badge: 'CENSUS', cadence: 'annual', color: '#fbbf24', spark: [950,990,1020,1060,1090,1110,1130,1150], source: 'data.census.gov' },
    { id: 'health',     icon: '🏥', title: 'HEALTH SERVICES',  countyVal: '42',      districtVal: null,     districtNote: 'county-wide',  sub: 'Health dept sites · Inova Fairfax · NVFS',  badge: 'DAILY', cadence: 'daily', color: '#e879f9', spark: [32,34,36,38,40,41,42,42],          source: 'fairfaxcounty.gov/health' },
    { id: 'enrollment', icon: '🏫', title: 'FCPS ENROLLMENT',  countyVal: '181,000', districtVal: '20,100', districtNote: 'Providence',   sub: 'Students · 198 schools · 30% ESOL students', badge: 'DAILY', cadence: 'daily', color: '#2dd4bf', spark: [168000,172000,175000,177000,178000,179000,180000,181000], source: 'fcps.edu' },
  ],

  sources: [
    { name: 'Fairfax County Open Data', url: 'https://data.fairfaxcounty.gov', desc: 'Primary open data portal for county GIS, zoning, permits, parcels, and magisterial district boundaries.', cadence: 'daily', tags: ['housing','permits','budget','zoning'], powers: ['Building Permits','Zoning Map','Parcel Data','District Boundaries'], lastUpdated: 'May 1, 2025' },
    { name: 'Fairfax County Public Schools (FCPS)', url: 'https://www.fcps.edu/node/32916', desc: 'Official FCPS data hub: enrollment, per-school SOL results, demographics, and annual reports.', cadence: 'daily', tags: ['schools'], powers: ['School Ratings','Enrollment','SOL Scores','Demographics'], lastUpdated: 'Apr 30, 2025' },
    { name: 'Virginia Open Data Portal', url: 'https://data.virginia.gov', desc: 'Statewide open data covering health, education, economy, environment, and criminal justice.', cadence: 'weekly', tags: ['budget','environment','schools'], powers: ['Health Services','Crime Index','State Allocations'], lastUpdated: 'Apr 28, 2025' },
    { name: 'VDOT Traffic Data', url: 'https://www.virginiadot.org/info/resources-traffic-counts.asp', desc: 'Virginia DOT real-time and historical traffic count data. Powers commute time estimates.', cadence: 'live', tags: ['live'], powers: ['Commute Times','Traffic Counts','I-66 / Beltway / I-95'], lastUpdated: 'Live' },
    { name: 'WMATA Metro Ridership', url: 'https://www.wmata.com/initiatives/ridership-portal/', desc: 'Washington Metro ridership data by station and line. Fairfax served by Silver, Blue, Orange, and Yellow lines.', cadence: 'daily', tags: ['daily','transit'], powers: ['Metro Ridership','Station Data','Line Performance'], lastUpdated: 'May 1, 2025' },
    { name: 'US Census Bureau ACS', url: 'https://data.census.gov', desc: 'American Community Survey 5-year estimates. Powers population, income, and demographic cards.', cadence: 'annual', tags: ['annual'], powers: ['Population','Demographics','Income Levels','Language Data'], lastUpdated: 'Dec 2024' },
    { name: 'Fairfax BOS Meeting Records', url: 'https://www.fairfaxcounty.gov/bos/minutes', desc: 'Official Board of Supervisors meeting agendas, minutes, and vote records. All public.', cadence: 'weekly', tags: ['weekly','budget'], powers: ['Supervisor Votes','Legislative Calendar','Approved Budgets'], lastUpdated: 'Apr 29, 2025' },
    { name: 'Virginia REALTORS Data', url: 'https://www.virginiarealtors.org/research/market-data/', desc: 'Monthly housing market statistics for Fairfax County: median price, days on market, volume.', cadence: 'daily', tags: ['housing','daily'], powers: ['Median Home Price','Sales Volume','Days on Market'], lastUpdated: 'May 1, 2025' },
    { name: 'EPA AirNow Air Quality', url: 'https://www.airnow.gov/?city=Tysons+Corner&state=VA', desc: 'Real-time Air Quality Index for Fairfax County from EPA monitoring stations near Tysons.', cadence: 'live', tags: ['live','environment'], powers: ['Air Quality Index','Ozone Levels','PM2.5 Particulates'], lastUpdated: 'Live' },
    { name: 'Fairfax County FY Budget', url: 'https://www.fairfaxcounty.gov/budget', desc: 'Adopted county budget documents, department breakdowns, and capital improvement plans.', cadence: 'annual', tags: ['annual','budget'], powers: ['$10.1B Budget','Education Spend','Public Safety Allocation'], lastUpdated: 'Apr 2025' },
    { name: 'FCPD Crime Statistics', url: 'https://www.fairfaxcounty.gov/police/crime-statistics', desc: 'Fairfax County Police Department annual crime report and incident data by district.', cadence: 'daily', tags: ['daily'], powers: ['Crime Index','Incident Types','Year-over-Year Trends'], lastUpdated: 'May 1, 2025' },
    { name: 'National Weather Service Sterling', url: 'https://www.weather.gov/lwx/', desc: 'Official NWS forecast for the DC/Northern Virginia area from the Sterling, VA office.', cadence: 'live', tags: ['live'], powers: ['Current Conditions','Forecast','Ticker Weather Data'], lastUpdated: 'Live' },
  ],

  votes: [
    { title: 'FCPS per-school performance map', pct: 78 },
    { title: 'Tysons development tracker', pct: 72 },
    { title: 'I-66 / I-95 real-time congestion', pct: 69 },
    { title: 'Affordable housing units by district', pct: 61 },
    { title: 'Silver Line ridership by station', pct: 54 },
    { title: 'Tree canopy loss tracker', pct: 45 },
    { title: 'Mental health crisis response map', pct: 41 },
    { title: 'BOS vote history by supervisor', pct: 36 },
  ],

  ticker: [
    { label: 'FCPS Enrollment', value: '181,000', trend: null },
    { label: 'Median Home Price', value: '$724K', trend: 'up' },
    { label: 'FY2025 Budget', value: '$10.1B', trend: null },
    { label: 'Beltway avg speed', value: '38 mph', trend: 'down' },
    { label: 'New permits this month', value: '842', trend: 'up' },
    { label: 'Metro riders today', value: '182K', trend: null },
    { label: 'Crime Index YoY', value: '-5%', trend: 'up' },
    { label: 'Air Quality Index', value: '38 Good', trend: null },
    { label: 'Tysons today', value: '71F Sunny', trend: null },
    { label: 'Next BOS vote', value: 'June 10', trend: null },
  ],

  // GeoJSON-style district boundaries (simplified polygons, lon/lat)
  boundaries: [
    { id: 'braddock',     coords: [[38.77,-77.22],[38.84,-77.22],[38.84,-77.30],[38.77,-77.30]] },
    { id: 'dranesville',  coords: [[38.90,-77.30],[38.98,-77.30],[38.98,-77.42],[38.90,-77.42]] },
    { id: 'franklinpark', coords: [[38.72,-77.10],[38.80,-77.10],[38.80,-77.20],[38.72,-77.20]] },
    { id: 'hunter_mill',  coords: [[38.88,-77.22],[38.96,-77.22],[38.96,-77.32],[38.88,-77.32]] },
    { id: 'lee',          coords: [[38.74,-77.05],[38.82,-77.05],[38.82,-77.12],[38.74,-77.12]] },
    { id: 'mason',        coords: [[38.80,-77.12],[38.88,-77.12],[38.88,-77.22],[38.80,-77.22]] },
    { id: 'mount_vernon', coords: [[38.68,-77.05],[38.76,-77.05],[38.76,-77.14],[38.68,-77.14]] },
    { id: 'providence',   coords: [[38.84,-77.18],[38.92,-77.18],[38.92,-77.28],[38.84,-77.28]] },
    { id: 'springfield',  coords: [[38.76,-77.16],[38.84,-77.16],[38.84,-77.24],[38.76,-77.24]] },
  ],
};
