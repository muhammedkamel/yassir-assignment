const R = require('ramda')

module.exports = (airQualityData) => {
    return {
        result: R.pick(['pollution'], airQualityData.current)
    }
}