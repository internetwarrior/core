const COLOR_OBJ = {
  color_1: 250,
  color_2: 250,
  color_3: 250,
};

BAR_WIDTH = 0.2;

IS_PLAYING = false;

function processArrayBuffer(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    visualize(audioBuffer, audioContext);
  });
}

async function loadDefaultAudio() {
  if (IS_PLAYING) {
    return;
  }

  const model = document.getElementById("model");
  const backgroundElement = document.getElementById("background");

  model.style.opacity = "1";

  backgroundElement.style.filter = "blur(0px)"; // Apply blur to background

  const startElement = document.getElementById("start");

  startElement.style.opacity = "0"; // Make it fade out
  setTimeout(() => {
    startElement.style.display = "none"; // Completely hide after fading
  }, 300); // Wait for the transition duration (300ms)

  console.warn("debug:Started");
  const response = await fetch("./intro.m4a"); // must be served by your server
  const arrayBuffer = await response.arrayBuffer();
  processArrayBuffer(arrayBuffer);
  IS_PLAYING = true;
}

document.getElementById("start").addEventListener("click", loadDefaultAudio);

// document.getElementById("audio").addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = (e) => {
//     processArrayBuffer(e.target.result);
//   };

//   reader.readAsArrayBuffer(file);
// });

// 🔥 Automatically run at start

function visualize(audioBuffer, audioContext) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const frequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(frequencyBufferLength);

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  source.start();

  const canvasContext = canvas.getContext("2d");

  const barWidth = canvas.width / frequencyBufferLength;
  const midX = canvas.width / 1; // Center of the canvas horizontally
  const midX_2 = canvas.width / 2; // Center of the canvas horizontally

  function draw() {
    requestAnimationFrame(draw);
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    analyser.getByteFrequencyData(frequencyData);

    // Loop over all frequency data and draw mirrored bars

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < frequencyBufferLength; i++) {
      // Calculate position to center the bars and mirror them (right side)
      const x = midX + i * barWidth - canvas.width / 2;

      // Set the color dynamically based on frequency data
      canvasContext.fillStyle =
        "rgb(" +
        (COLOR_OBJ.color_1 + frequencyData[i]) +
        `,${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;

      // Draw bars mirrored across the center (right side)
      canvasContext.fillRect(
        x, // Horizontal position mirrored to the right
        canvas.height - frequencyData[i], // Vertical position
        barWidth - BAR_WIDTH, // Bar width
        frequencyData[i] // Bar height
      );
    }

    for (let i = 0; i < frequencyBufferLength; i++) {
      // Calculate position to center the bars and mirror them (left side)
      const x = midX_2 - i * barWidth; // Move from the center to the left

      // Set the color dynamically based on frequency data
      canvasContext.fillStyle =
        "rgb(" +
        (COLOR_OBJ.color_1 + frequencyData[i]) +
        `,${COLOR_OBJ.color_2}, ${COLOR_OBJ.color_3})`;
      // Draw bars mirrored across the center (left side)

      canvasContext.fillRect(
        x, // Horizontal position mirrored to the left
        canvas.height - frequencyData[i], // Vertical position
        barWidth - BAR_WIDTH, // Bar width
        frequencyData[i] // Bar height
      );
    }
  }

  draw();
}
