import { Ingredient } from './../../shared/ingredient.model';
import { Action } from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";



export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}


const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      // Used the Spreed Operator (...) on action.payload to get each element of the array not
      // the array it self. Because only action.payload will add a array to the array of ingredients.
      return {
        ...state,
        ingredients : [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index]
      const updateIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updateIngredients = [...state.ingredients];
      updateIngredients[action.payload.index] = updateIngredient;

      return {
        ...state,
        ingredients: updateIngredients
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        })
      };

    default:
      return state;
  }
}
