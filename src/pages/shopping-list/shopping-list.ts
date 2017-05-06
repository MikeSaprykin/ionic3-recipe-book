import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services";
import {ShoppingListItem} from "../../models";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {
  public shoppingList: Array<ShoppingListItem>;
  public selectedName: string;
  public selectedAmount: number;
  public selectedItemIndex: number;
  public buttonText: string = 'Add';
  public buttonColor: string = 'primary';

  constructor(private shoppingListService: ShoppingListService) {}

  ionViewWillEnter(): void {
    this.loadItems();
  }

  public loadItems(): void {
    this.buttonText = 'Add';
    this.buttonColor = 'primary';
    this.selectedItemIndex = -1;
    this.selectedName = '';
    this.selectedAmount = 0;
    this.shoppingList = this.shoppingListService.getShoppingList()
  }

  public onAddShoppingItem(form: NgForm): void {
    this.selectedItemIndex !== -1 ?
      this.shoppingListService.updateShoppingListItem(form.value, this.selectedItemIndex) :
      this.shoppingListService.addShoppingListItem(form.value);
    form.reset();
    this.loadItems();
  }

  public removeItem(index: number): void {
    this.shoppingListService.removeShoppingListItem(index);
    this.loadItems();
  }

  public editItem(item: ShoppingListItem, index: number): void {
    this.setSelectedItem(item);
    this.setItemEdit(index);
  }

  public setSelectedItem({name, amount}): void {
    this.selectedName = name;
    this.selectedAmount = amount;
  }

  public setItemEdit(index: number): void {
    this.buttonColor = 'secondary';
    this.selectedItemIndex = index;
    this.buttonText = "Edit";
    this.shoppingList.forEach(item => item.edit = false);
    this.shoppingList[index].edit = true;
  }

}
