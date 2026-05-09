import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Main entry
        main: 'index.html',
        // Inner pages
        products:  'html/products.html',
        aboutUs:   'html/about-us.html',
        contactUs: 'html/contact-us.html',
        eCatalog:  'html/e-catalog.html',
        // HTML partials (navbar, footer) — must be included so fetch() finds them
        navbar:  'html/navbar.html',
        footer:  'html/footer.html',
      },
    },
  },
});
