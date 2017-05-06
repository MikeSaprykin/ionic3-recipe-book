import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingList } from './shopping-list';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ShoppingList,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingList),
    ReactiveFormsModule
  ],
  exports: [
    ShoppingList
  ]
})
export class ShoppingListModule {}
