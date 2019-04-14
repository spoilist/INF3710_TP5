import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-add-animal",
  templateUrl: "./add-animal.component.html",
  styleUrls: ["./add-animal.component.css"]
})
export class AddAnimalComponent implements OnInit {

  public animalNumber: string;
  public ownerNumber: string;
  public clinicNumber: string;
  public animalName: string;
  public animalType: string;
  public description: string;
  public dateOfBirth: string;
  public registrationDate: string;
  public currentState: string;

  public constructor(
    private communicationService: CommunicationService, ) {}

  public addAnimal(): void {
    const animal: Animal = {
      numAnimal: this.animalNumber,
      numProprietaire: this.ownerNumber,
      numClinique: this.clinicNumber,
      nom: this.animalName,
      typeAnimal: this.animalType,
      description: this.description,
      dateNaissance: this.dateOfBirth,
      dateInscription: this.registrationDate,
      etatActuel: this.currentState,
    };
    this.communicationService.addAnimal(animal).subscribe((animals: Animal[]) => {
      console.log(animals);
    });
    console.log("ADD GO");
  }

  public ngOnInit(): void {
    console.log("onInit");
  }

}
