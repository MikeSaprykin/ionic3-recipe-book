import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";

type EditPageType = 'New' | 'Edit'

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipe implements OnInit {

  public difficultyOptions: Array<string> = ['Easy', 'Medium', 'Hard'];

  private mode: EditPageType = 'New';

  public editRecipe: Recipe;
  public editRecipeIndex: number;

  public recipeForm: FormGroup;

  constructor(public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public recipesService: RecipesService,
              public navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode === 'Edit') this.extractEditRecipeData();
    this.initializeForm();
  }

  extractEditRecipeData() {
    this.editRecipe = this.navParams.get('recipe');
    this.editRecipeIndex = this.navParams.get('index')
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode === 'Edit') {
      title = this.editRecipe.title;
      description = this.editRecipe.description;
      difficulty = this.editRecipe.difficulty;
      for (const ingredient of this.editRecipe.ingredients) {
        const ingredientGroup = new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, Validators.required)
        });
        ingredients.push(ingredientGroup)
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }

  onSubmit() {
    if(!this.recipeForm.valid) return;
    this.mode === 'Edit' ?
      this.recipesService.updateRecipe(this.editRecipeIndex, this.recipeForm.value) :
      this.recipesService.addRecipe(this.recipeForm.value);
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            this.createNewIngredient();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray> this.recipeForm.get('ingredients');
            const len = formArray.length;
            if( len > 0 ) {
              for( let i = len -1; i >= 0; i--) {
                formArray.removeAt(i);
              }
              this.showDeleteSuccessToast()
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present()
  }

  private createNewIngredient() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text'
        },
        {
          name: 'amount',
          placeholder: 'Amount',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: ({name, amount}) => {
            if(!name.trim() || !amount.trim()) {
              this.showIngredientInvalidToast();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormGroup({
                'name': new FormControl(name, Validators.required),
                'amount': new FormControl(amount, Validators.required)
              }));
            this.showIngredientSuccessToast();
          }
        }
      ]
    });
    newIngredientAlert.present();
  }

  showIngredientInvalidToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Please enter a valid name and amount ',
      duration: 2000
    });
    toast.present()
  }

  showIngredientSuccessToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Ingredient was successfully added',
      duration: 1000
    });
    toast.present()
  }

  showDeleteSuccessToast(): void {
    const toast = this.toastCtrl.create({
      message: 'Ingredients were successfully removed',
      duration: 1000
    });
    toast.present()
  }
}
