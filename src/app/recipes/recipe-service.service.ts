import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeServiceService {

  recipeChanged=new Subject<Recipe[]>();

  constructor(private shoppingListSer:ShoppingListService) { }

  // recipes:Recipe[]=[
  //   new Recipe("Spaghetti",
  //   "Easy Weeknight Spaghetti with Meat Sauce",
  //   "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
  //   [
  //     new Ingredient("Eggs",2),
  //     new Ingredient("Noodles",1)
  //   ]
  //   ),
  //   new Recipe("Noodles",
  //   "Zestful Kitchen Saucy Gochujang Noodles",
  //   "https://zestfulkitchen.com/wp-content/uploads/2019/11/gochujang-noodles_for-web_cover.jpg",
  //   [
  //     new Ingredient("Meat",3),
  //     new Ingredient("Noodles",1)
  //   ]),
  //   new Recipe("Alfredo",
  //   "Delish.comFettuccine Alfredo",
  //   "https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg",
  //   [
  //     new Ingredient("bread",1),
  //     new Ingredient("milk",1)
  //   ])
  // ];

  recipes:Recipe[]=[];

  setRecipes(recipes){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice(); //slice will give the copy of og Recipes array
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListSer.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(recipe:Recipe){
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }


}
