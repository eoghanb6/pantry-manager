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

  recipeInfo
  userIngredients
  shoppingListArr = []

  constructor(public modalController: ModalController,
  navParams: NavParams, public afstore: AngularFirestore,
        public user: UserService) {
console.log(navParams.get('recipeInfo'));
this.recipeInfo = navParams.get('recipeInfo');
const ingreds = afstore.doc(`users/${user.getUID()}`)
this.userIngredients = ingreds.valueChanges()
this.userIngredients.subscribe( data => {
    for (let ingredient of data.shoppingList) {
      this.shoppingListArr.push(ingredient.ingredientName);
    }
  }
)
  }

  ngOnInit() {
  }


closeModal() { this.modalController.dismiss(); }


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

inShoppingList(name){
  console.log("checking user ingredients")
  console.log(this.shoppingListArr)
  return (this.shoppingListArr.indexOf(name) > -1);

}
}
