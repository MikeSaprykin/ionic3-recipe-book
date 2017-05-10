import { Action } from '@ngrx/store';
import { Recipe } from './recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const SELECT_RECIPE = 'SELECT_RECIPE';

export interface RecipeActionPayload {
  recipe?: Recipe
  index?: number
}

export class AddRecipeAction implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: RecipeActionPayload){}
}

export class DeleteRecipeAction implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: RecipeActionPayload){}
}

export class UpdateRecipeAction implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: RecipeActionPayload){}
}

export class SelectRecipeAction implements Action {
  readonly type = SELECT_RECIPE;
  constructor(public payload: RecipeActionPayload){}
}

export type Action = AddRecipeAction |
                     DeleteRecipeAction |
                     UpdateRecipeAction |
                     SelectRecipeAction;
