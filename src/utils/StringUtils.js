export default {
    splice(str, length = 4, spliceStr = ' ') {
        if (str === undefined && str.length === 0) {
            throw new Error('param[0] no string')
        }
        str = str.replace(/\s/g, '')
        if (str.length < length) {
            return str
        } else {
            return `${str.substring(0, length)}${spliceStr}${this.splice(str.substring(length, str.length), length, spliceStr)}`
        }
    }
}
