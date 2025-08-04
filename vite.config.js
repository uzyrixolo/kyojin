import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'

// Plugin to copy component files to build output
const copyComponentsPlugin = () => {
  return {
    name: 'copy-components',
    generateBundle() {
      const sourceDir = 'src/components'
      const targetDir = 'dist/assets/components'
      
      try {
        mkdirSync(targetDir, { recursive: true })
        
        const files = readdirSync(sourceDir)
        files.forEach(file => {
          if (file.endsWith('.html')) {
            copyFileSync(join(sourceDir, file), join(targetDir, file))
          }
        })
        console.log('✅ Component files copied to build output')
      } catch (error) {
        console.warn('⚠️ Failed to copy component files:', error.message)
      }
    }
  }
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 5178,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        components: './index-components.html',
        'data-components': './index-data-components.html'
      }
    }
  },
  plugins: [copyComponentsPlugin()],
  assetsInclude: ['**/*.html'],
  optimizeDeps: {
    exclude: ['animejs']
  }
})
