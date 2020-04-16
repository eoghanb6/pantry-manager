import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//make spoonacular service injectable to be used in other classes/pages
@Injectable()
export class SpoonacularService {
  //url to be used to recipes gathering
  url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=';
  //url to be used to bulk recipe information gathering, such as URL
  bulkUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=';
  //api key for spoonacular
  apiKey = '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a';
  //host name for when using rapidAPI to access spoonacular
  xrapidapihost='spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  //key value for when using rapidAPI to access spoonacular
  xrapidapikey='1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a';
  myArr1 = [];

  constructor(private http: HttpClient){}

  // method to gather list of recipes from spoonacular API
  searchRecipes(ingredients){

    // create string from array of ingredients, join by ","
    var ingredienstsString = ingredients.join(",");
    //remove spaces from ingredient names
    var ingredienstsStringNoSpaces = ingredienstsString.split(' ').join(' ');

    //encoded URI with special characters and create http get response to API
    return this.http.get(`${this.url}${encodeURI(ingredienstsStringNoSpaces)}&ranking=1&number=10&ignorePantry=true`, {
      headers: {'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a'
        }
  })
  }
  //method to get URL of one recipe from spoonacular using the recipe ID
  getRecipeURL(recipeID){
    //encoded URI with special characters and create http get response to API
    return this.http.get(`${this.bulkUrl}${encodeURI(recipeID)}`, {
      headers: {'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '1718b3d3cemsh23389b72a93845fp119c22jsn13d1cf8e120a'
        }
  })
  }

}
