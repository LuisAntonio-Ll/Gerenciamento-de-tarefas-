// era: const swaggerAutogen = require('swagger-autogen')();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'API de Gerenciamento de Tarefas',
    description: 'API RESTful construída com Clean Architecture para gerenciamento de tarefas de usuários.',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  // remove as linhas host: 'localhost:3000' e schemes: ['http'], não são mais usadas
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/interfaces/routes/tarefaRoutes.js', './src/interfaces/routes/usuarioRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);