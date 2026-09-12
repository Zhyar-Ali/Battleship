import { Gameboard, Ship } from "./script.js";

describe("placeship", () => {
    test("place ship horizontally", () => {
        const s = Ship(3);
        const g = Gameboard();
        g.placeShip(s,5,5,"horizontal");
        expect(g.grid[4][4]).toBe(s);
        expect(g.grid[4][5]).toBe(s);
        expect(g.grid[4][6]).toBe(s);
    });

    test("place ship vertically", () => {
        const s = Ship(3);
        const g = Gameboard();
        g.placeShip(s,5,5,"vertical");
        expect(g.grid[4][4]).toBe(s);
        expect(g.grid[3][4]).toBe(s);
        expect(g.grid[2][4]).toBe(s);
    });

    test("ship not placed due to collision", () => {
        const s1 = Ship(3);
        const s2 = Ship(3);
        const g = Gameboard();
        g.placeShip(s1,5,5,"vertical");
        g.placeShip(s2,7,5,"vertical");
        expect(g.grid[4][4]).toBe(s1);
        expect(g.grid[3][4]).toBe(s1);
        expect(g.grid[2][4]).toBe(s1);
        expect(g.grid[6][4]).toBe(0);
        expect(g.grid[5][4]).toBe(0);
    });
});

describe("receiveAttack", () => {
    test("ship hit", () => {
        const s = Ship(3);
        const g = Gameboard();
        g.placeShip(s,5,5,"horizontal");
        g.receiveAttack(5,5);
        expect(s.getHit()).toBe(1);
    });

    test("ship missed", () => {
        const s = Ship(3);
        const g = Gameboard();
        g.placeShip(s,5,5,"horizontal");
        g.receiveAttack(1,1);
        expect(g.grid[0][0]).toMatch("X");
    });
});
