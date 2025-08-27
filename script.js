// Dark mode toggle
const toggle = document.getElementById("darkToggle");
toggle?.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});


(() => {
  const carousel = document.querySelector('.cert-carousel');
  if (!carousel) return;

  const cards = Array.from(carousel.querySelectorAll('.cert-card'));

  const setCenter = () => {
    const carouselRect = carousel.getBoundingClientRect();
    const centerX = carouselRect.left + carouselRect.width / 2;

    let closest = null;
    let closestDist = Infinity;
    cards.forEach(c => {
      const r = c.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(centerX - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = c;
      }
      c.classList.remove('is-center');
    });

    if (closest) closest.classList.add('is-center');
  };

  // initial call
  setCenter();

  // update on scroll / resize / touch
  let raf = null;
  carousel.addEventListener('scroll', () => {
    // throttle with rAF for smoothness
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setCenter);
  });
  window.addEventListener('resize', setCenter);
})();

