const createError = require('http-errors');

module.exports = (req, res, next) => {
    next(createError(404, { message: 'Page not found!' }));
};