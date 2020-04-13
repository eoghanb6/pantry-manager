import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import {AlertController} from '@ionic/angular'
import { Router } from '@angular/router'
import { UserService } from '../user.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth,
     public alert: AlertController,
    public router: Router,
     public user: UserService
   ) { }

  ngOnInit() {
  }

  async login(){
    const {username, password } = this
    try{
      //try and authenticate via angular fire auth service and store response
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
//if response has user varaible, set it
      if(res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
      }
//if user sucessfully set, login and redirect
      this.showAlert("Success", "Login Succesful")
          this.router.navigate(['/home']);
    }catch(err){
      console.dir(err)
      //match on error message for user not found and throw error
      if (err.code == "auth/user-not-found"){
        console.log("User not found")
        this.showAlert("Error", err.message)
      }
    }

  }
//method to display modal alert box
  async showAlert(header: string, message:string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Okay"]
    })

  await alert.present()
}

}
