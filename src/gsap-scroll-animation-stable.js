/**
 * GSAP Scroll Animation - STABLE STICKY VERSION
 * Uses CSS sticky instead of GSAP pin to prevent layout issues
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('🎬 Loading STABLE STICKY GSAP animation...');

// Wait for elements with retry mechanism
function waitForElements(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Setting up STABLE sticky animation...`);
  
  // Add GSAP test indicator on first attempt
  if (retryCount === 0) {
    const testDiv = document.createElement('div');
    testDiv.textContent = 'STABLE STICKY!';
    testDiv.style.cssText = `
      position: fixed; 
      top: 50px; 
      right: 20px; 
      background: #2d5016; 
      color: white; 
      padding: 10px; 
      z-index: 10000;
      border-radius: 5px;
      font-family: Inter, sans-serif;
    `;
    document.body.appendChild(testDiv);
    
    gsap.to(testDiv, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    });
  }
  
  // Look for elements
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  
  console.log('🔍 Element status for STABLE sticky:');
  console.log('  - Video sections found:', document.querySelectorAll('.video-section').length);
  console.log('  - Center icons found:', document.querySelectorAll('.center-icon').length);
  console.log('  - Center SVGs found:', document.querySelectorAll('.center-icon svg').length);
  
  if (!videoSection || !centerIcon) {
    if (retryCount < 15) {
      console.warn(`⚠️ Missing elements (attempt ${retryCount + 1}/15), retrying...`);
      setTimeout(() => waitForElements(retryCount + 1), 500);
      return;
    } else {
      console.error('❌ Elements not found after 15 attempts');
      return;
    }
  }
  
  console.log('✅ FOUND BOTH ELEMENTS! Setting up STABLE sticky behavior...');
  
  // Add CSS for stable sticky behavior - NO GSAP PIN
  const stickyCSS = document.createElement('style');
  stickyCSS.textContent = `
    .video-section {
      position: sticky !important;
      top: 0 !important;
      z-index: 10 !important;
      height: 100vh !important;
      will-change: auto !important;
    }
    
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
    }
    
    /* Create space for sticky behavior */
    .video-section-wrapper {
      height: 200vh; /* Double height for scroll space */
      position: relative;
    }
  `;
  document.head.appendChild(stickyCSS);
  
  // Wrap video section for sticky behavior
  const wrapper = document.createElement('div');
  wrapper.className = 'video-section-wrapper';
  videoSection.parentNode.insertBefore(wrapper, videoSection);
  wrapper.appendChild(videoSection);
  
  // Set initial state - small and visible
  gsap.set(centerIcon, {
    scale: 0.2,
    opacity: 0.4,
    transformOrigin: "center center"
  });
  
  // Visual indicator
  centerIcon.style.border = '3px solid lime';
  centerIcon.style.boxShadow = '0 0 10px lime';
  
  console.log('🎯 Icon should now have lime border - using STABLE sticky positioning');
  
  // Create scroll trigger WITHOUT PIN - just animation
  ScrollTrigger.create({
    trigger: wrapper,
    start: "top top",               // Start when wrapper hits top
    end: "bottom top",              // End when wrapper bottom hits top
    scrub: 1,                       // Smooth scrubbing
    markers: true,
    id: "stableStickyGrow",
    onStart: () => {
      console.log('📌 STICKY BEHAVIOR ACTIVE - Video section sticking to top');
      videoSection.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
      videoSection.style.border = '3px solid lime';
    },
    onComplete: () => {
      console.log('📌 STICKY COMPLETE - Video section unsticking');
      videoSection.style.backgroundColor = '';
      videoSection.style.border = '';
    },
    animation: gsap.timeline()
      .to(centerIcon, {
        scale: 0.6,
        opacity: 0.7,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(centerIcon, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }),
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      if (progress % 20 === 0) {
        console.log(`🔥 STABLE sticky progress: ${progress}%`);
      }
    },
    onToggle: (self) => {
      if (self.isActive) {
        console.log('🟢 STICKY ANIMATION ACTIVE - No layout jumps!');
      } else {
        console.log('🔴 STICKY ANIMATION INACTIVE');
      }
    }
  });
  
  // Test button
  const testBtn = document.createElement('button');
  testBtn.textContent = 'Test Stable Sticky';
  testBtn.style.cssText = `
    position: fixed; 
    top: 100px; 
    right: 20px; 
    background: lime; 
    color: black; 
    padding: 10px; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 10000;
    font-weight: bold;
  `;
  testBtn.onclick = () => {
    console.log('🧪 Testing STABLE sticky behavior...');
    videoSection.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    videoSection.style.border = '3px solid lime';
    gsap.timeline()
      .to(centerIcon, {
        scale: 0.6,
        opacity: 0.7,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(centerIcon, {
        scale: 1.2,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
      .to(centerIcon, {
        scale: 1,
        duration: 0.2
      })
      .call(() => {
        videoSection.style.backgroundColor = '';
        videoSection.style.border = '';
        console.log('✅ STABLE sticky test complete - no jumps!');
      });
  };
  document.body.appendChild(testBtn);
  
  console.log('🎉 STABLE sticky animation setup complete!');
  console.log('🔥 Video section uses CSS sticky - no GSAP pin issues!');
  
  // Refresh ScrollTrigger
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log('🔄 ScrollTrigger refreshed for STABLE sticky');
  }, 100);
}

// Start element detection
waitForElements();
setTimeout(() => waitForElements(), 2000);
setTimeout(() => waitForElements(), 5000);
