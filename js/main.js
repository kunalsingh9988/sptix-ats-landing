/* Sptix — Figma homepage: zoom fit, mobile nav, mock-scale, FAQ */
(function () {
  'use strict';
  var DESIGN_W = 1014;
  var figma = document.getElementById('figma');

  /* ---------- desktop zoom: design fills viewport >=1014 ---------- */
  function applyZoom() {
    var w = window.innerWidth;
    if (w >= 1014) {
      figma.style.zoom = w / DESIGN_W;
    } else {
      figma.style.zoom = '';
    }
    mockScale();
  }

  /* ---------- mock-scale: shrink fixed-px mockups to fit ---------- */
  var MS = [
    { s: '.sec-dashboard [data-node-id="40000082:286"]' },  // browser+dashboard mockup
    { s: '.sec-problem  [data-node-id="40000082:186"]' },   // problem detail panel
    { s: '.sec-aiagent  [data-node-id="40000082:1185"]' },  // ai agent panel
    { s: '.sec-compare  [data-node-id="40000082:1742"]', min: 0.75 }, // comparison table
    { s: '.sec-industries [data-node-id="40000082:1959"]' },// industry hub diagram
    { s: '.sec-trusted  [data-node-id="40000082:124"]' }    // logo strip
  ];
  var msEls = MS.map(function (m) {
    var el = document.querySelector(m.s);
    return el ? { el: el, min: m.min || 0 } : null;
  }).filter(Boolean);

  function mockScale() {
    if (window.innerWidth >= 1014) {
      msEls.forEach(function (m) { m.el.style.zoom = ''; });
      return;
    }
    msEls.forEach(function (m) {
      var el = m.el;
      el.style.zoom = '';
      var natural = el.scrollWidth || el.offsetWidth;
      var avail = el.parentElement ? el.parentElement.clientWidth : window.innerWidth;
      if (avail < 10) return;
      var z = Math.max(m.min, Math.min(1, avail / natural));
      el.style.zoom = z;
      el.style.marginLeft = 'auto';
      el.style.marginRight = 'auto';
    });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById('mnavToggle');
  var mnav = document.getElementById('mnav');
  if (mnav) {
    var links = ['Products', 'Features', 'Talent Cloud', 'Pricing', 'Job Seekers', 'Hiring Teams', 'Log in'];
    mnav.innerHTML = links.map(function (t) { return '<a href="#">' + t + '</a>'; }).join('');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function (e) {
      if (mnav.classList.contains('open') && !mnav.contains(e.target) && e.target !== toggle) {
        mnav.classList.remove('open'); toggle.classList.remove('open');
      }
    });
  }

  /* ---------- FAQ: mark items, toggle ---------- */
  var faqSec = document.querySelector('.sec-faq');
  if (faqSec) {
    // each question block: container with an icon in the last child div
    var items = faqSec.querySelectorAll('[data-node-id] > div[class]');
  }
  // Generic: find FAQ question containers (children of :2092 list)
  var faqList = document.querySelector('[data-node-id="40000082:2092"]');
  if (faqList) {
    Array.prototype.forEach.call(faqList.children, function (item, idx) {
      item.classList.add('faq-item');
      item.classList.add(idx === 0 ? 'open' : 'closed');
      var chev = item.querySelector('[data-name="Icon"]');
      if (chev) chev.classList.add('faq-chev');
      item.addEventListener('click', function () {
        // Only the first item has an answer in the design; others swap open state
        Array.prototype.forEach.call(faqList.children, function (s) { s.classList.remove('open'); s.classList.add('closed'); });
        item.classList.remove('closed'); item.classList.add('open');
      });
    });
  }

  /* ---------- run ---------- */
  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(applyZoom, 80); });
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(mockScale); }
  window.addEventListener('load', applyZoom);
  applyZoom();
})();
