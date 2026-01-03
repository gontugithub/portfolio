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