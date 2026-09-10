// src/interfaces/routes/usuarioRoutes.js
const { Router } = require('express');

function usuarioRoutes(usuarioController) {
  const router = Router();

  router.post('/usuarios', usuarioController.criar);

  return router;
}

module.exports = usuarioRoutes;
