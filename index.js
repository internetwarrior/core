let VOLUME = 0.2;
VOLUME = 0.25;
let debug = false;
const defaultSpeed = 30;
let speed = 100;

if (debug) {
  VOLUME = 0.0;
}

const COLOR_OBJ = {
  color_1: 250,
  color_2: 250,
  color_3: 250,
};

function exitFullScreenOnEscape(event) {
  if (event.key === "Escape") {
    // Check if the document is currently in full-screen mode
    if (document.fullscreenElement) {
      // Exit full screen if it's active
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  }
}

// Add an event listener for the 'keydown' event on the document
document.addEventListener("keydown", exitFullScreenOnEscape);

const songs = ["song-1.m4a", "song-2.m4a", "song-3.m4a"];

let song_name = "song-2.m4a";
song_name = "song-4.m4a";
const WORD_STORAGE = [
  "Туда их!",
  "-Ты что!?",
  "-Не ахуел?",
  "за что?",
  "-Хватит тыкать!",
  "-Успокойся",
  "я не знаю",
  "-Ты упорный!",
  "алё...",
  "Иди сюда!",
  "Упс...",
  "Woops...",
  "-Уффффф.....",
  "Anger!",
  "Hello, world!",
  "CI PASTI!",
  "пошла на хуй!",
  "Ехехехехехе",
  "-Не выводи меня из себя!",
  "-Я тебе уже сказала... ",
  "-Я знаю!",
  "Ля, Ты тупая!",
  // "#ФактыПримиXD",
  // "-Это любовь)  <3 ",
];

const bg = document.getElementById("background");
const hero = document.getElementById("hero");
const antiHero = document.getElementById("anti-hero");

function settingsButton() {
  alert("DEBUG-SETTINGS-BUTTON");
}

document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  bg.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`;
  antiHero.style.transform = `translate(${x * -80}px, ${y * -80}px)`;
  hero.style.transform = `translate(${x * 120}px, ${y * 40}px)`;
});

BAR_WIDTH = 0.2;

IS_PLAYING = false;

const UNHOVER_TEXT = "упс...";

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = VOLUME;

  audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    visualize(audioBuffer, audioContext, gainNode);
  });
}

function moveToTop() {
  const element = document.getElementById("anti-hero");
  element.style.transition = "top 2s  ease-in-out"; // Ensure smooth transition
  element.style.top = "0"; // Move the element to the top
}

async function loadDefaultAudio() {
  hero.style.animation = "none";
  if (IS_PLAYING) return;
  moveToTop();
  const model = document.getElementById("model");
  const swear = document.getElementById("swear");
  const backgroundElement = document.getElementById("background");
  model.style.opacity = "1";
  backgroundElement.style.filter = "blur(0px)";
  swear.style.animation =
    "borderDisappear var( --animation-duration) forwards ease-out";

  const startElement = document.getElementById("start");
  startElement.style.opacity = "0";
  setTimeout(() => (startElement.style.display = "none"), 300);

  const response = await fetch(`./${song_name}`);
  // const response = await fetch("./song_2.mp3");
  const arrayBuffer = await response.arrayBuffer();
  processArrayBuffer(arrayBuffer);
  IS_PLAYING = true;
}

document.getElementById("start").addEventListener("click", loadDefaultAudio);

function visualize(audioBuffer, audioContext, gainNode) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const frequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(frequencyBufferLength);

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  source.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);

  source.start();

  const canvasContext = canvas.getContext("2d");
  const barWidth = canvas.width / frequencyBufferLength;
  const midX = canvas.width / 1;
  const midX_2 = canvas.width / 2;

  function draw() {
    requestAnimationFrame(draw);
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < frequencyBufferLength; i++) {
      const value = frequencyData[i];

      const color =
        "rgb(" +
        (COLOR_OBJ.color_1 + value) +
        `,${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;

      canvasContext.fillStyle = color;

      const rightX = midX + i * barWidth - canvas.width / 2;
      canvasContext.fillRect(
        rightX,
        canvas.height - value,
        barWidth - BAR_WIDTH,
        value
      );

      const leftX = midX_2 - i * barWidth;
      canvasContext.fillRect(
        leftX,
        canvas.height - value,
        barWidth - BAR_WIDTH,
        value
      );
    }
  }

  draw();
}
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = 1;

const el = document.querySelector(".swear");

el.addEventListener("mouseover", (event) => {
  let iteration = 0;
  let length = 0;
  let state = false;
  clearInterval(interval);

  interval = setInterval(() => {
    if (state) {
      // state = false;
      // Change letters and append '123'
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join(""); // Append '123' when the state is true
    } else {
      state = true;
      // Change letters but remove the '123' from the end
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("")
        .slice(0, -3); // Remove the last 3 characters ('123') when the state is false
    }

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3 + length;
  }, speed);
});

el.addEventListener("mouseleave", (event) => {
  clearInterval(interval);
  event.target.innerText =
    WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)]; // вернуть нормальный текст
});

// --- SNOW FALLING EFFECT

window.onload = function () {
  var canvas = document.getElementById("canvas-2");
  var ctx = canvas.getContext("2d");

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var mp = 50;
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp,
    });
  }

  var angle = 0;
  var mouseX = W / 2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // ctx.fillStyle = "rgba(171, 171, 171, 0.8)";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
      var p = particles[i];

      // horizontal movement influenced by mouse
      var dir = (mouseX - p.x) * 0.002; // smaller multiplier for smooth movement
      p.x += dir;

      // vertical movement
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          if (dir > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
  }
  setInterval(draw, 33);
};
