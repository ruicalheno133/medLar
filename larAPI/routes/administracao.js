var express = require('express');
var administracaoController = require('../controllers/administracao')
var router = express.Router();
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

/* 
 *  Rotas relacionadas com as tarefas de administração 
 */
router.get('/', function(req, res, next) {
  res.send('Rotas da administração');
});

/*
 *  method: GET 
 *  return: Lista de Utentes a administrar
 *          em determinada altura do dia.
 *
 */
router.get('/porAltura/:altura', function(req, res, next) {
  console.log(req.headers)
  administracaoController.listarUtentesAMedicar(req.params.altura)
                         .then(data => {res.jsonp(data)})
                         .catch(err => {console.log(err)})
});

/*
 *  method: GET 
 *  return: Lista dos medicamentos a administrar 
 *          e respetivas quantidades e informações 
 *          de conclusão, por Utente e Altura do dia
 *
 */
router.get('/porDoente/:utente/:altura', function(req, res, next) {
  administracaoController.listarAdministracao(req.params.utente, req.params.altura)
                         .then(data => {res.jsonp(data)})
                         .catch(err => {console.log(err)})
});

/**
 * Inserir nova administração
 */
router.post('/registarAdministracao',(req,res) => {
  console.log(req.body)
  administracaoController.inserir(req.body)
      .then(data => {
          res.jsonp(data)
      })
      .catch(erro => {
        console.log(erro)
          res.status(500).send(erro)
      })
});

/**
 * Atualizar administração
 */
router.put('/atualizarAdministracao/:idAdministracao',(req,res) => {
  administracaoController.atualizar(req.params.idAdministracao, req.body)
      .then(data => {
          res.jsonp(data)
      })
      .catch(erro => {
        console.log(erro)
          res.status(500).send(erro)
      })
});


module.exports = router;