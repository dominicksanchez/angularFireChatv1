import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ChatProvider {
  users: FirebaseListObservable<any>;
  user: FirebaseObjectObservable<any>;
  loggedUserId:string;
  loggedUserName:string;
  loggedUserPhoto:string;
  usersRef = firebase.database().ref('/users');
  chats: FirebaseListObservable<any>;
  roomName:any;
  chatArr = [];
  firstKnownKey:any;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {

    afAuth.authState.subscribe(user => {
      this.user = this.db.object('/users/'+user.uid, {preserveSnapshot: true});
      this.user.subscribe(userData => {
        this.user = userData.val();
        let photo;
        if(!('photo' in this.user)) {
          photo = 'none';
        }else {
          photo = userData.val().photo;
        }
        this.getLoggedUserPhoto(photo);
        this.loggedUserId   = userData.key;
        this.loggedUserName = userData.val().displayName;
      })
    });
  }

  getUsers() {
    this.users = this.db.list('/users', {
      query: {
        orderByChild: 'isVerified',
        equalTo: true
      }
    });
    return this.users;
  }
  

  getLoggedUserPhoto(photo:string) {
    this.loggedUserPhoto = photo;
  }

  getLoggedUserId() {
    return this.loggedUserId;
  }

  chatMember(user2Id:string, user2:string) {
    let user1Id = this.loggedUserId;
    let user1  = this.loggedUserName;
    // let user2 = receiverId;


    let roomName = (user1 < user2 ? user1+'_'+user2 : user2+'_'+user1);
    roomName = roomName.replace(/\ /g, '-');
    let obj:object = {};
    obj[user1] = true;
    obj[user2] = true;

    this.db.object('/chat_room/'+roomName).set(obj);
    this.roomName  = roomName;
    return roomName;
  }

  sendMessage(chatMsg:string, receiverId:string) {
    this.db.list('/chats/'+this.roomName).push({
      name: this.loggedUserName,
      senderPhoto: this.loggedUserPhoto,
      message: chatMsg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    
    let unreadObj = {};
    unreadObj[this.roomName] = true;
    this.db.list(`/users/${receiverId}/unreadMessage/`).push(unreadObj);
  }

  loadChats() {

    let promise = new Promise((resolve, reject) => {
      this.chatArr = [];
      const chatRef = firebase.database().ref(`/chats/${this.roomName}/`).limitToLast(2);
      chatRef.once('value', snapshot => {
        let snapObjs = snapshot.val();
      });

      chatRef.on('child_added', addedSnap => {
        if(!this.firstKnownKey) {
          this.firstKnownKey = addedSnap.key;
        }

        addedSnap.val()['key'] = addedSnap.key;
        this.chatArr.push(addedSnap.val());

        if(this.chatArr.length >= 2) {
          resolve(this.chatArr);
        }
      });
    });

    return promise;
  }

  scrollChats() {
    let promise = new Promise((resolve, reject) => {
      const chatRef = firebase.database().ref(`/chats/${this.roomName}/`).orderByChild('timestamp').endAt(this.firstKnownKey).limitToLast(2);
      console.log('this.firstKnownKey', this.firstKnownKey)
      chatRef.once('value', snapshot => {
        let snapObjs = snapshot.val();

        for(let objKey in snapObjs) {
          snapObjs[objKey].key = objKey;
          this.chatArr.unshift(snapObjs[objKey]);
        }
        console.log('this.chatArr', this.chatArr);
        resolve(this.chatArr);
      });
    });

    return promise;
  }

  loadChatUsersFriendReq(loggedUserId:string) {
    return this.db.object(`/users/${loggedUserId}/`);
  }

  getFriendMetaData(friendKey) {
    return this.db.object(`/users/${friendKey}/`);
  }

  lastUreadMessage(roomName) {
    return this.db.object(`/chats/${roomName}/`);
  }

  loadChatUsers(userId:string) {
    let promise = new Promise((resolve, reject) => {
      let userArr = [];
      const userLoggedRef = firebase.database().ref(`/users/${this.loggedUserId}/unreadMessage/`);
      const userRef = firebase.database().ref(`/users/${userId}/friends/`);
      userRef.once('value', snap => {
        for(let userKey in snap.val()) {
          if(snap.val()[userKey] == true) { // check if friends is true
            let userChildRef = firebase.database().ref(`users/${userKey}`);
            userChildRef.once('value', childSnap => {
              let childObj = childSnap.val();
              childObj.key = userKey;

              let user1 = this.loggedUserName;
              let user2 = childSnap.val()['displayName'];
              let roomName = (user1 < user2 ? user1+'_'+user2 : user2+'_'+user1);
              roomName = roomName.replace(/\ /g, '-');
             
              let lastChatRef = firebase.database().ref(`/chats/${roomName}/`).limitToLast(1);
  
              lastChatRef.on('value', lastChatRefSnap => {
                let lastChatObj = lastChatRefSnap.val();
                for(let lastChatKey in lastChatObj) {
                  let lastMsg = lastChatObj[lastChatKey].message;
                  let lastMsgTimeStamp = lastChatObj[lastChatKey].timestamp;
                  childObj.lastMsg = lastMsg;
                  childObj.lastMsgTimeStamp = lastMsgTimeStamp;
                }
              });

              userLoggedRef.on('value', userLoggedRefSnap => {
                let obj = userLoggedRefSnap.val();
                let unreadCount = 0;
                for(let key in obj) {
                  for(let userKey in obj[key]) {
                    if(userKey == roomName) {
                      unreadCount++;
                    }
                  }
                }

                childObj.unreadCount = unreadCount;
              });

              userArr.push(childObj);
              console.log('userArr', userArr);
            });

            let userStatusRef = firebase.database().ref(`/users/${userKey}/`);
            userStatusRef.on('child_changed', userSnap => {
              if(userSnap.ref.key == 'status') {
                let userCounter = 0;
                for(let userObj of userArr) {
                  if(userObj.key == userKey) {
                    userArr[userCounter].status = userSnap.val();
                  }
  
                  userCounter++;
                }
  
                resolve(userArr);
              }
            });
          }
        }
      });

      userRef.on('child_changed', snap => { // listen for child change on users/friends node
        let userChildRef = firebase.database().ref(`users/${snap.key}`);
        userChildRef.once('value', userSnap => {
          userArr.push(userSnap.val());
          resolve(userArr);
        });
      });
      
      resolve(userArr);
    });

    return promise;
  }

  getRemoveUnreadMsg() {

    let promise = new Promise((resolve, reject) => {
      let userUnreadRef = firebase.database().ref(`/users/${this.loggedUserId}/unreadMessage/`);

      userUnreadRef.once('value', snap => {
        let snapObj = snap.val();
        for(let snapParentKey in snapObj) {
          for(let snapKey in snapObj[snapParentKey]) {
            if(snapKey == this.roomName) {
              userUnreadRef.child(snapParentKey).remove();
            }
          }
        }
      });
    });

    return promise;
  }
}
