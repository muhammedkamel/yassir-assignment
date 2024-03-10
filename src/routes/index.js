const express = require('express');
const { getAirQuality } = require('../services/air-quality.service');
const ExpressJoiValidation = require('express-joi-validation');
const { airQualityValidation } = require('../validations/air-quality.validation');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/air-quality', validator.query(airQualityValidation), getAirQuality);

module.exports = router;
