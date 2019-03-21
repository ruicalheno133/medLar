var Sequelize = require('sequelize')
var sequelize = require('../database/connection')

const FuncionarioModel = require('./funcionarioModel');
const UtenteModel = require('./utenteModel');
const MedicamentoModel = require('./medicamentoModel');
const AdministracaoModel = require('./administracaoModel');
const FichaMedicacaoModel = require('./fichaMedicacaoModel');
const LembreteModel = require('./lembreteModel');

// Criação dos Modelos

const Funcionario = FuncionarioModel(sequelize,Sequelize);
const Utente = UtenteModel(sequelize,Sequelize);
const Medicamento = MedicamentoModel(sequelize,Sequelize);
const Administracao = AdministracaoModel(sequelize,Sequelize);
const FichaMedicacao = FichaMedicacaoModel(sequelize,Sequelize);
const Lembrete = LembreteModel(sequelize,Sequelize);

Funcionario.hasMany(Administracao, {
    foreignKey:{
        fieldName:'idFuncionario',
        allowNull:false
    },
    onDelete: 'CASCADE'
});

Funcionario.hasMany(Lembrete,{
    foreignKey:{
        fieldName:'idFuncionario',
        allowNull: false
    },
    onDelete:'CASCADE'
});

Utente.hasMany(Administracao, {
    foreignKey:{
        fieldName:'idUtente',
        allowNull:false
    },
    onDelete: 'CASCADE'
});
Medicamento.hasMany(Administracao, {
    foreignKey:{
        fieldName:'idMedicamento',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Utente.hasMany(FichaMedicacao, {
    foreignKey:{
        fieldName:'idUtente',
        allowNull:false
    },
    onDelete: 'CASCADE'
});
Medicamento.hasMany(FichaMedicacao, {
    foreignKey:{
        fieldName:'idMedicamento',
        allowNull:false
    },
    onDelete: 'CASCADE'
});

sequelize.sync({force:false})
    .then(() => {
        console.log("Database & tables created!")
    })

module.exports = {
    Funcionario,
    Utente,
    Medicamento,
    Administracao,
    FichaMedicacao,
    Lembrete
}
