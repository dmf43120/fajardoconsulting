/* ═══════════════════════════════════════════════
   FAJARDO CONSULTING GROUP — Global JS
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── ACTIVE NAV LINK ────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── MOBILE NAV TOGGLE ─────────────────────
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const bars = toggle.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  }

  // ── SCROLL REVEAL ─────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ── NAV SCROLL SHADOW ─────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 20
        ? 'rgba(13,13,11,0.97)'
        : 'rgba(13,13,11,0.88)';
    }, { passive: true });
  }

  // ── SMOOTH ANCHOR SCROLLING ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileNav) mobileNav.classList.remove('open');
      }
    });
  });

  // ── CONTACT FORM ──────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.opacity = '0.7';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.opacity = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

});
