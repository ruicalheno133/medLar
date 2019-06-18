var express = require('express');
var funcionarioController = require('../controllers/funcionario')
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport')

/* Autenticação */
router.get('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.post('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})
router.delete('/*', passport.authenticate('jwt', {session: false}), (req, res, next) => {next()})

/** GET - Listar informação de funcionário específico */
router.get('/:id', (req, res) => {
    funcionarioController.listarID(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/** POST - Criar novo funcionário */
router.post('/', function(req, res) {
    var newObj = {...req.body , ...{idFuncionario: null}}
    bcrypt.hash(newObj["password"], 10, function(err, hash) {
        if (!err) {
            newObj["password"] = hash;
            
            funcionarioController.inserir(newObj)
            .then(() => {res.end()})
            .catch(erro => res.jsonp(erro))
        }
        else res.jsonp(err)
    });
  });



module.exports = router