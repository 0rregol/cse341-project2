const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Chilean Soccer API',
    description: 'API to manage teams and players of Chilean Soccer',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);