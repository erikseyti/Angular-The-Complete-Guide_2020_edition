import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import {Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Pork Stake with Veggies',
    'Is good for you!',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [
      new Ingredient('Pork Meat', 1),
      new Ingredient('Carrot', 1),
      new Ingredient('Tomato', 1)
    ]),
    new Recipe('Fist of the North Star Tempura',
    'Good to end the weekend!',
    'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
    [
      new Ingredient('Flour', 1),
      new Ingredient('Carrot', 1),
      new Ingredient('Shrimp', 2)

    ])
  ];

  constructor(private slService: ShoppingListService)
  {}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }


}
