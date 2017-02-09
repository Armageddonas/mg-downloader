function findUniqueObjectPos(array, property, value) {
    let pos = -1;
    for (let i = 0; i < array.length; i++) {
        if ((array[i])[property] === value) return i;
    }
    return pos;
}

export {findUniqueObjectPos};