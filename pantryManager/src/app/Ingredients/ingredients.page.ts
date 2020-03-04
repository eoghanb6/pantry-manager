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

  ingredientName: string = ""
  ingredientQuantity: string = ""

  private selectedItem: any;

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    public afstore: AngularFirestore,
    public user: UserService
  ) {

  }

   async addIngredient(){
     console.log("adding ingredient to list")
         const {ingredientName, ingredientQuantity } = this
         //add ingredient to firestore here for this user
        this.afstore.doc(`users/${this.user.getUID()}`).update({
          ingredients: firestore.FieldValue.arrayUnion({
            ingredientName,
            ingredientQuantity
          })
        })

  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
