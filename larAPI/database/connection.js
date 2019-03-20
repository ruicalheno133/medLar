var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database : 'lar',
    username : 'root',
    password : 'lmppg97',
    dialect : 'mysql'
})

module.exports = sequelize