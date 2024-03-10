const Joi = require('joi');

const airQualityValidation = Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required(),
});

module.exports = {
    airQualityValidation,
}