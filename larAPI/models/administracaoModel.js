var Sequelize = require('sequelize');
var db = require('../database/connection');

var administracaoModel = db.define('Administracao', {
    idFuncionario : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idUtente : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idMedicamento : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    estado : {
        type : Sequelize.BOOLEAN
    },
    dataAdministracao : {
        type : Sequelize.DATEONLY
    },
    observacao : {
        type : Sequelize.STRING
    }
}, 
{
    freezeTableName : true,
    timestamps: false
})

module.exports = administracaoModel;