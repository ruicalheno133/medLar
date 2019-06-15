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
 * <!> Não esquecer que a separação por dias tem de ser feita do lado do servidor <!>
 */
module.exports.obterFichaMedicacao = (idUtente) => {
    return sequelize.query(`SELECT fm.* , m.nome
    FROM med_bd.FichaMedicacao as fm 
    INNER JOIN Medicamento as m ON fm.idMedicamento = m.idMedicamento
    WHERE fm.idUtente = :idUtente AND fm.estado = 1;`,
        { 
            replacements: { 
                idUtente: idUtente 
            }, 
            type: sequelize.QueryTypes.SELECT 
        }
    )
};



/**
 * Remover um dado medicamento de um determinado Utente da ficha num dia e periodo
 * P.e. Remover Otoflox 2 gotas do Senhor Harold do pequeno almoço de segunda feira
 */
module.exports.removerMedicamentoDiaPeriodo = (idUtente, idMedicamento, dia, periodo) => {
    return sequelize.query(`UPDATE med_bd.FichaMedicacao
                            SET periodosDia = periodosDia - :periodo,
                                dias = dias - :dia
                            WHERE idUtente = :idUtente 
                                AND idMedicamento = :idMedicamento 
                                AND estado = 1;`,
        {
            replacements:{
                dia: dia,
                periodo: periodo,
                idUtente: idUtente,
                idMedicamento: idMedicamento
            },
            type: sequelize.QueryTypes.UPDATE
        })
};

/**
 * Mudar o estado da ficha de Medicação. Acontece quando a data acaba, idealmente.
 */
module.exports.mudarEstadoFichaMedicacao = (idUtente, idMedicamento) => {
    return sequelize.query(`UPDATE med_bd.FichaMedicacao
                            SET estado = 0
                            WHERE idUtente = :idUtente
                                AND idMedicamento = :idMedicamento;`,
        {
            replacements:{
                idUtente: idUtente,
                idMedicamento: idMedicamento
            },
            type: sequelize.QueryTypes.UPDATE
        })
}


