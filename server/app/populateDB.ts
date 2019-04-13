export const data: string = `
SET search_path = postgres;

-- Cliniques
INSERT INTO bdschema.Clinique VALUES ('1000001110', 'Foret', 'Montreal', 'Quebec', 'J67087', '5146545434', '123123123', '1212121212');
INSERT INTO bdschema.Clinique VALUES ('1000001111', 'Bertt', 'Montreal', 'Quebec', 'J68888', '5146344534', '123123124', '1212121213');
INSERT INTO bdschema.Clinique VALUES ('1000001112', 'Cilogne', 'Montreal', 'Quebec', 'GT1233', '6654342312', '123123125', '1212121214');

-- Propriétaires animal
INSERT INTO bdschema.ProprietaireAnimal VALUES ('2222222222', '1000001110', 'Jean-Simon Tremblay', '123 Avenue Bison, Montreal, Quebec',
												'5146789098');
INSERT INTO bdschema.ProprietaireAnimal VALUES ('2222222223', '1000001111', 'Paul Amblay', '1443 Avenue Pageo, Montreal, Quebec',
												'5444447676');
INSERT INTO bdschema.ProprietaireAnimal VALUES ('2222222224', '1000001110', 'Bertrand Gerard', '12333 rue Shawa, Montreal, Quebec',
												'4544567890');

-- Animaux
INSERT INTO bdschema.Animal VALUES ('3333333333', '2222222222', '1000001110', 'Domino', 'chat', 'chat noir et blanc',
									'2000-10-15', '2001-11-01', 'vivant');
INSERT INTO bdschema.Animal VALUES ('3333333334', '2222222222', '1000001110', 'Bobby', 'poisson', 'rouge et orange',
									'2001-10-15', '2001-11-01', 'decede');
INSERT INTO bdschema.Animal VALUES ('3333333335', '2222222222', '1000001110', 'Charly', 'chien', 'labradore',
									'2010-10-15', '2011-12-21', 'vivant');
INSERT INTO bdschema.Animal VALUES ('3333333336', '2222222223', '1000001111', 'Carl', 'chat', 'orange',
									'2011-08-05', '2012-11-11', 'decede');
INSERT INTO bdschema.Animal VALUES ('3333333337', '2222222224', '1000001110', 'Mino', 'chat', 'blanc',
									'2011-09-25', '2012-12-01', 'vivant');
INSERT INTO bdschema.Animal VALUES ('3333333338', '2222222224', '1000001110', 'Berny', 'chien', 'bulldog',
									'2013-10-25', '2014-12-01', 'vivant');

-- Personnel
INSERT INTO bdschema.Personnel VALUES ('4444444444', 'Jeannette', 'Jeanne', '333 rue Patouf, Montreal, Quebec', '4543367890',
									   '1999-09-25', 'F', 'Veterinaire', 70000, '1000001110');
INSERT INTO bdschema.Personnel VALUES ('4444444445', 'Carer', 'Bob', '31223 rue Saaalp, Montreal, Quebec', '4543333390',
									   '1950-09-11', 'M', 'Consierge', 30000, '1000001110');
INSERT INTO bdschema.Personnel VALUES ('4444444446', 'Tremblay', 'Remi', '111 rue Regi, Montreal, Quebec', '1111333390',
									   '1955-09-11', 'M', 'Receptionist', 40000, '1000001110');
INSERT INTO bdschema.Personnel VALUES ('4444444447', 'Tremblay', 'Bobby', '111 rue Regi, Montreal, Quebec', '1111333390',
									   '1952-09-11', 'M', 'Receptionist', 40000, '1000001111');
INSERT INTO bdschema.Personnel VALUES ('4444444448', 'Tremblay', 'Jean', '113 avenue Cara, Montreal, Quebec', '4111237890',
									   '1991-05-21', 'M', 'Veterinaire', 75000, '1000001111');
INSERT INTO bdschema.Personnel VALUES ('4444444449', 'Bonsoir', 'Vincent', '113 rue Cachou, Montreal, Quebec', '4123237890',
									   '1945-02-22', 'M', 'Veterinaire', 80000, '1000001111');
INSERT INTO bdschema.Personnel VALUES ('4444444450', 'Bourbon', 'Felix', '1113 rue Remisa, Montreal, Quebec', '1123237890',
									   '1995-10-22', 'M', 'Veterinaire', 90000, '1000001112');

-- Veterinaire
INSERT INTO bdschema.Veterinaire VALUES ('4444444444', 'Standard');
INSERT INTO bdschema.Veterinaire VALUES ('4444444448', 'Urgence');
INSERT INTO bdschema.Veterinaire VALUES ('4444444449', 'Standard');
INSERT INTO bdschema.Veterinaire VALUES ('4444444450', 'En chef');

-- Description de traitement
INSERT INTO bdschema.DescriptionTraitement VALUES ('T110', 'Traitement à la Pénicilline', 50, 1);
INSERT INTO bdschema.DescriptionTraitement VALUES ('T111', 'Passer un examen général animal', 20, 3);
INSERT INTO bdschema.DescriptionTraitement VALUES ('T112', 'Vaccination contre la grippe', 70, 2);

-- Traitement
INSERT INTO bdschema.Traitement VALUES ('5555555555', '2011-10-10 12:00:00', '2011-10-10 13:00:00', 'T111', '3333333333',
										  '2222222222', '1000001110');
INSERT INTO bdschema.Traitement VALUES ('5555555556', '2012-11-10 12:00:00', '2012-11-10 13:00:00', 'T111', '3333333333',
										  '2222222222', '1000001110');
INSERT INTO bdschema.Traitement VALUES ('5555555557', '2012-11-10 13:00:00', '2012-11-10 13:30:00', 'T112', '3333333333',
										  '2222222222', '1000001110');
INSERT INTO bdschema.Traitement VALUES ('5555555558', '2012-11-10 13:30:00', '2012-11-10 14:00:00', 'T110', '3333333333',
										  '2222222222', '1000001110');
INSERT INTO bdschema.Traitement VALUES ('5555555559', '2014-11-10 13:30:00', '2014-11-10 14:00:00', 'T111', '3333333335',
										  '2222222222', '1000001110');
INSERT INTO bdschema.Traitement VALUES ('5555555560', '2014-11-10 14:00:00', '2014-11-10 14:30:00', 'T112', '3333333335',
										  '2222222222', '1000001110');
-- Examen animal
INSERT INTO bdschema.ExamenAnimal VALUES ('5555555555', '6666666666', '2011-10-10', '12:00', 'Jeanne Jeannette',
										  'Examen complété - Auncun problème trouvé', '4444444444');
INSERT INTO bdschema.ExamenAnimal VALUES ('5555555556', '6666666667', '2012-11-10', '12:00', 'Jeanne Jeannette',
										  'Examen complété - Auncun problème trouvé', '4444444444');

`;
