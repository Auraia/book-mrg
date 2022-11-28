const getMeta = () => {
    return {
        createdAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
        updatedAt: {
            type: Number,
            default: (new Date()).getTime(),
        }
    }

}

module.exports = {
    getMeta,
}