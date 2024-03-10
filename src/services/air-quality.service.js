const AirQualityResource = require('../resources/air-quality.resource');
const { getNearestCityData, fetchNearestCityData } = require('./iqair.service');
const CityAirQuality = require('../models/city-air-quality.model');

const getAirQuality = async (req, res) => {
    const { lat, lon } = req.query;

    const nearestCityData = await getNearestCityData(lat, lon);

    return res.json(AirQualityResource(nearestCityData));
}

const saveAirQualityForCoordinates = async (lat, lon) => {
    const nearestCityData = await fetchNearestCityData(lat, lon);

    await CityAirQuality.create(nearestCityData);
}

module.exports = {
    getAirQuality,
    saveAirQualityForCoordinates
};