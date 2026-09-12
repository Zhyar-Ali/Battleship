const Ship = function(lengthShip) {
    const length = lengthShip;
    let numHit = 0;

    const hit = () => {
        if(numHit<length) {
            numHit++;
        }
    };

    const isSunk = () => {
        if(numHit === length) {
            return true;
        }
    };

    return {hit, isSunk, length};
};

export const Gameboard = function() {
    const grid = Array(10).fill().map(() => Array(10).fill(0));

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
                    for(let i = y-1; i < y+ship.length; i++) {
                        grid[x-1][i] = 1;
                    }
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
                        grid[i][y-1] = 1;
                    }
                }
            }
        }
    }
    return {placeShip, grid};
};
// let g = Gameboard();
// let s = Ship(3);
// let s2 = Ship(3);
// g.placeShip(s,5,5,"horizontal");
// g.placeShip(s2,4,5,"vertical");
// g.grid.forEach(value => console.log(value));
