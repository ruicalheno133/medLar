var Sequelize = require('sequelize');
var db = require('../database/connection');

var utenteModel = db.define('Utente', {
    idUtente : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nome : {
        type : Sequelize.STRING
    }
}, 
{
    freezeTableName : true,
    timestamps: false
})

module.exports = utenteModel;