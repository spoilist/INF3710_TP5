import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
// import { Message } from "../../../common/communication/message";
import { Animal } from "../../../common/tables/Animal";
// import { Room } from "../../../common/tables/Room";
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
    /*
        // HOTEL
        public getHotels(): Promise<pg.QueryResult> {
            this.pool.connect();

            return this.pool.query('SELECT * FROM HOTELDB.Hotel;');
        }

        public getHotelNo(): Promise<pg.QueryResult> {
            this.pool.connect();

            return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');
        }

        public createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
            this.pool.connect();
            const values: string[] = [
                hotelNo,
                hotelName,
                city
            ];
            const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

            return this.pool.query(queryText, values);
        }

        // ROOM
        public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
            this.pool.connect();

            let query: string =
            `SELECT * FROM HOTELDB.room
            WHERE hotelno=\'${hotelNo}\'`;
            if (roomType !== undefined) {
                query = query.concat('AND ');
                query = query.concat(`typeroom=\'${roomType}\'`);
            }
            if (price !== undefined) {
                query = query.concat('AND ');
                query = query.concat(`price =\'${price}\'`);
            }
            console.log(query);

            return this.pool.query(query);
        }

        public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
            this.pool.connect();

            let query: string = 'SELECT * FROM HOTELDB.room \n';
            const keys: string[] = Object.keys(params);
            if (keys.length > 0) {
                query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
            }

            // On enleve le premier element
            keys.shift();

            // tslint:disable-next-line:forin
            for (const param in keys) {
                const value: string = keys[param];
                query = query.concat(`AND ${value} = \'${params[value]}\'`);
                if (param === 'price') {
                    query = query.replace('\'', '');
                }
            }

            console.log(query);

            return this.pool.query(query);

        }

        public createRoom(room: Room): Promise<pg.QueryResult> {
            this.pool.connect();
            const values: string[] = [
                room.roomno,
                room.hotelno,
                room.typeroom,
                room.price.toString()
            ];
            const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

            return this.pool.query(queryText, values);
        }

        // GUEST
        public createGuest(guestNo: string,
                           nas: string,
                           guestName: string,
                           gender: string,
                           guestCity: string): Promise<pg.QueryResult> {
            this.pool.connect();
            const values: string[] = [
                guestNo,
                nas,
                guestName,
                gender,
                guestCity
            ];
            const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

            return this.pool.query(queryText, values);
        }

        // BOOKING
        public createBooking(hotelNo: string,
                             guestNo: string,
                             dateFrom: Date,
                             dateTo: Date,
                             roomNo: string): Promise<pg.QueryResult> {
            this.pool.connect();
            const values: string[] = [
                hotelNo,
                guestNo,
                dateFrom.toString(),
                dateTo.toString(),
                roomNo
            ];
            const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

            return this.pool.query(queryText, values);
            }*/

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
        console.log("FINAL STEP BEFORE ADDING");

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
                                   WHERE numClinique = $1 AND numProprietaire = $2 AND numAnimal = $3;`;

        this.pool.query(queryText, values);
    }

    public async getAnimalsByName(nom: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const search: string[] = ['%' + nom + '%'];
        const queryText: string = `SELECT * FROM bdschema.animal
                                   WHERE nom LIKE $1;`;

        return this.pool.query(queryText, search);
    }

    public async getTreatmentByAnimal(numClinique: string, numProprietaire: string, numAnimal: string): Promise<pg.QueryResult> {
        await this.pool.connect();
        const values: string[] = [
            numClinique,
            numProprietaire,
            numAnimal,
        ];
        const queryText: string = `SELECT * FROM bdschema.traitement
                                   WHERE numClinique = $1 AND numProprietaire = $2 AND numAnimal = $3;`;

        return this.pool.query(queryText, values);
    }

    public async getReceipt(numClinique: string, numProprietaire: string, numAnimal: string): Promise<pg.QueryResult> {
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
}
