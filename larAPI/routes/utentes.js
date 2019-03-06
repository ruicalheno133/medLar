var express = require('express');
var router = express.Router();
var { utenteModel, fichaMedicacaoModel, medicamentoModel } = require('../models/index');

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

/* GET - Lista ficha médica de um utente */
router.get('/fichaMedica/:id', function(req, res, next) {
  utenteModel.findOne({
    include: [{model : fichaMedicacaoModel, as:'FichaMedicacao', include: {model: medicamentoModel}}],
    where : {
      idUtente : req.params.id
  }
  })
            .then(dados => {res.jsonp(dados.FichaMedicacao)})
            .catch(erro => res.status(500).send(erro))
});

module.exports = router;
