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

  ingredientName: string
  ingredientQuantity: string
  userIngredients

  constructor(
      public afstore: AngularFirestore,
      public user: UserService) {
        const ingreds = afstore.doc(`users/${user.getUID()}`)
        this.userIngredients = ingreds.valueChanges()
       }

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

      async removeIngredient(ingred){
        console.log("deleting Ingredient from shopping list")
        const ingredientName =  ingred.ingredientName
        const ingredientQuantity =  ingred.ingredientQuantity

        //remove to firestore here for this user
       this.afstore.doc(`users/${this.user.getUID()}`).update({
         shoppingList: firestore.FieldValue.arrayRemove({
           ingredientName,
           ingredientQuantity
         })
       })
      }

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
