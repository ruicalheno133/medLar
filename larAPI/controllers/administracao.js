const {Administracao} = require('../models/index');
var sequelize = require('../database/connection')


/**
 * Insert into med_bd.Administracao VALUES (idFuncionario, idUtente, idMedicamento, estado, dataAdministracao, observacao);
 */
module.exports.inserir = (administracao) => {
    return Administracao.create(administracao);
};

module.exports.listar = () => {
    return sequelize.query(`SELECT * FROM med_bd.Administracao;`,
    {
        type: sequelize.QueryTypes.SELECT
    })
};


/**
 * Lista utentes a medicar no dia atual
 */
module.exports.listarUtentesAMedicar = (altura) => {
    return sequelize.query(`SELECT DISTINCT u.*
                            FROM med_bd.Utente as u
                            INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
                            WHERE fm.estado = 1 
                            AND now() BETWEEN fm.dataInicio AND fm.dataFim 
                            AND fm.dias & 1 != 0 
                            AND fm.periodosDia & :altura != 0;`,
            { 
                replacements: { 
                    altura: altura 
                }, 
                type: sequelize.QueryTypes.SELECT 
            }
  )
};

/**
 * Lista informação sobre administração de determinado utente
 * para determinada altura do dia atual
 */
module.exports.listarAdministracao = (idUtente, altura) => {
    return sequelize.query(`SELECT CONCAT(m.nome, ' - ', m.forma) as 'Medicamento' , fm.quantidade, fm.unidade, a.estado
                            FROM med_bd.Utente as u
                            INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
                            INNER JOIN med_bd.Medicamento as m ON fm.idMedicamento = m.idMedicamento
                            LEFT JOIN med_bd.Administracao as a ON a.idUtente = u.idUtente 
                                AND a.idMedicamento = m.idMedicamento 
                                AND date(a.dataAdministracao) = date(now())
                            WHERE u.idUtente = :idUtente
                                AND fm.estado = 1 
                                AND now() BETWEEN fm.dataInicio AND fm.dataFim 
                                AND fm.dias & 1 != 0 
                                AND fm.periodosDia & :altura != 0;`,
        { 
            replacements: { 
                altura: altura, 
                idUtente: idUtente 
            }, 
            type: sequelize.QueryTypes.SELECT 
        }
  )
};

/**
 * TODO: Controladores para alteração do estado da administação 
 */

module.exports.alterarEstado = (idUtente, idMedicamento) => {
    return sequelize.query(`UPDATE med_bd.Administracao 
                                    SET estado = 1 - estado 
                                    WHERE  idUtente = :idUtente AND idMedicamento = :idMedicamento;`,
        { 
            replacements: {
                idMedicamento: idMedicamento, 
                idUtente: idUtente
            }, 
            type: sequelize.QueryTypes.UPDATE
        }
    )
};
