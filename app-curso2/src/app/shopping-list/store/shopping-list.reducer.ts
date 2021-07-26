import { Ingredient } from './../../shared/ingredient.model';
import { Action } from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
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
    default:
      return state;
  }
}
