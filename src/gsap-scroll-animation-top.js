/**
 * GSAP Scroll Animation - TOP PINNING VERSION
 * Video section pins at TOP of viewport, then icon grows
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('🎬 Loading TOP-PINNED GSAP scroll animation...');

// Wait for elements with retry mechanism
function waitForElements(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Looking for elements for TOP pinning...`);
  
  // Add GSAP test indicator on first attempt
  if (retryCount === 0) {
    const testDiv = document.createElement('div');
    testDiv.textContent = 'TOP PIN ACTIVE!';
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
  
  console.log('🔍 Element status for TOP pinning:');
  console.log('  - Video sections found:', document.querySelectorAll('.video-section').length);
  console.log('  - Center icons found:', document.querySelectorAll('.center-icon').length);
  console.log('  - Center SVGs found:', document.querySelectorAll('.center-icon svg').length);
  
  if (!videoSection || !centerIcon) {
    if (retryCount < 15) {
      console.warn(`⚠️ Missing elements for TOP pin (attempt ${retryCount + 1}/15), retrying...`);
      setTimeout(() => waitForElements(retryCount + 1), 500);
      return;
    } else {
      console.error('❌ Elements not found after 15 attempts');
      return;
    }
  }
  
  console.log('✅ FOUND BOTH ELEMENTS! Setting up TOP pinning...');
  
  // Add CSS for stable top pinning
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
  
  console.log('🎯 Icon should now have lime border - ready for TOP pinning');
  
  // Create scroll trigger WITH TOP PINNING
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top top",               // 🔝 PIN AT TOP! When section top hits viewport top
    end: "+=500",                   // Pin for 500px of scroll (longer for smooth animation)
    pin: videoSection,              // 📌 PIN AT TOP OF VIEWPORT
    pinSpacing: false,              // No spacing to prevent jumps
    anticipatePin: 1,               // Smooth pin transition
    scrub: 1,                       // Smooth scrubbing tied to scroll
    markers: true,
    id: "topPinnedIconGrow",
    onStart: () => {
      console.log('📌 VIDEO SECTION NOW PINNED AT TOP OF VIEWPORT!');
      videoSection.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
      videoSection.style.border = '3px solid lime';
    },
    onComplete: () => {
      console.log('📌 UNPINNING from TOP - animation complete');
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
        console.log(`🔝 TOP-pinned animation: ${progress}%`);
      }
    },
    onToggle: (self) => {
      if (self.isActive) {
        console.log('🟢 TOP PINNING ACTIVE - Section locked at top, icon growing');
      } else {
        console.log('🔴 TOP PINNING INACTIVE - Section free to scroll');
      }
    }
  });
  
  // Test button for TOP pin + grow
  const testBtn = document.createElement('button');
  testBtn.textContent = 'Test TOP Pin';
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
    console.log('🧪 Testing TOP pin + grow sequence...');
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
        console.log('✅ TOP pin test complete!');
      });
  };
  document.body.appendChild(testBtn);
  
  console.log('🎉 TOP pinning animation setup complete!');
  console.log('🔝 Video section will pin at TOP of viewport when reached');
  
  // Refresh ScrollTrigger for proper calculations
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log('🔄 ScrollTrigger refreshed for TOP pinning');
  }, 100);
}

// Start element detection immediately and with delays
waitForElements();
setTimeout(() => waitForElements(), 2000);
setTimeout(() => waitForElements(), 5000);
