import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddAnimalComponent } from "./add-animal/add-animal.component";
import { AppComponent } from "./app.component";
import { SelectAnimalComponent } from "./select-animal/select-animal.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "select-animal", component: SelectAnimalComponent },
  { path: "add-animal", component: AddAnimalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
