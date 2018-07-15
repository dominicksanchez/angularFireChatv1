import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';

@Injectable()
export class UserProvider {
  usersRef = firebase.database().ref('users/');
  loggedUserId:string;

  constructor(
    public http: Http, 
    public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedUserId = user.uid;
      }
    });
  }

  users() {
    let promise = new Promise((resolve, reject) => {
      const dbRefUsers = firebase.database().ref().child('users'); // create reference to users
      let usersArr = []; 
      let removeUser = [];
      dbRefUsers.once('value', childSnap => { // listen to the users node once
        for(let key in childSnap.val()) {  // loop through childSnap to get the users Obj
          let childObj = childSnap.val()[key]; // create a variable that hold the obj

          let friendListUpdate = () => {
            if('friends' in childObj) {
              for(let friendKey in childObj.friends) {
                if(friendKey == this.loggedUserId) {
                  removeUser.push(childObj.email);
                }
              }
            }

            if(key == this.loggedUserId) { // remove your own account on users list
              removeUser.push(childObj.email);
            }

            let countUser = 0;
            for(let user of usersArr) {
              if(removeUser.indexOf(user.email) != -1) { // exist
                usersArr.splice(countUser, 1);
              }
              countUser++;
            }
          }

          friendListUpdate();
          
          const dbRefList = dbRefUsers.child(key); // create a child reference of the users
          dbRefList.on('child_changed', snap => { // listen for child changes 
            childObj[snap.key] = snap.val();
            resolve(usersArr);
          });

          usersArr.push(childObj);

          const dbRefListAdded = dbRefUsers.child(key); // create a child reference of the users
          dbRefListAdded.on('child_added', snap => { // listen for child changes 
            childObj[snap.key] = snap.val();
            childObj['key'] = key;
            friendListUpdate();
            resolve(usersArr);
          });
        }
        resolve(usersArr);
      });
    });

    return promise;
  }

  userDetails(userId:string) {
    return this.afdb.object(`/users/${userId}`);
  }

  sendFriendRequest(recipient) {
    let promise = new Promise((resolve, reject) => {
      // insert new notification
      firebase.database().ref(`/notification/${recipient.key}/`).push({
        senderId: this.loggedUserId,
        description: 'requested',
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // add to users->friends node
      let addFriendsToUser1 = firebase.database().ref(`/users/${recipient.key}/friends/${this.loggedUserId}`).set('false');
      let addFriendsToUser2 = firebase.database().ref(`/users/${this.loggedUserId}/friends/${recipient.key}`).set('false');
      resolve(addFriendsToUser2);
    });

    return promise;
  //   let promise = new Promise((resolve, reject) => {
  //     // insert new notification
  //     firebase.database().ref(`/notification/${recipient.key}`).push({
  //       senderId: this.loggedUserId,
  //       description: 'requested',
  //       dateAdded: firebase.database.ServerValue.TIMESTAMP
  //     });

  //     // add friendReq node to the sender user
  //     firebase.database().ref(`users/${this.loggedUserId}/friendReq/${recipient.key}`).set('false');
  //     // add friend node to the recipient user
  //     let friendReq =  firebase.database().ref(`users/${recipient.key}/friends/${this.loggedUserId}`).set('false');
  //     resolve(friendReq);
  //   });

  //   return promise;
  // }
  }
}
