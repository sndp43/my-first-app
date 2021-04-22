import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServiceService } from '../recipe-service.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm:FormGroup;
  id:number;
  editMode = false;
  constructor(
    private route:ActivatedRoute,
    private recipeser:RecipeServiceService,
    private router:Router) { }

  ngOnInit(): void {
      this.route.params.subscribe((params:Params)=>{
          this.id = +params['id'];
          this.editMode = params['id'] != null;

          this.initForm();
      })
  }
  initForm(){
    let recipeName ="";
    let imagePath ="";
    let desc ="";
    let ingredients = new FormArray([]);

    if(this.editMode)
    {

        let recipe = this.recipeser.getRecipe(this.id);
        recipeName = recipe.name;
        imagePath = recipe.imagePath;
        desc = recipe.desc;

        if(recipe['ingredients']){

          for(let ingredient of recipe.ingredients){
            ingredients.push(
              new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
              })
            )
          }

        }

    }


    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(imagePath,Validators.required),
      'desc':new FormControl(desc,Validators.required),
      'ingredients':ingredients
    });

  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['ingredients']);

    if(this.editMode){
      this.recipeser.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeser.addRecipe(this.recipeForm.value);

    }
    this.onCancel();
  }

  AddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  //getter
  get ingredientsControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
