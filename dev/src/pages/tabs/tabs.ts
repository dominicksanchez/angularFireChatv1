import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';
import { PushnotifProvider } from '../../providers/pushnotif/pushnotif';
import { NotifProvider } from '../../providers/notif/notif';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:string = "ChatsPage";
  tab2:string = "NotificationsPage";
  tab3:string = "UserslistPage";

  message:any;
  notifCount:any; 
  unreadMsgCount:any; 
  loggedUserId:string;
  tabsParam = {};

  constructor(
    public navCtrl: NavController,
    public pushnotifProvider: PushnotifProvider,
    public notifProvider: NotifProvider,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {

    this.storage.get('userId').then(userId => {
      this.loggedUserId = userId;
      this.loadNotifCount(userId);
      this.loadUnreadMsgCount(userId);
      this.tabsParam['userId'] = userId;
    });
  }

  ngOnInit() {
    this.pushnotifProvider.getPermission();
    this.pushnotifProvider.receiveMessage();
  } 

  loadNotifCount(userId) {
    this.notifProvider.getNotifCount(userId).subscribe(res => {
      this.notifCount = res.length;
    });
  }

  loadUnreadMsgCount(userId) {
    this.notifProvider.getUnreadMsgCount(userId).subscribe(unread => {
      this.unreadMsgCount = unread.length;
    });
  }

  logoutClick() {
    console.log('logout')
    let confirm = this.alertCtrl.create({
      title: 'Log out confirmation',
      message: `Are you sure do you want to log out?`,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            localStorage.clear();
            this.navCtrl.push('LandingPage');
          }
        }
      ]
    });
    confirm.present();
  }
}
