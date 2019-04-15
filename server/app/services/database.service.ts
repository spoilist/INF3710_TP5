import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Animal } from "../../../common/tables/Animal";
import { schema } from "../createSchema";
import { data } from "../populateDB";

@injectable()
export class DatabaseService {

    public connectionConfig: pg.ConnectionConfig = {
        user: "",
        database: "postgres",
        password: "1234",
        port: 5432,
        host: "127.0.0.1",
        keepAlive: true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    /*
        METHODES DE DEBUG
    */
    public async createSchema(): Promise<pg.QueryResult> {
        await this.pool.connect();

        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {
        await this.pool.connect();

        return this.pool.query(data);
    }

    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        await this.pool.connect();

        return this.pool.query(`SELECT * FROM bdschema.${tableName};`);
    }
    /**    */

    public async getCliniquesId(): Promise<pg.QueryResult> {
        await this.pool.connect();

        return this.pool.query('SELECT numclinique FROM bdschema.clinique;');
    }

    public async getProprietairesId(num: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const search: string[] = [num];
        const queryText: string = `SELECT numproprietaire
                                   FROM bdschema.proprietaireanimal
                                   WHERE numclinique = $1;`;

        return this.pool.query(queryText, search);
    }

    public async getAnimalsId(num: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const search: string[] = [num];
        const queryText: string = `SELECT numanimal
                                   FROM bdschema.animal
                                   WHERE numproprietaire = $1;`;

        return this.pool.query(queryText, search);
    }

    public async getAnimals(): Promise<pg.QueryResult> {
        await this.pool.connect();

        return this.pool.query('SELECT * FROM bdschema.animal;');
    }

    public async addAnimal(animal: Animal): Promise<pg.QueryResult> {
        await this.pool.connect();
        const values: string[] = [
            animal.numAnimal,
            animal.numProprietaire,
            animal.numClinique,
            animal.nom,
            animal.typeAnimal,
            animal.description,
            animal.dateNaissance,
            animal.dateInscription,
            animal.etatActuel,
        ];
        const queryText: string = `INSERT INTO bdschema.animal VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);`;

        return this.pool.query(queryText, values);
    }

    public async removeAnimal(numClinique: string, numProprietaire: string, numAnimal: string): Promise<void> {
        await this.pool.connect();
        const values: string[] = [
            numClinique,
            numProprietaire,
            numAnimal,
        ];
        const queryText: string = `DELETE FROM bdschema.animal
                                   WHERE numclinique = $1 AND numproprietaire = $2 AND numanimal = $3;`;

        this.pool.query(queryText, values);
    }

    public async getAnimalsByName(nom: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const search: string[] = ['%' + nom + '%'];
        const queryText: string = `SELECT * FROM bdschema.animal
                                   WHERE nom LIKE $1;`;

        return this.pool.query(queryText, search);
    }

    public async getAnimalTreatments(numClinique: string, numProprietaire: string, numAnimal: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const values: string[] = [
            numClinique,
            numProprietaire,
            numAnimal,
        ];
        const queryText: string = `SELECT * FROM bdschema.traitement NATURAL JOIN bdschema.descriptiontraitement
                                   WHERE numclinique = $1 AND numproprietaire = $2 AND numanimal = $3;`;

        return this.pool.query(queryText, values);
    }

    public async getAnimalReceipt(numClinique: string, numProprietaire: string, numAnimal: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const values: string[] = [
            numClinique,
            numProprietaire,
            numAnimal,
        ];
        const queryText: string = `SELECT SUM(d.cout)
                                   FROM bdschema.traitement t, bdschema.DescriptionTraitement d
                                   WHERE t.numDescriptionTraitement = d.numDescriptionTraitement
                                   AND t.numClinique = $1
                                   AND t.numProprietaire = $2
                                   AND t.numAnimal = $3;`;

        return this.pool.query(queryText, values);
    }

    // tslint:disable-next-line:max-func-body-length
    public async setAnimalModification(numClinique: string, numProprietaire: string, numAnimal: string,
                                       modification: string, modficationInput: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const values: string[] = [
            numClinique,
            numProprietaire,
            numAnimal,
            modficationInput,
        ];
        let queryText: string = "";

        switch (modification) {
            case "nom": {
                queryText = `UPDATE bdschema.animal
                SET nom = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            case "typeAnimal": {
                queryText = `UPDATE bdschema.animal
                SET typeAnimal = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            case "description": {
                queryText = `UPDATE bdschema.animal
                SET description = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            case "dateNaissance": {
                queryText = `UPDATE bdschema.animal
                SET dateNaissance = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            case "dateInscription": {
                queryText = `UPDATE bdschema.animal
                SET dateInscription = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            case "etatActuel": {
                queryText = `UPDATE bdschema.animal
                SET etatActuel = $4
                WHERE numClinique = $1
                AND numProprietaire = $2
                AND numAnimal = $3;`;
                break;
            }
            default: {
                break;
            }
        }

        return this.pool.query(queryText, values);
    }
}
