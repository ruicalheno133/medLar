const {Funcionario} = require('../models/index');
var sequelize = require('../database/connection')

/**
 * Inserir novo funcionário
 */
module.exports.inserir = (funcionario) => {
    return Funcionario.create(funcionario);
};


/**
 * Listar todos os funcionario
 */
module.exports.listar = () => {
    return sequelize.query(`SELECT * FROM med_bd.Funcionario`,
    {
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Selecionar funcionário por id
 */
module.exports.listarID = (idFuncionario) => {
    return sequelize.query(`SELECT f.* FROM med_bd.Funcionario AS f
                            WHERE f.idFuncionario = :idFuncionario`,
    {
        replacements:{
            idFuncionario: idFuncionario
        },
        type: sequelize.QueryTypes.SELECT
    })
};

