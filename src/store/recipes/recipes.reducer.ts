import * as recipe from './recipes.actions';
import { Recipe } from './recipe.model';

export interface RecipesState {
  recipes: Array<Recipe>,
  selectedRecipe: Recipe | null
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null
};

const onAddRecipe = (state: RecipesState, action: recipe.Action): RecipesState => {
  const newRecipes = [...state.recipes, action.payload.recipe];
  return {...state, recipes: newRecipes};
};

const onDeleteRecipe = (state: RecipesState, action: recipe.Action): RecipesState => {
  const newRecipes = state.recipes.filter((recipe, index) => index !== action.payload.index);
  return {...state, recipes: newRecipes};
};

const onUpdateRecipe = (state: RecipesState, action: recipe.Action): RecipesState => {
  const updatedRecipes = state.recipes.map((recipe, index) => {
    return index === action.payload.index ? action.payload.recipe : recipe
  });
  return {...state, recipes: updatedRecipes}
};

const onSelectRecipe = (state: RecipesState, action: recipe.Action): RecipesState => {
  return {...state, selectedRecipe: action.payload.recipe}
};

export function recipesReducer(state = initialState, action: recipe.Action): RecipesState {

  const lookUp = {
    [recipe.ADD_RECIPE]: onAddRecipe,
    [recipe.DELETE_RECIPE]: onDeleteRecipe,
    [recipe.UPDATE_RECIPE]: onUpdateRecipe,
    [recipe.SELECT_RECIPE]: onSelectRecipe
  };

  return lookUp[action.type] ? lookUp[action.type](state, action) : initialState
}
