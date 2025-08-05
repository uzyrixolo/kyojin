/**
 * Main Components Script - Orchestrates the loading of all page components
 * This is the entry point for the component-based version of the site
 */

import { ComponentLoader } from './component-loader.js';
import { LoadingScreen } from './loading-screen.js';
import { BiomeAnimations } from './biome-animations.js';

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

// Temporarily comment out anime.js import until needed for animations
// import * as anime from 'animejs';
// import './footer-marquee.js';

/**
 * Initialize the application with component-based architecture
 */
async function initializeApp() {
  try {
    // Create and start loading screen
    const loadingScreen = new LoadingScreen();
    
    // Set up loading completion callback
    loadingScreen.onLoadingComplete(async () => {
      console.log('🎬 Loading complete! Initializing components...');
      
      // Now load components after loading screen is done
      await loadComponents();
    });
    
    // Start the loading process
    await loadingScreen.start();
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    console.error('Error details:', error.stack);
    
    // More detailed error handling
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="error-state" style="padding: 2rem; text-align: center; font-family: Inter, sans-serif;">
          <h1 style="color: #d32f2f; margin-bottom: 1rem;">Component Loading Error</h1>
          <p style="margin-bottom: 1rem;">There was an issue loading the page components.</p>
          <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">
            This might be due to network issues or deployment problems.
          </p>
          <button onclick="window.location.reload()" 
                  style="background: #2d5016; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
            Retry Loading
          </button>
          <details style="margin-top: 1rem; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
            <summary style="cursor: pointer; color: #666;">Technical Details</summary>
            <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.8rem;">${error.message}

${error.stack || 'No stack trace available'}</pre>
          </details>
        </div>
      `;
    }
  }
}

/**
 * Load components after loading screen completes
 */
async function loadComponents() {
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
    console.error('❌ Error loading components:', error);
    throw error; // Re-throw to be caught by main error handler
  }
}

/**
 * Initialize component-specific features after loading
 */
async function initializeComponentFeatures() {
  // Initialize navigation active states
  initializeNavigation();
  
  // Initialize mobile menu functionality
  initializeMobileMenu();
  
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
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  // Toggle mobile menu
  function toggleMobileMenu() {
    const isActive = mobileMenuOverlay.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Open mobile menu
  function openMobileMenu() {
    mobileMenuToggle.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent body scrolling
    body.style.position = 'fixed'; // Extra lock
    body.style.width = '100%'; // Prevent width changes
    
    // Add entrance animation to menu items
    mobileNavLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, 100 + (index * 50));
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = ''; // Restore body scrolling
    body.style.position = ''; // Remove fixed position
    body.style.width = ''; // Restore width
    
    // Reset menu items animation
    mobileNavLinks.forEach(link => {
      link.style.transition = '';
      link.style.opacity = '';
      link.style.transform = '';
    });
  }

  // Event listeners
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking outside
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function(e) {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close menu when clicking on nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      
      // Handle navigation
      const text = link.textContent.trim();
      if (text !== 'CART') {
        e.preventDefault();
        
        // Remove active class from all nav links (desktop and mobile)
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link and corresponding desktop link
        link.classList.add('active');
        const desktopLink = Array.from(document.querySelectorAll('.nav-link')).find(l => l.textContent.trim() === text);
        if (desktopLink) {
          desktopLink.classList.add('active');
        }
        
        console.log(`Mobile Navigation: ${text} clicked`);
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
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
  // Initialize biome growth animations with Anime.js
  const biomeAnimations = new BiomeAnimations();
  biomeAnimations.init();
  
  console.log('🎬 Biome animations initialized with Anime.js');
  
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
