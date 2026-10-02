document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('amcMenuToggle');
  const panel = document.getElementById('amcMenuPanel');
  const closeButton = document.getElementById('amcMenuClose');

  if (!toggle || !panel) return;

  function openMenu() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (panel.hidden) openMenu(); else closeMenu();
  });

  closeButton?.addEventListener('click', closeMenu);

  document.addEventListener('click', (event) => {
    if (!panel.contains(event.target) && event.target !== toggle) {
      closeMenu();
    }
  });
});

/* ── Mobile navbar hamburger (collapses nav links on small screens) ── */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navbarToggle');
  const navLinks = document.getElementById('navbarLinks');
  const navOverlay = document.getElementById('navbarOverlay');
  if (!navToggle || !navLinks) return;

  function openNav() {
    navLinks.classList.add('is-open');
    navOverlay?.classList.add('is-open');
    if (navOverlay) navOverlay.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.textContent = '✕';
  }

  function closeNav() {
    navLinks.classList.remove('is-open');
    navOverlay?.classList.remove('is-open');
    if (navOverlay) navOverlay.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('is-open') ? closeNav() : openNav();
  });
  navOverlay?.addEventListener('click', closeNav);
  // Close the mobile menu automatically after navigating to a link inside it.
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
  // If the viewport is resized back to desktop width, drop the open state
  // so the panel doesn't stay forced-open when the layout switches back.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });
});