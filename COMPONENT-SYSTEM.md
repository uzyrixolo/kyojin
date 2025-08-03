# KYOJIN Component System

This document outlines the modular component architecture implemented for the KYOJIN website. The original monolithic HTML file has been broken down into reusable, maintainable components.

## 📁 Component Structure

```
src/
├── components/
│   ├── notification-bar.html      # Top notification bar
│   ├── header.html               # Main navigation header
│   ├── hero-section.html         # Hero section with CTA
│   ├── video-section.html        # Video background section
│   ├── mission-section.html      # Mission statement
│   ├── product-section.html      # Product showcase
│   ├── empty-section.html        # Placeholder section
│   └── footer.html               # Site footer
├── component-loader.js           # Component loading system
├── component-config.js           # Component configuration
├── main-components.js            # Programmatic component loading
└── main-data-components.js       # Data-attribute based loading
```

## 🚀 Usage Options

### Option 1: Programmatic Loading
**File:** `index-components.html`
- Components are loaded via JavaScript in a specific order
- Full control over loading sequence and error handling
- Better for complex applications with component dependencies

```html
<!-- Minimal HTML structure -->
<div id="app">
  <div class="loading-indicator">Loading components...</div>
</div>
<script type="module" src="/src/main-components.js"></script>
```

### Option 2: Data Attribute Loading
**File:** `index-data-components.html`
- Components defined using `data-component` attributes
- More declarative approach
- Better for simpler component hierarchies

```html
<!-- Declarative component placeholders -->
<div data-component="notification-bar"></div>
<div data-component="header"></div>
<div data-component="hero-section"></div>
<!-- ... etc -->
<script type="module" src="/src/main-data-components.js"></script>
```

## 🔧 Component System Features

### ComponentLoader Class
- **Caching**: Components are cached after first load
- **Parallel Loading**: Multiple components can load simultaneously
- **Error Handling**: Graceful fallbacks for failed component loads
- **Flexible Insertion**: Components can be inserted into any DOM element

### Key Methods:
```javascript
const loader = new ComponentLoader();

// Load a single component
await loader.loadComponent('header');

// Load multiple components
await loader.loadComponents(['header', 'footer']);

// Insert component into specific element
await loader.insertComponent('header', '#header-container');

// Build entire page
await loader.buildPage(componentOrder, '#app');
```

### Animation Integration
The system is designed to work seamlessly with Anime.js:
- **Staggered Loading**: Components animate in sequence
- **Intersection Observer**: Scroll-triggered animations
- **Performance Optimized**: Animations only run when components are visible

### Configuration System
Central configuration in `component-config.js`:
- **Component Metadata**: Name, description, dependencies
- **Animation Settings**: Pre-configured Anime.js animations
- **Loading Order**: Dependency-aware component ordering
- **Development Tools**: Hot reload and debugging features

## 🎬 Animation Integration

The component system is optimized for organic, biome-like animations:

```javascript
// Example animation configurations
animations: {
  'fade-in-up': {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  },
  'product-reveal': {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutElastic(1, .8)'
  }
}
```

## 🛠️ Development Workflow

### Adding New Components
1. Create HTML file in `src/components/`
2. Add component config to `component-config.js`
3. Update component order arrays
4. Test loading in both modes

### Component Guidelines
- **Self-contained**: Each component should be independent
- **Semantic HTML**: Use proper HTML5 semantic elements
- **CSS Classes**: Follow existing naming conventions
- **Accessibility**: Include proper ARIA attributes and alt text
- **Performance**: Optimize images and minimize DOM complexity

### Hot Reload (Development)
```javascript
// Reload specific component
window.reloadComponent('header');

// Reload all components
window.reloadAllComponents();
```

## 📊 Performance Benefits

### Before (Monolithic)
- ❌ Single large HTML file
- ❌ Difficult to maintain
- ❌ No code reusability
- ❌ Hard to test individual sections

### After (Component-based)
- ✅ **Modular Architecture**: Each section is isolated
- ✅ **Reusability**: Components can be used across pages
- ✅ **Maintainability**: Easy to update individual sections
- ✅ **Testing**: Components can be tested independently
- ✅ **Caching**: Components are cached for better performance
- ✅ **Parallel Loading**: Faster initial page load
- ✅ **Error Isolation**: Failed components don't break the entire page

## 🔄 Migration Guide

### From Original HTML
The original `index.html` remains unchanged and functional. To use the component system:

1. **Choose your approach**: Programmatic or Data-attribute based
2. **Use the appropriate HTML file**: `index-components.html` or `index-data-components.html`
3. **Update any hardcoded paths** in your CSS or JavaScript
4. **Test all functionality** to ensure components load correctly

### Gradual Migration
You can migrate gradually by:
1. Starting with one component (e.g., header)
2. Testing thoroughly
3. Moving to the next component
4. Eventually replacing the entire page

## 🚨 Error Handling

The system includes comprehensive error handling:
- **Network Errors**: Retry mechanism with exponential backoff
- **Missing Components**: Graceful fallbacks with error messages
- **Invalid HTML**: Sanitization and validation
- **Loading Timeouts**: Configurable timeout values

## 🎯 Best Practices

1. **Component Naming**: Use kebab-case for consistency
2. **File Organization**: Keep related assets close to components
3. **CSS Scoping**: Use component-specific CSS classes
4. **JavaScript Integration**: Initialize component-specific JS after loading
5. **Testing**: Test components in isolation and integration
6. **Performance**: Monitor loading times and optimize as needed

## 📈 Future Enhancements

- **Server-Side Rendering**: Pre-render components for better SEO
- **Component Versioning**: Version control for component updates
- **A/B Testing**: Easy component swapping for experiments
- **Analytics Integration**: Track component performance metrics
- **Progressive Loading**: Load critical components first
- **Service Worker Caching**: Cache components for offline use

---

This component system provides a solid foundation for the KYOJIN website while maintaining flexibility for future enhancements and the planned Anime.js biome growth animations.
