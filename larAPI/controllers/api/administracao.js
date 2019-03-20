const {Administracao} = require('../../models/index');

module.exports.inserir = (administracao) => {
    return Administracao.create(administracao);
};
