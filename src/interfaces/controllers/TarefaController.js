// src/interfaces/controllers/TarefaController.js
class TarefaController {
  constructor({
    listarTarefasService,
    criarTarefaService,
    atualizarTarefaService,
    excluirTarefaService,
    iniciarTarefaService,
  }) {
    this.listarTarefasService = listarTarefasService;
    this.criarTarefaService = criarTarefaService;
    this.atualizarTarefaService = atualizarTarefaService;
    this.excluirTarefaService = excluirTarefaService;
    this.iniciarTarefaService = iniciarTarefaService;
  }

  listar = async (req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.summary = 'Lista todas as tarefas cadastradas'
    try {
      const tarefas = await this.listarTarefasService.executar();
      return res.status(200).json(tarefas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  };

  criar = async (req, res) => {
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
    try {
      const { titulo, descricao, usuarioId } = req.body;
      const tarefa = await this.criarTarefaService.executar({ titulo, descricao, usuarioId });
      return res.status(201).json(tarefa);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };

  atualizar = async (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Atualiza o título/descrição de uma tarefa existente'
      #swagger.responses[200] = { description: 'Tarefa atualizada com sucesso' }
      #swagger.responses[404] = { description: 'Tarefa não encontrada' }
    */
    try {
      const { id } = req.params;
      const tarefa = await this.atualizarTarefaService.executar(id, req.body);
      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  };

  excluir = async (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Exclui uma tarefa do banco de dados'
      #swagger.responses[204] = { description: 'Tarefa excluída com sucesso' }
      #swagger.responses[404] = { description: 'Tarefa não encontrada' }
    */
    try {
      const { id } = req.params;
      await this.excluirTarefaService.executar(id);
      return res.status(204).send();
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  };

  iniciar = async (req, res) => {
    /*
      #swagger.tags = ['Tarefas']
      #swagger.summary = 'Inicia uma tarefa (PENDENTE -> EM_ANDAMENTO)'
      #swagger.responses[200] = { description: 'Tarefa iniciada com sucesso' }
      #swagger.responses[400] = { description: 'Retornado quando o usuário atinge o limite máximo de 5 tarefas com status EM_ANDAMENTO.' }
    */
    try {
      const { id } = req.params;
      const tarefa = await this.iniciarTarefaService.executar(id);
      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };
}

module.exports = TarefaController;
