// src/domain/entities/Tarefa.js
// Entidade pura de negócio: NENHUMA importação de framework, ORM ou banco de dados aqui.

const STATUS = {
  PENDENTE: 'PENDENTE',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDA: 'CONCLUIDA',
};

class Tarefa {
  constructor({ id = null, titulo, descricao = '', status = STATUS.PENDENTE, usuarioId }) {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório.');
    }

    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.usuarioId = usuarioId;
  }

  // Transição de estado: só pode iniciar uma tarefa que esteja PENDENTE
  iniciar() {
    if (this.status !== STATUS.PENDENTE) {
      throw new Error(
        `Não é possível iniciar uma tarefa com status "${this.status}". Apenas tarefas PENDENTES podem ser iniciadas.`,
      );
    }
    this.status = STATUS.EM_ANDAMENTO;
  }

  // Transição de estado: só pode concluir uma tarefa que esteja EM_ANDAMENTO
  concluir() {
    if (this.status !== STATUS.EM_ANDAMENTO) {
      throw new Error(
        `Não é possível concluir uma tarefa com status "${this.status}". Apenas tarefas EM_ANDAMENTO podem ser concluídas.`,
      );
    }
    this.status = STATUS.CONCLUIDA;
  }

  atualizarTitulo(novoTitulo) {
    if (!novoTitulo || novoTitulo.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório.');
    }
    this.titulo = novoTitulo;
  }
}

module.exports = { Tarefa, STATUS };
