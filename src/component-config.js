/**
 * Component Configuration
 * Central configuration for all components and their properties
 */

export const COMPONENT_CONFIG = {
  // Component loading order for the main page
  mainPageOrder: [
    'notification-bar',
    'header',
    'hero-section',
    'video-section',
    'mission-section',
    'product-section',
    'empty-section',
    'footer'
  ],

  // Component metadata
  components: {
    'notification-bar': {
      name: 'Notification Bar',
      description: 'Top notification bar with delivery information',
      dependencies: [],
      animations: ['fade-in']
    },
    'header': {
      name: 'Main Header',
      description: 'Navigation header with logo and menu items',
      dependencies: [],
      animations: ['slide-down']
    },
    'hero-section': {
      name: 'Hero Section',
      description: 'Main hero area with product image and CTA',
      dependencies: [],
      animations: ['fade-in-up', 'stagger-text']
    },
    'video-section': {
      name: 'Video Background Section',
      description: 'Full-screen video with centered content and text overlays',
      dependencies: [],
      animations: ['video-overlay-fade', 'text-reveal']
    },
    'mission-section': {
      name: 'Mission Section',
      description: 'Company mission and values content',
      dependencies: [],
      animations: ['fade-in-up']
    },
    'product-section': {
      name: 'Product Section',
      description: 'Product showcase with details and benefits',
      dependencies: [],
      animations: ['product-reveal', 'fade-in-up']
    },
    'empty-section': {
      name: 'Empty Section',
      description: 'Placeholder section for future content',
      dependencies: [],
      animations: ['fade-in']
    },
    'footer': {
      name: 'Footer',
      description: 'Site footer with links and company information',
      dependencies: [],
      animations: ['fade-in-up']
    }
  },

  // Animation settings for Anime.js integration
  animations: {
    'fade-in': {
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuart'
    },
    'fade-in-up': {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    },
    'slide-down': {
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuart'
    },
    'stagger-text': {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: (el, i) => i * 100,
      easing: 'easeOutExpo'
    },
    'video-overlay-fade': {
      opacity: [0, 1],
      duration: 1500,
      delay: 500,
      easing: 'easeOutQuart'
    },
    'text-reveal': {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 1000,
      delay: (el, i) => i * 200,
      easing: 'easeOutExpo'
    },
    'product-reveal': {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    }
  },

  // Loading states
  loading: {
    showLoadingIndicator: true,
    loadingText: 'Loading components...',
    errorRetryAttempts: 3,
    componentTimeout: 5000
  },

  // Development settings
  development: {
    enableHotReload: true,
    showComponentBoundaries: false,
    logComponentLoading: true,
    enablePerformanceMetrics: true
  }
};

/**
 * Get component configuration by name
 */
export function getComponentConfig(componentName) {
  return COMPONENT_CONFIG.components[componentName] || null;
}

/**
 * Get animation configuration by name
 */
export function getAnimationConfig(animationName) {
  return COMPONENT_CONFIG.animations[animationName] || null;
}

/**
 * Get all components that depend on a specific component
 */
export function getComponentDependents(componentName) {
  return Object.entries(COMPONENT_CONFIG.components)
    .filter(([, config]) => config.dependencies.includes(componentName))
    .map(([name]) => name);
}

/**
 * Validate component loading order based on dependencies
 */
export function validateComponentOrder(order) {
  const errors = [];
  
  for (let i = 0; i < order.length; i++) {
    const component = order[i];
    const config = getComponentConfig(component);
    
    if (!config) {
      errors.push(`Unknown component: ${component}`);
      continue;
    }
    
    // Check if dependencies are loaded before this component
    for (const dependency of config.dependencies) {
      const depIndex = order.indexOf(dependency);
      if (depIndex === -1) {
        errors.push(`Missing dependency: ${component} requires ${dependency}`);
      } else if (depIndex > i) {
        errors.push(`Dependency order error: ${dependency} must be loaded before ${component}`);
      }
    }
  }
  
  return errors;
}
