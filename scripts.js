const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const playAgainButton = document.getElementById('playAgainButton');
const symbolButtons = document.querySelectorAll('.symbolButton');
const symbolSelection = document.getElementById('symbolSelection');

let currentPlayer;
let player1Symbol = 'X';
let player2Symbol = 'O';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        playAgainButton.style.display = 'block';
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a draw!'), 100);
        playAgainButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1Symbol;
    cells.forEach(cell => cell.textContent = '');
    playAgainButton.style.display = 'none';
}

function selectSymbols(event) {
    player1Symbol = event.target.getAttribute('data-symbol');
    player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
    currentPlayer = player1Symbol;
    symbolSelection.style.display = 'none';
    board.style.display = 'grid';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
playAgainButton.addEventListener('click', resetGame);
symbolButtons.forEach(button => button.addEventListener('click', selectSymbols));
