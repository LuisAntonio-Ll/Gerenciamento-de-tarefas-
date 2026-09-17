// src/interfaces/middlewares/validate.js
// Middleware "fábrica": recebe um schema do Zod e devolve um middleware do Express.
function validate(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      const detalhes = resultado.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      }));
      return res.status(400).json({ erro: 'Dados inválidos.', detalhes });
    }

    req.body = resultado.data;
    return next();
  };
}

module.exports = validate;
  