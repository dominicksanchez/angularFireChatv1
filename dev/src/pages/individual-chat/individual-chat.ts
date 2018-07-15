import { ChatProvider } from './../../providers/chat/chat';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-individual-chat',
  templateUrl: 'individual-chat.html',
})
export class IndividualChatPage {
  recieverId:string;
  receiverName:string;
  receiverStatus:string;
  tabBarElement:any;
  chatMsg:string;
  chatRoom:string;
  chats:any;
  lastChatKey:string = '';
  userLoggedName:any;

  @ViewChild('content') content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {
    this.recieverId     = navParams.get('key');
    this.receiverName   = navParams.get('displayName');
    this.receiverStatus = navParams.get('status');
    this.tabBarElement  = document.querySelector(".tabbar.show-tabbar");
    this.userLoggedName = navParams.data.displayName;
    console.log('navParams', navParams)
  }

  scrollToBottom() {
    this.content.nativeElement.scrollIntoView(false);
  }

  ionViewWillEnter() {
    this.loadChats();
    this.removeUnreadMsg();
    this.tabBarElement.style.display = "none";
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
    console.log('leave', this.chats)
  }

  sendMessage() {
    this.chatProvider.sendMessage(this.chatMsg, this.recieverId);
    this.chatMsg = "";
    this.removeUnreadMsg();
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }

  loadChats() {
    this.chats = [];
    this.chatProvider.loadChats().then(chats => {
      console.log('chats', chats)
      this.chats = chats;
      setTimeout(() => {
        this.scrollToBottom();
      }, 400);
    });
  }

  removeUnreadMsg() {
    this.chatProvider.getRemoveUnreadMsg();
  }

  doInfinite() {
    this.chatProvider.scrollChats();
  }
}
