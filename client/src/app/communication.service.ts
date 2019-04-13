import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
// import {Hotel} from "../../../common/tables/Hotel";
// import { Room } from "../../../common/tables/Room";
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

/*
    public getHotels(): Observable<any[]> {

        return this.http.get<Hotel[]>(this.BASE_URL + "/hotel").pipe(
            catchError(this.handleError<Hotel[]>("getHotels")),
        );
    }

    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }

    public insertHotel(hotel: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/hotel/insert", hotel).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public insertRoom(room: Room): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }*/

    public getAnimals(): Observable<any[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animal").pipe(
            catchError(this.handleError<Animal[]>("getAnimal")),
        );
    }

    public getAnimalsByName(nom: string): Observable<Animal[]> {
        const reqBody: Object = {"nom": nom, "body": nom};

        return this.http.get<Animal[]>(this.BASE_URL + "/animal/name", reqBody).pipe(
            catchError(this.handleError<Animal[]>("getAnimalsByName")),
        );
    }

    public insertAnimal(animal: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/animal/insert", animal).pipe(
            catchError(this.handleError<number>("insertAnimal")),
        );
    }

    public removeAnimal(numClinique: string, numProprietaire: string, numAnimal: string): Observable<number> {
        const reqBody: any = {numClinique: numClinique,
                              numProprietaire: numProprietaire,
                              numAnimal: numAnimal
                            };

        return this.http.post<number>(this.BASE_URL + "/animal/remove", reqBody).pipe(
            catchError(this.handleError<number>("insertAnimal")),
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
