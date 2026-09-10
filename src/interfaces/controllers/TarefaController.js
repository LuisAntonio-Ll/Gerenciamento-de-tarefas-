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
    try {
      const tarefas = await this.listarTarefasService.executar();
      return res.status(200).json(tarefas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  };

  criar = async (req, res) => {
    try {
      const { titulo, descricao, usuarioId } = req.body;
      const tarefa = await this.criarTarefaService.executar({ titulo, descricao, usuarioId });
      return res.status(201).json(tarefa);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const tarefa = await this.atualizarTarefaService.executar(id, req.body);
      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  };

  excluir = async (req, res) => {
    try {
      const { id } = req.params;
      await this.excluirTarefaService.executar(id);
      return res.status(204).send();
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  };

  iniciar = async (req, res) => {
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
