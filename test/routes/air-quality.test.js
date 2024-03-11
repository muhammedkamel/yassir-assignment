const axios = require('axios');
const MockAdapter = require("axios-mock-adapter");
const request = require('supertest');
const { expect, test, describe, beforeEach } = require('@jest/globals');
const app = require('../../src/app');
const redis = require('../../src/redis');

describe('GET /api/v1/air-quality', () => {

    beforeEach(async () => {
        await redis.FLUSHALL();
    });

    test('responds with validation error', async () => {
        const response = await request(app).get(`/api/v1/air-quality`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            errors: {
                lat: '"lat" is required',
                lon: '"lon" is required',
            },
            message: "Bad request",
        });
    });

    test('IQAir service is not available', async () => {
        const lat = 2.5;
        const lon = 8.9;

        const mock = new MockAdapter(axios);
        mock.onGet().reply(500, {
            "status": "error",
            "message": "Internal Server Error"
        });

        const response = await request(app).get(`/api/v1/air-quality?lat=${lat}&lon=${lon}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            message: "IQAir service currently not available",
        });
    });

    test('responds with a JSON message', async () => {
        const lat = 2.5;
        const lon = 8.9;

        const mock = new MockAdapter(axios);
        mock.onGet().reply(200, {
            "status": "success",
            "data": {
                "city": "Inashiki",
                "state": "Ibaraki",
                "country": "Japan",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        140.32356,
                        35.95633
                    ]
                },
                "current": {
                    "pollution": {
                        "ts": "2024-03-09T03:00:00.000Z",
                        "aqius": 8,
                        "mainus": "p2",
                        "aqicn": 3,
                        "maincn": "p2"
                    },
                    "weather": {
                        "ts": "2024-03-09T04:00:00.000Z",
                        "tp": 10,
                        "pr": 1003,
                        "hu": 35,
                        "ws": 2.68,
                        "wd": 270,
                        "ic": "01d"
                    }
                }
            }
        });

        const response = await request(app).get(`/api/v1/air-quality?lat=${lat}&lon=${lon}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            result: {
                "pollution": {
                    "ts": "2024-03-09T03:00:00.000Z",
                    "aqius": 8,
                    "mainus": "p2",
                    "aqicn": 3,
                    "maincn": "p2"
                },
            }
        });
    });
});