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
    return FichaMedicacao.findAll({
        where: {
            estado: 1
        }
    });
};

/**
 * Listar uma ficha de medicação por identificador
 */
module.exports.listarUm = (idFichaMedicacao) => {
    console.log(idFichaMedicacao)
    return sequelize.query(`SELECT fm.*, m.nome, m.forma
                                FROM med_bd.FichaMedicacao as fm
                                INNER JOIN Medicamento as m on fm.idMedicamento = m.idMedicamento
                                WHERE fm.idFichaMedicacao = :idFichaMedicacao;`,
    {
        replacements: {
            idFichaMedicacao: idFichaMedicacao
        },
        type: sequelize.QueryTypes.SELECT
    })
}

/**
 * Obtem a ficha de Medicacao de determinado utente
 * <!> Não esquecer que a separação por dias tem de ser feita do lado do servidor <!>
 */
module.exports.obterFichaMedicacao = (idUtente) => {
    return sequelize.query(`SELECT fm.* , m.nome, m.forma
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
 * Mudar o estado da ficha de Medicação. Acontece quando a data acaba, idealmente.
 */
module.exports.mudarEstadoFichaMedicacao = (idFichaMedicacao) => {
    return sequelize.query(`UPDATE med_bd.FichaMedicacao
                            SET estado = 0
                            WHERE idFichaMedicacao = :idFichaMedicacao;`,
        {
            replacements:{
                idFichaMedicacao: idFichaMedicacao
            },
            type: sequelize.QueryTypes.UPDATE
        })
}

/**
 * Alterar dias, periodos, data de inicio e data de fim de uma ficha de medicação
 */
module.exports.editarFichaMedicacao = (idFichaMedicacao, dias, periodosDia, dataInicio, dataFim) => {
    return sequelize.query(`UPDATE med_bd.FichaMedicacao
                            SET dias = :dias, periodosDia = :periodosDia,
                                dataInicio = :dataInicio, dataFim = :dataFim
                            WHERE idFichaMedicacao = :idFichaMedicacao;`,
    {
        replacements:{
            dias: dias,
            periodosDia: periodosDia,
            dataInicio: dataInicio,
            dataFim: dataFim,
            idFichaMedicacao: idFichaMedicacao
        },
        type: sequelize.QueryTypes.UPDATE
    })
}

