var express = require('express');
var medicamentoController = require('../../controllers/medicamento')
var router = express.Router();

/**
 * Listar todos os medicamentos
 */
router.get('/', (req,res) => {
    medicamentoController.listar()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Inserir medicamento
 */
router.post('/', (req,res) => {
    medicamentoController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});


module.exports = router