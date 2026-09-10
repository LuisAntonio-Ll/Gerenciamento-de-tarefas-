// src/interfaces/routes/tarefaRoutes.js
const { Router } = require('express');

function tarefaRoutes(tarefaController) {
  const router = Router();

  router.get('/tarefas', tarefaController.listar);
  router.post('/tarefas', tarefaController.criar);
  router.put('/tarefas/:id', tarefaController.atualizar);
  router.delete('/tarefas/:id', tarefaController.excluir);
  router.post('/tarefas/:id/iniciar', tarefaController.iniciar);

  return router;
}

module.exports = tarefaRoutes;
