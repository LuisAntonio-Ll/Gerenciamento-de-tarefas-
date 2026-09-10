// src/app.js
const express = require('express');

// Repositórios
const TarefaRepository = require('./infrastructure/repositories/TarefaRepository');
const UsuarioRepository = require('./infrastructure/repositories/UsuarioRepository');

// Services (Casos de Uso)
const ListarTarefasService = require('./application/services/ListarTarefasService');
const CriarTarefaService = require('./application/services/CriarTarefaService');
const AtualizarTarefaService = require('./application/services/AtualizarTarefaService');
const ExcluirTarefaService = require('./application/services/ExcluirTarefaService');
const IniciarTarefaService = require('./application/services/IniciarTarefaService');
const CriarUsuarioService = require('./application/services/CriarUsuarioService');

// Controllers
const TarefaController = require('./interfaces/controllers/TarefaController');
const UsuarioController = require('./interfaces/controllers/UsuarioController');

// Rotas
const tarefaRoutes = require('./interfaces/routes/tarefaRoutes');
const usuarioRoutes = require('./interfaces/routes/usuarioRoutes');

function criarApp() {
  const app = express();
  app.use(express.json());

  // 1) Instancia os repositórios
  const tarefaRepository = new TarefaRepository();
  const usuarioRepository = new UsuarioRepository();

  // 2) Injeta os repositórios nos services
  const listarTarefasService = new ListarTarefasService(tarefaRepository);
  const criarTarefaService = new CriarTarefaService(tarefaRepository);
  const atualizarTarefaService = new AtualizarTarefaService(tarefaRepository);
  const excluirTarefaService = new ExcluirTarefaService(tarefaRepository);
  const iniciarTarefaService = new IniciarTarefaService(tarefaRepository);
  const criarUsuarioService = new CriarUsuarioService(usuarioRepository);

  // 3) Injeta os services nos controllers
  const tarefaController = new TarefaController({
    listarTarefasService,
    criarTarefaService,
    atualizarTarefaService,
    excluirTarefaService,
    iniciarTarefaService,
  });
  const usuarioController = new UsuarioController({ criarUsuarioService });

  // 4) Mapeia as rotas
  app.use(tarefaRoutes(tarefaController));
  app.use(usuarioRoutes(usuarioController));

  return app;
}

module.exports = criarApp;
