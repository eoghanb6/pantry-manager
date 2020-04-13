import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import {AlertController} from '@ionic/angular'


//create interface for user service
interface user {
username: string,
uid: string
}

//make user service injectable into other pages/classes
@Injectable()
export class UserService {
  private user: user

  constructor(private afAuth: AngularFireAuth,
    public router: Router,
  public alert: AlertController){}
  // set user method
  setUser(user: user){
    this.user = user
  }
  // getter for email address
  getUsername(): string {
  return this.user.username
}

//method to reauthenticate user based on current login creds
reAuth(username: string, password: string) {
  return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
}
//update password in my account page
updatePassword(newpassword: string) {
  return this.afAuth.auth.currentUser.updatePassword(newpassword)
}
//update email in my account page
updateEmail(newemail: string) {
  return this.afAuth.auth.currentUser.updateEmail(newemail)
}

//method to get the users UID
  getUID(){
    if (!this.user){
      //if there is no user in scope, and there is a current user set, reauthenticate user
      if(this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser
        //if user has not been set in service, set it here
        this.setUser({
          username: user.email,
          uid: user.uid
        })
        //return the users UID
        return user.uid
      }else {
        // or throw not logged in error
        throw new Error("User not logged in")
      }
    }else {
      //if possible when in scope, return the UID this way
      return this.user.uid
    }
  }
//getter for the users email address
  getEmail(){
    //if no user logged in
    if (!this.user){
      // and user is cached as logged in, set the user and authenticate here
      if(this.afAuth.auth.currentUser){
        const user = this.afAuth.auth.currentUser
        this.setUser({
          username: user.email,
          uid: user.uid
        })
        return user.email
      }else {
        throw new Error("User not logged in")
      }
    }else {
      return this.user.username
    }
  }

//check if user logged in, if possible from cache make them logged in
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

//log out user via angular fire auth and reload page, redirect to login
logOutUser(){
this.afAuth.auth.signOut()
console.log("logging out")
this.showAlert("Success", "Logout Succesful")
window.location.reload(true)
this.router.navigate(['/login']);
}

//method to show modal alert box
async showAlert(header: string, message:string){
  const alert = await this.alert.create({
    header,
    message,
    buttons: ["Okay"]
  })

await alert.present()
}

}
