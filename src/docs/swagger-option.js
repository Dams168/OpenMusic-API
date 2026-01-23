export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Open Music API',
      version: '1.0.0',
      description: 'API documentation for Open Music application',
    },
    servers: {
      url: 'http://localhost:5000',
    },
  },

  apis: ['src/**/*.js'],
};
