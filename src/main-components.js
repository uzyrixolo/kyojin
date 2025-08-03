/**
 * Main Components Script - Orchestrates the loading of all page components
 * This is the entry point for the component-based version of the site
 */

import { ComponentLoader } from './component-loader.js';

// Define the component loading order
const COMPONENT_ORDER = [
  'notification-bar',
  'header',
  'hero-section',
  'video-section',
  'mission-section',
  'product-section',
  'testimonial-section',
  'blog-section',
  'footer'
];
import * as anime from 'animejs';
import './footer-marquee.js';

/**
 * Initialize the application with component-based architecture
 */
async function initializeApp() {
  try {
    // Show loading state
    const app = document.getElementById('app');
    
    // Create component loader instance
    const loader = new ComponentLoader();
    
    // Load and build the entire page
    await loader.buildPage(COMPONENT_ORDER, '#app');
    
    // Initialize any component-specific functionality
    await initializeComponentFeatures();
    
    console.log('✅ All components loaded successfully');
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    document.getElementById('app').innerHTML = `
      <div class="error-state">
        <h1>Error Loading Page</h1>
        <p>There was an issue loading the page components. Please refresh and try again.</p>
        <details>
          <summary>Technical Details</summary>
          <pre>${error.message}</pre>
        </details>
      </div>
    `;
  }
}

/**
 * Initialize component-specific features after loading
 */
async function initializeComponentFeatures() {
  // Initialize navigation active states
  initializeNavigation();
  
  // Initialize video controls
  initializeVideoSection();
  
  // Initialize button interactions
  initializeButtons();
  
  // Initialize any animation triggers
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
  }
}

/**
 * Initialize button interactions
 */
function initializeButtons() {
  // Hero section buttons
  const shopButton = document.querySelector('.btn-primary');
  const learnButton = document.querySelector('.btn-secondary');
  
  if (shopButton) {
    shopButton.addEventListener('click', () => {
      console.log('🛒 Shop button clicked');
      // Add your shop functionality here
    });
  }
  
  if (learnButton) {
    learnButton.addEventListener('click', () => {
      console.log('📖 Learn button clicked');
      // Add your learn functionality here
    });
  }
}

/**
 * Initialize animations (placeholder for Anime.js integration)
 */
function initializeAnimations() {
  // This is where you would initialize your Anime.js animations
  // for the biome growth effects and other organic animations
  
  console.log('🎬 Animations initialized (ready for Anime.js integration)');
  
  // Example: Fade in components as they load
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

/**
 * Utility function to reload a specific component
 * Useful for development and hot-reloading
 */
window.reloadComponent = async function(componentName) {
  const loader = new ComponentLoader();
  const placeholder = document.querySelector(`[data-original-component="${componentName}"]`) ||
                     document.querySelector(`.${componentName.replace('-', '-')}`);
  
  if (placeholder) {
    await loader.insertComponent(componentName, placeholder);
    console.log(`🔄 Reloaded component: ${componentName}`);
  } else {
    console.warn(`Component container not found: ${componentName}`);
  }
};

/**
 * Development helper to reload all components
 */
window.reloadAllComponents = function() {
  window.location.reload();
};

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for potential external use
export { initializeApp, initializeComponentFeatures };
