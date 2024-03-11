const server = require('../src/app');

module.exports = async () => {
    console.log('Installing test dependencies');

    const app = await server;

    global.app = app;
}
