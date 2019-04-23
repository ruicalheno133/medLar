var express = require('express');
var fichaMedicacaoController = require('../controllers/fichaMedicacao')
var router = express.Router();


/**
 * Listar todas as fichas de medicação
 */
/* GET - Lista todas as fichas de medicaçao */
router.get('/', function(req, res, next) {
    fichaMedicacaoController.listar()
                            .then(dados => {res.jsonp(dados)})
                            .catch(erro => res.status(500).send(erro))
  });

/* GET - Listar as fichas de medicação de um utente especifico */
router.get('/:id', function(req, res, next) {
    fichaMedicacaoController.obterFichaMedicacao(req.params.id)
                            .then(dados => {res.jsonp(dados)})
                            .catch(erro => res.status(500).send(erro))
  });

/**
 * Inserir nova ficha de medicação
 */
router.post('/', (req,res) => {
    var newObj = {...req.body , ...{idFichaMedicacao: null, estado: 1}}
    fichaMedicacaoController.inserir(newObj)
                            .then(data => {res.jsonp(data)})
                            .catch(erro => {res.status(500).send(erro)})
})



module.exports = router