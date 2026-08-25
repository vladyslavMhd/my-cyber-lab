const SUPABASE_URL =
  "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";

const SUPABASE_KEY =
  "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";
const labs = {

  linux: {
    title: "Linux Fundamentals",
    diff: "BEGINNER",
    desc: "Master the Linux command line, filesystem, permissions and processes.",
    tasks: [
      ["Navigate the filesystem", "Practice pwd, ls, cd and find."],
      ["Manage files", "Create, copy, move and remove files in your own lab."],
      ["Understand permissions", "Explore chmod, chown and ls -la."],
      ["Inspect processes", "Use ps, top and system tools to understand running processes."]
    ]
  },

  network: {
    title: "Network Fundamentals",
    diff: "BEGINNER",
    desc: "Understand how devices communicate and how analysts inspect a network.",
    tasks: [
      ["IP basics", "Learn addresses, masks, gateways and interfaces."],
      ["Connectivity", "Practice ping and traceroute against systems you control."],
      ["Ports & protocols", "Understand TCP, UDP and common service ports."],
      ["DNS", "Follow a DNS request from your machine to a resolver."]
    ]
  },

  web: {
    title: "Web Security",
    diff: "INTERMEDIATE",
    desc: "Explore web security concepts safely inside authorized practice environments.",
    tasks: [
      ["HTTP", "Inspect requests, responses, headers and cookies."],
      ["Authentication", "Understand how login and session systems work."],
      ["Input validation", "Learn why applications must validate untrusted input."],
      ["OWASP", "Study common web security risks and mitigations."]
    ]
  },

  python: {
    title: "Python Security",
    diff: "INTERMEDIATE",
    desc: "Use Python to automate safe defensive and analysis tasks.",
    tasks: [
      ["Files & data", "Read and transform structured data."],
      ["Sockets", "Understand basic network programming concepts."],
      ["Log parser", "Build a small defensive log-analysis utility."],
      ["Automation", "Automate a repetitive lab workflow."]
    ]
  },

  packets: {
    title: "Packet Analysis",
    diff: "INTERMEDIATE",
    desc: "Learn to read network traffic and reason about protocols.",
    tasks: [
      ["Capture", "Capture traffic in your own test environment."],
      ["Filters", "Use filters to isolate useful packets."],
      ["TCP", "Inspect handshakes, flags and connections."],
      ["DNS analysis", "Identify DNS queries and responses."]
    ]
  },

  blue: {
    title: "Blue Team Basics",
    diff: "ADVANCED",
    desc: "Learn monitoring, detection and incident-response fundamentals.",
    tasks: [
      ["Logs", "Identify security-relevant system events."],
      ["Indicators", "Learn what suspicious activity can look like."],
      ["Alerts", "Understand how detection rules produce alerts."],
      ["Response", "Learn the basic incident-response lifecycle."]
    ]
  }

};


const achievements = [

  [
    "first",
    "FIRST STEP",
    "Complete your first lab.",
    "◇"
  ],

  [
    "three",
    "TRIPLE THREAT",
    "Complete three labs.",
    "△"
  ],

  [
    "all",
    "LAB MASTER",
    "Complete every lab.",
    "◆"
  ],

  [
    "shell",
    "SHELL USER",
    "Run five terminal commands.",
    "$"
  ]

];


const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];


let data = JSON.parse(
  localStorage.getItem("mcl_v4") ||
  '{"labs":{},"ach":{},"commands":0}'
);


function save() {

  localStorage.setItem(
    "mcl_v4",
    JSON.stringify(data)
  );

}


function completed(id) {

  return (
    data.labs[id]?.filter(Boolean).length ||
    0
  );

}


function percent(id) {

  return Math.round(
    completed(id) /
    labs[id].tasks.length *
    100
  );

}


function totalProgress() {

  let total = 0;
  let done = 0;

  Object.keys(labs).forEach(id => {

    total += labs[id].tasks.length;

    done += completed(id);

  });

  return total
    ? Math.round(done / total * 100)
    : 0;

}


function toast(message) {

  const element = $("#toast");

  element.textContent = message;

  element.classList.add("show");

  setTimeout(() => {

    element.classList.remove("show");

  }, 2500);

}


/* RENDER LABS */

function renderLabs() {

  const grid = $("#labsGrid");

  grid.innerHTML = "";

  Object.entries(labs).forEach(
    ([id, lab], index) => {

      const progress = percent(id);

      grid.insertAdjacentHTML(
        "beforeend",

        `
        <article class="lab-card reveal visible
        ${progress === 100 ? "completed" : ""}">

          <div class="lab-index">
            0${index + 1} / ${lab.diff}
          </div>

          <h3>
            ${lab.title}
          </h3>

          <p>
            ${lab.desc}
          </p>

          <div class="lab-bottom">

            <span class="lab-status">

              ${
                progress === 100
                  ? "COMPLETED"
                  : progress
                    ? "IN PROGRESS"
                    : "READY"
              }

            </span>

            <div class="lab-progress">

              <i style="width:${progress}%"></i>

            </div>

            <button
              class="lab-open"
              data-open="${id}">

              ${
                progress === 100
                  ? "REVIEW LAB"
                  : "OPEN LAB →"
              }

            </button>

          </div>

        </article>
        `
      );

    }
  );


  $("#labCount").textContent =
    `${Object.keys(labs).length} LABS`;


  $$("#labsGrid [data-open]")
    .forEach(button => {

      button.onclick = () =>
        openLab(button.dataset.open);

    });


  updateOverall();
  updateHero();

}


/* PROGRESS */

function updateOverall() {

  const progress =
    totalProgress();

  $("#overallText")
    .textContent =
    progress + "%";

  $("#overallBar")
    .style.width =
    progress + "%";

}


function updateHero() {

  $("#heroLabs")
    .textContent =
    Object.keys(labs).length;

  $("#heroProgress")
    .textContent =
    totalProgress() + "%";

}


/* LAB MODAL */

let current = null;


function openLab(id) {

  current = id;

  const lab = labs[id];

  const saved =
    data.labs[id] || [];


  $("#modalTitle")
    .textContent =
    lab.title;

  $("#modalDifficulty")
    .textContent =
    lab.diff;

  $("#modalDescription")
    .textContent =
    lab.desc;


  $("#taskList").innerHTML =
    lab.tasks
      .map(
        (task, index) =>

        `
        <label class="task
        ${saved[index] ? "done" : ""}">

          <input
            type="checkbox"
            data-task="${index}"
            ${saved[index] ? "checked" : ""}>

          <div>

            <h4>
              ${task[0]}
            </h4>

            <p>
              ${task[1]}
            </p>

          </div>

        </label>
        `
      )
      .join("");


  $("#labModal")
    .classList
    .add("open");


  $("#labModal")
    .setAttribute(
      "aria-hidden",
      "false"
    );


  updateModal();


  $$("#taskList input")
    .forEach(input => {

      input.onchange = () => {

        if (!data.labs[id])
          data.labs[id] = [];


        data.labs[id][
          +input.dataset.task
        ] = input.checked;


        input
          .closest(".task")
          .classList
          .toggle(
            "done",
            input.checked
          );


        save();

        updateModal();

        renderLabs();

        checkAchievements();

      };

    });

}


function updateModal() {

  const progress =
    percent(current);

  $("#modalPercent")
    .textContent =
    progress + "%";

  $("#modalBar")
    .style.width =
    progress + "%";

}


function closeModal() {

  $("#labModal")
    .classList
    .remove("open");

  $("#labModal")
    .setAttribute(
      "aria-hidden",
      "true"
    );

  current = null;

}


$("#modalClose")
  .onclick =
  closeModal;


$("#labModal").onclick =
  event => {

    if (
      event.target.id ===
      "labModal"
    ) {

      closeModal();

    }

  };


$("#finishLab").onclick = () => {

  if (percent(current) < 100) {

    toast(
      "Finish every task first 😭"
    );

    return;

  }


  data.ach[current] = true;

  save();

  toast(
    "LAB COMPLETED ✓"
  );

  checkAchievements();

  setTimeout(
    closeModal,
    500
  );

};


/* ACHIEVEMENTS */

function checkAchievements() {

  const finished =
    Object.keys(labs)
      .filter(
        id =>
          percent(id) === 100
      )
      .length;


  if (
    Object.values(data.labs)
      .some(
        x =>
          x?.length &&
          x.some(Boolean)
      )
  ) {

    data.ach.first = true;

  }


  if (finished >= 3) {

    data.ach.three = true;

  }


  if (
    finished ===
    Object.keys(labs).length
  ) {

    data.ach.all = true;

  }


  if (data.commands >= 5) {

    data.ach.shell = true;

  }


  save();

  renderAchievements();

}


function renderAchievements() {

  $("#achievementsGrid").innerHTML =
    achievements
      .map(
        achievement =>

        `
        <article class="achievement
        ${
          data.ach[achievement[0]]
            ? "unlocked"
            : ""
        }">

          <div class="achievement-icon">
            ${achievement[3]}
          </div>

          <h3>
            ${achievement[1]}
          </h3>

          <small>
            ${achievement[2]}
          </small>

          <span class="achievement-status">

            ${
              data.ach[achievement[0]]
                ? "UNLOCKED"
                : "LOCKED"
            }

          </span>

        </article>
        `
      )
      .join("");

}


/* TERMINAL */

const output =
  $("#terminalOutput");


function out(
  text,
  className = ""
) {

  const element =
    document.createElement("div");

  element.className =
    className;

  element.textContent =
    text;

  output.appendChild(
    element
  );

  output.scrollTop =
    output.scrollHeight;

}


function command(commandText) {

  data.commands++;

  save();


  out(
    "vlad@cyberlab:~$ " +
    commandText,
    "cmd"
  );


  const command =
    commandText
      .trim()
      .toLowerCase();


  if (command === "help") {

    out(
      "help  about  labs  skills  status  progress  clear",
      "ok"
    );

  }


  else if (command === "about") {

    out(
      "Vlad — 16-year-old cybersecurity learner focused on Linux, networking, web security and Python.",
      "ok"
    );

  }


  else if (command === "labs") {

    Object.values(labs)
      .forEach(
        lab => {

          out(
            "• " +
            lab.title +
            " [" +
            lab.diff +
            "]"
          );

        }
      );

  }


  else if (command === "skills") {

    out(
      "Linux | Networking | Web Security | Python | Packet Analysis | Blue Team",
      "ok"
    );

  }


  else if (command === "status") {

    out(
      "SYSTEM ONLINE / LABS OPERATIONAL / LOCAL STORAGE ACTIVE",
      "ok"
    );

  }


  else if (command === "progress") {

    out(
      "Overall progress: " +
      totalProgress() +
      "%",
      "ok"
    );

  }


  else if (command === "clear") {

    output.innerHTML = "";

  }


  else if (
    command === "hack" ||
    command === "sudo"
  ) {

    out(
      "Nice try 😭 Use the interactive labs for authorized practice.",
      "err"
    );

  }


  else {

    out(
      "Command not found. Type 'help'.",
      "err"
    );

  }


  checkAchievements();

}


$("#terminalForm").onsubmit =
  event => {

    event.preventDefault();

    const input =
      $("#terminalInput");


    if (
      input.value.trim()
    ) {

      command(
        input.value
      );

      input.value = "";

    }

  };


/* HERO TYPING */

const phrases = [

  "boot lab --secure",
  "scan --local-environment",
  "load learning.modules",
  "status --all"

];


let phraseIndex = 0;
let charIndex = 0;


function typeHero() {

  const text =
    phrases[phraseIndex];


  $("#heroType")
    .textContent =
    text.slice(
      0,
      charIndex++
    );


  if (
    charIndex >
    text.length
  ) {

    setTimeout(
      () => {

        charIndex = 0;

        phraseIndex =
          (phraseIndex + 1)
          % phrases.length;

      },
      1200
    );

  }


  setTimeout(
    typeHero,
    55
  );

}


/* SCROLL ANIMATIONS */

$$(".reveal")
  .forEach(element => {

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
                  .add("visible");

              }

            }
          );

        },
        {
          threshold: .12
        }
      );


    observer.observe(element);

  });


/* STARTUP */

$("#year")
  .textContent =
  new Date()
    .getFullYear();


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Escape"
    ) {

      closeModal();

    }


    if (
      event.key === "/" &&
      !event.ctrlKey
    ) {

      event.preventDefault();

      $("#terminalInput")
        .focus();

    }

  }
);


typeHero();

renderLabs();

renderAchievements();

checkAchievements();
