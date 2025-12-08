const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval;
const el = document.querySelector(".swear");

// Ensure data-value exists, if not, set a default
el.addEventListener("mouseover", (event) => {
  clearInterval(interval); // Clear any previous letter shuffling

  // Get a random new tip from WORD_STORAGE each time the user hovers
  const randomTip =
    WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)];

  // Set this random tip as the element's text
  event.target.innerText = randomTip;
  event.target.dataset.value = randomTip; // Update the data-value for consistency
});

el.addEventListener("mouseleave", (event) => {
  let iteration = 0;
  let state = false;

  // Ensure there's a fallback for data-value on mouse leave
  const value = event.target.dataset.value || "Default Tip"; // Fallback to "Default Tip"

  // Start letter-changing effect when mouse leaves
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return value[index];
        }
        return letters[Math.floor(Math.random() * 26)]; // Random letters
      })
      .join("");

    if (iteration >= value.length) {
      clearInterval(interval); // Stop when the original text is reached
    }

    iteration += 1 / 3; // Adjust the speed of the letter change
  }, speed);
});

// Make sure to set an initial value for the element
el.innerText = WORD_STORAGE[Math.floor(Math.random() * WORD_STORAGE.length)];

WORD_STORAGE = [
  "#THINK",
  "#WORK",
  "#UPGRADE",
  "#NOTCH",
  "#LOOSE",
  "#SAMEAGAIN",
  "#GETBACK",
  "#KNOWLEDGE",
  "#LIMITS",
  "#BECAREFUL",
  "#IMPROVE",
  "#JUSTMAKEITDONE",
  "#BEAFRAID",
  "#DON'T MISTAKE",
  "#PERFECT",
  "#THINKFAST",
  "#GIVE_UP",
  "#DON'T_UP",
];
