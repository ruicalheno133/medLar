# Script povoamento da bd med_bd 
# Para efeitos de teste

# Funcionárias

INSERT INTO med_bd.Funcionario VALUES
	(1, 'Fernanda Alvim', 'feralvim@gmail.com', 'feralvim'),
	(2, 'Armando Sardinha', 'armandos@gmail.com', 'armandos');
    
# Utentes 

INSERT INTO med_bd.Utente VALUES 
	(1, 'Rui Calheno', 'Calheno', STR_TO_DATE('06/06/1997', '%d/%m/%Y') ,123456789, null, 1),
	(2, 'Luis Guimaraes', 'Luis', STR_TO_DATE('20/12/1990', '%d/%m/%Y'),123456789, null, 1),
	(3, 'Paula Pereira', null, STR_TO_DATE('09/07/1996', '%d/%m/%Y') , 123456789, null, 1) ;
    
# Medicamentos 

INSERT INTO med_bd.Medicamento VALUES 
	(1, 'Ben-u-ron', 'oral'),
	(2, 'Brufen', 'oral'),
	(3, 'Aspirina', 'oral'),
	(4, 'Xanax', 'oral') ;
    
# Ficha Medicacao 

INSERT INTO med_bd.FichaMedicacao VALUES 
	# Paciente Rui Calheno tem de tomar 200mg de Brufen Oral de 18/03/2019 até 20/04/2019 aos sabados e domingos ao pequeno almoco
	(1, 2, 1 , 200, 'mg', STR_TO_DATE('18/03/2019', '%d/%m/%Y'), STR_TO_DATE('20/04/2019 ', '%d/%m/%Y'), 3, 1) ;