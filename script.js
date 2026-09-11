export const Ship = function(lengthShip) {
    const length = lengthShip;
    let numHit = 0;
    let sunk = false;

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

    return {hit, isSunk};
};