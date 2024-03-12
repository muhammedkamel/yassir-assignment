const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = function setupSwagger(app) {
    const options = {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "Swagger doc",
                version: "0.1.0",
            },
            servers: [
                {
                    url: "http://localhost:3000/api/v1",
                },
            ],
        },
        apis: ["./src/routes/*.js"],
    };

    const specs = swaggerJsdoc(options);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
