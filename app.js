/* 4Prep Academy landing: interactions */
(function () {
  'use strict';

  // ── Config: fill these in when ready ─────────────────────────
  var LEAD_ENDPOINT = '/api/lead';   // serverless function (site/api/lead.js)
  // ─────────────────────────────────────────────────────────────

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  if (reduce) document.documentElement.classList.add('no-motion');
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
  if (window.I18N) window.I18N.init();
  function splitWords(p) {
    var words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    return $$('.w', p);
  }

  // ── Typography: never break 2026-yil, TOP-160, F-1, or start a line with "·" ──
  var NB_RE = /(\b[A-Za-z]{1,4}-\d+\b|\b\d+-[A-Za-z\u00C0-\u024F‘’ʻ]+)/g;
  function keepTogether(root) {
    if (!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) { var p = n.parentNode; return (!p || !p.closest || p.closest('script,style,option,svg,title,textarea,.nw')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    var nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(function (n) {
      var s = n.nodeValue;
      if (s.indexOf(' ·') > -1) { s = s.replace(/ ·/g, '\u00A0·'); n.nodeValue = s; }
      NB_RE.lastIndex = 0; if (!NB_RE.test(s)) return;
      var frag = document.createDocumentFragment(), last = 0, m; NB_RE.lastIndex = 0;
      while ((m = NB_RE.exec(s))) { if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index))); var sp = document.createElement('span'); sp.className = 'nw'; sp.textContent = m[0]; frag.appendChild(sp); last = m.index + m[0].length; }
      if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }
  keepTogether($('main'));

  // ── Hero entrance ──
  $$('[data-in]').forEach(function (el, i) { el.style.setProperty('--i', i); });
  requestAnimationFrame(function () { requestAnimationFrame(function () { document.body.classList.add('is-loaded'); }); });

  // ── Smooth scroll (Lenis) + GSAP ──
  var lenis = null;
  var hasGsap = window.gsap && window.ScrollTrigger;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  // touch screens scroll natively (Lenis only smooths wheels and would cost a frame callback forever)
  if (!reduce && window.Lenis && !window.matchMedia('(pointer: coarse)').matches) {
    lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function loop(t) { lenis.raf(t); requestAnimationFrame(loop); })(performance.now());
    }
  }
  function scrollToEl(el, offset) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: offset || -84, duration: 1.4 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (offset || -84), behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      scrollToEl(el, id === '#top' ? 0 : -84);
      if (a.hasAttribute('data-consult')) focusFormSoon();
      var pick = a.getAttribute('data-pick-link');
      if (pick) setProgram(pick, false);
    });
  });

  // ── Nav ──
  var nav = $('#nav');
  var burger = $('.nav__burger');
  var mmenu = $('#mmenu');
  function lockPage(on) { document.documentElement.classList.toggle('menu-open', on); if (lenis) { if (on) lenis.stop(); else lenis.start(); } }
  function closeMenu() { if (!mmenu.hidden) { mmenu.hidden = true; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); lockPage(false); } }
  burger.addEventListener('click', function () {
    var open = mmenu.hidden;
    mmenu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    lockPage(open);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  nav.addEventListener('click', function (e) { if (e.target === nav) closeMenu(); });

  var hero = $('.hero');
  var mbar = $('#mbar');
  var sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:80px;left:0;width:1px;height:1px';
  hero.appendChild(sentinel);
  new IntersectionObserver(function (es) { nav.classList.toggle('is-stuck', !es[0].isIntersecting); }).observe(sentinel);
  var consultSec = $('#consult');
  var quiet = { hero: true, route: false, mani: false, consult: false, final: false, footer: false };
  function syncBar() {
    var on = Object.keys(quiet).every(function (k) { return !quiet[k]; });
    mbar.classList.toggle('is-on', on);
    mbar.setAttribute('aria-hidden', String(!on));
    mbar.querySelector('a').tabIndex = on ? 0 : -1;
  }
  function watchQuiet(el, key, th) { if (!el) return; new IntersectionObserver(function (es) { quiet[key] = es[0].isIntersecting; syncBar(); }, { threshold: th }).observe(el); }
  watchQuiet(hero, 'hero', 0.15); watchQuiet($('#route'), 'route', 0.05); watchQuiet($('.manifesto'), 'mani', 0.1); watchQuiet(consultSec, 'consult', 0.1); watchQuiet($('.final'), 'final', 0.2); watchQuiet($('.footer'), 'footer', 0.05);

  // ── Motion system: heading lines rise out of a mask ──
  function splitLines(h) {
    if (h.querySelector('.ln')) return;
    h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(function (p) { return '<span class="ln"><span>' + p.trim() + '</span></span>'; }).join('');
  }
  var lineHeads = (!reduce && 'IntersectionObserver' in window) ? $$('.h2, .final__title') : [];
  lineHeads.forEach(function (h) { splitLines(h); var box = h.closest('[data-reveal]'); if (box) box.classList.add('rv-lines'); });

  // ── Nav steps aside while scrolling down, returns on the way up ──
  (function () {
    var lastY = window.scrollY, busy = false;
    var navProg = $('.nav__prog i'), docMax = 1;
    var measureDoc = function () { docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    measureDoc(); if (window.ResizeObserver) new ResizeObserver(measureDoc).observe(document.body);
    var paintProg = function (y) { if (navProg) navProg.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / docMax)).toFixed(4) + ')'; };
    paintProg(lastY);
    window.addEventListener('scroll', function () {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () {
        busy = false;
        var y = window.scrollY, dy = y - lastY;
        paintProg(y);
        if (Math.abs(dy) < 8) return;
        var hideNav = dy > 0 && y > window.innerHeight * 0.85 && mmenu.hidden && !nav.contains(document.activeElement);
        nav.classList.toggle('is-hidden', hideNav);
        document.documentElement.classList.toggle('nav-hidden', hideNav);
        lastY = y;
      });
    }, { passive: true });
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); document.documentElement.classList.remove('nav-hidden'); });
  })();

  // ── Reveal on scroll ──
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(function (el) {
      var sib = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [];
      el.style.transitionDelay = (Math.max(0, sib.indexOf(el)) * 90) + 'ms';
      io.observe(el);
    });
  } else {
    $$('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }

  // ── Results wall: tiles rise in reading order, figures count up ──
  var wall = $('.wall');
  if (wall && !reduce && 'IntersectionObserver' in window) {
    var tiles = $$('.wcard', wall);
    var countUp = function (big) {
      var tn = big.firstChild, m = big._m, t0 = performance.now(), dur = 1400;
      (function step(now) {
        var p = Math.min(1, (now - t0) / dur), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        var v = Math.round(m.n * e);
        tn.nodeValue = m.pre + (m.comma ? v.toLocaleString('en-US') : v) + m.post;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    };
    tiles.forEach(function (t) {
      var big = $('.wcard__big:not([data-i18n])', t);
      if (!big || !big.firstChild || big.firstChild.nodeType !== 3) return;
      var m = big.firstChild.nodeValue.match(/^(\D*)([\d,]+)(\D*)$/);
      if (!m) return;
      big._m = { pre: m[1], n: parseInt(m[2].replace(/,/g, ''), 10), comma: m[2].indexOf(',') > -1, post: m[3] };
      big.firstChild.nodeValue = m[1] + '0' + m[3];
      t._big = big;
    });
    wall.classList.add('wall--anim');
    var wio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        wio.unobserve(el);
        var cols = getComputedStyle(wall).gridTemplateColumns.split(' ').length || 1;
        var d = (tiles.indexOf(el) % cols) * 80;
        el.style.setProperty('--d', d + 'ms');
        el.classList.add('is-in');
        if (el._big) setTimeout(function () { countUp(el._big); }, d + 140);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.15 });
    tiles.forEach(function (t) { wio.observe(t); });
  }

  // ── Universities carousel (phones): position bar ──
  var cards = $('.unis__cards'), prog = $('.unis__prog i');
  if (cards && prog) {
    var progTick = false;
    var syncProg = function () {
      progTick = false;
      var sw = cards.scrollWidth, cw = cards.clientWidth;
      if (sw <= cw) return;
      var frac = cw / sw;
      prog.style.width = (frac * 100).toFixed(2) + '%';
      prog.style.transform = 'translateX(' + ((cards.scrollLeft / (sw - cw)) * (1 / frac - 1) * 100).toFixed(2) + '%)';
    };
    cards.addEventListener('scroll', function () { if (!progTick) { progTick = true; requestAnimationFrame(syncProg); } }, { passive: true });
    window.addEventListener('resize', syncProg);
    syncProg();
  }

  // ── Magnetic CTAs (pointer: fine only) ──
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    $$('.magnet').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.28;
        b.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  // ── Hero collage depth (pointer: fine only) ──
  var collage = $('#collage') || $('.seat');
  if (collage && !reduce && window.matchMedia('(pointer:fine)').matches) {
    var cr = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(cr);
      cr = requestAnimationFrame(function () { collage.style.setProperty('--px', x.toFixed(3)); collage.style.setProperty('--py', y.toFixed(3)); });
    });
    hero.addEventListener('pointerleave', function () { collage.style.setProperty('--px', 0); collage.style.setProperty('--py', 0); });
  }

  // ── Hero: hanging luggage tag (pendulum + flip) ──
  var tagEl = $('#tag');
  if (tagEl) {
    var pend = $('.tag__pend', tagEl), wob = $('.tag__wob', tagEl), flipBtn = $('.tag__flip', tagEl);
    var tagFine = window.matchMedia('(pointer:fine)').matches;
    var th = -12, om = 0, goal = 0, tLast = 0, tIdle = 0, tRun = false, prevX = null;
    var paint = function () {
      pend.style.transform = 'rotate(' + th.toFixed(3) + 'deg)';
      wob.style.transform = 'rotate(' + (-om * 0.05).toFixed(3) + 'deg)';
    };
    var tagTick = function (now) {
      if (!tRun) return;
      var dt = tLast ? Math.min(0.05, (now - tLast) / 1000) : 0.016; tLast = now; tIdle += dt;
      var idle = Math.sin(tIdle * 0.8) * 0.7;
      var acc = -12 * (th - (goal + idle)) - 2.4 * om;
      om += acc * dt; th += om * dt;
      paint();
      requestAnimationFrame(tagTick);
    };
    var startTag = function () { if (tRun || reduce) return; tRun = true; tLast = 0; requestAnimationFrame(tagTick); };
    var stopTag = function () { tRun = false; };
    // phones/tablets: the swing is a CSS animation on the compositor, immune to main-thread work
    var tagCss = window.matchMedia('(max-width: 960px)').matches;
    if (reduce) { th = 0; om = 0; paint(); }
    else if (tagCss) { /* CSS drives the pendulum */ }
    else {
      paint();
      pend.addEventListener('transitionend', function land(e) { if (e.propertyName !== 'translate') return; pend.removeEventListener('transitionend', land); om -= 30; });
      new IntersectionObserver(function (es) { if (es[0].isIntersecting) startTag(); else stopTag(); }, { threshold: 0.05 }).observe(tagEl);
      if (tagFine) {
        hero.addEventListener('pointermove', function (e) {
          var r = hero.getBoundingClientRect();
          goal = ((e.clientX - r.left) / r.width - 0.5) * -6;
          if (prevX !== null) { var vx = e.clientX - prevX; om += Math.max(-50, Math.min(50, -vx * 0.3)); }
          prevX = e.clientX;
        });
        hero.addEventListener('pointerleave', function () { goal = 0; prevX = null; });
      }
    }
    var flipTag = function () {
      var on = !tagEl.classList.contains('is-flipped');
      tagEl.classList.toggle('is-flipped', on);
      flipBtn.setAttribute('aria-pressed', String(on));
      $('.tag__face--front', tagEl).setAttribute('aria-hidden', String(on));
      $('.tag__face--back', tagEl).setAttribute('aria-hidden', String(!on));
      $('.tag__face--front', tagEl).inert = on;
      $('.tag__face--back', tagEl).inert = !on;
      om += on ? 12 : -12;
      if (tagCss && !reduce) { pend.classList.remove('is-nudge'); void pend.offsetWidth; pend.classList.add('is-nudge'); }
    };
    tagEl.addEventListener('click', function (e) { if (e.target.closest('a')) return; flipTag(); });
  }

  // ── Posters: fetched only when the wall is near ──
  var posterVids = $$('video[data-poster]');
  var setPoster = function (v) { v.poster = v.getAttribute('data-poster'); v.removeAttribute('data-poster'); };
  if ('IntersectionObserver' in window) {
    var posterIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { setPoster(e.target); posterIO.unobserve(e.target); } }); }, { rootMargin: '900px 0px' });
    posterVids.forEach(function (v) { posterIO.observe(v); });
  } else posterVids.forEach(setPoster);

  // ── Student clips: muted loops, posters until needed ──
  var conn = navigator.connection || {};
  var canVideo = !reduce && !conn.saveData;
  var fine = window.matchMedia('(pointer:fine)').matches;
  function arm(v) {
    if (v.dataset.armed) return;
    v.dataset.armed = '1';
    var s = document.createElement('source'); s.src = v.dataset.src; s.type = 'video/mp4';
    v.appendChild(s); v.load();
  }
  function playClip(v) {
    arm(v);
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
    var card = v.closest('.reel'); if (card) card.classList.add('is-playing');
  }
  function pauseClip(v) {
    if (!v.paused) v.pause();
    var card = v.closest('.reel'); if (card) card.classList.remove('is-playing');
  }
  if (canVideo) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (!e.isIntersecting) { pauseClip(v); return; }
        if (v.dataset.hover === '1') return; // wall clips play on hover only (posters on touch)
        playClip(v);
      });
    }, { threshold: 0.3 });
    $$('video.clip').forEach(function (v) { vio.observe(v); });
    if (fine) {
      $$('.reel, .wcard--video > a').forEach(function (a) {
        var v = $('video.clip', a); if (!v) return;
        a.addEventListener('pointerenter', function () { playClip(v); });
        a.addEventListener('pointerleave', function () { pauseClip(v); });
        a.addEventListener('focus', function () { playClip(v); });
        a.addEventListener('blur', function () { pauseClip(v); });
      });
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) $$('video.clip').forEach(pauseClip); });
  }

  // ── Nav: highlight the current section ──
  var navLinks = $$('.nav__links a[href^="#"]');
  var navInd = $('.nav__ind'), activeLink = null;
  var placeInd = function (instant) {
    if (!navInd) return;
    if (!activeLink || !activeLink.offsetWidth) { navInd.style.opacity = '0'; return; }
    if (instant) navInd.classList.remove('is-ready');
    navInd.style.opacity = '1';
    navInd.style.transform = 'translateX(' + activeLink.offsetLeft + 'px) scaleX(' + activeLink.offsetWidth + ')';
    if (instant) { void navInd.offsetWidth; navInd.classList.add('is-ready'); }
  };
  if (navInd) { navInd.parentNode.classList.add('has-ind'); window.addEventListener('resize', function () { placeInd(true); }); }
  var spied = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (spied.length) {
    var current = null;
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) current = e.target; });
      activeLink = null;
      navLinks.forEach(function (a) { var on = !!current && a.getAttribute('href') === '#' + current.id; a.classList.toggle('is-active', on); if (on) activeLink = a; });
      placeInd(!navInd || !navInd.classList.contains('is-ready'));
    }, { rootMargin: '-35% 0px -55% 0px' });
    spied.forEach(function (s) { sio.observe(s); });
  }

  // ── Split-flap boards ──
  var CH = 'ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789+';
  var pad = function (s, n) { return (s + '                    ').slice(0, n); };
  var WIDTHS = [10, 9, 9];

  function Board(el, rows) {
    this.el = el; this.cells = [];
    var self = this;
    rows.forEach(function (row) {
      var r = document.createElement('div'); r.className = 'brow';
      var rowCells = [];
      ['a', 'b', 'c'].forEach(function (k, ci) {
        var g = document.createElement('div'); g.className = 'bcell bcell--' + k;
        var str = pad(row[ci], WIDTHS[ci]);
        for (var i = 0; i < WIDTHS[ci]; i++) {
          var f = document.createElement('span'); f.className = 'flap';
          var b = document.createElement('b'); b.textContent = str[i];
          f.appendChild(b); g.appendChild(f); rowCells.push(b);
        }
        r.appendChild(g);
      });
      self.cells.push(rowCells);
      el.appendChild(r);
    });
  }
  var FLIP_KF = [{ transform: 'perspective(320px) rotateX(0deg)' }, { transform: 'perspective(320px) rotateX(-88deg)', offset: 0.49 }, { transform: 'perspective(320px) rotateX(88deg)', offset: 0.51 }, { transform: 'perspective(320px) rotateX(0deg)' }];
  var plainStatus = window.matchMedia('(max-width: 767px)').matches;
  Board.prototype.set = function (ri, row) {
    var target = pad(row[0], 10) + pad(row[1], 9) + pad(row[2], 9);
    var cells = this.cells[ri];
    cells.forEach(function (b, i) {
      var ch = target[i];
      if (b.textContent === ch) return;
      if (reduce) { b.textContent = ch; return; }
      var steps = 3 + Math.floor(i * 0.35) + Math.floor(Math.random() * 3), n = 0;
      (function tick() {
        n++;
        if (!(plainStatus && b.closest('.bcell--c'))) b.animate(FLIP_KF, { duration: 130, easing: 'ease-in' });
        b.textContent = n >= steps ? ch : CH[Math.floor(Math.random() * CH.length)];
        if (n < steps) setTimeout(tick, 70);
      })();
    });
  };

  var POOL = [
    ['HARVARD', 'IELTS+SAT'], ['OXFORD', 'IELTS'], ['MIT', 'IELTS+SAT'], ['STANFORD', 'IELTS+SAT'],
    ['CAMBRIDGE', 'IELTS'], ['YALE', 'IELTS+SAT'], ['PRINCETON', 'IELTS+SAT'], ['IMPERIAL', 'IELTS'],
    ['COLUMBIA', 'IELTS+SAT'], ['UCL', 'IELTS'], ['NYU', 'IELTS+SAT'], ['TORONTO', 'IELTS'],
    ['NUS', 'IELTS'], ['KAIST', 'IELTS'], ['CORNELL', 'IELTS+SAT'], ['DUKE', 'IELTS+SAT']
  ];
  var STATUS = ['BOARDING', 'PREPARING', 'ON TIME', 'APPLYING', 'GATE OPEN', 'LAST CALL'];
  var depEl = $('#depBoard');
  var rowsN = window.innerWidth < 768 ? 5 : 6;
  var dep = new Board(depEl, POOL.slice(0, rowsN).map(function (u, i) { return [u[0], u[1], STATUS[i % STATUS.length]]; }));

  var boardsVisible = { dep: false };
  new IntersectionObserver(function (es) { boardsVisible.dep = es[0].isIntersecting; }).observe(depEl);

  var next = rowsN, ri = 0;
  setInterval(function () {
    if (document.hidden || !boardsVisible.dep) return;
    var u = POOL[next++ % POOL.length];
    dep.set(ri, [u[0], u[1], STATUS[Math.floor(Math.random() * STATUS.length)]]);
    ri = (ri + 1) % rowsN;
  }, 2600);

  // Tashkent clock
  var clock = $('#clock');
  function clockTick() {
    try {
      var hm = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' }).format(new Date()).split(':');
      clock.innerHTML = hm[0] + '<span class="colon">:</span>' + hm[1];
    } catch (e) {}
  }
  clockTick(); setInterval(clockTick, 15000);

  // ── Distances on university cards ──
  $$('.uni__km').forEach(function (el) {
    if (!window.kmFromTashkent) return;
    var ll = el.getAttribute('data-ll').split(',').map(Number);
    el.textContent = window.kmFromTashkent(ll).toLocaleString('en-US') + ' km';
  });

  // Scroll-driven scenes are built after the hero entrance (or on the first scroll), so the entrance never stutters.
  function initScroll() {
    // ── GSAP scroll choreography ──
    if (hasGsap && !reduce) {
      // horizontal pan for universities (desktop/tablet)
      var mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', function () {
        var track = $('#unisTrack');
        var rail = $('.unis__rail'), railTo = $('#railTo'), railKm = $('#railKm'), railFill = $('.unis__rail-fill'), railRun = $('.unis__rail-run');
        var cards = $$('.uni', track), centers = [], cur = -1;
        var measure = function () { centers = cards.map(function (c) { return c.offsetLeft + c.offsetWidth / 2; }); };
        var dist = function () { return track.scrollWidth - window.innerWidth; };
        var label = function () {
          var x = gsap.getProperty(track, 'x'), mid = window.innerWidth / 2, best = 0, bd = Infinity;
          for (var i = 0; i < centers.length; i++) { var d = Math.abs(centers[i] + x - mid); if (d < bd) { bd = d; best = i; } }
          if (best === cur) return;
          cur = best;
          railTo.textContent = cards[best].getAttribute('data-code');
          railKm.textContent = $('.uni__km', cards[best]).textContent;
        };
        var tween = gsap.to(track, {
          x: function () { return -dist(); }, ease: 'none',
          onUpdate: function () { var p = this.progress(); railFill.style.transform = 'scaleX(' + p.toFixed(4) + ')'; railRun.style.transform = 'translateX(' + (p * 100).toFixed(2) + '%)'; label(); },
          scrollTrigger: { trigger: '.unis__pin', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, pinType: ScrollTrigger.isTouch ? 'fixed' : 'transform', scrub: true, invalidateOnRefresh: true, anticipatePin: 1, onRefresh: function () { measure(); cur = -1; label(); } }
        });
        measure(); label();
        cards.forEach(function (c) {
          gsap.fromTo($('.uni__img img', c), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
          gsap.fromTo(c, { y: 40, scale: 0.94, opacity: 0.3 }, { y: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 104%', end: 'left 64%', scrub: true } });
        });
        return function () { railFill.style.transform = ''; railRun.style.transform = ''; };
      });

      // manifesto: words light up as you read
      $$('[data-words]').forEach(function (p) {
        gsap.to(splitWords(p), { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 55%', scrub: true } });
      });

      if (document.readyState === 'complete') ScrollTrigger.refresh(); else window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    } else {
    }


    // ── Final: a paper plane follows the route as you scroll ──
    var route = $('.final__route');
    if (route) {
      var rPath = $('#routePath', route), rPlane = $('#plane', route), rTrail = $('#trailReveal', route);
      var rLen = rPath.getTotalLength();
      rTrail.setAttribute('stroke-dasharray', rLen);
      var rk = 1.25;
      var sizeRoute = function () { rk = Math.max(1.25, Math.min(3, 1100 / Math.max(1, route.clientWidth || 1000))); };
      sizeRoute(); window.addEventListener('resize', sizeRoute);
      var setRoute = function (p) {
        p = Math.max(0, Math.min(1, p));
        var d = p * rLen, pt = rPath.getPointAtLength(d), nx = rPath.getPointAtLength(Math.min(rLen, d + 3));
        var ang = Math.atan2(nx.y - pt.y, nx.x - pt.x) * 180 / Math.PI;
        rPlane.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ') rotate(' + ang.toFixed(2) + ') scale(' + rk.toFixed(2) + ')');
        rTrail.setAttribute('stroke-dashoffset', (rLen * (1 - p)).toFixed(1));
      };
      if (hasGsap && !reduce) {
        var rs = { p: 0 };
        gsap.to(rs, { p: 1, ease: 'none', onUpdate: function () { setRoute(rs.p); }, scrollTrigger: { trigger: '.final', start: 'top 88%', end: 'bottom 12%', scrub: 0.4 } });
        setRoute(0);
      } else {
        setRoute(0.72);
      }
    }

    // ── Passport: each stage stamps itself as you read it ──
    var pp = $('#passport');
    if (pp) {
      var stampEls = $$('[data-stamp]', pp);
      var stepEls = $$('.vstep');
      var vlist = $('.vsteps');
      var stage = -1, dots = [];
      var paintDots = function () { dots.forEach(function (d, i) { d.classList.toggle('is-done', i + 1 <= stage); d.classList.toggle('is-active', i + 1 === stage); }); };
      var thud = function () { pp.classList.remove('is-thud'); void pp.offsetWidth; pp.classList.add('is-thud'); };
      var setStage = function (n) {
        if (n === stage) return;
        var landed = n > stage;
        stage = n;
        vlist.classList.toggle('has-active', n > 0);
        stampEls.forEach(function (s) { s.classList.toggle('is-on', +s.getAttribute('data-stamp') <= n); });
        stepEls.forEach(function (st) { var k = +st.getAttribute('data-step'); st.classList.toggle('is-active', k === n); st.classList.toggle('is-done', k <= n); });
        paintDots();
        if (landed && n > 0 && !reduce) { clearTimeout(pp._t); pp._t = setTimeout(thud, 320); }
      };
      if (reduce || !hasGsap) {
        setStage(4);
      } else if (window.matchMedia('(max-width: 960px) and (min-height: 600px)').matches) {
        setStage(0);
        stepEls.forEach(function (st, i) {
          ScrollTrigger.create({ trigger: $('.vstep__name', st), start: 'center 70%', onEnter: function () { setStage(i + 1); }, onLeaveBack: function () { setStage(i); } });
        });
      } else if (window.matchMedia('(min-width: 961px)').matches) {
        // ScrollTrigger fires every crossed step in order, so a fast flick never skips a stamp
        setStage(0);
        stepEls.forEach(function (st, i) {
          ScrollTrigger.create({ trigger: $('.vstep__name', st), start: 'center 58%', onEnter: function () { setStage(i + 1); }, onLeaveBack: function () { setStage(i); } });
        });
        var vrail = $('.vrail'), vfill = $('.vrail i');
        dots = stepEls.map(function () { var d = document.createElement('b'); d.className = 'vrail__dot'; vrail.appendChild(d); return d; });
        paintDots();
        var placeRail = function () {
          vrail.style.top = vlist.offsetTop + 'px'; vrail.style.height = vlist.offsetHeight + 'px';
          var top = vlist.getBoundingClientRect().top;
          dots.forEach(function (d, i) { var r = stepEls[i].querySelector('.vstep__name').getBoundingClientRect(); d.style.top = (r.top + r.height / 2 - top).toFixed(1) + 'px'; });
        };
        ScrollTrigger.create({ trigger: vlist, start: 'top 58%', end: 'bottom 58%', onRefresh: placeRail, onUpdate: function (self) { vfill.style.transform = 'scaleY(' + self.progress.toFixed(4) + ')'; } });
        placeRail();
      } else {
        setStage(0);
        var pio = new IntersectionObserver(function (es) {
          if (!es[0].isIntersecting) return;
          pio.disconnect();
          [1, 2, 3, 4].forEach(function (n, i) { setTimeout(function () { setStage(n); }, 250 + i * 650); });
          setTimeout(function () { stepEls.forEach(function (st) { st.classList.add('is-active'); }); }, 250 + 4 * 650);
        }, { threshold: 0.55 });
        pio.observe(pp);
      }
    }

  }
  var scrollReady = false;
  function initScrollOnce() { if (scrollReady) return; scrollReady = true; initScroll(); }
  ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach(function (ev) { window.addEventListener(ev, initScrollOnce, { once: true, passive: true }); });
  if (window.scrollY > 40 || location.hash) initScrollOnce();
  else setTimeout(function () { if ('requestIdleCallback' in window) requestIdleCallback(initScrollOnce, { timeout: 700 }); else initScrollOnce(); }, reduce ? 0 : 1700);

  // ── FAQ accordion ──
  $$('.acc__item').forEach(function (item) {
    var btn = $('button', item);
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      $$('.acc__item.is-open').forEach(function (o) { if (o !== item) { o.classList.remove('is-open'); $('button', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (hasGsap) setTimeout(function () { ScrollTrigger.refresh(); }, 650);
    });
  });

  // ── Boarding pass form ──
  var form = $('#leadForm');
  var F = { name: $('#f-name'), contact: $('#f-contact'), program: $('#f-program'), goal: $('#f-goal'), consent: $('#f-consent') };
  var T = { name: $('#tName'), route: $('#tRoute'), dest: $('#tDest'), code: $('#tCode'), no: $('#tNo') };
  var ticket = $('#ticket');
  var statusEl = $('#formStatus');
  var submitBtn = $('#submitBtn');
  var sending = false, sent = false, lblRestore = '';
  function unsend() {
    if (!sent) return;
    sent = false; form.classList.remove('is-sent'); submitBtn.disabled = false;
    $('#submitLabel').innerHTML = lblRestore; ticket.classList.remove('is-boarded'); statusEl.innerHTML = '';
  }

  var CODES = { harvard: 'HVD', stanford: 'STN', mit: 'MIT', oxford: 'OXF', cambridge: 'CAM', yale: 'YAL', princeton: 'PRN', imperial: 'ICL', columbia: 'CLM', ucl: 'UCL', nyu: 'NYU', toronto: 'TOR', duke: 'DUK', cornell: 'CRN', nus: 'NUS', kaist: 'KST' };
  function codeFor(goal) {
    var g = goal.trim().toLowerCase();
    if (!g) return 'USA';
    for (var k in CODES) if (g.indexOf(k) !== -1) return CODES[k];
    var letters = g.replace(/university|of|the|college/g, '').replace(/[^a-z]/g, '').toUpperCase();
    return (letters + 'XXX').slice(0, 3);
  }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return ('000' + (h % 10000)).slice(-4); }
  var ticketIssued = false, codeTimer = 0, FLIPCH = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
  function flipCode(el, code, force) {
    if (!el || (el._code === code && !force)) return;
    el._code = code;
    if (reduce || !ticketIssued) { el.textContent = code; return; }
    el.textContent = '';
    code.split('').forEach(function (ch, i) {
      var s = document.createElement('span'); s.className = 'fc'; el.appendChild(s);
      var n = 0, steps = 3 + i * 2;
      (function step() {
        n++;
        s.textContent = n >= steps ? ch : FLIPCH[(Math.random() * FLIPCH.length) | 0];
        s.animate([{ transform: 'rotateX(-82deg)', opacity: 0.35 }, { transform: 'rotateX(0deg)', opacity: 1 }], { duration: 110, easing: 'cubic-bezier(.2,.8,.3,1)' });
        if (n < steps) setTimeout(step, 62);
      })();
    });
  }
  function pulse(el) { if (!reduce && ticketIssued && el.animate) el.animate([{ opacity: 0.3, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' }); }
  function syncTicket() {
    var n = F.name.value.trim(), p = F.program.value, g = F.goal.value.trim();
    T.name.textContent = n || t('yourName');
    var rt = p ? F.program.options[F.program.selectedIndex].text : t('chooseRoute');
    if (T.route.textContent !== rt) { T.route.textContent = rt; pulse(T.route); }
    T.dest.textContent = g || t('yourUni');
    var code = codeFor(g);
    clearTimeout(codeTimer);
    if (!ticketIssued) flipCode(T.code, code); else codeTimer = setTimeout(function () { flipCode(T.code, code); }, 280);
    T.no.textContent = '4P-' + hash(n + p + g);
  }
  ['input', 'change'].forEach(function (ev) { form.addEventListener(ev, function (e) { unsend(); syncTicket(); clearErr(e.target); }); });

  function setProgram(val, focus) {
    unsend(); F.program.value = val; syncTicket(); clearErr(F.program);
    if (focus) focusFormSoon();
  }
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () { scrollToEl(consultSec, -40); setProgram(b.getAttribute('data-pick'), true); });
  });
  function focusFormSoon() { setTimeout(function () { F.name.focus({ preventScroll: true }); }, reduce ? 0 : 1300); }

  function setErr(input, msg) {
    var id = input.getAttribute('aria-describedby'); var el = id && document.getElementById(id);
    if (el) el.textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  function clearErr(input) {
    if (input && input.getAttribute && input.getAttribute('aria-invalid')) setErr(input, '');
    if (statusEl.querySelector('.bad') && !form.querySelector('[aria-invalid]')) statusEl.innerHTML = '';
  }

  function validate() {
    var errs = [];
    if (F.name.value.trim().length < 2) errs.push([F.name, t('errName')]);
    var c = F.contact.value.trim();
    if (!c) errs.push([F.contact, t('errContact')]);
    else if (c[0] === '@' ? !/^@[A-Za-z0-9_]{4,}$/.test(c) : c.replace(/\D/g, '').length < 9) errs.push([F.contact, t('errContactFmt')]);
    if (!F.program.value) errs.push([F.program, t('errRoute')]);
    if (!F.consent.checked) errs.push([F.consent, t('errConsent')]);
    [F.name, F.contact, F.program, F.consent].forEach(function (i) { setErr(i, ''); });
    errs.forEach(function (e) { setErr(e[0], e[1]); });
    return errs;
  }

  function showStatus(kind, html) { statusEl.innerHTML = '<p class="' + kind + '">' + html + '</p>'; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    var errs = validate();
    if (errs.length) { errs[0][0].focus(); showStatus('bad', t('checkFields')); return; }
    sending = true; submitBtn.disabled = true;
    var lbl = $('#submitLabel'), lblHtml = lbl.innerHTML; lblRestore = lblHtml; lbl.textContent = t('sending');
    statusEl.innerHTML = '';
    var payload = { name: F.name.value.trim(), contact: F.contact.value.trim(), program: F.program.value, dreamUniversity: F.goal.value.trim(), consent: true, website: (document.getElementById('f-website') || {}).value || '', source: '4prep-landing', lang: (window.I18N && window.I18N.lang) || '', page: location.href };
    var SHEET_URL = window.FOURPREP_SHEET_URL || '';
    // Google Sheets (Apps Script) takes priority; otherwise the optional /api/lead function; otherwise Telegram.
    var send = SHEET_URL
      ? fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) }).then(function () { return { ok: true, j: {} }; })
      : fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); });
    send
      .then(function (res) {
        if (res.j && res.j.error === 'not_configured') {
          // bot not wired yet: hand the request to Telegram with the text prefilled
          var msg = [t('tgMsg'), F.name.value.trim(), F.contact.value.trim(), F.program.options[F.program.selectedIndex].text, F.goal.value.trim()].filter(Boolean).join('\n');
          var url = 'https://t.me/fourprepusa?text=' + encodeURIComponent(msg);
          showStatus('ok', t('tgFallback') + ' <a class="btn btn--ink btn--sm" href="' + url + '" target="_blank" rel="noopener">' + t('tgSend') + '</a>');
          return;
        }
        if (!res.ok) throw new Error('bad');
        ticket.classList.remove('is-boarded'); void ticket.offsetWidth; ticket.classList.add('is-boarded'); if (window.innerWidth < 961) scrollToEl(statusEl, -120);
        showStatus('ok', t('ok') + (res.j.preview ? t('preview') : ''));
        sent = true; form.classList.add('is-sent');
      })
      .catch(function () {
        showStatus('bad', t('fail'));
      })
      .then(function () { sending = false; if (sent) lbl.textContent = t('sent'); else { submitBtn.disabled = false; lbl.innerHTML = lblHtml; } });
  });

  // Boarding pass is issued as it arrives: rises, prints its barcode, flips its codes
  var tasCode = $('.ticket__route > div:first-child strong');
  if (!reduce && 'IntersectionObserver' in window) {
    ticket.classList.add('is-waiting');
    var tio = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      tio.disconnect();
      ticket.classList.remove('is-waiting'); ticket.classList.add('is-issued'); ticketIssued = true;
      setTimeout(function () { flipCode(tasCode, 'TAS', true); flipCode(T.code, T.code._code || T.code.textContent, true); }, 380);
    }, { threshold: 0.3 });
    tio.observe(ticket);
  } else ticketIssued = true;

  // Ticket tilt
  var wrap = $('.ticket-wrap');
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    var raf = 0;
    wrap.addEventListener('pointermove', function (e) {
      var r = ticket.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        ticket.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
        ticket.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
        ticket.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        ticket.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
    });
    wrap.addEventListener('pointerleave', function () { ticket.style.setProperty('--rx', '0deg'); ticket.style.setProperty('--ry', '0deg'); });
  }

  syncTicket();


  // ── Early Action countdown (deadline: Nov 1) ──
  var eaEl = $('#eaCount');
  function paintEA() {
    if (!eaEl) return;
    var now = new Date(), y = now.getFullYear();
    var dl = new Date(y, 10, 1);
    var days = Math.ceil((dl - new Date(y, now.getMonth(), now.getDate())) / 864e5);
    if (days < 0 || days > 120) { eaEl.textContent = ''; eaEl.hidden = true; return; }
    eaEl.hidden = false;
    eaEl.textContent = days === 0 ? t('eaToday') : t('eaDays').replace('{n}', days);
  }
  paintEA();

  // ── Route quiz: three questions → recommended route → pre-filled form ──
  var quizStage = $('#quizStage');
  var QROUTES = ['Not sure yet', 'Full route: IELTS + SAT + Admissions', 'IELTS Preparation', 'SAT Preparation', 'US Admissions and Grants', 'Visa Interview Prep'];
  var qAns = [], qStep = 0;
  function quizRoute(a) {
    if (a[2] === 2) return 5;
    if (a[2] === 1) return 4;
    if (a[0] === 2 && a[1] === 2) return 0;
    if (a[0] !== 1 && a[1] !== 1) return 1;
    if (a[0] !== 1) return 2;
    if (a[1] === 0) return 3;
    return 4;
  }
  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function paintQuiz(dir) {
    if (!quizStage) return;
    var html = '';
    if (qStep < 3) {
      var q = 'q' + (qStep + 1);
      html += '<div class="quiz__top"><span class="quiz__step">' + esc(t('quizStep').replace('{n}', qStep + 1)) + '</span><span class="quiz__dots" aria-hidden="true">';
      for (var i = 0; i < 3; i++) html += '<i class="' + (i < qStep ? 'is-done' : i === qStep ? 'is-on' : '') + '"></i>';
      html += '</span></div><h3 class="quiz__q">' + esc(t(q)) + '</h3><div class="quiz__opts" role="group" aria-label="' + esc(t(q)) + '">';
      ['a', 'b', 'c'].forEach(function (k, idx) {
        html += '<button type="button" class="quiz__opt' + (qAns[qStep] === idx ? ' is-sel' : '') + '" data-a="' + idx + '"><span>' + esc(t(q + k)) + '</span><i aria-hidden="true">→</i></button>';
      });
      html += '</div>';
      if (qStep > 0) html += '<button type="button" class="quiz__back link-btn" data-back>← ' + esc(t('quizBack')) + '</button>';
    } else {
      var r = quizRoute(qAns), val = QROUTES[r];
      var opt = F.program.querySelector('option[value="' + val + '"]');
      html += '<div class="quiz__top"><span class="quiz__step">' + esc(t('quizRes')) + '</span></div>';
      html += '<div class="quiz__res"><span class="quiz__stamp" aria-hidden="true">' + (r === 5 ? 'F-1' : r === 1 ? '4P' : r === 2 ? 'IELTS' : r === 3 ? 'SAT' : r === 4 ? 'ADM' : '?') + '</span><h3 class="quiz__q">' + esc(opt ? opt.textContent : val) + '</h3></div>';
      html += '<p class="quiz__why">' + esc(t('why' + r)) + '</p>';
      html += '<div class="quiz__act"><button type="button" class="btn btn--mint btn--lg" data-go="' + esc(val) + '"><span>' + esc(t('quizCta')) + '</span> <span class="arrow" aria-hidden="true">→</span></button><button type="button" class="link-btn" data-retry>' + esc(t('quizRetry')) + '</button></div>';
    }
    quizStage.innerHTML = html;
    if (dir !== false && !reduce && quizStage.animate) quizStage.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  if (quizStage) {
    quizStage.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-a')) { qAns[qStep] = +b.getAttribute('data-a'); qStep++; paintQuiz(); }
      else if (b.hasAttribute('data-back')) { qStep = Math.max(0, qStep - 1); paintQuiz(); }
      else if (b.hasAttribute('data-retry')) { qAns = []; qStep = 0; paintQuiz(); }
      else if (b.hasAttribute('data-go')) { scrollToEl(consultSec, -40); setProgram(b.getAttribute('data-go'), true); }
    });
    paintQuiz(false);
  }


  // ── Light / dark theme ──
  (function () {
    var root = document.documentElement, btn = $('#themeBtn'), meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;
    var LBL = { en: ['Switch to light theme', 'Switch to dark theme'], uz: ['Yorug‘ mavzuga o‘tish', 'Qorong‘i mavzuga o‘tish'], ru: ['Включить светлую тему', 'Включить тёмную тему'] };
    function paint() {
      var light = root.getAttribute('data-theme') === 'light', l = (window.I18N && window.I18N.lang) || 'en';
      btn.setAttribute('aria-pressed', String(light));
      btn.setAttribute('aria-label', (LBL[l] || LBL.en)[light ? 1 : 0]);
      if (meta) meta.setAttribute('content', light ? '#F5FAF7' : '#030D0A');
    }
    function set(t, save) {
      root.classList.add('theme-fade');
      root.setAttribute('data-theme', t);
      if (save) { try { localStorage.setItem('4prep-theme', t); } catch (e) {} }
      paint();
      document.dispatchEvent(new CustomEvent('themechange', { detail: t }));
      setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
    }
    btn.addEventListener('click', function () { set(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true); });
    document.addEventListener('langchange', paint);
    var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
    if (mq && mq.addEventListener) mq.addEventListener('change', function (e) { var s; try { s = localStorage.getItem('4prep-theme'); } catch (x) {} if (!s) set(e.matches ? 'light' : 'dark', false); });
    paint();
  })();

  // Language switch: re-render the parts JavaScript owns
  document.addEventListener('langchange', function () {
    placeInd(true);
    keepTogether($('main'));
    if (sent) { lblRestore = $('#submitLabel').innerHTML; $('#submitLabel').textContent = t('sent'); }
    lineHeads.forEach(splitLines);
    $$('[data-words]').forEach(function (p) { splitWords(p).forEach(function (w) { w.style.opacity = 1; }); });
    syncTicket();
    paintEA(); paintQuiz(false);
    [F.name, F.contact, F.program, F.consent].forEach(function (i) { setErr(i, ''); });
    statusEl.innerHTML = '';
    if (hasGsap) ScrollTrigger.refresh();
  });
})();
