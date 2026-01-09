/**
 * MOTOR DE ANIMACIONES Y SCROLL (scroll.js)
 * ----------------------------------------
 * Orquestador de efectos visuales con soporte de accesibilidad.
 * Gestiona scroll, navegación fluida y micro-interacciones.
 * * ACCESIBILIDAD: Implementa 'prefers-reduced-motion' para desactivar 
 * animaciones intensas si el usuario lo tiene configurado en su sistema.
 * * MÉTODOS PRINCIPALES:
 * - initScrollView(): Configura el scroll suave y comportamiento del Navbar.
 * - initProjectsHorizontalScroll(): Efecto de "pinning" y desplazamiento lateral.
 * - initFadeUpAnimations(): Revelaciones sutiles al hacer scroll.
 * - initHeroAnimation(): Efecto parallax 3D interactivo.
 * - cleanupScrollView(): Limpieza de memoria (Kills ScrollTriggers).
 */

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// Definimos el media query para reutilizarlo
const PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

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
            const targetId = href.split('#').pop().replace(/^\//, "");
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                
                // Si el usuario prefiere movimiento reducido, el salto es instantáneo
                const shouldAnimate = !window.matchMedia(PREFERS_REDUCED_MOTION).matches;

                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 0 }, 
                    duration: shouldAnimate ? 1.2 : 0, // 0 segundos si reduce-motion está activo
                    ease: "power4.inOut",
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

    let mm = gsap.matchMedia();

    // SOLO si no hay preferencia de reducir movimiento
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        const getScrollAmount = () => strip.scrollWidth - window.innerWidth + (window.innerWidth * 0.1); 

        gsap.to(strip, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${getScrollAmount()}`, 
                invalidateOnRefresh: true, 
            }
        });
    });
}

export function initFadeUpAnimations() {
    const fadeElements = document.querySelectorAll('[data-fade]');
    let mm = gsap.matchMedia();

    // Desactivamos el movimiento vertical (y: 60) si prefiere reducir movimiento
    mm.add({
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        const { motion } = context.conditions;

        fadeElements.forEach((el) => {
            gsap.from(el, {
                y: motion ? 60 : 0, // Solo se desplaza si no hay restricción
                opacity: 0,          
                duration: 1,       
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", 
                    toggleActions: "play none none none", 
                }
            });
        });
    });
}

export function initHeroAnimation() {
    const hero = document.querySelector("#hero");
    const inner = document.querySelector("#hero-inner");
    if (!hero || !inner) return;

    let mm = gsap.matchMedia();

    // El efecto 3D interactivo se anula totalmente si hay Reduce Motion activo
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(hero, { perspective: 800 });

        const xRotation = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power2.out" });
        const yRotation = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power2.out" });
        const xMove = gsap.quickTo(inner, "x", { duration: 0.8, ease: "power2.out" });
        const yMove = gsap.quickTo(inner, "y", { duration: 0.8, ease: "power2.out" });

        const onMove = (e) => {
            const rect = hero.getBoundingClientRect();
            const xRel = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const yRel = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            yRotation(xRel * 25); 
            xRotation(yRel * -25);
            xMove(xRel * 60);      
            yMove(yRel * 60);
        };

        const onLeave = () => {
            xRotation(0); yRotation(0); xMove(0); yMove(0);
        };

        hero.addEventListener("mousemove", onMove);
        hero.addEventListener("mouseleave", onLeave);

        // Limpieza automática del listener si cambian las condiciones
        return () => {
            hero.removeEventListener("mousemove", onMove);
            hero.removeEventListener("mouseleave", onLeave);
        };
    });
}

export function cleanupScrollView() {
    ScrollTrigger.getAll().forEach(t => t.kill());
}