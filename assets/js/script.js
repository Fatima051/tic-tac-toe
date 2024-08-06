// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let running = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartButton.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-cell-index');

    if (gameState[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = gameState[condition[0]];
        const cellB = gameState[condition[1]];
        const cellC = gameState[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!gameState.includes('')) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}
