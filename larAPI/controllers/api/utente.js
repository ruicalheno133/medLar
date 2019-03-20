const {Utente, FichaMedicacao} = require('../../models/index');


/**
 * Inserir utente
 */
module.exports.inserir = (utente) => {
    return Utente.create(utente);
};

/**
 * Listar todos os utentes
 */
module.exports.listar = () => {
    return Utente.findAll({
        attributes:['nome','dataNascimento','contEmergencia','foto'],
        where:{
            estado:true
        }
    });
};

/**
 * Encontrar utente por id
 */
module.exports.listarPorID = (idUtente) => {
    return Utente.findOne({
        attributes:['nome','dataNascimento','contEmergencia','foto'],
        where:{
            estado:true
        }
    })
};

/**
 * Lista utentes a medicar num determinado dia
 */
module.exports.listarPorDia = (dia) => {
    return Utente.findall({
        attributes:['nome','dataNascimento','contEmergencia','foto'],
        include: [{
            model: FichaMedicacao,
            required:true,
            where:{
                dia:{
                    [Op.between]: [dataInicio, dataFim]
                },
                estado: true
            }
        }],
        where:{
            estado:true
        }
    })
}; 