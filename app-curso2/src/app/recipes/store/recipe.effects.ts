import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  
  fetchRecipes = createEffect(() => this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
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

  ));

  
  storeRecipes = createEffect(() => this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
  withLatestFrom(this.store.select('recipes')),
  switchMap(([actionData, recipesState]) => {
    return this.http.put(
      'https://appcurso2-e7a37-default-rtdb.firebaseio.com/recipes.json',
      recipesState.recipes);
  })), {dispatch: false});

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}
}
