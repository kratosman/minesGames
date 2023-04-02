
// Define the game variables
var grid = document.getElementById('grid');
var score = document.getElementById('score');
var timer = document.getElementById('timer');
var cells = [];
var numCoins = 0;
var maxCoins = 22;
var bombIndices = generateBombIndices(4);
var secondsLeft = 30;
var intervalID;

// Create the grid of cells
for (var i = 0; i < 25; i++) {
  var cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleClick);
  cells.push(cell);
  grid.appendChild(cell);
}

// Handle clicks on the cells
function handleClick(event) {
  var index = parseInt(event.target.dataset.index);
  if (event.target.classList.contains('flipped')) {
    return;
  }
  if (bombIndices.includes(index)) {
    event.target.classList.add('flipped');
    event.target.classList.add('bomb');
    gameOver();
  } else {
    event.target.classList.add('flipped');
    event.target.classList.add('coin');
    numCoins++;
    score.textContent = numCoins;
    if (numCoins === maxCoins) {
      win();
    }
  }
}

// Generate an array of random bomb indices
function generateBombIndices(numBombs) {
  var bombIndices = [];
  while (bombIndices.length < numBombs) {
    var index = Math.floor(Math.random() * 25);
    if (!bombIndices.includes(index)) {
      bombIndices.push(index);
    }
  }
  return bombIndices;
}


// End the game if the player loses
function gameOver() {
  alert('Game over!');

   // Show all the cells with their fronts, including the bombs
  cells.forEach(function(cell) {
    var index = parseInt(cell.dataset.index);
    if (!cell.classList.contains('flipped')) {
      cell.classList.add('flipped');
      if (bombIndices.includes(index)) {
        cell.classList.add('bomb');
      } else {
        cell.classList.add('coin');
      }
    }
  });
}

// End the game if the player wins
function win() {
  alert('You win!');
}