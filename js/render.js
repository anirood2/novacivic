// render.js v2
// Renders all DOM sections. Cards show honest tier badges:
//   LIVE    = fetched from real API this session, timestamp shown
//   TODAY   = fetched from open data API today
//   PUBLISHED [Date] = static, published by source on that date

var NovaCivicRender = (function () {

  // ── Ticker ───────────────────────────────────────────────
  function renderTicker(countyData, liveData) {
    var items = [];

    if (liveData) {
      if (liveData.weather && liveData.weather.ok) {
        items.push({ label: 'Weather', value: liveData.weather.value + ' ' + liveData.weather.description, cls: '' });
      }
      if (liveData.air && liveData.air.ok) {
        var aqiNum = parseInt(liveData.air.value);
        var cls = aqiNum < 51 ? 'up' : aqiNum < 101 ? '' : 'dn';
        items.push({ label: 'Air Quality', value: 'AQI ' + liveData.air.value + ' ' + liveData.air.label, cls: cls });
      }
      if (liveData.water && liveData.water.ok) {
        items.push({ label: liveData.water.name, value: liveData.water.value + ' gage ht', cls: '' });
      }
      if (liveData.permits && liveData.permits.ok) {
        items.push({ label: 'Active Permits', value: liveData.permits.value, cls: 'up' });
      }
      if (liveData.incidents && liveData.incidents.incidents && liveData.incidents.incidents.length) {
        items.push({ label: 'Silver Line Alert', value: liveData.incidents.incidents[0].Description, cls: 'dn' });
      }
    }

    // Static items from county data cards
    countyData.cards.filter(function (c) { return c.tier === 'published'; }).forEach(function (c) {
      items.push({ label: c.title, value: c.countyVal, cls: '' });
    });

    // Double for seamless loop
    var doubled = items.concat(items);
    var html = doubled.map(function (t) {
      return '<span class="ticker-item">' + t.label + ' <span class="' + t.cls + '">' + t.value + '</span></span>';
    }).join('');

    var el = document.getElementById('tickerScroll');
    if (el) el.innerHTML = html || '<span class="ticker-item">Loading live data...</span>';

    var label = document.getElementById('tickerLabel');
    if (label) {
      label.textContent = countyData.name.replace(' County','').toUpperCase();
      label.style.background = countyData.color;
    }
  }

  // ── Counter animation ────────────────────────────────────
  function animateCounter(el, target, duration) {
    if (!el) return;
    duration = duration || 1000;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderCounters(countyData) {
    animateCounter(document.getElementById('s1'), countyData.districts.length);
    animateCounter(document.getElementById('s2'), countyData.cards.length);
    var liveCount = countyData.cards.filter(function (c) { return c.tier === 'live'; }).length;
    animateCounter(document.getElementById('s3'), liveCount);
    animateCounter(document.getElementById('s4'), countyData.sources.length);
  }

  // ── District chips ───────────────────────────────────────
  function renderChips(countyData, activeId) {
    var wrap = document.getElementById('districtChips');
    if (!wrap) return;
    wrap.innerHTML = countyData.districts.map(function (d) {
      var active = d.id === activeId ? ' active' : '';
      return '<div class="chip' + active + '" data-did="' + d.id + '" onclick="App.selectDistrict(\'' + d.id + '\')">' +
        '<span class="chip-name">' + d.name + '</span>' +
        '<span class="chip-sub">' + d.tags[0] + '</span>' +
      '</div>';
    }).join('');
  }

  // ── District header ──────────────────────────────────────
  function renderDistrictHeader(district, countyData) {
    var el = document.getElementById('districtHeader');
    if (!el) return;
    el.innerHTML =
      '<div>' +
        '<div class="district-name">' + district.name + ' District</div>' +
        '<div style="font-size:12px;color:var(--muted);margin-top:4px">' + district.tags.join(' · ') + '</div>' +
      '</div>' +
      '<div class="district-tags">' +
        '<span class="d-tag">SUPERVISOR: ' + district.supervisor + '</span>' +
        '<span class="d-tag">POP. ' + Number(district.pop).toLocaleString() + '</span>' +
        '<span class="d-tag">' + countyData.name.toUpperCase() + '</span>' +
      '</div>';
  }

  // ── Tier badge HTML ──────────────────────────────────────
  function tierBadge(card) {
    if (card.tier === 'live') {
      return '<span class="card-badge badge-live">LIVE</span>';
    }
    if (card.tier === 'today') {
      return '<span class="card-badge badge-today">TODAY</span>';
    }
    return '<span class="card-badge badge-published">PUB ' + (card.publishedDate || '') + '</span>';
  }

  // ── Cards ────────────────────────────────────────────────
  function renderCards(countyData, districtId, scope, liveData) {
    var grid = document.getElementById('dashGrid');
    if (!grid) return;

    var district = countyData.districts.find(function (d) { return d.id === districtId; });

    grid.innerHTML = countyData.cards.map(function (c) {
      // Determine displayed value
      var value, scopeNote, isLoading = false;

      if (c.tier === 'live' || c.tier === 'today') {
        if (liveData && liveData[c.liveKey] && liveData[c.liveKey].ok) {
          var ld = liveData[c.liveKey];
          if (c.id === 'air') {
            value = 'AQI ' + ld.value;
            scopeNote = ld.label + ' (' + ld.pollutant + ') · ' + ld.timestamp;
          } else if (c.id === 'weather') {
            value = ld.value;
            scopeNote = ld.description + ' · ' + ld.timestamp;
          } else if (c.id === 'water') {
            value = ld.value;
            scopeNote = ld.name + ' · ' + ld.timestamp;
          } else if (c.id === 'permits') {
            value = ld.value;
            scopeNote = 'Pulled ' + ld.timestamp + ' from open data portal';
          } else if (c.id === 'metro') {
            value = 'See map';
            scopeNote = 'Click a station marker for live arrivals';
          } else {
            value = ld.value;
            scopeNote = 'As of ' + ld.timestamp;
          }
        } else {
          value = '--';
          scopeNote = c.tier === 'live' ? 'Fetching live data...' : 'Loading from open data...';
          isLoading = true;
        }
      } else {
        // published
        if (scope === 'district' && c.districtVal) {
          value = c.districtVal;
          scopeNote = district ? district.name + ' EST. · ' + (c.districtNote || '') : c.districtNote || '';
        } else if (scope === 'district' && !c.districtVal) {
          value = c.countyVal;
          scopeNote = 'County-wide · No district breakdown available';
        } else {
          value = c.countyVal;
          scopeNote = countyData.name + ' county-wide';
        }
      }

      var max = Math.max.apply(null, c.spark);
      var bars = c.spark.map(function (v) {
        var h = Math.max(3, Math.round((v / max) * 26));
        return '<div class="spark-bar" style="height:' + h + 'px"></div>';
      }).join('');

      return '<div class="dash-card' + (isLoading ? ' loading' : '') + '" style="--card-color:' + c.color + '">' +
        tierBadge(c) +
        '<span class="card-icon">' + c.icon + '</span>' +
        '<div class="card-title">' + c.title + '</div>' +
        '<div class="card-value">' + value + '</div>' +
        '<div class="card-sub">' + c.sub + '</div>' +
        '<div class="card-scope-note">' + scopeNote + '</div>' +
        '<div class="sparkline-wrap">' + bars + '</div>' +
        '<a class="card-source" href="' + c.sourceUrl + '" target="_blank" rel="noopener">SOURCE: ' + c.source + '</a>' +
      '</div>';
    }).join('');
  }

  // ── Update a single live card after API resolves ─────────
  function patchLiveCards(countyData, districtId, scope, liveData) {
    // Re-render full grid with live data now available
    renderCards(countyData, districtId, scope, liveData);
  }

  // ── Freshness banner ─────────────────────────────────────
  function renderFreshness(countyData, liveData) {
    var el = document.getElementById('freshnessBar');
    if (!el) return;

    var liveTs = liveData ? liveData.loadedAt : null;
    var liveStatus = liveTs
      ? '<strong>' + liveTs + '</strong>'
      : 'Loading...';

    el.innerHTML =
      '<div class="freshness-item"><div class="freshness-dot"></div>LIVE APIs ACTIVE</div>' +
      '<div class="freshness-item">Live data fetched: ' + liveStatus + '</div>' +
      '<div class="freshness-item">Open data: <strong>' + countyData.openDataUrl + '</strong></div>' +
      '<div class="freshness-disclaimer">NOT AN OFFICIAL ' + countyData.name.toUpperCase() + ' WEBSITE</div>';
  }

  // ── Incidents banner ─────────────────────────────────────
  function renderIncidents(liveData) {
    var el = document.getElementById('incidentsBanner');
    if (!el) return;
    if (!liveData || !liveData.incidents || !liveData.incidents.incidents || !liveData.incidents.incidents.length) {
      el.style.display = 'none';
      return;
    }
    el.style.display = 'flex';
    el.innerHTML = liveData.incidents.incidents.map(function (i) {
      return '<div class="incident-item">🚨 <strong>Silver Line:</strong> ' + i.Description + '</div>';
    }).join('');
  }

  // ── Disclaimer ───────────────────────────────────────────
  function renderDisclaimer(countyData) {
    var el = document.getElementById('dataDisclaimer');
    if (!el) return;
    el.innerHTML =
      '<div class="disclaimer-box">' +
        '<div class="disclaimer-icon">📋</div>' +
        '<div class="disclaimer-text">' +
          '<strong>Data Transparency:</strong> ' + countyData.dataNote + ' ' +
          'Verify any figure at <a href="' + countyData.openDataUrl + '" target="_blank">' + countyData.openDataUrl + '</a>.' +
        '</div>' +
      '</div>';
  }

  // ── Sources ──────────────────────────────────────────────
  function cadenceBadge(c) {
    if (c === 'live')      return '<span class="source-cadence cadence-live">LIVE</span>';
    if (c === 'today')     return '<span class="source-cadence cadence-today">TODAY</span>';
    return '<span class="source-cadence cadence-pub">PUBLISHED</span>';
  }

  function renderSources(countyData, filter) {
    filter = filter || 'all';
    var grid = document.getElementById('sourcesGrid');
    if (!grid) return;
    var filtered = filter === 'all'
      ? countyData.sources
      : countyData.sources.filter(function (s) {
          return s.cadence === filter || (s.tags && s.tags.indexOf(filter) !== -1);
        });

    grid.innerHTML = filtered.map(function (s) {
      return '<div class="source-card">' +
        '<div class="source-top">' +
          '<div class="source-name">' + s.name + '</div>' +
          cadenceBadge(s.cadence) +
        '</div>' +
        '<div class="source-powers">' + s.powers.map(function (p) {
          return '<span class="source-tag">' + p + '</span>';
        }).join('') + '</div>' +
        '<div class="source-desc">' + s.desc + '</div>' +
        '<div class="source-footer">' +
          '<span class="source-updated">Last updated: ' + s.lastUpdated + '</span>' +
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
    grid.innerHTML = countyData.votes.map(function (v) {
      return '<div class="vote-item" onclick="NovaCivicRender.incrementVote(this)">' +
        '<div class="vote-title">' + v.title + '</div>' +
        '<div class="vote-bar-wrap"><div class="vote-bar" style="width:' + v.pct + '%"></div></div>' +
        '<div class="vote-count">' + v.pct + ' votes · tap to upvote</div>' +
      '</div>';
    }).join('');
  }

  function incrementVote(el) {
    var bar = el.querySelector('.vote-bar');
    var countEl = el.querySelector('.vote-count');
    var current = parseInt(countEl.textContent);
    var newCount = current + 1;
    var newPct = Math.min(99, Math.round(newCount / (newCount + 18) * 100));
    countEl.textContent = newCount + ' votes · tap to upvote';
    if (bar) bar.style.width = newPct + '%';
  }

  // ── Hero meta ────────────────────────────────────────────
  function renderHeroMeta(countyData) {
    var ey = document.getElementById('heroEyebrow');
    if (ey) ey.textContent = countyData.name.toUpperCase() + ', ' + countyData.state.toUpperCase();
    var sub = document.getElementById('heroSub');
    if (sub) sub.innerHTML = countyData.tagline + '. <strong>Real data. Zero spin. Free forever.</strong>';
    var badge = document.getElementById('heroBadge');
    if (badge) badge.textContent = countyData.seat + ', ' + countyData.state + ' · Pop. ' + countyData.population + ' (' + countyData.populationYear + ' ACS)';
  }

  return {
    renderTicker: renderTicker,
    renderCounters: renderCounters,
    renderChips: renderChips,
    renderDistrictHeader: renderDistrictHeader,
    renderCards: renderCards,
    patchLiveCards: patchLiveCards,
    renderFreshness: renderFreshness,
    renderIncidents: renderIncidents,
    renderDisclaimer: renderDisclaimer,
    renderSources: renderSources,
    renderVotes: renderVotes,
    renderHeroMeta: renderHeroMeta,
    incrementVote: incrementVote,
  };
})();
