require('dotenv').config();

const config = {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    iqair: {
        apiKey: process.env.IQAIR_API_KEY,
        apiUrl: process.env.IQAIR_API_URL,
    },
    paris: {
        lat: process.env.PARIS_LAT,
        lon: process.env.PARIS_LON,
    },

    get: function (key) {
        if (!key) {
            return this;
        }

        const keys = key.split('.');
        let value = this;

        keys.forEach(k => {
            value = value[k];
        });

        return value;
    }
};

module.exports = config;