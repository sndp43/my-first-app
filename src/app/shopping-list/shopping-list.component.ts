import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import{Ingredient} from "../shared/ingredient.model"
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients:Ingredient[]=[];
  constructor(private shoppingListSer:ShoppingListService) { }
  private shoppingListSubscription:Subscription;

  ngOnInit(): void {
    //initially load copy of ingredients as follows
    this.ingredients = this.shoppingListSer.getIngredients();

    //todetect any changes in ingredients subscribe
    this.shoppingListSubscription = this.shoppingListSer.ingredentsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    })

  }
  onEditIngredient(index:number){
    this.shoppingListSer.editingStarted.next(index);
  }

  ngOnDestroy(){
    this.shoppingListSubscription.unsubscribe();
  }

}
