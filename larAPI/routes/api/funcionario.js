var express = require('express');
var funcionarioController = require('../../controllers/funcionario')
var router = express.Router();

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
router.post('/', (req,res) => {
    funcionarioController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});



module.exports = router