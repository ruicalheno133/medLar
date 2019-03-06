module.exports = (db, Sequelize) => {
    db.define('Funcionario', {
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
}