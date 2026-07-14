/* js/script.js
   Minimal JS for navigation, dropdowns and smooth scrolling
*/
(function () {
  // Year injections
  document.addEventListener('DOMContentLoaded', function () {
    var y = new Date().getFullYear();
    var el = document.getElementById('year'); if (el) el.textContent = y;
    var el2 = document.getElementById('year2'); if (el2) el2.textContent = y;

    initNavToggles();
    initOutsideClick();
    initSmoothScroll();
    initHeaderScroll();
    initDropdownKeyboard();
  });

  // Mobile nav toggle (works for any page using .nav-toggle and .main-nav)
  function initNavToggles() {
    var toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(function (btn) {
      var targetId = btn.getAttribute('aria-controls');
      var nav = targetId ? document.getElementById(targetId) : btn.nextElementSibling;
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        if (!nav) return;
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  // Close dropdowns and mobile nav when clicking outside
  function initOutsideClick() {
    document.addEventListener('click', function (e) {
      // close open dropdowns if click outside
      document.querySelectorAll('.has-dropdown').forEach(function (parent) {
        var dd = parent.querySelector('.dropdown');
        var toggleLink = parent.querySelector('a');
        if (!dd) return;
        if (!parent.contains(e.target)) {
          dd.setAttribute('aria-hidden', 'true');
          if (toggleLink) toggleLink.setAttribute('aria-expanded', 'false');
        }
      });

      // close mobile nav if click outside and viewport small
      var anyNav = document.querySelector('.main-nav.open');
      if (anyNav && !anyNav.contains(e.target) && !e.target.classList.contains('nav-toggle')) {
        anyNav.classList.remove('open');
        document.querySelectorAll('.nav-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false') });
      }
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown').forEach(function (d) { d.setAttribute('aria-hidden', 'true'); });
        document.querySelectorAll('.has-dropdown > a').forEach(function (a) { a.setAttribute('aria-expanded', 'false'); });
        document.querySelectorAll('.main-nav.open').forEach(function (n) { n.classList.remove('open'); });
        document.querySelectorAll('.nav-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      }
    });
  }

  // Smooth scroll for same-page anchors
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Make header non-transparent after scroll
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.remove('transparent');
      } else {
        header.classList.add('transparent');
      }
    });
  }

  // Keyboard support for dropdowns
  function initDropdownKeyboard() {
    document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      var parent = link.parentElement;
      var dropdown = parent.querySelector('.dropdown');
      if (!dropdown) return;
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');

      // toggle on Enter / Space
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var isOpen = dropdown.getAttribute('aria-hidden') === 'false';
          dropdown.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
          link.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        }
      });

      // also toggle on click for keyboard users
      link.addEventListener('click', function (e) {
        // allow normal navigation if link has href to a page
        var href = link.getAttribute('href');
        if (href && href.indexOf('#') !== 0) return;
        e.preventDefault();
        var isOpen = dropdown.getAttribute('aria-hidden') === 'false';
        dropdown.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
        link.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  }
})();

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (!slides.length || !nextBtn || !prevBtn) {
    return;
  }

  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);

  nextBtn.addEventListener("click", function () {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prevBtn.addEventListener("click", function () {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

});