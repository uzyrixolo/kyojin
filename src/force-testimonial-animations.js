/**
 * Force Testimonial Animations - Override any GSAP interference
 * This script ensures testimonial train animations work regardless of other scripts
 */

console.log('🚂 Force Testimonial Animations - Starting...');

class ForceTestimonialAnimations {
  constructor() {
    this.isRunning = false;
    this.animationFrames = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    console.log('🚂 Starting forced testimonial animations...');
    
    // Wait a bit for all other scripts to load
    setTimeout(() => {
      this.applyAnimations();
    }, 2000);
  }

  applyAnimations() {
    const column1 = document.querySelector('.testimonial-column-1 .testimonial-grid');
    const column2 = document.querySelector('.testimonial-column-2 .testimonial-grid');

    if (!column1 || !column2) {
      console.log('❌ Testimonial columns not found, retrying...');
      setTimeout(() => this.applyAnimations(), 1000);
      return;
    }

    console.log('✅ Found testimonial columns, applying animations...');

    // Force CSS animations with JavaScript
    this.forceAnimation(column1, 'slideUp');
    this.forceAnimation(column2, 'slideDown');
  }

  forceAnimation(element, type) {
    if (!element) return;

    // Clear any existing styles that might interfere
    element.style.animation = 'none';
    element.style.transform = '';
    
    // Force reflow
    element.offsetHeight;

    let keyframes, options;

    switch (type) {
      case 'slideUp':
        keyframes = [
          { transform: 'translateY(0px)', offset: 0 },
          { transform: 'translateY(-100px)', offset: 1 }
        ];
        options = {
          duration: 8000,
          iterations: Infinity,
          easing: 'linear'
        };
        break;

      case 'slideDown':
        keyframes = [
          { transform: 'translateY(-100px)', offset: 0 },
          { transform: 'translateY(0px)', offset: 1 }
        ];
        options = {
          duration: 10000,
          iterations: Infinity,
          easing: 'linear'
        };
        break;
    }

    // Use Web Animations API which is more reliable than CSS
    const animation = element.animate(keyframes, options);
    
    // Store animation reference
    this.animationFrames.push(animation);

    console.log(`✅ Applied ${type} animation to element:`, element);

    // Also force CSS animation as backup
    setTimeout(() => {
      element.style.animation = `${type}Animation 3s ease-in-out infinite`;
    }, 100);
  }

  // Cleanup method
  destroy() {
    this.animationFrames.forEach(animation => {
      animation.cancel();
    });
    this.animationFrames = [];
  }
}

// Add CSS keyframes as backup
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUpAnimation {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-100px); }
  }
  
  @keyframes slideDownAnimation {
    0% { transform: translateY(-100px); }
    100% { transform: translateY(0px); }
  }
`;
document.head.appendChild(style);

// Initialize the animation system
const testimonialAnimations = new ForceTestimonialAnimations();

// Make it globally available for debugging
window.testimonialAnimations = testimonialAnimations;

console.log('🚂 Force Testimonial Animations - Initialized!');
