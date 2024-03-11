/** @type {import('jest').Config} */
const config = {
    verbose: false,
    testEnvironment: 'node',
    globalSetup: '<rootDir>/test/setup-jest.js',
    globalTeardown: '<rootDir>/test/teardown-jest.js',
}

module.exports = config;