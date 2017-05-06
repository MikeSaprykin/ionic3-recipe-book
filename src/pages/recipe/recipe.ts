import {Component, OnInit} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {ShoppingListService} from "../../services";
import {RecipesService} from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class Recipe implements OnInit {

  recipe;
  recipeIndex: number;
  ingredientsAdded: boolean;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public shoppingListService: ShoppingListService,
              public recipesService: RecipesService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.recipeIndex = this.navParams.get('index');
  }

  onEditRecipe(): void {
    this.navCtrl.push('EditRecipe', {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.recipeIndex
    })
  }

  onDeleteRecipe(): void {
    this.showDeleteConfirmationAlert()
  }

  showDeleteConfirmationAlert(): void {
    const deleteConfirmation = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to delete this recipe? This action can\'t be undone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'danger-button',
          handler: () => {
            this.deleteRecipe()
          }
        }
      ]
    });
    deleteConfirmation.present()
  }

  deleteRecipe(): void {
    this.recipesService.removeRecipe(this.recipeIndex);
    this.navCtrl.popToRoot()
  }

  onAddIngredientsToShoppingList(): void {
    !this.ingredientsAdded ? this.addToShoppingList() : this.showConfirmationAddAlert()
  }

  addToShoppingList(): void {
    this.shoppingListService.addShoppingListItems(this.recipe.ingredients);
    this.showSuccesAddedIngredientsToast();
    this.ingredientsAdded = true;
  }

  showSuccesAddedIngredientsToast(): void {
    const successToast = this.toastCtrl.create({
      message: 'Ingredients were successfully added to the shopping list',
      duration: 2000
    });
    successToast.present()
  }

  showConfirmationAddAlert(): void {
    const confirmationAddAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to add ingredients? They were already added.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: () => this.addToShoppingList()
        }
      ]
    });
    confirmationAddAlert.present();
  }

}
