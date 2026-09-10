// src/infrastructure/repositories/TarefaRepository.js
const TarefaModel = require('../database/models/TarefaModel');
const { Tarefa } = require('../../domain/entities/Tarefa');

class TarefaRepository {
  // Converte um registro do Sequelize para a entidade pura de domínio
  _paraEntidade(registro) {
    if (!registro) return null;
    return new Tarefa({
      id: registro.id,
      titulo: registro.titulo,
      descricao: registro.descricao,
      status: registro.status,
      usuarioId: registro.usuarioId,
    });
  }

  async criar(tarefa) {
    const registro = await TarefaModel.create({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      usuarioId: tarefa.usuarioId,
    });
    return this._paraEntidade(registro);
  }

  async listarTodas() {
    const registros = await TarefaModel.findAll();
    return registros.map((r) => this._paraEntidade(r));
  }

  async buscarPorId(id) {
    const registro = await TarefaModel.findByPk(id);
    return this._paraEntidade(registro);
  }

  async atualizar(id, dados) {
    await TarefaModel.update(dados, { where: { id } });
    return this.buscarPorId(id);
  }

  async deletar(id) {
    const linhasApagadas = await TarefaModel.destroy({ where: { id } });
    return linhasApagadas > 0;
  }

  // Busca específica usada pela regra de negócio de iniciar tarefa
  async contarPorUsuarioEStatus(usuarioId, status) {
    return TarefaModel.count({ where: { usuarioId, status } });
  }
}

module.exports = TarefaRepository;
