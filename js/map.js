// ── MAP MODULE ─────────────────────────────────────────────
// Leaflet + OpenStreetMap - no API key required
// District boundaries drawn as GeoJSON polygons

var NovaCivicMap = (function () {
  var map = null;
  var districtLayers = {};
  var activeLayer = null;

  function init() {
    if (map) { map.remove(); map = null; districtLayers = {}; activeLayer = null; }

    map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Dark OpenStreetMap tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Set view to show both counties
    map.setView([38.96, -77.46], 10);
  }

  function getCountyColor(countyId) {
    return countyId === 'loudoun' ? '#00c6ff' : '#f97316';
  }

  function drawDistricts(countyData, onClickFn) {
    // Clear existing layers
    Object.values(districtLayers).forEach(function (l) { map.removeLayer(l); });
    districtLayers = {};
    activeLayer = null;

    var color = getCountyColor(countyData.id);

    countyData.boundaries.forEach(function (b) {
      var district = countyData.districts.find(function (d) { return d.id === b.id; });
      if (!district) return;

      // Convert [lat, lon] coords to Leaflet format
      var latLngs = b.coords.map(function (c) { return [c[0], c[1]]; });

      var layer = L.polygon(latLngs, {
        color: color,
        fillColor: color,
        fillOpacity: 0.08,
        weight: 1.5,
        opacity: 0.5,
      });

      layer.on('click', function () {
        setActiveLayer(layer, color);
        if (onClickFn) onClickFn(b.id);
      });

      layer.on('mouseover', function () {
        if (layer !== activeLayer) {
          layer.setStyle({ fillOpacity: 0.18, weight: 2, opacity: 0.9 });
        }
        layer.bindTooltip(
          '<strong>' + district.name + '</strong><br>' +
          district.supervisor + '<br>' +
          'Pop. ' + Number(district.pop).toLocaleString(),
          { className: 'map-tooltip', sticky: true }
        ).openTooltip();
      });

      layer.on('mouseout', function () {
        if (layer !== activeLayer) {
          layer.setStyle({ fillOpacity: 0.08, weight: 1.5, opacity: 0.5 });
        }
      });

      layer.addTo(map);
      districtLayers[b.id] = layer;
    });
  }

  function setActiveLayer(layer, color) {
    // Reset previous
    if (activeLayer) {
      activeLayer.setStyle({ fillOpacity: 0.08, weight: 1.5, opacity: 0.5 });
    }
    activeLayer = layer;
    layer.setStyle({ fillOpacity: 0.28, weight: 2.5, opacity: 1, color: color, fillColor: color });
  }

  function highlightDistrict(districtId) {
    var layer = districtLayers[districtId];
    if (layer) {
      setActiveLayer(layer, getCountyColor(window.App ? window.App.activeCounty : 'loudoun'));
      var bounds = layer.getBounds();
      map.flyToBounds(bounds, { padding: [40, 40], duration: 0.6 });
    }
  }

  function showBothCounties() {
    map.setView([38.96, -77.46], 10);
  }

  return {
    init: init,
    drawDistricts: drawDistricts,
    highlightDistrict: highlightDistrict,
    showBothCounties: showBothCounties,
  };
})();
