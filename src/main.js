import { SimpleRouter } from './router.js';
import { routes } from './views.js';
import { initScrollView } from './scroll.js'; 
import { initThemeToggle } from './theme.js';
import { initMobileMenu, initNavbarScroll } from './navbar.js';

new SimpleRouter(routes);

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initScrollView();
});