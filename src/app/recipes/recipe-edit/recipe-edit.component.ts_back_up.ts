import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
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

  categories = [{ 'id':1,"cat_name":"mango" },{ 'id':2,"cat_name":"apple" }];
  sub_categories = [{ 'id':1,"sub_cat_name":"kokan" },{ 'id':2,"sub_cat_name":"kashmir" }];
  sub_sub_categories = [{ 'id':1,"sub_cat_name":"meghlay" },{ 'id':2,"sub_cat_name":"kolkata" }];

  fetched_sub_cats = [];

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

    if(this.editMode){
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
              'category':new FormControl(null,Validators.required),
              'sub_category':new FormControl(null,Validators.required)
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
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'category':new FormControl(null,Validators.required),
        'sub_category':new FormControl(null,Validators.required)
      })
    )

  }

  //getter
  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getSubcat(category_id : number,row_index:number){

    if(category_id==1){

       of(this.sub_categories).subscribe((sub_cats)=>{
        this.fetched_sub_cats[row_index] = sub_cats;
      });

    }else if(category_id==2){

     of(this.sub_sub_categories).subscribe((sub_cats)=>{
      this.fetched_sub_cats[row_index] = sub_cats
     });

    }else{

      this.fetched_sub_cats[row_index] = [];

    }
    console.log(this.fetched_sub_cats);

  }

}
