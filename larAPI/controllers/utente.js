const {Utente} = require('../models/index');
var sequelize = require('../database/connection')

/**
 * Inserir utente
 */
module.exports.inserir = (utente) => {
    console.log(utente)
    return Utente.create(utente);
};

/**
 * Atualizar utente
 */
module.exports.atualizar = (utente) => {
    if(utente.foto){
        return sequelize.query(`UPDATE med_bd.Utente AS u
        SET u.nome = :nome, u.nomeUsado = :nomeUsado, 
            u.dataNascimento = :dataNascimento , u.contEmergencia = :contEmergencia,
            u.foto = :foto
        WHERE u.idUtente = :idUtente;`,
        {
            replacements:{
                idUtente: Number(utente.idUtente),
                nome : utente.nome,
                nomeUsado : utente.nomeUsado,
                dataNascimento : utente.dataNascimento,
                contEmergencia : utente.contEmergencia,
                foto: utente.foto
            },
            type: sequelize.QueryTypes.UPDATE
        })
    }
    else{
        return sequelize.query(`UPDATE med_bd.Utente AS u
                            SET u.nome = :nome, u.nomeUsado = :nomeUsado, 
                                u.dataNascimento = :dataNascimento , u.contEmergencia = :contEmergencia
                            WHERE u.idUtente = :idUtente;`,
        {
            replacements:{
                idUtente: Number(utente.idUtente),
                nome : utente.nome,
                nomeUsado : utente.nomeUsado,
                dataNascimento : utente.dataNascimento,
                contEmergencia : utente.contEmergencia,
        },
        type: sequelize.QueryTypes.UPDATE
        })
    }
};

/**
 * Listar todos os utentes com estado true
 */
module.exports.listar = () => {
    return sequelize.query(`SELECT u.* FROM med_bd.Utente AS u
                            WHERE u.estado = 1
                            ORDER BY u.nome`,
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
                            AND u.estado = 1;`,
    {
        replacements:{
            idUtente: Number(idUtente)
        },
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Desativar um utente
 */
module.exports.desativar = (idUtente) => {
    return sequelize.query(`UPDATE med_bd.Utente AS u
                            SET estado = 0 
                            WHERE u.idUtente = :idUtente;`,
    {
        replacements:{
            idUtente: Number(idUtente)
        },
        type: sequelize.QueryTypes.UPDATE
    })
};