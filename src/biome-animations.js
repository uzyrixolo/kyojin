/**
 * Anime.js Integration Demo
 * Shows how to use Anime.js for biome growth animations in your vanilla JS project
 */

import anime from 'animejs/lib/anime.es.js';

class BiomeAnimations {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize biome growth animations
   */
  init() {
    if (this.initialized) return;

    // Wait for components to load
    setTimeout(() => {
      this.initHeroAnimations();
      this.initVideoAnimations(); 
      this.initParticleAnimations();
      this.initScrollTriggers();
      this.initialized = true;
      console.log('🎬 Biome animations initialized with Anime.js');
    }, 500);
  }

  /**
   * Hero section organic growth animations
   */
  initHeroAnimations() {
    const heroImage = document.querySelector('.product-hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');

    if (heroImage) {
      // Organic growth animation for hero image
      anime({
        targets: heroImage,
        scale: [0.5, 1],
        rotate: [0, 5, 0],
        opacity: [0, 1],
        duration: 1800,
        easing: 'easeOutElastic(1, .6)',
        delay: 800
      });
    }

    if (heroTitle) {
      // Morphing text animation
      anime({
        targets: heroTitle,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutCubic',
        delay: 400
      });
    }

    // Staggered button animations
    if (heroButtons.length > 0) {
      anime({
        targets: heroButtons,
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        easing: 'easeOutBack',
        delay: anime.stagger(150, {start: 1000})
      });
    }
  }

  /**
   * Video section biome-like animations
   */
  initVideoAnimations() {
    const circleImage = document.querySelector('.circle-image');
    const centerIcon = document.querySelector('.center-icon svg');
    const videoTexts = document.querySelectorAll('.video-text');

    if (circleImage) {
      // Continuous organic rotation
      anime({
        targets: circleImage,
        rotate: 360,
        duration: 20000,
        easing: 'linear',
        loop: true
      });

      // Breathing effect
      anime({
        targets: circleImage,
        scale: [1, 1.05, 1],
        duration: 4000,
        easing: 'easeInOutSine',
        loop: true
      });
    }

    if (centerIcon) {
      // Icon morphing animation
      anime({
        targets: centerIcon,
        scale: [0, 1],
        rotate: [0, 10, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        delay: 1200
      });
    }

    // Text emergence animations
    if (videoTexts.length > 0) {
      anime({
        targets: videoTexts,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutCubic',
        delay: anime.stagger(200, {start: 1500})
      });
    }
  }

  /**
   * Create floating particle system
   */
  initParticleAnimations() {
    this.createBiomeParticles();
  }

  /**
   * Create organic floating particles
   */
  createBiomeParticles() {
    const particleContainer = document.querySelector('.hero-section');
    if (!particleContainer) return;

    // Create particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'biome-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 4}px;
        height: ${Math.random() * 6 + 4}px;
        background: rgba(139, 115, 85, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      
      particleContainer.appendChild(particle);

      // Animate particle with organic movement
      anime({
        targets: particle,
        translateX: () => Math.random() * window.innerWidth,
        translateY: () => Math.random() * window.innerHeight,
        scale: [0, 1, 0.5, 1],
        opacity: [0, 0.6, 0.2, 0.6],
        duration: () => Math.random() * 8000 + 6000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: () => Math.random() * 2000
      });
    }
  }

  /**
   * Scroll-triggered animations
   */
  initScrollTriggers() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSection(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.testimonial-section, .product-section, .mission-section');
    sections.forEach(section => observer.observe(section));
  }

  /**
   * Animate section when it comes into view
   */
  animateSection(section) {
    const cards = section.querySelectorAll('.testimonial-card, .product-image-wrapper');
    const titles = section.querySelectorAll('h1, h2, .product-section-title');
    const content = section.querySelectorAll('p, .product-section-description');

    // Animate cards with organic growth
    if (cards.length > 0) {
      anime({
        targets: cards,
        scale: [0.8, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .6)',
        delay: anime.stagger(100)
      });
    }

    // Animate titles
    if (titles.length > 0) {
      anime({
        targets: titles,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic'
      });
    }

    // Animate content
    if (content.length > 0) {
      anime({
        targets: content,
        translateY: [15, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(50, {start: 200})
      });
    }
  }

  /**
   * Create morphing blob animation (advanced biome effect)
   */
  createMorphingBlob(container) {
    // This would create SVG-based morphing animations
    // Perfect for biome growth effects
    const blob = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    blob.innerHTML = `
      <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" fill="rgba(45,80,22,0.1)"/>
    `;
    
    container.appendChild(blob);

    // Animate blob morphing
    anime({
      targets: blob.querySelector('path'),
      d: [
        'M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z',
        'M25,15 Q55,5 85,25 Q95,55 75,85 Q45,95 15,75 Q5,45 25,15 Z',
        'M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z'
      ],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });
  }
}

// Export the animations class for use in main components
export { BiomeAnimations };
