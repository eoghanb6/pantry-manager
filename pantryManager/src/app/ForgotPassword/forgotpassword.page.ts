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
//reset method called
  async reset(){
    const {username } = this
    try{
      //use angular fire auth to send password reset email
      const res = await this.afAuth.auth.sendPasswordResetEmail(username)
      this.showAlert("Success", "Email Sent")
      //redirect to login on sucess
          this.router.navigate(['/login']);
              }catch(err){
                //show error message on failure
      this.showAlert("Error", err.message)
    console.dir(err) //log error message
  }

  }
//create modal alert box
  async showAlert(header: string, message:string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Okay"]
    })

  await alert.present()
}

}
