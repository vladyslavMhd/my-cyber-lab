```javascript
// ==========================================
// MY CYBER LAB
// Interactive JavaScript
// ==========================================


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});


// CLOSE MOBILE MENU AFTER CLICKING A LINK
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


// ==========================================
// TERMINAL TYPING EFFECT
// ==========================================

const commands = [
    "neofetch",
    "sudo nmap -sV localhost",
    "cat /etc/os-release",
    "whoami",
    "echo 'Welcome to My Cyber Lab'"
];

const commandElement = document.getElementById("typedCommand");
const outputElement = document.getElementById("terminalOutput");

let commandIndex = 0;
let charIndex = 0;
let deleting = false;

function typeCommand() {

    const command = commands[commandIndex];

    if (!deleting) {

        commandElement.textContent =
            command.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === command.length) {

            deleting = true;

            setTimeout(() => {

                showOutput(command);

            }, 700);

        } else {

            setTimeout(typeCommand, 70);

        }

    } else {

        commandElement.textContent =
            command.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            commandIndex++;

            if (commandIndex >= commands.length) {
                commandIndex = 0;
            }

            setTimeout(typeCommand, 300);

        } else {

            setTimeout(typeCommand, 35);

        }
    }
}


function showOutput(command) {

    let output = "";

    if (command === "neofetch") {

        output = `
            <p class="green">OS: Kali GNU/Linux</p>
            <p>Kernel: Linux</p>
            <p>Shell: bash</p>
            <p class="blue">Status: ONLINE</p>
        `;

    } else if (command.includes("nmap")) {

        output = `
            <p class="green">Starting Nmap...</p>
            <p>Host is up.</p>
            <p>PORT&nbsp;&nbsp;&nbsp;&nbsp;STATE&nbsp;&nbsp;SERVICE</p>
            <p>22/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;ssh</p>
            <p>80/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;http</p>
        `;

    } else if (command.includes("os-release")) {

        output = `
            <p class="green">PRETTY_NAME="Kali GNU/Linux Rolling"</p>
        `;

    } else if (command === "whoami") {

        output = `
            <p class="green">cybersecurity_student</p>
        `;

    } else {

        output = `
            <p class="green">Welcome to My Cyber Lab 🚀</p>
        `;
    }

    outputElement.innerHTML = output;
}


typeCommand();


// ==========================================
// PARTICLE BACKGROUND
// ==========================================

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 45; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 15) + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particleContainer.appendChild(particle);
}


// ==========================================
// CARD MOUSE GLOW
// ==========================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0,255,136,.08),
                #0b1113 55%
            )
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "#0b1113";
    });

});


// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log(
    "%c MY CYBER LAB ",
    "background:#00ff88;color:#001b0d;font-size:20px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Welcome, hacker 👾 ",
    "color:#00ff88;font-size:14px;"
);

console.log(
    "%c Everything here is for legal learning and authorized labs.",
    "color:#71847c;"
);
```
