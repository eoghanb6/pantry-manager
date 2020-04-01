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

async register(){
    const {username, password, cpassword} = this
    if (password !== cpassword){
      this.showAlert("Error", "Passwords do not match")
    return console.error("passwords dont match")
    }
    try{
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
    console.log(res)
    console.log(`users/${res.user.uid}`)
    this.afstore.doc(`users/${res.user.uid}`).set({
      username
    })

    this.user.setUser({
      username,
      uid: res.user.uid
    })

    this.showAlert("Success", "Registration Succesful")
    this.router.navigate(['/login']);

  }catch(err){
    console.dir(err)
    this.showAlert("Error", err.message)

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
