let currentPlayer = 'X';
let gameStatus = ['', '', '', '', '', '', '', '', ''];
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

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

function handleClick(cellIndex) {
    if (gameStatus[cellIndex] === '' && !checkWin()) {
        gameStatus[cellIndex] = currentPlayer;
        cells[cellIndex].innerText = currentPlayer;
        
        if (checkWin()) {
            statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        } else if (!gameStatus.includes('')) {
            statusDisplay.innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerText = currentPlayer === 'X' ? "Player X's turn" : "Computer's turn";
            
            if (currentPlayer === 'O') {
                setTimeout(computerMove, 1000); // Simulate computer's delay
            }
        }
    }
}

function computerMove() {
    let emptyCells = gameStatus.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let cellIndex = emptyCells[randomIndex];
        
        gameStatus[cellIndex] = 'O';
        cells[cellIndex].innerText = 'O';

        if (checkWin()) {
            statusDisplay.innerText = "Computer wins!";
        } else if (!gameStatus.includes('')) {
            statusDisplay.innerText = "It's a draw!";
        } else {
            currentPlayer = 'X';
            statusDisplay.innerText = "Player X's turn";
        }
    }
}

function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameStatus[a] !== '' && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    currentPlayer = 'X';
    gameStatus = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
}
