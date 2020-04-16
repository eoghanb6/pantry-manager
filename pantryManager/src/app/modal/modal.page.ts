import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
//define variables to be used
  recipeInfo
  userIngredients
  shoppingListArr = []

  constructor(public modalController: ModalController,
  navParams: NavParams, public afstore: AngularFirestore,
        public user: UserService) {
//get the navaparams passed in stored as recipeInfo from recipes page
this.recipeInfo = navParams.get('recipeInfo');
// store ingredients from users account on firebase
const ingreds = afstore.doc(`users/${user.getUID()}`)
//update users ingredients based on remote changes
this.userIngredients = ingreds.valueChanges()
//for each item in users remote shopping list, create a local array of these items
this.userIngredients.subscribe( data => {
    for (let ingredient of data.shoppingList) {
      this.shoppingListArr.push(ingredient.ingredientName);
    }
  }
)
  }

  ngOnInit() {
  }

//method called to close modal pop up window
closeModal() { this.modalController.dismiss(); }

//method to add igredient on button press to users remote shopping list
addToList(name, amount, unit){
  console.log("adding ingredient to  shopping list")
      const ingredientName = name;
      const ingredientQuantity = amount + " " + unit;

      //add ingredient to firestore here for this user
     this.afstore.doc(`users/${this.user.getUID()}`).update({
       shoppingList: firestore.FieldValue.arrayUnion({
         ingredientName,
         ingredientQuantity
       })
     })
}
//check if ingredient is present in the users shopping list by using array index
inShoppingList(name){
  console.log("checking user ingredients")
  return (this.shoppingListArr.indexOf(name) > -1);

}
}
