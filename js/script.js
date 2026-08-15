document.body.classList.add("is-loading");

const siteLoader = document.getElementById("site-loader");
const loaderShownAt = Date.now();
const minimumLoaderDuration = 1800;
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

AOS.init({ duration: 900, once: true, offset: 90 });

if (observedSections.length) {
    const navLinks = document.querySelectorAll(".nav-links a");
    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    };
    const observer = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveLink(e.target.id); }); },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
    );
    observedSections.forEach((s) => observer.observe(s));
}

window.addEventListener("load", () => {
    if (!siteLoader) { document.body.classList.remove("is-loading"); return; }
    const elapsed = Date.now() - loaderShownAt;
    const remainingDelay = Math.max(0, minimumLoaderDuration - elapsed);
    window.setTimeout(() => {
        siteLoader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
        window.setTimeout(() => siteLoader.remove(), 500);
        initHeroTyping();
    }, remainingDelay);
});

/* ── Hero terminal typing animation ── */
function initHeroTyping() {
    const lines = document.querySelectorAll(".terminal-window .terminal-line");
    let delay = 0;
    lines.forEach((line) => {
        const strong = line.querySelector("strong");
        if (!strong) return;
        const fullText = strong.textContent;
        strong.textContent = "";
        const cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        strong.after(cursor);
        setTimeout(() => {
            let i = 0;
            const tick = setInterval(() => {
                strong.textContent += fullText[i++];
                if (i >= fullText.length) {
                    clearInterval(tick);
                    cursor.remove();
                }
            }, 38);
        }, delay);
        delay += fullText.length * 38 + 320;
    });
}

/* ── CLI Terminal Widget ── */
const CLI_COMMANDS = {
    help: () => [
        { t: "head", v: "Available commands:" },
        { t: "ok",   v: "  whoami      — about me" },
        { t: "ok",   v: "  skills      — tech stack" },
        { t: "ok",   v: "  projects    — featured work" },
        { t: "ok",   v: "  journey     — career timeline" },
        { t: "ok",   v: "  contact     — get in touch" },
        { t: "ok",   v: "  github      — open GitHub profile" },
        { t: "ok",   v: "  linkedin    — open LinkedIn profile" },
        { t: "ok",   v: "  resume      — download resume" },
        { t: "ok",   v: "  clear       — clear terminal" },
    ],
    whoami: () => [
        { t: "head", v: "Ashish Singh — DevOps Engineer" },
        { t: "info", v: "Focus   : AWS · Terraform · Kubernetes · CI/CD" },
        { t: "info", v: "Approach: automate, secure, observe, scale" },
        { t: "info", v: "Status  : Open to opportunities" },
    ],
    skills: () => [
        { t: "head", v: "Cloud" },
        { t: "info", v: "  AWS · GCP · EC2 · S3 · VPC · CloudFront · ALB · Cloud Run" },
        { t: "head", v: "Platform & Delivery" },
        { t: "info", v: "  Docker · Kubernetes · ECS Fargate · Terraform · Jenkins · GitHub Actions" },
        { t: "head", v: "Observability & Scripting" },
        { t: "info", v: "  Prometheus · Grafana · ELK · CloudWatch · Python · Bash" },
    ],
    projects: () => {
        document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
        return [
            { t: "ok",   v: "Scrolling to Projects section..." },
            { t: "info", v: "01 CreatorPulse — Multi-platform creator analytics" },
            { t: "info", v: "02 FreightBot — AI-powered freight operations" },
            { t: "info", v: "03 OpenAMI Guard — AWS AMI operations" },
            { t: "info", v: "04 GenomeGuard   — AI genetic prediction platform" },
            { t: "info", v: "05 PDF to CSV    — GCP document processing" },
            { t: "info", v: "06 AWS Multi-Tier Infra — Terraform IaC" },
            { t: "info", v: "07 This Portfolio — HTML/CSS/JS" },
        ];
    },
    journey: () => {
        document.querySelector("#timeline").scrollIntoView({ behavior: "smooth" });
        return [
            { t: "ok",   v: "Scrolling to Journey section..." },
            { t: "info", v: "2024 — Foundations: Linux, Git, cloud basics" },
            { t: "info", v: "2025 — Infrastructure: AWS, Terraform, networking" },
            { t: "info", v: "2026 — Platform Thinking: containers, CI/CD, observability" },
            { t: "info", v: "Next — Impact: DevOps & platform engineering roles" },
        ];
    },
    contact: () => {
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        return [
            { t: "ok",   v: "Scrolling to Contact section..." },
            { t: "link", v: "Email    : singhashish150305@gmail.com", href: "mailto:singhashish150305@gmail.com" },
            { t: "link", v: "LinkedIn : linkedin.com/in/ashish-singh-70b7082a0", href: "https://www.linkedin.com/in/ashish-singh-70b7082a0/" },
            { t: "link", v: "GitHub   : github.com/AshishSingh1503", href: "https://github.com/AshishSingh1503" },
        ];
    },
    github: () => {
        window.open("https://github.com/AshishSingh1503", "_blank");
        return [{ t: "ok", v: "Opening GitHub profile..." }];
    },
    linkedin: () => {
        window.open("https://www.linkedin.com/in/ashish-singh-70b7082a0/", "_blank");
        return [{ t: "ok", v: "Opening LinkedIn profile..." }];
    },
    resume: () => {
        const a = document.createElement("a");
        a.href = "Ashish_Singh_CV.pdf";
        a.download = "";
        a.click();
        return [{ t: "ok", v: "Downloading resume..." }];
    },
    clear: () => "CLEAR",
};

const cliTerminal = document.getElementById("cli-terminal");
const cliFab      = document.getElementById("cli-fab");
const cliClose    = document.getElementById("cli-close");
const cliOutput   = document.getElementById("cli-output");
const cliInput    = document.getElementById("cli-input");

function cliOpen() {
    cliTerminal.classList.add("cli-open");
    cliTerminal.setAttribute("aria-hidden", "false");
    document.body.classList.add("cli-locked");
    cliInput.focus();
    if (!cliOutput.children.length) {
        printLines([
            { t: "head", v: "Welcome to Ashish's portfolio terminal." },
            { t: "info", v: 'Type "help" to see available commands.' },
        ]);
    }
}

function cliCloseTerminal() {
    cliTerminal.classList.remove("cli-open");
    cliTerminal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cli-locked");
}

cliFab.addEventListener("click", () => {
    cliTerminal.classList.contains("cli-open") ? cliCloseTerminal() : cliOpen();
});
cliClose.addEventListener("click", cliCloseTerminal);

document.addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        cliTerminal.classList.contains("cli-open") ? cliCloseTerminal() : cliOpen();
    }
    if (e.key === "Escape") cliCloseTerminal();
});

function printLines(lines) {
    lines.forEach(({ t, v, href }) => {
        const div = document.createElement("div");
        div.className = `cli-line ${t}`;
        if (t === "link" && href) {
            div.innerHTML = `<a href="${href}" target="_blank" rel="noopener">${v}</a>`;
        } else {
            div.textContent = v;
        }
        cliOutput.appendChild(div);
    });
    cliOutput.scrollTop = cliOutput.scrollHeight;
}

const cliHistory = [];
let cliHistoryIndex = -1;
let cliDraft = "";

cliInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!cliHistory.length) return;
        if (cliHistoryIndex === -1) cliDraft = cliInput.value;
        cliHistoryIndex = Math.min(cliHistoryIndex + 1, cliHistory.length - 1);
        cliInput.value = cliHistory[cliHistory.length - 1 - cliHistoryIndex];
        cliInput.setSelectionRange(cliInput.value.length, cliInput.value.length);
        return;
    }
    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (cliHistoryIndex === -1) return;
        cliHistoryIndex -= 1;
        cliInput.value = cliHistoryIndex === -1 ? cliDraft : cliHistory[cliHistory.length - 1 - cliHistoryIndex];
        cliInput.setSelectionRange(cliInput.value.length, cliInput.value.length);
        return;
    }
    if (e.key !== "Enter") return;
    const raw = cliInput.value.trim().toLowerCase();
    cliInput.value = "";
    if (!raw) return;

    cliHistory.push(raw);
    cliHistoryIndex = -1;
    cliDraft = "";

    printLines([{ t: "cmd", v: `❯ ${raw}` }]);

    const handler = CLI_COMMANDS[raw];
    if (!handler) {
        printLines([{ t: "err", v: `command not found: ${raw}. Type "help" for options.` }]);
        return;
    }
    const result = handler();
    if (result === "CLEAR") {
        cliOutput.innerHTML = "";
    } else {
        printLines(result);
    }
});
