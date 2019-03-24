var express = require('express');
var utenteController = require('../../controllers/utente')
var router = express.Router();

/**
 * Listar todos os utentes
 */
router.get('/',(req,res) => {
    utenteController.listar()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Inserir utente
 */
router.post('/',(req,res) => {
    utenteController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Listar utente por id
 */
router.get('/:id',(req,res) => {
    utenteController.listarPorID(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

module.exports = router