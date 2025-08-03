/**
 * Main Data Components Script - Uses data attributes to load components
 * This approach uses placeholder divs with data-component attributes
 */

import { ComponentLoader } from './component-loader.js';
import { COMPONENT_CONFIG } from './component-config.js';

/**
 * Initialize the application using data-component attributes
 */
async function initializeDataComponentApp() {
  try {
    console.log('🚀 Initializing data-component based app...');
    
    // Create component loader instance
    const loader = new ComponentLoader();
    
    // Load all components marked with data-component attributes
    await loader.loadAllComponents();
    
    // Initialize component-specific functionality
    await initializeComponentFeatures();
    
    console.log('✅ All data-components loaded successfully');
    
  } catch (error) {
    console.error('❌ Error initializing data-component app:', error);
    handleLoadingError(error);
  }
}

/**
 * Initialize component-specific features after loading
 */
async function initializeComponentFeatures() {
  // Wait a tick for DOM to update
  await new Promise(resolve => setTimeout(resolve, 0));
  
  // Initialize navigation active states
  initializeNavigation();
  
  // Initialize video controls
  initializeVideoSection();
  
  // Initialize button interactions
  initializeButtons();
  
  // Initialize animations with staggered loading
  initializeAnimations();
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      console.log(`Navigation: ${link.textContent} clicked`);
    });
  });
}

/**
 * Initialize video section controls
 */
function initializeVideoSection() {
  const video = document.querySelector('.video-bg');
  
  if (video) {
    // Ensure video plays on load
    video.addEventListener('loadeddata', () => {
      video.play().catch(error => {
        console.warn('Video autoplay failed:', error);
      });
    });
    
    // Add click to pause/play functionality
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    
    // Add intersection observer for video optimization
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(console.warn);
        } else {
          video.pause();
        }
      });
    });
    
    observer.observe(video);
  }
}

/**
 * Initialize button interactions with enhanced UX
 */
function initializeButtons() {
  // Hero section buttons
  const shopButton = document.querySelector('.btn-primary');
  const learnButton = document.querySelector('.btn-secondary');
  
  if (shopButton) {
    shopButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add loading state
      const originalText = shopButton.textContent;
      shopButton.textContent = 'Loading...';
      shopButton.disabled = true;
      
      console.log('🛒 Shop button clicked');
      
      // Simulate navigation delay
      setTimeout(() => {
        shopButton.textContent = originalText;
        shopButton.disabled = false;
        // Add your shop functionality here
      }, 1000);
    });
  }
  
  if (learnButton) {
    learnButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('📖 Learn button clicked');
      
      // Smooth scroll to mission section
      const missionSection = document.querySelector('.mission-section');
      if (missionSection) {
        missionSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

/**
 * Initialize animations with Intersection Observer
 */
function initializeAnimations() {
  console.log('🎬 Initializing component animations...');
  
  // Create intersection observer for scroll-triggered animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all major sections
  const sections = document.querySelectorAll('section, header, footer');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    animationObserver.observe(section);
  });
  
  // Immediate animation for above-the-fold content
  const aboveFold = document.querySelectorAll('.notification-bar, .main-header, .hero-section');
  aboveFold.forEach((element, index) => {
    setTimeout(() => {
      animateElement(element);
    }, index * 200);
  });
}

/**
 * Animate individual elements
 */
function animateElement(element) {
  element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
  
  // Add specific animations based on element type
  if (element.classList.contains('hero-section')) {
    // Stagger hero text animations
    const heroElements = element.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  if (element.classList.contains('video-section')) {
    // Animate video text overlays
    const textElements = element.querySelectorAll('.video-text');
    textElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, 500 + (index * 200));
    });
  }
}

/**
 * Handle loading errors gracefully
 */
function handleLoadingError(error) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="error-state" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
      font-family: 'Inter', sans-serif;
    ">
      <h1 style="color: #A0814D; margin-bottom: 1rem;">Loading Error</h1>
      <p style="color: #666; margin-bottom: 2rem; max-width: 500px;">
        There was an issue loading the page components. This might be due to a network issue or server problem.
      </p>
      <button onclick="window.location.reload()" style="
        background: #A0814D;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      ">
        Retry Loading
      </button>
      <details style="margin-top: 2rem; text-align: left;">
        <summary style="cursor: pointer; color: #A0814D;">Technical Details</summary>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; margin-top: 1rem; overflow: auto;">
${error.message}
${error.stack || ''}
        </pre>
      </details>
    </div>
  `;
}

/**
 * Development helper functions
 */
if (process.env.NODE_ENV === 'development') {
  window.reloadComponent = async function(componentName) {
    const loader = new ComponentLoader();
    const element = document.querySelector(`[data-component="${componentName}"]`);
    
    if (element) {
      element.innerHTML = '<div>Reloading...</div>';
      await loader.insertComponent(componentName, element);
      console.log(`🔄 Reloaded component: ${componentName}`);
    } else {
      console.warn(`Component element not found: ${componentName}`);
    }
  };
  
  window.reloadAllComponents = function() {
    window.location.reload();
  };
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDataComponentApp);
} else {
  initializeDataComponentApp();
}

// Export for potential external use
export { initializeDataComponentApp, initializeComponentFeatures };
