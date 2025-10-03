const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

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

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winningCombo = checkWin();
  if (winningCombo) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
    highlightWinningCells(winningCombo);
    updateScore(currentPlayer);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return condition; // return the winning combo
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("win");
  });
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));