const {Lembrete} = require('../models/index');
var sequelize = require('../database/connection')

/**
 * Inserir lembrete
 */
module.exports.inserir = (lembrete) => {
    return Lembrete.create(lembrete);
};

/**
 * Listar todos os lembretes de um funcionário
 */
module.exports.listar = (idFuncionario) => {
    return sequelize.query(`SELECT l.* FROM med_bd.Lembrete AS l
                                WHERE l.idFuncionario = :idFuncionario
                                AND concluido = 0;`,
    {
        replacements:{
            idFuncionario: idFuncionario
        },
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Concluir lembrete
 */
module.exports.concluirLembrete = (idLembrete) => {
    return sequelize.query(`UPDATE med_bd.Lembrete
                            SET concluido = 1
                            WHERE idLembrete = :idLembrete`,
    {
        replacements:{
            idLembrete: idLembrete
        },
        type: sequelize.QueryTypes.UPDATE
    })
};