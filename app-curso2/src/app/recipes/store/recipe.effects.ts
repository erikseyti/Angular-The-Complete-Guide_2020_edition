import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
  switchMap(() => {
    return this.http.get<Recipe[]>('https://appcurso2-e7a37-default-rtdb.firebaseio.com/recipes.json'
      );
  }),
  map(recipes => {
    // this map is a Javascript function that arrays have
    return recipes.map(recipe => {
      // expression to check if a recipe has ingredients,
      // if have returns the original value
      // if not, returns to the database a empty array
      return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
    });
  }), map(recipes => {
    return new RecipesActions.SetRecipes(recipes);
  }),

  );

  constructor(private actions$: Actions, private http: HttpClient){}
}
