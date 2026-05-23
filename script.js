const menu = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* Scroll Animation */

const cards = document.querySelectorAll(".card, .project-card");

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

});

/* Initial Hidden */

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.8s";
});


/* =========================
   CUSTOM CURSOR
========================= */

const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

});

/* Smooth Trail */

function animateCursor() {

    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = outlineX + "px";
    outline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

/* Expand On Hover */

const hoverItems = document.querySelectorAll(
    "a, button, .btn, .card, .project-card, .skill-box"
);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        dot.classList.add("expand");
        outline.classList.add("expand");

    });

    item.addEventListener("mouseleave", () => {

        dot.classList.remove("expand");
        outline.classList.remove("expand");

    });

});

/* =========================
   AUTO CLOSE MOBILE NAV
========================= */

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

let currentTheme = 0;

/*
0 = Dark
1 = Light
2 = Space
*/

themeToggle.addEventListener("click", () => {

    document.body.classList.remove(
        "light-mode",
        "space-mode"
    );

    currentTheme++;

    if (currentTheme > 2) {
        currentTheme = 0;
    }

    if (currentTheme === 1) {

        document.body.classList.add("light-mode");

        themeToggle.innerHTML =
            `<i class="ri-sun-line"></i>`;

    }

    else if (currentTheme === 2) {

        document.body.classList.add("space-mode");

        themeToggle.innerHTML =
            `<i class="ri-planet-line"></i>`;

    }

    else {

        themeToggle.innerHTML =
            `<i class="ri-moon-clear-line"></i>`;

    }

});

/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

const magneticItems = document.querySelectorAll(
    ".btn, .socials a"
);

magneticItems.forEach(item => {

    item.addEventListener("mousemove", (e) => {

        const rect = item.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        item.style.transform =
            `translate(${x * 0.2}px, ${y * 0.2}px)`;

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform =
            "translate(0px,0px)";

    });

});

/* =========================
   LOADER
========================= */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 2000);

});


/* =========================
   CURSOR PARTICLE EFFECT
========================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Resize */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

/* Particles */

let particles = [];

class Particle {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.size = Math.random() * 4 + 1;

        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;

        this.opacity = 1;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        this.opacity -= 0.02;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(56,189,248,${this.opacity})`;

        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 15;

        ctx.fill();

    }

}

/* Mouse Move */

window.addEventListener("mousemove", (e) => {

    for (let i = 0; i < 4; i++) {

        particles.push(
            new Particle(
                e.clientX,
                e.clientY
            )
        );

    }

});

/* Animate */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let i = 0; i < particles.length; i++) {

        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0) {

            particles.splice(i, 1);
            i--;

        }

    }

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================
   SCROLL REVEAL
========================= */

const elements = document.querySelectorAll(
    `
.card,
.project-card,
.skill-box,
.contact-card,
.about-image,
.about-content,
.title
`
);

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

            else {

                entry.target.classList.remove("show");

            }

        });

    }, {
        threshold: 0.15
    });

elements.forEach((el) => {

    observer.observe(el);

});