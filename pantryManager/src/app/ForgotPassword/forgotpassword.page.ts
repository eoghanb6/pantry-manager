import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import {AlertController} from '@ionic/angular'
import { Router } from '@angular/router'
import { UserService } from '../user.service'


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth,
     public alert: AlertController,
    public router: Router,
     public user: UserService
   ) { }

  ngOnInit() {
  }

  async reset(){
    const {username } = this
    try{
    console.dir("username: " + username)
      const res = await this.afAuth.auth.sendPasswordResetEmail(username)
      console.log(res)
      this.showAlert("Success", "Email Sent")
          this.router.navigate(['/login']);
              }catch(err){
      this.showAlert("Error", err.message)
    console.dir(err)
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
