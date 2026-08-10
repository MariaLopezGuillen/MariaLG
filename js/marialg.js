/* =============================================================
   MARÍA LÓPEZ — PORTFOLIO
   JS: menú móvil, estado del nav al hacer scroll, enlace activo,
   revelado en scroll y año dinámico del footer.
   Todo respeta prefers-reduced-motion.
============================================================= */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* -----------------------------------------------------------
     1. MENÚ MÓVIL (hamburguesa)
  ----------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  };

  const openMenu = () => {
    navLinks.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Cierra el menú al pulsar un enlace
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    // Cierra el menú al pulsar fuera de él
    document.addEventListener('click', (event) => {
      const clickedInsideNav = event.target.closest('#site-nav');
      if (!clickedInsideNav && navLinks.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------------------------
     2. ESTADO DEL NAV AL HACER SCROLL (fondo + borde)
  ----------------------------------------------------------- */
  const siteNav = document.getElementById('site-nav');

  const updateNavState = () => {
    if (!siteNav) return;
    siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  /* -----------------------------------------------------------
     3. ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('[data-nav-link]');

  if (sections.length && navLinkEls.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach((link) => {
            const isCurrent = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', isCurrent);
          });
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* -----------------------------------------------------------
     4. REVELADO SUAVE AL HACER SCROLL
  ----------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.project-card, .skill-card, .about-card, .about-copy, .timeline-item'
  );

  if (revealTargets.length) {
    revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );

      revealTargets.forEach((el) => revealObserver.observe(el));
    }
  }

  /* -----------------------------------------------------------
     6. FILTRO DE PROYECTOS (Todos / Propios / Clientes)
  ----------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.project-filter');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');
  const emptyMessage = document.getElementById('project-filter-empty');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        let visibleCount = 0;
        projectCards.forEach((card) => {
          const matches = filter === 'todos' || card.getAttribute('data-category') === filter;
          card.hidden = !matches;
          if (matches) visibleCount += 1;
        });

        if (emptyMessage) {
          emptyMessage.hidden = visibleCount !== 0;
        }
      });
    });
  }

  /* -----------------------------------------------------------
     7. AÑO DINÁMICO EN EL FOOTER
  ----------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();