import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NotifProvider } from '../../providers/notif/notif';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifCount:any;
  userLoggedId:string;
  notifLists:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notifProvider: NotifProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private datePipe: DatePipe
  ) {
    this.userLoggedId = navParams.data.userId;
    this.loadListOfNotif(this.userLoggedId);
    this.loadNotifCount(this.userLoggedId);
  }

  loadNotifCount(userId) {
    this.notifProvider.getNotifCount(userId).subscribe(res => {
      this.notifCount = res.length;
    });
  }

  loadListOfNotif(userId) {
    this.notifProvider.loadListOfNotif(userId).subscribe(notifList => {
      let notifArr = [];
      for(let notif of notifList) {
        this.notifProvider.getUserData(notif.senderId).then(userData => {
          userData['dateAdded'] = notif.dateAdded;
          userData['notifDesc'] = notif.description;
          userData['userId'] = notif.senderId;
          userData['notifKey'] = notif.$key;
          notifArr.push(userData);
        });
      }

      this.notifLists = notifArr;
    });
  }

  acceptRequest(user:object, i:number) {
    let confirm = this.alertCtrl.create({
      title: 'Request confirmation',
      message: `Do you accept ${user['displayName']} friend request?`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            console.log('userobj', user);
            this.notifProvider.acceptFriendRequest(this.userLoggedId, user['userId'], user['notifKey']).then(res => {
              let toast = this.toastCtrl.create({
                message: `You are now friends with ${user['displayName']}`,
                duration: 3000
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
