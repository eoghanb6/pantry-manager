import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'
//import { apiKey } from '../spoonacular'
import { SpoonacularService } from '../spoonacular.service'


@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss']
})
export class RecipesPage implements OnInit {

  ingredientName: string
  ingredientQuantity: string
  userIngredients
  ingredArr = [] //here is where a users ingredients are stored
  information

  constructor(
    public afstore: AngularFirestore,
    public user: UserService,
    public spoonacular: SpoonacularService
  ) {
    const ingreds = afstore.doc(`users/${user.getUID()}`)
    this.userIngredients = ingreds.valueChanges()
    console.log(this.userIngredients)
    this.userIngredients.subscribe( data => {
        for (let ingredient of data.ingredients) {
          this.ingredArr.push(ingredient.ingredientName);

        }
        this.spoonacular.searchRecipes(this.ingredArr).subscribe(result => {
          this.information = result;
          console.dir(this.information) //heres the response
      });
      }

    )


  }

  ngOnInit() {
  }
}
