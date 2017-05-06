import {Injectable} from "@angular/core";

import {ShoppingListItem} from "../models";

@Injectable()
export class ShoppingListService {

  private _shoppingList: Array<ShoppingListItem> = [];

  public getShoppingList(): Array<ShoppingListItem> {
    return this._shoppingList.slice()
  }

  public addShoppingListItem({name, amount}): void {
    this._shoppingList.push(new ShoppingListItem(name, amount));
  }

  public addShoppingListItems(items: Array<ShoppingListItem>): void {
    this._shoppingList.push(...items);
  }

  public updateShoppingListItem(item: ShoppingListItem, index: number): void {
    this._shoppingList[index] = item;
  }

  public removeShoppingListItem(index: number): void {
    this._shoppingList.splice(index, 1)
  }

}
