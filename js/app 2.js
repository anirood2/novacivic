// app.js v2
// Core state machine. Loads live API data async on county switch.
// Cards render immediately with '--' placeholders, then patch when APIs resolve.

var App = (function () {
  var state = {
    activeCounty: 'loudoun',
    activeDistrict: 'sycamore',
    dataScope: 'county',
    sourcesFilter: 'all',
    liveData: null,
    loading: false,
  };

  function getCountyData(id) {
    return id === 'loudoun' ? window.LOUDOUN : window.FAIRFAX;
  }

  function getActive() { return getCountyData(state.activeCounty); }

  function activeCounty() { return state.activeCounty; }

  function applyAccent(countyData) {
    document.documentElement.style.setProperty('--accent', countyData.color);
    document.documentElement.style.setProperty('--accent-dark', countyData.accentDark);
  }

  // ── Load live data async ─────────────────────────────────
  async function loadLiveData(countyId) {
    state.loading = true;
    try {
      var data = await NovaCivicAPI.loadAll(countyId);
      state.liveData = data;
    } catch (e) {
      console.warn('Live data load failed:', e.message);
      state.liveData = null;
    }
    state.loading = false;

    // Patch cards + ticker + freshness with real data
    var countyData = getCountyData(countyId);
    NovaCivicRender.renderCards(countyData, state.activeDistrict, state.dataScope, state.liveData);
    NovaCivicRender.renderTicker(countyData, state.liveData);
    NovaCivicRender.renderFreshness(countyData, state.liveData);
    NovaCivicRender.renderIncidents(state.liveData);
  }

  // ── County switch ────────────────────────────────────────
  function switchCounty(countyId) {
    if (countyId === state.activeCounty) return;
    state.activeCounty = countyId;
    state.liveData = null;
    state.dataScope = 'county';

    var data = getCountyData(countyId);
    state.activeDistrict = data.districts[0].id;

    applyAccent(data);

    // Update tab UI
    document.querySelectorAll('.county-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.county === countyId);
    });

    // Render with placeholders immediately
    renderAll();

    // Redraw map
    NovaCivicMap.drawDistricts(data, function (id) { selectDistrict(id); });
    NovaCivicMap.highlightDistrict(state.activeDistrict);

    setScopeUI('county');

    // Kick off live data load
    loadLiveData(countyId);
  }

  // ── District select ──────────────────────────────────────
  function selectDistrict(districtId) {
    var data = getActive();
    var district = data.districts.find(function (d) { return d.id === districtId; });
    if (!district) return;

    state.activeDistrict = districtId;

    document.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('active', c.dataset.did === districtId);
    });

    NovaCivicRender.renderDistrictHeader(district, data);
    NovaCivicRender.renderCards(data, districtId, state.dataScope, state.liveData);
    NovaCivicMap.highlightDistrict(districtId);

    var el = document.getElementById('dashboards');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Scope toggle ─────────────────────────────────────────
  function setScope(scope) {
    state.dataScope = scope;
    setScopeUI(scope);
    NovaCivicRender.renderCards(getActive(), state.activeDistrict, scope, state.liveData);
  }

  function setScopeUI(scope) {
    document.querySelectorAll('.scope-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.scope === scope);
    });
  }

  // ── Sources filter ───────────────────────────────────────
  function filterSources(filter, btn) {
    state.sourcesFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    NovaCivicRender.renderSources(getActive(), filter);
  }

  // ── Full render (with placeholder live values) ───────────
  function renderAll() {
    var data = getActive();
    var district = data.districts.find(function (d) { return d.id === state.activeDistrict; });

    NovaCivicRender.renderHeroMeta(data);
    NovaCivicRender.renderFreshness(data, state.liveData);
    NovaCivicRender.renderTicker(data, state.liveData);
    NovaCivicRender.renderCounters(data);
    NovaCivicRender.renderChips(data, state.activeDistrict);
    NovaCivicRender.renderDistrictHeader(district, data);
    NovaCivicRender.renderCards(data, state.activeDistrict, state.dataScope, state.liveData);
    NovaCivicRender.renderDisclaimer(data);
    NovaCivicRender.renderSources(data, state.sourcesFilter);
    NovaCivicRender.renderVotes(data);
    NovaCivicRender.renderIncidents(state.liveData);
  }

  // ── Boot ─────────────────────────────────────────────────
  function init() {
    var data = getActive();
    applyAccent(data);

    // Render immediately with placeholders
    renderAll();

    // Map
    NovaCivicMap.init();
    NovaCivicMap.drawDistricts(data, function (id) { selectDistrict(id); });
    NovaCivicMap.highlightDistrict(state.activeDistrict);

    // Load live data in background
    loadLiveData(state.activeCounty);
  }

  return {
    init: init,
    switchCounty: switchCounty,
    selectDistrict: selectDistrict,
    setScope: setScope,
    filterSources: filterSources,
    activeCounty: activeCounty,
  };
})();

// Use window.onload instead of DOMContentLoaded to ensure Leaflet
// and all external scripts are fully loaded before App.init() runs.
// This fixes the mobile Safari timing bug where DOMContentLoaded
// fires before external scripts (Leaflet) finish loading.
function _novaCivicBoot() {
  if (typeof L === 'undefined') {
    // Leaflet not ready yet - wait and retry
    setTimeout(_novaCivicBoot, 50);
    return;
  }
  if (typeof NovaCivicMap === 'undefined' || typeof NovaCivicRender === 'undefined' || typeof NovaCivicAPI === 'undefined') {
    setTimeout(_novaCivicBoot, 50);
    return;
  }
  App.init();
}

window.addEventListener('load', _novaCivicBoot);
