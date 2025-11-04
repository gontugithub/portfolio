// src/router.js
// Pista: también podría ser una fábrica; la clase encapsula estado + configuración.
class SimpleRouter {
	constructor(routes) {
		this.routes = routes;
		this.currentView = null;

		// Escuchar cambios de hash
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes['404'];

		if (route !== this.currentView) {
			this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	renderView(route) {
		const app = document.getElementById('app');
		app.innerHTML = route.template;

		// Ejecutar cualquier JavaScript específico de la vista
		if (route.script) {
			route.script();
		}
	}

	updateActiveNav(currentHash) {
		// Solo considerar enlaces del router SPA que comienzan con "#/".
		// Esto evita tocar anclas en la página como "#app" (enlaces de salto, enlaces de sección).
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});

		// currentHash es como "/", "/about", ...
		// Construir el selector completo como `#${currentHash}` para coincidir con hrefs de nav (ej. href="#/about").
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) {
			activeLink.setAttribute('aria-current', 'page');
		}
	}
}

export default SimpleRouter;
