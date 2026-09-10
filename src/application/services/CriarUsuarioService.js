// src/application/services/CriarUsuarioService.js
class CriarUsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async executar({ nome, email }) {
    if (!nome || !email) {
      throw new Error('Nome e email são obrigatórios.');
    }
    return this.usuarioRepository.criar({ nome, email });
  }
}

module.exports = CriarUsuarioService;
