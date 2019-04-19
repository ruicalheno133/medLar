var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utente')

/* GET - Lista todos os utentes */
router.get('/', function(req, res, next) {
  utenteController.listar()
             .then(dados => {res.jsonp(dados)})
             .catch(erro => res.status(500).send(erro))
});

/* GET - Lista informação de utente especifico */
router.get('/:id', function(req, res, next) {
  utenteController.listarPorID(req.params.id)
             .then(dados => {res.jsonp(dados)})
             .catch(erro => res.status(500).send(erro))
});

module.exports = router;
