const axios = require('axios');
const app = require('../app');

const getNearestCityData = async (lat, lon) => {
    const cachedData = await getFromCache(lat, lon);

    if (cachedData) {
        return cachedData;
    }

    const freshData = await fetchNearestCityData(lat, lon);

    return freshData;
}

const getFromCache = async (lat, lon) => {
    const redisClient = app.get('redisClient');

    try {
        const airQualityData = await redisClient.get(`lat:${lat}:lng:${lon}`);

        if (airQualityData) {
            return JSON.parse(airQualityData);
        }
    } catch (err) {
        console.error(err);
    }

    return null;
}

const fetchNearestCityData = async (lat, lon) => {
    const config = app.get('config');
    const url = `${config.get('iqair.apiUrl')}/v2/nearest_city?lat=${lat}&lon=${lon}&key=${config.get('iqair.apiKey')}`;

    try {
        // @todo handle client errors
        const { data: { data } } = await axios.get(url);

        const redisClient = app.get('redisClient');

        redisClient.set(`lat:${lat}:lng:${lon}`, JSON.stringify(data), { EX: 60 });

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