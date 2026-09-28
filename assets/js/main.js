/* ============================================================
   CHERRY BLOSSOM NAILS — interações
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = '5527997833072';

  /* ---------- ano no rodapé ---------- */
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- preloader ---------- */
  (function () {
    var pre = $('#preloader');
    var bar = $('.preloader__bar span');
    var imgs = $$('img');
    var done = 0;
    var total = imgs.length || 1;

    function tick() {
      done++;
      bar.style.width = Math.min(100, (done / total) * 100) + '%';
    }
    imgs.forEach(function (img) {
      if (img.complete) { tick(); }
      else { img.addEventListener('load', tick); img.addEventListener('error', tick); }
    });

    function finish() {
      bar.style.width = '100%';
      setTimeout(function () {
        pre.classList.add('is-done');
        document.body.classList.remove('no-scroll');
      }, 280);
    }
    window.addEventListener('load', finish);
    setTimeout(finish, 3500); // rede lenta não trava o site
  })();

  /* ---------- pétalas caindo ---------- */
  if (!reduced) {
    var box = $('#petals');
    var count = window.innerWidth < 700 ? 9 : 16;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      var size = 7 + Math.random() * 10;
      p.className = 'petal';
      p.style.width = size + 'px';
      p.style.height = size * 0.78 + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.opacity = 0.2 + Math.random() * 0.35;
      p.style.setProperty('--dx', (Math.random() * 180 - 90) + 'px');
      p.style.animationDuration = (11 + Math.random() * 14) + 's';
      p.style.animationDelay = (-Math.random() * 20) + 's';
      box.appendChild(p);
    }
  }

  /* ---------- cursor ---------- */
  (function () {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    var ring = $('#cursor'), dot = $('#cursorDot');
    var rx = 0, ry = 0, mx = 0, my = 0, shown = false;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 2.5) + 'px,' + (my - 2.5) + 'px)';
      if (!shown) { shown = true; ring.style.opacity = 1; dot.style.opacity = 1; }
    });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + (rx - 17) + 'px,' + (ry - 17) + 'px)';
      requestAnimationFrame(loop);
    })();

    $$('a, button, .gal__i, input, select, textarea').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('is-hot'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('is-hot'); });
    });
  })();

  /* ---------- reveal on scroll ---------- */
  (function () {
    var els = $$('.reveal, .step');
    els.forEach(function (el) {
      if (el.dataset.d) el.style.setProperty('--d', el.dataset.d);
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- nav: sticky, esconder, seção ativa ---------- */
  (function () {
    var nav = $('#nav');
    var bar = $('#progress');
    var last = 0;
    var links = $$('.nav__links a[href^="#"]');
    var secs = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);

    function onScroll() {
      var y = window.scrollY;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';

      nav.classList.toggle('is-stuck', y > 40);
      nav.classList.toggle('is-hidden', y > 420 && y > last && !$('#navLinks').classList.contains('is-open'));
      last = y;

      var current = null;
      secs.forEach(function (s) {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', !a.classList.contains('btn') && a.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- menu mobile ---------- */
  (function () {
    var burger = $('#burger'), menu = $('#navLinks');
    function close() { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('#navLinks a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  })();

  /* ---------- parallax suave do hero ---------- */
  if (!reduced) {
    (function () {
      var art = $('.hero__art');
      var glows = $$('.hero__glow');
      var hero = $('#hero');
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (y > window.innerHeight * 1.2) return;
        glows.forEach(function (g, i) { g.style.translate = '0 ' + (y * (0.08 + i * 0.05)) + 'px'; });
        if (art) art.style.translate = '0 ' + (y * -0.06) + 'px';
      }, { passive: true });

      hero.addEventListener('mousemove', function (e) {
        var cx = (e.clientX / window.innerWidth - 0.5);
        var cy = (e.clientY / window.innerHeight - 0.5);
        $$('.hero__card').forEach(function (c, i) {
          var d = (i + 1) * 7;
          c.style.rotate = (cx * 1.6) + 'deg';
          c.style.translate = (cx * d) + 'px ' + (cy * d * 0.6) + 'px';
        });
      });
      hero.addEventListener('mouseleave', function () {
        $$('.hero__card').forEach(function (c) { c.style.rotate = '0deg'; c.style.translate = '0 0'; });
      });
    })();
  }

  /* ---------- botões magnéticos ---------- */
  if (!reduced && !window.matchMedia('(pointer: coarse)').matches) {
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.22 + 'px,' + y * 0.3 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- lightbox ---------- */
  (function () {
    var lb = $('#lb'), img = $('#lbImg');
    var items = $$('.gal__i');
    var idx = 0;

    function show(el) {
      var src = $('img', el);
      img.src = src.getAttribute('src');
      img.alt = src.alt;
      idx = items.indexOf(el);
      lb.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
    function step(n) {
      if (!items.length) return;
      idx = (idx + n + items.length) % items.length;
      show(items[idx]);
    }
    function close() { lb.classList.remove('is-open'); document.body.classList.remove('no-scroll'); }

    items.forEach(function (el) { el.addEventListener('click', function () { show(el); }); });
    $('#lbX').addEventListener('click', close);
    $('#lbP').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    $('#lbN').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb__fig')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    // swipe no mobile
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  })();

  /* ---------- formulário → WhatsApp ---------- */
  (function () {
    var form = $('#form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = $('#fNome').value.trim();
      var serv = $('#fServ').value;
      var dia  = $('#fDia').value.trim();
      var msg  = $('#fMsg').value.trim();

      var txt = 'Oi Ana! Meu nome é ' + (nome || '(sem nome)') + '.\n';
      txt += 'Vim pelo site e queria: ' + serv + '.';
      if (dia) txt += '\nMelhor dia pra mim: ' + dia + '.';
      if (msg) txt += '\n\n' + msg;

      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    });
  })();

  /* ---------- FAB aparece depois do hero ---------- */
  (function () {
    var fab = $('.fab');
    window.addEventListener('scroll', function () {
      fab.classList.toggle('is-on', window.scrollY > 500);
    }, { passive: true });
  })();

})();
