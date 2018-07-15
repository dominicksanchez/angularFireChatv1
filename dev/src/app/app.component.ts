import { PushnotifProvider } from './../providers/pushnotif/pushnotif';
import { Component } from '@angular/core';
import { Platform,  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'LandingPage'; 

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        if(user.emailVerified) {
          this.rootPage = 'TabsPage';
        }else {
          this.rootPage = 'LandingPage';
        }
      }else {
        this.rootPage = 'LandingPage';
      }
    });
    // storage.get('userId').then((user) => {
    //   if(user != null) {
    //     this.rootPage = 'TabsPage';
    //   }else {
    //     this.rootPage = 'LandingPage';
    //   }
    // });
  }
}
