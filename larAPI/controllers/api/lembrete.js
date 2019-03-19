const {Lembrete} = require('../../models/index');

/**
 * Inserir lembrete
 */
module.exports.inserir = (lembrete) => {
    return Lembrete.create(lembrete);
};

/**
 * Listar todos os lembretes de um utente
 */
module.exports.listar = (idFuncionario) => {
    return Lembrete.findAll({
        attributes:['timestamp','texto','utente'],
        where:{
            idFuncionario: idFuncionario
            // adicionar aqui concluido: true
        }
    })
};