/**
 * GSAP Scroll Animation - CLEAN VERSION
 * Fixed element detection with retry mechanism
 */

import { gsap } from 'gsap';
i      if (progress % 25 === 0) {
        console.log(`🎯 TOP-pinned progress: ${progress}%`);
      }
    },
    onRefresh: () => {
      console.log('🔄 ScrollTrigger refreshed for TOP pinning');
    } ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('🎬 Loading CLEAN GSAP scroll animation...');

// Wait for elements with retry mechanism
function waitForElements(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Looking for elements...`);
  
  // Add GSAP test indicator on first attempt
  if (retryCount === 0) {
    const testDiv = document.createElement('div');
    testDiv.textContent = 'GSAP ACTIVE!';
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
  
  console.log('🔍 Element status:');
  console.log('  - Video sections found:', document.querySelectorAll('.video-section').length);
  console.log('  - Center icons found:', document.querySelectorAll('.center-icon').length);
  console.log('  - Center SVGs found:', document.querySelectorAll('.center-icon svg').length);
  console.log('  - Document ready:', document.readyState);
  console.log('  - Body content length:', document.body.innerHTML.length);
  
  if (!videoSection || !centerIcon) {
    if (retryCount < 15) { // Try more times 
      console.warn(`⚠️ Missing elements (attempt ${retryCount + 1}/15), retrying...`);
      setTimeout(() => waitForElements(retryCount + 1), 500); // Check every 500ms
      return;
    } else {
      console.error('❌ Elements not found after 15 attempts');
      return;
    }
  }
  
  console.log('✅ FOUND BOTH ELEMENTS! Setting up STABLE pinned animation...');
  
  // Add CSS to prevent layout shifts
  const stabilizeCSS = document.createElement('style');
  stabilizeCSS.textContent = `
    .video-section {
      will-change: transform;
      backface-visibility: hidden;
    }
    
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
    }
  `;
  document.head.appendChild(stabilizeCSS);
  
  // Set initial state - small and visible
  gsap.set(centerIcon, {
    scale: 0.2,
    opacity: 0.4,
    transformOrigin: "center center"
  });
  
  // Visual indicator
  centerIcon.style.border = '3px solid lime';
  centerIcon.style.boxShadow = '0 0 10px lime';
  
  console.log('🎯 Icon should now have lime border and glow');
  
  // Create scroll trigger WITH TOP PINNING
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top top",               // 🔝 PIN AT TOP! When section top hits viewport top
    end: "+=400",                   // Pin for 400px of scroll
    pin: videoSection,              // 📌 PIN THE VIDEO SECTION AT TOP
    pinSpacing: false,              // Disable spacing to prevent jumping
    anticipatePin: 1,               // Smooth transition
    scrub: 1,                       // Smooth scrubbing
    markers: true,
    id: "topPinnedGrow",
    onStart: () => {
      console.log('📌 VIDEO SECTION PINNED AT TOP OF VIEWPORT!');
      videoSection.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
    },
    onComplete: () => {
      console.log('📌 UNPINNING from top - returning to normal flow');
      videoSection.style.backgroundColor = '';
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
        ease: "back.out(1.7)"  // Less bouncy, more stable
      }),
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      if (progress % 25 === 0) {
        console.log(`🎯 Stable pin progress: ${progress}%`);
      }
    },
    onRefresh: () => {
      console.log('� ScrollTrigger refreshed - recalculating positions');
    }
  });
  
  // Test button
  const testBtn = document.createElement('button');
  testBtn.textContent = 'Test Pin + Grow';
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
    console.log('🧪 Testing pin + grow sequence...');
    // Simulate the pinned animation
    videoSection.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
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
        ease: "elastic.out(1, 0.4)"
      })
      .to(centerIcon, {
        scale: 1,
        duration: 0.2
      })
      .call(() => {
        videoSection.style.backgroundColor = '';
        console.log('✅ Test sequence complete!');
      });
  };
  document.body.appendChild(testBtn);
  
  console.log('🎉 STABLE animation setup complete!');
  console.log('📏 Scroll to video section - it should pin smoothly without jumping');
  
  // Refresh ScrollTrigger to ensure proper calculations
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log('🔄 ScrollTrigger refreshed for stable positioning');
  }, 100);
}

// Start immediately, then also wait a bit
waitForElements();
setTimeout(() => waitForElements(), 2000);
setTimeout(() => waitForElements(), 5000);
