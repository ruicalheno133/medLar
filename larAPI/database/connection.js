var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database : 'med_bd',
    username : 'root',
    password : 'lmppg97',
    dialect : 'mysql'
})

module.exports = sequelize