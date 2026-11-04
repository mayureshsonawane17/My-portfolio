// --- Scroll reveal (adds the class automatically, no HTML edits needed) ---
const targets = '.section-label, .about-copy, .skills h2, .project-card, .contact-content';
document.querySelectorAll(targets).forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.skill-list li').forEach((li, i) => {
  li.classList.add('reveal');
  li.style.setProperty('--d', `${i * 0.1}s`); // staggered list
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// --- Mouse parallax on the orb ---
const scene = document.querySelector('.orb-scene');
window.addEventListener('pointermove', (e) => {
  const x = e.clientX / innerWidth - 0.5;
  const y = e.clientY / innerHeight - 0.5;
  scene.style.translate = `${x * -50}px ${y * -50}px`;
});

// --- Custom cursor with smooth follow ---
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);
let mx = 0, my = 0, cx = 0, cy = 0;
window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  cursor.style.transform = `translate(${cx - 7}px, ${cy - 7}px)`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, .project-card').forEach(el => {
  el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
  el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
});

// --- Smooth inertia scroll (Lenis, loaded in HTML) ---
if (window.Lenis) {
  const lenis = new Lenis({ lerp: 0.08 });
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
}