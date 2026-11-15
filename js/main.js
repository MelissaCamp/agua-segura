/* Água Segura — funcionalidades gerais: tema, menu, rolagem, revelar seções, avisos */
(function () {
  'use strict';

  var root = document.documentElement;
  var toastTimer = null;

  function safe(nome, fn) {
    try { fn(); } catch (erro) { console.error('Água Segura [' + nome + ']:', erro); }
  }

  /* Aviso rápido (feedback de interações), disponível para os outros scripts */
  function toast(mensagem) {
    var el = document.getElementById('toast');
    if (!el) { return; }
    el.textContent = mensagem;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  window.AguaSegura = window.AguaSegura || {};
  window.AguaSegura.toast = toast;

  /* Tema claro/escuro */
  function iniciarTema() {
    var botao = document.getElementById('theme-toggle');
    if (!botao) { return; }
    function atualizar() {
      var escuro = root.getAttribute('data-theme') === 'dark';
      botao.textContent = escuro ? '☀️' : '🌙';
      botao.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');
      botao.setAttribute('aria-pressed', escuro ? 'true' : 'false');
    }
    atualizar();
    botao.addEventListener('click', function () {
      var novo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', novo);
      try { localStorage.setItem('as-tema', novo); } catch (e) { /* armazenamento indisponível */ }
      atualizar();
      toast(novo === 'dark' ? 'Tema escuro ativado' : 'Tema claro ativado');
    });
  }

  /* Menu expansível no celular */
  function iniciarMenu() {
    var botao = document.getElementById('menu-toggle');
    var menu = document.getElementById('menu-principal');
    if (!botao || !menu) { return; }
    function definir(aberto) {
      menu.classList.toggle('open', aberto);
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      botao.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    }
    botao.addEventListener('click', function () {
      definir(botao.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) { definir(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
        definir(false);
        botao.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1279) { definir(false); }
    });
  }

  /* Rolagem suave para âncoras, movendo também o foco (acessibilidade) */
  function iniciarAncoras() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) { return; }
      var id = link.getAttribute('href').slice(1);
      if (!id) { return; }
      var alvo = document.getElementById(id);
      if (!alvo) { return; }
      e.preventDefault();
      var reduzir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      alvo.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' });
      if (!alvo.hasAttribute('tabindex')) { alvo.setAttribute('tabindex', '-1'); }
      alvo.focus({ preventScroll: true });
      if (history.pushState) { history.pushState(null, '', '#' + id); }
    });
  }

  /* Botão voltar ao topo */
  function iniciarTopo() {
    var botao = document.getElementById('to-top');
    if (!botao) { return; }
    function checar() { botao.classList.toggle('show', window.scrollY > 500); }
    window.addEventListener('scroll', checar, { passive: true });
    checar();
    botao.addEventListener('click', function () {
      var reduzir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduzir ? 'auto' : 'smooth' });
    });
  }

  /* Seções aparecem suavemente ao entrar na tela */
  function iniciarReveal() {
    var itens = document.querySelectorAll('.reveal');
    if (!itens.length) { return; }
    if (!('IntersectionObserver' in window)) {
      itens.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.08 });
    itens.forEach(function (el) { obs.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    safe('tema', iniciarTema);
    safe('menu', iniciarMenu);
    safe('âncoras', iniciarAncoras);
    safe('topo', iniciarTopo);
    safe('reveal', iniciarReveal);
  });
})();
