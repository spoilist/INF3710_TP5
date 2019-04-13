import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from '../../../common/tables/Animal';
// import {Hotel} from "../../../common/tables/Hotel";
// import {Room} from '../../../common/tables/Room';

// import { Message } from "../../../common/communication/message";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.createSchema().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.populateDb().then((result: pg.QueryResult) => {
                    console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                    res.json(result);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/clinique/id",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getCliniquesId().then((result: pg.QueryResult) => {
                    console.log(result.rows);
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                    console.log(result.rows);
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                const animal: Animal = {
                    numAnimal: req.body.numAnimal,
                    numProprietaire: req.body.numProprietaire,
                    numClinique: req.body.numClinique,
                    nom: req.body.nom,
                    typeAnimal: req.body.typeAnimal,
                    description: req.body.description,
                    dateNaissance: req.body.dateNaissance,
                    dateInscription: req.body.dateInscription,
                    etatActuel: req.body.etatActuel,
                };
                console.log(animal);

                this.databaseService.addAnimal(animal)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
            });

        router.delete("/animal/remove",
                      (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.removeAnimal(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
            });

        router.post("/animal/name",
                    (req: Request, res: Response, next: NextFunction) => {
                       console.log("TEST" + req.body.nom);
                       this.databaseService.getAnimalsByName(req.body.nom)
                       .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        // console.error(e.stack);
                    });
            });

        router.get("/treatement",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getTreatmentByAnimal(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .then((result: pg.QueryResult) => {
                        const animalA: Animal = {
                            numAnimal: result.rows[0].numAnimal,
                            numProprietaire: result.rows[0].numProprietaire,
                            numClinique: result.rows[0].numClinique,
                            nom: result.rows[0].nom,
                            typeAnimal: result.rows[0].typeAnimal,
                            description: result.rows[0].description,
                            dateNaissance: result.rows[0].dateNaissance,
                            dateInscription: result.rows[0].dateInscription,
                            etatActuel: result.rows[0].etatActuel,
                        };
                        console.log(animalA);
                        res.json(animalA);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.get("/treatment/price",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getTreatmentByAnimal(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .then((result: pg.QueryResult) => {
                        const receipt: number = result.rows[0];
                        console.log(receipt);
                        res.json(receipt);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });
        /*
                router.get("/hotel",
                           (req: Request, res: Response, next: NextFunction) => {
                            // Send the request to the service and send the response
                            this.databaseService.getHotels().then((result: pg.QueryResult) => {
                            const hotels: Hotel[] = result.rows.map((hot: any) => (
                                {
                                hotelno: hot.hotelno,
                                hotelname: hot.hotelname,
                                city: hot.city
                            }));
                            res.json(hotels);
                        }).catch((e: Error) => {
                            console.error(e.stack);
                        });
                    });

                router.get("/hotel/hotelNo",
                           (req: Request, res: Response, next: NextFunction) => {
                              this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                                const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
                                res.json(hotelPKs);
                              }).catch((e: Error) => {
                                console.error(e.stack);
                            });
                          });

                router.post("/hotel/insert",
                            (req: Request, res: Response, next: NextFunction) => {
                                const hotelNo: string = req.body.hotelNo;
                                const hotelName: string = req.body.hotelName;
                                const city: string = req.body.city;
                                this.databaseService.createHotel(hotelNo, hotelName, city).then((result: pg.QueryResult) => {
                                res.json(result.rowCount);
                            }).catch((e: Error) => {
                                console.error(e.stack);
                                res.json(-1);
                            });
                });

                router.get("/rooms",
                           (req: Request, res: Response, next: NextFunction) => {

                            // this.databaseService.getRoomFromHotel(req.query.hotelNo, req.query.roomType, req.query.price)
                            this.databaseService.getRoomFromHotelParams(req.query)
                            .then((result: pg.QueryResult) => {
                                const rooms: Room[] = result.rows.map((room: Room) => (
                                    {
                                    hotelno: room.hotelno,
                                    roomno: room.roomno,
                                    typeroom: room.typeroom,
                                    price: parseFloat(room.price.toString())
                                }));
                                res.json(rooms);
                            }).catch((e: Error) => {
                                console.error(e.stack);
                            });
                    });

                router.post("/rooms/insert",
                            (req: Request, res: Response, next: NextFunction) => {
                            const room: Room = {
                                hotelno: req.body.hotelno,
                                roomno: req.body.roomno,
                                typeroom: req.body.typeroom,
                                price: parseFloat(req.body.price)};
                            console.log(room);

                            this.databaseService.createRoom(room)
                            .then((result: pg.QueryResult) => {
                                res.json(result.rowCount);
                            })
                            .catch((e: Error) => {
                                console.error(e.stack);
                                res.json(-1);
                            });
                });

                router.get("/tables/:tableName",
                           (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.getAllFromTable(req.params.tableName)
                            .then((result: pg.QueryResult) => {
                                res.json(result.rows);
                            }).catch((e: Error) => {
                                console.error(e.stack);
                            });
                    });*/

        return router;
    }
}
