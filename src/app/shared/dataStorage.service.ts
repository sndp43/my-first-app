import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeServiceService } from "../recipes/recipe-service.service";
import { Recipe } from "../recipes/recipe.model";
import {exhaustMap, map,take,tap} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({
  providedIn:'root'
})

export class DataStorageService{

constructor(private http:HttpClient,private recipeser:RecipeServiceService,private authServ:AuthService){}

  storeRecipes()
  {
      const recipes = this.recipeser.getRecipes();
      console.log(recipes);

      //for firebase if we call put then it will replace all the recipes table with one we have sent
      this.http.put<Recipe[]>("https://ng-recipe-book-1e32d.firebaseio.com/recipes.json",recipes)
      .subscribe(response=>{
        console.log(response);
      })

  }

  fetchRecipes()
  {
      //for firebase if we call put then it will replace all the recipes table with one we have sent

      //Adding token to "get" method , hence only fetch recipe if user is logged in and a valid token is available

     // 1) get user from auth service and subscribe it and take recent emited value and not care about ongoing and unsubscribe it

     // 2) merge above observable with http.get observable using exhaustMap() operator


    // return this.authServ.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     // here we get access to recent value of emited user and unsubscribed user too
    //     // now return new observable
    //     return this.http.get<Recipe[]>(
    //       "https://ng-recipe-book-1e32d.firebaseio.com/recipes.json",
    //       {
    //         params:new HttpParams().set("auth",user.token)
    //       })

    // }),tap(recipes=>{
    //   this.recipeser.setRecipes(recipes);
    // }))



    return this.http.get<Recipe[]>("https://ng-recipe-book-1e32d.firebaseio.com/recipes.json")
    .pipe(
            map(recipes=>{
                //this is javascript map below
                return recipes.map(recipe=>{
                    return recipe = {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[] }
                })

            }),
            tap(recipes=>{
                this.recipeser.setRecipes(recipes);
            })
    )




  }



}
