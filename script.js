const SUPABASE_URL = "ТВОЙ_SUPABASE_URL";
const SUPABASE_KEY = "ТВОЙ_PUBLISHABLE_KEY";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let selectedRating = 0;


// ======================
// STAR RATING
// ======================

const stars = document.querySelectorAll(
    "#starPicker button"
);

stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating =
            Number(star.dataset.rating);

        stars.forEach(s => {

            const rating =
                Number(s.dataset.rating);

            s.classList.toggle(
                "selected",
                rating <= selectedRating
            );

        });

    });

});


// ======================
// CHARACTER COUNTER
// ======================

const commentInput =
    document.getElementById(
        "reviewComment"
    );

const charCount =
    document.getElementById(
        "charCount"
    );

commentInput.addEventListener(
    "input",
    () => {

        charCount.textContent =
            `${commentInput.value.length} / 500`;

    }
);


// ======================
// SUBMIT REVIEW
// ======================

document
    .getElementById("submitReview")
    .addEventListener("click", async () => {

        const username =
            document
                .getElementById("reviewName")
                .value
                .trim();

        const comment =
            commentInput
                .value
                .trim();


        if (selectedRating === 0) {

            alert(
                "Please choose a star rating ⭐"
            );

            return;

        }


        if (username.length < 2) {

            alert(
                "Username must contain at least 2 characters."
            );

            return;

        }


        if (comment.length < 3) {

            alert(
                "Please write a comment."
            );

            return;

        }


        const button =
            document.getElementById(
                "submitReview"
            );

        button.disabled = true;

        button.textContent =
            "POSTING...";


        const { error } =
            await db
                .from("reviews")
                .insert({

                    username: username,

                    comment: comment,

                    rating: selectedRating

                });


        if (error) {

            console.error(error);

            alert(
                "Error: " + error.message
            );

            button.disabled = false;

            button.textContent =
                "POST REVIEW →";

            return;

        }


        alert(
            "Review posted! 🔥"
        );


        document
            .getElementById("reviewName")
            .value = "";

        commentInput.value = "";

        charCount.textContent =
            "0 / 500";


        selectedRating = 0;

        stars.forEach(s =>
            s.classList.remove("selected")
        );


        button.disabled = false;

        button.textContent =
            "POST REVIEW →";


        loadReviews();

    });


// ======================
// LOAD REVIEWS
// ======================

async function loadReviews() {

    const list =
        document.getElementById(
            "reviewsList"
        );


    const { data, error } =
        await db
            .from("reviews")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        list.innerHTML = `
            <div class="review-error">
                Could not load reviews.
            </div>
        `;

        return;

    }


    if (!data || data.length === 0) {

        list.innerHTML = `
            <div class="review-empty">
                No reviews yet.<br>
                Be the first one! 👀
            </div>
        `;

        updateRating([]);

        return;

    }


    list.innerHTML =
        data.map(review => {

            const stars =
                "★".repeat(review.rating) +
                "☆".repeat(5 - review.rating);


            const date =
                new Date(
                    review.created_at
                ).toLocaleDateString();


            return `
                <div class="review-card">

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

                </div>
            `;

        }).join("");


    updateRating(data);

}


// ======================
// UPDATE RATING
// ======================

function updateRating(reviews) {

    const averageElement =
        document.getElementById(
            "averageRating"
        );

    const starsElement =
        document.getElementById(
            "averageStars"
        );

    const countElement =
        document.getElementById(
            "reviewCount"
        );


    if (reviews.length === 0) {

        averageElement.textContent =
            "0.0";

        starsElement.textContent =
            "☆☆☆☆☆";

        countElement.textContent =
            "0 reviews";

        return;

    }


    const average =
        reviews.reduce(
            (sum, review) =>
                sum + review.rating,
            0
        ) / reviews.length;


    const rounded =
        Math.round(average);


    averageElement.textContent =
        average.toFixed(1);


    starsElement.textContent =
        "★".repeat(rounded) +
        "☆".repeat(5 - rounded);


    countElement.textContent =
        `${reviews.length} ${
            reviews.length === 1
                ? "review"
                : "reviews"
        }`;

}


// ======================
// SECURITY
// ======================

function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ======================
// REFRESH
// ======================

document
    .getElementById("refreshReviews")
    .addEventListener(
        "click",
        loadReviews
    );


// START

loadReviews();
