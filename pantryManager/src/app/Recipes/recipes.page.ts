import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss']
})
export class RecipesPage implements OnInit {

  ingredientName: string
  ingredientQuantity: string
  userIngredients
  ingredArr = []
  ingredArr2 = []

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
ingredArr = [];
  constructor(
    public afstore: AngularFirestore,
    public user: UserService
  ) {
    const ingreds = afstore.doc(`users/${user.getUID()}`)
    this.userIngredients = ingreds.valueChanges()

    //this.userIngredients.subscribe(data => console.log(data) )
    this.userIngredients.subscribe(data => {
        for (let ingredient of data.ingredients) {
          this.ingredArr.push(ingredient.ingredientName);
        }
      } )
      console.log(this.ingredArr)





    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
}
