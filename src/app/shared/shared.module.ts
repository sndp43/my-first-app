import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations:[
      AlertComponent,
      PlaceHolderDirective,
      DropdownDirective,
      LoadingSpinnerComponent,
      NotFoundComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
      AlertComponent,
      PlaceHolderDirective,
      DropdownDirective,
      LoadingSpinnerComponent,
      NotFoundComponent,
      CommonModule
  ]
})
export class SharedModule{}
