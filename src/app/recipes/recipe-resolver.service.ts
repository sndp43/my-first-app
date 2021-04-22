import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/dataStorage.service";
import { RecipeServiceService } from "./recipe-service.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private storageServe:DataStorageService,private recipeServ:RecipeServiceService){}

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipies = this.recipeServ.getRecipes();
    if(recipies.length==0){
      return this.storageServe.fetchRecipes();
      //here we are not subscribing it as resolve will automatically subscribe it for us
    }else{
      return recipies;
    }
  }
}
