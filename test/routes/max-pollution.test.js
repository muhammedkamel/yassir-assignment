const axios = require('axios');
const MockAdapter = require("axios-mock-adapter");
const request = require('supertest');
const { expect, test, describe, afterEach, beforeEach } = require('@jest/globals');
const app = require('../../src/app');
const CityAirQuality = require('../../src/models/city-air-quality.model');

describe('GET /api/v1/max-pollution', () => {
    beforeEach(async () => {
        await CityAirQuality.deleteMany();
    })

    test('responds with validation error', async () => {
        const response = await request(app).get(`/api/v1/max-pollution`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: {
                lat: '"lat" is required',
                lon: '"lon" is required',
            },
            message: "Bad request",
        });
    });

    test('responds with a JSON message', async () => {
        const lat = 2.5;
        const lon = 8.9;

        await Promise.all([
            CityAirQuality.create({
                "city": "Paris",
                "state": "Ile-de-France",
                "country": "France",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        2.351666,
                        48.859425
                    ]
                },
                "current": {
                    "pollution": {
                        "ts": "2024-03-10T14:00:00.000Z",
                        "aqius": 21,
                        "mainus": "o3",
                        "aqicn": 17,
                        "maincn": "o3"
                    },
                    "weather": {
                        "ts": "2024-03-10T14:00:00.000Z",
                        "tp": 10,
                        "pr": 995,
                        "hu": 79,
                        "ws": 1.54,
                        "wd": 230,
                        "ic": "04d"
                    }
                },
                "createdAt": "2024-02-15T14:00:00.000Z",
            }),
            CityAirQuality.create({
                "city": "Paris",
                "state": "Ile-de-France",
                "country": "France",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        2.351666,
                        48.859425
                    ]
                },
                "current": {
                    "pollution": {
                        "ts": "2024-03-11T20:00:00.000Z",
                        "aqius": 50,
                        "mainus": "p2",
                        "aqicn": 24,
                        "maincn": "n2"
                    }
                },
                "weather": {
                    "ts": "2024-03-10T14:00:00.000Z",
                    "tp": 10,
                    "pr": 995,
                    "hu": 79,
                    "ws": 1.54,
                    "wd": 230,
                    "ic": "04d"
                },
                "createdAt": "2024-03-11T20:34:01.306Z"
            })
        ]);

        const response = await request(app).get(`/api/v1/max-pollution?lat=${lat}&lon=${lon}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "result": {
                "pollution": {
                    "ts": "2024-03-11T20:00:00.000Z",
                    "aqius": 50,
                    "mainus": "p2",
                    "aqicn": 24,
                    "maincn": "n2"
                }
            },
            "createdAt": "2024-03-11T20:34:01.306Z"
        });
    });
});