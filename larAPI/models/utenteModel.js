module.exports = (db, Sequelize) => {
    return db.define('Utente', {
        idUtente : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nome : {
            type : Sequelize.STRING(45),
            allowNull: false
        },
        nomeUsado : {
            type : Sequelize.STRING(45),
            allowNull: true
        },
        dataNascimento : {
            type : Sequelize.DATEONLY,
            allowNull: false
        },
        contEmergencia : {
            type : Sequelize.STRING(9),
            allowNull: false
        },
        foto : {
            type : Sequelize.STRING(100),
            allowNull: true
        },
        estado : {
            type : Sequelize.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}
