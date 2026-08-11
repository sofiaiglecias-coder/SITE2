/* =========================================================
ACOLHE+ — PORTAL DE APOIO AO ESTUDANTE
JAVASCRIPT PRINCIPAL
========================================================= */

/* =========================================================
MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
menuToggle.addEventListener("click", () => {
const isOpen = mainNav.classList.toggle("open");

```
    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu quando o usuário clica em um link
mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});
```

}

/* =========================================================
BOTÃO VOLTAR AO TOPO
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

```
const updateBackToTop = () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
};

window.addEventListener("scroll", updateBackToTop);

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

updateBackToTop();
```

}

/* =========================================================
ACESSIBILIDADE — TAMANHO DA FONTE
========================================================= */

let fontSize = 100;

const increaseFont = document.getElementById("fontIncrease");
const decreaseFont = document.getElementById("fontDecrease");

function updateFontSize() {
document.documentElement.style.fontSize = `${fontSize}%`;
}

if (increaseFont) {
increaseFont.addEventListener("click", () => {

```
    if (fontSize < 130) {
        fontSize += 5;
        updateFontSize();
    }

});
```

}

if (decreaseFont) {
decreaseFont.addEventListener("click", () => {

```
    if (fontSize > 85) {
        fontSize -= 5;
        updateFontSize();
    }

});
```

}

/* =========================================================
ALTO CONTRASTE
========================================================= */

const contrastToggle = document.getElementById("contrastToggle");

if (contrastToggle) {

```
contrastToggle.addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

    const active =
        document.body.classList.contains("high-contrast");

    contrastToggle.setAttribute(
        "aria-pressed",
        active ? "true" : "false"
    );

});
```

}

/* =========================================================
MODO ESCURO
========================================================= */

const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {

```
darkToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const active =
        document.body.classList.contains("dark-mode");

    darkToggle.setAttribute(
        "aria-pressed",
        active ? "true" : "false"
    );

});
```

}

/* =========================================================
CARROSSEL
========================================================= */

const carouselTrack =
document.getElementById("carouselTrack");

const prevSlide =
document.getElementById("prevSlide");

const nextSlide =
document.getElementById("nextSlide");

const dots =
document.querySelectorAll(".dot");

let currentSlide = 0;

const totalSlides = 3;

function updateCarousel() {

```
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

    dot.setAttribute(
        "aria-current",
        index === currentSlide ? "true" : "false"
    );

});
```

}

function nextCarouselSlide() {

```
currentSlide++;

if (currentSlide >= totalSlides) {
    currentSlide = 0;
}

updateCarousel();
```

}

function previousCarouselSlide() {

```
currentSlide--;

if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
}

updateCarousel();
```

}

if (nextSlide) {
nextSlide.addEventListener(
"click",
nextCarouselSlide
);
}

if (prevSlide) {
prevSlide.addEventListener(
"click",
previousCarouselSlide
);
}

dots.forEach((dot, index) => {

```
dot.addEventListener("click", () => {

    currentSlide = index;

    updateCarousel();

});
```

});

/* =========================================================
CARROSSEL AUTOMÁTICO
========================================================= */

let carouselInterval;

function startCarousel() {

```
if (!carouselTrack) {
    return;
}

carouselInterval = setInterval(() => {
    nextCarouselSlide();
}, 6000);
```

}

function stopCarousel() {

```
if (carouselInterval) {
    clearInterval(carouselInterval);
}
```

}

if (carouselTrack) {

```
startCarousel();

carouselTrack.addEventListener(
    "mouseenter",
    stopCarousel
);

carouselTrack.addEventListener(
    "mouseleave",
    startCarousel
);
```

}

/* =========================================================
PORTAL DE ESCUTA
========================================================= */

const listeningForm =
document.getElementById("listeningForm");

const successMessage =
document.getElementById("successMessage");

const newMessage =
document.getElementById("newMessage");

if (listeningForm && successMessage) {

```
listeningForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        /*
         * IMPORTANTE:
         * Nenhum dado é salvo.
         * Não existe localStorage,
         * banco de dados ou servidor.
         */

        listeningForm.style.display = "none";

        successMessage.classList.add("show");

        successMessage.setAttribute(
            "aria-live",
            "polite"
        );

    }
);
```

}

if (newMessage && listeningForm && successMessage) {

```
newMessage.addEventListener("click", () => {

    successMessage.classList.remove("show");

    listeningForm.reset();

    listeningForm.style.display = "block";

    listeningForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
```

}

/* =========================================================
QUIZ
========================================================= */

const quizForm =
document.getElementById("quizForm");

if (quizForm) {

```
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


/*
 * Respostas corretas:
 *
 * 1 = C
 * 2 = B
 * 3 = C
 * 4 = B
 * 5 = C
 */

const correctAnswers = [
    "C",
    "B",
    "C",
    "B",
    "C"
];


/* -----------------------------------------
   MOSTRAR PERGUNTA
   ----------------------------------------- */

function showQuestion(index) {

    questions.forEach((question, i) => {

        question.classList.toggle(
            "active-question",
            i === index
        );

    });


    if (currentQuestion) {
        currentQuestion.textContent =
            index + 1;
    }


    if (progressBar && questions.length > 0) {

        const progress =
            ((index + 1) / questions.length) * 100;

        progressBar.style.width =
            `${progress}%`;
    }


    if (previousButton) {

        previousButton.style.visibility =
            index === 0
                ? "hidden"
                : "visible";
    }


    if (nextButton && finishButton) {

        if (index === questions.length - 1) {

            nextButton.style.display =
                "none";

            finishButton.style.display =
                "inline-flex";

        } else {

            nextButton.style.display =
                "inline-flex";

            finishButton.style.display =
                "none";
        }
    }
}


/* -----------------------------------------
   VERIFICAR RESPOSTA ATUAL
   ----------------------------------------- */

function getCurrentAnswer() {

    const question =
        questions[questionIndex];

    if (!question) {
        return null;
    }

    return question.querySelector(
        "input[type='radio']:checked"
    );
}


/* -----------------------------------------
   PRÓXIMA PERGUNTA
   ----------------------------------------- */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            const answer =
                getCurrentAnswer();

            if (!answer) {

                alert(
                    "Escolha uma alternativa antes de continuar. 💛"
                );

                return;
            }


            if (
                questionIndex <
                questions.length - 1
            ) {

                questionIndex++;

                showQuestion(
                    questionIndex
                );
            }

        }
    );
}


/* -----------------------------------------
   PERGUNTA ANTERIOR
   ----------------------------------------- */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        () => {

            if (questionIndex > 0) {

                questionIndex--;

                showQuestion(
                    questionIndex
                );
            }

        }
    );
}


/* -----------------------------------------
   FINALIZAR QUIZ
   ----------------------------------------- */

quizForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const answer =
            getCurrentAnswer();


        if (!answer) {

            alert(
                "Escolha uma alternativa antes de ver o resultado. 💛"
            );

            return;
        }


        let score = 0;


        correctAnswers.forEach(
            (correctAnswer, index) => {

                const selected =
                    quizForm.querySelector(
                        `input[name="q${index + 1}"]:checked`
                    );


                if (
                    selected &&
                    selected.value ===
                    correctAnswer
                ) {

                    score++;
                }

            }
        );


        if (scoreElement) {
            scoreElement.textContent =
                score;
        }


        if (resultMessage) {

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
        }


        quizForm.style.display =
            "none";


        if (quizResult) {

            quizResult.classList.add(
                "show"
            );

            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    }
);


/* -----------------------------------------
   REFAZER QUIZ
   ----------------------------------------- */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            quizForm.reset();

            questionIndex = 0;

            if (quizResult) {
                quizResult.classList.remove(
                    "show"
                );
            }

            quizForm.style.display =
                "block";

            showQuestion(0);

            quizForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );
}


// Inicia na primeira pergunta
showQuestion(0);
```

}

/* =========================================================
ANIMAÇÃO DE ENTRADA DAS SEÇÕES
========================================================= */

const animatedElements =
document.querySelectorAll(
".feature-card, .reference-card, .motivation-grid article"
);

if (
animatedElements.length > 0 &&
"IntersectionObserver" in window
) {

```
const observer =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    observer.observe(element);

});
```

} else {

```
animatedElements.forEach(element => {

    element.classList.add("visible");

});
```

}

/* =========================================================
EFEITO DE HOVER NOS CARDS
========================================================= */

const cards =
document.querySelectorAll(
".feature-card, .reference-card, .motivation-grid article"
);

cards.forEach(card => {

```
card.addEventListener(
    "mouseenter",
    () => {

        card.style.zIndex = "2";

    }
);


card.addEventListener(
    "mouseleave",
    () => {

        card.style.zIndex = "1";

    }
);
```

});

/* =========================================================
SCROLL SUAVE PARA LINKS INTERNOS
========================================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(link => {

```
    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
```

/* =========================================================
ATUALIZA O ANO AUTOMATICAMENTE
========================================================= */

const yearElements =
document.querySelectorAll(
"[data-current-year]"
);

yearElements.forEach(element => {

```
element.textContent =
    new Date().getFullYear();
```

});

/* =========================================================
ACESSIBILIDADE — TECLADO
========================================================= */

document.addEventListener(
"keydown",
event => {

```
    // ESC fecha o menu mobile
    if (
        event.key === "Escape" &&
        mainNav &&
        mainNav.classList.contains("open")
    ) {

        mainNav.classList.remove("open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuToggle.textContent = "☰";
        }
    }

}
```

);

/* =========================================================
FINALIZAÇÃO
========================================================= */

console.log(
"Acolhe+ carregado com sucesso 💛🌈"
);
