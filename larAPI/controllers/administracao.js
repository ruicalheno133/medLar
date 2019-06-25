const {Administracao} = require('../models/index');
var sequelize = require('../database/connection')


/**
 * Insert into med_bd.Administracao VALUES (idFuncionario, idUtente, idMedicamento, estado, dataAdministracao, observacao);
 */
module.exports.inserir = (administracao) => {
    return sequelize.query(`INSERT INTO administracao VALUES 
                            (null, :idFuncionario, :idUtente, :idMedicamento, :altura, :estado, date(now()), :observacao)`,
            { 
                replacements: { 
                    idFuncionario: administracao.idFuncionario,
                    idUtente: administracao.idUtente,
                    idMedicamento: administracao.idMedicamento,
                    altura:administracao.altura,
                    estado: administracao.estado,
                    observacao: administracao.observacao
                }, 
                type: sequelize.QueryTypes.INSERT
            }
  )
};

module.exports.listar = () => {
    return sequelize.query(`SELECT DISTINCT u.*
                            FROM med_bd.Utente as u
                            INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
                            WHERE fm.estado = 1 
                            AND u.estado = 1
                            AND ((fm.dataFim IS NOT NULL AND now() BETWEEN fm.dataInicio AND fm.dataFim) 
                                OR (fm.dataFim IS NULL AND now() >= fm.dataInicio))
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
 * Lista utentes a medicar no dia atual
 */
module.exports.listarUtentesAMedicar = (altura) => {
    var now = new Date();
    var dia = Math.pow(2, now.getDay())
    return sequelize.query(`SELECT DISTINCT u.*
                            FROM med_bd.Utente as u
                            INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
                            WHERE fm.estado = 1 
                            AND u.estado = 1
                            AND ((fm.dataFim IS NOT NULL AND now() BETWEEN fm.dataInicio AND fm.dataFim) 
                                OR (fm.dataFim IS NULL AND now() >= fm.dataInicio))
                            AND fm.dias & :dia != 0 
                            AND fm.periodosDia & :altura != 0;`,
            { 
                replacements: { 
                    altura: altura,
                    dia: dia
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
    var now = new Date();
    var dia = Math.pow(2, now.getDay())
    return sequelize.query(`SELECT m.idMedicamento, CONCAT(m.nome, ' - ', m.forma) as 'Medicamento' , fm.idFichaMedicacao ,fm.quantidade, fm.unidade, a.estado, a.idAdministracao
                            FROM med_bd.Utente as u
                            INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
                            INNER JOIN med_bd.Medicamento as m ON fm.idMedicamento = m.idMedicamento
                            LEFT JOIN med_bd.Administracao as a ON a.idUtente = u.idUtente 
                                AND a.idMedicamento = m.idMedicamento 
                                AND date(a.dataAdministracao) = date(now())
                                AND a.altura & :altura != 0
                            WHERE u.idUtente = :idUtente
                                AND fm.estado = 1 
                                AND u.estado = 1
                                AND ((fm.dataFim IS NOT NULL AND now() BETWEEN fm.dataInicio AND fm.dataFim) 
                                OR (fm.dataFim IS NULL AND now() >= fm.dataInicio))
                                AND fm.dias & :dia != 0 
                                AND fm.periodosDia & :altura != 0;`,
        { 
            replacements: { 
                altura: altura, 
                idUtente: idUtente,
                dia: dia
            }, 
            type: sequelize.QueryTypes.SELECT 
        }
  )
};

/**
 * TODO: Controladores para alteração do estado da administação 
 */

module.exports.atualizar = (idAdministracao, data) => {
    return sequelize.query(`UPDATE med_bd.Administracao 
                                    SET estado = :estado,
                                        observacao = :observacao
                                    WHERE  idAdministracao = :idAdministracao`,
        { 
            replacements: {
                idAdministracao: idAdministracao, 
                estado: data.estado,
                observacao: data.observacao !== undefined ? data.observacao : null
            }, 
            type: sequelize.QueryTypes.UPDATE
        }
    )
};

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
