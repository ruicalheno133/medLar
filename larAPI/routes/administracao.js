var express = require('express');
var administracaoController = require('../controllers/administracao')
var router = express.Router();

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


module.exports = router;