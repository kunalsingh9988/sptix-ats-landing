/* Sptix HRMS — homepage interactions */
(function () {
  'use strict';

  /* ---- salary visibility toggle ---- */
  var amt = document.getElementById('payAmt');
  var eye = document.getElementById('payEye');
  if (amt && eye) {
    var icOn  = eye.querySelector('.ic--eye');
    var icOff = eye.querySelector('.ic--eyeoff');
    eye.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var shown = amt.classList.toggle('is-shown');
      amt.textContent = shown ? amt.dataset.value : amt.dataset.masked;
      eye.setAttribute('aria-pressed', shown ? 'true' : 'false');
      eye.setAttribute('aria-label', shown ? 'Hide net pay' : 'Show net pay');
      if (icOn && icOff) {
        icOn.style.display  = shown ? 'none' : '';
        icOff.style.display = shown ? '' : 'none';
      }
    });
  }

  /* ---- bottom navigation ---- */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        x.classList.remove('is-active');
        x.removeAttribute('aria-current');
      });
      t.classList.add('is-active');
      t.setAttribute('aria-current', 'page');
    });
  });

  /* ---- placeholder navigation affordances ----
     Every actionable row/button is wired; routes are stubs until
     the app's router/backend is connected. */
  document.querySelectorAll('[data-action]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  /* ---- greeting by time of day ---- */
  var greet = document.querySelector('.hd-greet');
  var dateEl = document.querySelector('.hd-date');
  if (greet && dateEl) {
    var name = greet.innerHTML.split(/<br\s*\/?>/i)[1] || '';
    var h = new Date().getHours();
    var part = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    greet.innerHTML = part + (name ? '<br>' + name : '');
    dateEl.textContent = new Date().toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  }
})();
