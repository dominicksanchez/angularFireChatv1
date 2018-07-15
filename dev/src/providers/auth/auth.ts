import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttletime';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;
  loggedUserId:string;
  mouseEvent: Subscription;
  timer: Subscription;

  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    public storage: Storage,
    public db: AngularFireDatabase,
  ) {
    this.user = db.object('/users');

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedUserId = user.uid;
        this.updateOnConnect();
        this.updateOnDisconnect();
        this.updateOnIdle();
      }
    });
  }
  
  loggedUser() {
    return this.afAuth.authState;
  }

  loggedUserMetaData(uid:string) {
    return this.db.object('/users/'+uid);
  }

  updateOnConnect() {
    return this.db.object('.info/connected').subscribe(connected => {
      if(connected) {
        let status = connected.$value ? 'online' : 'offline';
        this.updateStatus(status);
      }
    });
  }

  updateOnDisconnect() {
    firebase.database().ref('/users/' + this.loggedUserId)
                       .onDisconnect()
                       .update({status: 'offline', lastLogin: firebase.database.ServerValue.TIMESTAMP});
  }

  updateOnIdle() {
    this.mouseEvent = Observable
                      .fromEvent(document, "mouseMove")
                      .throttleTime(2000)
                      .subscribe(() => {
                        this.updateStatus('online')
                        this.resetTimer()
                      }); 
  }

  resetTimer() {
    this.timer.unsubscribe();
    this.timer = Observable.timer(5000)
                           .subscribe(() => {
                            this.updateStatus('away')
                           });
  }

  updateStatus(status: string) {
    this.db.object('users/' + this.loggedUserId).update({'status': status});
  }

  register(email:string, pass:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  resetPassword(email:string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  login(email:string, pass:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  fbLogin() {
    let fbAuth = this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    fbAuth.then((res) => {
      let data = res.user;
      console.log('res', res.user)
      this.db.object('/users/' + data.uid).set({email: data.email, photo: '', displayName: data.displayName, isVerified: true});
    });
    return fbAuth;
  }

  googleLogin() {
    let googleAuth = firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    googleAuth.then((res) => {
      let data = res.user;
      this.db.object('/users/' + data.uid).set({email: data.email, photo: data.photoURL, displayName: data.displayName, isVerified: true});
    });
    return googleAuth;
  }

  createUser(uId:string, email:string, photo:string, name:string) {
    this.db.object('/users/' + uId).set({email: email, photo: photo, displayName: name});
  }

  loginVerified(uId:string) {
    // check first if user account already verified
    let user = firebase.database().ref('/users/' + uId);

    user.once("value")
      .then(snapshot => {
        if(!snapshot.hasChild('isVerified')) {
          this.db.object('/users/' + uId).update({isVerified:true});
        }
      })
  }

  loggedOut() {
    this.updateStatus('offline');
    this.afAuth.auth.signOut();
  }
}
