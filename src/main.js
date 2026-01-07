import { SimpleRouter } from './router.js';
import { routes } from './views.js';
import { initScrollView } from './scroll.js'; // Importamos el iniciador de scroll/animaciones
import { initThemeToggle } from './theme.js';
import { initMobileMenu, initNavbarScroll } from './navbar.js';

// 1. Inicializamos el Router
// El router se encarga de llamar a los métodos onMount de cada vista
new SimpleRouter(routes);

document.addEventListener('DOMContentLoaded', () => {
    // 2. Inicializamos el tema (esto es global, solo una vez)
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    
    // 3. Inicializamos el comportamiento base del scroll (Navbar y Theme Toggle)
    // Se ejecuta al cargar por primera vez
    initScrollView();
});