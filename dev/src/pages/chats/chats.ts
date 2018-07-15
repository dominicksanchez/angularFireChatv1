import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';
import { FirebaseListObservable } from "angularfire2/database";
import { PushnotifProvider } from "../../providers/pushnotif/pushnotif";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  users:any;
  names:any;
  userLoggedId:string;
  title:string;
  body:string;
  notifList:FirebaseListObservable<any>;
  friends:any[] = [];
  friendOffline:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App,
    public pushnotifProvider: PushnotifProvider,
  ) {

    this.storage.get('userId').then(userId => {
      this.authProvider.loggedUserMetaData(userId).subscribe(userData => {
        this.loadChatUsers(userId, userData.displayName);
      });
    });
  }

  pushPage(page:string) {
    this.navCtrl.push('UserslistPage');
  }

  loadChatUsers(userId, userName) {
    this.chatProvider.loadChatUsers(userId).then(users => {
      console.log('users', users)
      this.users = users;
    });
  }

  pushChatRoom(user:any) {
    console.log('user', user['key']);
    this.chatProvider.chatMember(user['key'], user['displayName']);
    this.navCtrl.push('IndividualChatPage', user);
  }
}
