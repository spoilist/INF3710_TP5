import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";

@Injectable()
export class CommunicationService {

    // tslint:disable:no-any
    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getCliniquesId(): Observable<string[]> {
        return this.http.get<string[]>(this.BASE_URL + "/clinique/id").pipe(
            catchError(this.handleError<string[]>("getCliniquesId")),
        );
    }

    public getProprietairesId(numClinique: string): Observable<string[]> {
        const reqBody: Object = {num: numClinique};
        console.log("getProprietairesId()");

        return this.http.post<string[]>(this.BASE_URL + "/proprietaire/id", reqBody).pipe(
            catchError(this.handleError<string[]>("getProprietairesId")),
        );
    }

    public getAnimalsId(numProprietaire: string): Observable<string[]> {
        const reqBody: Object = {num: numProprietaire};
        console.log("getAnimalsId()");

        return this.http.post<string[]>(this.BASE_URL + "/animals/id", reqBody).pipe(
            catchError(this.handleError<string[]>("getAnimalsId()")),
        );
    }

    public getAnimals(): Observable<any[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animal").pipe(
            catchError(this.handleError<Animal[]>("getAnimal")),
        );
    }

    public getAnimalsByName(nomAnimal: string): Observable<Animal[]> {
        const reqBody: Object = {nom: nomAnimal};

        return this.http.post<Animal[]>(this.BASE_URL + "/animal/name", reqBody).pipe(
            catchError(this.handleError<Animal[]>("getAnimalsByName")),
        );
    }

    public addAnimal(animal: Animal): Observable<Animal[]> {
        console.log("addAnimal() client side");

        return this.http.post<Animal[]>(this.BASE_URL + "/animal/add", animal).pipe(
            catchError(this.handleError<Animal[]>("addAnimal")),
        );
    }

    public removeAnimal(numClinique: string, numProprietaire: string, numAnimal: string): Observable<Animal[]> {
        const reqBody: any = {numClinique: numClinique,
                              numProprietaire: numProprietaire,
                              numAnimal: numAnimal
                            };

        return this.http.post<Animal[]>(this.BASE_URL + "/animal/remove", reqBody).pipe(
            catchError(this.handleError<Animal[]>("removeAnimal")),
        );
    }

    public getAnimalTreatments(numClinique: string, numProprietaire: string, numAnimal: string): Observable<string[]> {
        const reqBody: any = {numClinique: numClinique,
                              numProprietaire: numProprietaire,
                              numAnimal: numAnimal
          };

        return this.http.post<string[]>(this.BASE_URL + "/animal/treatment", reqBody).pipe(
            catchError(this.handleError<string[]>("getAnimalTreatments")),
        );
    }

    public getAnimalReceipt(numClinique: string, numProprietaire: string, numAnimal: string): Observable<string[]> {
        const reqBody: any = {numClinique: numClinique,
                              numProprietaire: numProprietaire,
                              numAnimal: numAnimal
          };

        return this.http.post<string[]>(this.BASE_URL + "/animal/receipt", reqBody).pipe(
            catchError(this.handleError<string[]>("getAnimalReceipt")),
        );
    }

    public modifyAnimalAttribute(numClinique: string, numProprietaire: string,
                                 numAnimal: string, modification: string, modificationInput: string):
        Observable<Animal[]> {
        const reqBody: any = {numClinique: numClinique,
                              numProprietaire: numProprietaire,
                              numAnimal: numAnimal,
                              modification: modification,
                              modificationInput: modificationInput,
          };

        return this.http.post<Animal[]>(this.BASE_URL + "/animal/modification", reqBody).pipe(
            catchError(this.handleError<Animal[]>("modifyAnimalAttribute")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
