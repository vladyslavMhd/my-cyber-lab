const SUPABASE_URL =
  "https://zmcngtcppgmxtngrvzon.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";

const db =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


document.addEventListener(
  "DOMContentLoaded",
  () => {

    initReveal();
    initCursor();
    initReviews();
    initLabs();

  }
);


// ==========================
// ANIMATIONS
// ==========================

function initReveal() {

  const elements =
    $$(".reveal");

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

          }

        });

      },
      {
        threshold: 0.08
      }
    );

  elements.forEach(
    element =>
      observer.observe(element)
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
// REVIEWS
// ==========================

let selectedRating = 0;


function initReviews() {

  $$("#starPicker button")
    .forEach(star => {

      star.addEventListener(
        "mouseenter",
        () => {

          paintStars(
            Number(
              star.dataset.rating
            )
          );

        }
      );


      star.addEventListener(
        "mouseleave",
        () => {

          paintStars(
            selectedRating
          );

        }
      );


      star.addEventListener(
        "click",
        () => {

          selectedRating =
            Number(
              star.dataset.rating
            );

          paintStars(
            selectedRating
          );

        }
      );

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


  $("#submitReview")
    .addEventListener(
      "click",
      submitReview
    );


  $("#refreshReviews")
    .addEventListener(
      "click",
      loadReviews
    );


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
  } = await db

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

    console.error(error);

    list.innerHTML =
      `<div class="review-error">
        Could not load reviews.<br>
        <small>
          ${escapeHTML(
            error.message
          )}
        </small>
      </div>`;

    updateRating([]);

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


  if (!reviews.length) {

    list.innerHTML =
      `<div class="review-empty">
        NO REVIEWS YET.<br><br>
        Be the first one 👀
      </div>`;

    return;

  }


  list.innerHTML =
    reviews.map(review => {

      const stars =
        "★".repeat(
          review.rating
        ) +
        "☆".repeat(
          5 - review.rating
        );


      const date =
        new Date(
          review.created_at
        ).toLocaleDateString(
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

    }).join("");

}


function updateRating(reviews) {

  const count =
    reviews.length;


  const average =
    count
      ? reviews.reduce(
          (sum, review) =>
            sum +
            Number(
              review.rating
            ),
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


// ==========================
// POST REVIEW
// ==========================

async function submitReview() {

  const username =
    $("#reviewName")
      .value
      .trim();


  const comment =
    $("#reviewComment")
      .value
      .trim();


  const button =
    $("#submitReview");


  if (!selectedRating) {

    toast(
      "Choose a star rating first ⭐"
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
    comment.length < 3 ||
    comment.length > 500
  ) {

    toast(
      "Comment must be 3–500 characters."
    );

    return;

  }


  button.disabled =
    true;

  button.textContent =
    "POSTING...";


  const {
    error
  } = await db

    .from("reviews")

    .insert({

      username:
        username,

      comment:
        comment,

      rating:
        selectedRating

    });


  button.disabled =
    false;

  button.textContent =
    "POST REVIEW →";


  if (error) {

    console.error(error);

    toast(
      "Couldn't post: " +
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


  selectedRating =
    0;


  paintStars(0);


  toast(
    "Review posted 🔥"
  );


  loadReviews();

}


// ==========================
// SECURITY
// ==========================

function escapeHTML(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


// ==========================
// TOAST
// ==========================

function toast(message) {

  const element =
    $("#toast");


  element.textContent =
    message;


  element.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(
      () =>
        element.classList.remove(
          "show"
        ),
      3000
    );

}


// ==========================
// LABS
// ==========================

function initLabs() {

  $$(".lab-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          openLab(
            button.dataset.lab
          )
      );

    });


  $("#closeModal")
    .addEventListener(
      "click",
      closeLab
    );


  $("#labModal")
    .addEventListener(
      "click",
      event => {

        if (
          event.target.id ===
          "labModal"
        ) {

          closeLab();

        }

      }
    );

}


function openLab(type) {

  const modal =
    $("#labModal");

  const content =
    $("#modalContent");


  const labs = {

    password: {

      title:
        "Password Strength",

      description:
        "This test runs locally in your browser. The password is not sent to the server.",

      html:
        `
        <input
          id="labInput"
          class="lab-input"
          type="password"
          placeholder="Type a test password..."
        >

        <div
          id="labOutput"
          class="lab-output">
          Waiting for input...
        </div>
        `

    },


    base64: {

      title:
        "Base64 Lab",

      description:
        "Encode and decode text locally.",

      html:
        `
        <textarea
          id="labInput"
          class="lab-input"
          placeholder="Text..."
        ></textarea>

        <div class="modal-actions">

          <button id="encodeBtn">
            ENCODE
          </button>

          <button
            id="decodeBtn"
            class="alt">
            DECODE
          </button>

        </div>

        <div
          id="labOutput"
          class="lab-output">
        </div>
        `

    },


    caesar: {

      title:
        "Caesar Cipher",

      description:
        "Educational substitution cipher.",

      html:
        `
        <input
          id="labInput"
          class="lab-input"
          placeholder="HELLO WORLD"
        >

        <input
          id="shiftInput"
          class="lab-input"
          type="number"
          min="-25"
          max="25"
          value="3"
        >

        <div class="modal-actions">

          <button id="encryptBtn">
            SHIFT TEXT
          </button>

        </div>

        <div
          id="labOutput"
          class="lab-output">
        </div>
        `

    },


    hash: {

      title:
        "SHA-256 Hash",

      description:
        "Create a SHA-256 hash locally with Web Crypto.",

      html:
        `
        <input
          id="labInput"
          class="lab-input"
          placeholder="Text to hash..."
        >

        <div class="modal-actions">

          <button id="hashBtn">
            HASH
          </button>

        </div>

        <div
          id="labOutput"
          class="lab-output">
        </div>
        `

    }

  };


  const lab =
    labs[type];


  content.innerHTML = `

    <h2 class="modal-title">
      ${lab.title}
    </h2>

    <p class="modal-sub">
      ${lab.description}
    </p>

    ${lab.html}

  `;


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  if (
    type ===
    "password"
  ) {

    $("#labInput")
      .addEventListener(
        "input",
        passwordStrength
      );

  }


  if (
    type ===
    "base64"
  ) {

    $("#encodeBtn")
      .onclick = () => {

        const text =
          $("#labInput")
            .value;

        try {

          $("#labOutput")
            .textContent =
            btoa(
              unescape(
                encodeURIComponent(
                  text
                )
              )
            );

        } catch {

          $("#labOutput")
            .textContent =
            "Encoding error.";

        }

      };


    $("#decodeBtn")
      .onclick = () => {

        try {

          $("#labOutput")
            .textContent =
            decodeURIComponent(
              escape(
                atob(
                  $("#labInput")
                    .value
                )
              )
            );

        } catch {

          $("#labOutput")
            .textContent =
            "Invalid Base64 input.";

        }

      };

  }


  if (
    type ===
    "caesar"
  ) {

    $("#encryptBtn")
      .onclick = () => {

        $("#labOutput")
          .textContent =
          caesar(
            $("#labInput")
              .value,

            Number(
              $("#shiftInput")
                .value
            )
          );

      };

  }


  if (
    type ===
    "hash"
  ) {

    $("#hashBtn")
      .onclick =
      async () => {

        const text =
          $("#labInput")
            .value;


        const bytes =
          new TextEncoder()
            .encode(text);


        const hash =
          await crypto.subtle
            .digest(
              "SHA-256",
              bytes
            );


        $("#labOutput")
          .textContent =
          [...new Uint8Array(hash)]
            .map(
              byte =>
                byte
                  .toString(16)
                  .padStart(2, "0")
            )
            .join("");

      };

  }

}


function closeLab() {

  $("#labModal")
    .classList
    .remove("open");


  $("#labModal")
    .setAttribute(
      "aria-hidden",
      "true"
    );

}


// ==========================
// PASSWORD LAB
// ==========================

function passwordStrength(event) {

  const password =
    event.target.value;


  let score = 0;


  if (
    password.length >= 8
  )
    score++;


  if (
    password.length >= 12
  )
    score++;


  if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password)
  )
    score++;


  if (
    /\d/.test(password)
  )
    score++;


  if (
    /[^A-Za-z0-9]/.test(password)
  )
    score++;


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
    password

      ? `${labels[score]} (${score}/5)\n\n${
          password.length < 12
            ? "Tip: use a longer passphrase."
            : "Length looks good."
        }`

      : "Waiting for input...";

}


// ==========================
// CAESAR
// ==========================

function caesar(
  text,
  shift
) {

  return [...text]
    .map(character => {

      const code =
        character.charCodeAt(0);


      let base =
        null;


      if (
        code >= 65 &&
        code <= 90
      ) {

        base = 65;

      }


      else if (
        code >= 97 &&
        code <= 122
      ) {

        base = 97;

      }


      if (
        base === null
      ) {

        return character;

      }


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
