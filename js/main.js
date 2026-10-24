// Sptix landing — mobile nav + FAQ accordion
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var header = document.querySelector(".site-header");

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (menu.hidden) openMenu(); else closeMenu();
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!menu.hidden && !header.contains(e.target)) closeMenu();
    });

    // Reset menu state when resizing back to desktop
    var mq = window.matchMedia("(min-width: 881px)");
    if (mq.addEventListener) mq.addEventListener("change", function (e) { if (e.matches) closeMenu(); });
  }

  // FAQ: keep one item open at a time
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Footer year (if a year placeholder exists)
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
