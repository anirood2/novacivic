// api.js - Live data fetchers
// Each function returns { value, timestamp, source, ok }
// WMATA_KEY must be set before use

var NovaCivicAPI = (function () {

  // ── WMATA key placeholder ─────────────────────────────────
  // Replace the string below with your WMATA primary key
  // before pushing to GitHub. Never commit a real key to a public repo.
  var WMATA_KEY = 'f22e7e9d5f4b42569d3c369cf9e4f1e6';

  // Loudoun Silver Line station codes
  var LOUDOUN_STATIONS = [
    { code: 'N13', name: 'Loudoun Gateway',  lat: 38.9528, lon: -77.4627 },
    { code: 'N12', name: 'Ashburn',          lat: 38.9608, lon: -77.4474 },
  ];

  // Fairfax Silver Line station codes (subset - key ones)
  var FAIRFAX_STATIONS = [
    { code: 'N01', name: 'Wiehle-Reston East', lat: 38.9477, lon: -77.3401 },
    { code: 'N02', name: 'Reston Town Center',  lat: 38.9588, lon: -77.3597 },
    { code: 'N03', name: 'Herndon',             lat: 38.9669, lon: -77.3830 },
    { code: 'N04', name: 'Innovation Center',   lat: 38.9718, lon: -77.4093 },
    { code: 'N06', name: 'Dulles Airport',      lat: 38.9531, lon: -77.4479 },
    { code: 'A10', name: 'Tysons Corner',       lat: 38.9207, lon: -77.2266 },
    { code: 'A11', name: 'Greensboro',          lat: 38.9248, lon: -77.2350 },
    { code: 'A12', name: 'Spring Hill',         lat: 38.9289, lon: -77.2443 },
    { code: 'A13', name: 'McLean',              lat: 38.9344, lon: -77.2552 },
  ];

  function now() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function failResult(label) {
    return { value: 'Unavailable', timestamp: now(), source: label, ok: false };
  }

  // ── Air Quality (EPA AirNow) ──────────────────────────────
  // Free, no key, returns AQI for Ashburn/Loudoun zip 20147
  async function fetchAirQuality(zip) {
    zip = zip || '20147';
    try {
      var url = 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=' + zip + '&distance=25&API_KEY=E8013BE7-4B6D-4A08-A037-9C1F1B56A6E3';
      // AirNow free community key - rate limited but fine for civic use
      var res = await fetch(url);
      if (!res.ok) throw new Error('AirNow ' + res.status);
      var data = await res.json();
      if (!data || !data.length) throw new Error('No AQI data');
      // Find worst AQI across pollutants
      var worst = data.reduce(function (a, b) { return a.AQI > b.AQI ? a : b; });
      var category = worst.Category ? worst.Category.Name : 'Unknown';
      return {
        value: worst.AQI,
        label: category,
        pollutant: worst.ParameterName,
        timestamp: now(),
        source: 'EPA AirNow',
        ok: true,
      };
    } catch (e) {
      console.warn('AirNow fetch failed:', e.message);
      return failResult('EPA AirNow');
    }
  }

  // ── Weather (NWS api.weather.gov) ────────────────────────
  // No key needed. Uses grid point for Dulles / Tysons area
  async function fetchWeather(countyId) {
    // Loudoun: Dulles area grid  Fairfax: Tysons area grid
    var point = countyId === 'fairfax' ? '38.9207,-77.2266' : '38.9608,-77.4474';
    try {
      var pointRes = await fetch('https://api.weather.gov/points/' + point, {
        headers: { 'User-Agent': 'NovaCivic/1.0 civic-data-app' }
      });
      if (!pointRes.ok) throw new Error('NWS points ' + pointRes.status);
      var pointData = await pointRes.json();
      var forecastUrl = pointData.properties.forecastHourly;
      var fRes = await fetch(forecastUrl, {
        headers: { 'User-Agent': 'NovaCivic/1.0 civic-data-app' }
      });
      if (!fRes.ok) throw new Error('NWS forecast ' + fRes.status);
      var fData = await fRes.json();
      var current = fData.properties.periods[0];
      return {
        value: current.temperature + '\u00b0' + current.temperatureUnit,
        description: current.shortForecast,
        wind: current.windSpeed,
        timestamp: now(),
        source: 'NWS api.weather.gov',
        ok: true,
      };
    } catch (e) {
      console.warn('NWS fetch failed:', e.message);
      return failResult('NWS Weather');
    }
  }

  // ── Water Levels (USGS) ───────────────────────────────────
  // Goose Creek near Leesburg site 01636500
  // Difficult Run (Fairfax) site 01655500
  async function fetchWaterLevel(countyId) {
    var site = countyId === 'fairfax' ? '01655500' : '01636500';
    var name = countyId === 'fairfax' ? 'Difficult Run' : 'Goose Creek';
    try {
      var url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=' + site + '&parameterCd=00060,00065&siteStatus=active';
      var res = await fetch(url);
      if (!res.ok) throw new Error('USGS ' + res.status);
      var data = await res.json();
      var series = data.value.timeSeries;
      if (!series || !series.length) throw new Error('No USGS data');
      // param 00065 = gage height in feet
      var gageSeries = series.find(function (s) {
        return s.variable.variableCode[0].value === '00065';
      });
      if (!gageSeries) gageSeries = series[0];
      var latest = gageSeries.values[0].value[0];
      return {
        value: parseFloat(latest.value).toFixed(1) + ' ft',
        name: name,
        timestamp: now(),
        source: 'USGS Water Resources',
        ok: true,
      };
    } catch (e) {
      console.warn('USGS fetch failed:', e.message);
      return failResult('USGS Water Resources');
    }
  }

  // ── Building Permits (Socrata Open Data) ─────────────────
  // Loudoun: data.loudoun.gov  Fairfax: data.fairfaxcounty.gov
  async function fetchPermits(countyId) {
    try {
      var url, label;
      if (countyId === 'loudoun') {
        // Loudoun building permits dataset
        url = 'https://data.loudoun.gov/resource/urx8-6zzu.json?$limit=1&$select=count(*)';
        label = 'Loudoun Open Data';
      } else {
        // Fairfax building permits dataset
        url = 'https://data.fairfaxcounty.gov/resource/vdim-pg8k.json?$limit=1&$select=count(*)';
        label = 'Fairfax Open Data';
      }
      var res = await fetch(url);
      if (!res.ok) throw new Error('Socrata ' + res.status);
      var data = await res.json();
      var count = data[0] ? (data[0].count || data[0]['count(*)'] || 'N/A') : 'N/A';
      return {
        value: Number(count).toLocaleString(),
        timestamp: now(),
        source: label,
        ok: true,
      };
    } catch (e) {
      console.warn('Permits fetch failed:', e.message);
      return failResult('Open Data Portal');
    }
  }

  // ── WMATA Real-Time Predictions ───────────────────────────
  // Returns next train predictions for a station code
  async function fetchTrainPredictions(stationCode) {
    if (!WMATA_KEY || WMATA_KEY === 'YOUR_WMATA_PRIMARY_KEY_HERE') {
      return { predictions: [], timestamp: now(), ok: false, reason: 'no-key' };
    }
    try {
      var url = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/' + stationCode;
      var res = await fetch(url, {
        headers: { 'api_key': WMATA_KEY }
      });
      if (!res.ok) throw new Error('WMATA ' + res.status);
      var data = await res.json();
      var trains = (data.Trains || []).filter(function (t) {
        return t.Line && t.Min && t.Min !== '' && t.Min !== 'BRD' || t.Min === 'BRD';
      }).slice(0, 3);
      return {
        predictions: trains.map(function (t) {
          return {
            line: t.Line,
            destination: t.DestinationName,
            minutes: t.Min === 'BRD' ? 'Boarding' : t.Min === 'ARR' ? 'Arriving' : t.Min + ' min',
            cars: t.Car,
          };
        }),
        timestamp: now(),
        source: 'WMATA',
        ok: true,
      };
    } catch (e) {
      console.warn('WMATA predictions failed:', e.message);
      return { predictions: [], timestamp: now(), ok: false, reason: e.message };
    }
  }

  // ── WMATA Incidents ───────────────────────────────────────
  async function fetchIncidents() {
    if (!WMATA_KEY || WMATA_KEY === 'YOUR_WMATA_PRIMARY_KEY_HERE') {
      return { incidents: [], ok: false };
    }
    try {
      var res = await fetch('https://api.wmata.com/Incidents.svc/json/Incidents', {
        headers: { 'api_key': WMATA_KEY }
      });
      if (!res.ok) throw new Error('WMATA incidents ' + res.status);
      var data = await res.json();
      var silverLine = (data.Incidents || []).filter(function (i) {
        return i.LinesAffected && i.LinesAffected.indexOf('SV') !== -1;
      });
      return { incidents: silverLine, timestamp: now(), ok: true };
    } catch (e) {
      return { incidents: [], ok: false };
    }
  }

  // ── WMATA Ridership ───────────────────────────────────────
  async function fetchRidership(stationCode) {
    if (!WMATA_KEY || WMATA_KEY === 'YOUR_WMATA_PRIMARY_KEY_HERE') {
      return failResult('WMATA');
    }
    try {
      // Daily ridership - use station info endpoint
      var res = await fetch(
        'https://api.wmata.com/Rail.svc/json/jStationEntrances?StationCode=' + stationCode,
        { headers: { 'api_key': WMATA_KEY } }
      );
      if (!res.ok) throw new Error('WMATA ridership ' + res.status);
      // Ridership totals come from a different endpoint
      var rRes = await fetch(
        'https://api.wmata.com/Rail.svc/json/jStations?StationCode=' + stationCode,
        { headers: { 'api_key': WMATA_KEY } }
      );
      if (!rRes.ok) throw new Error('WMATA stations ' + rRes.status);
      var rData = await rRes.json();
      var station = rData.Stations && rData.Stations[0];
      return {
        value: station ? station.Name : stationCode,
        timestamp: now(),
        source: 'WMATA',
        ok: true,
        stationName: station ? station.Name : stationCode,
      };
    } catch (e) {
      console.warn('WMATA ridership failed:', e.message);
      return failResult('WMATA');
    }
  }

  // ── Load all live data for a county ──────────────────────
  async function loadAll(countyId) {
    var stations = countyId === 'loudoun' ? LOUDOUN_STATIONS : FAIRFAX_STATIONS;
    var results = await Promise.allSettled([
      fetchAirQuality(countyId === 'fairfax' ? '22102' : '20147'),
      fetchWeather(countyId),
      fetchWaterLevel(countyId),
      fetchPermits(countyId),
      fetchIncidents(),
    ]);

    return {
      air:      results[0].status === 'fulfilled' ? results[0].value : failResult('EPA AirNow'),
      weather:  results[1].status === 'fulfilled' ? results[1].value : failResult('NWS'),
      water:    results[2].status === 'fulfilled' ? results[2].value : failResult('USGS'),
      permits:  results[3].status === 'fulfilled' ? results[3].value : failResult('Open Data'),
      incidents:results[4].status === 'fulfilled' ? results[4].value : { incidents: [], ok: false },
      stations: stations,
      loadedAt: now(),
    };
  }

  return {
    loadAll: loadAll,
    fetchTrainPredictions: fetchTrainPredictions,
    fetchIncidents: fetchIncidents,
    LOUDOUN_STATIONS: LOUDOUN_STATIONS,
    FAIRFAX_STATIONS: FAIRFAX_STATIONS,
    setKey: function (k) { WMATA_KEY = k; },
  };
})();
