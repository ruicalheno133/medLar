var sequelize = require('../database/connection')
const {Medicamento} = require('../models/index');


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
    return sequelize.query(`SELECT med.idMedicamento,  CONCAT (med.nome, " - ", med.forma) as 'Medicamento'
                            FROM med_bd.Medicamento AS med;`,
    {
        type: sequelize.QueryTypes.SELECT
    })
};
