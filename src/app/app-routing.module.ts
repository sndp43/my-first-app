import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes:Routes = [
  //{ path:"not-found",component:NotFoundComponent},
  {
    path:"",
    redirectTo:"/recipes",
    pathMatch:"full" },
  {
    path:"auth",
    loadChildren:()=>import('./auth/auth.module').then(m=> m.AuthModule ) },
  {
    path:"recipes",
    loadChildren:()=>import('./recipes/recipes.module').then(m=> m.RecipesModule ) },
  {
    path:"shopping-list",
    loadChildren:()=>import('./shopping-list/shoppinglist.module').then(m=> m.ShoppingListModule ) }
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports:[RouterModule]
})

export class AppRoutingModule{}
