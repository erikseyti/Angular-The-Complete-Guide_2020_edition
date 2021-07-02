import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators'


@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://appcurso2-e7a37-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response)
    });
  }

  fetchRecipes() {
    // take indica para o subscribe quantos registros voce quer que sejam informados e apos isso,
    // sera feito um unsubscribe direto

      return this.http.get<Recipe[]>('https://appcurso2-e7a37-default-rtdb.firebaseio.com/recipes.json'
      ).pipe(
        map(recipes => {
          // this map is a Javascript function that arrays have
          return recipes.map(recipe => {
            // expression to check if a recipe has ingredients,
            // if have returns the original value
            // if not, returns to the database a empty array
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
          });
        }), tap( recipes => {
          this.recipeService.setRecipes(recipes);
        }));


    // this first map refers to a function of rxjs operators map

  }
}
