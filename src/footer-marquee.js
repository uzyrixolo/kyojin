// Footer Marquee Animation using Anime.js
import * as anime from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('footer-marquee-track');
  if (!track) return;

  const animate = () => {
    const textWidth = track.scrollWidth / 2;
    const duration = 36000; // ms for one full scroll
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // Calculate progress (0 to 1)
      const progress = (elapsed % duration) / duration;
      // Move from 0 to -textWidth
      track.style.transform = `translateX(${-progress * textWidth}px)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  if (document.fonts) {
    document.fonts.ready.then(animate);
  } else {
    setTimeout(animate, 500);
  }
});
