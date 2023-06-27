function flatten(arr) {
    let stack = arr
    let result = []
    while (stack.length > 0) {
        if (typeof stack[0] === 'object') {
            if (stack[0].length > 0) {
                stack.unshift(stack[0].shift())
            }
            else {
                stack.shift()
            }
        } else {
            result.push(stack.shift())
        }
    }
    return result
}

export default flatten