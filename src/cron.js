const cron = require('node-cron');
const { saveAirQualityForCoordinates } = require('./services/air-quality.service');
const config = require('../config/app');

module.exports = function setupCronJobs() {
    cron.schedule('* * * * *', saveAirQualityForCoordinates.bind(null, config.get('paris.lat'), config.get('paris.lon')));
}