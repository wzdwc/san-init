export default {
    orderBy(array, key) {
        return array.sort((a, b) => {
            if (parseInt(a[key]) > parseInt(b[key])) {
                return 1
            }
            return -1
        })
    },
    orderByDesc(array, key) {
        return array.sort((a, b) => {
            if (parseInt(a[key]) > parseInt(b[key])) {
                return -1
            }
            return 1
        })
    },
}
