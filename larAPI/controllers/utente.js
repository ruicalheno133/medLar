const {Utente} = require('../models/index');
var sequelize = require('../database/connection')

/**
 * Inserir utente
 */
module.exports.inserir = (utente) => {
    return Utente.create(utente);
};

/**
 * Listar todos os utentes com estado true
 */
module.exports.listar = () => {
    return Utente.findAll({
        attributes:['nome','dataNascimento','contEmergencia','foto'],
        where:{
            estado: true
        }
    });
};

/**
 * Encontrar utente por id com estado a true
 */
module.exports.listarPorID = (idUtente) => {
    return Utente.findOne({
        attributes:['idUtente','nome','dataNascimento','contEmergencia','foto'],
        where:{
            idUtente: idUtente,
            estado:true
        }
    })
};

