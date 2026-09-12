import { Gameboard } from "./script.js";

describe("placeship", () => {
    test("place ship horizontally", () => {
        const s = {length: 3};
        const g = Gameboard();
        g.placeShip(s,5,5,"horizontal");
        expect(g.grid[4][4]).toBe(1);
        expect(g.grid[4][5]).toBe(1);
        expect(g.grid[4][6]).toBe(1);
    });

    test("place ship vertically", () => {
        const s = {length: 3};
        const g = Gameboard();
        g.placeShip(s,5,5,"vertical");
        expect(g.grid[4][4]).toBe(1);
        expect(g.grid[3][4]).toBe(1);
        expect(g.grid[2][4]).toBe(1);
    });

    test("ship not placed due to collision", () => {
        const s1 = {length: 3};
        const s2 = {length: 3};
        const g = Gameboard();
        g.placeShip(s1,5,5,"vertical");
        g.placeShip(s2,7,5,"vertical");
        expect(g.grid[4][4]).toBe(1);
        expect(g.grid[3][4]).toBe(1);
        expect(g.grid[2][4]).toBe(1);
        expect(g.grid[6][4]).toBe(0);
        expect(g.grid[5][4]).toBe(0);
    });

});
