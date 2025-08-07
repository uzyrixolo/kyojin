/**
 * GSAP Scroll Animation - PINNED VIDEO SECTION WITH SCROLL ANIMATIONS
 * Pin the video section and animate elements on scroll within it
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log('🌱 Loading PINNED video section with scroll animations!');

function setupSeedStyle(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Setting up pinned video section...`);
  
  const heroSection = document.querySelector('.hero-section');
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  const videoTexts = document.querySelectorAll('.video-text');
  
  if (!heroSection || !videoSection || !centerIcon) {
    if (retryCount < 10) {
      console.log('⏳ Looking for sections and elements...');
      setTimeout(() => setupSeedStyle(retryCount + 1), 500);
      return;
    }
    console.error('❌ Elements not found');
    return;
  }
  
  console.log('✅ Found all elements! Setting up PINNED video section...');
  
  // Setup sticky header functionality
  setupStickyHeader();
  
  // Clean up video section styling
  const seedCSS = document.createElement('style');
  seedCSS.textContent = `
    /* Clean video section for pinning */
    .video-section {
      position: relative !important;
      height: 100vh !important;
      z-index: 2 !important;
      background: transparent !important;
      border: none !important;
      opacity: 1 !important;
    }
    
    /* Hero section styling */
    .hero-section {
      position: relative !important;
      z-index: 10 !important;
      background: var(--color-background-alt) !important;
      padding-top: 100px !important;
      min-height: 100vh !important;
    }
    
    /* Initial states for video elements */
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
      opacity: 0;
      transform: scale(0.3);
    }
    
    .video-text {
      opacity: 0;
      transform: translateY(50px);
      will-change: transform, opacity;
    }
  `;
  document.head.appendChild(seedCSS);
  
  // Set initial states
  gsap.set(centerIcon, {
    scale: 0.3,
    opacity: 0,
    transformOrigin: "center center"
  });
  
  gsap.set(videoTexts, {
    opacity: 0,
    y: 50
  });
  
  console.log('🎯 Setting up PINNED video section with scroll animations...');
  
  // PIN THE VIDEO SECTION AND ANIMATE ON SCROLL
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top top",
    end: "+=300%", // Pin for 3x viewport height for smooth animations
    pin: true,
    scrub: 1,
    markers: true,
    id: "pinnedVideoSection",
    
    onUpdate: (self) => {
      const progress = self.progress;
      console.log(`📊 Pinned video progress: ${Math.round(progress * 100)}%`);
      
      // Phase 1: Center icon grows and appears (0-30%)
      if (progress <= 0.3) {
        const iconProgress = progress / 0.3;
        gsap.to(centerIcon, {
          scale: 0.3 + (iconProgress * 0.7), // Scale from 0.3 to 1.0
          opacity: iconProgress,
          duration: 0.1,
          ease: "none"
        });
      }
      
      // Phase 2: Video texts appear sequentially (30-70%)
      if (progress > 0.3 && progress <= 0.7) {
        const textProgress = (progress - 0.3) / 0.4;
        
        // Animate texts in sequence
        videoTexts.forEach((text, index) => {
          const textStart = index / videoTexts.length;
          const textEnd = (index + 1) / videoTexts.length;
          
          if (textProgress >= textStart) {
            const individualProgress = Math.min((textProgress - textStart) / (textEnd - textStart), 1);
            
            gsap.to(text, {
              opacity: individualProgress,
              y: 50 - (individualProgress * 50),
              duration: 0.1,
              ease: "none"
            });
          }
        });
      }
      
      // Phase 3: Final effects and transitions (70-100%)
      if (progress > 0.7) {
        const finalProgress = (progress - 0.7) / 0.3;
        
        // Add some final polish animations
        gsap.to(centerIcon, {
          rotation: finalProgress * 360,
          scale: 1 + (finalProgress * 0.2),
          duration: 0.1,
          ease: "none"
        });
      }
    },
    
    onStart: () => {
      console.log('🎬 Video section PINNED - starting scroll animations');
    },
    
    onComplete: () => {
      console.log('✅ Pinned video animations complete - unpinning section');
    }
  });
  
  console.log('🎉 PINNED video section setup complete!');
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
  
  // FORCE header to stay at top immediately
  gsap.set(header, {
    position: 'fixed',
    top: '0px',
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
        
        // ONLY change background properties - NO POSITION/MARGIN CHANGES
        gsap.to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(25px) saturate(180%)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
      } else {
        header.classList.remove('sticky');
        header.classList.remove('at-bottom');
        document.body.classList.remove('header-sticky');
        
        // ONLY change background properties - NO POSITION/MARGIN CHANGES
        gsap.to(header, {
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    },
    
    onUpdate: (self) => {
      // FORCE position every frame to prevent ANY displacement
      gsap.set(header, {
        position: 'fixed',
        top: '0px',
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

// Start the pinned video setup
setupSeedStyle();
setTimeout(() => setupSeedStyle(), 2000);
setTimeout(() => setupSeedStyle(), 4000);
