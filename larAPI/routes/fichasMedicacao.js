var express = require('express');
var fichaMedicacaoController = require('../controllers/fichaMedicacao')
var router = express.Router();
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

/* GET - Lista todas as fichas de medicação */
router.get('/', function(req, res, next) {
    fichaMedicacaoController.listar()
                            .then(dados => {res.jsonp(dados)})
                            .catch(erro => res.status(500).send(erro))
  });

router.get('/:id', (req,res) => {
    fichaMedicacaoController.listarUm(req.params.id)
                            .then(dados => {
                              res.jsonp(dados)
                            })
                            .catch(erro => {
                              console.log(erro)
                              res.status(500).send(erro)
                            })
})

/* GET - Listar todas as fichas de medicação de um utente especifico */
router.get('/utente/:id', function(req, res, next) {
    fichaMedicacaoController.obterFichaMedicacao(req.params.id)
                            .then(dados => {
                              res.jsonp(dados)
                            })
                            .catch(erro => res.status(500).send(erro))
  });

/* GET - Listar todas as fichas de medicação de um utente especifico */
router.get('/Medicamento/:idMedicamento/:idUtente/:quantidade/:unidade', function(req, res, next) {
  fichaMedicacaoController.obterMedicamento(req.params.idMedicamento, req.params.idUtente, req.params.quantidade, req.params.unidade)
                          .then(dados => {
                            res.jsonp(dados)
                          })
                          .catch(erro => {console.log(erro);res.status(500).send(erro)})
});

/** PUT - Mudar estado de uma ficha de medicação */
router.put('/mudarEstado/:idFichaMedicacao', (req,res)=>{
  fichaMedicacaoController.mudarEstadoFichaMedicacao(req.params.idFichaMedicacao)
                          .then(dados => {
                            res.jsonp(dados)
                          })
                          .catch(erro => {
                            console.log(erro)
                            res.status(500).send(erro)
                          })
})

/** PUT - Mudar dias e periodo de uma ficha de medicação */
router.put('/editar/:idFichaMedicacao', (req,res) => {
  fichaMedicacaoController.editarFichaMedicacao(req.params.idFichaMedicacao, req.body.dias, req.body.periodosDia, req.body.dataInicio, req.body.dataFim)
                          .then(dados => {
                            res.jsonp(dados)
                          })
                          .catch(erro => {
                            console.log(erro)
                            res.status(500).send(erro)
                          })
})

/* POST - Criar nova ficha de medicação */
router.post('/', (req,res) => {
    var newObj = {...req.body , ...{idFichaMedicacao: null, estado: 1}}
    fichaMedicacaoController.inserir(newObj)
                            .then(data => {res.jsonp(data)})
                            .catch(erro => {res.status(500).send(erro)})
})


module.exports = router