// src/infrastructure/repositories/UsuarioRepository.js
const UsuarioModel = require('../database/models/UsuarioModel');

class UsuarioRepository {
  async criar({ nome, email }) {
    const registro = await UsuarioModel.create({ nome, email });
    return registro.toJSON();
  }

  async listarTodos() {
    const registros = await UsuarioModel.findAll();
    return registros.map((r) => r.toJSON());
  }

  async buscarPorId(id) {
    const registro = await UsuarioModel.findByPk(id);
    return registro ? registro.toJSON() : null;
  }
}

module.exports = UsuarioRepository;
