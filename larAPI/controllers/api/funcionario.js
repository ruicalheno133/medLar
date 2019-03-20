const {Funcionario} = require('../../models/index');

module.exports.inserir = (funcionario) => {
    return Funcionario.create(funcionario);
};


