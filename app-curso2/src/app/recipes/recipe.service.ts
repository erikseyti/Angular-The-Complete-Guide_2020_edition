import { AddIngredients } from './../shopping-list/store/shopping-list.actions';
import { Subject } from 'rxjs';
import {Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe('Pork Stake with Veggies',
  //   'Is good for you!',
  //   'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //   [
  //     new Ingredient('Pork Meat', 1),
  //     new Ingredient('Carrot', 1),
  //     new Ingredient('Tomato', 1)
  //   ]),
  //   new Recipe('Fist of the North Star Tempura',
  //   'Good to end the weekend!',
  //   'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //   [
  //     new Ingredient('Flour', 1),
  //     new Ingredient('Carrot', 1),
  //     new Ingredient('Shrimp', 2)

  //   ])
  // ];

  constructor(
    private store: Store<fromApp.AppState>)
  {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
