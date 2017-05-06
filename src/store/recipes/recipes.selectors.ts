import {createSelector} from 'reselect';
import {RecipesState} from "./recipes.reducer";
import {State} from "../store";

export const getAllRecipes = (state: State) => {
  console.log(state);
  return state.recipes.recipes;
};

export const getSelectedRecipe = (state: RecipesState) => state.recipes;

export const recipesSelector = createSelector(getAllRecipes, (recipes) => {
  console.log(recipes);
  return recipes;
});
