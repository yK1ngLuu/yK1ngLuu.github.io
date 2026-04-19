const HEADER_OFFSET = 80;
const SCROLL_DURATION = 1200;

function easeCinematic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function cinematicScrollTo(targetY) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  document.body.classList.add('scrolling');

  function step(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = Math.min((currentTime - startTime) / SCROLL_DURATION, 1);
    const eased = easeCinematic(progress);

    const y = startY + distance * eased;
    window.scrollTo(0, y);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      document.body.classList.remove('scrolling');
    }
  }

  requestAnimationFrame(step);
}

// NAV
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    cinematicScrollTo(target.offsetTop - HEADER_OFFSET);
  });
});

// BOTÃO
function scrollToSection(id) {
  const target = document.getElementById(id);
  cinematicScrollTo(target.offsetTop - HEADER_OFFSET);
}

// PARTICLES
const particlesContainer = document.getElementById("particles");

const TOTAL = 60; // quantidade de bolinhas

for (let i = 0; i < TOTAL; i++) {
  const p = document.createElement("div");
  p.classList.add("particle");

  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = (5 + Math.random() * 5) + "s";
  p.style.opacity = Math.random();

  particlesContainer.appendChild(p);
}