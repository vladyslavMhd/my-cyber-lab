/* =========================================================
   MY CYBER LAB v3.0
   SCRIPT.JS
   ========================================================= */

"use strict";


/* =========================================================
   GLOBAL STATE
   ========================================================= */

const state = {
    labs: JSON.parse(
        localStorage.getItem("cyberLabLabs") || "{}"
    ),

    achievements: JSON.parse(
        localStorage.getItem("cyberLabAchievements") || "{}"
    ),

    commands: 0,

    currentLab: null
};


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

function saveState() {
    localStorage.setItem(
        "cyberLabLabs",
        JSON.stringify(state.labs)
    );

    localStorage.setItem(
        "cyberLabAchievements",
        JSON.stringify(state.achievements)
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   LOADER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = $(".loader");
    const loaderBar = $(".loader-bar span");
    const loaderStatus = $(".loader-status");

    if (!loader) return;

    const messages = [
        "INITIALIZING CYBER LAB...",
        "LOADING SECURITY MODULES...",
        "CHECKING LAB ENVIRONMENT...",
        "STARTING TERMINAL...",
        "LOADING PROJECTS...",
        "SYSTEM READY."
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {

        progress += Math.floor(Math.random() * 12) + 5;

        if (progress > 100)
            progress = 100;

        if (loaderBar)
            loaderBar.style.width = `${progress}%`;

        if (
            loaderStatus &&
            messageIndex < messages.length
        ) {
            loaderStatus.textContent =
                messages[messageIndex];

            if (progress >=
                ((messageIndex + 1) / messages.length) * 100
            ) {
                messageIndex++;
            }
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500);
        }

    }, 180);
});


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    const container = $("#particles");

    if (!container) return;

    const amount =
        window.innerWidth < 600 ? 35 : 70;

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * -20}s`;

        particle.style.opacity =
            `${0.15 + Math.random() * 0.45}`;

        container.appendChild(particle);
    }
}

createParticles();


/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenu = $(".mobile-menu");
const navLinks = $(".nav-links");

if (mobileMenu && navLinks) {

    mobileMenu.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        mobileMenu.textContent =
            navLinks.classList.contains("open")
                ? "×"
                : "☰";
    });

    $$(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            mobileMenu.textContent = "☰";
        });

    });
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

$$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetID =
            link.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) return;

        const target =
            $(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );

$$(".reveal").forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   NUMBER COUNTERS
   ========================================================= */

function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    if (Number.isNaN(target)) return;

    let current = 0;

    const duration = 1200;

    const start = performance.now();

    function update(now) {

        const progress =
            Math.min(
                (now - start) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 3);

        current =
            Math.floor(target * eased);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !entry.target.dataset.counted
                ) {

                    entry.target.dataset.counted =
                        "true";

                    animateCounter(
                        entry.target
                    );

                    counterObserver.unobserve(
                        entry.target
                    );
                }
            });

        },
        {
            threshold: 0.5
        }
    );

$$("[data-target]").forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   LAB DATA
   ========================================================= */

const LAB_DATA = {

    "linux-basics": {

        title: "Linux Fundamentals",

        description:
            "Learn the Linux command line, filesystem navigation, permissions and basic system administration.",

        difficulty: "BEGINNER",

        tasks: [
            {
                title: "Navigate the filesystem",
                description:
                    "Practice pwd, ls, cd and find."
            },
            {
                title: "Manage files",
                description:
                    "Create, copy, move and delete files."
            },
            {
                title: "Understand permissions",
                description:
                    "Use chmod, chown and ls -la."
            },
            {
                title: "Work with processes",
                description:
                    "Inspect processes using ps and top."
            }
        ]
    },


    "networking": {

        title: "Network Fundamentals",

        description:
            "Understand IP addresses, ports, protocols and basic network diagnostics.",

        difficulty: "BEGINNER",

        tasks: [
            {
                title: "Understand IP addresses",
                description:
                    "Learn IPv4, subnet masks and gateways."
            },
            {
                title: "Inspect network interfaces",
                description:
                    "Use ip addr and ip link."
            },
            {
                title: "Test connectivity",
                description:
                    "Practice ping and traceroute."
            },
            {
                title: "Understand ports",
                description:
                    "Learn TCP, UDP and common service ports."
            }
        ]
    },


    "web-security": {

        title: "Web Security",

        description:
            "Explore common web vulnerabilities in a controlled local lab environment.",

        difficulty: "INTERMEDIATE",

        tasks: [
            {
                title: "Understand HTTP",
                description:
                    "Inspect requests, responses, headers and cookies."
            },
            {
                title: "Study authentication",
                description:
                    "Learn how login systems work."
            },
            {
                title: "Identify input validation issues",
                description:
                    "Understand why applications must validate user input."
            },
            {
                title: "Study OWASP concepts",
                description:
                    "Explore common web security risks."
            }
        ]
    },


    "python-security": {

        title: "Python for Cybersecurity",

        description:
            "Build small defensive security utilities and learn automation with Python.",

        difficulty: "INTERMEDIATE",

        tasks: [
            {
                title: "Read files",
                description:
                    "Practice Python file handling."
            },
            {
                title: "Work with sockets",
                description:
                    "Understand basic networking APIs."
            },
            {
                title: "Parse logs",
                description:
                    "Create a simple log analysis script."
            },
            {
                title: "Automate repetitive tasks",
                description:
                    "Use Python to automate safe lab tasks."
            }
        ]
    },


    "wireshark": {

        title: "Packet Analysis",

        description:
            "Learn how network packets work and how analysts investigate traffic.",

        difficulty: "INTERMEDIATE",

        tasks: [
            {
                title: "Capture traffic",
                description:
                    "Capture packets inside your own lab."
            },
            {
                title: "Filter packets",
                description:
                    "Use display filters to find useful traffic."
            },
            {
                title: "Understand TCP",
                description:
                    "Inspect TCP handshakes and connections."
            },
            {
                title: "Analyze DNS",
                description:
                    "Identify DNS queries and responses."
            }
        ]
    },


    "blue-team": {

        title: "Blue Team Basics",

        description:
            "Learn defensive security concepts including monitoring, logs and incident response.",

        difficulty: "ADVANCED",

        tasks: [
            {
                title: "Analyze system logs",
                description:
                    "Identify useful security events."
            },
            {
                title: "Detect suspicious activity",
                description:
                    "Learn basic indicators of compromise."
            },
            {
                title: "Create monitoring rules",
                description:
                    "Understand how alerts are generated."
            },
            {
                title: "Incident response",
                description:
                    "Learn the basic incident response lifecycle."
            }
        ]
    }
};


/* =========================================================
   LAB MODAL
   ========================================================= */

const modal =
    $(".lab-modal");

const modalTitle =
    $("#modalTitle");

const modalDescription =
    $("#modalDescription");

const modalTasks =
    $(".lab-tasks");

const modalProgress =
    $(".modal-progress strong");

const modalProgressBar =
    $(".modal-progress .large-progress span");

const modalFinish =
    $(".modal-finish");

const modalClose =
    $(".modal-close");


function getLabProgress(id) {

    const lab =
        state.labs[id];

    if (!lab)
        return 0;

    return lab.completed || 0;
}


function updateLabProgress(id) {

    const data =
        LAB_DATA[id];

    const completed =
        getLabProgress(id);

    const total =
        data.tasks.length;

    const percent =
        Math.round(
            (completed / total) * 100
        );

    if (modalProgress)
        modalProgress.textContent =
            `${percent}%`;

    if (modalProgressBar)
        modalProgressBar.style.width =
            `${percent}%`;

    return {
        completed,
        total,
        percent
    };
}


function openLab(id) {

    const data =
        LAB_DATA[id];

    if (!data) return;

    state.currentLab = id;

    if (modalTitle)
        modalTitle.textContent =
            data.title;

    if (modalDescription)
        modalDescription.textContent =
            data.description;

    if (!modalTasks) return;

    modalTasks.innerHTML = "";

    const saved =
        state.labs[id]?.tasks || [];

    data.tasks.forEach((task, index) => {

        const label =
            document.createElement("label");

        label.className =
            "lab-task";

        if (saved[index])
            label.classList.add("done");

        label.innerHTML = `
            <input
                type="checkbox"
                ${saved[index] ? "checked" : ""}
            >

            <span class="task-check">
                ✓
            </span>

            <span class="task-content">
                <strong>
                    ${task.title}
                </strong>

                <span>
                    ${task.description}
                </span>
            </span>
        `;

        const checkbox =
            $("input", label);

        checkbox.addEventListener(
            "change",
            () => {

                if (!state.labs[id]) {

                    state.labs[id] = {
                        tasks: [],
                        completed: 0
                    };
                }

                state.labs[id].tasks[index] =
                    checkbox.checked;

                state.labs[id].completed =
                    state.labs[id].tasks
                        .filter(Boolean)
                        .length;

                label.classList.toggle(
                    "done",
                    checkbox.checked
                );

                saveState();

                updateLabProgress(id);

                updateLabCards();

                checkAchievements();
            }
        );

        modalTasks.appendChild(label);
    });

    updateLabProgress(id);

    if (modal)
        modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );
}


function closeLab() {

    if (modal)
        modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

    state.currentLab = null;
}


if (modalClose)
    modalClose.addEventListener(
        "click",
        closeLab
    );


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal)
                closeLab();
        }
    );
}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal?.classList.contains("active")
        ) {
            closeLab();
        }

    }
);


/* =========================================================
   LAB BUTTONS
   ========================================================= */

$$("[data-lab]").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const id =
                button.dataset.lab;

            openLab(id);
        }
    );
});


/* =========================================================
   UPDATE LAB CARDS
   ========================================================= */

function updateLabCards() {

    $$("[data-lab]").forEach(button => {

        const id =
            button.dataset.lab;

        const data =
            LAB_DATA[id];

        if (!data) return;

        const progress =
            getLabProgress(id);

        const percent =
            Math.round(
                (progress /
                    data.tasks.length) *
                100
            );

        const card =
            button.closest(".lab-card");

        if (!card) return;

        const bar =
            $(".lab-progress span", card);

        if (bar)
            bar.style.width =
                `${percent}%`;

        const status =
            $(".lab-status", card);

        if (status) {

            if (percent >= 100) {

                status.textContent =
                    "COMPLETED";

                card.classList.add(
                    "completed"
                );

            } else if (percent > 0) {

                status.textContent =
                    "IN PROGRESS";

            } else {

                status.textContent =
                    "LOCKED";
            }
        }

    });

    updateOverallProgress();
}


function updateOverallProgress() {

    let total = 0;
    let completed = 0;

    Object.entries(LAB_DATA)
        .forEach(([id, data]) => {

            total += data.tasks.length;

            completed +=
                getLabProgress(id);
        });

    const percent =
        total
            ? Math.round(
                (completed / total) * 100
            )
            : 0;

    const overall =
        $(".overall-progress");

    if (!overall) return;

    const label =
        $("strong", overall);

    const bar =
        $(".large-progress span", overall);

    if (label)
        label.textContent =
            `${percent}%`;

    if (bar)
        bar.style.width =
            `${percent}%`;
}


updateLabCards();


/* =========================================================
   FINISH LAB
   ========================================================= */

if (modalFinish) {

    modalFinish.addEventListener(
        "click",
        () => {

            if (!state.currentLab)
                return;

            const id =
                state.currentLab;

            const data =
                LAB_DATA[id];

            if (
                getLabProgress(id) <
                data.tasks.length
            ) {

                showToast(
                    "Complete all tasks first",
                    "Finish every task in this lab."
                );

                return;
            }

            state.achievements[id] = true;

            saveState();

            showToast(
                "LAB COMPLETED",
                `${data.title} finished successfully.`
            );

            updateLabCards();

            checkAchievements();

            setTimeout(
                closeLab,
                600
            );
        }
    );
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;

function showToast(
    title,
    message
) {

    const toast =
        $(".toast");

    if (!toast) return;

    const titleElement =
        $("strong", toast);

    const messageElement =
        $("small", toast);

    if (titleElement)
        titleElement.textContent =
            title;

    if (messageElement)
        messageElement.textContent =
            message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function checkAchievements() {

    const completedLabs =
        Object.values(
            state.labs
        )
        .filter(
            lab =>
                lab.completed > 0
        )
        .length;

    const finishedLabs =
        Object.keys(
            LAB_DATA
        )
        .filter(
            id =>
                getLabProgress(id) ===
                LAB_DATA[id].tasks.length
        )
        .length;


    unlockAchievement(
        "first-lab",
        completedLabs >= 1
    );

    unlockAchievement(
        "three-labs",
        finishedLabs >= 3
    );

    unlockAchievement(
        "all-labs",
        finishedLabs >=
        Object.keys(LAB_DATA).length
    );

    unlockAchievement(
        "terminal-user",
        state.commands >= 5
    );

    updateAchievementUI();
}


function unlockAchievement(
    id,
    condition
) {

    if (
        condition &&
        !state.achievements[id]
    ) {

        state.achievements[id] =
            true;

        saveState();

        showToast(
            "ACHIEVEMENT UNLOCKED",
            id.replaceAll("-", " ")
        );
    }
}


function updateAchievementUI() {

    $$("[data-achievement]")
        .forEach(card => {

            const id =
                card.dataset.achievement;

            if (
                state.achievements[id]
            ) {

                card.classList.add(
                    "unlocked"
                );

                const status =
                    $(".achievement-status", card);

                if (status)
                    status.textContent =
                        "UNLOCKED";
            }
        });
}


updateAchievementUI();


/* =========================================================
   TERMINAL
   ========================================================= */

const terminalInput =
    $(".terminal-input input");

const terminalOutput =
    $(".terminal-output");


function printTerminal(
    text,
    type = ""
) {

    if (!terminalOutput)
        return;

    const line =
        document.createElement("p");

    if (type)
        line.classList.add(
            `terminal-${type}`
        );

    line.textContent = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}


function terminalCommand(command) {

    const clean =
        command.trim().toLowerCase();

    if (!clean)
        return;

    state.commands++;

    printTerminal(
        `vlad@cyberlab:~$ ${command}`
    );


    switch (clean) {

        case "help":

            printTerminal(
                "Available commands:",
                "cyan"
            );

            printTerminal(
                "help       - show commands"
            );

            printTerminal(
                "about      - about the lab"
            );

            printTerminal(
                "labs       - show available labs"
            );

            printTerminal(
                "status     - show system status"
            );

            printTerminal(
                "skills     - show skills"
            );

            printTerminal(
                "clear      - clear terminal"
            );

            printTerminal(
                "whoami     - current operator"
            );

            break;


        case "about":

            printTerminal(
                "My Cyber Lab is a personal cybersecurity learning environment.",
                "cyan"
            );

            printTerminal(
                "Operator: Vlad"
            );

            printTerminal(
                "Focus: Cybersecurity / Linux / Networking / Web Security"
            );

            break;


        case "whoami":

            printTerminal(
                "vlad",
                "green"
            );

            printTerminal(
                "Role: Cybersecurity learner"
            );

            break;


        case "labs":

            printTerminal(
                "Available laboratories:",
                "cyan"
            );

            Object.values(LAB_DATA)
                .forEach(lab => {

                    printTerminal(
                        `• ${lab.title} [${lab.difficulty}]`
                    );

                });

            break;


        case "skills":

            printTerminal(
                "Linux"
            );

            printTerminal(
                "Networking"
            );

            printTerminal(
                "Web Security"
            );

            printTerminal(
                "Python"
            );

            printTerminal(
                "Packet Analysis"
            );

            break;


        case "status":

            printTerminal(
                "SYSTEM: ONLINE",
                "green"
            );

            printTerminal(
                "LABS: OPERATIONAL",
                "green"
            );

            printTerminal(
                "TERMINAL: ONLINE",
                "green"
            );

            break;


        case "clear":

            terminalOutput.innerHTML = "";

            break;


        case "sudo":

            printTerminal(
                "Nice try 😭",
                "error"
            );

            printTerminal(
                "This terminal doesn't give you root."
            );

            break;


        case "hack":

            printTerminal(
                "Permission denied.",
                "error"
            );

            printTerminal(
                "Practice inside your authorized labs instead."
            );

            break;


        default:

            printTerminal(
                `Command not found: ${command}`,
                "error"
            );

            printTerminal(
                "Type 'help' for available commands."
            );
    }

    checkAchievements();
}


if (terminalInput) {

    terminalInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            )
                return;

            const command =
                terminalInput.value;

            terminalInput.value = "";

            terminalCommand(command);
        }
    );
}


/* =========================================================
   TERMINAL WELCOME
   ========================================================= */

if (terminalOutput) {

    const welcome = [
        "CYBER LAB TERMINAL v3.0",
        "--------------------------------",
        "System initialized successfully.",
        "Type 'help' to see available commands."
    ];

    welcome.forEach((line, index) => {

        setTimeout(
            () => {

                printTerminal(
                    line,
                    index === 0
                        ? "cyan"
                        : ""
                );

            },
            index * 120
        );

    });
}


/* =========================================================
   GITHUB BUTTON
   ========================================================= */

$$("[data-github]").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const url =
                button.dataset.github;

            if (url)
                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );
        }
    );
});


/* =========================================================
   LANGUAGE BUTTON
   ========================================================= */

const languageButton =
    $(".language-button");

if (languageButton) {

    languageButton.addEventListener(
        "click",
        () => {

            showToast(
                "LANGUAGE",
                "English version is currently active."
            );
        }
    );
}


/* =========================================================
   PARALLAX DASHBOARD
   ========================================================= */

const dashboard =
    $(".hero-dashboard");

if (
    dashboard &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    dashboard.addEventListener(
        "mousemove",
        event => {

            const rect =
                dashboard.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;

            dashboard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-3px)`;
        }
    );


    dashboard.addEventListener(
        "mouseleave",
        () => {

            dashboard.style.transform =
                "";
        }
    );
}


/* =========================================================
   CARD STAGGER
   ========================================================= */

function addStagger(selector) {

    $$(selector).forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 70, 500)}ms`;
        }
    );
}

addStagger(".skill-card");
addStagger(".lab-card");
addStagger(".achievement-card");
addStagger(".knowledge-card");


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            terminalInput?.focus();

            showToast(
                "TERMINAL",
                "Ctrl + K → terminal focused"
            );
        }

        if (
            event.key === "/" &&
            document.activeElement !== terminalInput
        ) {

            event.preventDefault();

            terminalInput?.focus();
        }
    }
);


/* =========================================================
   EASTER EGG
   ========================================================= */

let secretSequence = "";

const secretCode =
    "cyber";

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.length !== 1
        )
            return;

        secretSequence +=
            event.key.toLowerCase();

        if (
            secretSequence.length >
            secretCode.length
        ) {

            secretSequence =
                secretSequence.slice(
                    -secretCode.length
                );
        }

        if (
            secretSequence ===
            secretCode
        ) {

            openEasterEgg();

            secretSequence = "";
        }
    }
);


function openEasterEgg() {

    const egg =
        $(".easter-egg");

    if (!egg) return;

    egg.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );
}


function closeEasterEgg() {

    const egg =
        $(".easter-egg");

    if (!egg) return;

    egg.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );
}


$$("[data-close-easter]").forEach(
    button => {

        button.addEventListener(
            "click",
            closeEasterEgg
        );
    }
);


/* =========================================================
   ONLINE STATUS
   ========================================================= */

function updateOnlineStatus() {

    const status =
        $(".status-dot");

    const text =
        $(".status-pill");

    if (!status)
        return;

    if (navigator.onLine) {

        status.style.background =
            "var(--green)";

        status.style.boxShadow =
            "0 0 10px var(--green)";

        if (text)
            text.setAttribute(
                "title",
                "Online"
            );

    } else {

        status.style.background =
            "var(--yellow)";

        status.style.boxShadow =
            "0 0 10px var(--yellow)";

        if (text)
            text.setAttribute(
                "title",
                "Offline"
            );
    }
}

window.addEventListener(
    "online",
    updateOnlineStatus
);

window.addEventListener(
    "offline",
    updateOnlineStatus
);

updateOnlineStatus();


/* =========================================================
   DYNAMIC YEAR
   ========================================================= */

$$("[data-year]").forEach(
    element => {

        element.textContent =
            new Date().getFullYear();
    }
);


/* =========================================================
   FINAL INIT
   ========================================================= */

console.log(
    "%c MY CYBER LAB v3.0 ",
    "background:#00f5d4;color:#00110d;font-weight:bold;padding:8px;"
);

console.log(
    "%cSystem initialized.",
    "color:#00f5d4;"
);

console.log(
    "%cTry typing 'help' in the terminal 👀",
    "color:#52ff8a;"
);
