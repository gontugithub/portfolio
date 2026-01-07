import { SimpleRouter } from './router.js';
import { routes } from './views.js';
import { initNavbarScroll, initMobileMenu} from './navbar.js';
import { initThemeToggle } from './theme.js';

new SimpleRouter(routes);

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    
});
