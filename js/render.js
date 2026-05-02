// ── RENDER MODULE ──────────────────────────────────────────
// Pure render functions - no state, no side effects

var NovaCivicRender = (function () {

  // ── Ticker ───────────────────────────────────────────────
  function renderTicker(countyData) {
    var items = countyData.ticker;
    var doubled = items.concat(items); // seamless loop
    var html = doubled.map(function (t) {
      var cls = t.trend === 'up' ? 'up' : t.trend === 'down' ? 'down' : 'val';
      return '<span class="ticker-item">' + t.label + ' <span class="' + cls + '">' + t.value + '</span></span>';
    }).join('');
    var scroll = document.getElementById('tickerScroll');
    if (scroll) scroll.innerHTML = html;
    var label = document.getElementById('tickerLabel');
    if (label) {
      label.textContent = countyData.name.toUpperCase().replace(' COUNTY', '');
      label.style.background = countyData.color;
    }
  }

  // ── Stat counters ────────────────────────────────────────
  function animateCounter(el, target, duration) {
    duration = duration || 1100;
    var start = null;
    var isLarge = target > 999;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * ease);
      el.textContent = isLarge ? val.toLocaleString() : val;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderCounters(countyData) {
    var countyId = countyData.id;
    var isLoudoun = countyId === 'loudoun';
    var districtCount = countyData.districts.length;
    var dashCount = countyData.countyCards.length;
    var sourceCount = countyData.sources.length;
    var dataPoints = isLoudoun ? 2847 : 6120;

    var s1 = document.getElementById('s1');
    var s2 = document.getElementById('s2');
    var s3 = document.getElementById('s3');
    var s4 = document.getElementById('s4');
    if (s1) animateCounter(s1, districtCount);
    if (s2) animateCounter(s2, dashCount);
    if (s3) animateCounter(s3, dataPoints);
    if (s4) animateCounter(s4, sourceCount);
  }

  // ── District chips ───────────────────────────────────────
  function renderChips(countyData, activeId, onClickFn) {
    var wrap = document.getElementById('districtChips');
    if (!wrap) return;
    wrap.innerHTML = countyData.districts.map(function (d) {
      var isActive = d.id === activeId ? ' active' : '';
      return '<div class="chip' + isActive + '" data-did="' + d.id + '" onclick="App.selectDistrict(\'' + d.id + '\')">' +
        '<span class="chip-name">' + d.name + '</span>' +
        '<span class="chip-sub">' + d.tags[0] + '</span>' +
        '</div>';
    }).join('');
  }

  // ── District header ──────────────────────────────────────
  function renderDistrictHeader(district, countyData) {
    var el = document.getElementById('districtHeader');
    if (!el) return;
    var tagsHtml = [
      'SUPERVISOR: ' + district.supervisor,
      'POP. ' + Number(district.pop).toLocaleString(),
      countyData.name.toUpperCase(),
    ].map(function (t) { return '<span class="d-tag">' + t + '</span>'; }).join('');

    el.innerHTML =
      '<div>' +
        '<div class="district-name">' + district.name + ' District</div>' +
        '<div style="font-size:12px;color:var(--muted);margin-top:4px">' + district.tags.join(' · ') + '</div>' +
      '</div>' +
      '<div class="district-tags">' + tagsHtml + '</div>';
  }

  // ── Dashboard cards ──────────────────────────────────────
  function getBadgeClass(cadence) {
    var map = { live: 'badge-live', daily: 'badge-daily', weekly: 'badge-weekly', annual: 'badge-annual' };
    return map[cadence] || 'badge-daily';
  }

  function renderCards(countyData, districtId, scope) {
    var grid = document.getElementById('dashGrid');
    if (!grid) return;

    var district = countyData.districts.find(function (d) { return d.id === districtId; });

    grid.innerHTML = countyData.countyCards.map(function (c) {
      var isCountyWide = !c.districtVal;
      var showingDistrict = scope === 'district' && !isCountyWide;
      var value = showingDistrict ? c.districtVal : c.countyVal;
      var scopeNote = '';
      if (scope === 'district') {
        if (isCountyWide) {
          scopeNote = 'COUNTY-WIDE DATA · No district breakdown available';
        } else {
          scopeNote = district ? district.name.toUpperCase() + ' EST. · ' + c.districtNote.toUpperCase() : c.districtNote.toUpperCase();
        }
      } else {
        scopeNote = countyData.name.toUpperCase() + ' COUNTY-WIDE';
      }

      var max = Math.max.apply(null, c.spark);
      var barsHtml = c.spark.map(function (v) {
        var h = Math.max(3, Math.round((v / max) * 28));
        return '<div class="spark-bar" style="height:' + h + 'px"></div>';
      }).join('');

      return '<div class="dash-card" style="--card-color:' + c.color + '">' +
        '<span class="card-badge ' + getBadgeClass(c.cadence) + '">' + c.badge + '</span>' +
        '<span class="card-icon">' + c.icon + '</span>' +
        '<div class="card-title">' + c.title + '</div>' +
        '<div class="card-value">' + value + '</div>' +
        '<div class="card-sub">' + c.sub + '</div>' +
        '<div class="card-scope-note">' + scopeNote + '</div>' +
        '<div class="sparkline-wrap">' + barsHtml + '</div>' +
        '<div class="card-source">SOURCE: ' + c.source + '</div>' +
        '</div>';
    }).join('');
  }

  // ── Sources ──────────────────────────────────────────────
  function cadenceClass(c) {
    var map = { live: 'cadence-live', daily: 'cadence-daily', weekly: 'cadence-weekly', annual: 'cadence-annual' };
    return map[c] || 'cadence-daily';
  }

  function cadenceLabel(c) {
    var map = { live: 'LIVE', daily: 'DAILY', weekly: 'WEEKLY', annual: 'ANNUAL' };
    return map[c] || c.toUpperCase();
  }

  function renderSources(countyData, filter) {
    filter = filter || 'all';
    var grid = document.getElementById('sourcesGrid');
    if (!grid) return;

    var filtered = filter === 'all'
      ? countyData.sources
      : countyData.sources.filter(function (s) {
          return s.cadence === filter || s.tags.indexOf(filter) !== -1;
        });

    grid.innerHTML = filtered.map(function (s) {
      var powersHtml = s.powers.map(function (p) {
        return '<span class="source-tag">' + p + '</span>';
      }).join('');

      return '<div class="source-card">' +
        '<div class="source-top">' +
          '<div class="source-name">' + s.name + '</div>' +
          '<span class="source-cadence ' + cadenceClass(s.cadence) + '">' + cadenceLabel(s.cadence) + '</span>' +
        '</div>' +
        '<div class="source-powers">' + powersHtml + '</div>' +
        '<div class="source-desc">' + s.desc + '</div>' +
        '<div class="source-footer">' +
          '<span class="source-updated">Updated: ' + s.lastUpdated + '</span>' +
          '<a class="source-link" href="' + s.url + '" target="_blank" rel="noopener">OPEN PORTAL</a>' +
        '</div>' +
        '</div>';
    }).join('');

    var countEl = document.getElementById('sourcesCount');
    if (countEl) countEl.textContent = filtered.length + ' SOURCES';
  }

  // ── Votes ────────────────────────────────────────────────
  function renderVotes(countyData) {
    var grid = document.getElementById('voteGrid');
    if (!grid) return;
    grid.innerHTML = countyData.votes.map(function (v, i) {
      return '<div class="vote-item" onclick="NovaCivicRender.incrementVote(this,' + i + ')" data-pct="' + v.pct + '">' +
        '<div class="vote-title">' + v.title + '</div>' +
        '<div class="vote-bar-wrap"><div class="vote-bar" style="width:' + v.pct + '%"></div></div>' +
        '<div class="vote-count">' + v.pct + ' votes</div>' +
        '</div>';
    }).join('');
  }

  function incrementVote(el) {
    var bar = el.querySelector('.vote-bar');
    var countEl = el.querySelector('.vote-count');
    var current = parseInt(countEl.textContent);
    var newCount = current + 1;
    var newPct = Math.min(100, Math.round(newCount / (newCount + 20) * 100));
    countEl.textContent = newCount + ' votes';
    bar.style.width = newPct + '%';
  }

  // ── Freshness banner ─────────────────────────────────────
  function renderFreshness(countyData) {
    var el = document.getElementById('freshnessBar');
    if (!el) return;
    el.innerHTML =
      '<div class="freshness-item"><div class="freshness-dot"></div> LIVE DATA ACTIVE</div>' +
      '<div class="freshness-item">SOURCE: <strong>' + countyData.openDataUrl + '</strong></div>' +
      '<div class="freshness-item">DATA AS OF: <strong>' + countyData.lastUpdated + '</strong></div>' +
      '<div class="freshness-disclaimer">NOT AN OFFICIAL ' + countyData.name.toUpperCase() + ' WEBSITE</div>';
  }

  // ── Disclaimer ───────────────────────────────────────────
  function renderDisclaimer(countyData) {
    var el = document.getElementById('dataDisclaimer');
    if (!el) return;
    el.innerHTML =
      '<div class="disclaimer-box">' +
        '<div class="disclaimer-icon">⚠️</div>' +
        '<div class="disclaimer-text">' +
          '<strong>Data Transparency Notice:</strong> ' + countyData.dataNote + ' ' +
          'Open the <a href="' + countyData.openDataUrl + '" target="_blank" rel="noopener">' + countyData.openDataUrl + '</a> portal to verify any figure.' +
        '</div>' +
      '</div>';
  }

  // ── Hero metadata ─────────────────────────────────────────
  function renderHeroMeta(countyData) {
    var eyebrow = document.getElementById('heroEyebrow');
    if (eyebrow) eyebrow.textContent = countyData.name.toUpperCase() + ', ' + countyData.state.toUpperCase();
    var sub = document.getElementById('heroSub');
    if (sub) sub.innerHTML = countyData.tagline + '. <strong>Real data. Zero spin. Free forever.</strong>';
    var badge = document.getElementById('heroBadge');
    if (badge) badge.textContent = countyData.seat + ', ' + countyData.state + ' · Pop. ' + countyData.population;
  }

  return {
    renderTicker: renderTicker,
    renderCounters: renderCounters,
    renderChips: renderChips,
    renderDistrictHeader: renderDistrictHeader,
    renderCards: renderCards,
    renderSources: renderSources,
    renderVotes: renderVotes,
    renderFreshness: renderFreshness,
    renderDisclaimer: renderDisclaimer,
    renderHeroMeta: renderHeroMeta,
    incrementVote: incrementVote,
  };
})();
