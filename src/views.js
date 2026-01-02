// Base URL para que funcione en local y en GitHub Pages
const BASE_URL = import.meta.env.BASE_URL;

export const routes = {
    '/': {
        templateId: 'view-landing-page',
        templateUrl: `${BASE_URL}src/views/landing-page.html`,
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