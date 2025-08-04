// Mobile Menu Functionality
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.mobile-menu-toggle')
    this.menuOverlay = document.querySelector('.mobile-menu-overlay')
    this.menuLinks = document.querySelectorAll('.mobile-nav-link')
    this.isOpen = false
    
    this.init()
  }
  
  init() {
    if (!this.menuToggle || !this.menuOverlay) {
      console.warn('Mobile menu elements not found')
      return
    }
    
    this.setupEventListeners()
  }
  
  setupEventListeners() {
    // Toggle menu on hamburger click
    this.menuToggle.addEventListener('click', (e) => {
      e.preventDefault()
      this.toggleMenu()
    })
    
    // Close menu when clicking on overlay
    this.menuOverlay.addEventListener('click', (e) => {
      if (e.target === this.menuOverlay) {
        this.closeMenu()
      }
    })
    
    // Close menu when clicking on menu links
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu()
      })
    })
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu()
      }
    })
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && this.isOpen) {
        this.closeMenu()
      }
    })
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }
  
  openMenu() {
    this.isOpen = true
    this.menuToggle.classList.add('active')
    this.menuOverlay.classList.add('active')
    document.body.style.overflow = 'hidden'
    
    // Set focus to first menu item for accessibility
    setTimeout(() => {
      const firstLink = this.menuOverlay.querySelector('.mobile-nav-link')
      if (firstLink) {
        firstLink.focus()
      }
    }, 300)
  }
  
  closeMenu() {
    this.isOpen = false
    this.menuToggle.classList.remove('active')
    this.menuOverlay.classList.remove('active')
    document.body.style.overflow = ''
  }
}

// Initialize mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu()
})

export default MobileMenu
