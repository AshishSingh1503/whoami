document.body.classList.add("is-loading");

const siteLoader = document.getElementById("site-loader");
const loaderShownAt = Date.now();
const minimumLoaderDuration = 1500;
const sectionLinks = document.querySelectorAll('a[href^="#"]');
const observedSections = document.querySelectorAll("main section[id]");

sectionLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

AOS.init({
    duration: 900,
    once: true,
    offset: 90
});

if (observedSections.length) {
    const navLinks = document.querySelectorAll(".nav-links a");

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0.1
        }
    );

    observedSections.forEach((section) => observer.observe(section));
}

window.addEventListener("load", () => {
    if (!siteLoader) {
        document.body.classList.remove("is-loading");
        return;
    }

    const elapsed = Date.now() - loaderShownAt;
    const remainingDelay = Math.max(0, minimumLoaderDuration - elapsed);

    window.setTimeout(() => {
        siteLoader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");

        window.setTimeout(() => {
            siteLoader.remove();
        }, 500);
    }, remainingDelay);
});
