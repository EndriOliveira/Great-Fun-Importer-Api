const swaggerAutogen = require('swagger-autogen');

const documentationDescription = {
  info: {
    title: 'Great Fun Importer API',
    description: 'API documentation for Great Fun Importer',
    version: '1.0.0',
  },
  servers: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const outputDocumentationFile = './documentation.json';
const endpointsFile = ['./src/routes/index.routes.js'];
swaggerAutogen({ openapi: '3.0.0' })(
  outputDocumentationFile,
  endpointsFile,
  documentationDescription
);
