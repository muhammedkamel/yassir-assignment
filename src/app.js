const config = require('../config/app');
const express = require('express');
const setupRedis = require('./redis');
const setupMongoose = require('./mongoose');

const app = express();

app.set('config', config);

setupRedis(app);
setupMongoose(app);

module.exports = app;