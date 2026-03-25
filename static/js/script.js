// ========================
// TYPING ANIMATION
// ========================
const text = ["Data Scientist", "Web Developer", "Problem Solver"];
let i = 0, j = 0;

function type() {
    const el = document.querySelector(".typing");
    if (!el) return;

    if (j < text[i].length) {
        el.innerHTML += text[i][j];
        j++;
        setTimeout(type, 80);
    } else {
        setTimeout(() => {
            el.innerHTML = "";
            j = 0;
            i = (i + 1) % text.length;
            type();
        }, 1200);
    }
}

type();

// ========================
// SCROLL REVEAL
// ========================
const revealSections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => observer.observe(section));

// ========================
// ACTIVE NAV LINK ON SCROLL
// ========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === "#" + current) {
            link.style.color = "#00eaff";
        }
    });
});

// ========================
// INTERACTIVE BACKGROUND (PARTICLES)
// ========================
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 80; // Adjust for density

// Resize canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const mouse = {
    x: null,
    y: null,
    radius: 150 // Connection radius to mouse
};

// Track mouse
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Remove mouse pos when leaving window
window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 234, 255, 0.4)";
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Connect close particles with each other
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 234, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }

        // Connect particles to mouse
        if (mouse.x && mouse.y) {
            let dx = particles[a].x - mouse.x;
            let dy = particles[a].y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 0, 170, ${1 - distance / mouse.radius})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

function getReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hello 👋";
    if (msg.includes("project")) return "Check my projects section!";
    if (msg.includes("skills")) return "I know Java, Python, Web Dev.";
    if (msg.includes("contact")) return "Go to contact section!";

    return "I'm your AI assistant 🤖";
}


initParticles();
animateParticles();

