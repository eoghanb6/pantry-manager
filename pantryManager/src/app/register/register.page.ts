import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import {AlertController} from '@ionic/angular'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
//define variables
  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth,
  public alert: AlertController,
  public router: Router,
  public afstore: AngularFirestore,
  public user: UserService
 ) { }

  ngOnInit() {
  }
//method to register a user on angular fire auth
async register(){
    const {username, password, cpassword} = this
    //validation on password and confirmation password
    if (password !== cpassword){
      this.showAlert("Error", "Passwords do not match")
    return console.error("passwords dont match")
    }
    try{
      //try and create a user by passing email and password to firebase auth
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
    //set the username here
    this.afstore.doc(`users/${res.user.uid}`).set({
      username
    })
    //use the user service to create a user with email and UID
    this.user.setUser({
      username,
      uid: res.user.uid
    })
    //on success redirect to login page
    this.showAlert("Success", "Registration Succesful")
    this.router.navigate(['/login']);
    //on failure log and throw error
  }catch(err){
    console.dir(err)
    this.showAlert("Error", err.message)

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
