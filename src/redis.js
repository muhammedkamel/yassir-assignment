const { createClient } = require('redis');
const config = require('../config/app');

const setupRedis = () => {
    return createClient(config.redis)
        .on('error', (err) => {
            console.log('Redis Client Error', err);
        })
        .on('connect', () => {
            console.log('Redis Client Connected');
        });
}

module.exports = setupRedis();