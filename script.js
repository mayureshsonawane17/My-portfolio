
/* =========================================
   ACCESSIBILITY & DEVICE DETECTION
========================================= */

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

const isTouchDevice = window.matchMedia(
  '(hover: none), (pointer: coarse)'
);


/* =========================================
   SCROLL REVEAL
========================================= */

const targets = [
  '.section-label',
  '.about-copy',
  '.skills h2',
  '.project-card',
  '.contact-content'
];

targets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});

document.querySelectorAll('.skill-list li').forEach((li, i) => {
  li.classList.add('reveal');
  li.style.setProperty('--d', `${i * 0.1}s`);
});

const revealElements = document.querySelectorAll('.reveal');

if (
  'IntersectionObserver' in window &&
  !prefersReducedMotion.matches
) {

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('is-visible');

        obs.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));

} else {

  revealElements.forEach(el => {
    el.classList.add('is-visible');
  });

}


/* =========================================
   MOUSE PARALLAX
========================================= */

const scene = document.querySelector('.orb-scene');

if (
  scene &&
  !isTouchDevice.matches &&
  !prefersReducedMotion.matches
) {

  window.addEventListener('pointermove', (e) => {

    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    scene.style.translate = `${x * -35}px ${y * -35}px`;

  }, {
    passive: true
  });

}


/* =========================================
   CUSTOM CURSOR
========================================= */

if (
  !isTouchDevice.matches &&
  !prefersReducedMotion.matches
) {

  const cursor = document.createElement('div');

  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');

  document.body.appendChild(cursor);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  let cx = mx;
  let cy = my;

  let animationFrame;

  window.addEventListener('pointermove', e => {

    mx = e.clientX;
    my = e.clientY;

  }, {
    passive: true
  });

  function animateCursor() {

    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;

    cursor.style.transform =
      `translate3d(${cx - 7}px, ${cy - 7}px, 0)`;

    animationFrame = requestAnimationFrame(animateCursor);

  }

  animateCursor();


  // Hover interactions

  document.querySelectorAll('a, .project-card').forEach(el => {

    el.addEventListener('pointerenter', () => {
      cursor.classList.add('is-hover');
    });

    el.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-hover');
    });

  });


  // Stop unnecessary animation when tab is hidden

  document.addEventListener('visibilitychange', () => {

    if (document.hidden) {

      cancelAnimationFrame(animationFrame);

    } else {

      animateCursor();

    }

  });

}


/* =========================================
   LENIS SMOOTH SCROLL
========================================= */

let lenis = null;
let lenisFrame = null;

if (
  window.Lenis &&
  !prefersReducedMotion.matches
) {

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: false
  });

  function raf(time) {

    lenis.raf(time);

    lenisFrame = requestAnimationFrame(raf);

  }

  lenisFrame = requestAnimationFrame(raf);

}


/* =========================================
   CLEAN UP
========================================= */

window.addEventListener('pagehide', () => {

  if (lenisFrame) {
    cancelAnimationFrame(lenisFrame);
  }

  if (lenis) {
    lenis.destroy();
  }

});
