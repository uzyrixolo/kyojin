/**
 * Footer Train Animation
 * Creates seamless infinite scrolling animation for footer tagline
 */

class FooterTrainAnimation {
  constructor() {
    this.container = null;
    this.isVisible = false;
    this.observer = null;
    this.animationSpeed = 25; // seconds for full cycle
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.container = document.querySelector('.footer-train-container');
    
    if (!this.container) {
      console.warn('Footer train container not found');
      return;
    }

    this.setupIntersectionObserver();
    this.addHoverEffects();
    this.optimizePerformance();
  }

  setupIntersectionObserver() {
    // Only animate when footer is visible for performance
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAnimation();
          } else {
            this.pauseAnimation();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    this.observer.observe(this.container);
  }

  startAnimation() {
    if (!this.isVisible) {
      this.isVisible = true;
      this.container.style.animationPlayState = 'running';
    }
  }

  pauseAnimation() {
    if (this.isVisible) {
      this.isVisible = false;
      this.container.style.animationPlayState = 'paused';
    }
  }

  addHoverEffects() {
    const track = document.querySelector('.footer-marquee-track');
    
    if (track) {
      track.addEventListener('mouseenter', () => {
        this.container.style.animationDuration = `${this.animationSpeed * 1.5}s`;
      });

      track.addEventListener('mouseleave', () => {
        this.container.style.animationDuration = `${this.animationSpeed}s`;
      });
    }
  }

  optimizePerformance() {
    // Use GPU acceleration
    if (this.container) {
      this.container.style.willChange = 'transform';
      this.container.style.transform = 'translateZ(0)'; // Force hardware acceleration
    }

    // Pause animation when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimation();
      } else if (this.isVisible) {
        this.startAnimation();
      }
    });
  }

  // Method to adjust speed dynamically
  setSpeed(seconds) {
    this.animationSpeed = seconds;
    if (this.container) {
      this.container.style.animationDuration = `${seconds}s`;
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize the train animation
const footerTrain = new FooterTrainAnimation();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FooterTrainAnimation;
}
