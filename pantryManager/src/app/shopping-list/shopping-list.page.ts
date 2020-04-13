import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
//define variables
  ingredientName: string
  ingredientQuantity: string
  userIngredients

  constructor(
      public afstore: AngularFirestore,
      public user: UserService) {
        //store users remote ingredients locally based on their UID
        const ingreds = afstore.doc(`users/${user.getUID()}`)
        //update the users local ingredients in realtime
        this.userIngredients = ingreds.valueChanges()
       }

       //method to add ingredient to users remote firebase list
       async addIngredient(){
         console.log("adding ingredient to  shopping list")
             const ingredientName = this.ingredientName
             const ingredientQuantity = this.ingredientQuantity

             //add ingredient to firestore here for this user
            this.afstore.doc(`users/${this.user.getUID()}`).update({
              shoppingList: firestore.FieldValue.arrayUnion({
                ingredientName,
                ingredientQuantity
              })
            })
            this.ingredientName ='';
            this.ingredientQuantity='';
      }
      //method to delete ingredient from users firebase list
      async removeIngredient(ingred){
        console.log("deleting Ingredient from shopping list")
        const ingredientName =  ingred.ingredientName
        const ingredientQuantity =  ingred.ingredientQuantity

        //remove from firestore here for this user
       this.afstore.doc(`users/${this.user.getUID()}`).update({
         shoppingList: firestore.FieldValue.arrayRemove({
           ingredientName,
           ingredientQuantity
         })
       })
      }
//method to show/hide javascript form
      showForm() {
        var x = document.getElementById("addingredform");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

  ngOnInit() {
  }

}
