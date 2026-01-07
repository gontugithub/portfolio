/* === LICENSE-HEADER START ===
This file is part of "portafolio-tailwind".
=== LICENSE-HEADER END === */

export class SimpleRouter {
    constructor(routes) {
        this.routes = routes; 
        this.currentView = null;
        
        // Manejadores de eventos
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    async handleRoute() {
        const fullHash = window.location.hash.slice(1) || '/';
        
        // Separamos la ruta de la sección (ej: "/#skills" -> path: "/", section: "skills")
        const [pathPart, sectionHash] = fullHash.split('#');
        const hash = pathPart || '/';
        
        // Lógica de fallback para 404 corregida
        let route = this.routes[hash];
        if (!route) {
            console.warn(`Ruta no encontrada: ${hash}. Cargando fallback 404.`);
            route = this.routes[404];
        }

        // Si la ruta cambia de página física
        if (route !== this.currentView) {
            if (this.currentView && typeof this.currentView.onUnmount === 'function') {
                this.currentView.onUnmount();
            }

            try {
                await this.renderView(route);
                this.updateActiveNav(hash);
                this.currentView = route;
                
                // Si hay un hash de sección, esperamos a que el DOM se asiente para scrollear
                if (sectionHash) {
                    this.scrollToSection(sectionHash);
                }
            } catch (error) {
                console.error("Error crítico en el renderizado:", error);
                document.getElementById('app').innerHTML = `<div class="p-10">Error cargando la vista.</div>`;
            }
        } else if (sectionHash) {
            // Misma ruta, solo scrolleamos a la sección
            this.scrollToSection(sectionHash);
        }
    }

    async renderView(route) {
        const app = document.getElementById('app');
        if (!app) return;

        // Limpiamos contenido previo
        app.textContent = '';

        // Aseguramos que el template esté en el DOM (vía caché o fetch)
        await ensureTemplateAvailable(route.templateId, route.templateUrl);

        const tpl = document.getElementById(route.templateId);
        if (!tpl) {
            app.innerHTML = `<div class="p-10 text-center">Error: No se encontró el template "${route.templateId}"</div>`;
            return;
        }

        // Clonamos e insertamos
        app.appendChild(tpl.content.cloneNode(true));
        
        // Ejecutamos el ciclo de vida onMount
        if (typeof route.onMount === 'function') {
            route.onMount(app);
        }
    }

    scrollToSection(sectionId) {
        setTimeout(() => {
            const section = document.querySelector(`#${sectionId}`);
            if (section) {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar?.offsetHeight || 80;
                window.scrollTo({
                    top: section.offsetTop - navHeight,
                    behavior: 'smooth',
                });
            }
        }, 150); // Un pequeño delay extra para asegurar renderizado de GSAP
    }

    updateActiveNav(currentHash) {
        document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
            link.removeAttribute('aria-current');
        });
        const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
        if (activeLink) activeLink.setAttribute('aria-current', 'page');
    }
}

const templateCache = new Set();

async function ensureTemplateAvailable(templateId, templateUrl) {
    // Si ya existe en el DOM, no hacemos nada
    if (document.getElementById(templateId)) return;
    
    // Si no hay URL y no está en el DOM, no podemos hacer nada
    if (!templateUrl) return;

    try {
        const res = await fetch(templateUrl, { credentials: 'same-origin' });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const fetchedTemplate = doc.querySelector('template');

        if (!fetchedTemplate || !fetchedTemplate.id) {
            // Si el HTML no tiene un <template id="...">, lo envolvemos nosotros
            const newTpl = document.createElement('template');
            newTpl.id = templateId;
            newTpl.innerHTML = html;
            document.body.appendChild(newTpl);
        } else {
            document.body.appendChild(fetchedTemplate);
        }
        
        templateCache.add(templateId);
    } catch (err) {
        console.error(`Error cargando template desde ${templateUrl}:`, err);
        throw err;
    }
}