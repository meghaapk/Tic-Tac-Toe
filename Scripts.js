const statusDisplay = document.querySelector('.game--status');

let gameState=["", "", "", "", "", "", "", "", ""];
let gameActive=true;
let currentPlayer="X";

const win=()=>`PLAYER  ${currentPlayer} HAS WON!`;
const draw=()=>`IT'S A DRAW`;
const currentPlayerTurn=()=>`IT'S ${currentPlayer} TURN`;

statusDisplay.innerHTML = currentPlayerTurn();

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



function handleCell(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}

function handleChangePlayer(){
    currentPlayer=currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResult(){
    let roundWon=false;
    for(i=0;i<=7;i++)
    {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = win();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = draw();
        gameActive = false;
        return;
    }

    handleChangePlayer();
}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCell(clickedCell, clickedCellIndex);
    handleResult();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);