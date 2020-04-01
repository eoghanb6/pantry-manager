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
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

      console.log(res)
      if(res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
      }

      this.showAlert("Success", "Login Succesful")
          this.router.navigate(['/home']);
    }catch(err){
      console.dir(err)
      if (err.code == "auth/user-not-found"){
        console.log("User not found")
        this.showAlert("Error", err.message)
      }
    }

  }

  async showAlert(header: string, message:string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Okay"]
    })

  await alert.present()
}

}
