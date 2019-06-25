var express = require('express');
var administracaoController = require('../controllers/administracao')
var router = express.Router();
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

/* 
  GET - Listar todas as administrações em determinada altura do dia. 
*/
router.get('/porAltura/:altura', function(req, res) {
  administracaoController.listarUtentesAMedicar(req.params.altura)
                         .then(data => {res.jsonp(data)})
                         .catch(err => {
                                    console.log(err)
                                    res.status(500).send(err)
                                })
});

/* 
  GET - Listar todas as administrações, por Utente e Altura do dia
*/
router.get('/porUtente/:utente/:altura', function(req, res) {
  administracaoController.listarAdministracao(req.params.utente, req.params.altura)
                         .then(data => {res.jsonp(data)})
                         .catch(err => {
                                  console.log(err)
                                  res.status(500).send(err)
                                })
});

/* 
  POST - Criar nova administração 
*/
router.post('/',(req,res) => {
  administracaoController.inserir(req.body)
      .then(data => {
          res.jsonp(data)
      })
      .catch(err => {
          console.log(err)
          res.status(500).send(err)
      })
});

/* 
  PUT - Atualizar administração específica 
*/
router.put('/:id',(req,res) => {
  administracaoController.atualizar(req.params.id, req.body)
      .then(data => {
          res.jsonp(data)
      })
      .catch(erro => {
          console.log(erro)
          res.status(500).send(erro)
      })
});


module.exports = router;