import { SimpleRouter } from './router.js';
import { routes } from './views.js';
import { initNavbarScroll } from './navbar.js';

new SimpleRouter(routes);

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    
});
