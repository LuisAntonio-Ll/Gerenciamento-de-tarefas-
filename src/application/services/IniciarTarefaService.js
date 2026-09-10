// src/application/services/IniciarTarefaService.js
const { STATUS } = require('../../domain/entities/Tarefa');

const LIMITE_TAREFAS_EM_ANDAMENTO = 5;

class IniciarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    if (!tarefa) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }

    // 1) Consulta quantas tarefas o usuário já possui EM_ANDAMENTO
    const quantidadeEmAndamento = await this.tarefaRepository.contarPorUsuarioEStatus(
      tarefa.usuarioId,
      STATUS.EM_ANDAMENTO,
    );

    // 2) Se atingiu o limite, bloqueia a operação
    if (quantidadeEmAndamento >= LIMITE_TAREFAS_EM_ANDAMENTO) {
      throw new Error(
        `Limite de ${LIMITE_TAREFAS_EM_ANDAMENTO} tarefas em andamento atingido para este usuário.`,
      );
    }

    // 3) Caso contrário, a entidade aplica a transição de estado
    tarefa.iniciar();

    // 4) Persiste a alteração
    return this.tarefaRepository.atualizar(id, { status: tarefa.status });
  }
}

module.exports = IniciarTarefaService;
