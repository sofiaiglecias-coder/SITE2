document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. NAVEGAÇÃO SPA (SINGLE PAGE APPLICATION)
  // ==========================================================================
  const navLinks = document.querySelectorAll(".nav-link, .start-nav");
  const sections = document.querySelectorAll(".page-section");

  function switchPage(targetId) {
    const id = targetId.replace("#", "");
    sections.forEach((sec) => {
      sec.classList.toggle("active", sec.id === id);
    });

    navLinks.forEach((link) => {
      if (link.classList.contains("nav-link")) {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      switchPage(target);
    });
  });

  // ==========================================================================
  // 2. ACESSIBILIDADE (FONTE, MODO ESCURO E ALTO CONTRASTE)
  // ==========================================================================
  const btnFont = document.getElementById("btn-font-toggle");
  const btnDark = document.getElementById("btn-dark-toggle");
  const btnContrast = document.getElementById("btn-contrast-toggle");
  let isLargeFont = false;

  btnFont.addEventListener("click", () => {
    isLargeFont = !isLargeFont;
    document.documentElement.style.fontSize = isLargeFont ? "19px" : "16px";
  });

  btnDark.addEventListener("click", () => {
    document.body.classList.remove("high-contrast");
    document.body.classList.toggle("dark-mode");
  });

  btnContrast.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
    document.body.classList.toggle("high-contrast");
  });

  // ==========================================================================
  // 3. CARROSSEL DE IMAGENS
  // ==========================================================================
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Transição automática do carrossel a cada 5s
  setInterval(() => {
    if (document.getElementById("inicio").classList.contains("active")) {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  }, 5000);

  // ==========================================================================
  // 4. PORTAL DE ESCUTA (SIMULAÇÃO COM RESPOSTA AUTOMÁTICA)
  // ==========================================================================
  const ventForm = document.getElementById("vent-form");
  const feedbackBox = document.getElementById("feedback-response");
  const autoMessage = document.getElementById("auto-message");

  const automatedResponses = [
    "Obrigado por confiar e expressar o que sente. Lembre-se de que você é único(a) e sua presença na escola é fundamental.",
    "Obrigado por compartilhar seus sentimentos. Nenhuma dificuldade precisa ser enfrentada sem apoio.",
    "Seu desabafo foi acolhido. Lembre-se de conversar com um professor ou pedagogo de sua confiança na escola!"
  ];

  ventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const randomMsg = automatedResponses[Math.floor(Math.random() * automatedResponses.length)];
    
    autoMessage.textContent = randomMsg;
    feedbackBox.classList.remove("hidden");
    ventForm.reset();
  });

  // ==========================================================================
  // 5. QUIZ INTERATIVO (5 PERGUNTAS SOBRE INCLUSÃO E RESPEITO)
  // ==========================================================================
  const quizQuestions = [
    {
      question: "1. Um colega de turma possui dificuldades de mobilidade. Qual atitude demonstra respeito e inclusão?",
      options: [
        "Ignorá-lo para não deixá-lo envergonhado.",
        "Garantir que os caminhos estejam livres e oferecer ajuda de forma respeitosa, caso ele precise.",
        "Fazer piadas amigáveis para tentar descontrair a situação."
      ],
      correct: 1
    },
    {
      question: "2. O que caracteriza uma atitude de Bullying no ambiente escolar?",
      options: [
        "Uma discordância pontual de opiniões durante um debate em sala de aula.",
        "Ações repetitivas de intencional exclusão, ofensas ou apelidos pejorativos contra alguém.",
        "Um desentendimento passageiro durante um jogo de educação física."
      ],
      correct: 1
    },
    {
      question: "3. Se você presenciar um colega sofrendo discriminação ou piadas ofensivas, como agir?",
      options: [
        "Apenas observar sem intervir para não se envolver em problemas.",
        "Rir junto com o grupo para não ser excluído também.",
        "Acolher a vítima e reportar a situação a um professor, pedagogo ou direção da escola."
      ],
      correct: 2
    },
    {
      question: "4. Qual é a melhor forma de promover a diversidade cultural e social na escola?",
      options: [
        "Exigir que todos pensem e se comportem da mesma maneira.",
        "Estar aberto a ouvir, aprender e respeitar as diferentes origens, religiões e histórias dos colegas.",
        "Evitar conversar com pessoas que tenham opiniões diferentes das suas."
      ],
      correct: 1
    },
    {
      question: "5. Se você estivesse passando por um momento difícil de ansiedade ou exclusão, qual seria a atitude mais segura?",
      options: [
        "Guardar tudo para si mesmo e isolar-se dos demais.",
        "Procurar um adulto de confiança (professor, orientador ou familiar) para conversar.",
        "Postar indiretas e desabafos com raiva nas redes sociais."
      ],
      correct: 1
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const qQuestion = document.getElementById("quiz-question");
  const qOptions = document.getElementById("quiz-options");
  const nextQBtn = document.getElementById("next-q-btn");
  const currentQNum = document.getElementById("current-q");
  const progressFill = document.getElementById("progress-fill");
  const quizContainer = document.getElementById("quiz-container");
  const quizResult = document.getElementById("quiz-result");
  const scoreElem = document.getElementById("score");
  const scoreMsg = document.getElementById("score-message");
  const restartBtn = document.getElementById("restart-quiz-btn");

  function loadQuestion() {
    nextQBtn.classList.add("hidden");
    qOptions.innerHTML = "";
    
    const currentQ = quizQuestions[currentQuestionIndex];
    qQuestion.textContent = currentQ.question;
    currentQNum.textContent = currentQuestionIndex + 1;
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.textContent = opt;
      btn.addEventListener("click", () => selectOption(idx, currentQ.correct));
      qOptions.appendChild(btn);
    });
  }

  function selectOption(selectedIdx, correctIdx) {
    const buttons = qOptions.querySelectorAll(".option-btn");
    buttons.forEach((btn) => btn.style.pointerEvents = "none");

    if (selectedIdx === correctIdx) {
      buttons[selectedIdx].classList.add("correct");
      score++;
    } else {
      buttons[selectedIdx].classList.add("incorrect");
      buttons[correctIdx].classList.add("correct");
    }

    nextQBtn.classList.remove("hidden");
  }

  nextQBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizContainer.classList.add("hidden");
    quizResult.classList.remove("hidden");
    scoreElem.textContent = score;

    if (score === 5) {
      scoreMsg.textContent = "Excelente! Você demonstrou alto nível de empatia, respeito e conscientização sobre a inclusão!";
    } else if (score >= 3) {
      scoreMsg.textContent = "Muito bem! Você tem uma boa percepção sobre o respeito e apoio ao próximo na escola.";
    } else {
      scoreMsg.textContent = "Obrigado por participar! Aproveite os conteúdos do portal para aprender mais sobre inclusão e respeito.";
    }
  }

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizResult.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  });

  // Inicializar o Quiz
  loadQuestion();

  // ==========================================================================
  // 6. BOTÃO "VOLTAR AO TOPO"
  // ==========================================================================
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});