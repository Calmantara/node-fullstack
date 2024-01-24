function print3(arr) {
    const n = new Object

    arr.forEach(element => {
        if (n[element] !== undefined) {
            n[element]++
        } else {
            n[element] = 1
        }
    });

    const res = []
    for (key in n) {
        if (n[key] >= 3) {
            res.push(Number(key))
        }
    }
    return res
}
console.log(print3([1, 2, 4, 3, 1, 3, 2, 2, 4, 4]))