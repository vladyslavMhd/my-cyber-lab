/*
==================================================
MY CYBER LAB v4.0
==================================================

Supabase:
- URL: your project URL
- Key: publishable/anon key ONLY

NEVER put a service_role / secret key here.
==================================================
*/


const SUPABASE_URL =
  "https://zmcngtcppgmxtngrvzon.supabase.co";


const SUPABASE_KEY =
  "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";



/* ================================================
   LABS
================================================ */


const labs = [

  {
    id: "web",
    icon: "🌐",
    title: "Web Security Basics",
    desc: "Learn the foundations of HTTP, cookies, headers and common web-security concepts.",
    xp: 100,
    diff: "Beginner"
  },

  {
    id: "linux",
    icon: "🐧",
    title: "Linux Fundamentals",
    desc: "Practice safe command-line navigation, permissions and process inspection.",
    xp: 120,
    diff: "Beginner"
  },

  {
    id: "network",
    icon: "📡",
    title: "Networking Basics",
    desc: "Understand IP addresses, ports, DNS and how packets move between systems.",
    xp: 130,
    diff: "Beginner"
  },

  {
    id: "crypto",
    icon: "🔐",
    title: "Cryptography",
    desc: "Explore hashing, encryption, keys and secure password storage.",
    xp: 150,
    diff: "Intermediate"
  },

  {
    id: "osint",
    icon: "🔎",
    title: "OSINT Basics",
    desc: "Learn ethical open-source research and how to evaluate information responsibly.",
    xp: 140,
    diff: "Intermediate"
  },

  {
    id: "ctf",
    icon: "🏴‍☠️",
    title: "CTF Starter",
    desc: "Solve beginner-friendly security puzzles in a controlled learning environment.",
    xp: 180,
    diff: "Intermediate"
  }

];



/* ================================================
   ACHIEVEMENTS
================================================ */


const achievements = [

  [
    "first",
    "🚀",
    "First Lab",
    state => state.completed.length >= 1
  ],

  [
    "three",
    "🧪",
    "3 Labs",
    state => state.completed.length >= 3
  ],

  [
    "xp500",
    "⚡",
    "500 XP",
    state => state.xp >= 500
  ],

  [
    "daily",
    "🧠",
    "Daily Solver",
    state => state.daily
  ],

  [
    "all",
    "🏆",
    "Lab Master",
    state => state.completed.length >= labs.length
  ]

];



/* ================================================
   SKILLS
================================================ */


const skills = [

  ["Linux", 82],

  ["Networking", 74],

  ["Web Security", 76],

  ["Python", 68],

  ["CTF", 61],

  ["Cyber Fundamentals", 88]

];



/* ================================================
   STATE
================================================ */


let state =
  JSON.parse(
    localStorage.getItem("mcl_state") || "null"
  );


if (!state) {

  state = {

    xp: 0,

    completed: [],

    daily: false

  };

}


let selectedRating = 0;



/* ================================================
   HELPERS
================================================ */


const $ = selector =>
  document.querySelector(selector);


const $$ = selector =>
  [...document.querySelectorAll(selector)];



function save() {

  localStorage.setItem(
    "mcl_state",
    JSON.stringify(state)
  );

  renderDashboard();

}



function toast(message) {

  const element = $("#toast");

  element.textContent = message;

  element.classList.add("show");

  setTimeout(() => {

    element.classList.remove("show");

  }, 2400);

}



function escapeHtml(value) {

  return String(value).replace(
    /[&<>"']/g,

    char => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    })[char]

  );

}



/* ================================================
   LABS
================================================ */


function renderLabs() {

  $("#labGrid").innerHTML =
    labs.map(lab => `

      <article class="lab-card reveal visible">

        <div class="lab-icon">
          ${lab.icon}
        </div>

        <h3>
          ${lab.title}
        </h3>

        <p>
          ${lab.desc}
        </p>

        <div class="lab-meta">

          <span class="difficulty">
            ${lab.diff}
          </span>

          <span>
            +${lab.xp} XP
          </span>

          <button
            class="lab-btn"
            data-lab="${lab.id}">

            ${
              state.completed.includes(lab.id)
                ? "Completed ✓"
                : "Start Lab →"
            }

          </button>

        </div>

      </article>

    `).join("");


  $$(".lab-btn").forEach(button => {

    button.onclick = () => {

      completeLab(
        button.dataset.lab
      );

    };

  });

}



function completeLab(id) {

  const lab =
    labs.find(item => item.id === id);


  if (!lab) return;


  if (
    state.completed.includes(id)
  ) {

    toast(
      "You already completed this lab."
    );

    return;

  }


  state.completed.push(id);

  state.xp += lab.xp;


  save();

  renderLabs();


  toast(
    `+${lab.xp} XP — ${lab.title} completed 🔥`
  );

}



/* ================================================
   DASHBOARD
================================================ */


function renderDashboard() {

  const level =
    Math.floor(state.xp / 100) + 1;


  const within =
    state.xp % 100;


  const names = [

    "Cyber Recruit",
    "Packet Scout",
    "Security Learner",
    "Web Hunter",
    "Blue Teamer",
    "Cyber Explorer",
    "Lab Runner",
    "Security Builder",
    "Cyber Specialist",
    "Elite Learner"

  ];


  $("#levelNumber").textContent =
    level;


  $("#levelName").textContent =
    names[
      Math.min(
        level - 1,
        names.length - 1
      )
    ];


  $("#xpText").textContent =
    `${within} / 100 XP`;


  $("#xpPercent").textContent =
    `${within}%`;


  $("#xpBar").style.width =
    `${within}%`;


  $("#completedCount").textContent =
    state.completed.length;


  $("#totalXP").textContent =
    state.xp;


  $("#heroLabs").textContent =
    labs.length;


  $("#heroXP").textContent =
    state.xp;


  const unlocked =
    achievements.filter(
      achievement =>
        achievement[3](state)
    ).length;


  $("#achievementCount").textContent =
    unlocked;


  $("#achievementHint").textContent =
    `${unlocked} unlocked`;


  $("#achievementGrid").innerHTML =

    achievements.map(
      achievement => `

        <div
          class="
            achievement
            ${
              achievement[3](state)
                ? "unlocked"
                : ""
            }
          ">

          <div class="emoji">
            ${achievement[1]}
          </div>

          <span>
            ${achievement[2]}
          </span>

        </div>

      `
    ).join("");

}



/* ================================================
   SKILLS
================================================ */


function renderSkills() {

  $("#skillsGrid").innerHTML =

    skills.map(skill => `

      <div class="skill">

        <span>
          ${skill[0]}
        </span>

        <div class="skill-bar">

          <i
            style="width:${skill[1]}%">
          </i>

        </div>

        <b>
          ${skill[1]}%
        </b>

      </div>

    `).join("");

}



/* ================================================
   DAILY CHALLENGE
================================================ */


const challenges = [

  {
    q: "Which HTTP status code means 'Forbidden'?",

    o: [
      "200",
      "301",
      "403",
      "500"
    ],

    a: 2
  },

  {
    q: "Which protocol is normally used for secure web traffic?",

    o: [
      "FTP",
      "HTTPS",
      "HTTP",
      "Telnet"
    ],

    a: 1
  },

  {
    q: "What does DNS primarily translate?",

    o: [
      "Domains to IP addresses",
      "Files to hashes",
      "Ports to users",
      "Passwords to keys"
    ],

    a: 0
  }

];



function dailyChallenge() {

  const challenge =
    challenges[
      new Date().getDate()
      % challenges.length
    ];


  $("#challengeQuestion")
    .textContent =
    challenge.q;


  $("#challengeOptions").innerHTML =

    challenge.o.map(
      (answer, index) => `

        <button
          data-i="${index}">

          ${answer}

        </button>

      `
    ).join("");


  $$("#challengeOptions button")
    .forEach(button => {

      button.onclick = () => {

        if (state.daily) {

          toast(
            "Daily challenge already completed."
          );

          return;

        }


        if (
          Number(button.dataset.i)
          === challenge.a
        ) {

          state.daily = true;

          state.xp += 50;


          save();


          $("#challengeResult")
            .textContent =
            "Correct! +50 XP 🧠";


          toast(
            "+50 XP — daily challenge complete!"
          );

        } else {

          $("#challengeResult")
            .textContent =
            "Not quite. Try again.";

        }

      };

    });

}



/* ================================================
   SUPABASE REVIEWS
================================================ */


async function loadReviews() {

  if (!SUPABASE_KEY) {

    $("#reviewsList").innerHTML =
      "<p>Supabase is not configured.</p>";

    return;

  }


  try {

    const response =

      await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`,
        {
          headers: {

            apikey: SUPABASE_KEY,

            Authorization:
              `Bearer ${SUPABASE_KEY}`

          }

        }
      );


    if (!response.ok) {

      throw new Error(
        "Supabase request failed"
      );

    }


    const data =
      await response.json();


    renderReviews(data);


  } catch (error) {

    console.error(error);


    $("#reviewsList").innerHTML = `

      <p style="color:#8d9aac">

        Could not load reviews.
        Check your Supabase table/RLS settings.

      </p>

    `;

  }

}



function renderReviews(data) {

  const list =
    $("#reviewsList");


  $("#reviewCount").textContent =

    `${data.length} review${
      data.length === 1
        ? ""
        : "s"
    }`;


  if (!data.length) {

    list.innerHTML = `

      <p style="color:#8d9aac">

        No reviews yet.
        Be the first 👀

      </p>

    `;


    $("#avgRating")
      .textContent = "—";


    return;

  }


  const average =

    data.reduce(
      (total, review) =>
        total +
        Number(review.rating || 0),

      0

    ) / data.length;


  $("#avgRating")
    .textContent =
    average.toFixed(1);


  list.innerHTML =

    data.slice(0, 12)
      .map(review => `

        <div class="review-item">

          <div class="review-item-head">

            <strong>
              ${escapeHtml(
                review.name ||
                "Anonymous"
              )}
            </strong>

            <span class="stars-text">

              ${
                "★".repeat(
                  Number(review.rating || 0)
                )
              }

              ${
                "☆".repeat(
                  5 -
                  Number(review.rating || 0)
                )
              }

            </span>

          </div>


          <p>
            ${escapeHtml(
              review.comment || ""
            )}
          </p>


          <span class="review-date">

            ${
              review.created_at
                ? new Date(
                    review.created_at
                  ).toLocaleDateString()
                : ""
            }

          </span>

        </div>

      `).join("");

}



/* ================================================
   STAR RATING
================================================ */


function setStars(number) {

  selectedRating =
    number;


  $$("#starPicker button")
    .forEach(button => {

      button.classList.toggle(

        "active",

        Number(
          button.dataset.star
        ) <= number

      );

    });

}



$$("#starPicker button")
  .forEach(button => {

    button.onclick = () => {

      setStars(
        Number(
          button.dataset.star
        )
      );

    };

  });



/* ================================================
   POST REVIEW
================================================ */


async function submitReview() {

  const name =
    $("#reviewName")
      .value
      .trim()
      || "Anonymous";


  const comment =
    $("#reviewText")
      .value
      .trim();


  const status =
    $("#reviewStatus");


  if (
    !selectedRating ||
    !comment
  ) {

    status.textContent =
      "Choose a star rating and write a comment.";

    return;

  }


  status.textContent =
    "Posting…";


  try {

    const response =

      await fetch(
        `${SUPABASE_URL}/rest/v1/reviews`,
        {

          method: "POST",

          headers: {

            apikey: SUPABASE_KEY,

            Authorization:
              `Bearer ${SUPABASE_KEY}`,

            "Content-Type":
              "application/json",

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              name,

              rating:
                selectedRating,

              comment

            })

        }
      );


    if (!response.ok) {

      throw new Error(
        await response.text()
      );

    }


    $("#reviewText")
      .value = "";


    $("#reviewName")
      .value = "";


    selectedRating = 0;


    setStars(0);


    status.textContent =
      "Posted!";


    toast(
      "Review posted ⭐"
    );


    loadReviews();


  } catch (error) {

    console.error(error);


    status.textContent =
      "Could not post. Check your Supabase table and INSERT policy.";

  }

}



$("#submitReview")
  .onclick =
  submitReview;



/* ================================================
   TERMINAL
================================================ */


const terminalCommands = {

  help:
    "Commands: help, about, labs, skills, status, clear",

  about:
    "Vlad — 16-year-old cybersecurity learner.",

  labs:
    `${labs.length} labs available. Scroll to #labs to explore them.`,

  skills:
    "Linux • Networking • Web Security • Python • CTF",

  status:
    () =>
      `Level ${
        Math.floor(
          state.xp / 100
        ) + 1
      } • ${
        state.xp
      } XP • ${
        state.completed.length
      }/${labs.length} labs completed`

};



function terminal(command) {

  const output =
    $("#terminalOutput");


  if (command === "clear") {

    output.innerHTML = "";

    return;

  }


  const value =
    terminalCommands[command];


  const result =
    typeof value === "function"
      ? value()
      : value;


  const finalText =
    result ||
    `Command not found: ${command}. Type 'help'.`;


  output.innerHTML += `

    <div>

      <span class="green">
        vlad@cyberlab
      </span>:<span class="blue">~</span>$

      ${escapeHtml(command)}

    </div>


    <div class="white">

      ${escapeHtml(finalText)}

    </div>

  `;


  output.scrollTop =
    output.scrollHeight;

}



$("#commandInput")
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        terminal(
          event.target.value
            .trim()
            .toLowerCase()
        );


        event.target.value = "";

      }

    }
  );



/* ================================================
   SCROLL ANIMATIONS
================================================ */


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target
            .classList
            .add("visible");

        }

      });

    },

    {
      threshold: .08
    }

  );


$$(".reveal")
  .forEach(element =>
    observer.observe(element)
  );



/* ================================================
   START
================================================ */


renderLabs();

renderDashboard();

renderSkills();

dailyChallenge();

loadReviews();
