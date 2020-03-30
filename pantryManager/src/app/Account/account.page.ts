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

currentuser: AngularFirestoreDocument
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
      this.currentuser = afstore.doc(`users/${user.getUID()}`)
  		this.sub = this.currentuser.valueChanges().subscribe(event => {
  			this.username = event.username
})
      const userID = user.getUID()
      const userEmail = user.getEmail()
      console.log(userID)
      console.log(userEmail)

      this.userIdentifier = userID
      this.userEmail = userEmail
     }



  ngOnInit() {
  }

async presentAlert(title: string, content: string) {
  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  })

  await alert.present()
}

async updateDetails() {
  this.busy = true

  if(!this.password) {
    this.busy = false
    return this.presentAlert('Error!', 'You have to enter a password')
  }

  try {
    await this.user.reAuth(this.user.getUsername(), this.password)
  } catch(error) {
    this.busy = false
    return this.presentAlert('Error!', 'Wrong password!')
  }

  if(this.newpassword) {
    await this.user.updatePassword(this.newpassword)
  }

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

  this.router.navigate(['/home']);
}

}
