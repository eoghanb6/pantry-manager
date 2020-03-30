import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-list',
  templateUrl: 'ingredients.page.html',
  styleUrls: ['ingredients.page.scss']
})
export class IngredientsPage implements OnInit {

  ingredientName: string
  ingredientQuantity: string
  userIngredients
  ingredientDate: string

  constructor(
    public afstore: AngularFirestore,
    public user: UserService
  ) {
    const ingreds = afstore.doc(`users/${user.getUID()}`)
    this.userIngredients = ingreds.valueChanges()
  }

   async addIngredient(){
     console.log("adding ingredient to list")
         const ingredientName = this.ingredientName
         const ingredientQuantity = this.ingredientQuantity
         const ingredientDate = this.ingredientDate

         //add ingredient to firestore here for this user
        this.afstore.doc(`users/${this.user.getUID()}`).update({
          ingredients: firestore.FieldValue.arrayUnion({
            ingredientName,
            ingredientQuantity,
            ingredientDate
          })
        })
  }

  async removeIngredient(ingred){
    console.log("deleting Ingredient")
    const ingredientName =  ingred.ingredientName
    const ingredientQuantity =  ingred.ingredientQuantity
    const ingredientDate = ingred.ingredientDate

    //remove to firestore here for this user
   this.afstore.doc(`users/${this.user.getUID()}`).update({
     ingredients: firestore.FieldValue.arrayRemove({
       ingredientName,
       ingredientQuantity,
       ingredientDate
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
