const result = {
    city: "Paris",
    state: "Ile-de-France",
    country: "France",
    location: {
        type: "Point",
        coordinates: [2.351666, 48.859425]
    },
    current: {
        pollution: {
            ts: "2024-03-10T14:00:00.000Z",
            aqius: 22,
            mainus: "o3",
            aqicn: 17,
            maincn: "o3"
        },
        weather: {
            ts: "2024-03-10T14:00:00.000Z",
            tp: 10,
            pr: 995,
            hu: 79,
            ws: 1.54,
            wd: 230,
            ic: "04d"
        }
    }
};


const getNearestCityData = async (lat, lon) => result;

const getFromCache = async (lat, lon) => result;

const fetchNearestCityData = async (lat, lon) => result;

module.exports = {
    getNearestCityData,
    fetchNearestCityData
}