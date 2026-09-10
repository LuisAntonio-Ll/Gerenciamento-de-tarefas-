// src/server.js
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
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

iniciar();
