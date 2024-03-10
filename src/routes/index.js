const express = require('express');
const { getAirQuality, getMaxPollution } = require('../services/air-quality.service');
const ExpressJoiValidation = require('express-joi-validation');
const { airQualityValidation } = require('../validations/air-quality.validation');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/air-quality', validator.query(airQualityValidation), getAirQuality);
router.get('/max-pollution', validator.query(airQualityValidation), getMaxPollution)

module.exports = router;
