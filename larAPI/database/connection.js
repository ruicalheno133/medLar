var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database : 'lar',
    username : 'root',
    password : 'pass',
    dialect : 'mysql'
})

module.exports = sequelize