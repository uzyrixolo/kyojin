/**
 * SIMPLE GSAP Scroll Animation - EXACTLY What You Want
 * 1. Section sticks to top
 * 2. User scrolls → SVG grows 
 * 3. SVG max size → Section unpins
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log('🎯 Loading SIMPLE scroll animation - exactly what you want!');

function setupSimpleAnimation(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Setting up SIMPLE animation...`);
  
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  
  if (!videoSection || !centerIcon) {
    if (retryCount < 10) {
      setTimeout(() => setupSimpleAnimation(retryCount + 1), 500);
      return;
    }
    console.error('❌ Elements not found');
    return;
  }
  
  console.log('✅ Found elements! Setting up SIMPLE timeline...');
  
  // Add CSS to prevent jumping and protect sections
  const antiJumpCSS = document.createElement('style');
  antiJumpCSS.textContent = `
    .video-section {
      will-change: transform;
      transform: translateZ(0); /* Hardware acceleration */
      backface-visibility: hidden; /* Prevent flicker */
    }
    
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
      transform: translateZ(0); /* Hardware acceleration */
    }
    
    /* Protect sections from being affected */
    section {
      position: relative;
      z-index: 1;
    }
    
    .video-section {
      z-index: 10; /* Higher z-index when pinned */
    }
  `;
  document.head.appendChild(antiJumpCSS);
  
  // Test indicator
  const indicator = document.createElement('div');
  indicator.textContent = 'SIMPLE WORKS!';
  indicator.style.cssText = `
    position: fixed; top: 50px; right: 20px; 
    background: green; color: white; padding: 10px; 
    z-index: 10000; border-radius: 5px;
  `;
  document.body.appendChild(indicator);
  
  // Initial state - SVG starts invisible/tiny
  gsap.set(centerIcon, {
    scale: 0.1,
    opacity: 0.2,
    transformOrigin: "center center"
  });
  
  // Visual feedback
  centerIcon.style.border = '2px solid red';
  console.log('🎯 SVG should be tiny with red border');
  
  // THE SIMPLE SOLUTION - One ScrollTrigger that does everything
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top top",           // Section hits top of viewport
    end: "+=150vh",             // Pin for 1.5 viewport heights (LONGER for slower animation)
    pin: videoSection,          // PIN THE SECTION TO TOP
    pinSpacing: true,           // Keep proper spacing to not affect next section
    anticipatePin: 1,           // Smooth pin transition to reduce jumping
    scrub: 2,                   // SLOWER scrub (was 1, now 2) = slower animation
    markers: true,              // Show markers for debugging
    id: "slowSmoothStickAndGrow",
    
    // THE ANIMATION - SLOWER SVG growth
    animation: gsap.to(centerIcon, {
      scale: 1,                 // Grow to full size
      opacity: 1,               // Full opacity
      duration: 2,              // LONGER duration for slower feel
      ease: "power1.out"        // Gentler easing for smoother motion
    }),
    
    onStart: () => {
      console.log('📌 SECTION PINNED TO TOP - SLOW SVG growth starting...');
      videoSection.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
      videoSection.style.transition = 'background-color 0.3s ease'; // Smooth color transition
    },
    
    onComplete: () => {
      console.log('🎉 SVG REACHED MAX SIZE SLOWLY - UNPINNING SECTION');
      videoSection.style.backgroundColor = '';
    },
    
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      if (progress % 10 === 0) { // Log every 10% instead of constantly
        console.log(`� SLOW Progress: ${progress}% - SVG Scale: ${(0.1 + (self.progress * 0.9)).toFixed(2)}`);
      }
    }
  });
  
  // Test button
  const testBtn = document.createElement('button');
  testBtn.textContent = 'Test Animation';
  testBtn.style.cssText = `
    position: fixed; top: 100px; right: 20px; 
    background: red; color: white; padding: 10px; 
    border: none; border-radius: 5px; cursor: pointer; z-index: 10000;
  `;
  testBtn.onclick = () => {
    console.log('🧪 Testing: Section pin + SVG grow');
    gsap.to(centerIcon, {
      scale: 1.2,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };
  document.body.appendChild(testBtn);
  
  console.log('🎉 SIMPLE animation ready!');
  console.log('📋 How it works:');
  console.log('  1. Scroll to video section');  
  console.log('  2. Section pins to top');
  console.log('  3. Keep scrolling → SVG grows');
  console.log('  4. SVG max size → Section unpins');
  
  // Refresh for proper calculations
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log('🔄 ScrollTrigger refreshed');
  }, 100);
}

// Start the simple setup
setupSimpleAnimation();
setTimeout(() => setupSimpleAnimation(), 2000);
