/* Água Segura — interações: mitos e verdades e checklists */
(function () {
  'use strict';

  function safe(nome, fn) {
    try { fn(); } catch (erro) { console.error('Água Segura [' + nome + ']:', erro); }
  }
  function avisar(msg) {
    if (window.AguaSegura && window.AguaSegura.toast) { window.AguaSegura.toast(msg); }
  }

  /* ---------- Mitos e verdades ---------- */
  function iniciarMitos() {
    document.querySelectorAll('.mito-btn').forEach(function (botao) {
      botao.addEventListener('click', function () {
        var resposta = document.getElementById(botao.getAttribute('aria-controls'));
        if (!resposta) { return; }
        var abrir = resposta.hasAttribute('hidden');
        if (abrir) { resposta.removeAttribute('hidden'); } else { resposta.setAttribute('hidden', ''); }
        botao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
        botao.textContent = abrir ? 'Ocultar resposta' : 'Ver resposta';
      });
    });
  }

  /* ---------- Checklists ---------- */
  var MENSAGENS = {
    armazenamento: function (marcados, total, pendentes) {
      if (marcados === 0) {
        return { nivel: '', html: '<p>Marque os itens que você já pratica para receber uma orientação.</p>' };
      }
      if (marcados === total) {
        return { nivel: 'is-high', html:
          '<p><strong>Muito bem!</strong> Você segue os cuidados básicos de armazenamento listados aqui.</p>' +
          '<p>Lembre-se: este checklist é educativo e <strong>não certifica que a água é potável</strong>. ' +
          'Em caso de dúvida sobre a qualidade da água, procure a vigilância sanitária ou a prestadora do serviço de abastecimento.</p>' };
      }
      if (marcados <= 2) {
        return { nivel: 'is-low', html:
          '<p><strong>Há pontos importantes para melhorar.</strong> Revise os cuidados desta página e comece por proteger a água contra sujeira, insetos e animais.</p>' +
          listar(pendentes) };
      }
      return { nivel: '', html:
        '<p><strong>Você já adota boas práticas,</strong> mas ainda há itens para ajustar.</p>' + listar(pendentes) };
    },
    economia: function (marcados, total, pendentes) {
      if (marcados === 0) {
        return { nivel: '', html: '<p>Marque as atitudes que você já pratica. Todo começo conta!</p>' };
      }
      if (marcados === total) {
        return { nivel: 'is-high', html:
          '<p><strong>Parabéns!</strong> Você já pratica todas as atitudes do desafio. Compartilhe esses hábitos com família, amigos e vizinhos: ' +
          'o consumo consciente é mais forte quando é coletivo.</p>' };
      }
      if (marcados <= 2) {
        return { nivel: 'is-low', html:
          '<p><strong>Um bom começo!</strong> Pequenas mudanças de rotina ajudam a evitar o desperdício. Que tal tentar mais uma atitude esta semana?</p>' +
          listar(pendentes) };
      }
      return { nivel: '', html:
        '<p><strong>Você está no caminho certo!</strong> Já pratica ' + marcados + ' de ' + total + ' atitudes. Veja o que ainda pode entrar na sua rotina:</p>' +
        listar(pendentes) };
    }
  };

  function listar(pendentes) {
    if (!pendentes.length) { return ''; }
    return '<p>Ainda para revisar:</p><ul>' + pendentes.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
  }

  function iniciarChecklist(caixa) {
    var tipo = caixa.getAttribute('data-checklist');
    var gerar = MENSAGENS[tipo];
    if (!gerar) { return; }
    var itens = Array.prototype.slice.call(caixa.querySelectorAll('input[type="checkbox"]'));
    var barra = caixa.querySelector('[data-checklist-bar]');
    var rotulo = caixa.querySelector('[data-checklist-label]');
    var saida = caixa.querySelector('[data-checklist-result]');
    var reiniciar = caixa.querySelector('[data-checklist-reset]');
    var total = itens.length;

    function atualizar(avisarFim) {
      var marcados = 0;
      var pendentes = [];
      itens.forEach(function (item) {
        var rotuloItem = item.closest('label');
        var texto = rotuloItem ? rotuloItem.querySelector('span').textContent.trim() : '';
        if (item.checked) { marcados++; } else { pendentes.push(texto); }
        if (rotuloItem) { rotuloItem.classList.toggle('checked', item.checked); }
      });
      var pct = total ? Math.round((marcados / total) * 100) : 0;
      if (barra) { barra.style.width = pct + '%'; }
      if (barra && barra.parentNode) { barra.parentNode.setAttribute('aria-valuenow', String(marcados)); }
      if (rotulo) { rotulo.textContent = marcados + ' de ' + total + ' itens marcados'; }
      var msg = gerar(marcados, total, pendentes);
      if (saida) {
        saida.className = 'feedback ' + msg.nivel;
        saida.innerHTML = msg.html;
      }
      if (avisarFim && marcados === total) { avisar('Checklist completo!'); }
    }

    itens.forEach(function (item) {
      item.addEventListener('change', function () { atualizar(true); });
    });
    if (reiniciar) {
      reiniciar.addEventListener('click', function () {
        itens.forEach(function (item) { item.checked = false; });
        atualizar(false);
        avisar('Checklist reiniciado');
      });
    }
    atualizar(false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    safe('mitos', iniciarMitos);
    document.querySelectorAll('[data-checklist]').forEach(function (caixa) {
      safe('checklist', function () { iniciarChecklist(caixa); });
    });
  });
})();
