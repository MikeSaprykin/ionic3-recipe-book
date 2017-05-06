import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {Store} from "@ngrx/store";
import {State} from "../../store/store";
import {AddRecipeAction} from "../../store/recipes/recipes.actions";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

  public recipes: Array<Recipe> = [];
  recipes$: any;

  constructor(public navCtrl: NavController,
              public recipesService: RecipesService,
              public store: Store<State>){}

  ionViewWillEnter() {
    /**
     * TODO: This is added temporary while redux implementation is in progress
     * @type {"../../Observable".Observable<R>}
     */
    this.recipes$ = this.store.select((state: State) => state.recipes.recipes);
    const recipe = new Recipe('kappa', 'keppo', 'koppa', []);
    setTimeout(() => {
      this.store.dispatch(new AddRecipeAction({recipe: recipe}))
    },500);
    /**
     * TODO: End of todo
     * @type {Array<Recipe>}
     */
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push('EditRecipe', { mode: 'New' })
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push('Recipe', {recipe: recipe, index: index})
  }

}
