const axios = require('axios');
const redis = require('../redis');
const config = require('../../config/app');

const getNearestCityData = async (lat, lon) => {
    const cachedData = await getFromCache(lat, lon);

    if (cachedData) {
        return cachedData;
    }

    const freshData = await fetchNearestCityData(lat, lon);

    return freshData;
}

const getFromCache = async (lat, lon) => {
    try {
        const airQualityData = await redis.get(`lat:${lat}:lng:${lon}`);

        if (airQualityData) {
            return JSON.parse(airQualityData);
        }
    } catch (err) {
        console.error(err);
    }

    return null;
}

const fetchNearestCityData = async (lat, lon) => {
    const url = `${config.get('iqair.apiUrl')}/v2/nearest_city?lat=${lat}&lon=${lon}&key=${config.get('iqair.apiKey')}`;

    try {
        // @todo handle client errors
        const { data: { data } } = await axios.get(url);

        redis.set(`lat:${lat}:lng:${lon}`, JSON.stringify(data), { EX: 60 });

        return data;
    } catch (err) {
        console.error(err);

        throw new Error('IQAir service currently not available');
    }
}

module.exports = {
    getNearestCityData,
    fetchNearestCityData
}