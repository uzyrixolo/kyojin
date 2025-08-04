import './style.css'
import anime from 'animejs'
import MobileMenu from './mobile-menu.js'

// KYOJIN Animation System
class KyojinAnimations {
  constructor() {
    this.init()
  }
  
  init() {
    this.setupScrollAnimations()
    this.startHeroAnimations()
    this.setupInteractiveElements()
  }
  
  startHeroAnimations() {
    // Hero text animation sequence
    const timeline = anime.timeline({
      easing: 'easeOutExpo'
    })
    
    timeline
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 500
      })
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 200
      }, '-=600')
      .add({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 300
      }, '-=700')
      .add({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 200
      }, '-=600')
      .add({
        targets: '.product-circle',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .8)',
        delay: 400
      }, '-=1000')
    
    // Start floating elements orbit animation after hero loads
    setTimeout(() => {
      this.startFloatingElements()
    }, 2000)
  }
  
  startFloatingElements() {
    // Add CSS animation class to floating elements
    const floatingElements = document.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      element.style.animationDelay = `${index * -5}s`
      element.classList.add('orbit-animation')
    })
    
    // Product bottle floating animation
    anime({
      targets: '.product-bottle',
      translateY: [-5, 5],
      duration: 3000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    })
  }
  
  setupScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSection(entry.target)
        }
      })
    }, observerOptions)
    
    // Observe all sections
    const sections = document.querySelectorAll('.empty-section')
    sections.forEach(section => observer.observe(section))
  }
  
  animateSection(section) {
    const placeholder = section.querySelector('.section-placeholder')
    if (placeholder) {
      anime({
        targets: placeholder,
        opacity: [0.5, 1],
        scale: [0.95, 1],
        duration: 800,
        easing: 'easeOutCubic'
      })
    }
  }
  
  setupInteractiveElements() {
    // Smooth button hover effects
    this.setupButtonAnimations()
    
    // Navigation interactions
    this.setupNavigationEffects()
    
    // Product interaction
    this.setupProductInteraction()
  }
  
  setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary')
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 200,
          easing: 'easeOutCubic'
        })
      })
      
      button.addEventListener('mouseleave', () => {
        anime({
          targets: button,
          scale: 1,
          duration: 200,
          easing: 'easeOutCubic'
        })
      })
      
      button.addEventListener('click', (e) => {
        this.createRipple(e, button)
      })
    })
  }
  
  setupNavigationEffects() {
    const navLinks = document.querySelectorAll('.nav-link')
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        anime({
          targets: link,
          translateY: -2,
          duration: 200,
          easing: 'easeOutCubic'
        })
      })
      
      link.addEventListener('mouseleave', () => {
        anime({
          targets: link,
          translateY: 0,
          duration: 200,
          easing: 'easeOutCubic'
        })
      })
    })
  }
  
  setupProductInteraction() {
    const productCircle = document.querySelector('.product-circle')
    
    if (productCircle) {
      productCircle.addEventListener('mouseenter', () => {
        anime({
          targets: '.floating-element',
          scale: 1.2,
          duration: 300,
          easing: 'easeOutCubic'
        })
        
        anime({
          targets: '.product-bottle',
          scale: 1.1,
          duration: 300,
          easing: 'easeOutCubic'
        })
      })
      
      productCircle.addEventListener('mouseleave', () => {
        anime({
          targets: '.floating-element',
          scale: 1,
          duration: 300,
          easing: 'easeOutCubic'
        })
        
        anime({
          targets: '.product-bottle',
          scale: 1,
          duration: 300,
          easing: 'easeOutCubic'
        })
      })
    }
  }
  
  createRipple(event, button) {
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    ripple.style.position = 'absolute'
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'rgba(255, 255, 255, 0.3)'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.style.width = size + 'px'
    ripple.style.height = size + 'px'
    ripple.style.pointerEvents = 'none'
    ripple.style.transform = 'scale(0)'
    
    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)
    
    anime({
      targets: ripple,
      scale: [0, 2],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutCubic',
      complete: () => {
        ripple.remove()
      }
    })
  }
}

// Smooth Scroll Handler
class SmoothScroll {
  constructor() {
    this.setupSmoothScrolling()
  }
  
  setupSmoothScrolling() {
    // Add smooth scrolling to anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const targetElement = document.querySelector(targetId)
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.monitorPerformance()
  }
  
  monitorPerformance() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--animation-duration', '0.3s')
    }
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      anime.suspendWhenDocumentHidden = false
      document.documentElement.style.setProperty('--animation-duration', '0.1s')
    }
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌿 KYOJIN - Initializing...')
  
  try {
    new KyojinAnimations()
    new SmoothScroll()
    new PerformanceMonitor()
    new MobileMenu()
    
    console.log('✅ KYOJIN - Ready!')
  } catch (error) {
    console.error('❌ KYOJIN - Error:', error)
  }
})

// Export for potential external use
export { KyojinAnimations, SmoothScroll, PerformanceMonitor, MobileMenu }
