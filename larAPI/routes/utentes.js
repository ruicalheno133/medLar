var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utente')
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

/* GET - Listar todos os utentes */
router.get('/', function(req, res, next) {
  utenteController.listar()
             .then(dados => {res.jsonp(dados)})
             .catch(erro => res.status(500).send(erro))
});

/* GET - Listar informação de utente especifico */
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

/* PUT - Atualizar informação de utente específico */
router.put('/', function(req, res) {
  var utente = req.body
  utenteController.atualizar(utente)
                  .then(() => {res.end()})
                  .catch(erro => res.jsonp(erro))
});

module.exports = router;
