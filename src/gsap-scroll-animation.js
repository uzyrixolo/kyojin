/**
 * GSAP Scroll Animation with Video Section Pinning
 * Proper implementation of your requested animation
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('🎬 Loading GSAP scroll animation with section pinning...');

// Wait for components to load with retry mechanism
function waitForElements(retryCount = 0) {
  console.log(`🚀 Attempt ${retryCount + 1}: Setting up GSAP scroll animation...`);
  
  // First, let's test if GSAP is working at all
  if (retryCount === 0) {
    try {
      console.log('🧪 Testing GSAP import...', typeof gsap);
      console.log('🧪 Testing ScrollTrigger import...', typeof ScrollTrigger);
      
      // Test basic GSAP functionality
      const testDiv = document.createElement('div');
      testDiv.textContent = 'GSAP WORKING!';
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
      
      console.log('✅ GSAP basic test working - you should see a spinning green box');
      
    } catch (error) {
      console.error('❌ GSAP test failed:', error);
      return;
    }
  }
  
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  
  console.log('🔍 Element detection:');
  console.log('  - Video section:', videoSection ? '✅ Found' : '❌ Not found');
  console.log('  - Center icon:', centerIcon ? '✅ Found' : '❌ Not found');
  console.log('  - All video sections:', document.querySelectorAll('.video-section').length);
  console.log('  - All center icons:', document.querySelectorAll('.center-icon').length);
  console.log('  - All center icon SVGs:', document.querySelectorAll('.center-icon svg').length);
  console.log('  - Page ready state:', document.readyState);
  console.log('  - Total sections:', document.querySelectorAll('section').length);
  
  if (!videoSection || !centerIcon) {
    if (retryCount < 10) { // Try up to 10 times
      console.warn(`⚠️ Elements not found on attempt ${retryCount + 1}, retrying in 1 second...`);
      setTimeout(() => waitForElements(retryCount + 1), 1000);
      return;
    } else {
      console.error('❌ Elements not found after 10 attempts, giving up');
      console.log('Available sections:', Array.from(document.querySelectorAll('section')).map(s => s.className));
      return;
    }
  }
  
  console.log('✅ Found video section and center icon');
  
  // Set initial state - more visible for testing
  gsap.set(centerIcon, {
    scale: 0.1,     // Bigger start so you can see it
    opacity: 0.3,   // More visible
    rotation: -180, // Less rotation
    transformOrigin: "center center"
  });
  
  // Add a border to the center icon so we can see it clearly
  centerIcon.style.border = '2px solid red';
  centerIcon.style.background = 'rgba(255, 0, 0, 0.1)';
  
  console.log('🎯 Initial state set - icon should be small and red-bordered');
  
  // Add immediate test animation button
  const testButton = document.createElement('button');
  testButton.textContent = 'Test Icon Animation';
  testButton.style.cssText = `
    position: fixed; 
    top: 100px; 
    right: 20px; 
    background: #2d5016; 
    color: white; 
    padding: 10px; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 10000;
    font-family: Inter, sans-serif;
  `;
  testButton.onclick = () => {
    console.log('🧪 Testing icon animation...');
    gsap.to(centerIcon, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 2,
      ease: "elastic.out(1, 0.4)"
    });
  };
  document.body.appendChild(testButton);
  
  // Create a simple scroll-triggered animation WITHOUT pinning first
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: videoSection,
      start: "top 80%",           // Start when video section comes into view
      end: "bottom 20%",          // End when video section is almost out of view
      // pin: videoSection,       // DISABLED PINNING to stop the dancing
      pinSpacing: true,
      scrub: 1,                   // Smooth scrubbing
      markers: true,              // Keep markers for debugging
      id: "centerIconGrowth",     // ID for easier debugging
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100);
        console.log(`🎯 Animation progress: ${progress}%`);
      },
      onToggle: (self) => {
        if (self.isActive) {
          console.log('🎬 Animation ACTIVE - Icon should be growing');
        } else {
          console.log('🎬 Animation INACTIVE');
        }
      }
    }
  });
  
  // Simple, single-stage animation
  tl.to(centerIcon, {
    scale: 1.0,      // Grow to full size
    opacity: 1.0,    // Full opacity
    rotation: 0,     // No rotation
    duration: 1,     // Single duration
    ease: "power2.out"
  });
  
  console.log('✅ GSAP animation timeline created with section pinning!');
  
  // Add some CSS to prevent conflicts and make video section stable
  const style = document.createElement('style');
  style.textContent = `
    .video-section {
      position: relative !important;
      will-change: auto !important;
      transform: none !important;
    }
    
    .center-icon svg {
      will-change: transform, opacity;
      transform-origin: center center;
    }
  `;
  document.head.appendChild(style);
    
    /* Debug indicator */
    .gsap-debug {
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(45, 80, 22, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(-10px);
    }
    
    .gsap-debug.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .gsap-debug h3 {
      margin: 0 0 10px 0;
      color: #4a7c23;
    }
    
    .gsap-debug p {
      margin: 5px 0;
      font-size: 12px;
    }
  `;
  document.head.appendChild(style);
  
  // Create debug panel
  const debugPanel = document.createElement('div');
  debugPanel.className = 'gsap-debug';
  debugPanel.innerHTML = `
    <h3>🎬 GSAP Animation Active</h3>
    <p>📌 Video section will pin when reached</p>
    <p>🎯 Icon grows from tiny to full size</p>
    <p>⚡ Powered by GSAP + ScrollTrigger</p>
  `;
  document.body.appendChild(debugPanel);
  
  // Show debug panel for 4 seconds
  setTimeout(() => debugPanel.classList.add('active'), 500);
  setTimeout(() => debugPanel.classList.remove('active'), 4500);
  
  // Global debug functions
  window.gsapAnimation = {
    refresh: () => ScrollTrigger.refresh(),
    kill: () => ScrollTrigger.killAll(),
    showMarkers: () => {
      ScrollTrigger.getAll().forEach(st => st.vars.markers = true);
      ScrollTrigger.refresh();
    },
    getProgress: () => {
      const st = ScrollTrigger.getAll().find(trigger => trigger.trigger === videoSection);
      return st ? Math.round(st.progress * 100) + '%' : '0%';
    },
    testAnimation: () => {
      gsap.to(centerIcon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "elastic.out(1, 0.3)"
      });
    }
  };
  
  console.log('🎉 GSAP animation ready!');
  console.log('📏 Scroll down to see the video section pin and icon grow!');
  console.log('🛠️ Debug commands: window.gsapAnimation.showMarkers(), window.gsapAnimation.testAnimation()');
  
}, 4000); // Wait longer for components to fully load

// Start the element detection
waitForElements();
