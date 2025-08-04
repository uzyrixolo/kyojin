// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    link.addEventListener('click', closeMobileMenu);
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});
