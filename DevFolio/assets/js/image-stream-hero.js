/* ==========================================================================
   Image Stream Hero — script
   Salve este arquivo em: assets/js/image-stream-hero.js

   Recriação em JS puro da lógica do componente React "ImageStreamHero":
   duas fileiras de cards correm de longe em direção à tela. A perspectiva
   sozinha faz o card crescer *e* se afastar do centro ao mesmo tempo,
   porque a projeção 3D escala posição e tamanho pelo mesmo fator.
   ========================================================================== */

(function () {
  'use strict';

  // Geometria do corredor (mesmos valores padrão do componente original)
  var PATH = {
    perspective: 30,   // força da perspectiva
    cardWidth: 24,     // largura do card (em % da largura do container)
    cardHeight: 18,    // altura do card
    cardRadius: 0.4,   // raio das bordas
    birthHeight: 2.6,  // tamanho do card quando "nasce" no centro
    exitHeight: 46,    // tamanho do card quando sai da tela
    railBirth: -11,    // deslocamento lateral ao nascer (negativo = cruza o eixo)
    railExit: 60,      // deslocamento lateral ao sair
    fan: 3.3,           // o quanto a fileira abre logo no início
    turnBirth: 6,       // rotação Y ao nascer (graus)
    turnExit: 28,       // rotação Y ao sair (graus)
    stops: 24           // pontos usados para desenhar a curva da animação
  };

  var CARDS = 8;   // cards por fileira
  var SPEED = 18;  // segundos para 1 card atravessar todo o corredor
  var AXIS = 55;   // posição vertical do eixo do corredor, em % da altura

  
  var IMAGES = [
    
    'assets/img/portfolio/logo netflix boa.png',
    'assets/img/portfolio/rosa do bem bom.png',
    'assets/img/portfolio/cartaz mae do gu.PNG',
    'assets/img/portfolio/logo bolsa politec 2026.png',
    'assets/img/portfolio/lolla vetorização.png',
    'assets/img/portfolio/horizon.png',
   
  ];

  
  function buildKeyframes(dir, name, p) {
    var steps = [];
    for (var s = 0; s <= p.stops; s++) {
      var u = s / p.stops;
      var scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
      var z = p.perspective * (1 - 1 / scale);
      var rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
      var turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;

      steps.push(
        (u * 100).toFixed(2) + '%{transform:translate3d(' +
        (dir * rail).toFixed(2) + 'cqw,0,' + z.toFixed(2) + 'cqw) rotateY(' +
        (-dir * turn).toFixed(2) + 'deg)}'
      );
    }
    return '@keyframes ' + name + '{' + steps.join('') + '}';
  }

  function init() {
    var scene = document.getElementById('ishScene');
    var perspectiveWrap = scene ? scene.parentElement : null;
    if (!scene || !perspectiveWrap) return;

    var p = PATH;
    var rightName = 'ish-right';
    var leftName = 'ish-left';

    perspectiveWrap.style.perspective = p.perspective + 'cqw';
    perspectiveWrap.style.perspectiveOrigin = '50% ' + AXIS + '%';

    var css = buildKeyframes(1, rightName, p) +
      buildKeyframes(-1, leftName, p) +
      '@media(prefers-reduced-motion:reduce){.ish-card{animation-play-state:paused}}';

    var styleTag = document.createElement('style');
    styleTag.setAttribute('data-ish-keyframes', '');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);

    [rightName, leftName].forEach(function (name) {
      for (var i = 0; i < CARDS; i++) {
        var src = IMAGES[i % IMAGES.length];

        var card = document.createElement('div');
        card.className = 'ish-card';
        card.style.left = '50%';
        card.style.top = AXIS + '%';
        card.style.width = p.cardWidth + 'cqw';
        card.style.height = p.cardHeight + 'cqw';
        card.style.marginLeft = (-p.cardWidth / 2) + 'cqw';
        card.style.marginTop = (-p.cardHeight / 2) + 'cqw';
        card.style.borderRadius = p.cardRadius + 'cqw';
        card.style.animation = name + ' ' + SPEED + 's linear infinite';
       
        card.style.animationDelay = (-(i * SPEED) / CARDS) + 's';

        var img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.draggable = false;

        card.appendChild(img);
        scene.appendChild(card);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
