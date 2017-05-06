import { combineReducers } from '@ngrx/store';
import * as recipes from "./recipes";

export interface State {
  recipes: recipes.RecipesState
  shoppingList: any
}

const reducers = {
  recipes: recipes.recipesReducer,
  shoppingList: {}
};

const combinedReducer = combineReducers(reducers);

export function rootReducer(state: any, action: any) {
  return combinedReducer(state, action)
}
