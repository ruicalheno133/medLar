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
    return sequelize.query(`SELECT u.* FROM med_bd.Utente AS u
                            WHERE u.estado = 1`,
    {
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Encontrar utente por id com estado a true
 */
module.exports.listarPorID = (idUtente) => {
    return sequelize.query(`SELECT u.* FROM med_bd.Utente AS u
                            WHERE u.idUtente = :idUtente
                            AND u.estado = 1`,
    {
        replacements:{
            idUtente: idUtente
        },
        type: sequelize.QueryTypes.SELECT
    })
};

