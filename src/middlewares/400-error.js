const createError = require('http-errors');

module.exports = (err, req, res, next) => {
    next(
        createError(
            400,
            'Bad request',
            {
                errors: err.error.details.reduce(
                    (acc, { context, message }) => {
                        acc[context.key] = message;

                        return acc;
                    },
                    {}
                )
            }
        )
    );
};