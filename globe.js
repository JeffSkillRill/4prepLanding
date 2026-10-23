/* Dotted orthographic globe with great-circle routes from Tashkent. Canvas 2D, no deps. */
(function () {
  var canvas = document.getElementById('globe');
  if (!canvas || !window.GLOBE_DOTS) return;
  var ctx = canvas.getContext('2d');
  var RAD = Math.PI / 180;
  var TAS = [69.24, 41.30];
  var DEST = [
    { code: 'OXFORD', ll: [-1.25, 51.75] },
    { code: 'HARVARD', ll: [-71.12, 42.37] },
    { code: 'CAMBRIDGE', ll: [0.12, 52.20] },
    { code: 'COLUMBIA', ll: [-73.96, 40.81] },
    { code: 'IMPERIAL', ll: [-0.17, 51.50] },
    { code: 'TORONTO', ll: [-79.39, 43.66] },
    { code: 'YALE', ll: [-72.92, 41.31] },
    { code: 'MIT', ll: [-71.09, 42.36] },
    { code: 'PRINCETON', ll: [-74.66, 40.34] }
  ];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hudTo = document.getElementById('hudTo');
  var hudKm = document.getElementById('hudKm');

  var raw = window.GLOBE_DOTS, N = raw.length / 2;
  var dotLon = new Float32Array(N), dotLat = new Float32Array(N);
  for (var i = 0; i < N; i++) { dotLon[i] = raw[2 * i] / 10; dotLat[i] = raw[2 * i + 1] / 10; }

  function vec(ll) { var l = ll[0] * RAD, p = ll[1] * RAD; return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)]; }
  function toLL(v) { return [Math.atan2(v[1], v[0]) / RAD, Math.asin(Math.max(-1, Math.min(1, v[2]))) / RAD]; }
  function angle(a, b) { return Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))); }
  function slerp(a, b, d, t) {
    var s = Math.sin(d), k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s;
    return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
  }
  window.kmFromTashkent = function (ll) { return Math.round(angle(vec(TAS), vec(ll)) * 6371); };

  var vT = vec(TAS);
  var routes = DEST.map(function (d) {
    var vD = vec(d.ll), ang = angle(vT, vD), pts = [];
    for (var s = 0; s <= 72; s++) {
      var t = s / 72;
      pts.push({ ll: toLL(slerp(vT, vD, ang, t)), alt: (0.06 + ang * 0.16) * Math.sin(Math.PI * t) });
    }
    return { code: d.code, ll: d.ll, pts: pts, km: Math.round(ang * 6371) };
  });

  var W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
  var lam0 = -3, phi0 = 30, tLam = -3, tPhi = 30;
  var placed = [];
  var sinP0, cosP0;

  function project(lon, lat, alt) {
    var dl = (lon - lam0) * RAD, p = lat * RAD;
    var cp = Math.cos(p), sp = Math.sin(p), cdl = Math.cos(dl);
    var cosc = sinP0 * sp + cosP0 * cp * cdl;
    var x = cp * Math.sin(dl), y = cosP0 * sp - sinP0 * cp * cdl;
    var k = 1 + (alt || 0);
    var vis = cosc > 0 || (x * x + y * y) * k * k > 1;
    return { x: cx + R * k * x, y: cy - R * k * y, z: cosc, vis: vis };
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) * 0.4; cx = W / 2; cy = H / 2;
    if (reduce) draw(0);
  }

  // timeline: a new route launches every 1.1s, each lives 3.6s
  var GAP = 1100, LIFE = 3600, FLY = 1500;
  var lastActive = -1;

  var L = false, G = 'rgba(52,245,154,';
  function theme() { L = document.documentElement.getAttribute('data-theme') === 'light'; G = L ? 'rgba(10,143,91,' : 'rgba(52,245,154,'; }
  function draw(now) {
    theme();
    sinP0 = Math.sin(phi0 * RAD); cosP0 = Math.cos(phi0 * RAD);
    ctx.clearRect(0, 0, W, H);

    // halo + sphere
    var halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.35);
    halo.addColorStop(0, G + (L ? '0.18)' : '0.22)')); halo.addColorStop(1, G + '0)');
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2); ctx.fill();
    var sph = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    sph.addColorStop(0, L ? '#FFFFFF' : '#0E3F31'); sph.addColorStop(1, L ? '#DCEFE6' : '#04150F');
    ctx.fillStyle = sph; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = G + (L ? '0.3)' : '0.4)'); ctx.lineWidth = 1; ctx.stroke();

    // land dots, bucketed by depth for fewer state changes
    var size = Math.max(1.3, R / 190);
    var buckets = [[], [], [], []];
    for (var i = 0; i < N; i++) {
      var dl = (dotLon[i] - lam0) * RAD, p = dotLat[i] * RAD;
      var cp = Math.cos(p), cdl = Math.cos(dl);
      var cosc = sinP0 * Math.sin(p) + cosP0 * cp * cdl;
      if (cosc <= 0.02) continue;
      var x = cx + R * cp * Math.sin(dl), y = cy - R * (cosP0 * Math.sin(p) - sinP0 * cp * cdl);
      buckets[Math.min(3, (cosc * 4) | 0)].push(x, y);
    }
    var alphas = [0.22, 0.38, 0.54, 0.7];
    for (var b = 0; b < 4; b++) {
      ctx.fillStyle = (L ? 'rgba(6,37,27,' : 'rgba(120,255,190,') + alphas[b] + ')';
      var arr = buckets[b];
      for (var j = 0; j < arr.length; j += 2) ctx.fillRect(arr[j] - size / 2, arr[j + 1] - size / 2, size, size);
    }

    // labels never overlap: TAS reserves its spot first
    placed.length = 0;
    var o = project(TAS[0], TAS[1], 0);
    var tasAt = o.vis ? placeLabel('TAS', o.x, o.y, true) : null;

    // routes
    var active = -1;
    var cycles = reduce ? 0 : Math.floor(now / GAP);
    for (var r = 0; r < routes.length; r++) {
      var prog, fade;
      if (reduce) { prog = 1; fade = 0.55; }
      else {
        // most recent launch of this route
        var k = cycles - ((cycles - r) % routes.length + routes.length) % routes.length;
        var age = now - k * GAP;
        if (age < 0 || age > LIFE) continue;
        prog = Math.min(1, age / FLY);
        fade = age > LIFE - 600 ? (LIFE - age) / 600 : 1;
        if (prog >= 1) active = r;
      }
      drawRoute(routes[r], prog, fade, now);
    }

    // origin
    if (o.vis) {
      var pulse = reduce ? 0.5 : (now % 1800) / 1800;
      ctx.strokeStyle = G + (0.6 * (1 - pulse)) + ')';
      ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(o.x, o.y, 4 + pulse * 16, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = L ? '#0A9B63' : '#34F59A'; ctx.beginPath(); ctx.arc(o.x, o.y, 4, 0, Math.PI * 2); ctx.fill();
      if (tasAt) label('TAS', tasAt[0], tasAt[1], 1, true);
    }

    if (active !== -1 && active !== lastActive) {
      lastActive = active;
      if (hudTo) hudTo.textContent = routes[active].code;
      if (hudKm) hudKm.textContent = routes[active].km.toLocaleString('en-US') + ' km';
    }
  }

  function labelFont(strong) { ctx.font = (strong ? '700 ' : '600 ') + Math.max(11, R / 30) + 'px JBMono, ui-monospace, monospace'; return Math.max(11, R / 30); }
  function placeLabel(text, x, y, strong) {
    var fs = labelFont(strong), w = ctx.measureText(text).width, pad = 3;
    var c = strong ? [[x + 10, y - 10], [x - 10 - w, y - 10], [x + 10, y + 10 + fs], [x - 10 - w, y + 10 + fs]] : [[x - 8 - w, y - 8], [x + 8, y - 8], [x - 8 - w, y + 8 + fs], [x + 8, y + 8 + fs]];
    for (var i = 0; i < c.length; i++) {
      var lx = Math.max(4, Math.min(W - 4 - w, c[i][0])), ly = Math.max(fs + 2, Math.min(H - 4, c[i][1]));
      var r = [lx - pad, ly - fs - pad, lx + w + pad, ly + pad], hit = false;
      for (var j = 0; j < placed.length; j++) { var q = placed[j]; if (r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1]) { hit = true; break; } }
      if (!hit) { placed.push(r); return [lx, ly]; }
    }
    return null;
  }
  function label(text, x, y, a, strong) {
    labelFont(strong);
    ctx.fillStyle = strong ? (L ? 'rgba(6,37,27,' : 'rgba(234,246,240,') + a + ')' : G + a + ')';
    ctx.fillText(text, x, y);
  }

  function drawRoute(rt, prog, fade, now) {
    var pts = rt.pts, n = Math.max(1, Math.round(prog * (pts.length - 1)));
    ctx.lineWidth = Math.max(1.2, R / 220);
    ctx.lineCap = 'round';
    var prev = null;
    for (var s = 0; s <= n; s++) {
      var q = project(pts[s].ll[0], pts[s].ll[1], pts[s].alt);
      if (prev && prev.vis && q.vis) {
        var a = (0.25 + 0.75 * (s / n)) * fade;
        ctx.strokeStyle = G + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      prev = q;
    }
    if (prog < 1 && prev && prev.vis) {
      ctx.fillStyle = G + fade + ')';
      ctx.shadowColor = G + '0.9)'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(prev.x, prev.y, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
    if (prog >= 1) {
      var d = project(rt.ll[0], rt.ll[1], 0);
      if (!d.vis) return;
      var ping = reduce ? 0.4 : (now % 1400) / 1400;
      ctx.strokeStyle = G + (0.7 * (1 - ping) * fade) + ')';
      ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(d.x, d.y, 3 + ping * 12, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = G + fade + ')';
      ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2); ctx.fill();
      if (!reduce && d.z > 0.2) { var lp = placeLabel(rt.code, d.x, d.y, false); if (lp) label(rt.code, lp[0], lp[1], fade, false); }
    }
  }

  // pointer parallax (desktop only)
  var px = 0, py = 0;
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }

  var running = false, raf = 0, t0 = performance.now();
  function frame(now) {
    var t = now - t0;
    tLam = -3 + Math.sin(t * 0.00009) * 5 - px * 8;
    tPhi = 30 + py * 8;
    lam0 += (tLam - lam0) * 0.06; phi0 += (tPhi - phi0) * 0.06;
    draw(t);
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!running && !reduce) { running = true; raf = requestAnimationFrame(frame); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  document.addEventListener('themechange', function () { if (!running) draw(performance.now() - t0); });
  new ResizeObserver(resize).observe(canvas);
  resize();
  if (reduce) { draw(0); return; }
  start();
  new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
})();
