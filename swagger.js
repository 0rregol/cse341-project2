const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Chilean Soccer API',
    description: 'API to manage teams and players of Chilean Soccer',
  },
  
  host: 'cse341-project2-1o9v.onrender.com', 
  schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);