const config = require('../config/app');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');
const setupCronJobs = require('./cron');
const mongoose = require('mongoose');
const redis = require('./redis');
const setupSwagger = require('./swagger');

mongoose.connect(config.mongoUri);
redis.connect();
setupCronJobs();

const app = express();

setupSwagger(app);

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.use('/api/v1', routes);

app.use(...Object.values(middlewares));

module.exports = app;