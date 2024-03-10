const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityAirQualitySchema = new Schema({
    city: String,
    state: String,
    country: String,
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    current: {
        pollution: {
            ts: { type: Date },
            aqius: { type: Number, index: -1 },
            mainus: String,
            aqicn: { type: Number, index: -1 },
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

cityAirQualitySchema.index({ location: '2dsphere' });

const CityAirQuality = mongoose.model('CityAirQuality', cityAirQualitySchema, 'city_air_quality');

module.exports = CityAirQuality;
