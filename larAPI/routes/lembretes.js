var express = require('express');
var router = express.Router();
var lembreteController = require('../controllers/lembrete')

router.get('/', function(req, res, next) {
  res.send('Rotas dos lembretes');
});

/* GET - Lista todos os lembretes */
router.get('/listarTodos/:idUtente', function(req, res, next) {
  lembreteController.listar(req.params.idUtente)
    .then(data => {res.jsonp(data)})
    .catch(err => {console.log(err)})
});

/* GET - Lista lembrete especifico */
router.get('/listarUm/:id', function(req, res, next) {
  res.send('Lista lembrete especifico');
});

module.exports = router;
