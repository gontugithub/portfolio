// src/main.js
import SimpleRouter from './router.js';
import { views } from './views/index.js';
import './style.css';

// Inicializar router
const router = new SimpleRouter(views);

// Opcional: Desplazamiento suave para anclas en la página (enlaces hash) SIN romper el ruteo SPA
// Nosotros:
// 1) Usamos delegación de eventos (un solo listener) para capturar clics en etiquetas anchor.
// 2) Solo manejamos hashes que apuntan a secciones en la página (ej. #app, #footer).
// 3) Ignoramos explícitamente enlaces del router que comienzan con "#/" para que el ruteo basado en hash continúe funcionando.
document.addEventListener('click', (e) => {
	const link = e.target.closest('a[href^="#"]');
	if (!link) return; // No es un enlace hash
	const href = link.getAttribute('href');

	// Ignorar enlaces del router SPA como "#/about" — dejar que el router maneje la navegación
	if (href.startsWith('#/')) return;

	// Desplazamiento suave al objetivo en la página (ej. #app)
	const target = document.querySelector(href);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
});
