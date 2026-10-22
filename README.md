# GTA VI — Contador regressivo pra TV

App web pra LG webOS (sideload) que mostra um contador regressivo até **19 de novembro de 2026**,
com um slideshow de fotos oficiais de Jason e Lucia por fundo.

![GTA VI](icon.png)

## O que é

- Contador em dias/horas/min/seg, puro JS, sem rede e sem backend — só matemática de data.
- Fundo com 5 fotos do jogo em cross-fade (troca a cada 8s, sem recriar elemento, sem rede nem
  decode extra — leve até no Chromium 53 de uma TV de 2019).
- Um escurecedor por trás do contador pra manter o texto legível em qualquer foto.

## Instalar na TV (webOS, Developer Mode)

Precisa de Node.js e da TV em Developer Mode (ver `ares-setup-device`).

```
npm i -g @webos-tools/cli
ares-package . -o build
ares-install -d <nome-do-device> build/com.cauan.gta6countdown_1.0.0_all.ipk
ares-launch -d <nome-do-device> com.cauan.gta6countdown
```

## Trocar as fotos ou o tempo de cada uma

- Fotos: substitua os arquivos em `images/` e ajuste a lista `SLIDES` no topo de `app.js`.
- Tempo de cada foto: constante `SLIDE_MS` em `app.js` (em milissegundos).
- Data do lançamento: constante `TARGET` em `app.js`.

## Créditos

Fonte **Outfit** sob [SIL Open Font License](fonts/OFL.txt). Fotos de Jason e Lucia são material
oficial de divulgação da Rockstar Games/Take-Two para GTA VI — usadas aqui só de fundo, sem
nenhuma reivindicação de autoria sobre elas.

Feito com amor pelo Cauan.
