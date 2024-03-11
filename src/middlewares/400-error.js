const createError = require('http-errors');

module.exports = (err, req, res, next) => {
    if (!err.error?.details) {
        return next(err);
    }

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