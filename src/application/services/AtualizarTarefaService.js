// src/application/services/AtualizarTarefaService.js
class AtualizarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id, dados) {
    const tarefaExistente = await this.tarefaRepository.buscarPorId(id);
    if (!tarefaExistente) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }
    return this.tarefaRepository.atualizar(id, dados);
  }
}

module.exports = AtualizarTarefaService;
