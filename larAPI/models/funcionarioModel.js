module.exports = (db, Sequelize) => {
    return db.define('Funcionario', {
        idFuncionario : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nome : {
            type : Sequelize.STRING(45),
            allowNull: false
        },
        email : {
            type : Sequelize.STRING(45),
            allowNull: false
        },
        password : {
            type : Sequelize.STRING(60),
            allowNull: false
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}