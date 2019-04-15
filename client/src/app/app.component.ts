import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animal } from "../../../common/tables/Animal";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public readonly title: string = "INF3710 TP5";
    public animals: Animal[];
    public animalName: string;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            // tslint:disable-next-line:prefer-conditional-expression
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
        this.animals = [];
        this.animalName = "";
    }

    public ngOnInit(): void {
        // tslint:disable:no-any
        this.communicationService.listen().subscribe((m: any) => {
            this.getAnimalsByName();
        });
    }

    public getAnimals(): void {
        this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
            this.animals = animals;
        });
    }

    public getAnimalsByName(): void {
        this.communicationService.getAnimalsByName(this.animalName).subscribe((animals: Animal[]) => {
            this.animals = animals;
        });
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }
}
