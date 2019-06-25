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

/**
 * Atualizar funcionario sem password
 */
module.exports.atualizarSpass = (idFuncionario, dados) => {
    return sequelize.query(`UPDATE med_bd.Funcionario
                            SET nome = :nome,
                                email = :email
                            WHERE idFuncionario = :idFuncionario`,
    {
        replacements:{
            idFuncionario: idFuncionario,
            nome: dados.nome,
            email: dados.email
        },
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Atualizar funcionario sem password
 */
module.exports.atualizarCpass = (idFuncionario, dados) => {
    return sequelize.query(`UPDATE med_bd.Funcionario
                            SET nome = :nome,
                                email = :email,
                                password = :password
                            WHERE idFuncionario = :idFuncionario`,
    {
        replacements:{
            idFuncionario: idFuncionario,
            nome: dados.nome,
            email: dados.email,
            password: dados.password
        },
        type: sequelize.QueryTypes.SELECT
    })
};

/**
 * Selecionar funcionário por email
 */
module.exports.listarEmail = (emailFuncionario) => {
    return sequelize.query(`SELECT f.* FROM med_bd.Funcionario AS f
                            WHERE f.email = :emailFuncionario`,
    {
        replacements:{
            emailFuncionario: emailFuncionario
        },
        type: sequelize.QueryTypes.SELECT
    })
};

