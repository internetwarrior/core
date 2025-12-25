// The Rome wasn't built in a single day

const VOLUME = 1.0; // 0.2 is defualt ->0.5
const backgroudVolume = VOLUME - 0.8;
let speed = 60; //30 is default

let noChangeColor = true;

const develoerMode = {
  debug: true,
  mode: false,
  inverse: false,
  devmodeEnterCount: 0,
  develoerModeEnter: 10,
};

if (develoerMode.debug) {
  develoerMode.develoerModeEnter = 0;
}

//const startDelay = 3; for the future!
const inverse = false;
let inverseMouseButtons = develoerMode.inverse;

const THE_QUESTION_MARK_LINK =
  "https://www.letras.com/kendrick-lamar/all-the-stars/";

BAR_WIDTH = 0.2;

IS_PLAYING = false;
const COLOR_OBJ = {
  color_1: 250, // Red
  color_2: 250, // Green
  color_3: 250, // Blue
};

const UNHOVER_TEXT = "упс...";
let originalVolume = VOLUME; // Store the initial volume
let fadeDuration = 2; // Duration for the fade in seconds (smoothness of volume change)

IS_FIRST_CLICK = true;

const songs = [
  "Kendrick Lamar  SZA - All the Stars.mp3",
  "MVSTERIOUS, bear bear  friends  VILLAGE FUNK.m4a",
  "Smash Mouth - All Star.mp3",
  "MrMoMMusic - Phao  2 Phut Hon KAIZ Remix  Animatio.mp3",
  "Odnogo Tatyana Kurtukova.mp3",
  "EMIN - Kamin Lyric Video.mp3",
  "Natali - O Bozhe Kakoj Muzhchina.mp3",
];

let song_name = songs.length > 0 ? songs[songs.length - songs.length] : null;

const wish_to_say_and_get = [
  "Привет...",
  "Как дела?",
  "Как твои родители?",
  "-Привет",
  "-Хорошо, спасибо.",
  // "Пошла на хуй!",
  "-Прости за все боли 😕",
];

let WORD_STORAGE = [
  "-Привет",
  "Как делишки?",
  "-А, меня зовут... 😊",
  "#You-Dirty-Bustered!😆",
  daysLeftTill2026(),
];

WORD_STORAGE = ["the S-Shield is", 'symbol for "hope"'];
// WORD_STORAGE = [
//   undefined,
//   NaN,
//   "error",
//   daysLeftTill2026((state = true)),
//   "777",
// ];

// Imported elements
const heroElement = document.querySelector("body");

const bg = document.getElementById("background");
const hero = document.getElementById("hero");
const antiHero = document.getElementById("anti-hero");
const building = document.getElementById("buildings");

//keydowns

document.addEventListener("keydown", (e) => {
  const key = Number(e.key);
  if (key >= 1 && key <= songs.length) {
    if (develoerMode.devmodeEnterCount >= develoerMode.develoerModeEnter) {
      song_name = songs[key - 1];
      console.log("Selected:", song_name);
      develoerMode.inverse = true;
      develoerMode.mode = true;
      alert(
        "Alert! Developer mode is activated! <- Try not over use it! Song changed to:" +
          song_name
      );
    }
    if (develoerMode.devmodeEnterCount == develoerMode.develoerModeEnter - 3) {
      alert(`После дополнительных 3-попыток, у вас будет developer-mode.`);
      develoerMode.devmodeEnterCount += 1;
    } else {
      develoerMode.devmodeEnterCount += 1;
      console.warn(
        "DEVELOPER-MODE-IS-BEING-ACTIVATED! Attempt: " +
          develoerMode.devmodeEnterCount +
          "/" +
          develoerMode.develoerModeEnter
      );
    }
  }
}); // <- Developer mode! Try don't over use it mother-father!

document.addEventListener("keydown", (e) => {
  if (e.key === "i") {
    // Press 'i' to toggle inverse mode
    inverse = !inverse;
  }
});

// Add an event listener for the 'keydown' event on the document
document.addEventListener("keydown", exitFullScreenOnEscape);

// Function to apply the background color from COLOR_OBJ
function applyBackgroundColor() {
  const rgbColor = `rgb(${COLOR_OBJ.color_1}, ${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;
  document.body.style.backgroundColor = rgbColor;
}

if (heroElement) {
  heroElement.addEventListener("click", function () {
    if (IS_FIRST_CLICK) {
      IS_FIRST_CLICK = false;
      return;
    }

    if (!inverseMouseButtons) {
      console.log("Left-clicked");
      if (noChangeColor) {
        return;
      }
      heroElement.style.backgroundColor = getRandomColor();
    } else {
      console.log("Right-clicked (inverted)");
      document.querySelector("#canvas").classList.toggle("flip-y");
      if (develoerMode.mode) {
        heroElement.style.backgroundColor = getRandomColor();
      }
    }
  });

  heroElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();

    if (!inverseMouseButtons) {
      console.log("Right-clicked");
      document.querySelector("#canvas").classList.toggle("flip-y");
      if (develoerMode.mode) {
        heroElement.style.backgroundColor = getRandomColor();
      }
    } else {
      console.log("Left-clicked (inverted)");
      if (noChangeColor) {
        return;
      }
      heroElement.style.backgroundColor = getRandomColor();
    }
  });
}

// Function to generate a random color
function getRandomColor() {
  COLOR_OBJ.color_1 = Math.floor(Math.random() * 256); // Random number between 0 and 255
  COLOR_OBJ.color_2 = Math.floor(Math.random() * 256); // Random number between 0 and 255
  COLOR_OBJ.color_3 = Math.floor(Math.random() * 256); // Random number between 0 and 255
}

function getRandomContent() {
  return THE_QUESTION_MARK_LINK;
}

function daysLeftTill2026(state = false) {
  const now = new Date();
  const newYear = new Date("2026-01-01T00:00:00");
  const diff = newYear - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (state) {
    return `Осталось ${days} дней до НГ!`;
  }
  return `Осталось ${days} дней до НГ 🥳`;
}

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

function settingsButton() {
  alert("Soon! SETTINGS-BUTTON");
}
document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  // Get the 'building' element

  // Check if the inverse mode is active
  if (inverse) {
    // Inverted transformations
    bg.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(0.95)`;
    antiHero.style.transform = `translate(${x * 80}px, ${y * 80}px)`;
    hero.style.transform = `translate(${x * -120}px, ${y * -40}px)`;
    building.style.transform = `translate(${x * -50}px, ${y * -50}px)`; // Parallax for building
  } else {
    // Normal transformations
    bg.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`;
    antiHero.style.transform = `translate(${x * -120}px, ${y * -80}px)`;
    // hero.style.transform = `translate(${x * 120}px, ${y * 40}px)`;
    hero.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    building.style.transform = `translate(${x * 120}px, ${y * 60}px)`; // Parallax for building
  }
});

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = originalVolume;

  audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    visualize(audioBuffer, audioContext, gainNode);
  });

  // Function to smoothly fade volume to 0
  function fadeToZero() {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(
      backgroudVolume,
      currentTime + fadeDuration
    );
  }

  // Function to restore volume back to original
  function restoreVolume() {
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(
      originalVolume,
      currentTime + fadeDuration
    );
  }

  // Listen for window focus and blur events
  window.addEventListener("blur", fadeToZero); // When window loses focus, fade to 0
  window.addEventListener("focus", restoreVolume); // When window gains focus, restore volume
}

function moveToTop() {
  const element = document.getElementById("anti-hero");
  const buildings = document.getElementById("buildings");
  buildings.style.transition = `bottom ${"1s"}  ease-in-out`;
  element.style.transition = "top 2s  ease-in-out"; // Ensure smooth transition
  if (song_name !== songs[3]) {
    element.style.top = "-5%"; // Move the element to the top
    buildings.style.bottom = "0%"; // Move the element to the top
  } else {
    WORD_STORAGE = wish_to_say_and_get;
    speed = 100;
  } // Ensure smooth transition
}

async function loadDefaultAudio() {
  hero.style.animation = "none";
  if (IS_PLAYING) return;
  moveToTop();
  const model = document.getElementById("model");
  const swear = document.getElementById("swear");
  const backgroundElement = document.getElementById("background");
  const heroElement = document.getElementById("hero");
  model.style.opacity = "1";

  backgroundElement.style.filter =
    " hue-rotate(240deg) saturate(150%) brightness(105%)";
  backgroundElement.style.opacity = "0.5";
  heroElement.style.opacity = "1";
  heroElement.style.filter =
    " hue-rotate(240deg) saturate(150%) brightness(105%)";
  swear.style.animation =
    "borderDisappear var( --animation-duration) forwards ease-out";

  const startElement = document.getElementById("start");
  startElement.style.opacity = "0";
  setTimeout(() => (startElement.style.display = "none"), 300);

  const response = await fetch(`./assets/songs/${song_name}`);
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
        canvas.height - value / 1.2,
        barWidth - BAR_WIDTH,
        value
      );

      const leftX = midX_2 - i * barWidth;
      canvasContext.fillRect(
        leftX,
        canvas.height - value / 1.2,
        barWidth - BAR_WIDTH,
        value
      );
    }
  }

  draw();
}

// Swear function

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = 1;

const el = document.querySelector(".swear");
el.addEventListener("mouseover", (event) => {
  let iteration = 0;
  let length = 0;
  clearInterval(interval);

  // Start interval to keep changing letters
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        // Keep replacing the letters with random ones
        return letters[Math.floor(Math.random() * 26)];
      })
      .join(""); // Keep randomizing the text

    // Optionally, you can limit the number of iterations for how many times the text should update
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

  var mp = 50; // number of particles
  var particles = [];

  // Create particles and give them a random initial direction (dir)
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, // random initial horizontal position
      y: Math.random() * H, // random initial vertical position
      r: Math.random() * 4 + 1, // random radius size
      d: Math.random() * mp, // random dispersion
      dir: (Math.random() - 0.5) * 2, // random direction, -1 or 1
    });
  }

  var angle = 0;
  var mouseX = W / 2; // Default mouseX position

  // Listen for mouse movement to track the mouseX position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255, 255, 255, 1)"; // Snowflake color
    ctx.beginPath();

    // Draw each snowflake (particle)
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();

    update();
  }

  function update() {
    angle += 0.01; // Change angle for vertical movement
    for (var i = 0; i < mp; i++) {
      var p = particles[i];

      // Horizontal movement influenced by mouse position
      var dir = (mouseX - p.x) * 0.002 + p.dir * 0.2; // p.dir is the random direction of the snowflake
      p.x += dir;

      // Vertical movement (falling effect)
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;

      // Reset particles when they move off-screen
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = {
            x: Math.random() * W,
            y: -10,
            r: p.r,
            d: p.d,
            dir: (Math.random() - 0.5) * 2,
          }; // Reset with new direction
        } else {
          if (dir > 0) {
            particles[i] = {
              x: -5,
              y: Math.random() * H,
              r: p.r,
              d: p.d,
              dir: (Math.random() - 0.5) * 2,
            }; // New direction when resetting
          } else {
            particles[i] = {
              x: W + 5,
              y: Math.random() * H,
              r: p.r,
              d: p.d,
              dir: (Math.random() - 0.5) * 2,
            }; // New direction when resetting
          }
        }
      }
    }
  }

  // Start the animation loop
  setInterval(draw, 10); // Redraw every 33ms
};

let start = Date.now();
let stayedLongEnough = false;
const intervalCheck = 10_000;

// // check every 30 sec and save time spent
// setInterval(() => {
//   const spent = Math.floor((Date.now() - start) / 1000);
//   if (spent >= 1) stayedLongEnough = true;
// }, intervalCheck);

document.getElementById("ytBtn").onclick = () => {
  // if (!stayedLongEnough) {
  //   alert("Откроется через 10 секунд.");
  //   return;
  // }
  window.open(getRandomContent(), "_blank");
};
