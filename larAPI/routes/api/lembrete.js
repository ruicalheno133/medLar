var express = require('express');
var lembreteController = require('../../controllers/lembrete')
var router = express.Router();

/**
 * Listar os lembretes de um funcionario
 */
router.get('/:id', (req,res) => {
    lembreteController.listar(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(err0)
        })
});

/**
 * Inserir um novo lembrete
 */
router.post('/', (req,res) => {
    lembreteController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
})

/**
 * Concluir um lembrete
 */
router.post('/concluir/:id', (req,res) => {
    lembreteController.concluirLembrete(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
})


module.exports = router