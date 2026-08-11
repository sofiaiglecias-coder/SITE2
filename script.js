/* =========================================================
   ACOLHE+ — JAVASCRIPT
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const aberto = mainNav.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ACESSIBILIDADE — TAMANHO DA FONTE
========================================================= */

let fontSize = 100;

const increaseFont = document.getElementById("fontIncrease");
const decreaseFont = document.getElementById("fontDecrease");

if (increaseFont) {

    increaseFont.addEventListener("click", () => {

        if (fontSize < 125) {
            fontSize += 5;
            document.documentElement.style.fontSize = `${fontSize}%`;
        }

    });

}

if (decreaseFont) {

    decreaseFont.addEventListener("click", () => {

        if (fontSize > 85) {
            fontSize -= 5;
            document.documentElement.style.fontSize = `${fontSize}%`;
        }

    });

}


/* =========================================================
   ALTO CONTRASTE
========================================================= */

const contrastToggle = document.getElementById("contrastToggle");

if (contrastToggle) {

    contrastToggle.addEventListener("click", () => {

        document.body.classList.toggle("high-contrast");

    });

}


/* =========================================================
   MODO ESCURO
========================================================= */

const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {

    darkToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}


/* =========================================================
   CARROSSEL
========================================================= */

const carouselTrack = document.getElementById("carouselTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function updateCarousel() {

    if (!carouselTrack) {
        return;
    }

    carouselTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}

if (nextSlide) {

    nextSlide.addEventListener("click", () => {

        currentSlide++;

        if (currentSlide >= 3) {
            currentSlide = 0;
        }

        updateCarousel();

    });

}

if (prevSlide) {

    prevSlide.addEventListener("click", () => {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = 2;
        }

        updateCarousel();

    });

}

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;
        updateCarousel();

    });

});


/* =========================================================
   CARROSSEL AUTOMÁTICO
========================================================= */

if (carouselTrack) {

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= 3) {
            currentSlide = 0;
        }

        updateCarousel();

    }, 6000);

}


/* =========================================================
   PORTAL DE ESCUTA
========================================================= */

const listeningForm = document.getElementById("listeningForm");
const successMessage = document.getElementById("successMessage");
const newMessage = document.getElementById("newMessage");

if (listeningForm) {

    listeningForm.addEventListener("submit", (event) => {

        event.preventDefault();

        listeningForm.style.display = "none";

        successMessage.classList.add("show");

    });

}

if (newMessage) {

    newMessage.addEventListener("click", () => {

        successMessage.classList.remove("show");

        listeningForm.reset();

        listeningForm.style.display = "block";

    });

}


/* =========================================================
   QUIZ
========================================================= */

const quizForm = document.getElementById("quizForm");

if (quizForm) {

    const questions =
        document.querySelectorAll(".question");

    const nextButton =
        document.getElementById("nextQuestion");

    const previousButton =
        document.getElementById("previousQuestion");

    const finishButton =
        document.getElementById("finishQuiz");

    const currentQuestion =
        document.getElementById("currentQuestion");

    const progressBar =
        document.getElementById("quizProgress");

    const quizResult =
        document.getElementById("quizResult");

    const scoreElement =
        document.getElementById("score");

    const resultMessage =
        document.getElementById("resultMessage");

    const restartButton =
        document.getElementById("restartQuiz");

    let questionIndex = 0;

    const correctAnswers = [
        "C",
        "B",
        "C",
        "B",
        "C"
    ];


    function showQuestion(index) {

        questions.forEach((question, i) => {

            question.classList.toggle(
                "active-question",
                i === index
            );

        });

        currentQuestion.textContent = index + 1;

        progressBar.style.width =
            `${((index + 1) / questions.length) * 100}%`;

        previousButton.style.visibility =
            index === 0 ? "hidden" : "visible";

        if (index === questions.length - 1) {

            nextButton.style.display = "none";
            finishButton.style.display = "inline-flex";

        } else {

            nextButton.style.display = "inline-flex";
            finishButton.style.display = "none";

        }

    }


    function respostaAtual() {

        const pergunta =
            questions[questionIndex];

        return pergunta.querySelector(
            "input[type='radio']:checked"
        );

    }


    nextButton.addEventListener("click", () => {

        if (!respostaAtual()) {

            alert("Escolha uma alternativa antes de continuar. 💛");
            return;

        }

        if (questionIndex < questions.length - 1) {

            questionIndex++;
            showQuestion(questionIndex);

        }

    });


    previousButton.addEventListener("click", () => {

        if (questionIndex > 0) {

            questionIndex--;
            showQuestion(questionIndex);

        }

    });


    quizForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!respostaAtual()) {

            alert("Escolha uma alternativa antes de ver o resultado. 💛");
            return;

        }

        let score = 0;

        correctAnswers.forEach((answer, index) => {

            const selected =
                quizForm.querySelector(
                    `input[name="q${index + 1}"]:checked`
                );

            if (selected && selected.value === answer) {
                score++;
            }

        });


        scoreElement.textContent = score;


        if (score <= 1) {

            resultMessage.textContent =
                "Continue aprendendo! Respeito e empatia são aprendizados para toda a vida. 💛";

        } else if (score <= 3) {

            resultMessage.textContent =
                "Você está no caminho certo! Continue praticando o respeito e a empatia. 🌈";

        } else {

            resultMessage.textContent =
                "Parabéns! Você demonstrou conhecer atitudes importantes para uma convivência respeitosa. 🫶";

        }


        quizForm.style.display = "none";
        quizResult.classList.add("show");

    });


    restartButton.addEventListener("click", () => {

        quizForm.reset();

        questionIndex = 0;

        quizResult.classList.remove("show");

        quizForm.style.display = "block";

        showQuestion(0);

    });


    showQuestion(0);

}


/* =========================================================
   ANIMAÇÃO DE ENTRADA DAS SEÇÕES
========================================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        },
        {
            threshold: .1
        }
    );


document.querySelectorAll(
    ".feature-card, .reference-card, .motivation-grid article"
).forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});