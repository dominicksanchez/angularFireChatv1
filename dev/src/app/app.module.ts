import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePipe } from '@angular/common';

// Firebase Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Auth Service
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// Providers
import { ChatProvider } from '../providers/chat/chat';
import { UserProvider } from '../providers/user/user';
import { PushnotifProvider } from '../providers/pushnotif/pushnotif';
import { NotifProvider } from '../providers/notif/notif';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAAGkJZJsX9QGUEkKzx_ZEEzQWFJJ27oEs",
  authDomain: "ionicapp-2e811.firebaseapp.com",
  databaseURL: "https://ionicapp-2e811.firebaseio.com",
  storageBucket: "ionicapp-2e811.appspot.com",
  messagingSenderId: "1063432282060"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    HttpModule, 
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatProvider,
    UserProvider,
    PushnotifProvider,
    NotifProvider,
    DatePipe
  ]
})
export class AppModule {}
