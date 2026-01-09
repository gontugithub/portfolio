/*
 * GESTIÓN DE TEMA (Dark/Light Mode)
 * --------------------------------
 * Controla la apariencia de la app con persistencia en localStorage 
 * y animaciones de transición mediante GSAP. Sincroniza las clases 
 * del body con los tokens de color de Tailwind v4.
 * 
 * MÉTODOS PRINCIPALES:
 * - initThemeToggle(): Inicializa el listener del botón y aplica el tema guardado.
 * - animateIcon(): Orquestador de micro-interacciones mediante la librería GSAP.
 */

import gsap from 'gsap';

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // MODO OSCURO POR DEFECTO
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme);
    
    // ACTUALIZACION DE ICONO DEPENDE DEL TEMA
    if (savedTheme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark');

        if (isDark) {
            body.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
            animateIcon(themeIcon, 'fa-sun');
        } else {
            body.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
            animateIcon(themeIcon, 'fa-moon');
        }
    });
}

// ANIMACION DEL ICONO DA VUELTAS
function animateIcon(icon, newClass) {
    gsap.to(icon, {
        rotate: 360,
        scale: 0,
        duration: 0.25,
        onComplete: () => {
            icon.className = `fa-solid ${newClass}`;
            gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.25
            });
        }
    });
}