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

    desc:
      "Learn the foundations of HTTP, cookies and web security.",

    xp: 100,

    diff: "Beginner",

    task:
      "What HTTP status code means that a resource was not found?",

    answers: [
      "404",
      "http 404",
      "status 404"
    ],

    hint:
      "It is the famous 'Not Found' status code."
  },


  {
    id: "linux",

    icon: "🐧",

    title: "Linux Fundamentals",

    desc:
      "Practice safe command-line navigation, permissions and process inspection.",

    xp: 120,

    diff: "Beginner",

    task:
      "What Linux command lists all files in the current directory, including hidden files?",

    answers: [
      "ls -la",
      "ls -al",
      "ls --all",
      "ls -a"
    ],

    hint:
      "Think about the ls command and the option that shows hidden files."
  },


  {
    id: "network",

    icon: "📡",

    title: "Networking Basics",

    desc:
      "Understand IP addresses, ports, DNS and basic networking.",

    xp: 130,

    diff: "Beginner",

    task:
      "What protocol translates domain names such as example.com into IP addresses?",

    answers: [
      "dns",
      "domain name system"
    ],

    hint:
      "It works like the internet's phone book."
  },


  {
    id: "crypto",

    icon: "🔐",

    title: "Cryptography",

    desc:
      "Explore hashing, encryption and secure password storage.",

    xp: 150,

    diff: "Intermediate",

    task:
      "What cryptographic function converts data into a fixed-length digest and is commonly used for integrity checking?",

    answers: [
      "hash",
      "hashing",
      "cryptographic hash"
    ],

    hint:
      "SHA-256 is an example."
  },


  {
    id: "osint",

    icon: "🔎",

    title: "OSINT Basics",

    desc:
      "Learn ethical open-source research and information verification.",

    xp: 140,

    diff: "Intermediate",

    task:
      "What does OSINT stand for?",

    answers: [
      "open source intelligence",
      "open-source intelligence"
    ],

    hint:
      "It is intelligence gathered from publicly available information."
  },


  {
    id: "ctf",

    icon: "🏴‍☠️",

    title: "CTF Starter",

    desc:
      "Solve beginner-friendly cybersecurity puzzles.",

    xp: 180,

    diff: "Intermediate",

    task:
      "In cybersecurity, what does CTF usually stand for?",

    answers: [
      "capture the flag",
      "capture-the-flag"
    ],

    hint:
      "It is a popular format for cybersecurity competitions."
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

      openLab(
        button.dataset.lab
      );

    };

  });

}



let currentLab = null;


function openLab(id) {

  const lab =
    labs.find(item => item.id === id);

  if (!lab) return;

  currentLab = lab;


  $("#labTitle").textContent =
    lab.title;


  $("#labDescription").textContent =
    lab.desc;


  $("#labDifficulty").textContent =
    `${lab.diff} • +${lab.xp} XP`;


  $("#taskQuestion").textContent =
    lab.task;


  $("#labAnswer").value = "";


  $("#labFeedback").textContent = "";

  $("#labFeedback").className =
    "lab-feedback";


  $("#hintBox").textContent =
    `💡 ${lab.hint}`;


  $("#hintBox").classList.remove(
    "show"
  );


  $("#fileName").textContent =
    "No file selected";


  $("#labModal").classList.add(
    "open"
  );


  setTimeout(() => {

    $("#labAnswer").focus();

  }, 150);

}



function closeLab() {

  $("#labModal")
    .classList
    .remove("open");

  currentLab = null;

}



function normalizeAnswer(answer) {

  return answer

    .toLowerCase()

    .trim()

    .replace(/\s+/g, " ")

    .replace(/[;"'`]/g, "");

}



function checkLabAnswer() {

  if (!currentLab) return;


  const answer =
    normalizeAnswer(
      $("#labAnswer").value
    );


  const feedback =
    $("#labFeedback");


  if (!answer) {

    feedback.className =
      "lab-feedback wrong";

    feedback.textContent =
      "❌ Enter an answer first.";

    return;

  }


  const correct =
    currentLab.answers.some(
      expected =>
        normalizeAnswer(expected)
        === answer
    );


  if (correct) {

    if (
      state.completed.includes(
        currentLab.id
      )
    ) {

      feedback.className =
        "lab-feedback correct";

      feedback.textContent =
        "✅ Correct! You already completed this lab.";

      return;

    }


    state.completed.push(
      currentLab.id
    );


    state.xp +=
      currentLab.xp;


    save();

    renderLabs();


    feedback.className =
      "lab-feedback correct";

    feedback.innerHTML =

      `✅ <strong>Correct!</strong>
       +${currentLab.xp} XP earned 🔥`;


    toast(
      `Lab completed! +${currentLab.xp} XP`
    );


    setTimeout(() => {

      closeLab();

    }, 1800);


  } else {

    feedback.className =
      "lab-feedback wrong";

    feedback.innerHTML =
      "❌ <strong>Not quite.</strong> Try again or use the hint.";

  }

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
$("#closeLab").onclick =
  closeLab;


$("#checkAnswer").onclick =
  checkLabAnswer;


$("#hintButton").onclick = () => {

  $("#hintBox")
    .classList
    .toggle("show");

};


$("#answerFile").addEventListener(
  "change",
  event => {

    const file =
      event.target.files[0];

    if (!file) return;


    $("#fileName").textContent =
      file.name;


    const reader =
      new FileReader();


    reader.onload = () => {

      $("#labAnswer").value =
        reader.result;

      toast(
        "Answer loaded from file 📎"
      );

    };


    reader.readAsText(file);

  }
);


$("#labModal").addEventListener(
  "click",
  event => {

    if (
      event.target ===
      $("#labModal")
    ) {

      closeLab();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeLab();

    }

  }
);
