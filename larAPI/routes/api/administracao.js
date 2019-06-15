var express = require('express');
var administracaoController = require('../../controllers/administracao')
var router = express.Router();

/**
 * Listar todas as administrações
 */
router.get('/', (req,res) => {
    administracaoController.listar()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
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






module.exports = router