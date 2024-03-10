const R = require('ramda')

module.exports = (data) => {
    return {
        result: R.pick(['pollution'], data.current),
        ...R.pick(['createdAt'], data),
    }
}