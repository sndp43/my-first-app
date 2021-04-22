import { NgModule } from "@angular/core";
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from '../recipes/recipe-details/recipe-details.component';
import { RecipeItemComponent } from '../recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from '../recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipesStartComponent,
    RecipeEditComponent
  ],
  imports:[
      RouterModule,
      ReactiveFormsModule,
      RecipesRoutingModule,
      SharedModule
  ]
  //  FOLLOWING EXPORTS ARE NOT REQUIRED AS WE ARE NOT USING IT EXPORTED COMPONENTS
  //WHERE WE ARE GONA IMPORT THIS MODULE

  // exports:[
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailsComponent,
  //   RecipeItemComponent
  // ]

})

export class RecipesModule{}
