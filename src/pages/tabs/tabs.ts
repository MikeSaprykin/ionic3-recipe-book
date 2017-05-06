import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";

export const PAGES = {
  SHOPPING_LIST: 'ShoppingList',
  RECIPES: 'Recipes'
};

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  public shoppingListPage: string = PAGES.SHOPPING_LIST;
  public recipesPage: string = PAGES.RECIPES;

}
