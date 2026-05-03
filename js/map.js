// map.js v2
// Split tile strategy: dark_matter_nolabels base + dark_matter_only_labels on top
// District polygons sit between the two tile layers so city/town names show through
// WMATA station markers show real-time train predictions on click

var NovaCivicMap = (function () {
  var map = null;
  var labelTileLayer = null;
  var districtLayers = {};
  var districtLabelMarkers = [];
  var stationMarkers = [];
  var activePolygon = null;
  var activeDistrictId = null;

  function centroid(coords) {
    var lat = 0, lon = 0, n = coords.length;
    coords.forEach(function (c) { lat += c[0]; lon += c[1]; });
    return [lat / n, lon / n];
  }

  function countyColor(countyId) {
    return countyId === 'loudoun' ? '#00c6ff' : '#f97316';
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    if (map) { map.remove(); map = null; }
    districtLayers = {};
    districtLabelMarkers = [];
    stationMarkers = [];
    activePolygon = null;
    activeDistrictId = null;

    map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: false,
      minZoom: 9,
      maxZoom: 16,
    });

    // Base: dark tiles, NO labels (polygons go on top of this)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_matter_nolabels/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    ).addTo(map);

    map.setView([38.96, -77.46], 10);

    // Label tile: text only, transparent bg - added AFTER polygons
    labelTileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_matter_only_labels/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    );
  }

  // ── Draw district polygons ───────────────────────────────
  function drawDistricts(countyData, onDistrictClick) {
    // Clear previous
    Object.keys(districtLayers).forEach(function (k) { map.removeLayer(districtLayers[k]); });
    districtLabelMarkers.forEach(function (m) { map.removeLayer(m); });
    stationMarkers.forEach(function (m) { map.removeLayer(m); });
    if (labelTileLayer) map.removeLayer(labelTileLayer);
    districtLayers = {};
    districtLabelMarkers = [];
    stationMarkers = [];
    activePolygon = null;
    activeDistrictId = null;

    var color = countyColor(countyData.id);

    countyData.boundaries.forEach(function (b) {
      var district = countyData.districts.find(function (d) { return d.id === b.id; });
      if (!district) return;

      var latLngs = b.coords.map(function (c) { return [c[0], c[1]]; });

      var poly = L.polygon(latLngs, {
        color: color,
        fillColor: color,
        fillOpacity: 0.10,
        weight: 2,
        opacity: 0.7,
      });

      // Rich tooltip
      var housing = countyData.cards.find(function (c) { return c.id === 'housing'; });
      poly.bindTooltip(
        '<div class="map-tt">' +
          '<div class="map-tt-name">' + district.name + ' District</div>' +
          '<div class="map-tt-super">' + district.supervisor + '</div>' +
          '<div class="map-tt-row"><span>Pop.</span><b>' + Number(district.pop).toLocaleString() + '</b></div>' +
          '<div class="map-tt-row"><span>Areas</span><b>' + district.tags.slice(0,2).join(', ') + '</b></div>' +
          (housing ? '<div class="map-tt-row"><span>Med. home</span><b>' + housing.countyVal + '</b></div>' : '') +
          '<div class="map-tt-cta">Click to load dashboards</div>' +
        '</div>',
        { sticky: false, direction: 'top', offset: [0,-8], opacity: 1, className: 'map-tt-wrap' }
      );

      poly.on('mouseover', function () {
        if (poly !== activePolygon) poly.setStyle({ fillOpacity: 0.24, weight: 2.5, opacity: 1 });
      });
      poly.on('mouseout', function () {
        if (poly !== activePolygon) poly.setStyle({ fillOpacity: 0.10, weight: 2, opacity: 0.7 });
      });
      poly.on('click', function () {
        activatePolygon(b.id, poly, color);
        if (onDistrictClick) onDistrictClick(b.id);
      });

      poly.addTo(map);
      districtLayers[b.id] = poly;

      // Permanent district label at centroid
      var c = centroid(b.coords);
      var labelIcon = L.divIcon({
        className: '',
        html: '<div class="map-dlabel" data-did="' + b.id + '">' + district.name.toUpperCase() + '</div>',
        iconSize: [130, 20],
        iconAnchor: [65, 10],
      });
      var lm = L.marker(c, { icon: labelIcon, interactive: false });
      lm.addTo(map);
      districtLabelMarkers.push(lm);
    });

    // Labels tile on top of polygons so city/town names are readable
    labelTileLayer.addTo(map);

    // WMATA station markers on top of everything
    drawStationMarkers(countyData);

    // Fly to county bounds
    var all = [];
    countyData.boundaries.forEach(function (b) {
      b.coords.forEach(function (c) { all.push([c[0], c[1]]); });
    });
    if (all.length) {
      map.flyToBounds(L.latLngBounds(all), { padding: [28,28], duration: 0.8, maxZoom: 11 });
    }
  }

  // ── WMATA station markers ────────────────────────────────
  function drawStationMarkers(countyData) {
    var stations = countyData.id === 'loudoun'
      ? NovaCivicAPI.LOUDOUN_STATIONS
      : NovaCivicAPI.FAIRFAX_STATIONS;

    stations.forEach(function (station) {
      var icon = L.divIcon({
        className: '',
        html: '<div class="map-station-marker" data-code="' + station.code + '">' +
                '<div class="map-station-dot"></div>' +
                '<div class="map-station-name">' + station.name + '</div>' +
              '</div>',
        iconSize: [120, 36],
        iconAnchor: [60, 8],
      });

      var marker = L.marker([station.lat, station.lon], { icon: icon, zIndexOffset: 1000 });

      marker.on('click', function () {
        showStationPopup(station, marker);
      });

      marker.addTo(map);
      stationMarkers.push(marker);
    });
  }

  // ── Station prediction popup ──────────────────────────────
  async function showStationPopup(station, marker) {
    // Show loading state immediately
    var loadingHtml =
      '<div class="map-station-popup">' +
        '<div class="msp-header">' +
          '<span class="msp-icon">🚇</span>' +
          '<div>' +
            '<div class="msp-name">' + station.name + '</div>' +
            '<div class="msp-line">Silver Line</div>' +
          '</div>' +
        '</div>' +
        '<div class="msp-loading">Fetching live arrivals...</div>' +
      '</div>';

    var popup = L.popup({ className: 'station-popup-wrap', maxWidth: 260, offset: [0, -10] })
      .setLatLng([station.lat, station.lon])
      .setContent(loadingHtml)
      .openOn(map);

    // Fetch real predictions
    var result = await NovaCivicAPI.fetchTrainPredictions(station.code);

    var content;
    if (!result.ok && result.reason === 'no-key') {
      content =
        '<div class="map-station-popup">' +
          '<div class="msp-header">' +
            '<span class="msp-icon">🚇</span>' +
            '<div>' +
              '<div class="msp-name">' + station.name + '</div>' +
              '<div class="msp-line">Silver Line</div>' +
            '</div>' +
          '</div>' +
          '<div class="msp-no-key">' +
            'Add your WMATA key to js/api.js to see live predictions.' +
          '</div>' +
          '<div class="msp-link"><a href="https://developer.wmata.com" target="_blank">Get a free key</a></div>' +
        '</div>';
    } else if (!result.ok || !result.predictions.length) {
      content =
        '<div class="map-station-popup">' +
          '<div class="msp-header">' +
            '<span class="msp-icon">🚇</span>' +
            '<div>' +
              '<div class="msp-name">' + station.name + '</div>' +
              '<div class="msp-line">Silver Line</div>' +
            '</div>' +
          '</div>' +
          '<div class="msp-no-trains">No trains currently predicted.<br>Service may be limited.</div>' +
          '<div class="msp-ts">As of ' + result.timestamp + '</div>' +
        '</div>';
    } else {
      var trainsHtml = result.predictions.map(function (t) {
        var minClass = t.minutes === 'Boarding' ? 'brd' : t.minutes === 'Arriving' ? 'arr' : '';
        return '<div class="msp-train">' +
          '<div class="msp-train-line sv">SV</div>' +
          '<div class="msp-train-dest">' + (t.destination || 'Unknown') + '</div>' +
          '<div class="msp-train-min ' + minClass + '">' + t.minutes + '</div>' +
        '</div>';
      }).join('');

      content =
        '<div class="map-station-popup">' +
          '<div class="msp-header">' +
            '<span class="msp-icon">🚇</span>' +
            '<div>' +
              '<div class="msp-name">' + station.name + '</div>' +
              '<div class="msp-line">Silver Line</div>' +
            '</div>' +
          '</div>' +
          '<div class="msp-trains-label">NEXT TRAINS</div>' +
          '<div class="msp-trains">' + trainsHtml + '</div>' +
          '<div class="msp-ts">Live as of ' + result.timestamp + '</div>' +
        '</div>';
    }

    popup.setContent(content);
  }

  // ── Activate polygon ─────────────────────────────────────
  function activatePolygon(districtId, poly, color) {
    if (activePolygon) {
      activePolygon.setStyle({ fillOpacity: 0.10, weight: 2, opacity: 0.7 });
    }
    document.querySelectorAll('.map-dlabel').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-did') === districtId);
    });
    activePolygon = poly;
    activeDistrictId = districtId;
    poly.setStyle({ fillOpacity: 0.30, weight: 3, opacity: 1, color: color, fillColor: color });
  }

  function highlightDistrict(districtId) {
    var poly = districtLayers[districtId];
    if (!poly) return;
    var color = countyColor(
      window.App && typeof window.App.activeCounty === 'function'
        ? window.App.activeCounty() : 'loudoun'
    );
    activatePolygon(districtId, poly, color);
    map.flyToBounds(poly.getBounds(), { padding: [48,48], duration: 0.7, maxZoom: 12 });
  }

  return {
    init: init,
    drawDistricts: drawDistricts,
    highlightDistrict: highlightDistrict,
  };
})();
