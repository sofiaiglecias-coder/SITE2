document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. MENU MOBILE --- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 2. ACESSIBILIDADE (FONTE, TEMA, ALTO CONTRASTE) --- */
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const btnContrastToggle = document.getElementById('btn-contrast-toggle');

  let currentFontSize = 100;

  if (btnFontIncrease && btnFontDecrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (currentFontSize < 130) {
        currentFontSize += 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });

    btnFontDecrease.addEventListener('click', () => {
      if (currentFontSize > 80) {
        currentFontSize -= 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      document.body.classList.remove('high-contrast');
      document.body.classList.toggle('dark-mode');
    });
  }

  if (btnContrastToggle) {
    btnContrastToggle.addEventListener('click', () => {
      document.body.classList.remove('dark-mode');
      document.body.classList.toggle('high-contrast');
    });
  }

  /* --- 3. SEÇÃO VOCÊ SABIA? --- */
  const btnCuriosity = document.getElementById('btn-curiosity');
  const didYouKnowContent = document.getElementById('did-you-know-content');

  const curiosities = [
    "Escolas inclusivas melhoram o desempenho acadêmico e social de todos os alunos.",
    "A empatia pode ser desenvolvida e fortalecida com a prática diária de escuta ativa.",
    "O bullying diminui significativamente em ambientes escolares que promovem o acolhimento constante.",
    "A convivência com a diversidade estimula a criatividade e o pensamento crítico.",
    "A Lei Brasileira de Inclusão garante o direito de todos a uma educação de qualidade."
  ];

  if (btnCuriosity && didYouKnowContent) {
    btnCuriosity.addEventListener('click', () => {
      didYouKnowContent.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * curiosities.length);
        didYouKnowContent.innerHTML = `<p><strong>Fato:</strong> ${curiosities[randomIndex]}</p>`;
        didYouKnowContent.style.opacity = '1';
      }, 200);
    });
  }

  /* --- 4. MITOS E VERDADES --- */
  const revealButtons = document.querySelectorAll('.btn-reveal');

  revealButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      if (answer) {
        const isHidden = answer.classList.toggle('hidden');
        button.textContent = isHidden ? 'Ver resposta' : 'Ocultar resposta';
      }
    });
  });

  /* --- 5. PORTAL DE ESCUTA --- */
  const listeningForm = document.getElementById('listening-form');
  const formFeedback = document.getElementById('form-feedback');
  const btnMotivation = document.getElementById('btn-motivation');
  const motivationDisplay = document.getElementById('motivation-display');

  const motivationalMessages = [
    "Você é importante e sua voz merece ser ouvida. 💛",
    "Pedir ajuda é um ato de coragem, não de fraqueza. 🌈",
    "Você merece ser respeitado(a) exatamente como você é. 🫶",
    "Não tenha medo de conversar com alguém de confiança.",
    "Suas diferenças fazem parte de quem você é.",
    "Você não precisa enfrentar tudo sozinho(a)."
  ];

  if (listeningForm) {
    listeningForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const messageInput = document.getElementById('student-message');
      if (!messageInput.value.trim()) return;

      formFeedback.classList.remove('hidden');
      formFeedback.innerHTML = "<p>Enviando...</p>";

      setTimeout(() => {
        formFeedback.innerHTML = `
          <p>Obrigado por compartilhar o que está sentindo. Você não precisa enfrentar tudo sozinho. Procure um adulto de confiança quando precisar. Seus sentimentos são importantes. 💛</p>
        `;
        listeningForm.reset();
      }, 600);
    });
  }

  if (btnMotivation && motivationDisplay) {
    btnMotivation.addEventListener('click', () => {
      motivationDisplay.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        motivationDisplay.innerHTML = `<p>"${motivationalMessages[randomIndex]}"</p>`;
        motivationDisplay.style.opacity = '1';
      }, 200);
    });
  }

  /* --- 6. CARROSSEL INTERATIVO --- */
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = document.querySelectorAll('.carousel-nav .indicator');

  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
      });
      currentIndex = index;
    };

    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(prevIndex);
    });

    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => updateCarousel(i));
    });
  }

  /* --- 7. QUIZ INTERATIVO (EXATAMENTE 5 PERGUNTAS) --- */
  const quizData = [
    {
      question: "Qual atitude demonstra respeito às diferenças?",
      options: [
        "Fazer piadas sobre as características de alguém.",
        "Excluir colegas que pensam diferente do grupo.",
        "Ouvir e respeitar a perspectiva e individualidade do outro.",
        "Ignorar uma pessoa por conta da sua origem."
      ],
      answer: 2
    },
    {
      question: "O que é Empatia?",
      options: [
        "Concordar com tudo o que os outros dizem.",
        "Tentar compreender os sentimentos e experiências de outra pessoa.",
        "Fazer as tarefas escolares pelos seus colegas.",
        "Ignorar os conflitos ao seu redor."
      ],
      answer: 1
    },
    {
      question: "O que caracteriza a inclusão escolar?",
      options: [
        "Garantir que todos participem juntos com oportunidades adequadas.",
        "Separar os alunos em turmas com base em capacidades.",
        "Tratar todos de forma exatamente idêntica sem adaptar necessidades.",
        "Permitir a presença sem promover a participação."
      ],
      answer: 0
    },
    {
      question: "O que fazer ao presenciar uma situação de bullying ou exclusão?",
      options: [
        "Rir ou compartilhar a situação.",
        "Apoiar a pessoa afetada e avisar um adulto de confiança.",
        "Ignorar a situação completamente.",
        "Incentivar as provocações."
      ],
      answer: 1
    },
    {
      question: "Quando procurar ajuda na escola ou com um responsável?",
      options: [
        "Somente em emergências médicas.",
        "Sempre que sentir insegurança, medo, exclusão ou precisar de orientação.",
        "Nunca, devendo guardar os problemas para si.",
        "Apenas quando for orientado pelos colegas."
      ],
      answer: 1
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizIntro = document.getElementById('quiz-intro');
  const quizGame = document.getElementById('quiz-game');
  const quizResults = document.getElementById('quiz-results');

  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');

  const quizCounter = document.getElementById('quiz-counter');
  const quizScoreLive = document.getElementById('quiz-score-live');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsContainer = document.getElementById('quiz-options');

  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', startQuiz);
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizIntro.classList.add('hidden');
    quizResults.classList.add('hidden');
    quizGame.classList.remove('hidden');
    loadQuestion();
  }

  function loadQuestion() {
    btnNextQuestion.classList.add('hidden');
    quizOptionsContainer.innerHTML = '';

    const currentQ = quizData[currentQuestionIndex];
    quizCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de 5`;
    quizScoreLive.textContent = `Pontos: ${score}`;
    quizProgressFill.style.width = `${((currentQuestionIndex + 1) / 5) * 100}%`;
    quizQuestionText.textContent = currentQ.question;

    currentQ.options.forEach((optText, index) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = optText;
      button.addEventListener('click', () => selectAnswer(index, currentQ.answer, button));
      quizOptionsContainer.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex, correctIndex, selectedBtn) {
    const allButtons = quizOptionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
      selectedBtn.classList.add('correct');
      score++;
      quizScoreLive.textContent = `Pontos: ${score}`;
    } else {
      selectedBtn.classList.add('incorrect');
      allButtons[correctIndex].classList.add('correct');
    }

    if (currentQuestionIndex < quizData.length - 1) {
      btnNextQuestion.classList.remove('hidden');
    } else {
      setTimeout(showResults, 1000);
    }
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      currentQuestionIndex++;
      loadQuestion();
    });
  }

  function showResults() {
    quizGame.classList.add('hidden');
    quizResults.classList.remove('hidden');

    const finalScoreText = document.getElementById('quiz-final-score');
    const percentageText = document.getElementById('quiz-percentage-text');
    const feedbackMsg = document.getElementById('quiz-feedback-msg');

    const percentage = Math.round((score / 5) * 100);

    finalScoreText.textContent = `Você acertou ${score} de 5 perguntas!`;
    percentageText.textContent = `${percentage}%`;

    if (score <= 1) {
      feedbackMsg.textContent = "Continue aprendendo! Respeito e empatia são aprendizados para toda a vida. 💛";
    } else if (score <= 3) {
      feedbackMsg.textContent = "Você está no caminho certo! Continue praticando o respeito e a empatia. 🌈";
    } else {
      feedbackMsg.textContent = "Parabéns! Você demonstrou conhecer atitudes importantes para uma convivência respeitosa. 🫶";
    }
  }

  if (btnRestartQuiz) {
    btnRestartQuiz.addEventListener('click', startQuiz);
  }

  /* --- 8. FRASE DO DIA --- */
  const btnNewQuote = document.getElementById('btn-new-quote');
  const dailyQuoteText = document.getElementById('daily-quote-text');

  const quotes = [
    "A inclusão acontece quando se aprende com as diferenças e não com as igualdades.",
    "A empatia é a capacidade de enxergar o mundo com os olhos do outro.",
    "Ninguém é igual a ninguém, e é exatamente isso que nos torna incríveis.",
    "Respeitar o próximo é reconhecer o direito de cada um ser quem é.",
    "Uma escola inclusiva constrói uma sociedade mais justa."
  ];

  if (btnNewQuote && dailyQuoteText) {
    btnNewQuote.addEventListener('click', () => {
      dailyQuoteText.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        dailyQuoteText.textContent = `"${quotes[randomIndex]}"`;
        dailyQuoteText.style.opacity = '1';
      }, 200);
    });
  }

  /* --- 9. BOTÃO VOLTAR AO TOPO --- */
  const btnBackToTop = document.getElementById('btn-back-to-top');

  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    });

    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});