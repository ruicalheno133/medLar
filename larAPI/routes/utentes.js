var express = require('express');
var router = express.Router();
var { utenteModel } = require('../models/index');

/* Rota inicial */
router.get('/', function(req, res, next) {
  res.send('Rotas dos utentes');
});

/* GET - Lista todos os utentes */
router.get('/listarTodos', function(req, res, next) {
  utenteModel.findAll()
             .then(dados => {res.jsonp(dados)})
             .catch(erro => res.status(500).send(erro))
});

/* GET - Lista informação de utente especifico */
router.get('/listarUm/:id', function(req, res, next) {
  utenteModel.findAll({where:{idUtente:req.params.id}})
             .then(dados => {res.jsonp(dados)})
             .catch(erro => res.status(500).send(erro))
});

/* GET - Lista utentes a medicar a uma determinada altura do dia */
router.get('/aMedicar/:altura', function(req, res, next) {
  res.send('Lista utentes a medicar a uma determinada altura do dia');
});

module.exports = router;
