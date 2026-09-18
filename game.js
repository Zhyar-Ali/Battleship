import { Player, Ship } from "./script.js";

const getRandomNum = function() {
    const random = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    return {random};
}

export const game = function() {
    const orientation = ["horizontal", "vertical"];
    const rand = getRandomNum();
    let player = Player("human");
    let computer = Player("computer");

    let currentPlayer = player;

    placeAllShips(player);
    placeAllShips(computer);

    function placeAllShips(typePlayer) {
        const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
        while(typePlayer.gameBoard.arrShip.length < 5) {
            let shipToAdd = ships[rand.random(0,5)];
            if(!typePlayer.gameBoard.arrShip.includes(shipToAdd)) {
                let x = rand.random(1,11);
                let y = rand.random(1,11);
                let ori = orientation[rand.random(0,2)];
                typePlayer.gameBoard.placeShip(shipToAdd, x, y, ori);
            }
        }
    }

    const switchPlayer= () => {
        if(currentPlayer === player) {
            currentPlayer = computer;
        }else{
            currentPlayer = player;
        }
    }

    const getWinner = () => {
        if(player.gameBoard.allShipSunk()) {
            return computer;
        }
        if(computer.gameBoard.allShipSunk()) {
            return player;
        }
    }

    const playerAttack = (x,y) => {
        if(currentPlayer !== player) {
            throw new Error("It's not the player's turn");
        }
        
        if(computer.gameBoard.receiveAttack(x,y) === -1) {
            console.log("Coordinate already hit\nGo Again");
            return;
        }
        computer.gameBoard.receiveAttack(x,y);
        switchPlayer();
        // display(player)
    }

    const computerAttack = () => {
        const rand = getRandomNum();
        // let x = rand.random(1,11);
        // let y = rand.random(1,11);
        if(currentPlayer !== computer) {
            throw new Error("It's not the computer's turn");
        }
        while (true) {
            let x = rand.random(1,11);
            let y = rand.random(1,11);
            if(player.gameBoard.receiveAttack(x,y) === -1){
                continue;
            }else{
                player.gameBoard.receiveAttack(x,y);
                switchPlayer();
                break;
            }
        }
        // if(player.gameBoard.receiveAttack(x,y) === -1) {
        //     console.log("Coordinate already hit\nGo Again");
        //     return;
        // }
        // player.gameBoard.receiveAttack(x,y);
        // switchPlayer();
        // display(computer);
    }

    const gameOver = () => {
        if(player.gameBoard.allShipSunk() || computer.gameBoard.allShipSunk()) {
            return true;
        }
    }

    const display = (playerType) => {
    console.log(playerType.type);

    console.log("    " + [...Array(10).keys()].map(n => String(n + 1).padStart(2, " ")).join(" "));

    playerType.gameBoard.grid.forEach((row, i) => {
        const rowDisplay = row.map(cell => {
                if (cell === 0) return "·";
                if (cell === "X") return "*";
                return "■";
            }).map(cell => cell.padStart(2, " ")).join(" ");
        console.log(`${String(i + 1).padStart(2, " ")} ${rowDisplay}`);
    });
    console.log("----------");
    };

    return{player, computer, getWinner, computerAttack, playerAttack, display, gameOver};
}

//working fine, but have to make it a loop till game ends