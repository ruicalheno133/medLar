var Sequelize = require('sequelize')
var db = require('../database/connection')

var utente = require('./utenteModel')
var funcionario = require('./funcionarioModel')
var medicamento = require('./medicamentoModel')
var fichaMedicacao = require('./fichaMedicacaoModels')
var administracao = require('./administracaoModel')

// Criação dos Modelos

var utenteModel = utente(db, Sequelize)
var funcionarioModel = funcionario(db, Sequelize)
var medicamentoModel = medicamento(db, Sequelize)
var fichaMedicacaoModel = fichaMedicacao(db, Sequelize)
var administracaoModel = administracao(db, Sequelize)

module.exports = {
    utenteModel,
    funcionarioModel,
    medicamentoModel,
    fichaMedicacaoModel,
    administracaoModel
}
