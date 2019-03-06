module.exports = (db, Sequelize) => { 
    db.define('FichaMedicacao', {
        idUtente : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        idMedicamento : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        periodosDia : {
            type : Sequelize.TINYINT
        },
        quantidade : {
            type : Sequelize.INTEGER
        },
        unidade : {
            type : Sequelize.STRING
        },
        dataInicio : {
            type : Sequelize.DATEONLY
        },
        dataFim : {
            type : Sequelize.DATEONLY
        },
        dias : {
            type : Sequelize.TINYINT
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
