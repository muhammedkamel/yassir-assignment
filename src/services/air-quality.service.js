const app = require('../app');
const AirQualityResource = require('../resources/air-quality.resource');
const { getNearestCityData } = require('./iqair.service');

const getAirQuality = async (req, res) => {
    const { lat, lon } = req.query;

    const nearestCityData = await getNearestCityData(lat, lon);

    return res.json(AirQualityResource(nearestCityData));
}

module.exports = {
    getAirQuality,
};