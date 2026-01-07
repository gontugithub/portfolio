import gsap from 'gsap';

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // 1. Al cargar, aplicamos el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Dark por defecto
    body.classList.add(savedTheme);
    
    // Actualizar icono inicial
    if (savedTheme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // 2. Lógica del click
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark');

        if (isDark) {
            // Pasar a LIGHT
            body.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
            animateIcon(themeIcon, 'fa-sun');
        } else {
            // Pasar a DARK
            body.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
            animateIcon(themeIcon, 'fa-moon');
        }
    });
}

// Función pequeña para que el icono gire y cambie suavemente
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