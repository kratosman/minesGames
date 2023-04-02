var grid = document.getElementById('grid');
var score = document.getElementById('score');
var cells = [];
var maxCoins = 22;
var bombIndex = generateBombNumber(4);
var btnStartGame = document.getElementById('start-game');
var betInput = document.getElementById('bet-input');
var balance = 250; // Starting balance, can be adjusted as needed
var balanceWallet = document.getElementById('balance');
var btnCashout = document.getElementById('btnCashout');
balanceWallet.textContent = balance;
var btnReset = document.getElementById('btnReset');

// var currentScore;
var bet = 0;
let betPlaced = false;
let gameStarted = false;
btnCashout.disabled = true;
btnCashout.style.backgroundColor = "gray";

for(var i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell')
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    cells.push(cell);
    grid.appendChild(cell);
}

btnStartGame.addEventListener('click', () => {
    if (betInput.value === "") {
        alert("Please make sure you have a bet to start the game");
    } else {
        betPlaced = true;
        bet = parseInt(betInput.value)
        score.textContent = bet 
       if (bet > balance) {
            alert('You dont have enough money to place that bet');
       } else if (isNaN(bet)) {
        alert("Please enter a valid bet amount");
       }
    }
    gameStarted = true;
    balance -= bet
    balanceWallet.textContent = balance;

    btnStartGame.disabled = true;
    btnStartGame.style.backgroundColor = "gray";
    btnCashout.disabled = false;
    btnCashout.style.backgroundColor = "rgb(218, 7, 56)";
})

function handleClick(event) {

    if (!gameStarted || !betPlaced) {
        alert("Please start the game and place a bet first!");
        return;
    }

    var index = parseInt(event.target.dataset.index);
    if (event.target.classList.contains('flipped')) {
        return;
    }
    if (bombIndex.includes(index)) {
        event.target.classList.add('flipped');
        event.target.classList.add('bomb');
        gameOver();
    } else {
        event.target.classList.add('flipped');
        event.target.classList.add('coin');
    
        bet++ 
        score.textContent = bet;
        if(bet === maxCoins) {
            win();
        }
    }

    
}

function generateBombNumber(number) {
    var bombIndices  = [];
    while (bombIndices.length < number) {
        var index = Math.floor(Math.random() * 25);
        if (!bombIndices.includes(index)) {
            bombIndices.push(index)
        }
    }

    return bombIndices;
}
btnReset.addEventListener('click', resetGame);
btnReset.disabled = true;
btnReset.style.opacity = "0.3";
btnReset.style.cursor = "not-allowed";

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('flipped', 'coin', 'bomb');
    });
    bet = 0;
    
    btnStartGame.disabled = false
    btnStartGame.style.backgroundColor = "rgb(218, 7, 56)";
    betInput.disabled = false;
    btnReset.disabled = true;
    btnReset.style.opacity = "0.3";
btnReset.style.cursor = "not-allowed";
    bombIndex = generateBombNumber(4);
}

function gameOver() {
    btnReset.disabled = false;
    btnReset.style.opacity = "1";
btnReset.style.cursor = "pointer";
    betInput.disabled = true;
    alert('Game Over');
    cells.forEach(cell => {
        var index = parseInt(cell.dataset.index);
        if (!cell.classList.contains('flipped')) {
            cell.classList.add('flipped');
            if (bombIndex.includes(index)) {
                cell.classList.add('bomb');
            } else {
                cell.classList.add('coin');
            }
        }
    })


    btnStartGame.disabled = true
    
    btnCashout.disabled = true;
    btnCashout.style.backgroundColor = "gray";
    gameStarted = false;

    betInput.value = "";

    score.textContent = 0;

    if (currentScore > maxCoins) {
        maxCoins = currentScore; 
        score.textContent = maxCoins;
    }

    bet = 0;

    if(bet === 0 ) {
        btnCashout.disabled = true;
        btnCashout.style.backgroundColor = "gray";
    }

    resetGame()

}

function win() {
    alert("Win");
}

btnCashout.addEventListener('click', () => {
    btnReset.disabled = true;
    btnReset.style.opacity = "0.3";
btnReset.style.cursor = "not-allowed";
    balance += bet;
    balanceWallet.textContent = balance;

    currentScore = bet;

    score.textContent = 0;
    gameStarted = false;
    betPlaced = false;
    betInput.value = "";

    btnStartGame.disabled = true;
    btnStartGame.style.backgroundColor = "gray";
    btnCashout.disabled = true;
    btnCashout.style.backgroundColor = "gray";

    if (currentScore > maxCoins) {
        maxCoins = currentScore; 
        score.textContent = maxCoins;
    }

    bet = 0;

    if (betInput.value === "") {
        btnStartGame.disabled = true;
        btnStartGame.style.backgroundColor = "gray";
    } 

    betInput.addEventListener('keyup', () => {
        if (betInput.value === "") {
            btnStartGame.disabled = true;
            btnStartGame.style.backgroundColor = "gray";
        } else {
            btnStartGame.disabled = false;
            btnStartGame.style.backgroundColor = "rgb(218, 7, 56)";
        }
    })

})