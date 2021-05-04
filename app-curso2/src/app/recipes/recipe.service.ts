import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is just a test',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('A test Recipe 2', 'This is just a test 2',
    'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg')
  ];

  getRecipes(){
    return this.recipes.slice();
  }


}
