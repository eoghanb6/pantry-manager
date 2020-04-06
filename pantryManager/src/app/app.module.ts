import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import firebaseConfig   from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SpoonacularService } from './spoonacular.service'
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ModalPage } from './modal/modal.page';





@NgModule({
  declarations: [AppComponent,ModalPage],
  entryComponents: [ModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    SpoonacularService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
