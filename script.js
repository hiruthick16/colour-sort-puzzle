const levels = [
  [ ["red", "blue", "red", "blue"], ["blue", "red", "blue", "red"], [] ],
  [ ["green", "yellow", "green", "yellow"], ["yellow", "green", "yellow", "green"], [], [] ],
  [ ["red", "blue", "yellow", "red"], ["yellow", "blue", "red", "blue"], ["blue", "yellow", "red", "yellow"], [], [] ]
];

let colors = [];
let currentLevel = 0;
let selectedBottle = null;

const gameContainer = document.querySelector(".game-container");

function loadLevel(levelIndex) {
  if (levelIndex >= levels.length) {
    alert("You've completed all levels! Congratulations!");
    return;
  }
  colors = JSON.parse(JSON.stringify(levels[levelIndex])); // Deep copy
  selectedBottle = null;
  createBottles();
}

function createBottles() {
  gameContainer.innerHTML = "";
  colors.forEach((bottleColors, index) => {
    const bottle = document.createElement("div");
    bottle.className = "bottle";
    bottle.dataset.index = index;

    bottleColors.forEach(color => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.background = color;
      bottle.appendChild(colorDiv);
    });

    bottle.addEventListener("click", () => handleBottleClick(index));
    gameContainer.appendChild(bottle);
  });
}

function handleBottleClick(index) {
  if (selectedBottle === null) {
    selectedBottle = index;
  } else {
    if (selectedBottle !== index) {
      moveColor(selectedBottle, index);
    }
    selectedBottle = null;
  }
  createBottles();
  setTimeout(checkWin, 300); // Check after UI updates
}

function moveColor(from, to) {
  if (colors[from].length === 0 || colors[to].length >= 4) return;

  const movingColor = colors[from][colors[from].length - 1];
  let count = 0;

  for (let i = colors[from].length - 1; i >= 0; i--) {
    if (colors[from][i] === movingColor) count++;
    else break;
  }

  while (
    count-- &&
    colors[to].length < 4 &&
    (colors[to].length === 0 || colors[to][colors[to].length - 1] === movingColor)
  ) {
    colors[to].push(colors[from].pop());
  }
}

function checkWin() {
  const isWin = colors.every(bottle => {
    return bottle.length === 0 || (bottle.length === 4 && bottle.every(c => c === bottle[0]));
  });

  if (isWin) {
    alert(Level ${currentLevel + 1} complete!);
    currentLevel++;
    loadLevel(currentLevel);
  }
}

// Start the game
loadLevel(currentLevel);
