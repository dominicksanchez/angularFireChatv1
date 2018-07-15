import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-userslist',
  templateUrl: 'userslist.html',
})
export class UserslistPage {
  users:any;
  searchUserArr = [];
  searching:boolean = false;
  searchStr: any = '';
  searchControl: FormControl;
  noResult:boolean = false;
  userLoggedId:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public userProvider: UserProvider,
    public alertCtrl: AlertController
  ) {
    this.userLoggedId = navParams.data.userId;
    this.searchControl = new FormControl();
    this.getUsers();
  }

  getUsers() {
    this.userProvider.users().then(users => {
      let modifiedUsers = [];

      Object.keys(users).map((key) => {
        if(users[key].hasOwnProperty('displayName')) {
          modifiedUsers = [...modifiedUsers, users[key]];
        }
      })
      console.log('modifiedUsers', modifiedUsers)
      this.users = modifiedUsers;
   });
  }

  ionViewDidLoad() {
    this.searchUser();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.searchUser();
    });
  }
    
  onSearchInput() {
    this.searching = true;
  }

  searchUser() {
    if(this.searchStr.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.displayName.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1);
      });
      if(this.users.length == 0) { // no result
        this.noResult = true;
      }else {
        this.noResult = false;
      }
    }else {
      this.getUsers();
    }
  }

  sendFriendRequest(recipient:any, index) {
    let confirm = this.alertCtrl.create({
      title: 'Send a friend request?',
      message: `Do you want ${recipient['displayName']} to be your friend?`,
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
            this.users.splice(index, 1);
            this.userProvider.sendFriendRequest(recipient).then(() => {

              let toast = this.toastCtrl.create({
                message: `Friend request to ${recipient.displayName} was sent`,
                duration: 5000
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
