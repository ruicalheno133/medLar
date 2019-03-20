# Queries necessárias para a API 

# Listar todos os utentes 

SELECT * FROM med_bd.Utente;

# Listar todos os medicamentos 

SELECT * FROM med_bd.Medicamento;

# Listar Medicamento

SELECT CONCAT(med.nome, " - ", med.forma) as 'Medicamento'
FROM med_bd.Medicamento as med ;

# Listar utentes a Medicar em determinado dia e determinado periodo 

SELECT DISTINCT u.*
FROM med_bd.Utente as u
INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
WHERE fm.estado = 1 AND now() BETWEEN fm.dataInicio AND fm.dataFim AND fm.dias & 1 != 0 AND fm.periodosDia & 1 != 0;

# Apresentar informacao de administracao para determinado dia e periodo

SELECT CONCAT(m.nome, ' - ', m.forma) as 'Medicamento' , fm.quantidade, fm.unidade, a.estado
FROM med_bd.Utente as u
INNER JOIN med_bd.FichaMedicacao as fm ON fm.idUtente = u.idUtente 
INNER JOIN med_bd.Medicamento as m ON fm.idMedicamento = m.idMedicamento
LEFT JOIN med_bd.Administracao as a ON a.idUtente = u.idUtente AND a.idMedicamento = m.idMedicamento AND date(a.dataAdministracao) = date(now())
WHERE u.idUtente = 1 AND fm.estado = 1 AND now() BETWEEN fm.dataInicio AND fm.dataFim AND fm.dias & 1 != 0 AND fm.periodosDia & 1 != 0;

# Apresentar ficha medica de determinado utente

SELECT fm.* 
FROM med_bd.FichaMedicacao as fm 
WHERE fm.idUtente = 1 AND fm.estado = 1;

# Apresentar ficha medica de determinado utente por periodo do dia

SELECT fm.* 
FROM med_bd.FichaMedicacao as fm 
WHERE fm.idUtente = 1 AND fm.estado = 1 AND fm.periodosDia & 1 != 0;


