import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import {AlertController} from '@ionic/angular'
import { Router } from '@angular/router'
import { UserService } from '../user.service'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userIdentifier
  userEmail

currentuser
sub
username: string
profilePic: string

password: string
newpassword: string

busy: boolean = false

  constructor(
		private afstore: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserService) {
      this.currentuser = afstore.doc(`users/${user.getUID()}`) //get live user data from firebase based on cached user ID
      //when user value changes on firebase update locally
  		this.sub = this.currentuser.valueChanges().subscribe(event => {
  			this.username = event.username
})
      const userID = user.getUID()
      const userEmail = user.getEmail()
      this.userIdentifier = userID
      this.userEmail = userEmail
     }



  ngOnInit() {
  }
// async method do display modal alert box
async presentAlert(title: string, content: string) {
  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  })

  await alert.present()
}

//when called, update the user details on firebase
async updateDetails() {
  this.busy = true

  if(!this.password) {
    this.busy = false
    return this.presentAlert('Error!', 'You have to enter a password')
  }

  try {
    //try reauthenticate user with old set password
    await this.user.reAuth(this.user.getUsername(), this.password)
  } catch(error) {
    this.busy = false
    return this.presentAlert('Error!', 'Wrong password!')
  }
//update password to new password
  if(this.newpassword) {
    await this.user.updatePassword(this.newpassword)
  }
//update user email to new email address from form
  if(this.username !== this.user.getUsername()) {
    await this.user.updateEmail(this.username)
    this.currentuser.update({
      username: this.username
    })
  }

  this.password = ""
  this.newpassword = ""
  this.busy = false

  await this.presentAlert('Done!', 'Your profile was updated!')
//redirect user to home page
  this.router.navigate(['/home']);
}

}
