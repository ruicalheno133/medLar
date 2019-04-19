var express = require('express');
var fichaMedicacaoController = require('../../controllers/fichaMedicacao')
var router = express.Router();


/**
 * Listar todas as fichas de medicação
 */
router.get('/', (req,res) => {
    fichaMedicacaoController.listar()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
});

/**
 * Inserir nova ficha de medicação
 */
router.post('/', (req,res) => {
    fichaMedicacaoController.inserir(req.body)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.status(500).send(erro)
        })
})






module.exports = router