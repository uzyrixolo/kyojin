/**
 * Loading Screen Module
 * Shows a beautiful loading animation using favicon.png while assets load
 */

class LoadingScreen {
  constructor() {
    this.loadingElement = null;
    this.isVisible = false;
    this.assetsToLoad = [];
    this.loadedAssets = 0;
    this.onComplete = null;
  }

  /**
   * Create and show the loading screen
   */
  show() {
    if (this.isVisible) return;

    this.createLoadingHTML();
    this.startLoadingAnimation();
    this.isVisible = true;
    
    // Prevent body scrolling while loading
    document.body.style.overflow = 'hidden';
  }

  /**
   * Create the loading screen HTML structure
   */
  createLoadingHTML() {
    const loadingHTML = `
      <div id="kyojin-loading-screen" class="loading-screen">
        <div class="loading-content">
          <!-- Main loading logo/icon -->
          <div class="loading-logo">
            <img src="/favicon.png" alt="KYOJIN" class="loading-favicon">
            <div class="loading-pulse-ring"></div>
            <div class="loading-pulse-ring loading-pulse-ring-delay-1"></div>
            <div class="loading-pulse-ring loading-pulse-ring-delay-2"></div>
          </div>
          
          <!-- Loading text and progress -->
          <div class="loading-text">
            <h1 class="loading-title">KYOJIN</h1>
            <p class="loading-subtitle">Preparing your biome experience...</p>
            <div class="loading-progress-container">
              <div class="loading-progress-bar">
                <div class="loading-progress-fill" id="loading-progress-fill"></div>
              </div>
              <span class="loading-percentage" id="loading-percentage">0%</span>
            </div>
          </div>
          
          <!-- Floating particles for biome theme -->
          <div class="loading-particles">
            <div class="loading-particle"></div>
            <div class="loading-particle"></div>
            <div class="loading-particle"></div>
            <div class="loading-particle"></div>
            <div class="loading-particle"></div>
            <div class="loading-particle"></div>
          </div>
        </div>
      </div>
    `;

    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    this.loadingElement = document.getElementById('kyojin-loading-screen');
  }

  /**
   * Start the loading animations
   */
  startLoadingAnimation() {
    // Animate loading screen entrance
    setTimeout(() => {
      if (this.loadingElement) {
        this.loadingElement.classList.add('loading-screen-visible');
      }
    }, 100);
  }

  /**
   * Update loading progress
   */
  updateProgress(percentage) {
    const progressFill = document.getElementById('loading-progress-fill');
    const progressText = document.getElementById('loading-percentage');
    
    if (progressFill && progressText) {
      progressFill.style.width = `${percentage}%`;
      progressText.textContent = `${Math.round(percentage)}%`;
    }
    
    // Complete loading when 100%
    if (percentage >= 100) {
      setTimeout(() => this.hide(), 800);
    }
  }

  /**
   * Preload critical assets and update progress
   */
  async preloadAssets() {
    const assets = [
      // Images
      '/favicon.png',
      '/kyojin-png-logo.png',
      '/hand.png',
      '/product-1.png',
      '/blog-1.png',
      '/blog-2.png',
      '/blog-3.png',
      '/golden-circle.png',
      '/mission-bg.png',
      '/pattern-bg.png',
      // Videos
      '/kyojin-video.mp4'
    ];

    const totalAssets = assets.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const percentage = (loadedCount / totalAssets) * 100;
      this.updateProgress(percentage);
    };

    const loadPromises = assets.map(assetPath => {
      return new Promise((resolve) => {
        if (assetPath.endsWith('.mp4')) {
          // Load video
          const video = document.createElement('video');
          video.addEventListener('loadeddata', () => {
            updateProgress();
            resolve();
          });
          video.addEventListener('error', () => {
            updateProgress(); // Continue even if video fails
            resolve();
          });
          video.src = assetPath;
          video.load();
        } else {
          // Load image
          const img = new Image();
          img.addEventListener('load', () => {
            updateProgress();
            resolve();
          });
          img.addEventListener('error', () => {
            updateProgress(); // Continue even if image fails
            resolve();
          });
          img.src = assetPath;
        }
      });
    });

    // Wait for all assets to load
    await Promise.all(loadPromises);
  }

  /**
   * Hide the loading screen with animation
   */
  hide() {
    if (!this.isVisible || !this.loadingElement) return;

    this.loadingElement.classList.add('loading-screen-hidden');
    
    setTimeout(() => {
      if (this.loadingElement && this.loadingElement.parentNode) {
        this.loadingElement.parentNode.removeChild(this.loadingElement);
      }
      this.isVisible = false;
      
      // Restore body scrolling
      document.body.style.overflow = '';
      
      // Call completion callback
      if (this.onComplete) {
        this.onComplete();
      }
    }, 600);
  }

  /**
   * Set callback for when loading completes
   */
  onLoadingComplete(callback) {
    this.onComplete = callback;
  }

  /**
   * Start the complete loading process
   */
  async start() {
    this.show();
    
    // Simulate minimum loading time for smooth UX
    const minLoadTime = 2000; // 2 seconds minimum
    const startTime = Date.now();
    
    // Preload assets
    await this.preloadAssets();
    
    // Ensure minimum loading time
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minLoadTime) {
      await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsedTime));
    }
  }
}

// Export for use in main components
export { LoadingScreen };
