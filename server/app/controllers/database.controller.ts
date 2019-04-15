import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from '../../../common/tables/Animal';
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
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/proprietaire/id",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getProprietairesId(req.body.num)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/animals/id",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimalsId(req.body.num)
                    .then((result: pg.QueryResult) => {
                        console.log(result.rows);
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.get("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                    res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/animal/add",
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

                this.databaseService.addAnimal(animal)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
            });

        router.post("/animal/remove",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.removeAnimal(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
            });

        router.post("/animal/name",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimalsByName(req.body.nom)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/animal/treatment",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimalTreatments(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/animal/receipt",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAnimalReceipt(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });
        router.post("/animal/modification",
                    (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.setAnimalModification(req.body.numClinique, req.body.numProprietaire, req.body.numAnimal,
                                                           req.body.modification, req.body.modificationInput)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
