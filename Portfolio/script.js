/* ══════════════════════════════════════════════════════════════
   JOHANNA KITZMAN PORTFOLIO — script.js
   All interactions: scroll animations, magnetic button,
   AI Lab cards, nav behavior, mobile menu, parallax
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── UTILITY ────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════════
   1. INTERSECTION OBSERVER — FADE UP + STAT COUNTERS
   ══════════════════════════════════════════════════════════════ */

(function initScrollAnimations() {
  const fadeItems = $$('.fade-up');
  if (!fadeItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeItems.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════════════
   2. STAT COUNTER ANIMATION
   ══════════════════════════════════════════════════════════════ */

(function initCounters() {
  const counters = $$('.count[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
})();

/* ══════════════════════════════════════════════════════════════
   3. MAGNETIC BUTTON EFFECT
   ══════════════════════════════════════════════════════════════ */

(function initMagneticButton() {
  const btn = document.getElementById('btn-mag');
  if (!btn) return;

  const STRENGTH = 0.22;
  const RADIUS   = 160; // px — how far cursor must be to activate

  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      const pull = (RADIUS - dist) / RADIUS;
      const tx = dx * STRENGTH * pull;
      const ty = dy * STRENGTH * pull;
      btn.style.transform = `translate(${tx}px, ${ty}px)`;
      btn.style.boxShadow = `0 0 ${20 + pull * 20}px rgba(207,157,123,${0.2 + pull * 0.25})`;
    }
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  });

  // Keyboard: reset on blur
  btn.addEventListener('blur', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  });
})();

/* ══════════════════════════════════════════════════════════════
   4. AI LAB CARD CLICK-TO-EXPAND
   ══════════════════════════════════════════════════════════════ */

(function initLabCards() {
  const cards = $$('.lab-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const detailId = card.getAttribute('aria-controls');
    const detail   = detailId ? document.getElementById(detailId) : null;
    const hint     = card.querySelector('.lab-expand-hint');

    function toggleCard() {
      const isExpanded = card.getAttribute('aria-expanded') === 'true';

      // Collapse all other cards first
      cards.forEach(other => {
        if (other !== card) {
          const otherId     = other.getAttribute('aria-controls');
          const otherDetail = otherId ? document.getElementById(otherId) : null;
          const otherHint   = other.querySelector('.lab-expand-hint');

          other.setAttribute('aria-expanded', 'false');
          if (otherDetail) otherDetail.hidden = true;
          if (otherHint)   otherHint.textContent = 'Click to explore ↓';
        }
      });

      // Toggle this card
      if (isExpanded) {
        card.setAttribute('aria-expanded', 'false');
        if (detail) detail.hidden = true;
        if (hint)   hint.textContent = 'Click to explore ↓';
      } else {
        card.setAttribute('aria-expanded', 'true');
        if (detail) {
          detail.hidden = false;
          // Smooth scroll to keep card in view after expand
          setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.bottom > window.innerHeight) {
              card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 50);
        }
        if (hint) hint.textContent = 'Click to close ↑';
      }
    }

    card.addEventListener('click', toggleCard);

    // Keyboard: Enter or Space
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   5. NAV SCROLL BEHAVIOR
   ══════════════════════════════════════════════════════════════ */

(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════════
   6. MOBILE MENU TOGGLE
   ══════════════════════════════════════════════════════════════ */

(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');

    if (isOpen) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      menu.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close menu when a nav link is clicked
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ══════════════════════════════════════════════════════════════
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   ══════════════════════════════════════════════════════════════ */

(function initSmoothScroll() {
  const NAV_HEIGHT = 68;

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   8. VAULT PARALLAX
   ══════════════════════════════════════════════════════════════ */

(function initVaultParallax() {
  const items = $$('.vault-item[data-parallax]');
  if (!items.length) return;

  // Only run on non-touch devices
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  // Only run if no reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    items.forEach(item => {
      const rect     = item.getBoundingClientRect();
      const speed    = parseFloat(item.dataset.parallax) || 0.2;
      const img      = item.querySelector('.vault-img');
      if (!img) return;

      // Only animate when near viewport
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const center   = rect.top + rect.height / 2;
      const viewport = window.innerHeight / 2;
      const offset   = (center - viewport) * speed * -0.4;

      img.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial run
  updateParallax();
})();

/* ══════════════════════════════════════════════════════════════
   9. ACTIVE NAV LINK HIGHLIGHT (scroll spy)
   ══════════════════════════════════════════════════════════════ */

(function initScrollSpy() {
  const sections  = $$('section[id], div[id]').filter(el =>
    document.querySelector(`.nav-link[href="#${el.id}"]`)
  );
  const navLinks  = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(el => spyObserver.observe(el));
})();

/* ══════════════════════════════════════════════════════════════
   10. ACTIVE NAV LINK STYLE (CSS injection)
   ══════════════════════════════════════════════════════════════ */

(function addActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--brass) !important;
    }
    .nav-link.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════════════════
   11. HERO ENTRANCE STAGGER
   ══════════════════════════════════════════════════════════════ */

(function initHeroEntrance() {
  // Immediately reveal hero elements on load (don't wait for scroll)
  window.addEventListener('load', () => {
    const heroFades = $$('.nexus .fade-up');
    heroFades.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 160);
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   12. VAULT IMAGE PLACEHOLDER — subtle grain texture
   ══════════════════════════════════════════════════════════════ */

(function addVaultGrain() {
  // Adds a subtle SVG noise texture to vault placeholder images
  // This will be replaced when real photography is added
  const svgNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

  $$('.vault-img').forEach(img => {
    img.style.backgroundImage = img.style.backgroundImage
      ? img.style.backgroundImage + ', ' + svgNoise
      : svgNoise;
  });
})();
