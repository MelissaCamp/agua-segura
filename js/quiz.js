/* Água Segura — quiz interativo (sem servidor e sem banco de dados) */
(function () {
  'use strict';

  /* correta: índice da alternativa correta (0 = A, 1 = B, 2 = C, 3 = D) */
  var PERGUNTAS = [
    { pergunta: 'O que é água potável?',
      alternativas: ['Água que apresenta qualquer aparência transparente.', 'Água própria para consumo humano, atendendo aos padrões de qualidade.', 'Água retirada diretamente de qualquer rio.', 'Água sem cor, independentemente de sua composição.'],
      correta: 1,
      explicacao: 'Água potável é aquela que atende aos padrões de qualidade estabelecidos para consumo humano.' },
    { pergunta: 'Água transparente é sempre segura para beber?',
      alternativas: ['Sim, sempre.', 'Apenas quando está gelada.', 'Não, pois pode conter contaminantes invisíveis.', 'Sim, desde que não tenha cheiro.'],
      correta: 2,
      explicacao: 'A aparência não permite identificar todos os contaminantes presentes na água.' },
    { pergunta: 'Qual é a finalidade do tratamento da água?',
      alternativas: ['Alterar apenas sua temperatura.', 'Remover impurezas e reduzir riscos à saúde.', 'Tornar a água mais colorida.', 'Aumentar sua quantidade de sais.'],
      correta: 1,
      explicacao: 'O tratamento busca tornar a água adequada para o consumo, seguindo padrões de qualidade.' },
    { pergunta: 'Qual etapa do tratamento permite que partículas se depositem no fundo dos tanques?',
      alternativas: ['Decantação.', 'Distribuição.', 'Captação.', 'Desinfecção.'],
      correta: 0,
      explicacao: 'Na decantação, os flocos formados anteriormente se depositam no fundo dos tanques.' },
    { pergunta: 'Como a caixa-d\'água deve ser mantida?',
      alternativas: ['Sempre aberta.', 'Sem necessidade de limpeza.', 'Tampada e higienizada periodicamente.', 'Próxima a locais com lixo.'],
      correta: 2,
      explicacao: 'A caixa-d\'água deve permanecer protegida e receber higienização conforme as orientações sanitárias.' },
    { pergunta: 'Qual destas doenças pode estar relacionada ao consumo de água contaminada?',
      alternativas: ['Giardíase.', 'Miopia.', 'Dermatite causada por alergia a cosméticos.', 'Fratura óssea.'],
      correta: 0,
      explicacao: 'A giardíase pode ser transmitida pela ingestão de água ou alimentos contaminados.' },
    { pergunta: 'Qual é um dos principais objetivos do saneamento básico?',
      alternativas: ['Aumentar o descarte de resíduos nos rios.', 'Melhorar as condições de saúde e qualidade de vida.', 'Impedir o acesso da população à água.', 'Eliminar áreas verdes.'],
      correta: 1,
      explicacao: 'O saneamento contribui para a saúde pública, a proteção ambiental e a qualidade de vida.' },
    { pergunta: 'Quantos componentes principais são considerados no saneamento básico brasileiro?',
      alternativas: ['Dois.', 'Três.', 'Quatro.', 'Seis.'],
      correta: 2,
      explicacao: 'São quatro componentes: abastecimento de água, esgotamento sanitário, limpeza urbana e resíduos sólidos, e drenagem de águas pluviais.' },
    { pergunta: 'Qual atitude ajuda a economizar água?',
      alternativas: ['Deixar a torneira aberta ao escovar os dentes.', 'Lavar calçadas diariamente com mangueira.', 'Consertar vazamentos.', 'Tomar banhos cada vez mais longos.'],
      correta: 2,
      explicacao: 'Corrigir vazamentos evita desperdício de água.' },
    { pergunta: 'Por que é importante lavar as mãos?',
      alternativas: ['Apenas para retirar odores.', 'Para ajudar a prevenir a transmissão de microrganismos.', 'Para substituir o tratamento da água.', 'Porque elimina todos os riscos de doenças.'],
      correta: 1,
      explicacao: 'A higiene das mãos ajuda a reduzir a transmissão de microrganismos causadores de doenças.' },
    { pergunta: 'Qual é a finalidade da desinfecção da água?',
      alternativas: ['Eliminar ou inativar microrganismos que podem causar doenças.', 'Deixar a água mais fria.', 'Aumentar a quantidade de sujeira.', 'Alterar sua cor.'],
      correta: 0,
      explicacao: 'A desinfecção é uma etapa importante para controlar microrganismos presentes na água.' },
    { pergunta: 'O que deve ser feito quando a origem da água é desconhecida?',
      alternativas: ['Consumir normalmente.', 'Avaliar a segurança da fonte e seguir orientações das autoridades sanitárias.', 'Considerar a água segura se estiver transparente.', 'Misturar com qualquer outra água.'],
      correta: 1,
      explicacao: 'Água de origem desconhecida não deve ser considerada segura sem avaliação adequada.' },
    { pergunta: 'Qual alternativa representa um cuidado correto com alimentos?',
      alternativas: ['Lavá-los com água de origem desconhecida.', 'Higienizá-los adequadamente com água segura.', 'Deixá-los expostos à sujeira.', 'Utilizar recipientes contaminados.'],
      correta: 1,
      explicacao: 'A higienização adequada dos alimentos ajuda a prevenir doenças.' },
    { pergunta: 'Qual é a relação entre saneamento e meio ambiente?',
      alternativas: ['O saneamento não possui relação com o meio ambiente.', 'O saneamento contribui para reduzir a contaminação ambiental.', 'O saneamento aumenta obrigatoriamente a poluição.', 'O saneamento serve apenas para economizar energia.'],
      correta: 1,
      explicacao: 'O tratamento de esgoto e a gestão adequada de resíduos ajudam a proteger os recursos naturais.' },
    { pergunta: 'Qual é o tema central do ODS 6?',
      alternativas: ['Energia limpa.', 'Educação de qualidade.', 'Água potável e saneamento.', 'Igualdade de gênero.'],
      correta: 2,
      explicacao: 'O ODS 6 busca assegurar a disponibilidade e a gestão sustentável da água e do saneamento para todos.' }
  ];

  var FAIXAS = [
    { max: 5,  titulo: 'Começando a jornada', msg: 'Você está começando sua jornada! Aproveite os conteúdos do Água Segura para aprender mais.' },
    { max: 10, titulo: 'Bom trabalho',        msg: 'Bom trabalho! Você já conhece alguns conceitos importantes, mas ainda pode aprender mais.' },
    { max: 13, titulo: 'Muito bem',           msg: 'Muito bem! Você demonstra um bom conhecimento sobre água potável e saneamento.' },
    { max: 15, titulo: 'Excelente',           msg: 'Excelente! Você domina os principais conceitos abordados no quiz.' }
  ];

  var LETRAS = ['A', 'B', 'C', 'D'];
  var estado = { indice: 0, acertos: 0, respondida: false, respostas: [] };
  var raiz = null;

  function classificar(acertos) {
    for (var i = 0; i < FAIXAS.length; i++) {
      if (acertos <= FAIXAS[i].max) { return FAIXAS[i]; }
    }
    return FAIXAS[FAIXAS.length - 1];
  }

  function esc(texto) {
    var d = document.createElement('div');
    d.textContent = texto;
    return d.innerHTML;
  }

  /* ----- Telas ----- */
  function telaInicial() {
    raiz.innerHTML =
      '<div class="start">' +
        '<div class="icon" aria-hidden="true">💧</div>' +
        '<h2>Teste seus conhecimentos</h2>' +
        '<p>São <strong>' + PERGUNTAS.length + ' perguntas</strong> sobre água potável, tratamento, saúde, saneamento e consumo consciente. ' +
        'Você responde uma de cada vez e vê a explicação logo em seguida.</p>' +
        '<div class="quiz-actions" style="justify-content:center">' +
          '<button type="button" class="btn btn-primary" id="quiz-iniciar">Começar quiz</button>' +
        '</div>' +
      '</div>';
    document.getElementById('quiz-iniciar').addEventListener('click', reiniciar);
  }

  function telaPergunta() {
    var p = PERGUNTAS[estado.indice];
    var numero = estado.indice + 1;
    var pct = Math.round((estado.indice / PERGUNTAS.length) * 100);
    var opcoes = p.alternativas.map(function (txt, i) {
      return '<label class="option" data-i="' + i + '">' +
        '<input type="radio" name="alternativa" value="' + i + '">' +
        '<span><span class="letter">' + LETRAS[i] + ')</span> ' + esc(txt) + '</span>' +
        '<span class="flag" aria-hidden="true"></span></label>';
    }).join('');

    raiz.innerHTML =
      '<div class="quiz-top"><span>Pergunta ' + numero + ' de ' + PERGUNTAS.length + '</span><span>Acertos: ' + estado.acertos + '</span></div>' +
      '<div class="progress" role="progressbar" aria-label="Progresso do quiz" aria-valuemin="0" aria-valuemax="' + PERGUNTAS.length + '" aria-valuenow="' + estado.indice + '"><span style="width:' + pct + '%"></span></div>' +
      '<fieldset><legend class="sr-only">Alternativas da pergunta ' + numero + '</legend>' +
        '<h2 class="q-title" id="q-titulo" tabindex="-1">' + esc(p.pergunta) + '</h2>' +
        '<div id="opcoes">' + opcoes + '</div>' +
      '</fieldset>' +
      '<div id="quiz-feedback" role="status" aria-live="polite"></div>' +
      '<div class="quiz-actions">' +
        '<button type="button" class="btn btn-primary" id="quiz-responder">Responder</button>' +
        '<button type="button" class="btn btn-outline" id="quiz-proxima" hidden></button>' +
      '</div>';

    estado.respondida = false;
    var rotulos = raiz.querySelectorAll('.option');
    Array.prototype.forEach.call(rotulos, function (r) {
      r.querySelector('input').addEventListener('change', function () {
        if (estado.respondida) { return; }
        Array.prototype.forEach.call(rotulos, function (o) { o.classList.remove('selected'); });
        r.classList.add('selected');
        var fb = document.getElementById('quiz-feedback');
        if (fb) { fb.innerHTML = ''; }
      });
    });
    document.getElementById('quiz-responder').addEventListener('click', responder);
    document.getElementById('quiz-proxima').addEventListener('click', proxima);
    var titulo = document.getElementById('q-titulo');
    if (titulo && estado.indice > 0) { titulo.focus(); }
  }

  function responder() {
    if (estado.respondida) { return; }
    var p = PERGUNTAS[estado.indice];
    var marcado = raiz.querySelector('input[name="alternativa"]:checked');
    var fb = document.getElementById('quiz-feedback');
    if (!marcado) {
      fb.innerHTML = '<div class="quiz-feedback warn"><p><strong>Selecione uma alternativa</strong> antes de responder.</p></div>';
      return;
    }
    var escolha = parseInt(marcado.value, 10);
    var acertou = escolha === p.correta;
    estado.respondida = true;
    estado.respostas[estado.indice] = { escolha: escolha, acertou: acertou };
    if (acertou) { estado.acertos++; }

    Array.prototype.forEach.call(raiz.querySelectorAll('.option'), function (o) {
      var i = parseInt(o.getAttribute('data-i'), 10);
      o.classList.add('locked');
      o.classList.remove('selected');
      o.querySelector('input').disabled = true;
      var flag = o.querySelector('.flag');
      if (i === p.correta) { o.classList.add('correct'); flag.textContent = '✔ Correta'; }
      else if (i === escolha) { o.classList.add('incorrect'); flag.textContent = '✘ Sua resposta'; }
    });

    fb.innerHTML =
      '<div class="quiz-feedback ' + (acertou ? 'ok' : 'bad') + '">' +
        '<p><strong>' + (acertou ? 'Resposta correta!' : 'Resposta incorreta.') + '</strong>' +
        (acertou ? '' : ' A alternativa correta é a ' + LETRAS[p.correta] + '.') + '</p>' +
        '<p>' + esc(p.explicacao) + '</p>' +
      '</div>';

    var ultima = estado.indice === PERGUNTAS.length - 1;
    var botaoProxima = document.getElementById('quiz-proxima');
    botaoProxima.textContent = ultima ? 'Ver resultado' : 'Próxima pergunta';
    botaoProxima.classList.remove('btn-outline');
    botaoProxima.classList.add('btn-primary');
    botaoProxima.hidden = false;
    var botaoResponder = document.getElementById('quiz-responder');
    botaoResponder.hidden = true;
    botaoProxima.focus();
  }

  function proxima() {
    if (!estado.respondida) { return; }
    estado.indice++;
    if (estado.indice >= PERGUNTAS.length) { telaResultado(); } else { telaPergunta(); }
    var topo = raiz.getBoundingClientRect().top;
    if (topo < 0 && raiz.scrollIntoView) { raiz.scrollIntoView({ block: 'start' }); }
  }

  function telaResultado() {
    var total = PERGUNTAS.length;
    var acertos = estado.acertos;
    var erros = total - acertos;
    var pct = Math.round((acertos / total) * 100);
    var faixa = classificar(acertos);

    var revisao = PERGUNTAS.map(function (p, i) {
      var r = estado.respostas[i];
      var ok = r && r.acertou;
      return '<li class="' + (ok ? 'ok' : 'bad') + '">' + esc(p.pergunta) + ' <strong>' + (ok ? '(acertou)' : '(errou; correta: ' + LETRAS[p.correta] + ')') + '</strong></li>';
    }).join('');

    raiz.innerHTML =
      '<div class="result">' +
        '<h2 id="resultado-titulo" tabindex="-1">Resultado: ' + esc(faixa.titulo) + '</h2>' +
        '<div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
        '<p class="lead">' + esc(faixa.msg) + '</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + acertos + '</b>acertos</div>' +
          '<div class="stat"><b>' + erros + '</b>erros</div>' +
          '<div class="stat"><b>' + pct + '%</b>de aproveitamento</div>' +
        '</div>' +
        '<div class="quiz-actions" style="justify-content:center">' +
          '<button type="button" class="btn btn-primary" id="quiz-refazer">Refazer quiz</button>' +
          '<a class="btn btn-outline" href="../index.html">Voltar à página inicial</a>' +
        '</div>' +
        '<details class="review"><summary>Revisar minhas respostas</summary><ol>' + revisao + '</ol></details>' +
      '</div>';
    document.getElementById('quiz-refazer').addEventListener('click', reiniciar);
    var t = document.getElementById('resultado-titulo');
    if (t) { t.focus(); }
    if (window.AguaSegura && window.AguaSegura.toast) { window.AguaSegura.toast('Quiz concluído: ' + acertos + ' de ' + total + ' acertos'); }
  }

  function reiniciar() {
    estado = { indice: 0, acertos: 0, respondida: false, respostas: [] };
    telaPergunta();
  }

  function iniciar() {
    raiz = document.getElementById('quiz-root');
    if (!raiz) { return; }
    try { telaInicial(); }
    catch (erro) {
      console.error('Água Segura [quiz]:', erro);
      raiz.innerHTML = '<p>Não foi possível carregar o quiz. Atualize a página e tente novamente.</p>';
    }
  }

  /* Exposto para testes automatizados */
  window.AguaSeguraQuiz = { perguntas: PERGUNTAS, faixas: FAIXAS, classificar: classificar };

  document.addEventListener('DOMContentLoaded', iniciar);
})();
