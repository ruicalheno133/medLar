var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Rotas dos lembretes');
});

/* GET - Lista todos os lembretes */
router.get('/listarTodos', function(req, res, next) {
  res.send('Listar todos os lembretes');
});

/* GET - Lista lembrete especifico */
router.get('/listarUm/:id', function(req, res, next) {
  res.send('Lista lembrete especifico');
});

module.exports = router;
