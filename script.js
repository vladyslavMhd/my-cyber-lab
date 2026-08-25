const SUPABASE_URL =
  "https://zmcngtcppgmxtngrvzon.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";

const db =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


// ==========================
// TRANSLATIONS
// ==========================

const translations = {

  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_labs: "Labs",
    nav_projects: "Projects",
    nav_terminal: "Terminal",
    nav_reviews: "Reviews",

    hero_status: "CYBERSECURITY / LEARNING / BUILDING",
    hero_text: "Welcome to my personal cyber laboratory — a place where I learn cybersecurity, build projects and experiment with safe, legal security challenges.",
    hero_labs: "Explore Labs →",
    hero_about: "About Me",
    age: "YEARS OLD",
    labs_done: "LABS DONE",
    level: "CYBER LEVEL",

    system_online: "SYSTEM ONLINE",
    completed: "COMPLETED",
    streak: "DAY STREAK",

    builder: "builder.",
    about_1: "I'm Vlad, I'm 16, and I'm really into cybersecurity.",
    about_2: "I like learning how systems work, practicing in controlled environments, using Linux and building projects that help me understand security better.",
    about_3: "This website is my personal cyber corner — a portfolio, learning space and laboratory.",

    labs_description: "Safe browser-based mini labs. Everything runs locally in your browser."
  },

  nl: {
    nav_about: "Over mij",
    nav_skills: "Vaardigheden",
    nav_labs: "Labs",
    nav_projects: "Projecten",
    nav_terminal: "Terminal",
    nav_reviews: "Reviews",

    hero_status: "CYBERSECURITY / LEREN / BOUWEN",
    hero_text: "Welkom in mijn persoonlijke cyberlaboratorium — een plek waar ik cybersecurity leer, projecten bouw en veilig experimenteer met security-uitdagingen.",
    hero_labs: "Bekijk Labs →",
    hero_about: "Over mij",
    age: "JAAR OUD",
    labs_done: "LABS GEDAAN",
    level: "CYBER LEVEL",

    system_online: "SYSTEEM ONLINE",
    completed: "VOLTOOID",
    streak: "DAGENREeks",

    builder: "bouwer.",
    about_1: "Ik ben Vlad, ik ben 16 jaar oud en ik ben erg geïnteresseerd in cybersecurity.",
    about_2: "Ik leer graag hoe systemen werken, oefen in gecontroleerde omgevingen, gebruik Linux en bouw projecten om security beter te begrijpen.",
    about_3: "Deze website is mijn persoonlijke cyberplek — een portfolio, leeromgeving en laboratorium.",

    labs_description: "Veilige browserlabs. Alles draait lokaal in je browser."
  },

  ua: {
    nav_about: "Про мене",
    nav_skills: "Навички",
    nav_labs: "Лабораторії",
    nav_projects: "Проєкти",
    nav_terminal: "Термінал",
    nav_reviews: "Відгуки",

    hero_status: "КІБЕРБЕЗПЕКА / НАВЧАННЯ / РОЗРОБКА",
    hero_text: "Ласкаво просимо до моєї особистої кіберлабораторії — місця, де я вивчаю кібербезпеку, створюю проєкти та безпечно експериментую.",
    hero_labs: "Відкрити Labs →",
    hero_about: "Про мене",
    age: "РОКІВ",
    labs_done: "ЛАБ ПРОЙДЕНО",
    level: "КІБЕР РІВЕНЬ",

    system_online: "СИСТЕМА ONLINE",
    completed: "ВИКОНАНО",
    streak: "ДНІВ СЕРІЇ",

    builder: "розробника.",
    about_1: "Я Влад, мені 16 років, і я дуже цікавлюся кібербезпекою.",
    about_2: "Мені подобається вивчати роботу систем, практикуватися в контрольованих середовищах, використовувати Linux та створювати власні проєкти.",
    about_3: "Цей сайт — мій особистий кіберпростір, портфоліо та лабораторія.",

    labs_description: "Безпечні лабораторії, які працюють прямо у твоєму браузері."
  }

};


let currentLanguage =
  localStorage.getItem("cyber-language") || "en";


function applyLanguage(language) {

  currentLanguage =
    language;

  localStorage.setItem(
    "cyber-language",
    language
  );

  document.documentElement.lang =
    language;

  document.querySelectorAll(
    "[data-i18n]"
  ).forEach(element => {

    const key =
      element.dataset.i18n;

    if (
      translations[language] &&
      translations[language][key]
    ) {

      element.textContent =
        translations[language][key];

    }

  });

  document.querySelector("#language").value =
    language;
}


// ==========================
// STATE
// ==========================

let completedLabs =
  Number(
    localStorage.getItem(
      "cyber-labs"
    ) || 0
  );

let selectedRating = 0;


// ==========================
// INIT
// ==========================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyLanguage(
      currentLanguage
    );

    initReveal();
    initCursor();
    initTheme();
    initMobileMenu();
    initParticles();
    initLabs();
    initReviews();
    initTerminal();
    updateDashboard();

  }
);


// ==========================
// LANGUAGE
// ==========================

document.querySelector("#language")
  .addEventListener(
    "change",
    event => {

      applyLanguage(
        event.target.value
      );

    }
  );


// ==========================
// THEME
// ==========================

function initTheme() {

  const saved =
    localStorage.getItem(
      "cyber-theme"
    ) || "dark";

  document.body.dataset.theme =
    saved;

  $("#themeBtn").textContent =
    saved === "light"
      ? "☀"
      : "☾";


  $("#themeBtn").onclick =
    () => {

      const newTheme =
        document.body.dataset.theme === "light"
          ? "dark"
          : "light";

      document.body.dataset.theme =
        newTheme;

      localStorage.setItem(
        "cyber-theme",
        newTheme
      );

      $("#themeBtn").textContent =
        newTheme === "light"
          ? "☀"
          : "☾";

    };

}


// ==========================
// MOBILE
// ==========================

function initMobileMenu() {

  $("#mobileMenu").onclick =
    () => {

      $("#mobileNav")
        .classList
        .toggle("open");

    };


  $$("#mobileNav a")
    .forEach(link => {

      link.onclick =
        () => {

          $("#mobileNav")
            .classList
            .remove("open");

        };

    });

}


// ==========================
// REVEAL
// ==========================

function initReveal() {

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
        threshold: .08
      }
    );


  $$(".reveal")
    .forEach(
      el =>
        observer.observe(el)
    );

}


// ==========================
// CURSOR
// ==========================

function initCursor() {

  const glow =
    $(".cursor-glow");


  window.addEventListener(
    "pointermove",
    event => {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    }
  );

}


// ==========================
// PARTICLES
// ==========================

function initParticles() {

  const container =
    $("#particles");


  for (
    let i = 0;
    i < 25;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 10 + "s";

    particle.style.animationDuration =
      7 + Math.random() * 10 + "s";

    container.appendChild(
      particle
    );

  }

}


// ==========================
// DASHBOARD
// ==========================

function updateDashboard() {

  const xp =
    completedLabs * 10;

  const level =
    Math.floor(
      xp / 100
    ) + 1;

  const levelXP =
    xp % 100;


  $("#dashLabs")
    .textContent =
    completedLabs;

  $("#heroLabs")
    .textContent =
    completedLabs;

  $("#heroLevel")
    .textContent =
    String(level)
      .padStart(2, "0");

  $("#levelText")
    .textContent =
    `LVL ${String(level).padStart(2, "0")}`;

  $("#xpText")
    .textContent =
    `${levelXP} / 100 XP`;

  $("#xpFill")
    .style.width =
    levelXP + "%";

}


// ==========================
// LABS
// ==========================

const labTitles = {

  password: "Password Strength",
  base64: "Base64 Lab",
  caesar: "Caesar Cipher",
  hash: "SHA-256 Hash",
  jwt: "JWT Decoder",
  url: "URL Analyzer",
  regex: "Regex Playground",
  binary: "Binary / Hex",
  xss: "XSS Awareness",
  headers: "HTTP Headers"

};


function initLabs() {

  $$(".lab-btn")
    .forEach(button => {

      button.onclick =
        () =>
          openLab(
            button.dataset.lab
          );

    });


  $("#closeModal").onclick =
    closeLab;


  $("#labModal").onclick =
    event => {

      if (
        event.target.id ===
        "labModal"
      )
        closeLab();

    };

}


function openLab(type) {

  const content =
    $("#modalContent");


  const builders = {

    password:
      passwordLab,

    base64:
      base64Lab,

    caesar:
      caesarLab,

    hash:
      hashLab,

    jwt:
      jwtLab,

    url:
      urlLab,

    regex:
      regexLab,

    binary:
      binaryLab,

    xss:
      xssLab,

    headers:
      headersLab

  };


  content.innerHTML =
    `<h2 class="modal-title">
      ${labTitles[type]}
    </h2>
    <p class="modal-sub">
      Safe educational browser laboratory.
    </p>
    ${builders[type]()}`;


  $("#labModal")
    .classList
    .add("open");


  $("#labModal")
    .setAttribute(
      "aria-hidden",
      "false"
    );


  bindLab(type);

}


function closeLab() {

  $("#labModal")
    .classList
    .remove("open");

}


// ==========================
// LAB UI
// ==========================

function input(
  id,
  placeholder,
  type = "text"
) {

  return `
    <input
      id="${id}"
      class="lab-input"
      type="${type}"
      placeholder="${placeholder}">
  `;

}


function output() {

  return `
    <div id="labOutput"
         class="lab-output">
      Waiting for input...
    </div>
  `;

}


function buttons(
  buttonsHTML
) {

  return `
    <div class="modal-actions">
      ${buttonsHTML}
    </div>
  `;

}


// ==========================
// PASSWORD
// ==========================

function passwordLab() {

  return `
    ${input(
      "labInput",
      "Type a test password...",
      "password"
    )}

    ${output()}
  `;

}


// ==========================
// BASE64
// ==========================

function base64Lab() {

  return `
    <textarea
      id="labInput"
      class="lab-input"
      placeholder="Text..."></textarea>

    ${buttons(`
      <button id="encodeBtn">ENCODE</button>
      <button id="decodeBtn" class="alt">DECODE</button>
    `)}

    ${output()}
  `;

}


// ==========================
// CAESAR
// ==========================

function caesarLab() {

  return `
    ${input(
      "labInput",
      "HELLO WORLD"
    )}

    ${input(
      "shiftInput",
      "Shift",
      "number"
    )}

    ${buttons(`
      <button id="encryptBtn">SHIFT TEXT</button>
    `)}

    ${output()}
  `;

}


// ==========================
// HASH
// ==========================

function hashLab() {

  return `
    ${input(
      "labInput",
      "Text to hash..."
    )}

    ${buttons(`
      <button id="hashBtn">HASH</button>
    `)}

    ${output()}
  `;

}


// ==========================
// JWT
// ==========================

function jwtLab() {

  return `
    ${input(
      "labInput",
      "Paste JWT..."
    )}

    ${buttons(`
      <button id="jwtBtn">DECODE</button>
    `)}

    ${output()}
  `;

}


// ==========================
// URL
// ==========================

function urlLab() {

  return `
    ${input(
      "labInput",
      "https://example.com/path?x=1"
    )}

    ${buttons(`
      <button id="urlBtn">ANALYZE</button>
    `)}

    ${output()}
  `;

}


// ==========================
// REGEX
// ==========================

function regexLab() {

  return `
    ${input(
      "regexInput",
      "Regex e.g. ^hello"
    )}

    ${input(
      "labInput",
      "Text to test..."
    )}

    ${buttons(`
      <button id="regexBtn">TEST</button>
    `)}

    ${output()}
  `;

}


// ==========================
// BINARY
// ==========================

function binaryLab() {

  return `
    ${input(
      "labInput",
      "Hello"
    )}

    ${buttons(`
      <button id="binaryBtn">CONVERT</button>
    `)}

    ${output()}
  `;

}


// ==========================
// XSS AWARENESS
// ==========================

function xssLab() {

  return `
    ${input(
      "labInput",
      "<script>alert('test')</script>"
    )}

    ${buttons(`
      <button id="xssBtn">SAFE PREVIEW</button>
    `)}

    ${output()}
  `;

}


// ==========================
// HEADERS
// ==========================

function headersLab() {

  return `
    <select id="headerSelect" class="lab-input">
      <option>Content-Security-Policy</option>
      <option>Strict-Transport-Security</option>
      <option>X-Content-Type-Options</option>
      <option>Referrer-Policy</option>
      <option>Permissions-Policy</option>
    </select>

    ${buttons(`
      <button id="headerBtn">EXPLAIN</button>
    `)}

    ${output()}
  `;

}


// ==========================
// LAB BINDINGS
// ==========================

function bindLab(type) {

  if (
    type === "password"
  ) {

    $("#labInput").oninput =
      passwordStrength;

  }


  if (
    type === "base64"
  ) {

    $("#encodeBtn").onclick =
      () => {

        try {

          $("#labOutput")
            .textContent =
            btoa(
              unescape(
                encodeURIComponent(
                  $("#labInput").value
                )
              )
            );

          completed();

        } catch {

          $("#labOutput")
            .textContent =
            "Encoding error.";

        }

      };


    $("#decodeBtn").onclick =
      () => {

        try {

          $("#labOutput")
            .textContent =
            decodeURIComponent(
              escape(
                atob(
                  $("#labInput").value
                )
              )
            );

          completed();

        } catch {

          $("#labOutput")
            .textContent =
            "Invalid Base64.";

        }

      };

  }


  if (
    type === "caesar"
  ) {

    $("#encryptBtn").onclick =
      () => {

        $("#labOutput")
          .textContent =
          caesar(
            $("#labInput").value,
            Number(
              $("#shiftInput").value || 3
            )
          );

        completed();

      };

  }


  if (
    type === "hash"
  ) {

    $("#hashBtn").onclick =
      async () => {

        const bytes =
          new TextEncoder()
            .encode(
              $("#labInput").value
            );


        const hash =
          await crypto.subtle.digest(
            "SHA-256",
            bytes
          );


        $("#labOutput")
          .textContent =
          [...new Uint8Array(hash)]
            .map(
              x =>
                x
                  .toString(16)
                  .padStart(2, "0")
            )
            .join("");

        completed();

      };

  }


  if (
    type === "jwt"
  ) {

    $("#jwtBtn").onclick =
      () => {

        try {

          const parts =
            $("#labInput")
              .value
              .split(".");

          if (
            parts.length !== 3
          )
            throw new Error(
              "JWT must contain 3 parts."
            );


          const header =
            JSON.parse(
              decodeBase64URL(
                parts[0]
              )
            );


          const payload =
            JSON.parse(
              decodeBase64URL(
                parts[1]
              )
            );


          $("#labOutput")
            .textContent =
            JSON.stringify(
              {
                header,
                payload
              },
              null,
              2
            );

          completed();

        } catch(error) {

          $("#labOutput")
            .textContent =
            "Invalid JWT: " +
            error.message;

        }

      };

  }


  if (
    type === "url"
  ) {

    $("#urlBtn").onclick =
      () => {

        try {

          const u =
            new URL(
              $("#labInput").value
            );


          $("#labOutput")
            .textContent =
            [
              `Protocol: ${u.protocol}`,
              `Host: ${u.host}`,
              `Hostname: ${u.hostname}`,
              `Port: ${u.port || "default"}`,
              `Path: ${u.pathname}`,
              `Query: ${u.search || "none"}`
            ].join("\n");

          completed();

        } catch {

          $("#labOutput")
            .textContent =
            "Invalid URL.";

        }

      };

  }


  if (
    type === "regex"
  ) {

    $("#regexBtn").onclick =
      () => {

        try {

          const regex =
            new RegExp(
              $("#regexInput").value
            );

          const text =
            $("#labInput").value;

          const match =
            regex.test(text);

          $("#labOutput")
            .textContent =
            match
              ? "MATCH ✓"
              : "NO MATCH ✕";

          completed();

        } catch {

          $("#labOutput")
            .textContent =
            "Invalid regular expression.";

        }

      };

  }


  if (
    type === "binary"
  ) {

    $("#binaryBtn").onclick =
      () => {

        const text =
          $("#labInput").value;

        const binary =
          [...text]
            .map(
              char =>
                char
                  .charCodeAt(0)
                  .toString(2)
                  .padStart(8, "0")
            )
            .join(" ");

        const hex =
          [...text]
            .map(
              char =>
                char
                  .charCodeAt(0)
                  .toString(16)
                  .padStart(2, "0")
            )
            .join(" ");

        $("#labOutput")
          .textContent =
          `BINARY:\n${binary}\n\nHEX:\n${hex}`;

        completed();

      };

  }


  if (
    type === "xss"
  ) {

    $("#xssBtn").onclick =
      () => {

        const text =
          $("#labInput").value;

        $("#labOutput")
          .textContent =
          `SAFE TEXT PREVIEW:\n\n${text}\n\n`
          +
          "Notice: the input was rendered as text, not HTML.";

        completed();

      };

  }


  if (
    type === "headers"
  ) {

    $("#headerBtn").onclick =
      () => {

        const explanations = {

          "Content-Security-Policy":
            "Controls which resources a browser is allowed to load.",

          "Strict-Transport-Security":
            "Tells browsers to use HTTPS for the site.",

          "X-Content-Type-Options":
            "Helps prevent MIME type sniffing.",

          "Referrer-Policy":
            "Controls how much referrer information browsers send.",

          "Permissions-Policy":
            "Controls access to browser features such as camera or microphone."

        };


        const key =
          $("#headerSelect").value;


        $("#labOutput")
          .textContent =
          explanations[key];

        completed();

      };

  }

}


// ==========================
// LAB HELPERS
// ==========================

function completed() {

  completedLabs++;

  localStorage.setItem(
    "cyber-labs",
    completedLabs
  );

  updateDashboard();

  toast(
    "+10 XP ⚡"
  );

}


function passwordStrength(event) {

  const p =
    event.target.value;

  let score = 0;

  if (p.length >= 8) score++;
  if (p.length >= 12) score++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;

  const labels = [
    "Very weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very strong"
  ];

  $("#labOutput")
    .textContent =
    p
      ? `${labels[score]} (${score}/5)`
      : "Waiting for input...";

}


function caesar(
  text,
  shift
) {

  return [...text]
    .map(char => {

      const code =
        char.charCodeAt(0);

      let base;

      if (
        code >= 65 &&
        code <= 90
      )
        base = 65;

      else if (
        code >= 97 &&
        code <= 122
      )
        base = 97;

      else
        return char;

      return String.fromCharCode(
        (
          code -
          base +
          shift +
          26
        ) % 26 + base
      );

    })
    .join("");

}


function decodeBase64URL(value) {

  value =
    value
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  while (
    value.length % 4
  )
    value += "=";

  return decodeURIComponent(
    escape(
      atob(value)
    )
  );

}


// ==========================
// TERMINAL
// ==========================

function initTerminal() {

  $("#terminalInput")
    .addEventListener(
      "keydown",
      event => {

        if (
          event.key !== "Enter"
        )
          return;

        const command =
          event.target.value
            .trim()
            .toLowerCase();

        event.target.value = "";

        runCommand(command);

      }
    );

}


function runCommand(command) {

  const output =
    $("#terminalOutput");


  const line =
    document.createElement(
      "p"
    );

  line.innerHTML =
    `<span class="green">
      vlad@cyberlab:~$
    </span> ${escapeHTML(command)}`;

  output.appendChild(
    line
  );


  const responses = {

    help:
      "Commands: help, about, skills, labs, projects, whoami, clear",

    whoami:
      "vlad — 16-year-old cybersecurity learner.",

    about:
      "Learning cybersecurity, Linux, web security and programming.",

    skills:
      "Linux 85% · Web Security 70% · Networking 65% · Python 60%",

    labs:
      "10 safe browser laboratories available.",

    projects:
      "My Cyber Lab · Kali Linux Lab · NetHunter Project"

  };


  if (
    command === "clear"
  ) {

    output.innerHTML = "";
    return;

  }


  const response =
    responses[command];


  const responseLine =
    document.createElement(
      "p"
    );


  responseLine.className =
    "muted";


  responseLine.textContent =
    response ||
    `Command not found: ${command}`;


  output.appendChild(
    responseLine
  );


  output.scrollTop =
    output.scrollHeight;

}


// ==========================
// REVIEWS
// ==========================

function initReviews() {

  $$("#starPicker button")
    .forEach(star => {

      star.onclick =
        () => {

          selectedRating =
            Number(
              star.dataset.rating
            );

          paintStars(
            selectedRating
          );

        };

    });


  $("#reviewComment")
    .addEventListener(
      "input",
      event => {

        $("#charCount")
          .textContent =
          `${event.target.value.length} / 500`;

      }
    );


  $("#submitReview").onclick =
    submitReview;


  $("#refreshReviews").onclick =
    loadReviews;


  loadReviews();

}


function paintStars(amount) {

  $$("#starPicker button")
    .forEach(star => {

      star.classList.toggle(
        "selected",
        Number(
          star.dataset.rating
        ) <= amount
      );

    });

}


async function loadReviews() {

  const list =
    $("#reviewsList");


  list.innerHTML =
    `<div class="loading">
      LOADING COMMUNITY...
    </div>`;


  const {
    data,
    error
  } =
    await db
      .from("reviews")
      .select(
        "id, username, comment, rating, created_at"
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      )
      .limit(30);


  if (error) {

    list.innerHTML =
      `<div class="review-error">
        ${escapeHTML(
          error.message
        )}
      </div>`;

    return;

  }


  renderReviews(
    data || []
  );

  updateRating(
    data || []
  );

}


function renderReviews(reviews) {

  const list =
    $("#reviewsList");


  if (
    !reviews.length
  ) {

    list.innerHTML =
      `<div class="review-empty">
        NO REVIEWS YET.<br><br>
        Be the first one 👀
      </div>`;

    return;

  }


  list.innerHTML =
    reviews
      .map(review => {

        const stars =
          "★".repeat(
            Number(
              review.rating
            )
          ) +
          "☆".repeat(
            5 -
            Number(
              review.rating
            )
          );


        const date =
          new Date(
            review.created_at
          )
          .toLocaleDateString(
            undefined,
            {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }
          );


        return `
          <article class="review-card">

            <div class="review-card-top">

              <div>
                <div class="review-user">
                  ${escapeHTML(
                    review.username
                  )}
                </div>

                <div class="review-date">
                  ${date}
                </div>
              </div>

              <div class="review-stars">
                ${stars}
              </div>

            </div>

            <p>
              ${escapeHTML(
                review.comment
              )}
            </p>

          </article>
        `;

      })
      .join("");

}


function updateRating(reviews) {

  const count =
    reviews.length;


  const average =
    count
      ? reviews.reduce(
          (sum, r) =>
            sum +
            Number(r.rating),
          0
        ) / count
      : 0;


  const rounded =
    Math.round(
      average
    );


  $("#averageRating")
    .textContent =
    average.toFixed(1);


  $("#averageStars")
    .textContent =
    "★".repeat(
      rounded
    ) +
    "☆".repeat(
      5 - rounded
    );


  $("#reviewCount")
    .textContent =
    `${count} ${
      count === 1
        ? "review"
        : "reviews"
    }`;

}


async function submitReview() {

  const username =
    $("#reviewName")
      .value
      .trim();

  const comment =
    $("#reviewComment")
      .value
      .trim();


  if (
    selectedRating < 1
  ) {

    toast(
      "Choose a rating ⭐"
    );

    return;

  }


  if (
    username.length < 2 ||
    username.length > 30
  ) {

    toast(
      "Username must be 2–30 characters."
    );

    return;

  }


  if (
    comment.length < 3
  ) {

    toast(
      "Write a longer comment."
    );

    return;

  }


  const button =
    $("#submitReview");


  button.disabled =
    true;

  button.textContent =
    "POSTING...";


  const {
    error
  } =
    await db
      .from("reviews")
      .insert({
        username,
        comment,
        rating:
          selectedRating
      });


  button.disabled =
    false;

  button.textContent =
    "POST REVIEW →";


  if (error) {

    toast(
      "Error: " +
      error.message
    );

    return;

  }


  $("#reviewName")
    .value = "";

  $("#reviewComment")
    .value = "";

  $("#charCount")
    .textContent =
    "0 / 500";


  selectedRating = 0;

  paintStars(0);

  toast(
    "Review posted 🔥"
  );

  loadReviews();

}


// ==========================
// UTILS
// ==========================

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function toast(message) {

  const el =
    $("#toast");

  el.textContent =
    message;

  el.classList.add(
    "show"
  );

  clearTimeout(
    window.toastTimer
  );

  window.toastTimer =
    setTimeout(
      () =>
        el.classList.remove(
          "show"
        ),
      3000
    );

}


function $(selector) {

  return document.querySelector(
    selector
  );

}


function $$(selector) {

  return [
    ...document.querySelectorAll(
      selector
    )
  ];

}
