// src/interfaces/routes/usuarioRoutes.js
const { Router } = require('express');
const validate = require('../middlewares/validate');
const { criarUsuarioSchema } = require('../middlewares/usuarioSchema');

function usuarioRoutes(usuarioController) {
  const router = Router();

  router.post('/usuarios', validate(criarUsuarioSchema), (req, res) => {
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
    return usuarioController.criar(req, res);
  });

  return router;
}

module.exports = usuarioRoutes;
