import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotifProvider {
  loggedUserId:string;
  notifCount: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  getNotifCount(userId:string) {
    return this.db.list(`/notification/${userId}`);
  }

  getUnreadMsgCount(userId:string) {
    return this.db.list(`/users/${userId}/unreadMessage/`);
  }

  loadListOfNotif(userId:string) {
    return this.db.list(`/notification/${userId}`);
  }

  acceptFriendRequest(acceptorId:string, senderUserId:string, notifKey:string) {
    console.log('senderId', senderUserId)
    console.log('acceptorId', acceptorId)
    let promise = new Promise((resolve, reject) => {
      let removeNotif = this.db.object(`/notification/${acceptorId}/${notifKey}`).remove(); // remove the notification nodes under notif key.
      removeNotif.then(success => {
        firebase.database().ref(`/notification/${senderUserId}/`).push({
          senderId: acceptorId,
          description: 'accepted',
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
        let $obj1 = {};
        $obj1[senderUserId] = true;
        let updateUser1 = this.db.object(`/users/${acceptorId}/friends/`).update($obj1);

        let $obj2 = {};
        $obj2[acceptorId] = true;
        let updateUser2 = this.db.object(`/users/${senderUserId}/friends/`).update($obj2);
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    });

    return promise;
  }

  getUserData(userId:string) {
    let promise = new Promise((resolve, reject) => {
      const userRef = firebase.database().ref(`users`);
      const userChildRef = userRef.child(userId);

      userChildRef.once('value', snapshot => {
        resolve(snapshot.val());
      });
    });

    return promise;
  }
}
