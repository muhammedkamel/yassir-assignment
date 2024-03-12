const redis = require('redis');
const config = require('../config/app');

const setupRedis = () => {
    return redis.createClient({
        socket: {
            host: config.get('redis.host'),
            port: config.get('redis.port'),
        },
        username: config.get('redis.username'),
        password: config.get('redis.password'),
    })
        .on('error', (err) => {
            console.log('Redis Client Error', err);
        })
        .on('connect', () => {
            console.log('Redis Client Connected');
        });
}

module.exports = setupRedis();