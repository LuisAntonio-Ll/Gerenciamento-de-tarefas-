// src/interfaces/routes/tarefaRoutes.js
// OBS: os comentários #swagger ficam aqui (e não só no controller) porque o
// swagger-autogen lê o TEXTO deste arquivo, exatamente no ponto onde cada rota
// é registrada — ele não consegue "seguir" até tarefaController.criar, que é
// injetado em tempo de execução.
const { Router } = require('express');
const validate = require('../middlewares/validate');
const { criarTarefaSchema } = require('../middlewares/tarefaSchema');

function tarefaRoutes(tarefaController) {
  const router = Router();

  router.get('/tarefas', (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Lista todas as tarefas cadastradas'
    return tarefaController.listar(req, res);
  });

  router.post('/tarefas', validate(criarTarefaSchema), (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Cria uma nova tarefa vinculada a um usuário'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["titulo", "usuarioId"],
              properties: {
                titulo: { type: "string", example: "Estudar Clean Architecture" },
                descricao: { type: "string", example: "Ler sobre camadas e SRP" },
                usuarioId: { type: "integer", example: 1 }
              }
            }
          }
        }
      }
      #swagger.responses[201] = { description: 'Tarefa criada com sucesso, status inicial PENDENTE' }
      #swagger.responses[400] = { description: 'Erro de validação (Zod): título ausente ou usuarioId inválido' }
    */
    return tarefaController.criar(req, res);
  });

  router.put('/tarefas/:id', (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Atualiza o título/descrição de uma tarefa existente'
      #swagger.responses[200] = { description: 'Tarefa atualizada com sucesso' }
      #swagger.responses[404] = { description: 'Tarefa não encontrada' }
    */
    return tarefaController.atualizar(req, res);
  });

  router.delete('/tarefas/:id', (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Exclui uma tarefa do banco de dados'
      #swagger.responses[204] = { description: 'Tarefa excluída com sucesso' }
      #swagger.responses[404] = { description: 'Tarefa não encontrada' }
    */
    return tarefaController.excluir(req, res);
  });

  router.post('/tarefas/:id/iniciar', (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Inicia uma tarefa (PENDENTE -> EM_ANDAMENTO)'
      #swagger.responses[200] = { description: 'Tarefa iniciada com sucesso' }
      #swagger.responses[400] = { description: 'Retornado quando o usuário atinge o limite máximo de 5 tarefas com status EM_ANDAMENTO.' }
    */
    return tarefaController.iniciar(req, res);
  });

  return router;
}

module.exports = tarefaRoutes;
