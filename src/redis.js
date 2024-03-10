const { createClient } = require('redis');
const config = require('../config/app');

module.exports = async function setupRedis(app) {
    const redisClient = await createClient(config.redis)
        .on('error', (err) => {
            console.log('Redis Client Error', err);
        })
        .connect();

    console.log('Connected to redis');

    app.set('redisClient', redisClient);
};
