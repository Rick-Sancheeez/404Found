import '/css/header.css';
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const openMenu = () => {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    closeMenu();
  }
});
