const {FichaMedicacao} = require('../models/index');
var sequelize = require('../database/connection')

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

/**
 * Obtem a ficha de Medicacao de determinado utente
 */
module.exports.obterFichaMedicacao = (idUtente) => {
    return sequelize.query(`SELECT fm.* 
                            FROM med_bd.FichaMedicacao as fm 
                            WHERE fm.idUtente = :idUtente AND fm.estado = 1;`,
{ replacements: { idUtente: idUtente }, type: sequelize.QueryTypes.SELECT }
)
};

