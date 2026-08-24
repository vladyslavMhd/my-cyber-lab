```javascript
// ========================================
// MY CYBER LAB
// Interactive JavaScript
// ========================================


// MOBILE MENU

const menu = document.getElementById("menu");
const nav = document.querySelector(".nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
});


document
    .querySelectorAll("#navLinks a")
    .forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });

    });


// ========================================
// TERMINAL TYPING
// ========================================

const commands = [
    "neofetch",
    "whoami",
    "cat about.txt",
    "echo 'keep learning'",
    "./start-lab.sh"
];

const typed = document.getElementById("typed");
const output = document.getElementById("terminalOut");

let commandIndex = 0;
let position = 0;
let deleting = false;


function typeCommand() {

    const command =
        commands[commandIndex];


    if (!deleting) {

        typed.textContent =
            command.slice(0, position);

        position++;


        if (position > command.length) {

            deleting = true;

            showOutput(command);

            setTimeout(
                typeCommand,
                1200
            );

        } else {

            setTimeout(
                typeCommand,
                65
            );

        }

    } else {

        position--;

        typed.textContent =
            command.slice(0, position);


        if (position === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1)
                % commands.length;

            setTimeout(
                typeCommand,
                250
            );

        } else {

            setTimeout(
                typeCommand,
                28
            );

        }

    }

}


function showOutput(command) {

    const outputs = {

        "neofetch": `
            <p class="g">
                OS: Kali GNU/Linux Rolling
            </p>

            <p>
                Shell: bash
            </p>

            <p>
                Focus: cybersecurity
            </p>
        `,

        "whoami": `
            <p class="g">
                vlad // cybersecurity enthusiast
            </p>

            <p class="muted">
                16 years old • learning every day
            </p>
        `,

        "cat about.txt": `
            <p class="g">
                [+] Welcome to My Cyber Lab.
            </p>

            <p class="muted">
                Build. Break. Learn.
            </p>
        `,

        "echo 'keep learning'": `
            <p class="cyan">
                keep learning 🚀
            </p>
        `,

        "./start-lab.sh": `
            <p class="g">
                [ OK ] Starting authorized learning environment...
            </p>

            <p class="cyan">
                Ready.
            </p>
        `

    };


    output.innerHTML =
        outputs[command] || "";
}


typeCommand();


// ========================================
// PARTICLES
// ========================================

const particleContainer =
    document.getElementById("particles");


for (let i = 0; i < 45; i++) {

    const particle =
        document.createElement("i");

    particle.className =
        "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.top =
        (80 + Math.random() * 40) + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 16) + "s";

    particle.style.animationDelay =
        Math.random() * 12 + "s";

    particleContainer.appendChild(
        particle
    );

}


// ========================================
// SCROLL REVEAL
// ========================================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });


// ========================================
// LAB CARD MOUSE EFFECT
// ========================================

document
    .querySelectorAll(".lab-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                card.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(0,255,136,.09),
                        #08100e 45%
                    )
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log(
    "%c MY CYBER LAB // VLAD ",
    `
        background:#00ff88;
        color:#00140b;
        padding:8px;
        font-weight:bold;
        font-size:16px;
    `
);

console.log(
    "%c Authorized learning only.",
    "color:#00ff88;"
);
```
