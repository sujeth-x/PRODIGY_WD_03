 <script>
        const board = document.getElementById('board');
        const winnerDisplay = document.getElementById('winner');

        let currentPlayer = 'X';
        let gameState = ["", "", "", "", "", "", "", "", ""];

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function checkWinner() {
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    return gameState[a];
                }
            }
            return gameState.includes("") ? null : "Draw";
        }

        function handleClick(event) {
            const cell = event.target;
            const cellIndex = cell.getAttribute('data-index');

            if (gameState[cellIndex] !== "" || winnerDisplay.textContent) return;

            gameState[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');

            const result = checkWinner();
            if (result) {
                if (result === "Draw") {
                    winnerDisplay.textContent = "It's a Draw!";
                } else {
                    winnerDisplay.textContent = `Player ${result} Wins!`;
                }
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function resetGame() {
            gameState = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = 'X';
            winnerDisplay.textContent = "";
            renderBoard();
        }

        function renderBoard() {
            board.innerHTML = "";
            gameState.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.setAttribute('data-index', index);
                cellElement.textContent = cell;
                cellElement.addEventListener('click', handleClick);
                board.appendChild(cellElement);
            });
        }

        renderBoard();
    </script>
