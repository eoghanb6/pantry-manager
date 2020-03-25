import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable()
export class SpoonacularService {
  url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
  apiKey = '9676bdbba6b34bf98d28051e44ef16f4';
  myArr1 = [];

  constructor(private http: HttpClient){}


  searchRecipes(ingredients){

    console.dir(ingredients)

    var ingredienstsString = ingredients.join("+");
    var ingredienstsStringNoSpaces = ingredienstsString.split(' ').join('%20');

    return this.http.get(`${this.url}${encodeURI(ingredienstsStringNoSpaces)}&number=5&apiKey=${this.apiKey}`)
  }



}
