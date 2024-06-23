document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

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

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        
        if (board[index] !== null || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            alert('Draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] !== null && board[a] === board[b] && board[a] === board[c];
        });
    };

    const resetGame = () => {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
