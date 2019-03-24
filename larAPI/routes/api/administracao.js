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
router.post('/',(req,res) => {
    administracaoController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});






module.exports = router