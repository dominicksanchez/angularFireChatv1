webpackJsonp([9],{

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndividualChatPageModule", function() { return IndividualChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__individual_chat__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IndividualChatPageModule = (function () {
    function IndividualChatPageModule() {
    }
    return IndividualChatPageModule;
}());
IndividualChatPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__individual_chat__["a" /* IndividualChatPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__individual_chat__["a" /* IndividualChatPage */]),
        ],
    })
], IndividualChatPageModule);

//# sourceMappingURL=individual-chat.module.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndividualChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndividualChatPage = (function () {
    function IndividualChatPage(navCtrl, navParams, chatProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatProvider = chatProvider;
        this.recieverId = navParams.get('receiverId');
        this.receiverName = navParams.get('receiverName');
        this.receiverStatus = navParams.get('receiverStatus');
        this.chatRoom = navParams.get('chatRoom');
        this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
        this.loadChats();
    }
    IndividualChatPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = "none";
    };
    IndividualChatPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = "flex";
    };
    IndividualChatPage.prototype.sendMessage = function () {
        this.chatProvider.sendMessage(this.chatRoom, this.chatMsg, this.recieverId);
        this.chatMsg = "";
    };
    IndividualChatPage.prototype.loadChats = function () {
        var _this = this;
        this.chatProvider.loadChats(this.chatRoom).subscribe(function (chats) {
            _this.chats = chats;
        });
        //this.chats =
    };
    return IndividualChatPage;
}());
IndividualChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-individual-chat',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\individual-chat\individual-chat.html"*/'<!-- <ion-header>\n\n  <ion-navbar color="light-blue">\n\n    <ion-title>{{receiverName}} <p><span [class]="receiverStatus"></span>{{receiverStatus}}</p></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding no-margin>\n\n    <ion-list>\n\n        <ion-item *ngFor="#message of messages">{{message}}</ion-item>\n\n        <ion-item>Test message</ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n\n\n<ion-footer position="bottom">\n\n    <ion-item>\n\n      <ion-icon item-left name="attach" color="light-blue"></ion-icon>\n\n      <ion-input type="text" placeholder="Mobile no"></ion-input>\n\n      <ion-icon item-right name="send" (click)="pickContactNo()" color="light-blue"></ion-icon>\n\n    </ion-item>\n\n</ion-footer>\n\n\n\n\n\n -->\n\n\n\n <ion-header>\n\n    <ion-navbar color="light-blue">\n\n        <ion-title>{{receiverName}} <p><span [class]="receiverStatus"></span>{{receiverStatus}}</p></ion-title>\n\n      </ion-navbar>\n\n </ion-header>\n\n <ion-content>\n\n   <div class="directChatArea">\n\n      <div class="directChatMsg" *ngFor="let chat of chats">\n\n          <div class="directChatInfo">\n\n            <span class="directChatName" float-left>{{chat.name}}</span>\n\n            <span class="directChatTimestamp" float-right>{{chat.timestamp}}</span>\n\n          </div>\n\n          <img class="directChatImg" src="{{chat.senderPhoto}}" *ngIf="chat.senderPhoto != \'none\';else photo;">\n\n          <ng-template #photo><span class="iconCircle">A</span></ng-template>\n\n          <div class="talk-bubble tri-right tri-right left-top">\n\n            <div class="talktext">\n\n              <p>{{chat.message}}</p>\n\n            </div>\n\n          </div>\n\n      </div>\n\n   </div>\n\n </ion-content>\n\n <ion-footer position="bottom">\n\n    <ion-item>\n\n        <ion-icon item-left name="attach" color="light-blue"></ion-icon>\n\n        <ion-input type="text" [(ngModel)]="chatMsg" name="chatMsg" (keyup.enter)="sendMessage()" placeholder="Enter your message . . ."></ion-input>\n\n        <ion-icon item-right name="send" color="light-blue" (click)="sendMessage()"></ion-icon>\n\n    </ion-item>\n\n </ion-footer>'/*ion-inline-end:"C:\Users\Sanchez\Desktop\ng4_ionic3\FireChat\src\pages\individual-chat\individual-chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__["a" /* ChatProvider */]])
], IndividualChatPage);

//# sourceMappingURL=individual-chat.js.map

/***/ })

});
//# sourceMappingURL=9.js.map