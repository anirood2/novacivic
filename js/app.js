// ── APP MODULE ─────────────────────────────────────────────
// Core state machine - county switching, district selection,
// data scope toggle (county vs district)

var App = (function () {
  var state = {
    activeCounty: 'loudoun',
    activeDistrict: 'sycamore',
    dataScope: 'county',       // 'county' | 'district'
    sourcesFilter: 'all',
  };

  // ── County data lookup ──────────────────────────────────
  function getCountyData(id) {
    return id === 'loudoun' ? window.LOUDOUN : window.FAIRFAX;
  }

  function getActiveData() {
    return getCountyData(state.activeCounty);
  }

  // ── Apply county accent color to CSS vars ───────────────
  function applyAccent(countyData) {
    document.documentElement.style.setProperty('--accent', countyData.color);
    document.documentElement.style.setProperty('--accent-dark', countyData.accentDark);
  }

  // ── County switcher ──────────────────────────────────────
  function switchCounty(countyId) {
    if (countyId === state.activeCounty) return;
    state.activeCounty = countyId;

    // Default district
    var data = getCountyData(countyId);
    state.activeDistrict = data.districts[0].id;
    state.dataScope = 'county';

    applyAccent(data);
    renderAll();

    // Redraw map districts
    NovaCivicMap.drawDistricts(data, function (districtId) {
      selectDistrict(districtId);
    });
    NovaCivicMap.highlightDistrict(state.activeDistrict);

    // Update county tab UI
    document.querySelectorAll('.county-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.county === countyId);
    });

    // Update scope buttons
    setScopeUI('county');
  }

  // ── District selection ───────────────────────────────────
  function selectDistrict(districtId) {
    var data = getActiveData();
    var district = data.districts.find(function (d) { return d.id === districtId; });
    if (!district) return;

    state.activeDistrict = districtId;

    // Update chips
    document.querySelectorAll('.chip').forEach(function (c) {
      c.classList.toggle('active', c.dataset.did === districtId);
    });

    // Update district header
    NovaCivicRender.renderDistrictHeader(district, data);

    // Re-render cards with current scope
    NovaCivicRender.renderCards(data, districtId, state.dataScope);

    // Highlight on map
    NovaCivicMap.highlightDistrict(districtId);

    // Scroll to dashboards
    var el = document.getElementById('dashboards');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Scope toggle (county / district) ────────────────────
  function setScope(scope) {
    state.dataScope = scope;
    setScopeUI(scope);
    var data = getActiveData();
    NovaCivicRender.renderCards(data, state.activeDistrict, scope);
  }

  function setScopeUI(scope) {
    document.querySelectorAll('.scope-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.scope === scope);
    });
  }

  // ── Sources filter ───────────────────────────────────────
  function filterSources(filter, btn) {
    state.sourcesFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    if (btn) btn.classList.add('active');
    NovaCivicRender.renderSources(getActiveData(), filter);
  }

  // ── Full render ──────────────────────────────────────────
  function renderAll() {
    var data = getActiveData();
    var district = data.districts.find(function (d) { return d.id === state.activeDistrict; });

    NovaCivicRender.renderHeroMeta(data);
    NovaCivicRender.renderFreshness(data);
    NovaCivicRender.renderTicker(data);
    NovaCivicRender.renderCounters(data);
    NovaCivicRender.renderChips(data, state.activeDistrict);
    NovaCivicRender.renderDistrictHeader(district, data);
    NovaCivicRender.renderCards(data, state.activeDistrict, state.dataScope);
    NovaCivicRender.renderDisclaimer(data);
    NovaCivicRender.renderSources(data, state.sourcesFilter);
    NovaCivicRender.renderVotes(data);
  }

  // ── Boot ────────────────────────────────────────────────
  function init() {
    var data = getActiveData();
    applyAccent(data);
    renderAll();

    // Init map
    NovaCivicMap.init();
    NovaCivicMap.drawDistricts(data, function (districtId) {
      selectDistrict(districtId);
    });
    NovaCivicMap.highlightDistrict(state.activeDistrict);
  }

  return {
    init: init,
    switchCounty: switchCounty,
    selectDistrict: selectDistrict,
    setScope: setScope,
    filterSources: filterSources,
    activeCounty: function () { return state.activeCounty; },
  };
})();

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  App.init();
});
