var Sequelize = require('sequelize');
var db = require('../database/connection');

var medicamentoModel = db.define('Medicamento', {
    idMedicamento : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nome : {
        type : Sequelize.STRING
    },
    forma : {
        type : Sequelize.STRING
    }
}, 
{
    freezeTableName : true,
    timestamps: false
})

module.exports = medicamentoModel;