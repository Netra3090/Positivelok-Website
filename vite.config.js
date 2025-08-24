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
        { src: 'html', dest: '' }, // copies html/ to dist/html/
        { src: 'css', dest: '' },  // copies css/ to dist/css/
        { src: 'js', dest: '' }    // copies js/ to dist/js/
      ]
    })
  ]
})