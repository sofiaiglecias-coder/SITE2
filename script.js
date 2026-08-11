/* ==========================================================================
   17. JAVASCRIPT - ACOLHE+ PORTAL INTERATIVO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. MENU MOBILE (HAMBÚRGUER) --- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em um item
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

  let currentFontSize = 100; // Porcentagem

  // Ajuste de fonte
  if (btnFontIncrease && btnFontDecrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (currentFontSize < 130) {
        currentFontSize += 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });

    btnFontDecrease.addEventListener('click', () => {
      if (currentFontSize > 90) {
        currentFontSize -= 10;
        document.documentElement.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  // Alternar Modo Escuro
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      document.body.classList.remove('high-contrast');
      document.body.classList.toggle('dark-mode');
    });
  }

  // Alternar Alto Contraste
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
    "Escolas inclusivas melhoram o desempenho acadêmico e social de TODOS os alunos, não apenas dos que possuem deficiências.",
    "A empatia é uma habilidade socioemocional que pode ser exercitada diariamente através da escuta ativa e sem julgamentos.",
    "O bullying diminui até 50% em escolas que adotam programas ativos de acolhimento e respeito às diferenças.",
    "Diversidade de pensamento em equipes escolares aumenta em até 35% a capacidade de resolução de problemas.",
    "No Brasil, o direito à educação inclusiva é garantido pela Lei Brasileira de Inclusão (LBI - Lei nº 13.146/2015)."
  ];

  if (btnCuriosity && didYouKnowContent) {
    btnCuriosity.addEventListener('click', () => {
      didYouKnowContent.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * curiosities.length);
        didYouKnowContent.innerHTML = `<p><strong>Fato:</strong> ${curiosities[randomIndex]}</p>`;
        didYouKnowContent.style.opacity = '1';
      }, 300);
    });
  }

  /* --- 4. MITOS E VERDADES --- */
  const revealButtons = document.querySelectorAll('.btn-reveal');

  revealButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      if (answer) {
        answer.classList.toggle('hidden');
        button.textContent = answer.classList.contains('hidden') ? 'Ver resposta' : 'Ocultar resposta';
      }
    });
  });

  /* --- 5. PORTAL DE ESCUTA (FORMULÁRIO E MENSAGENS) --- */
  const listeningForm = document.getElementById('listening-form');
  const formFeedback = document.getElementById('form-feedback');
  const btnMotivation = document.getElementById('btn-motivation');
  const motivationDisplay = document.getElementById('motivation-display');

  const motivationalMessages = [
    "Você é importante e sua voz merece ser ouvida. 💛",
    "Pedir ajuda é um ato de coragem, não de fraqueza. 🌈",
    "Você merece ser respeitado(a) exatamente como você é. 🫶",
    "Não tenha medo de conversar com alguém de confiança.",
    "Suas diferenças fazem parte de quem você é e do seu valor.",
    "Você não precisa enfrentar tudo sozinho(a). Conte conosco!"
  ];

  if (listeningForm) {
    listeningForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const messageInput = document.getElementById('student-message');
      if (!messageInput.value.trim()) return;

      // Animação de envio simulado
      formFeedback.classList.remove('hidden');
      formFeedback.innerHTML = "<p>Enviando seu desabafo de forma segura...</p>";

      setTimeout(() => {
        formFeedback.innerHTML = `
          <p><strong>Obrigado por compartilhar o que está sentindo.</strong> Você não precisa enfrentar tudo sozinho. Procure um adulto de confiança quando precisar. Seus sentimentos são importantes. 💛</p>
        `;
        listeningForm.reset();
      }, 1000);
    });
  }

  if (btnMotivation && motivationDisplay) {
    btnMotivation.addEventListener('click', () => {
      motivationDisplay.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        motivationDisplay.innerHTML = `<p>"${motivationalMessages[randomIndex]}"</p>`;
        motivationDisplay.style.opacity = '1';
      }, 300);
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

    // Troca automática a cada 5 segundos
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    }, 5000);
  }

  /* --- 7. QUIZ INTERATIVO (EXATAMENTE 5 PERGUNTAS) --- */
  const quizData = [
    {
      question: "Qual atitude demonstra respeito às diferenças?",
      options: [
        "Fazer piadas sobre as características de alguém.",
        "Excluir colegas que pensam diferente do grupo.",
        "Ouvir e respeitar a perspectiva e individualidade do outro.",
        "Ignorar uma pessoa por conta da sua origem ou cultura."
      ],
      answer: 2
    },
    {
      question: "O que é Empatia?",
      options: [
        "Concordar sempre com tudo o que os outros dizem.",
        "Tentar compreender os sentimentos e experiências de outra pessoa.",
        "Fazer as tarefas escolares pelos seus colegas.",
        "Ignorar os sentimentos alheios para evitar conflitos."
      ],
      answer: 1
    },
    {
      question: "O que caracteriza a inclusão escolar?",
      options: [
        "Garantir que todos os alunos aprendam e participem juntos com igualdade de oportunidades.",
        "Separar os alunos em turmas diferentes com base em suas características.",
        "Tratar todos de forma idêntica sem considerar necessidades específicas.",
        "Permitir a presença, mas sem adaptar as atividades pedagógicas."
      ],
      answer: 0
    },
    {
      question: "O que você deve fazer ao presenciar uma situação de bullying ou exclusão?",
      options: [
        "Rir e compartilhar a situação com outros colegas.",
        "Apoiar a pessoa excluída e avisar um adulto de confiança.",
        "Não fazer nada e fingir que não viu para não se envolver.",
        "Incentivar quem está praticando o bullying."
      ],
      answer: 1
    },
    {
      question: "Quando um estudante deve procurar ajuda da equipe pedagógica ou de um adulto de confiança?",
      options: [
        "Apenas em emergências graves de saúde.",
        "Sempre que se sentir inseguro, triste, humilhado ou precisar de orientação.",
        "Nunca, pois deve resolver seus problemas emocionais sozinho.",
        "Somente se for autorizado pelos colegas da turma."
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
      setTimeout(showResults, 1200);
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

  /* --- 8. MENSAGEM DO DIA (FRASE ALEATÓRIA) --- */
  const btnNewQuote = document.getElementById('btn-new-quote');
  const dailyQuoteText = document.getElementById('daily-quote-text');

  const quotes = [
    "A inclusão acontece quando se aprende com as diferenças e não com as igualdades.",
    "A empatia é a capacidade de enxergar o mundo com os olhos do outro.",
    "Ninguém é igual a ninguém, e é exatamente isso que nos torna incríveis.",
    "Respeitar o próximo é reconhecer que todos têm o direito de ser quem são.",
    "Uma escola inclusiva constrói uma sociedade mais justa para o amanhã."
  ];

  if (btnNewQuote && dailyQuoteText) {
    btnNewQuote.addEventListener('click', () => {
      dailyQuoteText.style.opacity = '0';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        dailyQuoteText.textContent = `"${quotes[randomIndex]}"`;
        dailyQuoteText.style.opacity = '1';
      }, 300);
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