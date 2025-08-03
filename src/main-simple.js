import './style.css'

// Simple KYOJIN initialization
console.log('🌿 KYOJIN - CSS Loaded')

// Basic DOM ready check
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ KYOJIN - DOM Ready')
  
  // Add some basic interactivity
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary')
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log(`Button clicked: ${button.textContent}`)
    })
  })
})
