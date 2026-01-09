/*
 * ARCHIVO CENTRAL DE VISTAS Y ENRUTAMIENTO (views.js)
 * --------------------------------------------------
 * Este módulo actúa como el orquestador de la Single Page Application (SPA).
 * Su función principal es definir la estructura de la aplicación y gestionar
 * el ciclo de vida de cada vista mediante las siguientes acciones:
 * 1. MAPEO DE RUTAS: Asocia URLs específicas con sus plantillas HTML externas.
 * 2. CARGA DINÁMICA: Utiliza 'templateUrl' para inyectar el contenido bajo demanda,gestionando la compatibilidad con entornos locales y GitHub Pages (BASE_URL).
 * 3. HOOKS DE CICLO DE VIDA:
 *      - onMount: Se ejecuta cuando la vista entra al DOM. Aquí se utiliza un "Barrel Pattern"
 *          para importar e inicializar múltiples funciones de scroll, animaciones 3D (Hero),
 *          scroll horizontal de proyectos y efectos de aparición (Fade Up).
 *      - onUnmount: Garantiza la limpieza de recursos y ScrollTriggers para evitar 
 *           conflictos de memoria y errores visuales al navegar entre secciones.
 * 4. GESTIÓN DE ERRORES: Define una ruta 404 para manejar páginas no encontradas.
 */

import { 
    initScrollView, 
    cleanupScrollView, 
    initHeroAnimation, 
    initProjectsHorizontalScroll,
    initFadeUpAnimations 
} from './scroll.js';

// PARA QUE FUNCIONE EN LOCAL Y EN GITHUB PAGES
const BASE_URL = import.meta.env.BASE_URL;

export const routes = {
    '/': {
        templateId: 'view-landing-page',
        templateUrl: `${BASE_URL}src/views/landing-page.html`,
        onMount: (container) => {
            initScrollView(container);
            initHeroAnimation();
            initProjectsHorizontalScroll();
            initFadeUpAnimations();
        },
        onUnmount: () => {
            cleanupScrollView(); // LIMPIAMOS ANIMACIONES Y SCROLLS
        }
    },
    '/contacto': {
        templateId: 'view-contacts',
        templateUrl: `${BASE_URL}src/views/contacts.html`,
    },
    404: {
        templateId: 'view-404',
        templateUrl: `${BASE_URL}src/views/404.html`
    },
};