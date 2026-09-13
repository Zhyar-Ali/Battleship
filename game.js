import { Player, Ship } from "./script.js";

const getRandomNum = function() {
    const random = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    return {random};
}

const game = function() {
    const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
    const orientation = ["horizontal", "vertical"];
    const rand = getRandomNum();
    let player = Player("human");
    let computer = Player("computer");

    let currentPlayer = player;

    //place ships for both players randomly
    placeAllShips(player);
    placeAllShips(computer);

    function placeAllShips(typePlayer) {
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
    }

     const computerAttack = () => {
        let x = getRandomNum.rand(1,11);
        let y = getRandomNum.rand(1,11);
        if(currentPlayer !== computer) {
            throw new Error("It's not the computer's turn");
        }
        
        if(player.gameBoard.receiveAttack(x,y) === -1) {
            console.log("Coordinate already hit\nGo Again");
            return;
        }
        player.gameBoard.receiveAttack(x,y);
        switchPlayer();
    }

    return{getWinner, computerAttack, playerAttack};
}