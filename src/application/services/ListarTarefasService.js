// src/application/services/ListarTarefasService.js
class ListarTarefasService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar() {
    return this.tarefaRepository.listarTodas();
  }
}

module.exports = ListarTarefasService;
