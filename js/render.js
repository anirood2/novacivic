// render.js v3
// New sections: leadership, services, local alerts, gov schemes, method tags, data pledge

var NovaCivicRender = (function () {

  // ── Ticker ───────────────────────────────────────────────
  function renderTicker(countyData, liveData) {
    var items = [];
    if (liveData) {
      if (liveData.weather && liveData.weather.ok) items.push({ label: 'Weather', value: liveData.weather.value + ' ' + liveData.weather.description, cls: '' });
      if (liveData.air && liveData.air.ok) {
        var aqiNum = parseInt(liveData.air.value);
        items.push({ label: 'Air Quality', value: 'AQI ' + liveData.air.value + ' ' + liveData.air.label, cls: aqiNum < 51 ? 'up' : '' });
      }
      if (liveData.water && liveData.water.ok) items.push({ label: liveData.water.name || 'Stream Gauge', value: liveData.water.value, cls: '' });
      if (liveData.permits && liveData.permits.ok) items.push({ label: 'Active Permits', value: liveData.permits.value, cls: 'up' });
      if (liveData.outages && liveData.outages.ok) items.push({ label: 'Power Outages', value: liveData.outages.value, cls: liveData.outages.total > 100 ? 'dn' : '' });
      if (liveData.incidents && liveData.incidents.incidents && liveData.incidents.incidents.length) {
        items.push({ label: 'Silver Line Alert', value: liveData.incidents.incidents[0].Description, cls: 'dn' });
      }
    }
    countyData.cards.filter(function(c){ return c.tier === 'published'; }).forEach(function(c) {
      items.push({ label: c.title, value: c.countyVal, cls: '' });
    });
    var doubled = items.concat(items);
    var html = doubled.map(function(t) {
      return '<span class="ticker-item">' + t.label + ' <span class="' + (t.cls||'') + '">' + t.value + '</span></span>';
    }).join('');
    var el = document.getElementById('tickerScroll');
    if (el) el.innerHTML = html || '<span class="ticker-item">Loading live data...</span>';
    var label = document.getElementById('tickerLabel');
    if (label) { label.textContent = countyData.name.replace(' County','').toUpperCase(); label.style.background = countyData.color; }
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
    var c = countyData.counters;
    if (!c) return;
    animateCounter(document.getElementById('s1'), c.s1.val);
    animateCounter(document.getElementById('s2'), c.s2.val);
    animateCounter(document.getElementById('s3'), c.s3.val);
    animateCounter(document.getElementById('s4'), c.s4.val);
    var defs = [
      { id: 's1', label: c.s1.label }, { id: 's2', label: c.s2.label },
      { id: 's3', label: c.s3.label }, { id: 's4', label: c.s4.label },
    ];
    defs.forEach(function(l) {
      var el = document.getElementById(l.id);
      if (el && el.parentElement) {
        var lbl = el.parentElement.querySelector('.stat-label');
        if (lbl) lbl.textContent = l.label;
      }
    });
  }

  // ── District chips ───────────────────────────────────────
  function renderChips(countyData, activeId) {
    var wrap = document.getElementById('districtChips');
    if (!wrap) return;
    wrap.innerHTML = countyData.districts.map(function(d) {
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
        '<span class="d-tag">ELECTED: ' + (district.elected || 'N/A') + '</span>' +
        '<span class="d-tag">NEXT: ' + (district.nextElection || 'N/A') + '</span>' +
      '</div>';
  }

  // ── Method tag HTML ──────────────────────────────────────
  function methodTag(method) {
    var colors = {
      'LIVE API':      'rgba(34,197,94,0.15)',
      'OPEN DATA API': 'rgba(0,198,255,0.1)',
      'API':           'rgba(0,198,255,0.08)',
      'COLLECTED':     'rgba(251,191,36,0.1)',
      'PDF':           'rgba(249,115,22,0.1)',
      'STATIC':        'rgba(107,127,163,0.1)',
    };
    var textColors = {
      'LIVE API':      '#22c55e',
      'OPEN DATA API': '#00c6ff',
      'API':           '#00c6ff',
      'COLLECTED':     '#fbbf24',
      'PDF':           '#fb923c',
      'STATIC':        '#6b7fa3',
    };
    var m = method || 'STATIC';
    return '<span style="font-family:var(--mono);font-size:8px;padding:1px 5px;border-radius:2px;background:' +
      (colors[m]||'rgba(107,127,163,0.1)') + ';color:' + (textColors[m]||'#6b7fa3') + '">' + m + '</span>';
  }

  // ── Tier badge ───────────────────────────────────────────
  function tierBadge(card) {
    if (card.tier === 'live')      return '<span class="card-badge badge-live">LIVE</span>';
    if (card.tier === 'today')     return '<span class="card-badge badge-today">TODAY</span>';
    return '<span class="card-badge badge-published">PUB ' + (card.publishedDate || '') + '</span>';
  }

  // ── Cards ────────────────────────────────────────────────
  function renderCards(countyData, districtId, scope, liveData) {
    var grid = document.getElementById('dashGrid');
    if (!grid) return;
    var district = countyData.districts.find(function(d){ return d.id === districtId; });

    grid.innerHTML = countyData.cards.map(function(c) {
      var value, scopeNote, isLoading = false;
      if (c.tier === 'live' || c.tier === 'today') {
        if (liveData && liveData[c.liveKey] && liveData[c.liveKey].ok) {
          var ld = liveData[c.liveKey];
          if (c.id === 'air')     { value = 'AQI ' + ld.value; scopeNote = (ld.label||'') + ' (' + (ld.pollutant||'') + ') · ' + ld.timestamp; }
          else if (c.id === 'weather') { value = ld.value; scopeNote = (ld.description||'') + ' · ' + ld.timestamp; }
          else if (c.id === 'water')   { value = ld.value; scopeNote = (ld.name||'Gauge') + ' · ' + ld.timestamp; }
          else if (c.id === 'permits') { value = ld.value; scopeNote = 'Pulled ' + ld.timestamp + ' from open data portal'; }
          else if (c.id === 'metro')   { value = 'See map'; scopeNote = 'Click a station marker for live arrivals'; }
          else if (c.id === 'outages') { value = ld.value; scopeNote = 'Dominion Energy · ' + ld.timestamp; }
          else { value = ld.value; scopeNote = 'As of ' + ld.timestamp; }
        } else {
          value = '--'; scopeNote = c.tier === 'live' ? 'Fetching live data...' : 'Loading from open data...'; isLoading = true;
        }
      } else {
        if (scope === 'district' && c.districtVal) {
          value = c.districtVal;
          scopeNote = district ? district.name + ' EST. · ' + (c.districtNote||'') : (c.districtNote||'');
        } else if (scope === 'district' && !c.districtVal) {
          value = c.countyVal; scopeNote = 'County-wide data only';
        } else {
          value = c.countyVal; scopeNote = countyData.name + ' county-wide';
        }
      }
      // ── Sparkline with axes ──────────────────────────────
      var spark = c.spark;
      var min = Math.min.apply(null, spark);
      var max = Math.max.apply(null, spark);
      var first = spark[0], last = spark[spark.length-1];
      var delta = last - first;
      var trendArrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
      var trendCls   = delta > 0 ? 'trend-up' : delta < 0 ? 'trend-dn' : 'trend-flat';
      // Format a spark value for tooltip display
      function fmtSpark(v) {
        if (v >= 1000000) return (v/1000000).toFixed(1) + 'M';
        if (v >= 1000)    return (v/1000).toFixed(0) + 'K';
        if (v % 1 !== 0)  return v.toFixed(1);
        return String(v);
      }
      // Format axis labels — show units if card has them
      function axisLabel(v) { return fmtSpark(v); }
      var yMax = axisLabel(max);
      var yMin = axisLabel(min);
      var xLabel = c.sparkLabel || '8-point trend';

      var bars = spark.map(function(v, i) {
        var range = max - min || 1;
        var h = Math.max(4, Math.round(((v - min) / range) * 32));
        return '<div class="spark-bar" style="height:' + h + 'px" title="' + fmtSpark(v) + '"></div>';
      }).join('');

      var deltaFmt = delta >= 0 ? '+' + fmtSpark(Math.abs(delta)) : '-' + fmtSpark(Math.abs(delta));
      var sparkHtml =
        '<div class="spark-chart">' +
          '<div class="spark-y-axis">' +
            '<span class="spark-y-max">' + yMax + '</span>' +
            '<span class="spark-y-min">' + yMin + '</span>' +
          '</div>' +
          '<div class="spark-body">' +
            '<div class="spark-bars">' + bars + '</div>' +
            '<div class="spark-x-axis">' +
              '<span class="spark-x-label">' + xLabel + '</span>' +
              '<span class="spark-trend ' + trendCls + '">' + trendArrow + ' ' + deltaFmt + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      return '<div class="dash-card' + (isLoading ? ' loading' : '') + '" style="--card-color:' + c.color + '">' +
        tierBadge(c) +
        '<span class="card-icon">' + c.icon + '</span>' +
        '<div class="card-title">' + c.title + ' ' + methodTag(c.method) + '</div>' +
        '<div class="card-value">' + value + '</div>' +
        '<div class="card-sub">' + c.sub + '</div>' +
        '<div class="card-scope-note">' + scopeNote + '</div>' +
        sparkHtml +
        '<a class="card-source" href="' + c.sourceUrl + '" target="_blank" rel="noopener">SOURCE: ' + c.source + '</a>' +
      '</div>';
    }).join('');
  }

  // ── Freshness banner ─────────────────────────────────────
  function renderFreshness(countyData, liveData) {
    var el = document.getElementById('freshnessBar');
    if (!el) return;
    var liveTs = liveData ? liveData.loadedAt : null;
    el.innerHTML =
      '<div class="freshness-item"><div class="freshness-dot"></div>LIVE APIs ACTIVE</div>' +
      '<div class="freshness-item">Fetched: <strong>' + (liveTs || 'Loading...') + '</strong></div>' +
      '<div class="freshness-item">Source: <strong>' + countyData.openDataUrl + '</strong></div>' +
      '<div class="freshness-disclaimer">NOT AN OFFICIAL ' + countyData.name.toUpperCase() + ' WEBSITE</div>';
  }

  // ── Incidents banner ─────────────────────────────────────
  function renderIncidents(liveData) {
    var el = document.getElementById('incidentsBanner');
    if (!el) return;
    if (!liveData || !liveData.incidents || !liveData.incidents.incidents || !liveData.incidents.incidents.length) {
      el.style.display = 'none'; return;
    }
    el.style.display = 'flex';
    el.innerHTML = liveData.incidents.incidents.map(function(i) {
      return '<div class="incident-item">🚨 <strong>Silver Line:</strong> ' + i.Description + '</div>';
    }).join('');
  }

  // ── Data Pledge ──────────────────────────────────────────
  function renderDataPledge(countyData) {
    var el = document.getElementById('dataPledge');
    if (!el) return;
    var liveCount = countyData.cards.filter(function(c){ return c.tier==='live'; }).length;
    var apiCount  = countyData.sources.filter(function(s){ return s.method && s.method.indexOf('API')!==-1; }).length;
    var modCount  = countyData.cards.length;
    el.innerHTML =
      '<div class="pledge-stats">' +
        '<div class="pledge-stat"><span class="pledge-num">' + liveCount + '</span><span class="pledge-label">Live Sources</span></div>' +
        '<div class="pledge-stat"><span class="pledge-num">' + apiCount + '</span><span class="pledge-label">Official APIs</span></div>' +
        '<div class="pledge-stat"><span class="pledge-num">' + modCount + '</span><span class="pledge-label">Data Modules</span></div>' +
      '</div>' +
      '<div class="pledge-box">' +
        '<div class="pledge-title">Our Data Pledge</div>' +
        '<div class="pledge-text">' + countyData.dataPledge + '</div>' +
      '</div>';
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
  function renderSources(countyData, filter) {
    filter = filter || 'all';
    var grid = document.getElementById('sourcesGrid');
    if (!grid) return;
    var filtered = filter === 'all' ? countyData.sources
      : countyData.sources.filter(function(s) { return s.cadence === filter || (s.tags && s.tags.indexOf(filter) !== -1); });
    grid.innerHTML = filtered.map(function(s) {
      return '<div class="source-card">' +
        '<div class="source-top">' +
          '<div class="source-name">' + s.name + '</div>' +
          '<div style="display:flex;gap:4px;align-items:center">' +
            methodTag(s.method) +
            '<span class="source-cadence cadence-' + (s.cadence==='live'?'live':s.cadence==='today'?'today':'pub') + '">' +
              (s.cadence==='live'?'LIVE':s.cadence==='today'?'TODAY':'PUBLISHED') +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="source-powers">' + (s.powers||[]).map(function(p){ return '<span class="source-tag">'+p+'</span>'; }).join('') + '</div>' +
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

  // ── Leadership ───────────────────────────────────────────
  function renderLeadership(countyData) {
    var el = document.getElementById('leadershipGrid');
    if (!el || !countyData.leadership) return;
    el.innerHTML = countyData.leadership.map(function(l) {
      return '<div class="leader-card">' +
        '<div class="leader-role">' + l.role + '</div>' +
        '<div class="leader-name">' + l.name + (l.party ? ' <span class="leader-party party-' + l.party.toLowerCase() + '">' + l.party + '</span>' : '') + '</div>' +
        '<div class="leader-meta">Since ' + l.since + '</div>' +
        '<div class="leader-links">' +
          '<a href="mailto:' + l.contact + '" class="leader-link">✉ Email</a>' +
          '<a href="tel:' + l.phone + '" class="leader-link">📞 ' + l.phone + '</a>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // ── Services directory ───────────────────────────────────
  function renderServices(countyData) {
    var el = document.getElementById('servicesGrid');
    if (!el || !countyData.services) return;
    el.innerHTML = countyData.services.map(function(s) {
      return '<a class="service-card" href="' + s.url + '" target="_blank" rel="noopener">' +
        '<span class="service-icon">' + s.icon + '</span>' +
        '<div class="service-name">' + s.name + '</div>' +
        '<div class="service-desc">' + s.desc + '</div>' +
      '</a>';
    }).join('');
  }

  // ── Local Alerts ─────────────────────────────────────────
  function renderLocalAlerts(countyData) {
    var el = document.getElementById('alertsGrid');
    if (!el || !countyData.localAlerts) return;
    el.innerHTML = countyData.localAlerts.map(function(a) {
      return '<a class="alert-card alert-' + (a.type||'info') + '" href="' + a.url + '" target="_blank" rel="noopener">' +
        '<div class="alert-icon">' + a.icon + '</div>' +
        '<div class="alert-content">' +
          '<div class="alert-title">' + a.title + '</div>' +
          '<div class="alert-desc">' + a.desc + '</div>' +
          '<div class="alert-source">' + a.source + '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  // ── Gov Schemes ──────────────────────────────────────────
  function renderGovSchemes(countyData) {
    var el = document.getElementById('schemesGrid');
    if (!el || !countyData.govSchemes) return;
    el.innerHTML = countyData.govSchemes.map(function(s) {
      return '<a class="scheme-card" href="' + s.url + '" target="_blank" rel="noopener">' +
        '<div class="scheme-name">' + s.name + '</div>' +
        '<div class="scheme-desc">' + s.desc + '</div>' +
        '<div class="scheme-eligibility">Eligibility: ' + s.eligibility + '</div>' +
      '</a>';
    }).join('');
  }

  // ── Votes ────────────────────────────────────────────────
  function renderVotes(countyData) {
    var grid = document.getElementById('voteGrid');
    if (!grid) return;
    grid.innerHTML = countyData.votes.map(function(v) {
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
    renderFreshness: renderFreshness,
    renderIncidents: renderIncidents,
    renderDataPledge: renderDataPledge,
    renderDisclaimer: renderDisclaimer,
    renderSources: renderSources,
    renderLeadership: renderLeadership,
    renderServices: renderServices,
    renderLocalAlerts: renderLocalAlerts,
    renderGovSchemes: renderGovSchemes,
    renderVotes: renderVotes,
    renderHeroMeta: renderHeroMeta,
    incrementVote: incrementVote,
  };
})();
