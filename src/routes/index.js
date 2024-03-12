const express = require('express');
const { getAirQuality, getMaxPollution } = require('../services/air-quality.service');
const ExpressJoiValidation = require('express-joi-validation');
const { airQualityValidation } = require('../validations/air-quality.validation');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Pollution:
 *       type: object
 *       properties:
 *         ts:
 *           type: string
 *           format: date-time
 *           description: User ID
 *         aqius:
 *           type: integer
 *         mainus:
 *           type: string
 *         aqicn:
 *           type: integer
 *         maincn:
 *           type: string
 *  
 *     Error:
 *       type: object
 *       properties:
 *          message:
 *            type: string 
 *
 *     AirQuality:
 *       type: object
 *       properties:
 *          result:
 *            type: object
 *            properties:
 *              pollution:
 *                $ref: '#/components/schemas/Pollution'
 *     
 *     MaxPollution:
 *       type: object
 *       properties:
 *          createdAt:
 *            type: string
 *            format: date-time
 *          pollution:
 *            $ref: '#/components/schemas/Pollution'
 * 
 * @swagger
 * tags:
 *   name: Air Quality
 * /air-quality:
 *   get:
 *     summary: Get the air quality for geo location
 *     tags: [Air Quality]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Latitude coordinate
 *         type: number
 *         format: float
 *       - in: query
 *         name: lon
 *         required: true
 *         description: Longitude coordinate
 *         type: number
 *         format: float
 *     responses:
 *       200:
 *         description: IQAir response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirQuality'
 *       500:
 *         description: IQAir service is not available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.get('/air-quality', validator.query(airQualityValidation), getAirQuality);

/**
 * @swagger
 * tags:
 *   name: Max Pollution
 * /max-pollution:
 *   get:
 *     summary: Get the max pollution with date-time for paris
 *     tags: [Air Quality]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Latitude coordinate
 *         type: number
 *         format: float
 *       - in: query
 *         name: lon
 *         required: true
 *         description: Longitude coordinate
 *         type: number
 *         format: float
 *     responses:
 *       200:
 *         description: Max Pollution response
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *             schema:
 *               $ref: '#/components/schemas/MaxPollution'
 *
 */
router.get('/max-pollution', validator.query(airQualityValidation), getMaxPollution)

module.exports = router;
