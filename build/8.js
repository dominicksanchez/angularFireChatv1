webpackJsonp([8],{

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndividualChatPageModule", function() { return IndividualChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__individual_chat__ = __webpack_require__(479);
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__individual_chat__["a" /* IndividualChatPage */]),
        ],
    })
], IndividualChatPageModule);

//# sourceMappingURL=individual-chat.module.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndividualChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(159);
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
        this.lastChatKey = '';
        this.recieverId = navParams.get('key');
        this.receiverName = navParams.get('displayName');
        this.receiverStatus = navParams.get('status');
        this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
        this.userLoggedName = navParams.data.displayName;
        console.log('navParams', navParams);
    }
    IndividualChatPage.prototype.scrollToBottom = function () {
        this.content.nativeElement.scrollIntoView(false);
    };
    IndividualChatPage.prototype.ionViewWillEnter = function () {
        this.loadChats();
        this.removeUnreadMsg();
        this.tabBarElement.style.display = "none";
    };
    IndividualChatPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = "flex";
        console.log('leave', this.chats);
    };
    IndividualChatPage.prototype.sendMessage = function () {
        var _this = this;
        this.chatProvider.sendMessage(this.chatMsg, this.recieverId);
        this.chatMsg = "";
        this.removeUnreadMsg();
        setTimeout(function () {
            _this.scrollToBottom();
        }, 200);
    };
    IndividualChatPage.prototype.loadChats = function () {
        var _this = this;
        this.chats = [];
        this.chatProvider.loadChats().then(function (chats) {
            console.log('chats', chats);
            _this.chats = chats;
            setTimeout(function () {
                _this.scrollToBottom();
            }, 400);
        });
    };
    IndividualChatPage.prototype.removeUnreadMsg = function () {
        this.chatProvider.getRemoveUnreadMsg();
    };
    IndividualChatPage.prototype.doInfinite = function () {
        this.chatProvider.scrollChats();
    };
    return IndividualChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_13" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], IndividualChatPage.prototype, "content", void 0);
IndividualChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-individual-chat',template:/*ion-inline-start:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\individual-chat\individual-chat.html"*/'<ion-header>\n\n    <ion-navbar color="light-blue">\n\n        <ion-title>{{receiverName}} <p>{{receiverStatus}}</p></ion-title>\n\n      </ion-navbar>\n\n </ion-header>\n\n <ion-content>\n\n  <!-- <ion-infinite-scroll position="top" (ionInfinite)="doInfinite(\'top\')">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll> -->\n\n\n\n   <div class="directChatArea" #content>\n\n      <div class="directChatMsg" *ngFor="let chat of chats">\n\n          <div class="directChatInfo">\n\n            <span class="directChatTimestamp">{{chat.timestamp | date:\'shortTime\'}} {{userLoggedId}}</span>\n\n          </div>\n\n          <img class="directChatImg" src="{{chat.senderPhoto}}" *ngIf="chat.senderPhoto != \'\' && chat.senderPhoto != \'none\';else photo;" [hidden]="chat.name != receiverName">\n\n          <ng-template #photo><span class="iconCircle"  [hidden]="chat.name != receiverName">{{chat.name.charAt(0)}}</span></ng-template>\n\n          \n\n          <div class="talk-bubble tri-right tri-right left-top" [attr.float-right]="chat.name != receiverName ? true : null" *ngIf="chat.name != receiverName">\n\n            <div class="talktext">\n\n              <p>{{chat.message}}</p>\n\n            </div>\n\n          </div>\n\n          <div class="talk-bubble tri-right tri-right left-top otherChat" [attr.float-right]="chat.name != receiverName ? true : null" *ngIf="chat.name == receiverName">\n\n              <div class="talktext">\n\n                <p>{{chat.message}}</p>\n\n              </div>\n\n            </div>\n\n      </div>\n\n   </div>\n\n </ion-content>\n\n <ion-footer position="bottom">\n\n    <ion-item>\n\n        <ion-icon item-left name="attach" color="light-blue"></ion-icon>\n\n        <ion-input type="text" [(ngModel)]="chatMsg" name="chatMsg" (keyup.enter)="sendMessage()" placeholder="Enter your message . . ."></ion-input>\n\n        <ion-icon item-right name="send" color="light-blue" (click)="sendMessage()"></ion-icon>\n\n    </ion-item>\n\n </ion-footer>'/*ion-inline-end:"C:\Users\Sanchez\Desktop\Angular\FireChat\src\pages\individual-chat\individual-chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__["a" /* ChatProvider */]])
], IndividualChatPage);

//# sourceMappingURL=individual-chat.js.map

/***/ })

});
//# sourceMappingURL=8.js.map