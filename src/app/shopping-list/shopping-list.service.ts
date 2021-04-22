import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredentsChanged = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();

  private ingredients:Ingredient[]=[
    new Ingredient("Apple",5),
    new Ingredient("Tomatos",10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){

    this.ingredients.push(ingredient);
    //in above 'getIngredients' method we are returning copy of ingredients hence need to emit as follows
    //hence subscribe to places where ever ingredients changes needs to be reflected
    //this.ingredentsChanged.emit(this.ingredients.slice());

    //using Subjects emit = next
    this.ingredentsChanged.next(this.ingredients.slice());

  }

  addIngredients(ingredients:Ingredient[]){

    //  ingredients.forEach(ingredient => {
    //       this.ingredients.push(ingredient);
    //  });

    // for(let ingredient of ingredients){
    //   this.ingredients.push(ingredient);
    // }

    this.ingredients.push(...ingredients);
    //now brodcast that ingredients have been changed
    this.ingredentsChanged.next(this.ingredients.slice());
  }

  getIngredient(itemIndex:number){
    return this.ingredients[itemIndex];
  }

  UpdateIngredient(index:number,ingredient:Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredentsChanged.next(this.ingredients.slice());
  }
  deleteItem(index:number){

    this.ingredients.splice(index,1);
    this.ingredentsChanged.next(this.ingredients);

  }

}
