const {Utente} = require('../models/index');
var sequelize = require('../database/connection')

/**
 * Inserir utente
 */
module.exports.inserir = (utente) => {
    return Utente.create(utente);
};

/**
 * Atualizar utente
 */
module.exports.atualizar = (utente) => {
    return sequelize.query(`UPDATE med_bd.Utente AS u
                            SET u.nome = :nome, u.nomeUsado = :nomeUsado, 
                                u.dataNascimento = str_to_date(:dataNascimento,'%d/%m/%Y'), u.contEmergencia = :contEmergencia
                            WHERE u.idUtente = :idUtente`,
                            {
                                replacements:{
                                    idUtente: utente.idUtente,
                                    nome : utente.nome,
                                    nomeUsado : utente.nomeUsado,
                                    dataNascimento : utente.dataNascimento,
                                    contEmergencia : utente.contEmergencia
                                },
                                type: sequelize.QueryTypes.UPDATE
                            })
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

