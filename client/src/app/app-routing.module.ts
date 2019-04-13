import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { InsertAnimalComponent } from "./insert-animal/insert-animal.component";
import { SelectAnimalComponent } from "./select-animal/select-animal.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "select-animal", component: SelectAnimalComponent },
  { path: "insert-animal", component: InsertAnimalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
