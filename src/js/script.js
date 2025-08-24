const bar = document.getElementById('menu-bar');
const close = document.getElementById('close-button');
const nav = document.getElementById('nav-menu');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        nav.classList.add('menu-open');
    })
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
    nav.classList.remove('menu-open');
  });
}