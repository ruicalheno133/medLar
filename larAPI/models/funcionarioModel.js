var Sequelize = require('sequelize');
var db = require('../database/connection');

var funcionarioModel = db.define('Funcionario', {
    idFuncionario : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nome : {
        type : Sequelize.STRING
    },
    email : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING
    }
}, 
{
    freezeTableName : true,
    timestamps: false
})

module.exports = funcionarioModel;