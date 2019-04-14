import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "bootstrap/dist/js/bootstrap.bundle";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-select-animal",
  templateUrl: "./select-animal.component.html",
  styleUrls: ["./select-animal.component.css"]
})
export class SelectAnimalComponent implements OnInit {

  @ViewChild("cliniqueId") private cliniqueId: ElementRef;
  @ViewChild("proprietaireId") private proprietaireId: ElementRef;
  @ViewChild("animalId") private animalId: ElementRef;
  @ViewChild("button1") private button1: ElementRef;
  @ViewChild("button2") private button2: ElementRef;
  @ViewChild("button3") private button3: ElementRef;
  @ViewChild("button4") private button4: ElementRef;

  public animalsId: string[];
  public cliniquesId: string[];
  public proprietairesId: string[];
  public modify: boolean;
  public treatment: boolean;
  public receipt: boolean;

  public constructor(private communicationService: CommunicationService) {
    this.animalsId = [];
    this.cliniquesId = [];
    this.proprietairesId = [];
    this.modify = false;
    this.treatment = false;
    this.receipt = false;
  }

  public ngOnInit(): void {
    this.getCliniquesId();
  }

  private getCliniquesId(): void {
    this.communicationService.getCliniquesId().subscribe((cliniquesId: string[]) => {
      console.log(cliniquesId);
      this.cliniquesId = cliniquesId;
    });
  }

  public getProprietairesId(): void {
    console.log(this.cliniqueId.nativeElement.value);
    this.communicationService.getProprietairesId(this.cliniqueId.nativeElement.value).subscribe((proprietairesId: string[]) => {
      console.log(proprietairesId);
      this.proprietairesId = proprietairesId;
    });
  }

  public getAnimalsId(): void {
    console.log(this.proprietaireId.nativeElement.value);
    this.communicationService.getAnimalsId(this.proprietaireId.nativeElement.value).subscribe((animalsId: string[]) => {
      this.animalsId = animalsId;
      console.log(this.animalsId);
    });
  }
  
  public deleteAnimal(): void {
    this.communicationService.removeAnimal(this.cliniqueId.nativeElement.value,
                                           this.proprietaireId.nativeElement.value,
                                           this.animalsId.nativeElement.value).subscribe((animalsId: string[]) => {
      this.animalsId = animalsId;
      console.log(this.animalsId);
    });
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
        this.treatment = true;
        break;
      }
      case "receipt": {
        this.receipt = true;
      }
    }
  }
}
