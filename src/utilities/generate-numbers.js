function generate2DigitNums(n) {
    const nums = [...Array(n + 1).keys()];
    nums.shift();
    return nums.map(x => x < 10 ? '0' + x.toString() : x.toString())
}

export default generate2DigitNums