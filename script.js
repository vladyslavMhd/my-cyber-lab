const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);


// LOADER

window.addEventListener("load", () => {

  const loader = $(".loader");
  const bar = $(".loader-line i");

  setTimeout(() => {
    bar.style.width = "100%";
  }, 100);

  setTimeout(() => {
    loader.classList.add("done");
  }, 1900);

});


// MOBILE MENU

const nav = $(".nav");
const menu = $(".menu");

menu.onclick = () => {
  nav.classList.toggle("open");
};

$$(".nav nav a").forEach(link => {

  link.onclick = () => {
    nav.classList.remove("open");
  };

});


// TERMINAL TYPING

const typed = $("#typed");
const output = $("#termOutput");

const commands = [
  "neofetch",
  "whoami",
  "cat about.txt",
  "echo 'keep learning'",
  "./start-lab.sh"
];

let commandIndex = 0;
let position = 0;
let deleting = false;

const outputs = {

  "neofetch": `
    <p class="green">OS: Kali GNU/Linux Rolling</p>
    <p>Shell: bash</p>
    <p>Focus: cybersecurity</p>
  `,

  "whoami": `
    <p class="green">vlad // cybersecurity enthusiast</p>
    <p class="muted">16 years old • learning every day</p>
  `,

  "cat about.txt": `
    <p class="green">[+] Welcome to My Cyber Lab.</p>
    <p class="muted">Build. Learn. Improve.</p>
  `,

  "echo 'keep learning'": `
    <p class="cyan">keep learning 🚀</p>
  `,

  "./start-lab.sh": `
    <p class="green">[ OK ] Starting authorized learning environment...</p>
    <p class="cyan">Ready.</p>
  `

};


function typeTerminal(){

  const command = commands[commandIndex];

  if(!deleting){

    typed.textContent = command.slice(0, position++);

    if(position > command.length){

      deleting = true;

      output.innerHTML = outputs[command];

      setTimeout(typeTerminal, 1100);

    }else{

      setTimeout(typeTerminal, 55);

    }

  }else{

    typed.textContent = command.slice(0, --position);

    if(position <= 0){

      deleting = false;

      commandIndex =
        (commandIndex + 1) % commands.length;

      setTimeout(typeTerminal, 250);

    }else{

      setTimeout(typeTerminal, 25);

    }

  }

}

typeTerminal();


// PARTICLES

const particles = $("#particles");

for(let i = 0; i < 40; i++){

  const particle = document.createElement("i");

  particle.className = "particle";

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.top =
    85 + Math.random() * 30 + "%";

  particle.style.animationDuration =
    8 + Math.random() * 15 + "s";

  particle.style.animationDelay =
    Math.random() * 12 + "s";

  particles.appendChild(particle);

}


// SCROLL REVEAL

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("show");

        }

      });

    },
    {
      threshold: .12
    }
  );


$$(".reveal").forEach(element => {

  revealObserver.observe(element);

});


// NUMBER COUNTERS

const counters =
  $$(".stats b[data-count]");

const counterObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(
          entry.isIntersecting &&
          !entry.target.dataset.done
        ){

          entry.target.dataset.done = "true";

          const target =
            Number(entry.target.dataset.count);

          let current = 0;

          const interval =
            setInterval(() => {

              current++;

              entry.target.textContent =
                current;

              if(current >= target){

                clearInterval(interval);

              }

            }, 70);

        }

      });

    }
  );


counters.forEach(counter => {

  counterObserver.observe(counter);

});


// CUSTOM CURSOR

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


$$("a, button, .lab-card, .tool")
.forEach(element => {

  element.addEventListener("mouseenter", () => {

    cursor.style.width = "45px";
    cursor.style.height = "45px";

  });

  element.addEventListener("mouseleave", () => {

    cursor.style.width = "28px";
    cursor.style.height = "28px";

  });

});


// SMOOTH ACTIVE NAV

const sections = $$("section[id]");

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          $$(".nav nav a").forEach(link => {

            link.classList.remove("active");

            if(
              link.getAttribute("href") ===
              "#" + entry.target.id
            ){

              link.classList.add("active");

            }

          });

        }

      });

    },
    {
      threshold: .45
    }
  );


sections.forEach(section => {

  sectionObserver.observe(section);

});
