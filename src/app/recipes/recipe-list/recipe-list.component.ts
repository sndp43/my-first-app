import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipesSub:Subscription;
  recipes:Recipe[]=[];

  constructor(private recipesService:RecipeServiceService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipesSub = this.recipesService.recipeChanged.subscribe((recipes)=>{
      this.recipes = recipes;
    })

  }

  onrecipeSelected(recipe:Recipe)
  {

  }
  onNewRecipe(){

    this.router.navigate(['new'],{relativeTo:this.route});

  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe();
  }

}
