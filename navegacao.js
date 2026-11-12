const mainNav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

function closeMainNav() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mainNav.addEventListener('click', event => {
  if (event.target.closest('a[href]')) closeMainNav();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMainNav();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    closeMainNav();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMainNav);
