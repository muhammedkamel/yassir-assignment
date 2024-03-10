const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityAirQualitySchema = new Schema({
    city: String,
    state: String,
    country: String,
    location: {
        type: { type: String, default: 'Point', required: true },
        coordinates: { type: [Number], index: '2dsphere', required: true }
    },
    current: {
        pollution: {
            ts: { type: Date },
            aqius: Number,
            mainus: String,
            aqicn: Number,
            maincn: String
        },
        weather: {
            ts: { type: Date, default: Date.now },
            tp: Number,
            pr: Number,
            hu: Number,
            ws: Number,
            wd: Number,
            ic: String
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CityAirQuality = mongoose.model('CityAirQuality', cityAirQualitySchema, 'city_air_quality');

module.exports = CityAirQuality;
