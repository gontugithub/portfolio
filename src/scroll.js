import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export function initScrollView(container = document) {
    window.scrollTo(0, 0);

    const navbar = document.getElementById('navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -20',
            onUpdate: (self) => {
                if (self.scroll() > 20) {
                    navbar.classList.add('py-2', 'w-[90%]', 'top-2', 'bg-card/40', 'shadow-xl');
                } else {
                    navbar.classList.remove('py-2', 'w-[90%]', 'top-2', 'bg-card/40', 'shadow-xl');
                }
            }
        });
    }

    container.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            
            // 1. Limpiamos el ID: Maneja tanto "#projects" como "#/#projects"
            const targetId = href.split('#').pop().replace(/^\//, "");
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();

                // 2. Calculamos la posición real. 
                // ScrollTrigger a veces añade padding, por eso usamos label o un cálculo limpio.
                const targetPos = ScrollTrigger.maxScroll(window) * (target.offsetTop / document.body.scrollHeight);

                gsap.to(window, {
                    // Si el target es Journey o Contacto (después de proyectos),
                    // usamos target directamente y ScrollTrigger hará el cálculo del padding
                    scrollTo: { y: target, offsetY: 0 }, 
                    duration: 1.2,
                    ease: "power4.inOut",
                    onStart: () => {
                        // Opcional: podrías ocultar la tira de proyectos aquí si fuera necesario
                    }
                });

                history.pushState(null, '', `#${targetId}`);
            }
        });
    });
}

export function initProjectsHorizontalScroll() {
    const strip = document.querySelector("#projects-strip");
    const section = document.querySelector("#projects");

    if (!strip || !section) return;

    const getScrollAmount = () => {
        return strip.scrollWidth - window.innerWidth + (window.innerWidth * 0.1); 
    };

    gsap.to(strip, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            // IMPORTANTE: end debe ser proporcional al movimiento para no crear un hueco infinito
            end: () => `+=${getScrollAmount()}`, 
            invalidateOnRefresh: true, 
        }
    });
}

// Añade esta función a tu scroll.js
export function initFadeUpAnimations() {
    // Buscamos todos los elementos que tengan el atributo data-fade
    const fadeElements = document.querySelectorAll('[data-fade]');

    fadeElements.forEach((el) => {
        gsap.from(el, {
            y: 60,               // Empieza 60px abajo
            opacity: 0,          // Empieza invisible
            duration: 1,         // Tarda 1 segundo
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Empieza la animación cuando el elemento entra al 85% de la pantalla
                toggleActions: "play none none none", // Solo se ejecuta una vez
            }
        });
    });
}

// --- HERO ANIMATION (Solo nombre y descripción) ---
export function initHeroAnimation() {
    const hero = document.querySelector("#hero");
    const inner = document.querySelector("#hero-inner");

    if (!hero || !inner) return;

    gsap.set(hero, { perspective: 800 });

    const xRotation = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power2.out" });
    const yRotation = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power2.out" });
    const xMove = gsap.quickTo(inner, "x", { duration: 0.8, ease: "power2.out" });
    const yMove = gsap.quickTo(inner, "y", { duration: 0.8, ease: "power2.out" });

    hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const xRel = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const yRel = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        yRotation(xRel * 25);  // Movimiento intenso
        xRotation(yRel * -25);
        xMove(xRel * 60);      
        yMove(yRel * 60);
    });

    hero.addEventListener("mouseleave", () => {
        xRotation(0); yRotation(0); xMove(0); yMove(0);
    });
}

export function cleanupScrollView() {
    ScrollTrigger.getAll().forEach(t => t.kill());
}