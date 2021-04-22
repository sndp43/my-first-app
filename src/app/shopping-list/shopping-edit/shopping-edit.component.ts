import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{static:false}) SEform:NgForm;
  editMode=false;
  editIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingListSer:ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListSer.editingStarted.subscribe((index:number)=>{
        this.editMode = true;
        this.editIndex = index;
        this.editedItem = this.shoppingListSer.getIngredient(index);

        this.SEform.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount,
        });

    })
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListSer.UpdateIngredient(this.editIndex,newIngredient);
    }else{
      this.shoppingListSer.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }

  clearform(){
    this.SEform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.clearform();
    this.shoppingListSer.deleteItem(this.editIndex);
  }

}
