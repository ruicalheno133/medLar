var express = require('express');
var router = express.Router();
var lembreteController = require('../controllers/lembrete')
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

router.get('/', function(req, res, next) {
  res.send('Rotas dos lembretes');
});

/* GET - Listar todos os lembretes de um utente */
router.get('/utente/:idUtente', function(req, res, next) {
  lembreteController.listar(req.params.idUtente)
    .then(data => {res.jsonp(data)})
    .catch(err => {console.log(err)})
});

/* PUT - Atualizar informação de um lembrete específico */
router.put('/concluir/:id', function(req, res, next) {
  lembreteController.concluirLembrete(req.params.id)
    .then(data => {res.end()})
    .catch(err => {console.log(err)})
});

/* POST - Criar um novo lembrete */
router.post('/', function(req, res, next) {
  lembreteController.inserir(req.body)
    .then(data => {res.end()})
    .catch(err => {console.log(err)})
});

module.exports = router;
