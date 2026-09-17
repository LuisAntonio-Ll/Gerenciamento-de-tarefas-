// src/server.js
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const criarApp = require('./app');
const sequelize = require('./infrastructure/database/connection');

// Garante que os models (e seus relacionamentos) sejam carregados antes do sync
require('./infrastructure/database/models/UsuarioModel');
require('./infrastructure/database/models/TarefaModel');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  // Sincronização automática do Sequelize com o banco de dados
  await sequelize.sync();
  console.log('Banco de dados sincronizado com sucesso.');

  const app = criarApp();

  // Expõe a documentação interativa em /api-docs, se já foi gerada (npm run swagger)
  const swaggerOutputPath = path.resolve(__dirname, '../swagger-output.json');
  if (fs.existsSync(swaggerOutputPath)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const swaggerFile = require(swaggerOutputPath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  } else {
    console.warn('swagger-output.json não encontrado. Rode "npm run swagger" para gerá-lo.');
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
  });
}

iniciar();
