const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'UFO Sightings Tracker API',
    description: "Mulder and Scully's personal database for tracking unidentified aerial phenomena."
  },
  host: 'ufo-sightings-api.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);