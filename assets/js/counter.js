// Simple counter animation - counts up to the target number, then stops and stays there.
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const duration = 600; // total animation time in ms

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target; // lock on the final number
      }
    }
    requestAnimationFrame(step);
  }

  // Only start counting once the numbers actually scroll into view
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // run once, then stop watching
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
});
