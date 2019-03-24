const {Funcionario} = require('../models/index');

/**
 * Inserir novo funcionário
 */
module.exports.inserir = (funcionario) => {
    return Funcionario.create(funcionario);
};


