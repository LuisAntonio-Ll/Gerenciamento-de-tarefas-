// src/application/services/CriarTarefaService.js
const { Tarefa } = require('../../domain/entities/Tarefa');

class CriarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar({ titulo, descricao, usuarioId }) {
    // A própria entidade valida a obrigatoriedade do título
    const tarefa = new Tarefa({ titulo, descricao, usuarioId });
    return this.tarefaRepository.criar(tarefa);
  }
}

module.exports = CriarTarefaService;
