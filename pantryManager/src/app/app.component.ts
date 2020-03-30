import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './user.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      showLoggedIn: "true",
      showLoggedOut: "true"
    },
    {
      title: 'Ingredients',
      url: '/ingredients',
      icon: 'pricetag',
      showLoggedIn: "true",
      showLoggedOut: "false"
    },
    {
      title: 'Recipes',
      url: '/recipes',
      icon: 'school',
      showLoggedIn: "true",
      showLoggedOut: "false"
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'account',
      showLoggedIn: "true",
      showLoggedOut: "false"
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'login',
      showLoggedIn: "false",
      showLoggedOut: "true"
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'register',
      showLoggedIn: "false",
      showLoggedOut: "true"
    },
    {
      title: 'Forgot Password',
      url: '/forgotpassword',
      icon: 'forgotpassword',
      showLoggedIn: "false",
      showLoggedOut: "true"
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public user: UserService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
