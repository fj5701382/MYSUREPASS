document.addEventListener('DOMContentLoaded', () => {
  const pageRole = document.body.dataset.dashboardRole;

  // Convenience redirect only. This is NOT security: anyone can edit browser
  // storage. TODO: real access control must come from the backend.
  let savedRole = null;
  try {
    savedRole = localStorage.getItem('msp_role');
  } catch (error) {
    /* storage unavailable */
  }

  if (pageRole === 'student' && savedRole === 'teacher') {
    window.location.replace('teacher-dashboard.html');
    return;
  }

  if (pageRole === 'teacher' && savedRole !== 'teacher') {
    window.location.replace(savedRole === 'student' ? 'dashboard.html' : 'login.html');
    return;
  }

  // Mobile menu drawer
  const sidebar = document.getElementById('appSidebar');
  const scrim = document.getElementById('appScrim');
  const menuBtn = document.getElementById('menuBtn');
  if (!sidebar || !scrim || !menuBtn) return;

  function setMenu(open) {
    sidebar.classList.toggle('is-open', open);
    scrim.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      sidebar.querySelector('a.app-nav-link')?.focus();
    } else {
      menuBtn.focus();
    }
  }

  menuBtn.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
  scrim.addEventListener('click', () => setMenu(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) setMenu(false);
  });

  // Close the drawer if the window grows to desktop size
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) {
      sidebar.classList.remove('is-open');
      scrim.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});