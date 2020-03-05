import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import {AlertController} from '@ionic/angular'



interface user {
username: string,
uid: string
}

@Injectable()
export class UserService {
  private user: user

  constructor(private afAuth: AngularFireAuth,
    public router: Router,
  public alert: AlertController){}

  setUser(user: user){
    this.user = user
  }

  getUID(){
    if (!this.user){
      if(this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser
        this.setUser({
          username: user.email,
          uid: user.uid
        })
        return user.uid
      }else {
        throw new Error("User not logged in")
      }
    }else {
      return this.user.uid
    }
  }

  isLoggedIn(){
    if (!this.user){
      if(this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser
        this.setUser({
          username: user.email,
          uid: user.uid
        })
        return true
      }else {
        return false
      }
    }else {
      return true
    }
  }

logOutUser(){
this.afAuth.auth.signOut()
console.log("logging out")
this.showAlert("Success", "Logout Succesful")
window.location.reload(true)
this.router.navigate(['/login']);
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
