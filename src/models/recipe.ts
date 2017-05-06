import {ShoppingListItem} from "./shopping-list-item";

export class Recipe {
  constructor(public title: string,
              public description: string,
              public difficulty: string,
              public ingredients: Array<ShoppingListItem> = []){}
}
