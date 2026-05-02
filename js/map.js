// MAP MODULE
// Leaflet + CartoDB split tiles:
//   base  = dark_matter_nolabels  (dark roads/terrain, no text)
//   labels = dark_matter_only_labels (sits ABOVE polygons so names show)
// Gives dark aesthetic + full town/city/road label visibility.

var NovaCivicMap = (function () {
  var map = null;
  var labelLayer = null;
  var districtLayers = {};
  var labelMarkers = [];
  var activeLayer = null;
  var activeDistrictId = null;

  function centroid(coords) {
    var lat = 0, lon = 0;
    coords.forEach(function (c) { lat += c[0]; lon += c[1]; });
    return [lat / coords.length, lon / coords.length];
  }

  function getCountyColor(countyId) {
    return countyId === 'loudoun' ? '#00c6ff' : '#f97316';
  }

  function init() {
    if (map) { map.remove(); map = null; }
    districtLayers = {};
    labelMarkers = [];
    activeLayer = null;
    activeDistrictId = null;

    map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: false,
      minZoom: 9,
      maxZoom: 16,
    });

    // Base: dark tiles WITHOUT labels (polygons draw above this)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_matter_nolabels/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    ).addTo(map);

    map.setView([38.96, -77.46], 10);

    // Label layer - added AFTER polygons inside drawDistricts so labels show on top
    labelLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_matter_only_labels/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    );
  }

  function drawDistricts(countyData, onClickFn) {
    Object.keys(districtLayers).forEach(function (k) { map.removeLayer(districtLayers[k]); });
    labelMarkers.forEach(function (m) { map.removeLayer(m); });
    if (labelLayer) map.removeLayer(labelLayer);
    districtLayers = {};
    labelMarkers = [];
    activeLayer = null;
    activeDistrictId = null;

    var color = getCountyColor(countyData.id);

    countyData.boundaries.forEach(function (b) {
      var district = countyData.districts.find(function (d) { return d.id === b.id; });
      if (!district) return;

      var latLngs = b.coords.map(function (c) { return [c[0], c[1]]; });

      var layer = L.polygon(latLngs, {
        color: color,
        fillColor: color,
        fillOpacity: 0.12,
        weight: 2,
        opacity: 0.75,
      });

      // Rich hover tooltip
      var housing = countyData.countyCards.find(function (c) { return c.id === 'housing'; });
      var tooltipHtml =
        '<div class="map-tt">' +
          '<div class="map-tt-title">' + district.name + ' District</div>' +
          '<div class="map-tt-sup">' + district.supervisor + '</div>' +
          '<div class="map-tt-row"><span>Population</span><strong>' + Number(district.pop).toLocaleString() + '</strong></div>' +
          '<div class="map-tt-row"><span>Key areas</span><strong>' + district.tags.slice(0, 2).join(', ') + '</strong></div>' +
          (housing ? '<div class="map-tt-row"><span>Med. home price</span><strong>' + housing.countyVal + '</strong></div>' : '') +
          '<div class="map-tt-hint">Click to load dashboards</div>' +
        '</div>';

      layer.bindTooltip(tooltipHtml, {
        sticky: false,
        direction: 'top',
        offset: [0, -8],
        opacity: 1,
        className: 'map-tt-wrap',
      });

      layer.on('mouseover', function () {
        if (layer !== activeLayer) {
          layer.setStyle({ fillOpacity: 0.26, weight: 2.5, opacity: 1 });
        }
      });

      layer.on('mouseout', function () {
        if (layer !== activeLayer) {
          layer.setStyle({ fillOpacity: 0.12, weight: 2, opacity: 0.75 });
        }
      });

      layer.on('click', function () {
        setActiveLayer(b.id, layer, color);
        if (onClickFn) onClickFn(b.id);
      });

      layer.addTo(map);
      districtLayers[b.id] = layer;

      // Permanent district name label at centroid
      var c = centroid(b.coords);
      var icon = L.divIcon({
        className: '',
        html: '<div class="map-district-label" data-did="' + b.id + '">' +
                district.name.toUpperCase() +
              '</div>',
        iconSize: [130, 22],
        iconAnchor: [65, 11],
      });
      var marker = L.marker(c, { icon: icon, interactive: false });
      marker.addTo(map);
      labelMarkers.push(marker);
    });

    // Add label tile layer LAST so map text renders above polygons
    labelLayer.addTo(map);

    // Fly to county extent
    var allCoords = [];
    countyData.boundaries.forEach(function (b) {
      b.coords.forEach(function (c) { allCoords.push([c[0], c[1]]); });
    });
    if (allCoords.length) {
      var bounds = L.latLngBounds(allCoords);
      map.flyToBounds(bounds, { padding: [28, 28], duration: 0.8, maxZoom: 11 });
    }
  }

  function setActiveLayer(districtId, layer, color) {
    if (activeLayer) {
      activeLayer.setStyle({ fillOpacity: 0.12, weight: 2, opacity: 0.75 });
    }
    document.querySelectorAll('.map-district-label').forEach(function (el) {
      el.classList.remove('active');
      if (el.getAttribute('data-did') === districtId) el.classList.add('active');
    });
    activeLayer = layer;
    activeDistrictId = districtId;
    layer.setStyle({ fillOpacity: 0.32, weight: 3, opacity: 1, color: color, fillColor: color });
  }

  function highlightDistrict(districtId) {
    var layer = districtLayers[districtId];
    if (!layer) return;
    var color = getCountyColor(
      window.App && typeof window.App.activeCounty === 'function'
        ? window.App.activeCounty() : 'loudoun'
    );
    setActiveLayer(districtId, layer, color);
    map.flyToBounds(layer.getBounds(), { padding: [48, 48], duration: 0.7, maxZoom: 12 });
  }

  function showBothCounties() {
    if (map) map.setView([38.96, -77.46], 10);
  }

  return {
    init: init,
    drawDistricts: drawDistricts,
    highlightDistrict: highlightDistrict,
    showBothCounties: showBothCounties,
  };
})();
