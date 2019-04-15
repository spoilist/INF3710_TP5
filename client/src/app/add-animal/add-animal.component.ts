import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-add-animal",
  templateUrl: "./add-animal.component.html",
  styleUrls: ["./add-animal.component.css"]
})
export class AddAnimalComponent implements OnInit {

  @ViewChild("cliniqueId") private cliniqueId: ElementRef;
  @ViewChild("proprietaireId") public proprietaireId: ElementRef;
  @ViewChild("state") public state: ElementRef;

  public animalNumber: string;
  public animalName: string;
  public animalType: string;
  public description: string;
  public dateOfBirth: string;
  public registrationDate: string;

  public cliniquesId: string[];
  public proprietairesId: string[];

  public constructor(
    private communicationService: CommunicationService, ) {
      this.cliniquesId = [];
      this.proprietairesId = [];
    }

  public ngOnInit(): void {
    this.getCliniquesId();
  }

  public addAnimal(): void {
    const animal: Animal = {
      numAnimal: this.animalNumber,
      numProprietaire: this.proprietaireId.nativeElement.value,
      numClinique: this.cliniqueId.nativeElement.value,
      nom: this.animalName,
      typeAnimal: this.animalType,
      description: this.description,
      dateNaissance: this.dateOfBirth,
      dateInscription: this.registrationDate,
      etatActuel: this.state.nativeElement.value,
    };
    this.communicationService.addAnimal(animal).subscribe((animals: Animal[]) => {
      console.log(animals);
    });
    alert("Animal ajouté!");
    location.reload();
  }

  private getCliniquesId(): void {
    this.communicationService.getCliniquesId().subscribe((cliniquesId: string[]) => {
      this.cliniquesId = cliniquesId;
    });
  }

  public getProprietairesId(): void {
    this.communicationService.getProprietairesId(this.cliniqueId.nativeElement.value).subscribe((proprietairesId: string[]) => {
      this.proprietairesId = proprietairesId;
    });
  }

}
