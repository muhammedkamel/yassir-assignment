const cron = require('node-cron');
const { saveAirQualityForCoordinates } = require('./services/air-quality.service');

module.exports = function setupCronJobs(app) {
    const config = app.get('config');

    cron.schedule('* * * * *', saveAirQualityForCoordinates.bind(null, config.get('paris.lat'), config.get('paris.lon')));

    app.set('cron', cron);
}