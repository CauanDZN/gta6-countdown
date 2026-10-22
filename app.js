// GTA VI countdown. Pure client-side date math, no network calls, no root needed — a plain
// sideloaded webOS web app, same install path as the launcher.
(function () {
  'use strict';

  // 19 de novembro de 2026, meia-noite no fuso da propria TV (mes 10 = novembro, 0-indexado).
  // A Rockstar/Take-Two nunca cravou uma hora exata, so a data — ajuste aqui se um horario
  // oficial sair depois.
  var TARGET = new Date(2026, 10, 19, 0, 0, 0);

  var els = {
    d: document.getElementById('d'),
    h: document.getElementById('h'),
    m: document.getElementById('m'),
    s: document.getElementById('s'),
    clock: document.getElementById('clock'),
    done: document.getElementById('done'),
  };

  function pad(n) {
    n = Math.max(0, n);
    return (n < 10 ? '0' : '') + n;
  }

  function tick() {
    var diff = TARGET.getTime() - Date.now();
    if (diff <= 0) {
      els.clock.hidden = true;
      els.done.hidden = false;
      return;
    }
    var totalSeconds = Math.floor(diff / 1000);
    els.d.textContent = pad(Math.floor(totalSeconds / 86400));
    els.h.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    els.m.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    els.s.textContent = pad(totalSeconds % 60);
  }

  // Slideshow de fundo: cross-fade entre fotos via a classe .active (ver style.css) -- so troca
  // essa classe a cada SLIDE_MS, nunca recria elementos, pra nao re-decodificar a imagem a cada
  // troca no Chromium 53 dessa TV.
  var SLIDES = [
    'images/slide-01-lock-and-load.jpg',
    'images/slide-02-robbery.jpg',
    'images/slide-03-beach.jpg',
    'images/slide-04.jpg',
    'images/slide-05-motel.jpg',
  ];
  var SLIDE_MS = 8000;

  function startSlideshow() {
    var container = document.getElementById('slides');
    if (!container || !SLIDES.length) return;
    var frames = SLIDES.map(function (src) {
      var div = document.createElement('div');
      div.className = 'slide';
      div.style.backgroundImage = "url('" + src + "')";
      container.appendChild(div);
      return div;
    });
    var current = 0;
    frames[current].classList.add('active');
    if (frames.length < 2) return; // uma foto so: fica fixa
    setInterval(function () {
      var next = (current + 1) % frames.length;
      frames[next].classList.add('active');
      frames[current].classList.remove('active');
      current = next;
    }, SLIDE_MS);
  }

  tick();
  setInterval(tick, 1000);
  startSlideshow();
})();
