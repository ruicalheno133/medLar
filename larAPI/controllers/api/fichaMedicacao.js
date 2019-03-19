const {FichaMedicacao} = require('../../models/index');

/**
 * Inserir ficha de medicação
 */
module.exports.inserir = (fichaMedicacao) => {
    return FichaMedicacao.create(fichaMedicacao);
};

/**
 * Listar todas as fichas de medicação
 */
module.exports.listar = () => {
    return FichaMedicacao.findAll();
};

