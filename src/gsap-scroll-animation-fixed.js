/**
 * GSAP Scroll Animation - FIXED VERSION
 * Simple, stable scroll animation without pinning issues
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

console.log('🎬 Loading FIXED GSAP scroll animation...');

// Wait for components to load
setTimeout(() => {
  console.log('🚀 Setting up FIXED GSAP scroll animation...');
  
  // Test GSAP is working
  const testDiv = document.createElement('div');
  testDiv.textContent = 'GSAP FIXED!';
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
  
  const videoSection = document.querySelector('.video-section');
  const centerIcon = document.querySelector('.center-icon svg');
  
  console.log('🔍 Element detection:');
  console.log('  - Video section:', videoSection ? '✅ Found' : '❌ Not found');
  console.log('  - Center icon:', centerIcon ? '✅ Found' : '❌ Not found');
  
  if (!videoSection || !centerIcon) {
    console.warn('⚠️ Elements not found, skipping animation');
    return;
  }
  
  console.log('✅ Found both elements!');
  
  // Set initial state - visible for testing
  gsap.set(centerIcon, {
    scale: 0.3,
    opacity: 0.4,
    transformOrigin: "center center"
  });
  
  // Add visual indicator
  centerIcon.style.border = '2px solid lime';
  console.log('🎯 Center icon should now have a lime border and be small');
  
  // Create simple scroll animation WITHOUT PINNING
  ScrollTrigger.create({
    trigger: videoSection,
    start: "top 70%",
    end: "bottom 30%",
    scrub: true,
    markers: true,
    id: "centerIconGrow",
    animation: gsap.to(centerIcon, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }),
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100);
      console.log(`🎯 Progress: ${progress}%`);
    }
  });
  
  // Test button
  const testButton = document.createElement('button');
  testButton.textContent = 'Test Animation';
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
    gsap.to(centerIcon, {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };
  document.body.appendChild(testButton);
  
  console.log('✅ Fixed GSAP animation ready!');
  console.log('🎯 Scroll to video section to test');
  
}, 3000);
