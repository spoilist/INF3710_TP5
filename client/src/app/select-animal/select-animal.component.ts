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

  public animalsId: number[];
  public cliniquesId: number[];
  public proprietairesId: number[];
  public constructor(private communicationService: CommunicationService) {
    this.animalsId = [];
    this.cliniquesId = [];
    this.proprietairesId = [];
  }

  public ngOnInit(): void {
    this.getCliniquesId();
  }

  private getCliniquesId(): void {
    this.communicationService.getCliniquesId().subscribe((cliniquesId: number[]) => {
      console.log(cliniquesId);
      this.cliniquesId = cliniquesId;
    });
  }

  public getProprietairesId(): void {
    console.log(this.cliniqueId.nativeElement.value);
    this.communicationService.getProprietairesId(this.cliniqueId.nativeElement.value).subscribe((proprietairesId: number[]) => {
      console.log(proprietairesId);
      this.proprietairesId = proprietairesId;
    });
  }
}
