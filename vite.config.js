import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Auto-discover every non-empty .html file as a build input so all pages
// (home, inner pages, navbar/footer partials, and every product detail page)
// are emitted by `vite build`. New pages are picked up automatically.
function htmlInputs(dir, acc = {}) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', '.vercel', 'Positivelok'].includes(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      htmlInputs(full, acc);
    } else if (name.endsWith('.html') && st.size > 0) {
      const key = full.replace(process.cwd() + '/', '').replace(/[\\/]/g, '_').replace(/\.html$/, '');
      acc[key] = full;
    }
  }
  return acc;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlInputs(process.cwd()),
    },
  },
});
