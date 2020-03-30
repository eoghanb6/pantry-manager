import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable()
export class SpoonacularService {
  url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=';
  bulkUrl = 'https://api.spoonacular.com/recipes/informationBulk?ids=';
  apiKey = '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a';
  xrapidapihost='spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  xrapidapikey='1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a';
  myArr1 = [];

  constructor(private http: HttpClient){}


  searchRecipes2(ingredients){

    console.dir(ingredients)

    var ingredienstsString = ingredients.join("+");
    var ingredienstsStringNoSpaces = ingredienstsString.split(' ').join('%20');

    return this.http.get(`${this.url}${encodeURI(ingredienstsStringNoSpaces)}&number=5&apiKey=${this.apiKey}`)
  }

  searchRecipes(ingredients){

    console.dir(ingredients)

    var ingredienstsString = ingredients.join("+");
    var ingredienstsStringNoSpaces = ingredienstsString.split(' ').join('%20');

    return this.http.get(`${this.url}${encodeURI(ingredienstsStringNoSpaces)}`, {
      headers: {'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a'
        }
  })
  }

  getRecipeURL(recipeID){

    console.dir(recipeID)
    return this.http.get(`${this.bulkUrl}${encodeURI(recipeID)}`, {
      headers: {'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a'
        }
  })
  }

}
