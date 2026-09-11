import { calculate } from "./script.js";

test("addition is working", () => {
    expect(calculate().add(1,2)).toBe(3);
});