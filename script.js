document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. GERENCIADOR DE CONFIGURAÇÕES E PERSONALIZAÇÃO (LOCALSTORAGE)
  // ==========================================================================
  const modal = document.getElementById("settings-modal");
  const btnOpenSettings = document.getElementById("btn-open-settings");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnSaveSettings = document.getElementById("btn-save-settings");

  // Elementos do Painel
  const themeButtons = document.querySelectorAll("[data-set-theme]");
  const fontButtons = document.querySelectorAll("[data-set-font]");
  const toggleContrast = document.getElementById("toggle-contrast");
  const toggleAnimations = document.getElementById("toggle-animations");
  const btnFontInc = document.getElementById("btn-font-inc");
  const btnFontDec = document.getElementById("btn-font-dec");
  const btnFontReset = document.getElementById("btn-font-reset");
  const fontSizeDisplay = document.getElementById("font-size-display");

  // Estado das Configurações
  let currentFontScale = parseInt(localStorage.getItem("app_font_scale")) || 100;

  // Abrir e Fechar Modal
  btnOpenSettings.addEventListener("click", () => modal.classList.remove("hidden"));
  btnCloseSettings.addEventListener("click", () => modal.classList.add("hidden"));
  btnSaveSettings.addEventListener("click", () => modal.classList.add("hidden"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Alterar Temas Visuais
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.getAttribute("data-set-theme");
      document.documentElement.setAttribute("data-theme", selectedTheme);
      
      // Se ativar um tema padrão, remove alto contraste se estivesse ativo
      document.body.classList.remove("high-contrast");
      toggleContrast.checked = false;

      themeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      localStorage.setItem("app_theme", selectedTheme);
      localStorage.setItem("app_contrast", "false");
    });
  });

  // Alterar Fontes (Tipografia)
  fontButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedFont = btn.getAttribute("data-set-font");
      document.documentElement.setAttribute("data-font-family", selectedFont);

      fontButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      localStorage.setItem("app_font_family", selectedFont);
    });
  });

  // Ajuste do Tamanho da Fonte (A- / A+)
  function updateFontScale(scale) {
    currentFontScale = Math.min(Math.max(scale, 85), 130); // Limita entre 85% e 130%
    document.documentElement.style.setProperty("--font-scale", `${currentFontScale}%`);
    fontSizeDisplay.textContent = `${currentFontScale}%`;
    localStorage.setItem("app_font_scale", currentFontScale);
  }

  btnFontInc.addEventListener("click", () => updateFontScale(currentFontScale + 5));
  btnFontDec.addEventListener("click", () => updateFontScale(currentFontScale - 5));
  btnFontReset.addEventListener("click", () => updateFontScale(100));

  // Toggle Alto Contraste
  toggleContrast.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
    localStorage.setItem("app_contrast", e.target.checked);
  });

  // Toggle Animações
  toggleAnimations.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("animations-enabled");
    } else {
      document.body.classList.remove("animations-enabled");
    }
    localStorage.setItem("app_animations", e.target.checked);
  });

  // Carregar Preferências Salvas ao Iniciar
  function loadSavedSettings() {
    const savedTheme = localStorage.getItem("app_theme") || "default";
    const savedFont = localStorage.getItem("app_font_family") || "inter";
    const savedContrast = localStorage.getItem("app_contrast") === "true";
    const savedAnimations = localStorage.getItem("app_animations") !== "false";

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-font-family", savedFont);
    updateFontScale(currentFontScale);

    if (savedContrast) {
      document.body.classList.add("high-contrast");
      toggleContrast.checked = true;
    }

    if (!savedAnimations) {
      document.body.classList.remove("animations-enabled");
      toggleAnimations.checked = false;
    }

    // Atualizar botões ativos no modal
    themeButtons.forEach(b => b.classList.toggle("active", b.getAttribute("data-set-theme") === savedTheme));
    fontButtons.forEach(b => b.classList.toggle("active", b.getAttribute("data-set-font") === savedFont));
  }

  loadSavedSettings();

  // ==========================================================================
  // 2. NAVEGAÇÃO SPA (SINGLE PAGE APPLICATION)
  // ==========================================================================
  const navLinks = document.querySelectorAll(".nav-link, .start-nav");
  const sections = document.querySelectorAll(".page-section");

  function switchPage(targetHref) {
    const targetId = targetHref.replace("#", "");

    sections.forEach((sec) => sec.classList.toggle("active", sec.id === targetId));

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${targetId}`);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switchPage(link.getAttribute("href"));
    });
  });

  // ==========================================================================
  // 3. CARROSSEL INTERATIVO
  // ==========================================================================
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  const btnPrev = document.querySelector(".carousel-control.prev");
  const btnNext = document.querySelector(".carousel-control.next");
  let slideIndex = 0;

  function setSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === slideIndex));
  }

  btnNext?.addEventListener("click", () => setSlide(slideIndex + 1));
  btnPrev?.addEventListener("click", () => setSlide(slideIndex - 1));

  indicators.forEach((ind) => {
    ind.addEventListener("click", () => {
      setSlide(parseInt(ind.getAttribute("data-index")));
    });
  });

  // Autoplay do Carrossel
  setInterval(() => {
    if (document.getElementById("inicio").classList.contains("active")) {
      setSlide(slideIndex + 1);
    }
  }, 6000);

  // ==========================================================================
  // 4. PORTAL DE ESCUTA SIMULADO
  // ==========================================================================
  const ventForm = document.getElementById("vent-form");
  const feedbackBox = document.getElementById("feedback-response");
  const autoMessage = document.getElementById("auto-message");

  const automatedResponses = [
    "Obrigado por expressar o que sente. Lembre-se de que sua presença é muito importante para a nossa escola.",
    "Seu desabafo foi acolhido. Nenhuma dificuldade precisa ser enfrentada sem apoio. Procure um pedagogo ou professor de confiança!",
    "Obrigado por compartilhar. Pedir apoio é o primeiro passo para encontrar acolhimento."
  ];

  ventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const randomMsg = automatedResponses[Math.floor(Math.random() * automatedResponses.length)];
    
    autoMessage.textContent = randomMsg;
    feedbackBox.classList.remove("hidden");
    ventForm.reset();
  });

  // ==========================================================================
  // 5. QUIZ INTERATIVO
  // ==========================================================================
  const quizData = [
    {
      question: "1. Um colega de turma possui dificuldades de mobilidade. Qual atitude demonstra respeito e inclusão?",
      options: [
        "Ignorá-lo para não deixá-lo envergonhado.",
        "Garantir caminhos livres e oferecer ajuda de forma respeitosa, se ele precisar.",
        "Fazer brincadeiras sobre o ritmo dele para tentar descontrair."
      ],
      correct: 1
    },
    {
      question: "2. O que caracteriza uma atitude de Bullying no ambiente escolar?",
      options: [
        "Uma divergência pontual de opiniões durante um trabalho em grupo.",
        "Ações intencionais e repetitivas de exclusão, ofensas ou apelidos pejorativos.",
        "Um desentendimento passageiro durante um jogo de futebol."
      ],
      correct: 1
    },
    {
      question: "3. Se você presenciar um colega sofrendo discriminação, como deve agir?",
      options: [
        "Apenas observar sem intervir para não arrumar problemas.",
        "Rir junto com o grupo para não ser excluído também.",
        "Acolher o colega e reportar a situação a um professor ou pedagogo da escola."
      ],
      correct: 2
    },
    {
      question: "4. Qual é a melhor forma de promover a diversidade cultural e social na escola?",
      options: [
        "Exigir que todos se comportem da mesma forma.",
        "Estar aberto a ouvir e respeitar as diferentes origens e vivências dos colegas.",
        "Evitar conversar com pessoas que pensam diferente de você."
      ],
      correct: 1
    },
    {
      question: "5. Se você estiver enfrentando um momento difícil de ansiedade ou exclusão, qual a atitude mais segura?",
      options: [
        "Isolar-se e guardar tudo para si mesmo.",
        "Procurar um adulto de confiança (professor, orientador ou familiar) para conversar.",
        "Postar indiretas raivosas nas redes sociais."
      ],
      correct: 1
    }
  ];

  let qIndex = 0;
  let qScore = 0;

  const qQuestion = document.getElementById("quiz-question");
  const qOptions = document.getElementById("quiz-options");
  const nextQBtn = document.getElementById("next-q-btn");
  const currentQNum = document.getElementById("current-q");
  const progressFill = document.getElementById("progress-fill");
  const quizActiveBlock = document.getElementById("quiz-active-block");
  const quizResultBlock = document.getElementById("quiz-result-block");
  const scoreElem = document.getElementById("score");
  const scoreMsg = document.getElementById("score-message");
  const restartBtn = document.getElementById("restart-quiz-btn");

  function loadQuestion() {
    nextQBtn.classList.add("hidden");
    qOptions.innerHTML = "";

    const q = quizData[qIndex];
    qQuestion.textContent = q.question;
    currentQNum.textContent = qIndex + 1;
    progressFill.style.width = `${((qIndex + 1) / quizData.length) * 100}%`;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opt-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(idx, q.correct));
      qOptions.appendChild(btn);
    });
  }

  function handleAnswer(selected, correct) {
    const btns = qOptions.querySelectorAll(".quiz-opt-btn");
    btns.forEach(b => b.style.pointerEvents = "none");

    if (selected === correct) {
      btns[selected].classList.add("correct");
      qScore++;
    } else {
      btns[selected].classList.add("incorrect");
      btns[correct].classList.add("correct");
    }

    nextQBtn.classList.remove("hidden");
  }

  nextQBtn.addEventListener("click", () => {
    qIndex++;
    if (qIndex < quizData.length) {
      loadQuestion();
    } else {
      showQuizResults();
    }
  });

  function showQuizResults() {
    quizActiveBlock.classList.add("hidden");
    quizResultBlock.classList.remove("hidden");
    scoreElem.textContent = qScore;

    if (qScore === 5) {
      scoreMsg.textContent = "Parabéns! Excelente pontuação e alta conscientização sobre empatia e inclusão!";
    } else if (qScore >= 3) {
      scoreMsg.textContent = "Muito bem! Você demonstra uma boa percepção sobre o respeito e apoio escolar.";
    } else {
      scoreMsg.textContent = "Obrigado por participar! Aproveite para navegar pelo portal e aprender mais.";
    }
  }

  restartBtn.addEventListener("click", () => {
    qIndex = 0;
    qScore = 0;
    quizResultBlock.classList.add("hidden");
    quizActiveBlock.classList.remove("hidden");
    loadQuestion();
  });

  loadQuestion();

  // ==========================================================================
  // 6. BOTÃO VOLTAR AO TOPO
  // ==========================================================================
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});