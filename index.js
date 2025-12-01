let VOLUME = 0.1;

const COLOR_OBJ = {
  color_1: 250,
  color_2: 250,
  color_3: 250,
};

BAR_WIDTH = 0.2;

IS_PLAYING = false;

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = VOLUME;

  audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    visualize(audioBuffer, audioContext, gainNode);
  });
}

async function loadDefaultAudio() {
  if (IS_PLAYING) return;

  const model = document.getElementById("model");
  const backgroundElement = document.getElementById("background");
  model.style.opacity = "1";
  backgroundElement.style.filter = "blur(0px)";

  const startElement = document.getElementById("start");
  startElement.style.opacity = "0";
  setTimeout(() => (startElement.style.display = "none"), 300);

  const response = await fetch("./intro.m4a");
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
