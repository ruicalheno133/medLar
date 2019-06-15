module.exports = (db, Sequelize) => { 
    return db.define('Administracao', {
        idAdministracao : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idFuncionario : {
            type : Sequelize.INTEGER,
            //primaryKey : true
        },
        idUtente : {
            type : Sequelize.INTEGER,
            //primaryKey : true
        },
        idMedicamento : {
            type : Sequelize.INTEGER,
            //primaryKey : true
        },
        altura: {
            type : Sequelize.INTEGER,
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
            allowNull: true
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}
