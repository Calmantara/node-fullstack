const { add } = require("./app")

test("add return a+b", () => {
    expect(add(1, 2)).toBe(3)
})

test("add undefined for a", () => {
    expect(add(undefined, 2)).toBe(2)
})

test("add undefined for b", () => {
    expect(add(1, undefined)).toBe(1)
})