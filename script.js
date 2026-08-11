/* ==========================================================================
   17. JAVASCRIPT PRINCIPAL - ACOLHE+
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENU MOBILE (HAMBÚRGUER)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     12. CONTROLES DE ACESSIBILIDADE (FONTE, MODO ESCURO, ALTO CONTRASTE)
     ========================================================================== */
  let fontScale = 100; // Porcentagem padrão
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnModoEscuro = document.getElementById('btn-modo-escuro');
  const btnAltoContraste = document.getElementById('btn-alto-contraste');

  if (btnAumentar && btnDiminuir) {
    btnAumentar.addEventListener('click', () => {
      if (fontScale < 130) {
        fontScale += 10;
        document.documentElement.style.fontSize = `${fontScale}%`;
      }
    });

    btnDiminuir.addEventListener('click', () => {
      if (fontScale > 80) {
        fontScale -= 10;
        document.documentElement.style.fontSize = `${fontScale}%`;
      }
    });
  }

  if (btnModoEscuro) {
    btnModoEscuro.addEventListener('click', () => {
      document.body.classList.remove('high-contrast');
      document.body.classList.toggle('dark-mode');
    });
  }

  if (btnAltoContraste) {
    btnAltoContraste.addEventListener('click', () => {
      document.body.classList.remove('dark-mode');
      document.body.classList.toggle('high-contrast');
    });
  }

  /* ==========================================================================
     4. VOCÊ SABIA? (CURIOSIDADES INTERATIVAS)
     ========================================================================== */
  const curiosidades = [
    "A Declaração Universal dos Direitos Humanos garante que a educação deve visar ao pleno desenvolvimento da personalidade humana e fortalecer o respeito aos direitos e liberdades fundamentais.",
    "Estudos apontam que escolas inclusivas ajudam todos os estudantes a desenvolverem maior empatia, liderança e capacidade de resolução criativa de problemas.",
    "A empatia é uma habilidade cognitiva e emocional que pode ser exercitada e fortalecida diariamente através da escuta ativa.",
    "Acessibilidade não se limita a rampas físicas; ela também abrange comunicação, atitudes acolhedoras e formatos digitais acessíveis.",
    "Pequenos gestos de inclusão no recreio escolar reduzem significativamente o isolamento emocional e os índices de ansiedade entre estudantes."
  ];

  const btnCuriosidade = document.getElementById('btn-curiosidade');
  const curiosidadeDisplay = document.getElementById('curiosidade-display');

  if (btnCuriosidade && curiosidadeDisplay) {
    btnCuriosidade.addEventListener('click', () => {
      const index = Math.floor(Math.random() * curiosidades.length);
      curiosidadeDisplay.classList.remove('fade-in');
      void curiosidadeDisplay.offsetWidth; // Forçar reflow para reiniciar animação
      curiosidadeDisplay.innerHTML = `<p class="fade-in">${curiosidades[index]}</p>`;
    });
  }

  /* ==========================================================================
     5. MITOS E VERDADES
     ========================================================================== */
  const btnsRevelar = document.querySelectorAll('.btn-revelar');

  btnsRevelar.forEach(btn => {
    btn.addEventListener('click', () => {
      const resposta = btn.nextElementSibling;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        resposta.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = 'Ver resposta <i class="fa-solid fa-chevron-down"></i>';
      } else {
        resposta.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = 'Ocultar resposta <i class="fa-solid fa-chevron-up"></i>';
      }
    });
  });

  /* ==========================================================================
     6. PORTAL DE ESCUTA & MENSAGENS ALEATÓRIAS
     ========================================================================== */
  const formEscuta = document.getElementById('form-escuta');
  const escutaFeedback = document.getElementById('escuta-feedback');

  if (formEscuta && escutaFeedback) {
    formEscuta.addEventListener('submit', (e) => {
      e.preventDefault(); // Impedir envio real

      const mensagem = document.getElementById('mensagem-escuta').value.trim();

      if (mensagem === '') {
        alert('Por favor, escreva uma mensagem antes de enviar.');
        return;
      }

      // Exibir feedback de acolhimento
      escutaFeedback.classList.remove('hidden');
      escutaFeedback.innerHTML = `
        <p>Obrigado por compartilhar o que está sentindo. Você não precisa enfrentar tudo sozinho. Procure um adulto de confiança quando precisar. Seus sentimentos são importantes. 💛</p>
      `;

      // Limpar formulário
      formEscuta.reset();
    });
  }

  // Gerador de mensagens de apoio
  const mensagensApoio = [
    "Você é importante.",
    "Pedir ajuda é um ato de coragem.",
    "Você merece ser respeitado.",
    "Não tenha medo de conversar com alguém de confiança.",
    "Suas diferenças fazem parte de quem você é.",
    "Você não precisa enfrentar tudo sozinho."
  ];

  const btnReceberMensagem = document.getElementById('btn-receber-mensagem');
  const displayMensagemApoio = document.getElementById('display-mensagem-apoio');
  const textoMensagemApoio = document.getElementById('texto-mensagem-apoio');

  if (btnReceberMensagem && displayMensagemApoio && textoMensagemApoio) {
    btnReceberMensagem.addEventListener('click', () => {
      const idx = Math.floor(Math.random() * mensagensApoio.length);
      textoMensagemApoio.textContent = mensagensApoio[idx];
      displayMensagemApoio.classList.remove('hidden');
    });
  }

  /* ==========================================================================
     8 & 9. QUIZ INTERATIVO (EXATAMENTE 5 PERGUNTAS)
     ========================================================================== */
  const quizData = [
    {
      question: "Qual atitude demonstra respeito às diferenças?",
      options: [
        "Fazer piadas sobre as características de alguém.",
        "Excluir colegas das atividades em grupo.",
        "Ouvir e respeitar a opinião e o espaço da outra pessoa.",
        "Ignorar uma pessoa por ela ser diferente de você."
      ],
      correct: 2
    },
    {
      question: "O que é Inclusão Escolar?",
      options: [
        "Garantir que todos os estudantes tenham acesso, participação e aprendizado juntos.",
        "Separar os alunos em turmas diferentes com base em suas limitações.",
        "Exigir que todos aprendam exatamente no mesmo ritmo e da mesma forma.",
        "Tratar com indiferença as necessidades especiais de alguns colegas."
      ],
      correct: 0
    },
    {
      question: "Como agir ao presenciar uma situação de bullying na escola?",
      options: [
        "Rir junto para não virar o próximo alvo.",
        "Gravar vídeos e espalhar nas redes sociais.",
        "Oferecer apoio à vítima e avisar imediatamente um professor ou adulto de confiança.",
        "Fingir que não viu e se afastar."
      ],
      correct: 2
    },
    {
      question: "O que significa ter Empatia?",
      options: [
        "Concordar com tudo o que as outras pessoas dizem sem refletir.",
        "Tentar compreender os sentimentos e perspectivas de outra pessoa.",
        "Mudar sua própria personalidade para agradar aos outros.",
        "Julgar rapidamente o comportamento alheio."
      ],
      correct: 1
    },
    {
      question: "Quando um estudante deve procurar ajuda na escola?",
      options: [
        "Apenas quando tirar notas baixas em uma prova.",
        "Nunca, pois deve resolver todos os seus problemas sozinho.",
        "Sempre que se sentir inseguro, triste, ameaçado, excluído ou com dúvidas.",
        "Apenas se for obrigado pela direção escolar."
      ],
      correct: 2
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizScreenStart = document.getElementById('quiz-screen-start');
  const quizScreenQuestion = document.getElementById('quiz-screen-question');
  const quizScreenResult = document.getElementById('quiz-screen-result');

  const btnIniciarQuiz = document.getElementById('btn-iniciar-quiz');
  const btnProximaPergunta = document.getElementById('btn-proxima-pergunta');
  const btnRefazerQuiz = document.getElementById('btn-refazer-quiz');

  const quizQuestionTitle = document.getElementById('quiz-question-title');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizCounter = document.getElementById('quiz-counter');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizFeedbackBox = document.getElementById('quiz-feedback-box');

  if (btnIniciarQuiz) {
    btnIniciarQuiz.addEventListener('click', startQuiz);
  }

  if (btnProximaPergunta) {
    btnProximaPergunta.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        showQuestion();
      } else {
        showResults();
      }
    });
  }

  if (btnRefazerQuiz) {
    btnRefazerQuiz.addEventListener('click', startQuiz);
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreenStart.classList.add('hidden');
    quizScreenResult.classList.add('hidden');
    quizScreenQuestion.classList.remove('hidden');
    showQuestion();
  }

  function showQuestion() {
    // Resetar estado
    quizFeedbackBox.classList.add('hidden');
    btnProximaPergunta.classList.add('hidden');
    quizOptionsContainer.innerHTML = '';

    const currentData = quizData[currentQuestionIndex];

    // Atualizar cabeçalho e progresso
    quizCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;

    quizQuestionTitle.textContent = currentData.question;

    // Gerar opções
    currentData.options.forEach((optionText, idx) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = optionText;
      button.addEventListener('click', () => selectOption(idx, currentData.correct));
      quizOptionsContainer.appendChild(button);
    });
  }

  function selectOption(selectedIndex, correctIndex) {
    const options = quizOptionsContainer.querySelectorAll('.option-btn');
    
    // Desabilitar todas as opções após escolha
    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add('correct');
      }
      if (idx === selectedIndex && selectedIndex !== correctIndex) {
        btn.classList.add('incorrect');
      }
    });

    if (selectedIndex === correctIndex) {
      score++;
      quizFeedbackBox.textContent = "Resposta Correta! Muito bem! 👏";
      quizFeedbackBox.style.backgroundColor = "#D4EDDA";
      quizFeedbackBox.style.color = "#155724";
    } else {
      quizFeedbackBox.textContent = "Resposta incorreta. Continue prestando atenção aos detalhes de convivência! 💡";
      quizFeedbackBox.style.backgroundColor = "#F8D7DA";
      quizFeedbackBox.style.color = "#721C24";
    }

    quizFeedbackBox.classList.remove('hidden');
    btnProximaPergunta.classList.remove('hidden');
  }

  function showResults() {
    quizScreenQuestion.classList.add('hidden');
    quizScreenResult.classList.remove('hidden');

    const resultScoreText = document.getElementById('result-score-text');
    const resultPercentage = document.getElementById('result-percentage');
    const resultMessageBox = document.getElementById('result-message-box');

    const percent = Math.round((score / quizData.length) * 100);

    resultScoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
    resultPercentage.textContent = `${percent}%`;

    // Mensagens de resultado conforme especificação
    if (score <= 1) {
      resultMessageBox.innerHTML = `<p>Continue aprendendo! Respeito e empatia são aprendizados para toda a vida. 💛</p>`;
    } else if (score <= 3) {
      resultMessageBox.innerHTML = `<p>Você está no caminho certo! Continue praticando o respeito e a empatia. 🌈</p>`;
    } else {
      resultMessageBox.innerHTML = `<p>Parabéns! Você demonstrou conhecer atitudes importantes para uma convivência respeitosa. 🫶</p>`;
    }
  }

  /* ==========================================================================
     10. CARROSSEL INTERATIVO
     ========================================================================== */
  const track = document.getElementById('carousel-track');
  const btnPrev = document.getElementById('btn-carousel-prev');
  const btnNext = document.getElementById('btn-carousel-next');
  const navDots = document.getElementById('carousel-nav');

  if (track && btnPrev && btnNext && navDots) {
    const slides = Array.from(track.children);
    const dots = Array.from(navDots.children);
    let currentSlideIdx = 0;
    let autoplayTimer = null;

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      
      dots.forEach(dot => dot.classList.remove('current-slide'));
      if (dots[index]) dots[index].classList.add('current-slide');
      
      currentSlideIdx = index;
    };

    btnNext.addEventListener('click', () => {
      let nextIndex = (currentSlideIdx + 1) % slides.length;
      moveToSlide(nextIndex);
      resetAutoplay();
    });

    btnPrev.addEventListener('click', () => {
      let prevIndex = (currentSlideIdx - 1 + slides.length) % slides.length;
      moveToSlide(prevIndex);
      resetAutoplay();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        moveToSlide(idx);
        resetAutoplay();
      });
    });

    // Troca automática
    const startAutoplay = () => {
      autoplayTimer = setInterval(() => {
        let nextIndex = (currentSlideIdx + 1) % slides.length;
        moveToSlide(nextIndex);
      }, 5000);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayTimer);
      startAutoplay();
    };

    startAutoplay();
  }

  /* ==========================================================================
     11. FRASE DO DIA
     ========================================================================== */
  const frasesDia = [
    "“Nossa capacidade de alcançar a unidade na diversidade será a beleza e o teste da nossa civilização.”",
    "“Tratar bem os outros não depende de quem os outros são, mas de quem você escolhe ser.”",
    "“A inclusão não é sobre trazer as pessoas para um mundo já existente; é sobre criar um novo mundo juntos.”",
    "“A empatia é ver com os olhos do outro, ouvir com os ouvidos do outro e sentir com o coração do outro.”",
    "“Ser diferente não é um defeito; é exatamente o que nos torna únicos e valiosos.”"
  ];

  const btnNovaFrase = document.getElementById('btn-nova-frase');
  const textoFraseDia = document.getElementById('texto-frase-dia');

  if (btnNovaFrase && textoFraseDia) {
    btnNovaFrase.addEventListener('click', () => {
      const idx = Math.floor(Math.random() * frasesDia.length);
      textoFraseDia.classList.remove('fade-in');
      void textoFraseDia.offsetWidth;
      textoFraseDia.textContent = frasesDia[idx];
      textoFraseDia.classList.add('fade-in');
    });
  }

  /* ==========================================================================
     13. BOTÃO VOLTAR AO TOPO & NAVEGAÇÃO SUAVE
     ========================================================================== */
  const btnTop = document.getElementById('btn-top');

  if (btnTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnTop.classList.remove('hidden');
      } else {
        btnTop.classList.add('hidden');
      }
    });

    btnTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});