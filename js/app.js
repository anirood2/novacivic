// app.js v3 - calls all new render sections
var App = (function () {
  var state = { activeCounty: 'loudoun', activeDistrict: 'sycamore', dataScope: 'county', sourcesFilter: 'all', liveData: null, loading: false };
  function getCountyData(id) { return id === 'loudoun' ? window.LOUDOUN : window.FAIRFAX; }
  function getActive() { return getCountyData(state.activeCounty); }
  function activeCounty() { return state.activeCounty; }
  function applyAccent(d) { document.documentElement.style.setProperty('--accent', d.color); document.documentElement.style.setProperty('--accent-dark', d.accentDark); }

  async function loadLiveData(countyId) {
    state.loading = true;
    try { var data = await NovaCivicAPI.loadAll(countyId); state.liveData = data; } catch(e) { console.warn('Live data failed:', e.message); state.liveData = null; }
    state.loading = false;
    var cd = getCountyData(countyId);
    NovaCivicRender.renderCards(cd, state.activeDistrict, state.dataScope, state.liveData);
    NovaCivicRender.renderTicker(cd, state.liveData);
    NovaCivicRender.renderFreshness(cd, state.liveData);
    NovaCivicRender.renderIncidents(state.liveData);
  }

  function switchCounty(countyId) {
    if (countyId === state.activeCounty) return;
    state.activeCounty = countyId; state.liveData = null; state.dataScope = 'county';
    var data = getCountyData(countyId);
    state.activeDistrict = data.districts[0].id;
    applyAccent(data);
    document.querySelectorAll('.county-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.county === countyId); });
    renderAll();
    NovaCivicMap.drawDistricts(data, function(id){ selectDistrict(id); });
    NovaCivicMap.highlightDistrict(state.activeDistrict);
    setScopeUI('county');
    loadLiveData(countyId);
  }

  function selectDistrict(districtId) {
    var data = getActive();
    var district = data.districts.find(function(d){ return d.id === districtId; });
    if (!district) return;
    state.activeDistrict = districtId;
    document.querySelectorAll('.chip').forEach(function(c){ c.classList.toggle('active', c.dataset.did === districtId); });
    NovaCivicRender.renderDistrictHeader(district, data);
    NovaCivicRender.renderCards(data, districtId, state.dataScope, state.liveData);
    NovaCivicMap.highlightDistrict(districtId);
    var el = document.getElementById('dashboards');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setScope(scope) {
    state.dataScope = scope; setScopeUI(scope);
    NovaCivicRender.renderCards(getActive(), state.activeDistrict, scope, state.liveData);
  }

  function setScopeUI(scope) {
    document.querySelectorAll('.scope-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.scope === scope); });
  }

  function filterSources(filter, btn) {
    state.sourcesFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    NovaCivicRender.renderSources(getActive(), filter);
  }

  function renderAll() {
    var data = getActive();
    var district = data.districts.find(function(d){ return d.id === state.activeDistrict; });
    NovaCivicRender.renderHeroMeta(data);
    NovaCivicRender.renderFreshness(data, state.liveData);
    NovaCivicRender.renderTicker(data, state.liveData);
    NovaCivicRender.renderCounters(data);
    NovaCivicRender.renderChips(data, state.activeDistrict);
    NovaCivicRender.renderDistrictHeader(district, data);
    NovaCivicRender.renderCards(data, state.activeDistrict, state.dataScope, state.liveData);
    NovaCivicRender.renderDataPledge(data);
    NovaCivicRender.renderDisclaimer(data);
    NovaCivicRender.renderSources(data, state.sourcesFilter);
    NovaCivicRender.renderLeadership(data);
    NovaCivicRender.renderServices(data);
    NovaCivicRender.renderLocalAlerts(data);
    NovaCivicRender.renderGovSchemes(data);
    NovaCivicRender.renderVotes(data);
    NovaCivicRender.renderIncidents(state.liveData);
  }

  function init() {
    var data = getActive();
    applyAccent(data);
    renderAll();
    NovaCivicMap.init();
    NovaCivicMap.drawDistricts(data, function(id){ selectDistrict(id); });
    NovaCivicMap.highlightDistrict(state.activeDistrict);
    loadLiveData(state.activeCounty);
  }

  return { init: init, switchCounty: switchCounty, selectDistrict: selectDistrict, setScope: setScope, filterSources: filterSources, activeCounty: activeCounty };
})();

function _novaCivicBoot() {
  if (typeof L === 'undefined' || typeof NovaCivicMap === 'undefined' || typeof NovaCivicRender === 'undefined' || typeof NovaCivicAPI === 'undefined') { setTimeout(_novaCivicBoot, 50); return; }
  App.init();
}
window.addEventListener('load', _novaCivicBoot);
