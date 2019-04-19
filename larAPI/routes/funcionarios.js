var express = require('express');
var funcionarioController = require('../controllers/funcionario')
var router = express.Router();
var bcrypt = require('bcrypt');

/**
 * Listar todos os funcionários
 */
router.get('/', (req, res) => {
    funcionarioController.listar()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Listar Funcionário por ID
 */
router.get('/:id', (req, res) => {
    funcionarioController.listarID(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Inserir novo funcionário
 */
/* POST - Criar novo utente */
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