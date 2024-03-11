const request = require('supertest');
const IQAirService = require('../../src/services/iqair.service');
const { expect, test, beforeEach, describe, beforeAll } = require('@jest/globals');



describe('GET /api/v1/air-quality', () => {

    // beforeEach(() => {
    //     const result = {
    //         city: "Paris",
    //         state: "Ile-de-France",
    //         country: "France",
    //         location: {
    //             type: "Point",
    //             coordinates: [2.351666, 48.859425]
    //         },
    //         current: {
    //             pollution: {
    //                 ts: "2024-03-10T14:00:00.000Z",
    //                 aqius: 22,
    //                 mainus: "o3",
    //                 aqicn: 17,
    //                 maincn: "o3"
    //             },
    //             weather: {
    //                 ts: "2024-03-10T14:00:00.000Z",
    //                 tp: 10,
    //                 pr: 995,
    //                 hu: 79,
    //                 ws: 1.54,
    //                 wd: 230,
    //                 ic: "04d"
    //             }
    //         }
    //     };

    //     jest.spyOn(IQAirService, 'getNearestCityData').mockImplementation(() => {
    //         console.log('mock function');
    //         return result;
    //     });
    // });

    test('responds with a JSON message', async () => {
        const lat = 2.5;
        const lon = 8.9;
        
        jest.mock('../../src/services/iqair.service');

        const response = await request(app).get(`/api/v1/air-quality?lat=${lat}&lon=${lon}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            result: {
                pollution: {
                    ts: "2024-03-10T14:00:00.000Z",
                    aqius: 22,
                    mainus: "o3",
                    aqicn: 17,
                    maincn: "o3"

                }
            }
        });
    });
});