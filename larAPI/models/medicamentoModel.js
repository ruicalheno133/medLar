module.exports = (db, Sequelize) => {
    return db.define('Medicamento', {
        idMedicamento : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        nome : {
            type : Sequelize.STRING(45),
            allowNull: false
        },
        forma : {
            type : Sequelize.STRING(45),
            allowNull: false
        }
    }, 
    {
        freezeTableName : true,
        timestamps: false
    })
}