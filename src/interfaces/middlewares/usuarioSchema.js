// src/interfaces/middlewares/usuarioSchema.js
const { z } = require('zod');

const criarUsuarioSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 letras.'),
  email: z.string().email('O email informado é inválido.'),
});

module.exports = { criarUsuarioSchema };
