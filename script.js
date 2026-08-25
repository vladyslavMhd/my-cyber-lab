const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);


// ================================
// BOOT SCREEN
// ================================

const loader = $("#loader");
const bootBar = $(".boot-bar span");
const bootText = $("#bootText");

const bootMessages = [
  "Loading modules...",
  "Checking cyber systems...",
  "Starting learning environment...",
  "Initializing dashboard...",
  "SYSTEM READY"
];

let bootIndex = 0;

const bootInterval = setInterval(() => {

  bootText.textContent = bootMessages[bootIndex++];

  if(bootIndex >= bootMessages.length){
    clearInterval(bootInterval);
  }

}, 400);

setTimeout(() => {
  bootBar.style.width = "100%";
}, 100);

setTimeout(() => {
  loader.classList.add("hide");
}, 2300);


// ================================
// MOBILE MENU
// ================================

const menuBtn = $("#menuBtn");
const navbar = $(".navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

$$(".navbar nav a").forEach(link => {

  link.addEventListener("click", () => {
    navbar.classList.remove("open");
  });

});


// ================================
// PARTICLES
// ================================

const particles = $("#particles");

for(let i = 0; i < 45; i++){

  const p = document.createElement("i");

  p.className = "particle";

  p.style.left =
    Math.random() * 100 + "%";

  p.style.top =
    85 + Math.random() * 30 + "%";

  p.style.animationDuration =
    8 + Math.random() * 15 + "s";

  p.style.animationDelay =
    Math.random() * 10 + "s";

  particles.appendChild(p);

}


// ================================
// REVEAL ANIMATIONS
// ================================

const revealObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("show");

      }

    });

  },{
    threshold:.12
  });


$$(".reveal").forEach(el => {
  revealObserver.observe(el);
});


// ================================
// ACTIVE NAV
// ================================

const sections = $$("section[id]");

const sectionObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if(!entry.isIntersecting) return;

      $$(".navbar nav a").forEach(link => {

        link.classList.remove("active");

        if(
          link.getAttribute("href") ===
          "#" + entry.target.id
        ){

          link.classList.add("active");

        }

      });

    });

  },{
    threshold:.45
  });


sections.forEach(section => {
  sectionObserver.observe(section);
});


// ================================
// LAB MODALS
// ================================

const modal = $("#labModal");
const closeModal = $("#closeModal");

const modalCode = $("#modalCode");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");
const modalItems = $("#modalItems");

const labs = {

  linux:{
    code:"LAB_001",
    title:"LINUX LAB",
    text:"A safe environment for learning Linux fundamentals and system administration.",
    items:[
      "Terminal & Bash",
      "Files and permissions",
      "Processes",
      "Users and groups",
      "Package management"
    ]
  },

  network:{
    code:"LAB_002",
    title:"NETWORK LAB",
    text:"Learn how computers communicate and how network traffic can be analyzed.",
    items:[
      "TCP/IP",
      "DNS",
      "Ports",
      "Services",
      "Packet analysis"
    ]
  },

  web:{
    code:"LAB_003",
    title:"WEB LAB",
    text:"Explore how modern web applications work and how developers secure them.",
    items:[
      "HTTP",
      "Cookies",
      "Sessions",
      "Authentication",
      "Secure coding"
    ]
  },

  ctf:{
    code:"LAB_004",
    title:"CTF LAB",
    text:"Practice cybersecurity concepts through legal and authorized challenges.",
    items:[
      "Linux challenges",
      "Web challenges",
      "Cryptography",
      "Forensics",
      "Problem solving"
    ]
  }

};


$$(".lab-card").forEach(card => {

  card.querySelector("button").addEventListener("click", () => {

    const data =
      labs[card.dataset.lab];

    modalCode.textContent = data.code;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modalItems.innerHTML = "";

    data.items.forEach(item => {

      const el =
        document.createElement("div");

      el.className = "modal-item";

      el.textContent =
        "[+] " + item;

      modalItems.appendChild(el);

    });

    modal.classList.add("open");

  });

});


closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", event => {

  if(event.target === modal){
    modal.classList.remove("open");
  }

});


// ================================
// WEB TERMINAL
// ================================

const terminalInput = $("#terminalInput");
const terminalOutput = $("#terminalOutput");

function print(text, className=""){

  const p = document.createElement("p");

  p.className = className;

  p.innerHTML = text;

  terminalOutput.appendChild(p);

  terminalOutput.scrollTop =
    terminalOutput.scrollHeight;
}


function runCommand(command){

  const cmd =
    command.trim().toLowerCase();

  print(
    `vlad@cyberlab:~$ ${command}`,
    "cyan"
  );

  if(cmd === "help"){

    print(`
      <span class="green">Available commands:</span><br>
      about<br>
      skills<br>
      projects<br>
      labs<br>
      status<br>
      github<br>
      clear
    `);

  }

  else if(cmd === "about"){

    print(
      "Vlad // 16 // cybersecurity enthusiast."
    );

  }

  else if(cmd === "skills"){

    print(`
      <span class="green">SKILLS</span><br>
      Linux ........ 88%<br>
      Networking ... 72%<br>
      Web Security . 65%<br>
      CTF .......... 55%<br>
      Defense ...... 42%
    `);

  }

  else if(cmd === "projects"){

    print(`
      <span class="green">PROJECTS</span><br>
      P-001 My Cyber Lab<br>
      P-002 Home Cyber Lab<br>
      P-003 Future Project
    `);

  }

  else if(cmd === "labs"){

    print(`
      <span class="green">LAB STATUS</span><br>
      Linux Lab ..... ONLINE<br>
      Network Lab ... ONLINE<br>
      Web Lab ....... ONLINE<br>
      CTF Lab ....... READY
    `);

  }

  else if(cmd === "status"){

    print(
      "<span class='green'>SYSTEM ONLINE — LEARNING MODE ACTIVE.</span>"
    );

  }

  else if(cmd === "github"){

    print(
      "Opening GitHub..."
    );

    setTimeout(() => {

      window.open(
        "https://github.com/",
        "_blank"
      );

    },500);

  }

  else if(cmd === "clear"){

    terminalOutput.innerHTML = "";

  }

  else if(cmd === ""){

    return;

  }

  else{

    print(
      `command not found: ${command}. Type <span class="green">help</span>.`
    );

  }

}


terminalInput.addEventListener("keydown", event => {

  if(event.key === "Enter"){

    runCommand(
      terminalInput.value
    );

    terminalInput.value = "";

  }

});


// ================================
// TERMINAL SHORTCUT
// ================================

document.addEventListener("keydown", event => {

  if(
    event.key === "~" &&
    document.activeElement !== terminalInput
  ){

    document
      .getElementById("terminal")
      .scrollIntoView({
        behavior:"smooth"
      });

    setTimeout(() => {
      terminalInput.focus();
    },500);

  }

});


// ================================
// CUSTOM CURSOR
// ================================

const cursor = $(".cursor");
const cursorDot = $(".cursor-dot");

window.addEventListener("mousemove", event => {

  cursor.style.left =
    event.clientX + "px";

  cursor.style.top =
    event.clientY + "px";

  cursorDot.style.left =
    event.clientX + "px";

  cursorDot.style.top =
    event.clientY + "px";

});


$$("a,button,.lab-card,.skill-node,.achievement")
.forEach(el => {

  el.addEventListener("mouseenter", () => {

    cursor.style.width = "44px";
    cursor.style.height = "44px";

  });

  el.addEventListener("mouseleave", () => {

    cursor.style.width = "27px";
    cursor.style.height = "27px";

  });

});


// ================================
// LANGUAGE SWITCHER
// ================================

const langBtn = $("#langBtn");

let language = "EN";

langBtn.addEventListener("click", () => {

  language =
    language === "EN" ? "RU" :
    language === "RU" ? "NL" :
    language === "NL" ? "UA" :
    "EN";

  langBtn.textContent = language;

  const messages = {

    EN:"Language: English",
    RU:"Язык: Русский",
    NL:"Taal: Nederlands",
    UA:"Мова: Українська"

  };

  print(
    `<span class="green">${messages[language]}</span>`
  );

});


// ================================
// EASTER EGG
// KONAMI CODE
// ================================

const egg = $("#egg");
const closeEgg = $("#closeEgg");

const secret = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight"
];

let secretIndex = 0;

document.addEventListener("keydown", event => {

  if(event.key === secret[secretIndex]){

    secretIndex++;

    if(secretIndex === secret.length){

      egg.classList.add("open");

      secretIndex = 0;

    }

  }else{

    secretIndex = 0;

  }

});


closeEgg.addEventListener("click", () => {
  egg.classList.remove("open");
});


// ================================
// ESC CLOSE
// ================================

document.addEventListener("keydown", event => {

  if(event.key === "Escape"){

    modal.classList.remove("open");
    egg.classList.remove("open");

  }

});
