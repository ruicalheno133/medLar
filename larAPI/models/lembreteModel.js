module.exports = (sequelize, type) => {
    return sequelize.define('Lembrete',{
        idLembrete:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        texto:{
            type: type.STRING(250),
            allowNull: false
        },
        utente:{
            type: type.STRING(45),
            allowNull:true
        }
    },
    {
        freezeTableName : true,
        timestamps: false
    })
}