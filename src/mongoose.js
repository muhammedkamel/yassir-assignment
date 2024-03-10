const mongoose = require('mongoose');
const { mongoUri } = require('../config/app');

module.exports = async function setupMongoose(app) {
    try {
        await mongoose.connect(mongoUri);

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }

    app.set('mongoose', mongoose);
}
