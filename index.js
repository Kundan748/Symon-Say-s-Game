const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector(
  '.bottom-left-panel'
);
const bottomRight = document.querySelector(
  '.bottom-right-panel'
);
let score=0;
const getRandomPanel = () => {
  const panels = [
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  ];
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = panel => {
  return new Promise(resolve => {
    panel.className += ' active';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' active',
        ''
      );
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
};

let canClick = false;

const panelClicked = panelClicked => {
  if (!canClick) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      score++;
      startFlashing();
    }
  } else {
    // end game
    alert('game over! Score is '+score);
  }
};

const startFlashing = async () => {
  
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};
//for refress the page
const refreshBtn = document.getElementById("btnRefresh");

function handleClick() {
  alert('game over! Score is '+score);
  window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);

//startFlashing();