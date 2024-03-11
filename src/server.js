const config = require('../config/app');
const app = require('./app');

const server = app.listen(config.get('port'), () => console.info(`Server started on port: ${config.get('port')}`));

server.on('listening', () => {
    console.log('IQAir app started on http://%s:%d', config.get('host'), config.get('port'));
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', { promise: p, reason });
});

function exitHandler() {
    console.log('EXITING... bye bye 👋');
    process.exit();
}

// normal close
process.on('exit', exitHandler.bind(null));
// Interrupt (CTRL+C)
process.on('SIGINT', exitHandler.bind(null));
// Kill PID
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));
