export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  if (!navbar) return; 

  const handleScroll = () => {
    if (window.scrollY > 20) {
      // Estado: Scroll activo
      // Cambiamos /90 por /40 (40% de opacidad)
      navbar.classList.add('py-2', 'bg-card/40', 'shadow-xl', 'w-[90%]', 'top-2');
      navbar.classList.remove('top-4', 'bg-card/20', 'w-[95%]');
    } else {
      // Estado: Inicial
      // Cambiamos /60 por /20 (20% de opacidad)
      navbar.classList.remove('py-2', 'bg-card/40', 'shadow-xl', 'w-[90%]', 'top-2');
      navbar.classList.add('top-4', 'bg-card/20', 'w-[95%]');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}


export function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;

  const menuIcon = menuBtn.querySelector('i');

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');

    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    } else {
      menuIcon.classList.replace('fa-bars', 'fa-xmark');
    }
  });

  // Cerrar al clickar un link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // Cerrar al clickar fuera
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}