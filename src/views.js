import { 
    initScrollView, 
    cleanupScrollView, 
    initHeroAnimation, 
    initProjectsHorizontalScroll,
    initFadeUpAnimations // 1. Importamos la función de animaciones
} from './scroll.js';

// Base URL para que funcione en local y en GitHub Pages
const BASE_URL = import.meta.env.BASE_URL;

export const routes = {
    '/': {
        templateId: 'view-landing-page',
        templateUrl: `${BASE_URL}src/views/landing-page.html`,
        onMount: (container) => {
            // 1. Navegación y Scroll suave
            initScrollView(container);
            
            // 2. Animación 3D del Hero (Nombre y Descripción)
            initHeroAnimation();

            // 3. Scroll Horizontal de Repositorios
            initProjectsHorizontalScroll();

            // 4. NUEVO: Lanzar las animaciones de aparición "Fade Up"
            // Se llama al final para que GSAP detecte los elementos ya renderizados
            initFadeUpAnimations();
        },
        onUnmount: () => {
            // Limpiamos ScrollTriggers para evitar errores de memoria al navegar
            cleanupScrollView();
        }
    },
    '/contacto': {
        templateId: 'view-contacts',
        templateUrl: `${BASE_URL}src/views/contacts.html`,
        onMount: (container) => {
            console.log('Vista de contacto cargada');
            // Si también tienes elementos data-fade en contacto, puedes llamarlo aquí:
            initFadeUpAnimations();
        }
    },
    404: {
        templateId: 'view-404',
        templateUrl: `${BASE_URL}src/views/404.html`
    },
};