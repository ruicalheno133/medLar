var sequelize = require('sequelize')
const {Medicamento} = require('../../models/index');


/**
 * Inserir medicamento
 */
module.exports.inserir = (medicamento) => {
    return Medicamento.create(medicamento);
};

/**
 * Listar todos os medicamentos
 */
module.exports.listar = () => {
    return Medicamento.findAll({
        attributes:[[sequelize.fn('CONCAT',sequelize.col('nome'),' - ',sequelize.col('forma')),'Medicamento']]
    });
};
