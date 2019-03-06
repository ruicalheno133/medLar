module.exports = (db, Sequelize) => {
    return db.define('Utente', {
        idUtente : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nome : {
            type : Sequelize.STRING
        },
        nomeUsado : {
            type : Sequelize.STRING
        },
        dataNascimento : {
            type : Sequelize.DATEONLY
        },
        contEmergencia : {
            type : Sequelize.STRING(9)
        },
        foto : {
            type : Sequelize.BLOB
        },
        estado : {
            type : Sequelize.BOOLEAN
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}
