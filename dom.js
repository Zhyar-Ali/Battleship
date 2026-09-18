const boardOne = document.querySelector(".boardOne");
const boardTwo = document.querySelector(".boardTwo");

function makeGrid(board) {
    for(let i=1; i<=10; i++) {
        for(let j=1; j<=10; j++) {
            let border = document.createElement("div");
            border.classList.add("grids");
            board.append(border);
        }
    }
}
makeGrid(boardOne);
makeGrid(boardTwo);