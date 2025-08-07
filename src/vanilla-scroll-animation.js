/**
 * Pure JavaScript Scroll Animation (No Anime.js)
 * Reliable scroll-triggered center icon growth animation
 */

console.log('🎯 Loading vanilla JS scroll animation...');

// Wait for page to load
setTimeout(() => {
  console.log('🚀 Starting vanilla scroll animation setup...');
  
  const centerIcon = document.querySelector('.center-icon svg');
  
  if (!centerIcon) {
    console.warn('⚠️ Center icon not found, animation will be skipped');
    return;
  }
  
  console.log('✅ Center icon found!');
  
  // Add CSS for smooth transitions
  const style = document.createElement('style');
  style.textContent = `
    .center-icon svg {
      transition: none !important;
      transform-origin: center center;
      will-change: transform, opacity;
    }
    
    .video-section {
      position: relative;
    }
    
    .scroll-debug {
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      display: none;
    }
    
    .scroll-debug.active {
      display: block;
    }
  `;
  document.head.appendChild(style);
  
  // Create debug overlay
  const debugDiv = document.createElement('div');
  debugDiv.className = 'scroll-debug';
  debugDiv.innerHTML = `
    <div>🎯 Scroll Animation Debug</div>
    <div>Progress: <span id="progress">0%</span></div>
    <div>Scale: <span id="scale">0.1</span></div>
    <div>Opacity: <span id="opacity">0.3</span></div>
  `;
  document.body.appendChild(debugDiv);
  
  // Set initial state
  centerIcon.style.transform = 'scale(0.1) rotate(-90deg)';
  centerIcon.style.opacity = '0.3';
  
  console.log('🎯 Initial state set - icon should be tiny and faded');
  
  // Scroll animation variables
  let animationFrame;
  let lastProgress = -1;
  
  function updateAnimation() {
    const videoSection = document.querySelector('.video-section');
    if (!videoSection) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const videoRect = videoSection.getBoundingClientRect();
    const videoTop = scrollTop + videoRect.top;
    
    // Define animation zone
    const animationStart = videoTop - windowHeight * 0.8; // Start earlier
    const animationEnd = videoTop + windowHeight * 0.2;   // End when video is visible
    const animationDistance = animationEnd - animationStart;
    
    // Calculate progress (0 to 1)
    let progress = 0;
    if (scrollTop >= animationStart && scrollTop <= animationEnd) {
      progress = (scrollTop - animationStart) / animationDistance;
      progress = Math.max(0, Math.min(1, progress));
    } else if (scrollTop > animationEnd) {
      progress = 1;
    }
    
    // Apply easing (smooth growth curve)
    const easedProgress = easeOutCubic(progress);
    
    // Calculate transformation values
    const scale = 0.1 + (0.9 * easedProgress);      // 0.1 to 1.0
    const opacity = 0.3 + (0.7 * easedProgress);    // 0.3 to 1.0  
    const rotation = -90 + (90 * easedProgress);     // -90deg to 0deg
    
    // Apply transformations
    centerIcon.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    centerIcon.style.opacity = opacity;
    
    // Update debug info
    document.getElementById('progress').textContent = Math.round(progress * 100) + '%';
    document.getElementById('scale').textContent = scale.toFixed(2);
    document.getElementById('opacity').textContent = opacity.toFixed(2);
    
    // Log significant changes
    if (Math.abs(progress - lastProgress) > 0.05) {
      console.log(`🎯 Animation progress: ${Math.round(progress * 100)}% (Scale: ${scale.toFixed(2)}, Opacity: ${opacity.toFixed(2)})`);
      lastProgress = progress;
    }
  }
  
  // Smooth easing function
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  
  // Optimized scroll handler
  function handleScroll() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    animationFrame = requestAnimationFrame(updateAnimation);
  }
  
  // Attach scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial calculation
  updateAnimation();
  
  console.log('✅ Vanilla scroll animation ready!');
  console.log('📏 Scroll down towards the video section to see the icon grow!');
  
  // Debug controls
  window.iconAnimation = {
    showDebug: () => debugDiv.classList.add('active'),
    hideDebug: () => debugDiv.classList.remove('active'),
    testGrowth: () => {
      centerIcon.style.transition = 'all 1s ease-out';
      centerIcon.style.transform = 'scale(1.2) rotate(10deg)';
      centerIcon.style.opacity = '1';
      setTimeout(() => {
        centerIcon.style.transform = 'scale(1) rotate(0deg)';
        setTimeout(() => {
          centerIcon.style.transition = 'none';
          updateAnimation(); // Reset to scroll position
        }, 1000);
      }, 500);
    },
    getCurrentState: () => ({
      progress: lastProgress,
      transform: centerIcon.style.transform,
      opacity: centerIcon.style.opacity
    })
  };
  
  // Auto-show debug for 5 seconds
  debugDiv.classList.add('active');
  setTimeout(() => debugDiv.classList.remove('active'), 5000);
  
}, 2000); // Wait 2 seconds for components to load
