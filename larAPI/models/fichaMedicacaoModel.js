module.exports = (db, Sequelize) => { 
    return db.define('FichaMedicacao', {
        idFichaMedicacao:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUtente : {
            type : Sequelize.INTEGER,
            //primaryKey : true,
            allowNull: false

        },
        idMedicamento : {
            type : Sequelize.INTEGER,
            //primaryKey : true,
            allowNull: false
        },
        periodosDia : {
            type : Sequelize.TINYINT,
            allowNull: false
        },
        quantidade : {
            type : Sequelize.INTEGER,
            allowNull: false
        },
        unidade : {
            type : Sequelize.STRING(45),
            allowNull: false
        },
        dataInicio : {
            type : Sequelize.DATEONLY,
            allowNull: false
        },
        dataFim : {
            type : Sequelize.DATEONLY,
            allowNull: true
        },
        dias : {
            type : Sequelize.TINYINT,
            allowNull: false
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
