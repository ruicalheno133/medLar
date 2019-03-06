module.exports = (db, Sequelize) => {
    return db.define('Medicamento', {
        idMedicamento : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nome : {
            type : Sequelize.STRING
        },
        forma : {
            type : Sequelize.STRING
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}