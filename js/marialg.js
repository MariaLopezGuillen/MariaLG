document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    // Abrir / cerrar menú
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Cerrar menú al pulsar cualquier enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Cerrar menú al pulsar fuera de la nav
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav');
        if (!nav.contains(e.target)) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });

});