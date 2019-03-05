var express = require('express');
var router = express.Router();

/* Rota inicial */
router.get('/', function(req, res, next) {
  res.send('Rotas dos utentes');
});

/* GET - Lista todos os utentes */
router.get('/listarUtentes', function(req, res, next) {
  res.send('Listar todos os utentes');
});

module.exports = router;
