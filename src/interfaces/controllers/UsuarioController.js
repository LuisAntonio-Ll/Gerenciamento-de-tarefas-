// src/interfaces/controllers/UsuarioController.js
class UsuarioController {
  constructor({ criarUsuarioService }) {
    this.criarUsuarioService = criarUsuarioService;
  }

  criar = async (req, res) => {
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Cria um novo usuário'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["nome", "email"],
              properties: {
                nome: { type: "string", example: "João" },
                email: { type: "string", example: "joao@teste.com" }
              }
            }
          }
        }
      }
      #swagger.responses[201] = { description: 'Usuário criado com sucesso' }
      #swagger.responses[400] = { description: 'Erro de validação (Zod): nome com menos de 3 letras ou email em formato inválido' }
    */
    try {
      const { nome, email } = req.body;
      const usuario = await this.criarUsuarioService.executar({ nome, email });
      return res.status(201).json(usuario);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };
}

module.exports = UsuarioController;
