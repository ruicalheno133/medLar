var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database : 'med_bd',
    username : 'root',
    password : 'pass',
    dialect : 'mysql'
})

module.exports = sequelize