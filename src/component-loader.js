/**
 * Component Loader - Dynamically loads HTML components
 * This system allows for modular HTML components that can be reused across pages
 */

class ComponentLoader {
  constructor() {
    this.loadedComponents = new Map();
    this.isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  }

  /**
   * Get the correct path for components based on environment
   * @param {string} componentName - Name of the component file
   * @returns {string[]} - Array of possible paths to try
   */
  getComponentPaths(componentName) {
    const filename = `${componentName}.html`;
    
    if (this.isProduction) {
      // Production paths for Vercel
      return [
        `/assets/components/${filename}`,
        `./assets/components/${filename}`,
        `/dist/assets/components/${filename}`,
        `components/${filename}`
      ];
    } else {
      // Development paths
      return [
        `/src/components/${filename}`,
        `./src/components/${filename}`
      ];
    }
  }

  /**
   * Load a component from file and cache it
   * @param {string} componentName - Name of the component file (without .html extension)
   * @returns {Promise<string>} - The HTML content of the component
   */
  async loadComponent(componentName) {
    if (this.loadedComponents.has(componentName)) {
      return this.loadedComponents.get(componentName);
    }

    const possiblePaths = this.getComponentPaths(componentName);
    let response = null;
    let lastError = null;

    console.log(`Loading component: ${componentName}, Environment: ${this.isProduction ? 'production' : 'development'}`);
    console.log(`Trying paths:`, possiblePaths);

    for (const path of possiblePaths) {
      try {
        console.log(`Attempting to fetch: ${path}`);
        response = await fetch(path);
        if (response.ok) {
          console.log(`Successfully loaded from: ${path}`);
          break;
        } else {
          console.log(`Failed to load from ${path}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error fetching ${path}:`, error.message);
        lastError = error;
        continue;
      }
    }

    if (!response || !response.ok) {
      const errorMsg = `Failed to load component: ${componentName} from all paths. Last error: ${lastError?.message || 'Unknown error'}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      const html = await response.text();
      this.loadedComponents.set(componentName, html);
      console.log(`Successfully cached component: ${componentName}`);
      return html;
    } catch (error) {
      console.error(`Error parsing component ${componentName}:`, error);
      return `<div class="component-error">Failed to load ${componentName}</div>`;
    }
  }

  /**
   * Load multiple components in parallel
   * @param {string[]} componentNames - Array of component names to load
   * @returns {Promise<Object>} - Object with component names as keys and HTML as values
   */
  async loadComponents(componentNames) {
    const promises = componentNames.map(async (name) => ({
      name,
      html: await this.loadComponent(name)
    }));

    const results = await Promise.all(promises);
    return results.reduce((acc, { name, html }) => {
      acc[name] = html;
      return acc;
    }, {});
  }

  /**
   * Insert a component into a DOM element
   * @param {string} componentName - Name of the component to load
   * @param {string|Element} target - CSS selector or DOM element to insert into
   */
  async insertComponent(componentName, target) {
    const html = await this.loadComponent(componentName);
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.error(`Target element not found for component: ${componentName}`);
    }
  }

  /**
   * Replace placeholder elements with components
   * Looks for elements with data-component attribute
   */
  async loadAllComponents() {
    const componentPlaceholders = document.querySelectorAll('[data-component]');
    
    const loadPromises = Array.from(componentPlaceholders).map(async (element) => {
      const componentName = element.getAttribute('data-component');
      const html = await this.loadComponent(componentName);
      element.outerHTML = html;
    });

    await Promise.all(loadPromises);
  }

  /**
   * Build the complete page by loading all components in order
   * @param {string[]} componentOrder - Array of component names in the order they should appear
   * @param {string} targetSelector - CSS selector for the container element
   */
  async buildPage(componentOrder, targetSelector = '#app') {
    const container = document.querySelector(targetSelector);
    if (!container) {
      console.error(`Container element ${targetSelector} not found`);
      return;
    }

    // Load all components in parallel for better performance
    const components = await this.loadComponents(componentOrder);
    
    // Insert components in the specified order
    const htmlContent = componentOrder
      .map(name => components[name])
      .join('\n');
    
    container.innerHTML = htmlContent;
  }
}

// Export for use in other modules
export { ComponentLoader };

// Auto-initialize if not imported as module
if (typeof window !== 'undefined') {
  window.ComponentLoader = ComponentLoader;
}
