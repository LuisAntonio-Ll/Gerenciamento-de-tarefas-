// src/application/services/ExcluirTarefaService.js
class ExcluirTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefaExistente = await this.tarefaRepository.buscarPorId(id);
    if (!tarefaExistente) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }
    return this.tarefaRepository.deletar(id);
  }
}

module.exports = ExcluirTarefaService;
