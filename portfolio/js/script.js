document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typed.js animation
if (document.querySelector('.typed')) {
    new Typed('.typed', {
        strings: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD Pipelines', 'Infrastructure as Code'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
}
