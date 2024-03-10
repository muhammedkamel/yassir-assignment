const mongoose = require('mongoose');
const { db } = require('../config/app');

module.exports = function setupMongoose(app) {
    mongoose.connect(`mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=admin`);

    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
    mongoose.connection.on('error', err => console.error('Error connecting to MongoDB', err));

    app.set('mongoose', mongoose);
}
