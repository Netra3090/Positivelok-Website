import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist'
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'html/**/*', dest: 'html' }, // copies all files & subfolders from html/
        { src: 'css/**/*', dest: 'css' },   // copies all files & subfolders from css/
        { src: 'js/**/*', dest: 'js' }      // copies all files & subfolders from js/
      ]
    })
  ]
})