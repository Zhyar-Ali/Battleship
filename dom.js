import { game } from "./game.js";
const boardOne = document.querySelector(".boardOne");
const boardTwo = document.querySelector(".boardTwo");
const body = document.querySelector("body");

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

function renderBoardcomp(gameBoard, domBoard) {
    const cells = domBoard.querySelectorAll(".grids");

    gameBoard.grid.forEach((row,rowIndex) => {
        row.forEach((cell,colIndex) => {  
            const domCell = cells[rowIndex*10+colIndex];
            domCell.textContent = "";
            if(cell === 0) {
                domCell.textContent = "";
            }else if(cell === "X") {
                domCell.textContent = "X";
            }
        });
    });
}

makeGrid(boardOne);
makeGrid(boardTwo);

let g = game();

renderBoard(g.player.gameBoard, boardOne);
renderBoardcomp(g.computer.gameBoard, boardTwo);

boardTwo.addEventListener("click", (event) => {
    const cell = event.target;

    if (!cell.classList.contains("grids")) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    g.playerAttack(row,col);
    g.computerAttack(row,col);
    renderBoard(g.player.gameBoard, boardOne);
    renderBoardcomp(g.computer.gameBoard, boardTwo);

    console.log("Clicked:", row, col);

    if (g.gameOver()) {
        boardTwo.style.pointerEvents = 'none';
        const gameWin = document.createElement('div');
        gameWin.classList.add("winner");
        gameWin.textContent = `${g.getWinner()} won!`;
        body.append(gameWin);

        const restart = document.createElement('div');
        restart.classList.add("restart");
        restart.textContent = `Restart`;
        gameWin.append(restart);

        restart.addEventListener("click", () => {
            boardTwo.style.pointerEvents = 'auto';
            body.removeChild(document.querySelector(".winner"));
            g = game();
            renderBoard(g.player.gameBoard, boardOne);
            renderBoardcomp(g.computer.gameBoard, boardTwo);
        });
    }
});
