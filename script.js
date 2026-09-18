export const Ship = function(lengthShip) {
    const length = lengthShip;
    let numHit = 0;

    const hit = () => {
        if(numHit<length) {
            numHit += 1;
        }
    };

    const isSunk = () => {
        if(numHit === length) {
            return true;
        }
        return false;
    };

    const getHit = () => {
        return numHit;
    };

    return {hit, isSunk, getHit, numHit,length};
};

export const Gameboard = function() {
    const grid = Array(10).fill().map(() => Array(10).fill(0));
    const arrShip = [];
    const arrMissedCoor = [];
    let missedAttack = 0;

    const placeShip = (ship, x, y, orientation) => {
        let isValid = true;

        if(x>=1 && x<=10 && y>=1 && y<=10) {
            if(orientation === "horizontal" && y+ship.length <= 10) {
                grid[x-1].slice(y-1, y+ship.length-1).forEach(value => {
                    if(value !== 0) {
                        isValid = false;
                    }
                });
                if(isValid) {
                    for(let i = y-1; i < y+ship.length-1; i++) {
                        grid[x-1][i] = ship;
                    }
                    arrShip.push(ship);
                }
            }
            if(orientation === "vertical" && x-ship.length >= 0) {
                grid.slice(x-ship.length, x).forEach(value => {   
                    if(value[y-1] !== 0) {
                        isValid = false;
                    }
                }); 
                if(isValid) {
                    for(let i = x-1; i >= x-ship.length; i--) {
                        grid[i][y-1] = ship;
                    }
                    arrShip.push(ship);
                }
            }
        }
    }

    const receiveAttack = (x, y) => {
        if(x>=1 && x<=10 && y>=1 && y<=10) {
            const target = grid[x-1][y-1];
            
            if(target !== 0 && target !== "X") {
                target.hit();
                grid[x-1][y-1] = "X";
            }
            else if(target === 0) {
                grid[x-1][y-1] = "X"
                arrMissedCoor.push([x,y]);
                missedAttack++;
                return "miss";
            }else{
                return -1;
            }

            if(target.isSunk()) {
                const index = arrShip.indexOf(target);
                if(index !== -1) {
                    arrShip.splice(index,1);
                }
            }
        }
    };

    const getMissedAttack = () => {
        return missedAttack;
    };

    const allShipSunk = () => {
        if(arrShip.length === 0) {
            return true;
        }
        return false;
    };

    return {placeShip, receiveAttack, getMissedAttack, allShipSunk, arrShip, grid};
};

export const Player = function(typeOfPlayer) {
    const type = typeOfPlayer;
    const gameBoard = Gameboard();
    return {type, gameBoard};
};