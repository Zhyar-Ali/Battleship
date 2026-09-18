import { game } from "./game.js";
const boardOne = document.querySelector(".boardOne");
const boardTwo = document.querySelector(".boardTwo");

function makeGrid(board) {
    for(let i=1; i<=10; i++) {
        for(let j=1; j<=10; j++) {
            let cell = document.createElement("div");
            cell.classList.add("grids");
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.append(cell);
        }
    }
}

function renderBoard(gameBoard, domBoard) {
    const cells = domBoard.querySelectorAll(".grids");

    gameBoard.grid.forEach((row,rowIndex) => {
        row.forEach((cell,colIndex) => {

            const domCell = cells[rowIndex*10+colIndex];

            if(cell === 0) {
                domCell.textContent = "";
            }else if(cell === "X") {
                domCell.textContent = "X";
            }else {
                domCell.textContent = "■";
            }
        });
    });
}



makeGrid(boardOne);
makeGrid(boardTwo);

const g = game();

renderBoard(g.player.gameBoard, boardOne);
renderBoard(g.computer.gameBoard, boardTwo);

boardTwo.addEventListener("click", (event) => {
    const cell = event.target;

    if (!cell.classList.contains("grids")) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    g.playerAttack(row,col);
    g.computerAttack(row,col);
    renderBoard(g.player.gameBoard, boardOne);
    renderBoard(g.computer.gameBoard, boardTwo);

    console.log("Clicked:", row, col);

    if (g.gameOver()) {
        console.log("gameOver");
    }
});

