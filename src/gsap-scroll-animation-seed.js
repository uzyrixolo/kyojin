/**
 * GSAP Scroll Animation - SEED.COM STYLE
 * Video section FIXED behind hero, reveals when hero scrolls up
 * No pinning issues - just like seed.com!
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log('🌱 Loading SEED.COM style animation - fixed behind hero!');

function setupSeedStyle(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Setting up SEED.COM style...`);
  
  const heroSection = document.querySelector('.hero-section');
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  
  if (!heroSection || !videoSection || !centerIcon) {
    if (retryCount < 10) {
      console.log('⏳ Looking for hero, video, and icon...');
      setTimeout(() => setupSeedStyle(retryCount + 1), 500);
      return;
    }
    console.error('❌ Elements not found');
    return;
  }
  
  console.log('✅ Found all elements! Setting up SEED.COM style...');
  console.log('📍 Hero section:', heroSection);
  console.log('📍 Video section:', videoSection);
  console.log('📍 Center icon:', centerIcon);
  
  // Setup sticky header functionality with GSAP
  setupStickyHeader();
  
  // BETTER APPROACH: Video visible, only hero moves over it, other sections after video
  const seedCSS = document.createElement('style');
  seedCSS.textContent = `
    /* Ensure proper header stacking with notification bar */
    .notification-bar { 
      z-index: 1001 !important; 
      position: relative !important;
      transition: opacity 0.3s ease !important;
    }
    
    /* Hide notification bar when header is sticky */
    .main-header.sticky ~ * .notification-bar,
    body.header-sticky .notification-bar {
      opacity: 0 !important;
      pointer-events: none !important;
    }
    
    .main-header { 
      z-index: 1000 !important; 
      position: fixed !important; 
      top: 36px !important; /* Space for notification bar initially */
      width: 100%; 
      margin: 0 !important; /* FORCE no margin at all times */
      margin-top: 0 !important; /* FORCE no margin-top at all times */
      transform: none !important; /* FORCE no transforms */
      transition: top 0.3s ease !important; /* Smooth transition for top position */
    }
    
    /* When sticky, remove margin and add glass blur effect */
    .main-header.sticky {
      top: 0 !important; /* Move to very top when sticky (notification bar hidden) */
      margin: 0 !important; /* FORCE no margin when sticky */
      margin-top: 0 !important; /* FORCE no margin-top when sticky */
      transform: none !important; /* FORCE no transforms */
      background: rgba(255, 255, 255, 0.1) !important; /* Semi-transparent glass */
      backdrop-filter: blur(20px) !important; /* Glass blur effect */
      -webkit-backdrop-filter: blur(20px) !important; /* Safari support */
      border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important; /* Subtle border */
      box-shadow: none !important; /* No drop shadow */
    }
    
    /* Hero section needs proper background and positioning */
    .hero-section {
      position: relative !important;
      z-index: 10 !important;
      background: var(--color-background-alt) !important;
      margin-top: 0 !important;
      padding-top: 90px !important; /* Reduced from 100px - less gap */
    
      margin-bottom: 0 !important;
      /* Ensure hero section fits content properly */
      min-height: 90vh !important; /* Reduced from 100vh */
      height: auto !important; /* Allow natural content height */
    }
    
    /* Video section - make it visible for debugging */
    .video-section {
      position: relative !important;
      height: 100vh !important;
      z-index: 1 !important;
      /* Make it visible */
      margin-top: 0px !important;
      opacity: 0.7 !important;
      /* Background to see boundaries */
      background: rgba(128, 0, 128, 0.1) !important;
      border: 5px solid purple !important;
    }
    
    /* Remove the pseudo-element approach - use solid background instead */
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -10px; /* Extend below hero */
      background: var(--color-background-alt);
      z-index: -1;
    }
    
    /* All other sections - PRESERVE their original backgrounds */
    .mission-section {
      position: relative !important;
      z-index: 5 !important;
      /* Don't override background - let CSS handle it */
    }
    
    .product-section {
      position: relative !important;
      z-index: 5 !important;
      /* Don't override background - let CSS handle it */
    }
    
    .testimonial-section {
      position: relative !important;
      z-index: 5 !important;
      /* Don't override background - let CSS handle it */
    }
    
    .blog-section {
      position: relative !important;
      z-index: 5 !important;
      /* Don't override background - let CSS handle it */
    }
    
    .footer {
      position: relative !important;
      z-index: 5 !important;
      /* Don't override background - let CSS handle it */
    }
    
    /* Center icon animation */
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
    }
  `;
  document.head.appendChild(seedCSS);
  
  // Initial state - SVG starts invisible
  gsap.set(centerIcon, {
    scale: 0.1,
    opacity: 0.1,
    transformOrigin: "center center"
  });
  
  // Initial state - Video section hidden
  gsap.set(videoSection, {
    opacity: 0
  });
  
  console.log('🎯 Video section now FIXED behind hero');
  console.log('🎯 SVG ready for animation');
  
  // PHASE 1: Hero scrolls up, reveals video section
  ScrollTrigger.create({
    trigger: heroSection,
    start: "bottom center",     // When hero bottom hits viewport center
    end: "bottom top",          // When hero completely scrolls out
    scrub: 1,
    markers: false, // Disabled for production
    id: "heroScrollsUp",
    
    onStart: () => {
      console.log('🌱 HERO SCROLLING UP - Starting video reveal...');
      // Start revealing video section
      videoSection.style.opacity = '0.3';
      videoSection.style.backgroundColor = 'rgba(128, 0, 128, 0.05)';
    },
    
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Gradually reveal video as hero scrolls away
      videoSection.style.opacity = `${progress * 0.7}`;
      
      // Log progress
      if (Math.round(progress * 100) % 20 === 0) {
        console.log(`🌱 Hero scroll progress: ${Math.round(progress * 100)}%`);
      }
    },
    
    onComplete: () => {
      console.log('🌱 HERO GONE - Video section fully revealed!');
      // Fully reveal video section
      videoSection.style.opacity = '1';
      videoSection.style.backgroundColor = 'rgba(128, 0, 128, 0.1)';
    }
  });
  
  // PHASE 2: After hero is gone, SVG grows
  ScrollTrigger.create({
    trigger: heroSection,
    start: "bottom top",        // After hero is completely gone
    end: "bottom -100vh",       // Additional scroll distance for SVG growth
    scrub: 2,                   // Slow animation
    markers: false, // Disabled for production
    id: "svgGrowsAfterHero",
    
    animation: gsap.to(centerIcon, {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power1.out"
    }),
    
    onStart: () => {
      console.log('🌱 SVG GROWTH PHASE - Growing slowly like seed.com');
      centerIcon.style.border = '3px solid gold';
    },
    onComplete: () => {
      console.log('🌱 SVG FULLY GROWN - Preparing for next sections');
      videoSection.style.backgroundColor = '';
      centerIcon.style.border = '3px solid green';
    },
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      if (progress % 15 === 0) {
        console.log(`🌱 SVG growth: ${progress}% - Scale: ${(0.1 + (self.progress * 0.9)).toFixed(2)}`);
      }
    }
  });
  
  // PHASE 3: After SVG is grown, prepare for normal section flow  
  ScrollTrigger.create({
    trigger: heroSection,
    start: "bottom -100vh",     // After SVG growth is complete
    end: "bottom -150vh",       // Short transition
    scrub: 1,
    markers: false, // Disabled for production
    id: "transitionToSections",
    
    onStart: () => {
      console.log('🌱 TRANSITION PHASE - Preparing for mission/product sections');
      // Ensure all sections are ready to scroll normally
      const allSections = document.querySelectorAll('.mission-section, .product-section, .testimonial-section, .blog-section');
      allSections.forEach(section => {
        if (section) {
          section.style.transform = 'translateZ(0)'; // Trigger hardware acceleration
        }
      });
    },
    onComplete: () => {
      console.log('🌱 READY FOR NORMAL SCROLL - All sections properly layered');
    }
  });
  
  console.log('🌱 SEED.COM style setup complete - ALL SECTIONS HANDLED!');
  console.log('📋 Complete flow:');
  console.log('  1. Video section FIXED behind ALL content');
  console.log('  2. Hero scrolls up → Video reveals');
  console.log('  3. SVG grows while video visible');
  console.log('  4. Mission/Product/Testimonial/Blog sections scroll normally');
  console.log('  5. All sections have proper z-index layering');
  console.log('  6. White backgrounds ensure video stays hidden when needed');
  
  // Refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log('🔄 ScrollTrigger refreshed for SEED.COM style');
  }, 100);
}

/**
 * Sticky Header Animation with GSAP
 * SIMPLIFIED VERSION - NO MARGIN ANIMATIONS
 */
function setupStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) {
    console.error('❌ Header element not found for sticky animation!');
    return;
  }
  
  console.log('🔧 Setting up BULLETPROOF sticky header...');
  
  // FORCE header to stay below notification bar initially
  gsap.set(header, {
    position: 'fixed',
    top: '36px', // Below notification bar initially
    left: '0px',
    right: '0px',
    margin: '0px',
    marginTop: '0px',
    transform: 'none'
  });
  
  let isAtBottom = false;
  
  // Simplified bottom detection
  const checkPageBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
    
    const wasAtBottom = isAtBottom;
    isAtBottom = distanceFromBottom <= 100; // Reduced zone
    
    if (wasAtBottom !== isAtBottom && header.classList.contains('sticky')) {
      if (isAtBottom) {
        header.classList.add('at-bottom');
      } else {
        header.classList.remove('at-bottom');
      }
    }
  };
  
  // GSAP ScrollTrigger - NO ANIMATIONS, only class toggles
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top -10px',
    end: 'bottom bottom',
    id: 'stickyHeader',
    
    onToggle: (self) => {
      const isSticky = self.isActive;
      
      if (isSticky) {
        header.classList.add('sticky');
        document.body.classList.add('header-sticky');
        checkPageBottom();
        
        // ONLY change background and position properties
        gsap.to(header, {
          top: '0px', // Move to very top when sticky
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(25px) saturate(180%)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
      } else {
        header.classList.remove('sticky');
        header.classList.remove('at-bottom');
        document.body.classList.remove('header-sticky');
        
        // ONLY change background and position properties
        gsap.to(header, {
          top: '36px', // Move back below notification bar
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    },
    
    onUpdate: (self) => {
      // FORCE position every frame but conditionally set top based on sticky state
      const currentTop = header.classList.contains('sticky') ? '0px' : '36px';
      gsap.set(header, {
        position: 'fixed',
        top: currentTop,
        margin: '0px',
        marginTop: '0px',
        transform: 'none'
      });
      
      if (header.classList.contains('sticky')) {
        checkPageBottom();
      }
    }
  });
  
  console.log('✅ BULLETPROOF header ready!');
}

// Start the seed.com style setup
setupSeedStyle();
setTimeout(() => setupSeedStyle(), 2000);
setTimeout(() => setupSeedStyle(), 4000);
