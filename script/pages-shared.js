document.addEventListener('DOMContentLoaded', () => {
  const navbarHost = document.querySelector('[data-shared-navbar]');
  if (!navbarHost) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = [
    { label: 'Home', href: 'index.html', key: 'index.html' },
    { label: 'Past Questions', href: 'past-questions.html', key: 'past-questions.html' },
    { label: 'Contact Us', href: 'support.html', key: 'support.html' },
    { label: 'About Us', href: 'about.html', key: 'about.html' },
    { label: 'For Teachers', href: 'teachers.html', key: 'teachers.html' },
    { label: 'API', href: 'api.html', key: 'api.html' }
  ];

  const navMarkup = `
    <header class="navbar" id="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="logo" aria-label="MySurePass home">
          <img src="assets/images/logo.svg" alt="" class="logo-mark" width="28" height="28" />
          <span>MySurePass</span>
        </a>

        <nav class="nav-links" aria-label="Main navigation">
          ${navItems.map(({ label, href, key }) => `
            <a href="${href}" ${currentPath === key ? 'aria-current="page" class="is-active"' : ''}>${label}</a>
          `).join('')}
        </nav>

        <div class="nav-actions">
          <a href="login.html" class="nav-login">Log In</a>
          <div class="user-avatar" aria-label="User account">AA</div>
          <button class="hamburger" id="hamburger" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <nav aria-label="Mobile navigation">
          ${navItems.map(({ label, href, key }) => `
            <a href="${href}" ${currentPath === key ? 'aria-current="page" class="is-active"' : ''}>${label}</a>
          `).join('')}
        </nav>
        <div class="mobile-actions">
          <a href="login.html" class="btn btn-secondary">Log In</a>
          <a href="register.html" class="btn btn-primary">Register</a>
        </div>
      </div>
    </header>
  `;

  navbarHost.innerHTML = navMarkup;

  const navBar = navbarHost.querySelector('.navbar');
  const headerHamburger = navbarHost.querySelector('.hamburger');
  const mobileNav = navbarHost.querySelector('.mobile-menu');

  if (headerHamburger && mobileNav) {
    const setMenuOpen = (open) => {
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      headerHamburger.setAttribute('aria-expanded', String(open));
      headerHamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    headerHamburger.addEventListener('click', () => {
      setMenuOpen(headerHamburger.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && headerHamburger.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        headerHamburger.focus();
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (headerHamburger.getAttribute('aria-expanded') === 'true' && !navBar.contains(event.target)) {
        setMenuOpen(false);
      }
    });
  }

  if (navBar) {
    navBar.classList.add('shared-navbar');
  }
});
