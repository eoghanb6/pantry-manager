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
  informationMore


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

  async viewRecipe(recipeID){
    console.log("VIEWING RECIPE")
    this.spoonacular.getRecipeURL(recipeID).subscribe(result => {
      this.informationMore = result;
      console.dir(this.informationMore) //heres the bulk response
      var address = this.informationMore["0"].sourceUrl //heres the url

        window.open(address, '_blank', 'location=no');

  });

  }


  ngOnInit() {
  }
}
