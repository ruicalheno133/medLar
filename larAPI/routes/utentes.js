var express = require('express');
var router = express.Router();
var utenteController = require('../controllers/utente')
var passport = require('passport')
var formidable = require('formidable');
var mv = require('mv')

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
             .then(dados => {
               res.jsonp(dados)
              })
             .catch(erro => res.status(500).send(erro))
});

/* POST - Criar novo utente */
router.post('/', function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req,(err,fields,files) => {
    if(files.foto){
      var utente = {...fields, idUtente:null, estado:1, foto: files.foto.name}
      mv(files.foto.path,`./public/images/${files.foto.name}`,erro => {
        if(!erro){
          utenteController.inserir(utente)
                          .then(res.end())
                          .catch(erro => res.status(500).send(erro))
        }
        else{
          console.log(erro)
          res.status(500).send(erro)
        }
      })
    }
    else{
      var utente = {...fields, idUtente:null, estado:1}
      utenteController.inserir(utente)
                      .then(() => {res.end()})
                      .catch(erro => res.status(500).send(erro))
    }
  })
});

/* POST - Atualizar informação de utente específico */
router.put('/atualizar', function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req,(err,fields,files) => {
    if(files.foto){
      console.log(files.foto.name)
      console.log(files.foto.path)
      var utente = {...fields, foto: files.foto.name}
      mv(files.foto.path,`./public/images/${files.foto.name}`,erro => {
        if(!erro){
          utenteController.atualizar(utente)
            .then(() => res.end())
            .catch(err => res.status(500).send(erro))
        }
        else{
          console.log(erro)
          res.status(500).send(erro)
        }
      })
    }
    else{
      var utente = {...fields}    
      console.log(utente)
      utenteController.atualizar(utente)
                      .then(() => res.end())
                      .catch(err => res.status(500).send(err))
    }
  })
});

/* PUT - Desativar um utente específico */
router.put('/desativar/:id', function(req,res) {
  utenteController.desativar(req.params.id)
                  .then(() => res.end())
                  .catch(erro => res.status(500).send(erro))
})

module.exports = router;
