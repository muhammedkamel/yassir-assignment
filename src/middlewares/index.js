const notFoundErrorHandler = require('./404-error');
const badRequestErrorHandler = require('./400-error');
const genericErrorHandler = require('./500-error');

module.exports = {
    badRequestErrorHandler,
    notFoundErrorHandler,
    genericErrorHandler
};