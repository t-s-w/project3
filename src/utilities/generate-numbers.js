function generate2DigitNums(n) {
    const nums = [...Array(n + 1).keys()];
    return nums.map(x => x < 10 ? '0' + x.toString() : x.toString())
}

export default generate2DigitNums