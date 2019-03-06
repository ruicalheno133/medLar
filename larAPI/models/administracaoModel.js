module.exports = (db, Sequelize) => { 
    db.define('Administracao', {
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
            type : Sequelize.BOOLEAN
        },
        dataAdministracao : {
            type : Sequelize.DATEONLY
        },
        observacao : {
            type : Sequelize.STRING
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}
