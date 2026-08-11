/* =========================================================
   ACOLHE+ | JAVASCRIPT PRINCIPAL
   Menu, acessibilidade, formulário, quiz, carrossel e animações
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            });
        });
    }


    /* =====================================================
       CONTROLES DE ACESSIBILIDADE
       ===================================================== */

    const decreaseFont = document.getElementById("decreaseFont");
    const increaseFont = document.getElementById("increaseFont");
    const contrastToggle = document.getElementById("contrastToggle");
    const darkToggle = document.getElementById("darkToggle");

    let fontSize = 16;

    if (decreaseFont) {

        decreaseFont.addEventListener("click", () => {

            if (fontSize > 13) {
                fontSize -= 1;
                document.documentElement.style.setProperty(
                    "--font-size-base",
                    `${fontSize}px`
                );
            }
        });
    }

    if (increaseFont) {

        increaseFont.addEventListener("click", () => {

            if (fontSize < 21) {
                fontSize += 1;
                document.documentElement.style.setProperty(
                    "--font-size-base",
                    `${fontSize}px`
                );
            }
        });
    }

    if (contrastToggle) {

        contrastToggle.addEventListener("click", () => {

            const enabled =
                document.body.classList.toggle("high-contrast");

            contrastToggle.setAttribute(
                "aria-label",
                enabled
                    ? "Desativar alto contraste"
                    : "Ativar alto contraste"
            );
        });
    }

    if (darkToggle) {

        darkToggle.addEventListener("click", () => {

            const enabled =
                document.body.classList.toggle("dark-mode");

            darkToggle.innerHTML = enabled
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

            darkToggle.setAttribute(
                "aria-label",
                enabled
                    ? "Desativar modo escuro"
                    : "Ativar modo escuro"
            );
        });
    }


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
       ===================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        const handleScroll = () => {

            if (window.scrollY > 450) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", handleScroll);

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        handleScroll();
    }


    /* =====================================================
       ANIMAÇÕES DE ENTRADA
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       FORMULÁRIO DO PORTAL DE ESCUTA
       IMPORTANTE:
       - Não envia para servidor
       - Não utiliza localStorage
       - Não utiliza cookies
       - Não salva informações
       ===================================================== */

    const listeningForm =
        document.getElementById("listeningForm");

    const listeningFeedback =
        document.getElementById("listeningFeedback");

    if (listeningForm && listeningFeedback) {

        listeningForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const ventMessage =
                document.getElementById("ventMessage");

            if (!ventMessage.value.trim()) {

                listeningFeedback.textContent =
                    "Antes de enviar, escreva um pouco sobre o que você está sentindo.";

                listeningFeedback.style.background = "#fff4d8";
                listeningFeedback.style.color = "#755b00";

                listeningFeedback.classList.add("show");

                ventMessage.focus();

                return;
            }

            listeningFeedback.textContent =
                "Obrigado por compartilhar o que está sentindo. Você não precisa enfrentar tudo sozinho. Procure alguém de confiança para conversar e pedir ajuda quando precisar. Seus sentimentos são importantes.";

            listeningFeedback.style.background = "#e8f8ee";
            listeningFeedback.style.color = "#17643a";

            listeningFeedback.classList.add("show");

            /* Limpa os campos.
               Nenhuma informação é armazenada. */
            listeningForm.reset();

        });
    }


    /* =====================================================
       CARROSSEL
       ===================================================== */

    const slides =
        document.querySelectorAll(".carousel-slide");

    const dots =
        document.querySelectorAll(".carousel-dot");

    const previousButton =
        document.getElementById("carouselPrev");

    const nextButton =
        document.getElementById("carouselNext");

    if (
        slides.length &&
        dots.length &&
        previousButton &&
        nextButton
    ) {

        let currentSlide = 0;
        let carouselTimer;

        const showSlide = (index) => {

            currentSlide =
                (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );
            });
        };

        const startCarousel = () => {

            clearInterval(carouselTimer);

            carouselTimer = setInterval(() => {

                showSlide(currentSlide + 1);

            }, 6000);
        };

        previousButton.addEventListener("click", () => {

            showSlide(currentSlide - 1);
            startCarousel();
        });

        nextButton.addEventListener("click", () => {

            showSlide(currentSlide + 1);
            startCarousel();
        });

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                showSlide(index);
                startCarousel();
            });
        });

        showSlide(0);
        startCarousel();
    }


    /* =====================================================
       QUIZ
       ===================================================== */

    const quizForm =
        document.getElementById("quizForm");

    const quizResult =
        document.getElementById("quizResult");

    const resetQuiz =
        document.getElementById("resetQuiz");

    if (quizForm && quizResult) {

        const correctAnswers = {
            question1: "c",
            question2: "b",
            question3: "d",
            question4: "c",
            question5: "b"
        };

        quizForm.addEventListener("submit", (event) => {

            event.preventDefault();

            let score = 0;

            const totalQuestions =
                Object.keys(correctAnswers).length;

            Object.entries(correctAnswers).forEach(
                ([question, correctAnswer]) => {

                    const selected =
                        quizForm.querySelector(
                            `input[name="${question}"]:checked`
                        );

                    if (
                        selected &&
                        selected.value === correctAnswer
                    ) {
                        score++;
                    }
                }
            );

            let message = "";
            let icon = "fa-heart";

            if (score <= 1) {

                message =
                    "Continue aprendendo! Respeito e empatia são aprendizados para toda a vida. 💛";

                icon = "fa-seedling";

            } else if (score <= 3) {

                message =
                    "Você está no caminho certo! Continue praticando o respeito e a empatia. 🌈";

                icon = "fa-road";

            } else {

                message =
                    "Parabéns! Você demonstrou conhecer atitudes importantes para uma convivência respeitosa. 🫶";

                icon = "fa-hands-holding-child";
            }

            quizResult.hidden = false;

            quizResult.innerHTML = `
                <div class="result-icon">
                    <i class="fa-solid ${icon}"></i>
                </div>

                <h2>${score}/${totalQuestions} acertos!</h2>

                <p>${message}</p>
            `;

            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }

    if (resetQuiz && quizForm && quizResult) {

        resetQuiz.addEventListener("click", () => {

            quizForm.reset();

            quizResult.hidden = true;
            quizResult.innerHTML = "";

            const firstQuestion =
                document.querySelector(".question-card");

            if (firstQuestion) {

                firstQuestion.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    }


    /* =====================================================
       FECHA MENU AO CLICAR FORA
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!mainNav || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            mainNav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            mainNav.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }
    });

});