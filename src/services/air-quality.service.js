const AirQualityResource = require('../resources/air-quality.resource');
const MaxPollutionResource = require('../resources/max-pollution.resource');
const { getNearestCityData, fetchNearestCityData } = require('./iqair.service');
const CityAirQuality = require('../models/city-air-quality.model');

const getAirQuality = async (req, res, next) => {
    const { lat, lon } = req.query;

    try {
        const nearestCityData = await getNearestCityData(lat, lon);

        return res.json(AirQualityResource(nearestCityData));
    } catch (err) {
        next(err);
    }
}

const getMaxPollution = async (req, res) => {
    const { lat, lon } = req.query;

    const maxPollution = await CityAirQuality
        .findOne({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    }
                }
            }
        })
        .sort({ "current.pollution.aqius": -1, "current.pollution.aqicn": -1 });

    return res.json(MaxPollutionResource(maxPollution));
}

const saveAirQualityForCoordinates = async (lat, lon) => {
    const nearestCityData = await fetchNearestCityData(lat, lon);

    await CityAirQuality.create(nearestCityData);
}

module.exports = {
    getAirQuality,
    getMaxPollution,
    saveAirQualityForCoordinates
};