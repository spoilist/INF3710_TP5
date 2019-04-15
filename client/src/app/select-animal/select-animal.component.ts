import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "bootstrap/dist/js/bootstrap.bundle";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-select-animal",
  templateUrl: "./select-animal.component.html",
  styleUrls: ["./select-animal.component.css"]
})
export class SelectAnimalComponent implements OnInit {

  @ViewChild("cliniqueId") private cliniqueId: ElementRef;
  @ViewChild("proprietaireId") private proprietaireId: ElementRef;
  @ViewChild("animalId") public animalId: ElementRef;
  @ViewChild("button1") private button1: ElementRef;
  @ViewChild("button2") private button2: ElementRef;
  @ViewChild("button3") private button3: ElementRef;
  @ViewChild("button4") private button4: ElementRef;
  @ViewChild("modification") private modification: ElementRef;

  public animalsId: string[];
  public cliniquesId: string[];
  public proprietairesId: string[];
  public animalTreatments: string[];
  public animalReceipt: string[];
  public modify: boolean;
  public treatment: boolean;
  public receipt: boolean;
  public modifiedInput: string;

  public constructor(private communicationService: CommunicationService) {
    this.animalsId = [];
    this.cliniquesId = [];
    this.proprietairesId = [];
    this.animalTreatments = [];
    this.animalReceipt = [];
    this.modifiedInput = "";
    this.modify = false;
    this.treatment = false;
    this.receipt = false;
  }

  public ngOnInit(): void {
    this.getCliniquesId();
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

  public getAnimalsId(): void {
    this.communicationService.getAnimalsId(this.proprietaireId.nativeElement.value).subscribe((animalsId: string[]) => {
      this.animalsId = animalsId;
    });
  }

  public deleteAnimal(): void {
    const res: boolean = confirm("Etes-vous sur de vouloir supprimer cet animal?");
    if (res) {
      this.communicationService.removeAnimal(this.cliniqueId.nativeElement.value,
                                             this.proprietaireId.nativeElement.value,
                                             this.animalId.nativeElement.value).subscribe((animal: Animal[]) => {
          console.log("Deleted!");
        });
      alert("Animal supprimé!");
      location.reload();
    }
  }

  public getAnimalTreatments(): void {
    this.communicationService.getAnimalTreatments(this.cliniqueId.nativeElement.value,
                                                  this.proprietaireId.nativeElement.value,
                                                  this.animalId.nativeElement.value).subscribe((animalTreatments: string[]) => {
        this.animalTreatments = animalTreatments;
      });
  }

  public getAnimalReceipt(): void {
    this.communicationService.getAnimalReceipt(this.cliniqueId.nativeElement.value,
                                               this.proprietaireId.nativeElement.value,
                                               this.animalId.nativeElement.value).subscribe((animalReceipt: string[]) => {
        this.animalReceipt = animalReceipt;
      });
  }

  public modifyAnimalAttribute(): void {
    this.communicationService.modifyAnimalAttribute(this.cliniqueId.nativeElement.value,
                                                    this.proprietaireId.nativeElement.value,
                                                    this.animalId.nativeElement.value,
                                                    this.modification.nativeElement.value,
                                                    this.modifiedInput).subscribe((animal: Animal[]) => {
                                                      console.log("Modified!");
                                                    });
    alert("Attribut modifié!");
  }

  public setButtons(): void {
    this.button1.nativeElement.disabled = false;
    this.button2.nativeElement.disabled = false;
    this.button3.nativeElement.disabled = false;
    this.button4.nativeElement.disabled = false;
  }

  public setComponent(type: string): void {
    this.modify = false;
    this.treatment = false;
    this.receipt = false;
    switch (type) {
      default: {
        break;
      }
      case "modify": {
        this.modify = true;
        break;
      }
      case "treatment": {
        this.getAnimalTreatments();
        this.treatment = true;
        break;
      }
      case "receipt": {
        this.getAnimalTreatments();
        this.getAnimalReceipt();
        this.receipt = true;
      }
    }
  }
}
