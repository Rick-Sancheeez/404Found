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
  link.addEventListener('click', e => {
    const target = link.getAttribute('href');
    if (target.startsWith('#')) {
      setTimeout(() => {
        closeMenu();
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      e.preventDefault();
    } else {
      closeMenu();
    }
  });
});
const btnCtaMobile = document.querySelector('.btn-cta-mobile');
if (btnCtaMobile) {
  btnCtaMobile.addEventListener('click', e => {
    const target = btnCtaMobile.getAttribute('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      setTimeout(() => {
        closeMenu();
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      closeMenu();
    }
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    closeMenu();
  }
});
