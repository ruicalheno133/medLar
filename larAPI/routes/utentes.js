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

/* POST - Criar novo utente */
router.post('/', function(req, res) {
  console.log(req.body)
  var newObj = {...req.body , ...{idUtente: null, estado: 1}}
  utenteController.inserir(newObj)
                  .then(() => {res.end()})
                  .catch(erro => console.log(erro))
});

/* PUT - Atualizar utente */
router.put('/', function(req, res) {
  var utente = req.body
  utenteController.atualizar(utente)
                  .then(() => {res.end()})
                  .catch(erro => res.jsonp(erro))
});

module.exports = router;
