/** @type {import('jest').Config} */
const config = {
    verbose: false,
    testEnvironment: 'node',
    setupFiles: [
        "dotenv/config",
        '<rootDir>/test/mock.js'
    ],
    globalSetup: '<rootDir>/test/setup-jest.js',
    globalTeardown: '<rootDir>/test/teardown-jest.js',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',
    ]
}

module.exports = config;