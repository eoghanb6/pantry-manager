import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'
//import { apiKey } from '../spoonacular'
import { SpoonacularService } from '../spoonacular.service'
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';



@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss']
})
export class RecipesPage implements OnInit {
  //define variables
  ingredientName: string
  ingredientQuantity: string
  userIngredients
  ingredArr = [] //here is where a users ingredients are stored
  information
  informationMore


  constructor(@Inject(DOCUMENT) private document: Document,
    public afstore: AngularFirestore,
    public user: UserService,
    public spoonacular: SpoonacularService,
    public modalController: ModalController
  ) {
    //get list of ingredients for user from firebase
    const ingreds = afstore.doc(`users/${user.getUID()}`)
    //update users ingredients locally if remote changes
    this.userIngredients = ingreds.valueChanges()
    //for each remote ingredient, add to a local array and keep updated
    this.userIngredients.subscribe( data => {
        for (let ingredient of data.ingredients) {
          this.ingredArr.push(ingredient.ingredientName);

        }
        //search recipes based on local version of users ingredient list
        this.spoonacular.searchRecipes(this.ingredArr).subscribe(result => {
          this.information = result;//heres the response
      });
      }

    )
  }
//method to call the modal window and pass through navparams as recipeInfo
  async presentModal(recipe) {
  const modal = await this.modalController.create({
    component: ModalPage,
    componentProps: {
  'recipeInfo': recipe //this will be picked up in modal.page.ts
}
  });
  return await modal.present();
}
//method to view a recipe on click
  async viewRecipe(recipeID){
    console.log("VIEWING RECIPE")
    //pass through recipe ID into spoonacular service and retrieve URL
    this.spoonacular.getRecipeURL(recipeID).subscribe(result => {
      this.informationMore = result;
      var address = this.informationMore["0"].sourceUrl //heres the url
      window.open(address,'_blank' ); //this is new tab
  });
  }




  ngOnInit() {
  }
}
