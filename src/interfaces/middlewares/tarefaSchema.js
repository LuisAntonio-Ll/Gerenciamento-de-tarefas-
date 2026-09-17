// src/interfaces/middlewares/tarefaSchema.js
const { z } = require('zod');

const criarTarefaSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório.'),
  descricao: z.string().optional(),
  usuarioId: z.number().int().positive('O usuarioId deve ser um número positivo.'),
});

module.exports = { criarTarefaSchema };
