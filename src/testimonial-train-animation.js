/**
 * Testimonial Train Animation
 * Creates seamless infinite scrolling animations for testimonial cards
 * Desktop: Vertical scrolling (opposite directions)
 * Mobile: Horizontal scrolling (alternating directions)
 */

class TestimonialTrainAnimation {
  constructor() {
    this.containers = [];
    this.isVisible = false;
    this.observer = null;
    this.isDesktop = window.innerWidth > 768;
    
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
    this.containers = document.querySelectorAll('.testimonial-train-container');
    
    if (this.containers.length === 0) {
      console.warn('Testimonial train containers not found');
      return;
    }

    this.setupIntersectionObserver();
    this.setupResponsiveHandling();
    this.addHoverEffects();
    this.optimizePerformance();
  }

  setupIntersectionObserver() {
    // Only animate when testimonials are visible for performance
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAnimations();
          } else {
            this.pauseAnimations();
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    // Observe the testimonial section
    const testimonialSection = document.querySelector('.testimonial-section');
    if (testimonialSection) {
      this.observer.observe(testimonialSection);
    }
  }

  setupResponsiveHandling() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth > 768;
        
        if (wasDesktop !== this.isDesktop) {
          this.updateAnimationSpeeds();
        }
      }, 250);
    });
  }

  startAnimations() {
    if (!this.isVisible) {
      this.isVisible = true;
      this.containers.forEach((container) => {
        container.style.animationPlayState = 'running';
      });
    }
  }

  pauseAnimations() {
    if (this.isVisible) {
      this.isVisible = false;
      this.containers.forEach((container) => {
        container.style.animationPlayState = 'paused';
      });
    }
  }

  addHoverEffects() {
    this.containers.forEach((container, index) => {
      const cardGroup = container.closest('.card-group');
      
      if (cardGroup) {
        cardGroup.addEventListener('mouseenter', () => {
          // Slow down animation on hover for better readability
          const currentDuration = this.getAnimationDuration(index);
          container.style.animationDuration = `${currentDuration * 1.5}s`;
        });

        cardGroup.addEventListener('mouseleave', () => {
          // Reset to normal speed
          const normalDuration = this.getAnimationDuration(index);
          container.style.animationDuration = `${normalDuration}s`;
        });
      }
    });
  }

  getAnimationDuration(index) {
    // Different speeds for different columns to create variety
    if (this.isDesktop) {
      return [30, 25, 28][index] || 30;
    } else {
      return [20, 22, 18][index] || 20;
    }
  }

  updateAnimationSpeeds() {
    this.containers.forEach((container, index) => {
      const duration = this.getAnimationDuration(index);
      container.style.animationDuration = `${duration}s`;
    });
  }

  optimizePerformance() {
    // Use GPU acceleration for all containers
    this.containers.forEach((container) => {
      container.style.willChange = 'transform';
      container.style.transform = 'translateZ(0)';
      container.style.backfaceVisibility = 'hidden';
    });

    // Pause animations when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else if (this.isVisible) {
        this.startAnimations();
      }
    });

    // Pause animations during scrolling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      this.pauseAnimations();
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (this.isVisible) {
          this.startAnimations();
        }
      }, 100);
    }, { passive: true });
  }

  // Method to adjust speeds dynamically
  setColumnSpeed(columnIndex, seconds) {
    if (this.containers[columnIndex]) {
      this.containers[columnIndex].style.animationDuration = `${seconds}s`;
    }
  }

  // Method to add new testimonial cards dynamically
  addTestimonialCard(columnIndex, cardHTML) {
    if (this.containers[columnIndex]) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const newCard = tempDiv.firstElementChild;
      
      // Add the card twice for seamless loop
      this.containers[columnIndex].appendChild(newCard.cloneNode(true));
      this.containers[columnIndex].appendChild(newCard);
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.setupResponsiveHandling);
    document.removeEventListener('visibilitychange', this.optimizePerformance);
  }
}

// Initialize the testimonial train animation
const testimonialTrain = new TestimonialTrainAnimation();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestimonialTrainAnimation;
}

// Make it available globally for debugging
window.TestimonialTrainAnimation = testimonialTrain;
