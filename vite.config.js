import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Function to copy directory recursively
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  const entries = readdirSync(src, { withFileTypes: true })
  
  for (let entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

export default defineConfig({
  // Vite configuration
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // Copy components during build
      plugins: [
        {
          name: 'copy-components',
          writeBundle() {
            // Copy src/components to dist/src/components
            copyDir('src/components', 'dist/src/components')
            console.log('✅ Components copied to dist/src/components')
          }
        }
      ]
    }
  }
})