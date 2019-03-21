var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database : 'med_bd',
    username : 'root',
    password : 'PedrocasAdministra66',
    dialect : 'mysql'
})

module.exports = sequelize