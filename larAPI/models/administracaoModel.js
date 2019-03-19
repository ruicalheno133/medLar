module.exports = (db, Sequelize) => { 
    return db.define('Administracao', {
        idFuncionario : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        idUtente : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        idMedicamento : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        estado : {
            type : Sequelize.BOOLEAN,
            allowNull: false
        },
        dataAdministracao : {
            type : Sequelize.DATEONLY,
            allowNull: false
        },
        observacao : {
            type : Sequelize.STRING(45),
            allowNull: false
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}
