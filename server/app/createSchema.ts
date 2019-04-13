export const schema: string = `
SET search_path = postgres;

DROP SCHEMA IF EXISTS bdschema CASCADE;
CREATE SCHEMA bdschema;

CREATE TABLE IF NOT EXISTS  bdschema.Clinique (
		numClinique		VARCHAR(10)		NOT NULL,
		rue				VARCHAR(20)		NOT NULL,
		ville			VARCHAR(20)		NOT NULL,
		province		VARCHAR(20)		NOT NULL,
		codePostal		VARCHAR(6)		NOT NULL,
		numTelephone	VARCHAR(15)		NOT NULL,
		numTelecopieur	VARCHAR(10)		NOT NULL,
		numGestionnaire	VARCHAR(10)		NOT NULL,
		PRIMARY KEY (numClinique)
		);

CREATE TABLE IF NOT EXISTS  bdschema.Personnel (
		numPersonnel	VARCHAR(10)		NOT NULL,
		nom				VARCHAR(20)		NOT NULL,
		prenom			VARCHAR(20)		NOT NULL,
		adresse			VARCHAR(50)		NOT NULL,
		numTelephone	VARCHAR(15)		NOT NULL,
		dateNaissance	DATE			NOT NULL,
		sexe			CHAR			NOT NULL CHECK (sexe IN ('M', 'F')),
		fonction		VARCHAR(20)		NOT NULL,
		salaireAnnuel	INT				NOT NULL,
		numClinique		VARCHAR(10)		NOT NULL,
		PRIMARY KEY (numPersonnel),
		FOREIGN KEY (numClinique) REFERENCES bdschema.Clinique(numClinique));

CREATE TABLE IF NOT EXISTS  bdschema.ProprietaireAnimal (
		numProprietaire	VARCHAR(10)		NOT NULL,
		numClinique		VARCHAR(10)		NOT NULL,
		nom				VARCHAR(20)		NOT NULL,
		adresse			VARCHAR(50)		NOT NULL,
		numTelephone	VARCHAR(15)		NOT NULL,
		PRIMARY KEY (numProprietaire, numClinique),
		FOREIGN KEY (numClinique) REFERENCES bdschema.Clinique(numClinique));

CREATE TABLE IF NOT EXISTS  bdschema.Animal (
		numAnimal		VARCHAR(10)		NOT NULL,
		numProprietaire	VARCHAR(10)		NOT NULL,
		numClinique		VARCHAR(10)		NOT NULL,
		nom				VARCHAR(20)		NOT NULL,
		typeAnimal		VARCHAR(20)		NOT NULL,
		description		VARCHAR(50)		NOT NULL,
		dateNaissance	DATE			NOT NULL,
		dateInscription	DATE			NOT NULL,
		etatActuel		VARCHAR(20)		NOT NULL CHECK (etatActuel IN ('vivant', 'decede')),
		PRIMARY KEY (numAnimal, numProprietaire, numClinique),
		FOREIGN KEY (numProprietaire, numClinique) REFERENCES bdschema.ProprietaireAnimal(numProprietaire, numClinique));

CREATE TABLE IF NOT EXISTS  bdschema.Veterinaire (
		numPersonnel	VARCHAR(10)		NOT NULL,
		typeInfirmiere	VARCHAR(20)		NOT NULL,
		PRIMARY KEY (numPersonnel),
		FOREIGN KEY (numPersonnel) REFERENCES bdschema.Personnel(numPersonnel)
		ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS  bdschema.DescriptionTraitement (
		numDescriptionTraitement	VARCHAR(4)		NOT NULL,
		description					VARCHAR(50)		NOT NULL,
		cout						INT				NOT NULL,
		qteTraitement				INT				NOT NULL,
		PRIMARY KEY (numDescriptionTraitement));

CREATE TABLE IF NOT EXISTS  bdschema.Traitement (
		numTraitement				VARCHAR(10)		NOT NULL,
		debutTraitement				TIMESTAMP		NOT NULL,
		finTraitement				TIMESTAMP		NOT NULL,
		numDescriptionTraitement	VARCHAR(4)		NOT NULL,
		numAnimal					VARCHAR(10)		NOT NULL,
		numProprietaire				VARCHAR(10)		NOT NULL,
		numClinique					VARCHAR(10)		NOT NULL,
		PRIMARY KEY (numTraitement),
		FOREIGN KEY (numDescriptionTraitement) REFERENCES bdschema.DescriptionTraitement(numDescriptionTraitement),
		FOREIGN KEY (numAnimal, numProprietaire, numClinique) REFERENCES bdschema.Animal(numAnimal, numProprietaire, numClinique));

CREATE TABLE IF NOT EXISTS  bdschema.ExamenAnimal (
		numTraitement		VARCHAR(10)		NOT NULL,
		numExamen			VARCHAR(10)		NOT NULL,
		dateExamen			DATE			NOT NULL,
		heureExamen			VARCHAR(10)		NOT NULL,
		nomVeterinaire		VARCHAR(20)		NOT NULL,
		descriptionResultat	VARCHAR(50)		NOT NULL,
		numVeterinaire		VARCHAR(10)		NOT NULL,
		PRIMARY KEY (numTraitement),
		FOREIGN KEY (numTraitement) REFERENCES bdschema.Traitement(numTraitement),
		FOREIGN KEY (numVeterinaire) REFERENCES bdschema.Veterinaire(numPersonnel));
`;
