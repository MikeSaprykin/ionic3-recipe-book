import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe";

@Injectable()
export class RecipesService {

  private _recipesList: Array<Recipe> = [];

  constructor(){}

  public getRecipes(): Array<Recipe> {
    return this._recipesList.slice();
  }

  public addRecipe({title, description, difficulty, ingredients}): void {
    const recipe: Recipe = new Recipe(title, description, difficulty, ingredients);
    this._recipesList.push(recipe);
    console.log(this._recipesList);
  }

  public updateRecipe(index: number, {title, description, difficulty, ingredients}): void {
    this._recipesList[index] = new Recipe(title, description, difficulty, ingredients)
  }

  public removeRecipe(index: number): void {
    this._recipesList.splice(index, 1)
  }

}
