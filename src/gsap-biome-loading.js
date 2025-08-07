/**
 * GSAP Biome Loading Screen
 * Beautiful biome growth animation using favicon.png while assets load
 */

import { gsap } from 'gsap';

class BiomeLoadingScreen {
  constructor() {
    this.loadingElement = null;
    this.isVisible = false;
    this.assetsToLoad = [];
    this.loadedAssets = 0;
    this.onComplete = null;
  }

  /**
   * Create and show the loading screen with biome animation
   */
  show() {
    if (this.isVisible) return;

    this.createLoadingHTML();
    this.startBiomeAnimation();
    this.isVisible = true;
    
    console.log('🌱 Biome loading screen shown');
  }

  /**
   * Create the loading screen HTML structure
   */
  createLoadingHTML() {
    this.loadingElement = document.createElement('div');
    this.loadingElement.className = 'biome-loading-screen';
    this.loadingElement.innerHTML = `
      <div class="biome-container">
        <!-- Central organism (favicon) -->
        <div class="biome-center">
          <img src="/favicon.png" alt="KYOJIN" class="biome-favicon">
          <div class="biome-pulse-ring ring-1"></div>
          <div class="biome-pulse-ring ring-2"></div>
          <div class="biome-pulse-ring ring-3"></div>
        </div>
        
        <!-- Growing particles -->
        <div class="biome-particles">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          <div class="particle particle-5"></div>
          <div class="particle particle-6"></div>
          <div class="particle particle-7"></div>
          <div class="particle particle-8"></div>
        </div>
        
        <!-- Progress info -->
        <div class="biome-info">
          <h2 class="biome-title">KYOJIN</h2>
          <p class="biome-subtitle">Growing your biome...</p>
          <div class="biome-progress">
            <div class="biome-progress-bar"></div>
          </div>
          <div class="biome-status">Preparing nutrients...</div>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .biome-loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #1a3009 0%, #2d5016 50%, #4a7c23 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: var(--font-body);
      }
      
      .biome-container {
        position: relative;
        width: 400px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .biome-center {
        position: relative;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .biome-favicon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        z-index: 3;
        filter: drop-shadow(0 0 20px rgba(74, 124, 35, 0.6));
      }
      
      .biome-pulse-ring {
        position: absolute;
        border: 2px solid rgba(74, 124, 35, 0.3);
        border-radius: 50%;
        animation: biomePulse 2s ease-out infinite;
      }
      
      .ring-1 {
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      
      .ring-2 {
        width: 120px;
        height: 120px;
        animation-delay: 0.7s;
      }
      
      .ring-3 {
        width: 160px;
        height: 160px;
        animation-delay: 1.4s;
      }
      
      .biome-particles {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      
      .particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #4a7c23, #2d5016);
        border-radius: 50%;
        opacity: 0;
      }
      
      .biome-info {
        position: absolute;
        bottom: -120px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: white;
        width: 300px;
      }
      
      .biome-title {
        font-size: 2rem;
        font-weight: 600;
        margin: 0 0 10px 0;
        color: #4a7c23;
        text-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      
      .biome-subtitle {
        font-size: 1rem;
        margin: 0 0 20px 0;
        opacity: 0.9;
      }
      
      .biome-progress {
        width: 200px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto 15px;
      }
      
      .biome-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #4a7c23, #2d5016);
        border-radius: 2px;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      .biome-status {
        font-size: 0.9rem;
        opacity: 0.7;
        min-height: 20px;
      }
      
      @keyframes biomePulse {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        100% {
          transform: scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.loadingElement);
  }

  /**
   * Start GSAP biome growth animations
   */
  startBiomeAnimation() {
    const favicon = this.loadingElement.querySelector('.biome-favicon');
    const title = this.loadingElement.querySelector('.biome-title');
    const subtitle = this.loadingElement.querySelector('.biome-subtitle');
    const particles = this.loadingElement.querySelectorAll('.particle');

    // Animate favicon entrance
    gsap.fromTo(favicon, 
      { 
        scale: 0, 
        rotation: -180, 
        opacity: 0 
      },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.3)",
        delay: 0.5
      }
    );

    // Animate text
    gsap.fromTo([title, subtitle], 
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.2,
        delay: 1
      }
    );

    // Animate particles in organic pattern
    particles.forEach((particle, index) => {
      const angle = (index / particles.length) * Math.PI * 2;
      const radius = 150;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.set(particle, {
        left: '50%',
        top: '50%',
        x: 0,
        y: 0
      });

      gsap.to(particle, {
        x: x,
        y: y,
        opacity: 0.8,
        scale: gsap.utils.random(0.5, 1.5),
        duration: gsap.utils.random(2, 4),
        ease: "power2.out",
        delay: gsap.utils.random(1.5, 3),
        yoyo: true,
        repeat: -1,
        repeatDelay: gsap.utils.random(0.5, 1.5)
      });
    });

    console.log('🎬 GSAP biome animations started');
  }

  /**
   * Set loading completion callback
   */
  onLoadingComplete(callback) {
    this.onComplete = callback;
  }

  /**
   * Update progress
   */
  updateProgress(progress) {
    const progressBar = this.loadingElement?.querySelector('.biome-progress-bar');
    const status = this.loadingElement?.querySelector('.biome-status');
    
    if (progressBar) {
      gsap.to(progressBar, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    
    if (status) {
      const messages = [
        'Preparing nutrients...',
        'Growing microbiome...',
        'Cultivating strength...',
        'Activating biome...',
        'Ready to flourish!'
      ];
      
      const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
      status.textContent = messages[messageIndex];
    }
  }

  /**
   * Start the loading process
   */
  async start() {
    this.show();
    await this.preloadAssets();
  }

  /**
   * Preload assets with progress tracking
   */
  async preloadAssets() {
    const startTime = Date.now();
    const minLoadTime = 3000; // Minimum 3 seconds to show the beautiful animation
    
    this.assetsToLoad = [
      '/favicon.png',
      '/golden-circle.png',
      '/kyojin-video.mp4',
      '/src/style.css'
    ];
    
    let progress = 0;
    const progressStep = 100 / this.assetsToLoad.length;
    
    for (const asset of this.assetsToLoad) {
      try {
        if (asset.endsWith('.mp4')) {
          // Special handling for video
          await this.preloadVideo(asset);
        } else {
          await this.preloadResource(asset);
        }
        
        progress += progressStep;
        this.updateProgress(progress);
        
        // Small delay between assets for smooth progress
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.warn(`Failed to preload ${asset}:`, error);
        progress += progressStep;
        this.updateProgress(progress);
      }
    }
    
    // Ensure minimum loading time for animation
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minLoadTime) {
      await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsedTime));
    }
    
    this.updateProgress(100);
    await this.hide();
  }

  /**
   * Preload a regular resource
   */
  preloadResource(url) {
    return new Promise((resolve, reject) => {
      if (url.endsWith('.css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      } else {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      }
    });
  }

  /**
   * Preload video
   */
  preloadVideo(url) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.oncanplaythrough = resolve;
      video.onerror = resolve; // Don't fail on video errors
      video.src = url;
      video.load();
    });
  }

  /**
   * Hide loading screen with animation
   */
  async hide() {
    if (!this.isVisible || !this.loadingElement) return;
    
    console.log('🌱 Hiding biome loading screen...');
    
    // Animate out
    await gsap.to(this.loadingElement, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.inOut"
    });
    
    this.loadingElement.remove();
    this.isVisible = false;
    
    // Call completion callback
    if (this.onComplete) {
      this.onComplete();
    }
    
    console.log('✅ Biome loading complete');
  }
}

export { BiomeLoadingScreen };
