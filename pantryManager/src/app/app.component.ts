import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      icon: 'home'
    },
    {
      title: 'Ingredients',
      url: '/ingredients',
      icon: 'list'
    },
    {
      title: 'List0',
      url: '/list0',
      icon: 'list0'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'register'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'profile'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
